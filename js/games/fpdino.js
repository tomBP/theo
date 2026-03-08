/* ===== First-Person Dino Rider ===== */
window.FPDinoGame = (function () {
  var container, callback;
  var rafId, destroyed;
  var lastTime, areaWidth, areaHeight;
  var boundKeyDown, boundKeyUp;

  // Player state
  var playerLane;
  var lanePos;
  var isJumping, jumpTimer, jumpDuration;
  var collected, totalCollectibles;
  var isDead, deathTimer;
  var speed, distance;
  var dinoBounce;
  var graceTimer;

  // Road & obstacles
  var obstacles, collectibles;
  var spawnTimer, collectibleTimer;
  var LANE_COUNT = 3;

  // Pseudo-3D path parameters
  var PATH_VANISH_Y;
  var PATH_BOTTOM_Y;
  var PATH_LEFT_VANISH, PATH_RIGHT_VANISH;
  var PATH_LEFT_BOTTOM, PATH_RIGHT_BOTTOM;

  // Config
  var collectibleEmoji, speedRamp;
  var baseSpeed, maxSpeed;

  // Timing constants
  // Steering wheel drag state
  var steerDragging = false;
  var steerStartX = 0;
  var steerAngle = 0;
  var boundSteerDown, boundSteerMove, boundSteerUp;

  var OBSTACLE_INTERVAL = 2.0;
  var COLLECTIBLE_INTERVAL = 1.2;
  var GRACE_PERIOD = 2.5;
  var Z_SPEED_BASE = 0.32;
  var HIT_Z = 0.12;

  // Decorative trees scrolling
  var trees = [];
  var treeSpawnTimer = 0;

  function start(config, gameArea, onComplete) {
    container = gameArea;
    callback = onComplete;
    destroyed = false;

    totalCollectibles = config.totalCollectibles || 10;
    collectibleEmoji = config.collectible || '🥚';
    speedRamp = config.speedRamp !== false;
    baseSpeed = config.baseSpeed || 3;
    maxSpeed = config.maxSpeed || 6;

    resetState();
    render();
    bindEvents();
    lastTime = performance.now();
    rafId = requestAnimationFrame(gameLoop);
  }

  function resetState() {
    playerLane = 1;
    lanePos = 1;
    isJumping = false;
    jumpTimer = 0;
    jumpDuration = 0.65;
    collected = 0;
    isDead = false;
    speed = baseSpeed;
    distance = 0;
    dinoBounce = 0;
    graceTimer = GRACE_PERIOD;
    obstacles = [];
    collectibles = [];
    trees = [];
    spawnTimer = OBSTACLE_INTERVAL * 0.7;
    collectibleTimer = 0.5;
    treeSpawnTimer = 0;
  }

  function render() {
    var html = '<style>';
    html += '.fpdn-area{position:relative;width:100%;height:100%;min-height:280px;overflow:hidden;border-radius:var(--radius-medium);touch-action:none;-webkit-user-select:none;user-select:none;cursor:pointer;background:#333;}';
    html += '.fpdn-canvas{display:block;}';
    html += '.fpdn-score{position:absolute;top:8px;right:10px;font-family:var(--font-title);font-size:clamp(0.9rem,2.8vw,1.2rem);color:var(--color-text);z-index:30;background:rgba(255,255,255,0.88);padding:3px 10px;border-radius:var(--radius-small);box-shadow:var(--shadow-soft);}';
    html += '.fpdn-speed{position:absolute;top:8px;left:10px;font-family:var(--font-title);font-size:clamp(0.75rem,2.2vw,0.95rem);color:var(--color-text);z-index:30;background:rgba(255,255,255,0.88);padding:3px 10px;border-radius:var(--radius-small);}';
    html += '.fpdn-hint{position:absolute;top:40%;left:50%;transform:translate(-50%,-50%);font-family:var(--font-body);font-weight:700;font-size:clamp(0.85rem,2.8vw,1.05rem);color:#fff;z-index:30;white-space:nowrap;background:rgba(0,0,0,0.6);padding:6px 14px;border-radius:var(--radius-small);pointer-events:none;transition:opacity 0.5s;}';
    html += '.fpdn-steer-zone{position:absolute;bottom:0;left:0;right:0;height:22%;z-index:25;touch-action:none;-webkit-user-select:none;user-select:none;cursor:grab;}';
    html += '.fpdn-steer-zone:active{cursor:grabbing;}';
    html += '.fpdn-steer-hint{position:absolute;bottom:2%;left:50%;transform:translateX(-50%);font-family:var(--font-body);font-size:clamp(0.6rem,1.8vw,0.75rem);color:rgba(255,255,255,0.5);z-index:26;pointer-events:none;transition:opacity 0.5s;}';
    html += '.fpdn-ctrl-jump{position:absolute;bottom:22%;right:10px;z-index:26;pointer-events:auto;border:none;outline:none;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;-webkit-user-select:none;user-select:none;touch-action:none;opacity:0.65;transition:opacity 0.15s,transform 0.1s;width:56px;height:56px;font-size:0.75rem;font-family:var(--font-title);font-weight:800;background:rgba(46,204,113,0.35);border:2px solid rgba(46,204,113,0.5);}';
    html += '.fpdn-ctrl-jump:active{opacity:1;transform:scale(1.1);}';
    html += '.fpdn-flash{position:absolute;inset:0;background:rgba(255,0,0,0.3);z-index:35;pointer-events:none;animation:fpdn-flash-out 0.5s ease-out forwards;}';
    html += '@keyframes fpdn-flash-out{from{opacity:1;}to{opacity:0;}}';
    html += '.fpdn-ouch{position:absolute;left:50%;top:30%;transform:translateX(-50%);font-family:var(--font-title);font-size:2rem;color:#e74c3c;z-index:36;pointer-events:none;animation:fpdn-ouch-float 1s ease-out forwards;text-shadow:0 2px 6px rgba(0,0,0,0.4);}';
    html += '@keyframes fpdn-ouch-float{0%{opacity:1;transform:translateX(-50%) translateY(0) scale(1);}100%{opacity:0;transform:translateX(-50%) translateY(-50px) scale(1.4);}}';
    html += '.fpdn-reset-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.55);z-index:40;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;animation:fpdn-ov-in 0.3s ease;}';
    html += '@keyframes fpdn-ov-in{from{opacity:0;}to{opacity:1;}}';
    html += '.fpdn-reset-text{font-family:var(--font-title);font-size:clamp(1.5rem,5vw,2rem);color:white;text-shadow:0 2px 8px rgba(0,0,0,0.4);}';
    html += '.fpdn-reset-sub{font-family:var(--font-body);font-weight:700;font-size:clamp(0.9rem,3vw,1.1rem);color:rgba(255,255,255,0.9);}';
    html += '</style>';

    html += '<div class="fpdn-area" id="fpdn-area">';
    html += '<canvas class="fpdn-canvas" id="fpdn-canvas"></canvas>';
    html += '<div class="fpdn-score" id="fpdn-score">0/' + totalCollectibles + ' ' + collectibleEmoji + '</div>';
    html += '<div class="fpdn-speed" id="fpdn-speed">20 km/h</div>';
    html += '<div class="fpdn-hint" id="fpdn-hint">' + L({
      es: 'Esquiva obstaculos y recoge huevos de dino!',
      en: 'Dodge obstacles and collect dino eggs!',
      ca: 'Esquiva obstacles i recull ous de dino!'
    }) + '</div>';
    html += '<div class="fpdn-steer-zone" id="fpdn-steer-zone"></div>';
    html += '<div class="fpdn-steer-hint" id="fpdn-steer-hint">' + L({
      es: 'Arrastra para girar',
      en: 'Drag to steer',
      ca: 'Arrossega per girar'
    }) + '</div>';
    html += '<button class="fpdn-ctrl-jump" id="fpdn-jump" aria-label="Jump">JUMP</button>';
    html += '</div>';

    container.innerHTML = html;

    var area = document.getElementById('fpdn-area');
    if (area) {
      areaWidth = area.offsetWidth;
      areaHeight = area.offsetHeight;
    }

    var canvas = document.getElementById('fpdn-canvas');
    if (canvas) {
      canvas.width = areaWidth;
      canvas.height = areaHeight;
      canvas.style.width = areaWidth + 'px';
      canvas.style.height = areaHeight + 'px';
    }

    PATH_VANISH_Y = areaHeight * 0.38;
    PATH_BOTTOM_Y = areaHeight;
    var vanishX = areaWidth * 0.5;
    PATH_LEFT_VANISH = vanishX - areaWidth * 0.04;
    PATH_RIGHT_VANISH = vanishX + areaWidth * 0.04;
    PATH_LEFT_BOTTOM = -areaWidth * 0.25;
    PATH_RIGHT_BOTTOM = areaWidth * 1.25;

    setTimeout(function () {
      var hint = document.getElementById('fpdn-hint');
      if (hint) {
        hint.style.opacity = '0';
        setTimeout(function () { if (hint.parentNode) hint.parentNode.removeChild(hint); }, 600);
      }
    }, 2500);
  }

  function steerLeft() {
    if (isDead) return;
    if (playerLane > 0) { playerLane--; AudioManager.tap(); }
  }

  function steerRight() {
    if (isDead) return;
    if (playerLane < 2) { playerLane++; AudioManager.tap(); }
  }

  function doJump() {
    if (isJumping || isDead) return;
    isJumping = true;
    jumpTimer = 0;
    AudioManager.tap();
  }

  function bindEvents() {
    var jumpBtn = document.getElementById('fpdn-jump');
    var steerZone = document.getElementById('fpdn-steer-zone');

    if (jumpBtn) {
      jumpBtn.addEventListener('touchstart', function (e) { e.preventDefault(); e.stopPropagation(); doJump(); }, { passive: false });
      jumpBtn.addEventListener('mousedown', function (e) { e.preventDefault(); e.stopPropagation(); doJump(); });
    }

    var DRAG_THRESHOLD = 35;
    var lastLaneTriggered = 1;

    function onSteerStart(x) {
      if (isDead) return;
      steerDragging = true;
      steerStartX = x;
      lastLaneTriggered = playerLane;
    }

    function onSteerMove(x) {
      if (!steerDragging || isDead) return;
      var dx = x - steerStartX;
      steerAngle = Math.max(-1, Math.min(1, dx / (DRAG_THRESHOLD * 2)));

      var targetLane = lastLaneTriggered;
      if (dx > DRAG_THRESHOLD) {
        targetLane = Math.min(2, lastLaneTriggered + 1);
      } else if (dx < -DRAG_THRESHOLD) {
        targetLane = Math.max(0, lastLaneTriggered - 1);
      }

      if (targetLane !== playerLane) {
        if (targetLane > playerLane) steerRight();
        else steerLeft();
        lastLaneTriggered = playerLane;
        steerStartX = x;
      }
    }

    function onSteerEnd() {
      steerDragging = false;
      steerAngle = 0;
    }

    if (steerZone) {
      steerZone.addEventListener('touchstart', function (e) {
        e.preventDefault();
        onSteerStart(e.touches[0].clientX);
      }, { passive: false });
      steerZone.addEventListener('touchmove', function (e) {
        e.preventDefault();
        onSteerMove(e.touches[0].clientX);
      }, { passive: false });
      steerZone.addEventListener('touchend', function (e) { e.preventDefault(); onSteerEnd(); }, { passive: false });
      steerZone.addEventListener('touchcancel', function () { onSteerEnd(); });
      steerZone.addEventListener('mousedown', function (e) { e.preventDefault(); onSteerStart(e.clientX); });
    }

    boundSteerMove = function (e) { onSteerMove(e.clientX); };
    boundSteerUp = function () { onSteerEnd(); };
    document.addEventListener('mousemove', boundSteerMove);
    document.addEventListener('mouseup', boundSteerUp);

    boundKeyDown = function (e) {
      if (isDead) return;
      if (e.key === 'ArrowLeft' || e.key === 'a') { e.preventDefault(); steerLeft(); }
      else if (e.key === 'ArrowRight' || e.key === 'd') { e.preventDefault(); steerRight(); }
      else if (e.key === ' ' || e.key === 'ArrowUp') { e.preventDefault(); doJump(); }
    };
    boundKeyUp = function () {};
    document.addEventListener('keydown', boundKeyDown);
    document.addEventListener('keyup', boundKeyUp);

    setTimeout(function () {
      var hint = document.getElementById('fpdn-steer-hint');
      if (hint) {
        hint.style.opacity = '0';
        setTimeout(function () { if (hint.parentNode) hint.parentNode.removeChild(hint); }, 600);
      }
    }, 3000);
  }

  // --- Spawning ---
  function spawnObstacle() {
    var lane;
    if (graceTimer > 0) {
      var safeLanes = [0, 1, 2];
      safeLanes.splice(safeLanes.indexOf(playerLane), 1);
      lane = safeLanes[Math.floor(Math.random() * safeLanes.length)];
    } else {
      lane = Math.floor(Math.random() * LANE_COUNT);
    }
    var types = ['rock', 'lava', 'fern', 'bones'];
    var type = types[Math.floor(Math.random() * types.length)];

    obstacles.push({
      lane: lane,
      z: 1.0,
      type: type,
      jumpable: (type === 'bones'),
      active: true
    });
  }

  function spawnCollectible() {
    if (collected + countActiveCollectibles() >= totalCollectibles) return;
    var safeLanes = [0, 1, 2];
    for (var i = 0; i < obstacles.length; i++) {
      if (obstacles[i].z > 0.6) {
        var idx = safeLanes.indexOf(obstacles[i].lane);
        if (idx > -1 && safeLanes.length > 1) safeLanes.splice(idx, 1);
      }
    }
    var lane = safeLanes[Math.floor(Math.random() * safeLanes.length)];
    collectibles.push({ lane: lane, z: 1.0, active: true });
  }

  function countActiveCollectibles() {
    var c = 0;
    for (var i = 0; i < collectibles.length; i++) { if (collectibles[i].active) c++; }
    return c;
  }

  function spawnTree() {
    var side = Math.random() < 0.5 ? -1 : 1;
    trees.push({ z: 1.0, side: side, type: Math.floor(Math.random() * 3) });
  }

  // --- Perspective ---
  function projectZ(z) {
    var curve = z * z;
    return { y: PATH_VANISH_Y + (PATH_BOTTOM_Y - PATH_VANISH_Y) * curve, scale: curve };
  }

  function getLaneX(lane, z) {
    var t = projectZ(z).scale;
    var le = PATH_LEFT_VANISH + (PATH_LEFT_BOTTOM - PATH_LEFT_VANISH) * t;
    var re = PATH_RIGHT_VANISH + (PATH_RIGHT_BOTTOM - PATH_RIGHT_VANISH) * t;
    var lw = (re - le) / LANE_COUNT;
    return le + lw * (lane + 0.5);
  }

  // --- Main Loop ---
  function gameLoop(timestamp) {
    if (destroyed) return;
    var rawDt = (timestamp - lastTime) / 1000;
    var dt = Math.min(rawDt, 0.1);
    lastTime = timestamp;

    if (isDead) { rafId = requestAnimationFrame(gameLoop); return; }

    if (speedRamp && totalCollectibles > 0) {
      speed = baseSpeed + (maxSpeed - baseSpeed) * (collected / totalCollectibles);
    }

    if (graceTimer > 0) graceTimer -= dt;

    var speedFactor = speed / baseSpeed;
    var zPerSec = Z_SPEED_BASE * speedFactor;
    var zStep = zPerSec * dt;
    distance += zStep;

    dinoBounce += dt * 4;

    lanePos += (playerLane - lanePos) * Math.min(1, dt * 12);

    spawnTimer -= dt;
    if (spawnTimer <= 0) {
      spawnObstacle();
      spawnTimer = OBSTACLE_INTERVAL / Math.sqrt(speedFactor) + Math.random() * 0.6;
    }

    collectibleTimer -= dt;
    if (collectibleTimer <= 0 && collected < totalCollectibles) {
      spawnCollectible();
      collectibleTimer = COLLECTIBLE_INTERVAL + Math.random() * 0.5;
    }

    // Spawn decorative trees
    treeSpawnTimer -= dt;
    if (treeSpawnTimer <= 0) {
      spawnTree();
      treeSpawnTimer = 0.6 + Math.random() * 0.4;
    }

    if (isJumping) {
      jumpTimer += dt;
      if (jumpTimer >= jumpDuration) { isJumping = false; jumpTimer = 0; }
    }

    // Move obstacles
    for (var i = obstacles.length - 1; i >= 0; i--) {
      var obs = obstacles[i];
      obs.z -= zStep;

      if (obs.active && graceTimer <= 0 && obs.z < HIT_Z && obs.z > -0.03) {
        if (obs.lane === playerLane) {
          if (obs.jumpable && isJumping) {
            obs.active = false;
          } else {
            triggerDeath();
            rafId = requestAnimationFrame(gameLoop);
            return;
          }
        }
      }
      if (obs.z < -0.15) obstacles.splice(i, 1);
    }

    // Move collectibles
    for (var j = collectibles.length - 1; j >= 0; j--) {
      var col = collectibles[j];
      col.z -= zStep;

      if (col.active && col.z < HIT_Z && col.z > -0.03) {
        if (col.lane === playerLane) {
          col.active = false;
          collected++;
          AudioManager.collect();
          updateScore();
          updateProgress();
          if (collected >= totalCollectibles) { finishGame(); return; }
        }
      }
      if (col.z < -0.15) collectibles.splice(j, 1);
    }

    // Move trees
    for (var ti = trees.length - 1; ti >= 0; ti--) {
      trees[ti].z -= zStep;
      if (trees[ti].z < -0.15) trees.splice(ti, 1);
    }

    renderFrame();
    rafId = requestAnimationFrame(gameLoop);
  }

  // --- Rendering ---
  function renderFrame() {
    var canvas = document.getElementById('fpdn-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var w = areaWidth, h = areaHeight;

    ctx.clearRect(0, 0, w, h);

    // Sky — prehistoric warm sky
    var sg = ctx.createLinearGradient(0, 0, 0, h * 0.40);
    sg.addColorStop(0, '#5b3a8c');
    sg.addColorStop(0.4, '#d4726a');
    sg.addColorStop(0.7, '#f4a261');
    sg.addColorStop(1, '#e9c46a');
    ctx.fillStyle = sg;
    ctx.fillRect(0, 0, w, h * 0.42);

    // Sun (large prehistoric sun)
    ctx.fillStyle = '#f4a261';
    ctx.beginPath(); ctx.arc(w * 0.2, h * 0.12, 22, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(244,162,97,0.2)';
    ctx.beginPath(); ctx.arc(w * 0.2, h * 0.12, 35, 0, Math.PI * 2); ctx.fill();

    // Pterodactyl silhouettes (scrolling)
    drawPterodactyl(ctx, w, h);

    // Volcanic mountains
    ctx.fillStyle = '#4a3728';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.38);
    ctx.lineTo(w * 0.08, h * 0.30);
    ctx.lineTo(w * 0.15, h * 0.25);
    ctx.lineTo(w * 0.22, h * 0.32);
    ctx.lineTo(w * 0.35, h * 0.20);
    ctx.lineTo(w * 0.42, h * 0.28);
    ctx.lineTo(w * 0.55, h * 0.22);
    ctx.lineTo(w * 0.65, h * 0.30);
    ctx.lineTo(w * 0.75, h * 0.24);
    ctx.lineTo(w * 0.85, h * 0.28);
    ctx.lineTo(w * 0.92, h * 0.32);
    ctx.lineTo(w, h * 0.26);
    ctx.lineTo(w, h * 0.40);
    ctx.lineTo(0, h * 0.40);
    ctx.closePath();
    ctx.fill();

    // Volcano smoke from tallest peak
    var smokeX = w * 0.35;
    var smokeY = h * 0.20;
    ctx.fillStyle = 'rgba(180,180,180,0.25)';
    var smokeOff = Math.sin(distance * 2) * 5;
    ctx.beginPath(); ctx.arc(smokeX + smokeOff, smokeY - 8, 6, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(smokeX - 3 + smokeOff, smokeY - 16, 8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(smokeX + 4 + smokeOff, smokeY - 26, 5, 0, Math.PI * 2); ctx.fill();

    // Lava glow at volcano top
    ctx.fillStyle = 'rgba(231,76,60,0.4)';
    ctx.beginPath(); ctx.arc(smokeX, smokeY + 2, 4, 0, Math.PI * 2); ctx.fill();

    // Ground — jungle/prehistoric terrain
    var dg = ctx.createLinearGradient(0, h * 0.38, 0, h);
    dg.addColorStop(0, '#5a7a3a');
    dg.addColorStop(0.3, '#4a6a2a');
    dg.addColorStop(1, '#3a5a1a');
    ctx.fillStyle = dg;
    ctx.fillRect(0, h * 0.38, w, h * 0.62);

    // Path (dirt trail)
    drawPath(ctx, w, h);

    // Side trees (far to near)
    for (var ti = 0; ti < trees.length; ti++) {
      drawSideTree(ctx, trees[ti], w, h);
    }

    // Entities — sort far to near
    var ents = [];
    for (var oi = 0; oi < obstacles.length; oi++) {
      if (obstacles[oi].z > -0.05 && obstacles[oi].z < 1.02)
        ents.push({ k: 'o', d: obstacles[oi] });
    }
    for (var ci = 0; ci < collectibles.length; ci++) {
      if (collectibles[ci].active && collectibles[ci].z > -0.05 && collectibles[ci].z < 1.02)
        ents.push({ k: 'c', d: collectibles[ci] });
    }
    ents.sort(function (a, b) { return b.d.z - a.d.z; });
    for (var ei = 0; ei < ents.length; ei++) {
      if (ents[ei].k === 'o') drawObstacle(ctx, ents[ei].d);
      else drawCollectible(ctx, ents[ei].d);
    }

    // Dino rider view
    drawDinoView(ctx, w, h);
    drawDinoDashboard(ctx, w, h);

    // Grace period indicator
    if (graceTimer > 0) {
      ctx.fillStyle = 'rgba(46,204,113,0.15)';
      ctx.fillRect(0, 0, w * (graceTimer / GRACE_PERIOD), 4);
    }

    // Speed HUD
    var kmh = Math.round(20 + (speed - baseSpeed) * 15);
    var spEl = document.getElementById('fpdn-speed');
    if (spEl) spEl.textContent = kmh + ' km/h';
  }

  function drawPterodactyl(ctx, w, h) {
    var px1 = ((w * 0.7 + distance * 8) % (w * 1.4)) - w * 0.2;
    var px2 = ((w * 0.3 + distance * 5) % (w * 1.4)) - w * 0.2;
    ctx.fillStyle = 'rgba(60,40,60,0.35)';
    // Bird 1
    ctx.beginPath();
    ctx.moveTo(px1, h * 0.08);
    ctx.lineTo(px1 - 12, h * 0.05);
    ctx.lineTo(px1 - 3, h * 0.07);
    ctx.lineTo(px1 + 3, h * 0.07);
    ctx.lineTo(px1 + 12, h * 0.05);
    ctx.closePath();
    ctx.fill();
    // Bird 2
    ctx.beginPath();
    ctx.moveTo(px2, h * 0.14);
    ctx.lineTo(px2 - 8, h * 0.12);
    ctx.lineTo(px2 - 2, h * 0.13);
    ctx.lineTo(px2 + 2, h * 0.13);
    ctx.lineTo(px2 + 8, h * 0.12);
    ctx.closePath();
    ctx.fill();
  }

  function drawSideTree(ctx, tree, w, h) {
    var zs = 1.0 - tree.z;
    var proj = projectZ(zs);
    var sc = proj.scale;
    if (sc < 0.006) return;

    var pathL = PATH_LEFT_VANISH + (PATH_LEFT_BOTTOM - PATH_LEFT_VANISH) * sc;
    var pathR = PATH_RIGHT_VANISH + (PATH_RIGHT_BOTTOM - PATH_RIGHT_VANISH) * sc;
    var x = tree.side < 0 ? pathL - 30 * sc : pathR + 30 * sc;
    var y = proj.y;
    var sz = 80 * sc;
    if (sz < 3) return;

    ctx.save();
    ctx.translate(x, y);

    if (tree.type === 0) {
      // Palm tree
      ctx.fillStyle = '#5a3e2b';
      ctx.fillRect(-sz * 0.06, -sz * 1.2, sz * 0.12, sz * 1.0);
      ctx.fillStyle = '#2d8a4e';
      // Fronds
      ctx.beginPath();
      ctx.moveTo(0, -sz * 1.2);
      ctx.quadraticCurveTo(-sz * 0.5, -sz * 1.4, -sz * 0.6, -sz * 0.9);
      ctx.quadraticCurveTo(-sz * 0.3, -sz * 1.1, 0, -sz * 1.2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, -sz * 1.2);
      ctx.quadraticCurveTo(sz * 0.5, -sz * 1.4, sz * 0.6, -sz * 0.9);
      ctx.quadraticCurveTo(sz * 0.3, -sz * 1.1, 0, -sz * 1.2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, -sz * 1.2);
      ctx.quadraticCurveTo(sz * 0.1, -sz * 1.7, -sz * 0.1, -sz * 1.5);
      ctx.quadraticCurveTo(-sz * 0.05, -sz * 1.3, 0, -sz * 1.2);
      ctx.fill();
    } else if (tree.type === 1) {
      // Fern bush
      ctx.fillStyle = '#3a7a3a';
      ctx.beginPath();
      ctx.arc(0, -sz * 0.4, sz * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#2a6a2a';
      ctx.beginPath();
      ctx.arc(-sz * 0.15, -sz * 0.5, sz * 0.25, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Tall conifer
      ctx.fillStyle = '#4a3020';
      ctx.fillRect(-sz * 0.05, -sz * 1.0, sz * 0.1, sz * 0.8);
      ctx.fillStyle = '#1a6a2a';
      ctx.beginPath();
      ctx.moveTo(0, -sz * 1.5);
      ctx.lineTo(-sz * 0.3, -sz * 0.7);
      ctx.lineTo(sz * 0.3, -sz * 0.7);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, -sz * 1.2);
      ctx.lineTo(-sz * 0.35, -sz * 0.4);
      ctx.lineTo(sz * 0.35, -sz * 0.4);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }

  function drawPath(ctx, w, h) {
    var steps = 45;
    for (var i = 0; i < steps; i++) {
      var z1 = i / steps, z2 = (i + 1) / steps;
      var p1 = projectZ(z1), p2 = projectZ(z2);
      var t1 = p1.scale, t2 = p2.scale;

      var l1 = PATH_LEFT_VANISH + (PATH_LEFT_BOTTOM - PATH_LEFT_VANISH) * t1;
      var r1 = PATH_RIGHT_VANISH + (PATH_RIGHT_BOTTOM - PATH_RIGHT_VANISH) * t1;
      var l2 = PATH_LEFT_VANISH + (PATH_LEFT_BOTTOM - PATH_LEFT_VANISH) * t2;
      var r2 = PATH_RIGHT_VANISH + (PATH_RIGHT_BOTTOM - PATH_RIGHT_VANISH) * t2;

      // Scrolling stripes — earthy dirt path
      var stripe = Math.floor(((1 - z1) * 25 + distance * 15) % 2);
      ctx.fillStyle = stripe ? '#8B7355' : '#9a8468';
      ctx.beginPath();
      ctx.moveTo(l1, p1.y); ctx.lineTo(r1, p1.y);
      ctx.lineTo(r2, p2.y); ctx.lineTo(l2, p2.y);
      ctx.closePath();
      ctx.fill();

      // Dino footprint tracks (instead of lane dividers)
      if (!stripe && t1 > 0.01) {
        ctx.fillStyle = 'rgba(90,60,30,0.4)';
        for (var ln = 1; ln < LANE_COUNT; ln++) {
          var lx = l1 + (r1 - l1) * (ln / LANE_COUNT);
          var fsz = Math.max(1, t1 * 4);
          ctx.beginPath(); ctx.arc(lx, p1.y, fsz, 0, Math.PI * 2); ctx.fill();
        }
      }

      // Path edges (grass/fern border)
      if (t1 > 0.008) {
        ctx.strokeStyle = 'rgba(42,106,42,0.55)';
        ctx.lineWidth = Math.max(1.5, t1 * 5);
        ctx.beginPath(); ctx.moveTo(l1, p1.y); ctx.lineTo(l2, p2.y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(r1, p1.y); ctx.lineTo(r2, p2.y); ctx.stroke();
      }
    }
  }

  function drawObstacle(ctx, obs) {
    var zs = 1.0 - obs.z;
    var proj = projectZ(zs);
    var x = getLaneX(obs.lane, zs);
    var y = proj.y;
    var sc = proj.scale;
    if (sc < 0.006) return;

    var sz = 110 * sc;
    if (sz < 2) return;

    ctx.save();
    ctx.translate(x, y);

    // Warning glow when obstacle is getting close
    if (obs.z < 0.4 && obs.z > 0.05) {
      var glowAlpha = (0.4 - obs.z) / 0.35 * 0.4;
      ctx.fillStyle = 'rgba(231,76,60,' + glowAlpha + ')';
      ctx.beginPath(); ctx.arc(0, -sz * 0.3, sz * 0.7, 0, Math.PI * 2); ctx.fill();
    }

    switch (obs.type) {
      case 'rock':
        ctx.shadowColor = 'rgba(100,100,100,0.5)';
        ctx.shadowBlur = sz * 0.3;
        ctx.fillStyle = '#7f8c8d';
        ctx.beginPath();
        ctx.moveTo(-sz * 0.4, 0);
        ctx.lineTo(-sz * 0.35, -sz * 0.6);
        ctx.lineTo(-sz * 0.1, -sz * 0.9);
        ctx.lineTo(sz * 0.15, -sz * 0.85);
        ctx.lineTo(sz * 0.4, -sz * 0.5);
        ctx.lineTo(sz * 0.38, 0);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#95a5a6';
        ctx.beginPath();
        ctx.moveTo(-sz * 0.25, -sz * 0.2);
        ctx.lineTo(-sz * 0.1, -sz * 0.7);
        ctx.lineTo(sz * 0.15, -sz * 0.65);
        ctx.lineTo(sz * 0.2, -sz * 0.15);
        ctx.closePath();
        ctx.fill();
        break;

      case 'lava':
        ctx.shadowColor = 'rgba(255,80,0,0.6)';
        ctx.shadowBlur = sz * 0.5;
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(0, -sz * 0.3, sz * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#f39c12';
        ctx.beginPath();
        ctx.arc(0, -sz * 0.3, sz * 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fdcb6e';
        ctx.beginPath();
        ctx.arc(0, -sz * 0.3, sz * 0.12, 0, Math.PI * 2);
        ctx.fill();
        // Bubbles
        if (sz > 8) {
          ctx.fillStyle = 'rgba(241,196,15,0.6)';
          var bubOff = Math.sin(distance * 8 + obs.z * 4) * sz * 0.1;
          ctx.beginPath(); ctx.arc(-sz * 0.15, -sz * 0.5 + bubOff, sz * 0.06, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(sz * 0.1, -sz * 0.55 - bubOff, sz * 0.04, 0, Math.PI * 2); ctx.fill();
        }
        break;

      case 'fern':
        ctx.shadowColor = 'rgba(0,100,0,0.4)';
        ctx.shadowBlur = sz * 0.2;
        // Thick fern bush
        ctx.fillStyle = '#27ae60';
        ctx.beginPath();
        ctx.arc(0, -sz * 0.45, sz * 0.45, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#2ecc71';
        ctx.beginPath();
        ctx.arc(-sz * 0.12, -sz * 0.55, sz * 0.28, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#1abc9c';
        ctx.beginPath();
        ctx.arc(sz * 0.1, -sz * 0.35, sz * 0.22, 0, Math.PI * 2);
        ctx.fill();
        // Leaf detail
        if (sz > 10) {
          ctx.strokeStyle = '#1a8a4a';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, -sz * 0.9);
          ctx.quadraticCurveTo(-sz * 0.2, -sz * 0.7, 0, -sz * 0.5);
          ctx.stroke();
        }
        break;

      case 'bones':
        ctx.shadowColor = 'rgba(200,200,200,0.4)';
        ctx.shadowBlur = sz * 0.2;
        // Bone pile — jumpable
        ctx.fillStyle = '#ecf0f1';
        ctx.beginPath();
        ctx.moveTo(-sz * 0.5, 0);
        ctx.lineTo(-sz * 0.3, -sz * 0.35);
        ctx.lineTo(0, -sz * 0.25);
        ctx.lineTo(sz * 0.3, -sz * 0.4);
        ctx.lineTo(sz * 0.5, 0);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        // Bone details
        ctx.strokeStyle = '#bdc3c7';
        ctx.lineWidth = Math.max(1, sz * 0.04);
        ctx.beginPath(); ctx.moveTo(-sz * 0.2, -sz * 0.1); ctx.lineTo(sz * 0.15, -sz * 0.2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-sz * 0.1, -sz * 0.25); ctx.lineTo(sz * 0.2, -sz * 0.1); ctx.stroke();
        // JUMP hint
        if (sz > 8) {
          ctx.fillStyle = '#e74c3c';
          ctx.font = 'bold ' + Math.max(8, sz * 0.25) + 'px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('JUMP!', 0, -sz * 0.45);
        }
        break;
    }
    ctx.restore();
  }

  function drawCollectible(ctx, col) {
    if (!col.active) return;
    var zs = 1.0 - col.z;
    var proj = projectZ(zs);
    var x = getLaneX(col.lane, zs);
    var y = proj.y;
    var sc = proj.scale;
    if (sc < 0.008) return;

    var sz = 28 * sc;
    if (sz < 2) return;

    var floatY = Math.sin(distance * 12 + col.z * 6) * sz * 0.35;

    ctx.save();
    ctx.translate(x, y - sz * 2 + floatY);

    // Glow
    ctx.fillStyle = 'rgba(243,156,18,0.3)';
    ctx.beginPath(); ctx.arc(0, 0, sz * 1.4, 0, Math.PI * 2); ctx.fill();

    // Dino egg
    ctx.fillStyle = '#f5e6ca';
    ctx.beginPath();
    ctx.ellipse(0, 0, sz * 0.65, sz * 0.85, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#d4a056';
    ctx.lineWidth = Math.max(1, sz * 0.1);
    ctx.stroke();

    // Spots on egg
    ctx.fillStyle = '#c9956a';
    ctx.beginPath(); ctx.arc(-sz * 0.15, -sz * 0.2, sz * 0.12, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(sz * 0.2, sz * 0.1, sz * 0.1, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(-sz * 0.05, sz * 0.3, sz * 0.08, 0, Math.PI * 2); ctx.fill();

    ctx.restore();
  }

  function drawDinoView(ctx, w, h) {
    var jumpOff = 0;
    if (isJumping) {
      jumpOff = Math.sin((jumpTimer / jumpDuration) * Math.PI) * 55;
    }

    var bounce = Math.sin(dinoBounce) * 1.5;
    var neckY = h * 0.64 - jumpOff;
    var laneShift = (lanePos - 1) * w * 0.12;

    // Dino neck and head — smaller so road is more visible
    var neckW = w * 0.10;
    var headY = neckY - h * 0.07;

    // Neck (thinner)
    ctx.fillStyle = '#5b9e6f';
    ctx.beginPath();
    ctx.moveTo(w * 0.45 + laneShift, h * 0.76 + bounce);
    ctx.quadraticCurveTo(w * 0.47 + laneShift, neckY + bounce, w * 0.5 + laneShift, headY + bounce);
    ctx.quadraticCurveTo(w * 0.53 + laneShift, neckY + bounce, w * 0.55 + laneShift, h * 0.76 + bounce);
    ctx.closePath();
    ctx.fill();

    // Neck scales
    ctx.fillStyle = '#4a8a5a';
    for (var si = 0; si < 3; si++) {
      var sy = neckY + (h * 0.76 - neckY) * (si / 3) + bounce;
      var sw = neckW * 0.12 * (1 + si * 0.15);
      ctx.beginPath();
      ctx.arc(w * 0.5 + laneShift, sy, sw, 0, Math.PI);
      ctx.fill();
    }

    // Head (smaller)
    ctx.fillStyle = '#5b9e6f';
    ctx.beginPath();
    ctx.ellipse(w * 0.5 + laneShift, headY + bounce, w * 0.055, h * 0.03, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head ridge/crest
    ctx.fillStyle = '#e67e22';
    ctx.beginPath();
    ctx.moveTo(w * 0.48 + laneShift, headY - h * 0.025 + bounce);
    ctx.lineTo(w * 0.5 + laneShift, headY - h * 0.038 + bounce);
    ctx.lineTo(w * 0.52 + laneShift, headY - h * 0.025 + bounce);
    ctx.lineTo(w * 0.5 + laneShift, headY - h * 0.012 + bounce);
    ctx.closePath();
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(w * 0.475 + laneShift, headY - h * 0.005 + bounce, w * 0.01, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(w * 0.525 + laneShift, headY - h * 0.005 + bounce, w * 0.01, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#222';
    ctx.beginPath(); ctx.arc(w * 0.475 + laneShift, headY - h * 0.003 + bounce, w * 0.005, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(w * 0.525 + laneShift, headY - h * 0.003 + bounce, w * 0.005, 0, Math.PI * 2); ctx.fill();

    // Dino body visible on sides (smaller shoulders)
    ctx.fillStyle = '#4a8a5a';
    ctx.beginPath();
    ctx.ellipse(w * 0.35 + laneShift, h * 0.76 + bounce, w * 0.12, h * 0.04, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(w * 0.65 + laneShift, h * 0.76 + bounce, w * 0.12, h * 0.04, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Rider hands on neck
    ctx.fillStyle = '#e8b88a';
    ctx.beginPath();
    ctx.arc(w * 0.46 + laneShift, neckY + h * 0.03 + bounce, w * 0.015, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(w * 0.54 + laneShift, neckY + h * 0.03 + bounce, w * 0.015, 0, Math.PI * 2);
    ctx.fill();

    // Lane indicator (green arrow)
    var indZ = 0.78;
    var indX = getLaneX(lanePos, indZ);
    var indP = projectZ(indZ);
    var indSc = indP.scale;
    ctx.fillStyle = 'rgba(46,204,113,0.4)';
    ctx.beginPath();
    var aw = 20 * indSc;
    ctx.moveTo(indX, indP.y - 15 * indSc);
    ctx.lineTo(indX - aw, indP.y + 8 * indSc);
    ctx.lineTo(indX + aw, indP.y + 8 * indSc);
    ctx.closePath();
    ctx.fill();
  }

  function drawDinoDashboard(ctx, w, h) {
    var dashH = h * 0.13;
    var dashY = h - dashH;
    var dashShift = (lanePos - 1) * w * 0.12;

    // Dino back/saddle area
    var dg = ctx.createLinearGradient(0, dashY, 0, h);
    dg.addColorStop(0, '#4a8a5a');
    dg.addColorStop(0.12, '#3a7a4a');
    dg.addColorStop(1, '#2a5a3a');
    ctx.fillStyle = dg;
    ctx.fillRect(0, dashY, w, dashH);

    // Saddle ridge
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, dashY, w, 3);

    // Scale pattern on dino back
    ctx.fillStyle = 'rgba(90,158,111,0.4)';
    for (var si = 0; si < 8; si++) {
      var sx = w * 0.1 + si * w * 0.11 + dashShift;
      ctx.beginPath();
      ctx.arc(sx, dashY + dashH * 0.4, dashH * 0.12, 0, Math.PI * 2);
      ctx.fill();
    }

    // Egg counter (left gauge)
    var cx = w * 0.5 + dashShift;
    var gr = dashH * 0.28;
    var tx = w * 0.16 + dashShift;
    var gy = dashY + dashH * 0.55;

    // Egg gauge
    ctx.fillStyle = 'rgba(90,60,30,0.6)';
    ctx.beginPath(); ctx.arc(tx, gy, gr, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#8B4513'; ctx.lineWidth = 1.5; ctx.stroke();

    var eggPct = collected / Math.max(1, totalCollectibles);
    if (eggPct > 0) {
      ctx.strokeStyle = '#f39c12'; ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(tx, gy, gr * 0.7, -Math.PI * 0.5, -Math.PI * 0.5 + eggPct * Math.PI * 2);
      ctx.stroke();
    }

    ctx.fillStyle = '#f39c12';
    ctx.font = 'bold ' + Math.max(6, gr * 0.4) + 'px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(collected + '/' + totalCollectibles, tx, gy + gr * 0.15);

    // Speed indicator (right)
    var rx = w * 0.84 + dashShift;
    ctx.fillStyle = 'rgba(90,60,30,0.6)';
    ctx.beginPath(); ctx.arc(rx, gy, gr, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#8B4513'; ctx.lineWidth = 1.5; ctx.stroke();

    var speedPct = Math.min(1, (speed - baseSpeed) / Math.max(0.1, maxSpeed - baseSpeed));
    var na = -Math.PI * 0.75 + speedPct * Math.PI * 1.5;
    ctx.strokeStyle = '#2ecc71'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(rx, gy);
    ctx.lineTo(rx + Math.cos(na) * gr * 0.65, gy + Math.sin(na) * gr * 0.65);
    ctx.stroke();

    ctx.fillStyle = '#2ecc71';
    ctx.font = 'bold ' + Math.max(6, gr * 0.4) + 'px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(Math.round(20 + (speed - baseSpeed) * 15), rx, gy + gr * 0.55);

    // Dino spines along the back ridge
    ctx.fillStyle = '#e67e22';
    for (var sp = 0; sp < 5; sp++) {
      var spx = w * 0.3 + sp * w * 0.1 + dashShift;
      var spBounce = Math.sin(dinoBounce + sp * 0.5) * 2;
      ctx.beginPath();
      ctx.moveTo(spx - 4, dashY + 1);
      ctx.lineTo(spx, dashY - 8 + spBounce);
      ctx.lineTo(spx + 4, dashY + 1);
      ctx.closePath();
      ctx.fill();
    }
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // --- Death & Reset ---
  function triggerDeath() {
    isDead = true;
    AudioManager.wrong();

    var area = document.getElementById('fpdn-area');
    if (area) {
      var flash = document.createElement('div');
      flash.className = 'fpdn-flash';
      area.appendChild(flash);
      setTimeout(function () { if (flash.parentNode) flash.parentNode.removeChild(flash); }, 600);

      var ouch = document.createElement('div');
      ouch.className = 'fpdn-ouch';
      ouch.textContent = t('oops');
      area.appendChild(ouch);
      setTimeout(function () { if (ouch.parentNode) ouch.parentNode.removeChild(ouch); }, 1100);
    }

    deathTimer = setTimeout(function () {
      if (destroyed) return;
      showResetOverlay();
    }, 800);
  }

  function showResetOverlay() {
    var area = document.getElementById('fpdn-area');
    if (!area) return;

    var overlay = document.createElement('div');
    overlay.className = 'fpdn-reset-overlay';
    overlay.innerHTML = '<div class="fpdn-reset-text">' + t('oops') + '</div>' +
      '<div class="fpdn-reset-sub">' + t('tryAgain') + '</div>';
    area.appendChild(overlay);

    var handler = function (e) {
      e.preventDefault(); e.stopPropagation();
      overlay.removeEventListener('touchstart', handler);
      overlay.removeEventListener('click', handler);
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      doReset();
    };
    overlay.addEventListener('touchstart', handler, { passive: false });
    overlay.addEventListener('click', handler);
  }

  function doReset() {
    var area = document.getElementById('fpdn-area');
    if (area) {
      var els = area.querySelectorAll('.fpdn-ouch,.fpdn-flash,.fpdn-reset-overlay');
      for (var i = 0; i < els.length; i++) {
        if (els[i].parentNode) els[i].parentNode.removeChild(els[i]);
      }
    }
    resetState();
    updateScore();
    updateProgress();
    lastTime = performance.now();
  }

  function updateScore() {
    var el = document.getElementById('fpdn-score');
    if (el) el.textContent = collected + '/' + totalCollectibles + ' ' + collectibleEmoji;
  }

  function updateProgress() {
    var p = document.getElementById('game-progress');
    if (p) p.textContent = collected + '/' + totalCollectibles;
  }

  function finishGame() {
    destroyed = true;
    if (rafId) cancelAnimationFrame(rafId);
    clearTimeout(deathTimer);
    setTimeout(function () { if (callback) callback(); }, 500);
  }

  function destroy() {
    destroyed = true;
    if (rafId) cancelAnimationFrame(rafId);
    clearTimeout(deathTimer);
    document.removeEventListener('keydown', boundKeyDown);
    if (boundKeyUp) document.removeEventListener('keyup', boundKeyUp);
    if (boundSteerMove) document.removeEventListener('mousemove', boundSteerMove);
    if (boundSteerUp) document.removeEventListener('mouseup', boundSteerUp);
    obstacles = [];
    collectibles = [];
    trees = [];
    if (container) container.innerHTML = '';
  }

  return { start: start, destroy: destroy };
})();
