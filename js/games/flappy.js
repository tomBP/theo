/* ===== Flappy Game (Flappy Bird style) ===== */
window.FlappyGame = (function () {
  var container, callback;
  var rafId, destroyed;
  var character, collectibleEmoji, totalCollectibles, skyColor, label;
  var collected, gameSpeed;
  var playerY, playerVY;
  var entities, lastTime, scrollPos;
  var areaWidth, areaHeight;
  var nextPipeDist, pipeIndex;
  var boundKeyDown, boundTouchStart;
  var isDead, deathTimer;
  var collectibleIndex;
  var pipeGap, pipeWidth;

  var PLAYER_LEFT_PCT = 0.2;
  var PLAYER_SIZE = 36;
  var FLAP_FORCE = -7.5;
  var GRAVITY_VAL = 0.38;
  var PIPE_GAP = 120;
  var PIPE_WIDTH = 50;
  var PIPE_MIN_DIST = 220;
  var PIPE_MAX_DIST = 320;

  function start(config, gameArea, onComplete) {
    container = gameArea;
    callback = onComplete;
    destroyed = false;

    character = config.character || '🦅';
    collectibleEmoji = config.collectible || '⭐';
    totalCollectibles = config.totalCollectibles || 8;
    skyColor = config.skyColor || '#87CEEB';
    label = config.label ? L(config.label) : '';
    pipeGap = config.pipeGap || PIPE_GAP;
    pipeWidth = config.pipeWidth || PIPE_WIDTH;

    resetState();
    render();
    bindEvents();
    seedPipes();
    lastTime = performance.now();
    rafId = requestAnimationFrame(gameLoop);
  }

  function resetState() {
    collected = 0;
    gameSpeed = 2.5;
    playerY = 0;
    playerVY = 0;
    isDead = false;
    entities = [];
    scrollPos = 0;
    nextPipeDist = 400;
    pipeIndex = 0;
    collectibleIndex = 0;
  }

  function render() {
    var html = '<style>';
    html += '.flappy-area{position:relative;width:100%;height:100%;min-height:300px;overflow:hidden;border-radius:var(--radius-medium);touch-action:manipulation;-webkit-user-select:none;user-select:none;cursor:pointer;}';
    html += '.flappy-player{position:absolute;z-index:10;will-change:transform;transition:none;line-height:1;display:inline-block;width:' + PLAYER_SIZE + 'px;height:' + PLAYER_SIZE + 'px;}';
    html += '.flappy-player svg{display:block;width:100%;height:100%;}';
    html += '.flappy-player.dead{animation:flappy-death 0.6s ease-out forwards;}';
    html += '@keyframes flappy-death{0%{transform:rotate(0);}100%{transform:rotate(90deg) translateX(80px);opacity:0;}}';
    html += '.flappy-entity{position:absolute;z-index:5;will-change:transform;pointer-events:none;}';
    html += '.flappy-entity.collectible{z-index:6;font-size:1.6rem;line-height:1;}';
    html += '.flappy-score{position:absolute;top:10px;right:14px;font-family:var(--font-title);font-size:clamp(1rem,3vw,1.3rem);color:var(--color-text);z-index:20;background:rgba(255,255,255,0.85);padding:4px 12px;border-radius:var(--radius-small);box-shadow:var(--shadow-soft);}';
    html += '.flappy-label{position:absolute;top:10px;left:14px;font-family:var(--font-body);font-weight:700;font-size:clamp(0.75rem,2vw,0.9rem);color:var(--color-text-light);z-index:20;background:rgba(255,255,255,0.85);padding:4px 10px;border-radius:var(--radius-small);}';
    html += '.flappy-hint{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);font-family:var(--font-body);font-weight:600;font-size:0.85rem;color:var(--color-text-light);z-index:20;opacity:0.7;white-space:nowrap;}';
    html += '.flappy-flash{position:absolute;inset:0;background:rgba(255,0,0,0.3);z-index:15;pointer-events:none;animation:flappy-flash-out 0.5s ease-out forwards;}';
    html += '@keyframes flappy-flash-out{from{opacity:1;}to{opacity:0;}}';
    html += '.flappy-ouch{position:absolute;font-family:var(--font-title);font-size:1.6rem;color:#e74c3c;z-index:20;pointer-events:none;animation:flappy-ouch-float 1s ease-out forwards;text-shadow:0 2px 4px rgba(0,0,0,0.3);}';
    html += '@keyframes flappy-ouch-float{0%{opacity:1;transform:translateY(0) scale(1);}100%{opacity:0;transform:translateY(-60px) scale(1.5);}}';
    html += '.flappy-plus-one{position:absolute;font-family:var(--font-title);font-size:1.4rem;color:#f39c12;z-index:20;pointer-events:none;animation:flappy-ouch-float 0.9s ease-out forwards;text-shadow:0 2px 4px rgba(0,0,0,0.2);}';
    html += '.flappy-reset-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.5);z-index:30;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;animation:flappy-overlay-in 0.3s ease;}';
    html += '@keyframes flappy-overlay-in{from{opacity:0;}to{opacity:1;}}';
    html += '.flappy-reset-text{font-family:var(--font-title);font-size:clamp(1.5rem,5vw,2rem);color:white;text-shadow:0 2px 8px rgba(0,0,0,0.4);}';
    html += '.flappy-reset-sub{font-family:var(--font-body);font-weight:700;font-size:clamp(0.9rem,3vw,1.1rem);color:rgba(255,255,255,0.9);}';
    // Ground
    html += '.flappy-ground{position:absolute;bottom:0;left:0;width:200%;height:40px;will-change:transform;}';
    html += '.flappy-ground-pattern{width:100%;height:100%;background:repeating-linear-gradient(90deg,transparent,transparent 30px,rgba(0,0,0,0.08) 30px,rgba(0,0,0,0.08) 32px);}';
    // Cloud decorations
    html += '.flappy-cloud{position:absolute;opacity:0.3;z-index:1;pointer-events:none;}';
    html += '</style>';
    html += '<div class="flappy-area" id="flappy-area" style="background:linear-gradient(180deg, ' + skyColor + ' 0%, #b8e6ff 70%, #98d4e8 100%);">';
    // Clouds
    html += renderClouds();
    html += '<div class="flappy-ground" id="flappy-ground" style="background:#6ab04c;"><div class="flappy-ground-pattern"></div></div>';
    html += '<div class="flappy-player" id="flappy-player"' + (character.indexOf('<svg') === 0 ? ' style="font-size:0;"' : ' style="font-size:2rem;"') + '>' + character + '</div>';
    html += '<div class="flappy-score" id="flappy-score">0/' + totalCollectibles + ' ' + collectibleEmoji + '</div>';
    if (label) {
      html += '<div class="flappy-label">' + label + '</div>';
    }
    html += '<div class="flappy-hint" id="flappy-hint">Tap / Space!</div>';
    html += '</div>';
    container.innerHTML = html;

    var area = document.getElementById('flappy-area');
    if (area) {
      areaWidth = area.offsetWidth;
      areaHeight = area.offsetHeight;
    }
    // Start player in middle of screen
    playerY = areaHeight * 0.4;
  }

  function renderClouds() {
    var html = '';
    var positions = [
      { x: '8%', y: '10%', w: 60 },
      { x: '30%', y: '18%', w: 45 },
      { x: '55%', y: '6%', w: 55 },
      { x: '80%', y: '14%', w: 50 }
    ];
    for (var i = 0; i < positions.length; i++) {
      var c = positions[i];
      html += '<div class="flappy-cloud" style="left:' + c.x + ';top:' + c.y + ';">';
      html += '<svg width="' + c.w + '" height="' + Math.round(c.w * 0.5) + '" viewBox="0 0 60 30">';
      html += '<ellipse cx="20" cy="20" rx="18" ry="10" fill="white"/>';
      html += '<ellipse cx="35" cy="15" rx="15" ry="12" fill="white"/>';
      html += '<ellipse cx="45" cy="20" rx="14" ry="9" fill="white"/>';
      html += '</svg></div>';
    }
    return html;
  }

  function bindEvents() {
    var area = document.getElementById('flappy-area');
    if (!area) return;

    boundTouchStart = function (e) {
      e.preventDefault();
      flap();
      var hint = document.getElementById('flappy-hint');
      if (hint) hint.style.display = 'none';
    };
    boundKeyDown = function (e) {
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        flap();
        var hint = document.getElementById('flappy-hint');
        if (hint) hint.style.display = 'none';
      }
    };

    area.addEventListener('touchstart', boundTouchStart, { passive: false });
    area.addEventListener('mousedown', boundTouchStart);
    document.addEventListener('keydown', boundKeyDown);
  }

  function flap() {
    if (isDead) return;
    playerVY = FLAP_FORCE;
    AudioManager.tap();
  }

  // ---- Pipe Generation ----
  function seedPipes() {
    var dist = 400;
    for (var i = 0; i < 3; i++) {
      dist = generatePipe(dist);
    }
    nextPipeDist = dist;
  }

  function generatePipe(xPos) {
    var groundH = 40;
    var minTop = 60;
    var maxTop = areaHeight - groundH - pipeGap - 60;
    var gapTop = minTop + Math.random() * (maxTop - minTop);

    // Top pipe
    entities.push({
      type: 'pipe-top',
      x: xPos, y: 0, width: pipeWidth, height: gapTop,
      el: null, active: true
    });

    // Bottom pipe
    entities.push({
      type: 'pipe-bottom',
      x: xPos, y: gapTop + pipeGap, width: pipeWidth, height: areaHeight - groundH - gapTop - pipeGap,
      el: null, active: true
    });

    // Collectible in the gap
    if (collectibleIndex < totalCollectibles) {
      entities.push({
        type: 'collectible',
        x: xPos + pipeWidth / 2 - 12, y: gapTop + pipeGap / 2 - 12,
        width: 24, height: 24,
        el: null, active: true
      });
      collectibleIndex++;
    }

    return xPos + PIPE_MIN_DIST + Math.random() * (PIPE_MAX_DIST - PIPE_MIN_DIST);
  }

  function createEntityEl(ent) {
    var el = document.createElement('div');
    el.className = 'flappy-entity';

    if (ent.type === 'pipe-top') {
      el.innerHTML = '<svg width="' + ent.width + '" height="' + ent.height + '" viewBox="0 0 ' + ent.width + ' ' + ent.height + '">' +
        '<rect x="4" y="0" width="' + (ent.width - 8) + '" height="' + ent.height + '" fill="#6d5c4a" rx="2"/>' +
        '<rect x="4" y="0" width="' + ((ent.width - 8) * 0.3) + '" height="' + ent.height + '" fill="#8b7355" opacity="0.5" rx="2"/>' +
        '<rect x="0" y="' + (ent.height - 16) + '" width="' + ent.width + '" height="16" fill="#5a4a3a" rx="3"/>' +
        '<rect x="0" y="' + (ent.height - 16) + '" width="' + ent.width + '" height="5" fill="#7a6a5a" rx="3"/>' +
        // Vine hanging from bottom
        '<path d="M' + (ent.width * 0.3) + ' ' + ent.height + ' Q' + (ent.width * 0.25) + ' ' + (ent.height + 12) + ' ' + (ent.width * 0.35) + ' ' + (ent.height + 8) + '" fill="none" stroke="#6ab04c" stroke-width="2"/>' +
        '<circle cx="' + (ent.width * 0.35) + '" cy="' + (ent.height + 8) + '" r="3" fill="#6ab04c"/>' +
        '</svg>';
    } else if (ent.type === 'pipe-bottom') {
      el.innerHTML = '<svg width="' + ent.width + '" height="' + ent.height + '" viewBox="0 0 ' + ent.width + ' ' + ent.height + '">' +
        '<rect x="0" y="0" width="' + ent.width + '" height="16" fill="#5a4a3a" rx="3"/>' +
        '<rect x="0" y="0" width="' + ent.width + '" height="5" fill="#7a6a5a" rx="3"/>' +
        '<rect x="4" y="0" width="' + (ent.width - 8) + '" height="' + ent.height + '" fill="#6d5c4a" rx="2"/>' +
        '<rect x="4" y="0" width="' + ((ent.width - 8) * 0.3) + '" height="' + ent.height + '" fill="#8b7355" opacity="0.5" rx="2"/>' +
        '</svg>';
    } else if (ent.type === 'collectible') {
      el.className = 'flappy-entity collectible';
      el.textContent = collectibleEmoji;
    }

    return el;
  }

  // ---- Main Loop ----
  function gameLoop(timestamp) {
    if (destroyed) return;
    var dt = Math.min((timestamp - lastTime) / 16.67, 3);
    lastTime = timestamp;

    if (isDead) {
      rafId = requestAnimationFrame(gameLoop);
      return;
    }

    // Scroll
    scrollPos += gameSpeed * dt;

    // Ground scroll
    var ground = document.getElementById('flappy-ground');
    if (ground) ground.style.transform = 'translateX(' + (-(scrollPos % areaWidth)) + 'px)';

    // Player physics
    playerVY += GRAVITY_VAL * dt;
    playerY += playerVY * dt;

    // Tilt player based on velocity
    var tilt = Math.max(-30, Math.min(45, playerVY * 4));

    // Ceiling
    if (playerY < 0) {
      playerY = 0;
      playerVY = 0;
    }

    // Ground collision (death)
    var groundTop = areaHeight - 40;
    if (playerY + PLAYER_SIZE > groundTop) {
      playerY = groundTop - PLAYER_SIZE;
      triggerDeath();
      rafId = requestAnimationFrame(gameLoop);
      return;
    }

    // Update player position
    var playerScreenX = areaWidth * PLAYER_LEFT_PCT;
    var playerEl = document.getElementById('flappy-player');
    if (playerEl) {
      playerEl.style.left = playerScreenX + 'px';
      playerEl.style.top = playerY + 'px';
      playerEl.style.transform = 'rotate(' + tilt + 'deg)';
    }

    // Spawn more pipes
    while (nextPipeDist - scrollPos < areaWidth * 2.5) {
      nextPipeDist = generatePipe(nextPipeDist);
    }

    // Update entities
    var area = document.getElementById('flappy-area');
    var playerBox = {
      x: playerScreenX + 4,
      y: playerY + 4,
      w: PLAYER_SIZE - 8,
      h: PLAYER_SIZE - 8
    };

    for (var i = entities.length - 1; i >= 0; i--) {
      var e = entities[i];
      var screenX = e.x - scrollPos;

      // Off-screen left — remove
      if (screenX < -100) {
        if (e.type === 'collectible' && e.active) collectibleIndex--;
        if (e.el && e.el.parentNode) e.el.parentNode.removeChild(e.el);
        entities.splice(i, 1);
        continue;
      }

      // Off-screen right — don't render yet
      if (screenX > areaWidth + 100) {
        if (e.el && e.el.parentNode) {
          e.el.parentNode.removeChild(e.el);
          e.el = null;
        }
        continue;
      }

      // Create DOM element if needed
      if (!e.el && area) {
        e.el = createEntityEl(e);
        area.appendChild(e.el);
      }

      if (e.el) {
        e.el.style.left = screenX + 'px';
        e.el.style.top = e.y + 'px';
      }

      // Collision detection
      if (e.active) {
        var entBox = {
          x: screenX + (e.type === 'collectible' ? 2 : 6),
          y: e.y + (e.type === 'collectible' ? 2 : 0),
          w: e.width - (e.type === 'collectible' ? 4 : 12),
          h: e.height - (e.type === 'collectible' ? 4 : 0)
        };

        if (Math.abs(screenX - playerScreenX) < pipeWidth + PLAYER_SIZE && boxesOverlap(playerBox, entBox)) {
          if (e.type === 'collectible') {
            e.active = false;
            collected++;
            AudioManager.collect();
            if (e.el) {
              e.el.style.transition = 'opacity 0.2s, transform 0.2s';
              e.el.style.opacity = '0';
              e.el.style.transform = 'scale(1.5)';
            }
            showPlusOne(screenX, e.y);
            updateScore();
            updateProgress();
            if (collected >= totalCollectibles) {
              finishGame();
              return;
            }
          } else {
            // Hit pipe = death
            triggerDeath();
            rafId = requestAnimationFrame(gameLoop);
            return;
          }
        }
      }
    }

    rafId = requestAnimationFrame(gameLoop);
  }

  function showPlusOne(x, y) {
    var area = document.getElementById('flappy-area');
    if (!area) return;
    var el = document.createElement('div');
    el.className = 'flappy-plus-one';
    el.textContent = '+1';
    el.style.left = (x + 10) + 'px';
    el.style.top = (y - 10) + 'px';
    area.appendChild(el);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 900);
  }

  function boxesOverlap(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function triggerDeath() {
    isDead = true;
    AudioManager.wrong();

    var playerEl = document.getElementById('flappy-player');
    var area = document.getElementById('flappy-area');

    if (playerEl) playerEl.classList.add('dead');

    if (area) {
      var flash = document.createElement('div');
      flash.className = 'flappy-flash';
      area.appendChild(flash);
      setTimeout(function () { if (flash.parentNode) flash.parentNode.removeChild(flash); }, 600);
    }

    var playerScreenX = areaWidth * PLAYER_LEFT_PCT;
    if (area) {
      var ouch = document.createElement('div');
      ouch.className = 'flappy-ouch';
      ouch.textContent = t('oops');
      ouch.style.left = (playerScreenX - 10) + 'px';
      ouch.style.top = (playerY - 20) + 'px';
      area.appendChild(ouch);
      setTimeout(function () { if (ouch.parentNode) ouch.parentNode.removeChild(ouch); }, 1100);
    }

    deathTimer = setTimeout(function () {
      if (destroyed) return;
      showResetOverlay();
    }, 800);
  }

  function showResetOverlay() {
    var area = document.getElementById('flappy-area');
    if (!area) return;

    var overlay = document.createElement('div');
    overlay.className = 'flappy-reset-overlay';
    overlay.innerHTML = '<div class="flappy-reset-text">' + t('oops') + '</div>' +
      '<div class="flappy-reset-sub">' + t('tryAgain') + '</div>';
    area.appendChild(overlay);

    var restartHandler = function (e) {
      e.preventDefault();
      e.stopPropagation();
      overlay.removeEventListener('touchstart', restartHandler);
      overlay.removeEventListener('click', restartHandler);
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      resetLevel();
    };
    overlay.addEventListener('touchstart', restartHandler, { passive: false });
    overlay.addEventListener('click', restartHandler);
  }

  function resetLevel() {
    var area = document.getElementById('flappy-area');
    if (area) {
      var old = area.querySelectorAll('.flappy-entity,.flappy-ouch,.flappy-flash,.flappy-reset-overlay');
      for (var i = 0; i < old.length; i++) {
        if (old[i].parentNode) old[i].parentNode.removeChild(old[i]);
      }
    }

    collected = 0;
    gameSpeed = 2.5;
    playerY = areaHeight * 0.4;
    playerVY = 0;
    isDead = false;
    entities = [];
    scrollPos = 0;
    nextPipeDist = 400;
    collectibleIndex = 0;

    var playerEl = document.getElementById('flappy-player');
    if (playerEl) {
      playerEl.classList.remove('dead');
      playerEl.style.left = (areaWidth * PLAYER_LEFT_PCT) + 'px';
      playerEl.style.top = playerY + 'px';
      playerEl.style.transform = '';
    }

    updateScore();
    updateProgress();
    seedPipes();
    lastTime = performance.now();
  }

  function updateScore() {
    var el = document.getElementById('flappy-score');
    if (el) el.textContent = collected + '/' + totalCollectibles + ' ' + collectibleEmoji;
  }

  function updateProgress() {
    var prog = document.getElementById('game-progress');
    if (prog) prog.textContent = collected + '/' + totalCollectibles;
  }

  function finishGame() {
    destroyed = true;
    if (rafId) cancelAnimationFrame(rafId);
    clearTimeout(deathTimer);
    setTimeout(function () {
      if (callback) callback();
    }, 400);
  }

  function destroy() {
    destroyed = true;
    if (rafId) cancelAnimationFrame(rafId);
    clearTimeout(deathTimer);

    var area = document.getElementById('flappy-area');
    if (area) {
      area.removeEventListener('touchstart', boundTouchStart);
      area.removeEventListener('mousedown', boundTouchStart);
    }
    document.removeEventListener('keydown', boundKeyDown);

    entities = [];
    if (container) container.innerHTML = '';
  }

  return { start: start, destroy: destroy };
})();
