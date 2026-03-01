/* ===== Mario-style Side-scrolling World Map ===== */
window.WorldMap = (function () {

  /* ---------- Constants ---------- */
  var SCENE_WIDTH = 3200;
  var CHECKPOINT_COUNT = 10;
  var PATH_PADDING_LEFT = 180;
  var PATH_PADDING_RIGHT = 180;
  var PATH_SPACING = (SCENE_WIDTH - PATH_PADDING_LEFT - PATH_PADDING_RIGHT) / (CHECKPOINT_COUNT - 1);
  var PARALLAX_FAR = 0.2;
  var PARALLAX_MID = 0.5;
  var PARALLAX_NEAR = 1.0;
  var FRICTION = 0.92;
  var MIN_VELOCITY = 0.5;
  var WALK_DURATION = 800; // ms
  var WALK_STEPS = 30;

  /* ---------- State ---------- */
  var container = null;
  var viewport = null;
  var currentTheme = null;
  var scrollX = 0;
  var velocity = 0;
  var isDragging = false;
  var dragStartX = 0;
  var dragStartScroll = 0;
  var lastDragX = 0;
  var lastDragTime = 0;
  var rafId = null;
  var viewportWidth = 0;
  var maxScroll = 0;

  // DOM refs
  var layerFar = null;
  var layerMid = null;
  var layerNear = null;
  var pathSvg = null;
  var characterEl = null;
  var checkpointEls = [];
  var backBtn = null;

  // Path data
  var pathPoints = []; // [{x, y}, ...] for the 10 checkpoints
  var pathD = '';       // SVG path d attribute

  // Character animation
  var characterPos = { x: 0, y: 0 };
  var walkAnimId = null;
  var isWalking = false;

  // Arrow key walking
  var arrowKeysDown = {};
  var ARROW_WALK_SPEED = 4;

  // Coins
  var coins = [];
  var coinCount = 0;
  var coinEls = [];

  // Level prompt
  var promptEl = null;
  var promptCheckpointIdx = -1;

  // Dog decorations
  var dogEls = [];

  // Bound event handlers (for cleanup)
  var boundHandlers = {};

  /* ---------- Public API ---------- */
  var api = {
    init: init,
    show: show,
    destroy: destroy,
    onCheckpointTap: null,
    onBack: null
  };

  /* ---------- init ---------- */
  function init(containerEl) {
    container = containerEl;
  }

  /* ---------- show ---------- */
  function show(theme) {
    currentTheme = theme;

    // Clean any previous state
    cleanupInternal();

    // Build DOM
    buildDOM();

    // Compute path
    computePath();

    // Render SVG path
    renderPath();

    // Create checkpoints
    renderCheckpoints();

    // Create character
    renderCharacter();

    // Position character at the furthest unlocked checkpoint
    positionCharacterAtCurrent();

    // Create coins between checkpoints
    createCoins();

    // Place dog decorations
    placeDogs();

    // Set up viewport size
    onResize();

    // Center on character
    centerOnCharacter(false);

    // Start animation loop
    startLoop();

    // Bind events
    bindEvents();
  }

  /* ---------- destroy ---------- */
  function destroy() {
    cleanupInternal();
  }

  /* ---------- Internal cleanup ---------- */
  function cleanupInternal() {
    // Stop animation loop
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    // Stop walk animation
    if (walkAnimId) {
      cancelAnimationFrame(walkAnimId);
      walkAnimId = null;
    }

    // Unbind events
    unbindEvents();

    // Clear DOM
    if (container) {
      container.innerHTML = '';
    }

    // Reset state
    viewport = null;
    layerFar = null;
    layerMid = null;
    layerNear = null;
    pathSvg = null;
    characterEl = null;
    checkpointEls = [];
    backBtn = null;
    scrollX = 0;
    velocity = 0;
    isDragging = false;
    isWalking = false;
    pathPoints = [];
    pathD = '';
    coins = [];
    coinEls = [];
    coinCount = 0;
    dogEls = [];
    arrowKeysDown = {};
    promptEl = null;
    promptCheckpointIdx = -1;
  }

  /* ---------- Build DOM ---------- */
  function buildDOM() {
    // Viewport
    viewport = document.createElement('div');
    viewport.className = 'worldmap-viewport';

    // Back button
    backBtn = document.createElement('button');
    backBtn.className = 'worldmap-back';
    backBtn.setAttribute('aria-label', 'Back');
    backBtn.innerHTML = '<span class="back-arrow">&larr;</span>';
    viewport.appendChild(backBtn);

    // Title
    var title = document.createElement('div');
    title.className = 'worldmap-title';
    title.textContent = currentTheme === 'dino' ? t('dinosaurs') : t('monsterTrucks');
    viewport.appendChild(title);

    // Scene (not used as a transform container; layers are individually transformed)
    // But we need a coordinate space reference

    // Far layer
    layerFar = document.createElement('div');
    layerFar.className = 'parallax-layer parallax-far';
    if (window.WorldMapBG) {
      layerFar.innerHTML = currentTheme === 'dino' ? WorldMapBG.dinoFar() : WorldMapBG.truckFar();
    }
    viewport.appendChild(layerFar);

    // Mid layer
    layerMid = document.createElement('div');
    layerMid.className = 'parallax-layer parallax-mid';
    if (window.WorldMapBG) {
      var midSvg = currentTheme === 'dino' ? WorldMapBG.dinoMid() : WorldMapBG.truckMid();
      var creatureSvg = '';
      if (currentTheme === 'dino' && typeof WorldMapBG.dinoCreatures === 'function') {
        creatureSvg = WorldMapBG.dinoCreatures();
      } else if (currentTheme === 'truck' && typeof WorldMapBG.truckCreatures === 'function') {
        creatureSvg = WorldMapBG.truckCreatures();
      }
      layerMid.innerHTML = midSvg + creatureSvg;
    }
    viewport.appendChild(layerMid);

    // Near layer
    layerNear = document.createElement('div');
    layerNear.className = 'parallax-layer parallax-near';
    if (window.WorldMapBG) {
      layerNear.innerHTML = currentTheme === 'dino' ? WorldMapBG.dinoNear() : WorldMapBG.truckNear();
    }
    viewport.appendChild(layerNear);

    // Coin counter
    var coinDisplay = document.createElement('div');
    coinDisplay.className = 'worldmap-coin-display';
    coinDisplay.innerHTML = '<svg viewBox="0 0 20 20" width="16" height="16"><circle cx="10" cy="10" r="9" fill="#f1c40f" stroke="#e67e22" stroke-width="1.5"/><text x="10" y="14" text-anchor="middle" font-size="10" fill="#e67e22" font-weight="bold">$</text></svg> <span id="worldmap-coin-count">0</span>';
    viewport.appendChild(coinDisplay);

    // Scroll hint
    var hint = document.createElement('div');
    hint.className = 'worldmap-scroll-hint';
    hint.innerHTML = '<span class="worldmap-scroll-hint-arrow">&larr;</span> ' +
      swipeHintText() +
      ' <span class="worldmap-scroll-hint-arrow">&rarr;</span>';
    viewport.appendChild(hint);

    container.appendChild(viewport);
  }

  function swipeHintText() {
    // Simple swipe hint in current language
    var hints = {
      es: 'Desliza para explorar',
      en: 'Swipe to explore',
      ca: 'Llisca per explorar'
    };
    var lang = window.I18n ? window.I18n.getLang() : 'en';
    return hints[lang] || hints.en;
  }

  /* ---------- Compute Path ---------- */
  function computePath() {
    pathPoints = [];
    var h = viewport ? viewport.offsetHeight : 400;
    var centerY = h * 0.62; // path sits in lower-ish area
    var amplitude = h * 0.12; // how much the path waves up/down

    for (var i = 0; i < CHECKPOINT_COUNT; i++) {
      var x = PATH_PADDING_LEFT + i * PATH_SPACING;
      // Gentle sine wave for the path
      var phase = (i / (CHECKPOINT_COUNT - 1)) * Math.PI * 3;
      var y = centerY + Math.sin(phase) * amplitude;
      pathPoints.push({ x: x, y: y });
    }
  }

  /* ---------- Render SVG Path ---------- */
  function renderPath() {
    var h = viewport ? viewport.offsetHeight : 400;

    pathSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    pathSvg.setAttribute('class', 'worldmap-path');
    pathSvg.setAttribute('viewBox', '0 0 ' + SCENE_WIDTH + ' ' + h);
    pathSvg.setAttribute('preserveAspectRatio', 'none');
    pathSvg.style.width = SCENE_WIDTH + 'px';
    pathSvg.style.height = h + 'px';

    // Build smooth bezier path through all checkpoints
    pathD = buildSmoothPath(pathPoints);

    // Outline (thicker, darker)
    var outline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    outline.setAttribute('d', pathD);
    outline.setAttribute('class', 'worldmap-path-outline');
    pathSvg.appendChild(outline);

    // Main stroke
    var mainPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    mainPath.setAttribute('d', pathD);
    mainPath.setAttribute('class', 'worldmap-path-stroke');
    pathSvg.appendChild(mainPath);

    // Detail dashes on top
    var detail = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    detail.setAttribute('d', pathD);
    detail.setAttribute('class', 'worldmap-path-detail');
    pathSvg.appendChild(detail);

    layerNear.appendChild(pathSvg);
  }

  function buildSmoothPath(points) {
    if (points.length < 2) return '';

    var d = 'M ' + points[0].x + ' ' + points[0].y;

    for (var i = 0; i < points.length - 1; i++) {
      var p0 = points[Math.max(0, i - 1)];
      var p1 = points[i];
      var p2 = points[i + 1];
      var p3 = points[Math.min(points.length - 1, i + 2)];

      // Catmull-Rom to cubic bezier conversion
      var tension = 0.3;
      var cp1x = p1.x + (p2.x - p0.x) * tension;
      var cp1y = p1.y + (p2.y - p0.y) * tension;
      var cp2x = p2.x - (p3.x - p1.x) * tension;
      var cp2y = p2.y - (p3.y - p1.y) * tension;

      d += ' C ' + cp1x + ' ' + cp1y + ', ' + cp2x + ' ' + cp2y + ', ' + p2.x + ' ' + p2.y;
    }

    return d;
  }

  /* ---------- Render Checkpoints ---------- */
  function renderCheckpoints() {
    checkpointEls = [];
    var levels = window.LevelData ? window.LevelData[currentTheme] : [];
    var levelIds = levels.map(function (l) { return l.id; });

    for (var i = 0; i < CHECKPOINT_COUNT; i++) {
      var level = levels[i];
      var completed = level ? GameState.isCompleted(level.id) : false;
      var unlocked = level ? GameState.isUnlocked(level.id, levelIds) : false;

      var cp = document.createElement('div');
      cp.className = 'worldmap-checkpoint';
      if (completed) {
        cp.classList.add('completed');
      } else if (unlocked) {
        cp.classList.add('unlocked');
      } else {
        cp.classList.add('locked');
      }
      cp.setAttribute('data-index', i);

      // Marker circle
      var marker = document.createElement('div');
      marker.className = 'worldmap-checkpoint-marker';

      if (completed) {
        marker.innerHTML = '<span class="checkpoint-icon">' + checkmarkSVG() + '</span>';
      } else if (!unlocked) {
        marker.innerHTML = '<span class="checkpoint-icon">' + lockSVG() + '</span>';
      } else {
        marker.textContent = String(i + 1);
      }

      cp.appendChild(marker);

      // Label
      var label = document.createElement('div');
      label.className = 'worldmap-checkpoint-label';
      if (level && (completed || unlocked)) {
        label.textContent = L(level.name);
      }
      cp.appendChild(label);

      // Position along path
      var pt = pathPoints[i];
      cp.style.left = pt.x + 'px';
      cp.style.top = pt.y + 'px';

      layerNear.appendChild(cp);
      checkpointEls.push(cp);
    }
  }

  function checkmarkSVG() {
    return '<svg viewBox="0 0 24 24" width="24" height="24">' +
      '<polyline points="4,12 10,18 20,6" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';
  }

  function lockSVG() {
    return '<svg viewBox="0 0 24 24" width="20" height="20">' +
      '<rect x="5" y="11" width="14" height="11" rx="2" fill="rgba(255,255,255,0.6)"/>' +
      '<path d="M8 11V7a4 4 0 0 1 8 0v4" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round"/>' +
      '</svg>';
  }

  /* ---------- Render Character ---------- */
  function renderCharacter() {
    characterEl = document.createElement('div');
    characterEl.className = 'worldmap-character idle';

    // Try to use WorldMapBG if available, otherwise use placeholder
    var charContent = getCharacterContent();
    characterEl.innerHTML = charContent;

    layerNear.appendChild(characterEl);
  }

  function getCharacterContent() {
    // Use Theo avatar if available
    if (window.AvatarSVG && typeof window.AvatarSVG.theo === 'function') {
      return window.AvatarSVG.theo();
    }
    // Fallback to theme-specific characters
    if (window.WorldMapBG) {
      try {
        if (currentTheme === 'dino' && typeof window.WorldMapBG.babyTrex === 'function') {
          return window.WorldMapBG.babyTrex();
        } else if (currentTheme === 'truck' && typeof window.WorldMapBG.miniTruck === 'function') {
          return window.WorldMapBG.miniTruck();
        }
      } catch (e) {
        // fall through to placeholder
      }
    }
    // Placeholder: a themed circle
    return '<div class="worldmap-character-placeholder"></div>';
  }

  /* ---------- Position Character ---------- */
  function positionCharacterAtCurrent() {
    var idx = getCurrentCheckpointIndex();
    var pt = pathPoints[idx];
    characterPos.x = pt.x;
    characterPos.y = pt.y;
    applyCharacterPosition();
  }

  function getCurrentCheckpointIndex() {
    // Find the furthest completed checkpoint, default to 0
    var levels = window.LevelData ? window.LevelData[currentTheme] : [];
    var idx = 0;
    for (var i = 0; i < levels.length; i++) {
      if (GameState.isCompleted(levels[i].id)) idx = i;
    }
    return idx;
  }

  function applyCharacterPosition() {
    if (!characterEl) return;
    characterEl.style.left = characterPos.x + 'px';
    characterEl.style.top = characterPos.y + 'px';
  }

  /* ---------- Coins ---------- */
  function createCoins() {
    coins = [];
    coinEls = [];
    coinCount = 0;

    for (var i = 0; i < pathPoints.length - 1; i++) {
      var p1 = pathPoints[i];
      var p2 = pathPoints[i + 1];
      for (var j = 1; j <= 3; j++) {
        var t = j / 4;
        var cx = p1.x + (p2.x - p1.x) * t;
        var cy = p1.y + (p2.y - p1.y) * t - 30; // float above path
        var coin = { x: cx, y: cy, collected: false, index: coins.length };
        coins.push(coin);

        var el = document.createElement('div');
        el.className = 'worldmap-coin';
        el.innerHTML = '<svg viewBox="0 0 20 20" width="20" height="20"><circle cx="10" cy="10" r="9" fill="#f1c40f" stroke="#e67e22" stroke-width="1.5"/><text x="10" y="14" text-anchor="middle" font-size="10" fill="#e67e22" font-weight="bold">$</text></svg>';
        el.style.left = cx + 'px';
        el.style.top = cy + 'px';
        layerNear.appendChild(el);
        coinEls.push(el);
      }
    }
  }

  function checkCoinCollision() {
    for (var i = 0; i < coins.length; i++) {
      if (coins[i].collected) continue;
      var dx = characterPos.x - coins[i].x;
      var dy = characterPos.y - coins[i].y - 30;
      if (Math.abs(dx) < 30 && Math.abs(dy) < 30) {
        coins[i].collected = true;
        coinCount++;
        if (coinEls[i]) {
          coinEls[i].classList.add('collected');
        }
        if (window.AudioManager) AudioManager.collect();
        updateCoinDisplay();
      }
    }
  }

  function updateCoinDisplay() {
    var el = document.getElementById('worldmap-coin-count');
    if (el) el.textContent = coinCount;
  }

  /* ---------- Level Prompt ---------- */
  function checkProximityPrompt() {
    if (isWalking) { hidePrompt(); return; }

    var levels = window.LevelData ? window.LevelData[currentTheme] : [];
    var levelIds = levels.map(function (l) { return l.id; });
    var nearIdx = -1;

    for (var i = 0; i < pathPoints.length; i++) {
      var dx = Math.abs(characterPos.x - pathPoints[i].x);
      var dy = Math.abs(characterPos.y - pathPoints[i].y);
      if (dx < 40 && dy < 40) {
        var level = levels[i];
        if (level && GameState.isUnlocked(level.id, levelIds)) {
          nearIdx = i;
          break;
        }
      }
    }

    if (nearIdx >= 0 && nearIdx !== promptCheckpointIdx) {
      showPrompt(nearIdx, levels[nearIdx]);
    } else if (nearIdx < 0) {
      hidePrompt();
    }
  }

  function showPrompt(idx, level) {
    hidePrompt();
    promptCheckpointIdx = idx;

    promptEl = document.createElement('div');
    promptEl.className = 'worldmap-level-prompt';
    promptEl.innerHTML = '<div class="prompt-name">' + L(level.name) + '</div>' +
      '<div class="prompt-enter">' + t('pressEnter') + '</div>';
    promptEl.style.left = pathPoints[idx].x + 'px';
    promptEl.style.top = (pathPoints[idx].y - 60) + 'px';

    // Tap/click to enter
    promptEl.addEventListener('click', function () {
      if (window.AudioManager) AudioManager.tap();
      if (api.onCheckpointTap) api.onCheckpointTap(idx);
    });

    layerNear.appendChild(promptEl);
  }

  function hidePrompt() {
    if (promptEl && promptEl.parentNode) {
      promptEl.parentNode.removeChild(promptEl);
    }
    promptEl = null;
    promptCheckpointIdx = -1;
  }

  /* ---------- Dog Decorations ---------- */
  function placeDogs() {
    dogEls = [];
    if (!window.AvatarSVG) return;

    // Place Toffee near checkpoint 2 and Lula near checkpoint 7
    var dogConfigs = [
      { svgFn: 'toffee', cpIdx: 2, offsetX: 50, offsetY: 25 },
      { svgFn: 'lula', cpIdx: 7, offsetX: -55, offsetY: 20 }
    ];

    for (var i = 0; i < dogConfigs.length; i++) {
      var dc = dogConfigs[i];
      if (dc.cpIdx >= pathPoints.length) continue;
      if (typeof window.AvatarSVG[dc.svgFn] !== 'function') continue;

      var el = document.createElement('div');
      el.className = 'worldmap-dog';
      el.innerHTML = window.AvatarSVG[dc.svgFn]();
      el.style.left = (pathPoints[dc.cpIdx].x + dc.offsetX) + 'px';
      el.style.top = (pathPoints[dc.cpIdx].y + dc.offsetY) + 'px';
      layerNear.appendChild(el);
      dogEls.push(el);
    }
  }

  /* ---------- Arrow Key Walking ---------- */
  function updateArrowWalking(dt) {
    if (isDragging || isWalking) return;

    var moving = false;
    var dir = 0;
    if (arrowKeysDown['ArrowRight']) { dir = 1; moving = true; }
    else if (arrowKeysDown['ArrowLeft']) { dir = -1; moving = true; }

    if (!moving) return;

    // Move character along path
    var speed = ARROW_WALK_SPEED * (dt || 1);
    var newX = characterPos.x + dir * speed;

    // Clamp to first and last checkpoint
    var minX = pathPoints[0].x;
    var maxX = pathPoints[pathPoints.length - 1].x;
    newX = Math.max(minX, Math.min(maxX, newX));

    // Interpolate Y from path points
    var newY = interpolateY(newX);

    characterPos.x = newX;
    characterPos.y = newY;
    applyCharacterPosition();

    // Walking animation
    if (characterEl) {
      characterEl.classList.remove('idle');
      characterEl.classList.add('walking');
      if (dir < 0) {
        characterEl.style.transform = 'translate(-50%, -50%) scaleX(-1)';
      } else {
        characterEl.style.transform = 'translate(-50%, -50%)';
      }
    }

    // Auto-scroll to follow
    centerOnCharacter(true);

    // Check coin collision
    checkCoinCollision();

    // Check prompt proximity
    checkProximityPrompt();
  }

  function stopArrowWalking() {
    if (characterEl && !isWalking) {
      characterEl.classList.remove('walking');
      characterEl.classList.add('idle');
      characterEl.style.transform = '';
    }
  }

  function interpolateY(x) {
    // Find the two path points that bracket x
    for (var i = 0; i < pathPoints.length - 1; i++) {
      if (x >= pathPoints[i].x && x <= pathPoints[i + 1].x) {
        var t = (x - pathPoints[i].x) / (pathPoints[i + 1].x - pathPoints[i].x);
        return pathPoints[i].y + (pathPoints[i + 1].y - pathPoints[i].y) * t;
      }
    }
    // Fallback
    return pathPoints[pathPoints.length - 1].y;
  }

  /* ---------- Walk Character to Checkpoint ---------- */
  function walkToCheckpoint(targetIndex, callback) {
    if (isWalking) return;
    isWalking = true;

    characterEl.classList.remove('idle');
    characterEl.classList.add('walking');

    var startX = characterPos.x;
    var startY = characterPos.y;
    var endPt = pathPoints[targetIndex];
    var endX = endPt.x;
    var endY = endPt.y;

    // Collect intermediate points along the path between current and target
    var walkPoints = interpolatePathPoints(startX, startY, endX, endY, targetIndex);

    var startTime = null;
    var duration = WALK_DURATION;

    // Flip character based on direction
    if (endX < startX) {
      characterEl.style.transform = 'translate(-50%, -50%) scaleX(-1)';
    }

    function animateWalk(timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);

      // Ease-in-out
      var t = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      // Interpolate along walk points
      var totalPoints = walkPoints.length;
      var floatIndex = t * (totalPoints - 1);
      var idx0 = Math.floor(floatIndex);
      var idx1 = Math.min(idx0 + 1, totalPoints - 1);
      var frac = floatIndex - idx0;

      var px = walkPoints[idx0].x + (walkPoints[idx1].x - walkPoints[idx0].x) * frac;
      var py = walkPoints[idx0].y + (walkPoints[idx1].y - walkPoints[idx0].y) * frac;

      // Add bounce effect while walking
      var bouncePhase = (elapsed / 120) * Math.PI;
      var bounceY = -Math.abs(Math.sin(bouncePhase)) * 8;
      py += bounceY;

      characterPos.x = px;
      characterPos.y = py - bounceY; // store without bounce
      characterEl.style.left = px + 'px';
      characterEl.style.top = py + 'px';

      // Check coin collision during walk
      checkCoinCollision();

      // Auto-scroll to follow character
      centerOnCharacter(true);

      if (progress < 1) {
        walkAnimId = requestAnimationFrame(animateWalk);
      } else {
        // Walk complete
        isWalking = false;
        characterEl.classList.remove('walking');
        characterEl.classList.add('idle');
        characterEl.style.transform = '';
        characterPos.x = endX;
        characterPos.y = endY;
        applyCharacterPosition();
        walkAnimId = null;

        if (callback) callback();
      }
    }

    walkAnimId = requestAnimationFrame(animateWalk);
  }

  function interpolatePathPoints(startX, startY, endX, endY, targetIndex) {
    // Generate intermediate points along the SVG path between character and target
    var points = [];
    points.push({ x: startX, y: startY });

    // Find which checkpoints are between start and target
    var currentIdx = -1;
    var minDist = Infinity;
    for (var i = 0; i < pathPoints.length; i++) {
      var dx = pathPoints[i].x - startX;
      var dy = pathPoints[i].y - startY;
      var dist = dx * dx + dy * dy;
      if (dist < minDist) {
        minDist = dist;
        currentIdx = i;
      }
    }

    // Walk through checkpoint path points
    var step = targetIndex > currentIdx ? 1 : -1;
    var i = currentIdx + step;
    while ((step > 0 && i <= targetIndex) || (step < 0 && i >= targetIndex)) {
      points.push({ x: pathPoints[i].x, y: pathPoints[i].y });
      i += step;
    }

    // Ensure end point is included
    var last = points[points.length - 1];
    if (last.x !== endX || last.y !== endY) {
      points.push({ x: endX, y: endY });
    }

    // Subdivide for smoother motion (at least WALK_STEPS points)
    if (points.length < WALK_STEPS) {
      points = subdividePoints(points, WALK_STEPS);
    }

    return points;
  }

  function subdividePoints(points, targetCount) {
    if (points.length >= targetCount || points.length < 2) return points;

    // Calculate total path length
    var lengths = [0];
    var totalLen = 0;
    for (var i = 1; i < points.length; i++) {
      var dx = points[i].x - points[i - 1].x;
      var dy = points[i].y - points[i - 1].y;
      totalLen += Math.sqrt(dx * dx + dy * dy);
      lengths.push(totalLen);
    }

    if (totalLen === 0) return points;

    // Sample evenly along the path
    var result = [];
    for (var s = 0; s < targetCount; s++) {
      var t = (s / (targetCount - 1)) * totalLen;

      // Find segment
      var segIdx = 0;
      for (var j = 1; j < lengths.length; j++) {
        if (lengths[j] >= t) {
          segIdx = j - 1;
          break;
        }
        segIdx = j - 1;
      }

      var segLen = lengths[segIdx + 1] - lengths[segIdx];
      var frac = segLen > 0 ? (t - lengths[segIdx]) / segLen : 0;

      result.push({
        x: points[segIdx].x + (points[segIdx + 1].x - points[segIdx].x) * frac,
        y: points[segIdx].y + (points[segIdx + 1].y - points[segIdx].y) * frac
      });
    }

    return result;
  }

  /* ---------- Scrolling / Panning ---------- */
  function centerOnCharacter(smooth) {
    var targetScroll = characterPos.x - viewportWidth / 2;
    targetScroll = clampScroll(targetScroll);

    if (smooth) {
      // Ease toward target
      scrollX += (targetScroll - scrollX) * 0.12;
    } else {
      scrollX = targetScroll;
    }
  }

  function clampScroll(val) {
    return Math.max(0, Math.min(val, maxScroll));
  }

  function onResize() {
    if (!viewport) return;
    viewportWidth = viewport.offsetWidth;
    maxScroll = SCENE_WIDTH - viewportWidth;
    if (maxScroll < 0) maxScroll = 0;

    // Recompute path positions based on current height
    var oldPoints = pathPoints.slice();
    computePath();

    // Update checkpoint positions
    for (var i = 0; i < checkpointEls.length; i++) {
      checkpointEls[i].style.left = pathPoints[i].x + 'px';
      checkpointEls[i].style.top = pathPoints[i].y + 'px';
    }

    // Update SVG
    if (pathSvg) {
      var h = viewport.offsetHeight;
      pathSvg.setAttribute('viewBox', '0 0 ' + SCENE_WIDTH + ' ' + h);
      pathSvg.style.height = h + 'px';

      pathD = buildSmoothPath(pathPoints);
      var paths = pathSvg.querySelectorAll('path');
      for (var j = 0; j < paths.length; j++) {
        paths[j].setAttribute('d', pathD);
      }
    }

    // Reposition character
    if (!isWalking && characterEl) {
      var idx = getCurrentCheckpointIndex();
      if (pathPoints[idx]) {
        characterPos.x = pathPoints[idx].x;
        characterPos.y = pathPoints[idx].y;
        applyCharacterPosition();
      }
    }
  }

  /* ---------- Animation Loop ---------- */
  function startLoop() {
    function tick() {
      if (!viewport) return;

      // Arrow key walking
      var anyArrow = arrowKeysDown['ArrowLeft'] || arrowKeysDown['ArrowRight'];
      if (anyArrow) {
        updateArrowWalking(1);
      } else if (!isWalking && characterEl && characterEl.classList.contains('walking') && !anyArrow) {
        stopArrowWalking();
      }

      // Apply momentum when not dragging and not walking
      if (!isDragging && !isWalking && !anyArrow) {
        if (Math.abs(velocity) > MIN_VELOCITY) {
          scrollX += velocity;
          velocity *= FRICTION;
        } else {
          velocity = 0;
        }
      }

      // Center on character when walking
      if (isWalking) {
        centerOnCharacter(true);
      }

      // Clamp
      scrollX = clampScroll(scrollX);

      // Apply parallax transforms
      applyParallax();

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
  }

  function applyParallax() {
    if (layerFar) {
      layerFar.style.transform = 'translateX(' + (-scrollX * PARALLAX_FAR) + 'px)';
    }
    if (layerMid) {
      layerMid.style.transform = 'translateX(' + (-scrollX * PARALLAX_MID) + 'px)';
    }
    if (layerNear) {
      layerNear.style.transform = 'translateX(' + (-scrollX * PARALLAX_NEAR) + 'px)';
    }
  }

  /* ---------- Event Handling ---------- */
  function bindEvents() {
    if (!viewport) return;

    // Touch events
    boundHandlers.touchstart = onTouchStart;
    boundHandlers.touchmove = onTouchMove;
    boundHandlers.touchend = onTouchEnd;
    viewport.addEventListener('touchstart', boundHandlers.touchstart, { passive: false });
    viewport.addEventListener('touchmove', boundHandlers.touchmove, { passive: false });
    viewport.addEventListener('touchend', boundHandlers.touchend, { passive: true });

    // Mouse events (fallback)
    boundHandlers.mousedown = onMouseDown;
    boundHandlers.mousemove = onMouseMove;
    boundHandlers.mouseup = onMouseUp;
    viewport.addEventListener('mousedown', boundHandlers.mousedown);
    window.addEventListener('mousemove', boundHandlers.mousemove);
    window.addEventListener('mouseup', boundHandlers.mouseup);

    // Checkpoint taps
    boundHandlers.checkpointTaps = [];
    checkpointEls.forEach(function (cp, i) {
      var handler = function (e) {
        onCheckpointClick(i, e);
      };
      boundHandlers.checkpointTaps.push(handler);
      cp.addEventListener('click', handler);
    });

    // Back button
    if (backBtn) {
      boundHandlers.backClick = function () {
        if (window.AudioManager) AudioManager.tap();
        if (api.onBack) api.onBack();
      };
      backBtn.addEventListener('click', boundHandlers.backClick);
    }

    // Arrow keys for walking + Enter/Space for checkpoint
    boundHandlers.keydown = function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        arrowKeysDown[e.key] = true;
      }
      if ((e.key === 'Enter' || e.key === ' ') && promptCheckpointIdx >= 0) {
        e.preventDefault();
        if (window.AudioManager) AudioManager.tap();
        if (api.onCheckpointTap) api.onCheckpointTap(promptCheckpointIdx);
      }
    };
    boundHandlers.keyup = function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        arrowKeysDown[e.key] = false;
      }
    };
    document.addEventListener('keydown', boundHandlers.keydown);
    document.addEventListener('keyup', boundHandlers.keyup);

    // Resize
    boundHandlers.resize = function () {
      onResize();
      centerOnCharacter(false);
    };
    window.addEventListener('resize', boundHandlers.resize);
  }

  function unbindEvents() {
    if (viewport) {
      if (boundHandlers.touchstart) viewport.removeEventListener('touchstart', boundHandlers.touchstart);
      if (boundHandlers.touchmove) viewport.removeEventListener('touchmove', boundHandlers.touchmove);
      if (boundHandlers.touchend) viewport.removeEventListener('touchend', boundHandlers.touchend);
      if (boundHandlers.mousedown) viewport.removeEventListener('mousedown', boundHandlers.mousedown);
    }

    if (boundHandlers.mousemove) window.removeEventListener('mousemove', boundHandlers.mousemove);
    if (boundHandlers.mouseup) window.removeEventListener('mouseup', boundHandlers.mouseup);

    if (boundHandlers.checkpointTaps) {
      boundHandlers.checkpointTaps.forEach(function (handler, i) {
        if (checkpointEls[i]) {
          checkpointEls[i].removeEventListener('click', handler);
        }
      });
    }

    if (backBtn && boundHandlers.backClick) {
      backBtn.removeEventListener('click', boundHandlers.backClick);
    }

    if (boundHandlers.keydown) document.removeEventListener('keydown', boundHandlers.keydown);
    if (boundHandlers.keyup) document.removeEventListener('keyup', boundHandlers.keyup);

    if (boundHandlers.resize) {
      window.removeEventListener('resize', boundHandlers.resize);
    }

    arrowKeysDown = {};
    boundHandlers = {};
  }

  /* ---------- Touch Handling ---------- */
  var touchStartY = 0;
  var isHorizontalSwipe = null;
  var hasMoved = false;

  function onTouchStart(e) {
    if (isWalking) return;
    var touch = e.touches[0];
    isDragging = true;
    hasMoved = false;
    isHorizontalSwipe = null;
    dragStartX = touch.clientX;
    touchStartY = touch.clientY;
    dragStartScroll = scrollX;
    lastDragX = touch.clientX;
    lastDragTime = Date.now();
    velocity = 0;
  }

  function onTouchMove(e) {
    if (!isDragging) return;
    var touch = e.touches[0];
    var dx = touch.clientX - dragStartX;
    var dy = touch.clientY - touchStartY;

    // Determine swipe direction on first significant movement
    if (isHorizontalSwipe === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
      isHorizontalSwipe = Math.abs(dx) > Math.abs(dy);
    }

    if (isHorizontalSwipe === false) {
      // Vertical swipe, let the browser handle it
      isDragging = false;
      return;
    }

    if (isHorizontalSwipe) {
      e.preventDefault();
    }

    hasMoved = true;

    // Calculate velocity
    var now = Date.now();
    var dt = now - lastDragTime;
    if (dt > 0) {
      velocity = (lastDragX - touch.clientX) / dt * 16; // normalize to ~60fps
    }
    lastDragX = touch.clientX;
    lastDragTime = now;

    scrollX = dragStartScroll - dx;
    scrollX = clampScroll(scrollX);
  }

  function onTouchEnd() {
    isDragging = false;
    isHorizontalSwipe = null;
  }

  /* ---------- Mouse Handling ---------- */
  var mouseHasMoved = false;

  function onMouseDown(e) {
    if (isWalking) return;
    // Ignore clicks on buttons
    if (e.target.closest('.worldmap-back')) return;

    isDragging = true;
    mouseHasMoved = false;
    dragStartX = e.clientX;
    dragStartScroll = scrollX;
    lastDragX = e.clientX;
    lastDragTime = Date.now();
    velocity = 0;
    e.preventDefault();
  }

  function onMouseMove(e) {
    if (!isDragging) return;
    var dx = e.clientX - dragStartX;
    if (Math.abs(dx) > 4) mouseHasMoved = true;

    var now = Date.now();
    var dt = now - lastDragTime;
    if (dt > 0) {
      velocity = (lastDragX - e.clientX) / dt * 16;
    }
    lastDragX = e.clientX;
    lastDragTime = now;

    scrollX = dragStartScroll - dx;
    scrollX = clampScroll(scrollX);
  }

  function onMouseUp() {
    isDragging = false;
  }

  /* ---------- Checkpoint Click ---------- */
  function onCheckpointClick(index, e) {
    // Don't trigger on drag
    if (hasMoved || mouseHasMoved) return;
    if (isWalking) return;

    var levels = window.LevelData ? window.LevelData[currentTheme] : [];
    var levelIds = levels.map(function (l) { return l.id; });
    var level = levels[index];
    if (!level) return;

    var unlocked = GameState.isUnlocked(level.id, levelIds);
    if (!unlocked) return;

    if (window.AudioManager) AudioManager.tap();

    // Walk character to checkpoint, then trigger callback
    walkToCheckpoint(index, function () {
      if (api.onCheckpointTap) {
        api.onCheckpointTap(index);
      }
    });
  }

  return api;
})();
