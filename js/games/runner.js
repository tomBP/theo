/* ===== Runner Game ===== */
window.RunnerGame = (function () {
  var container, callback;
  var rafId, destroyed;
  var character, obstacles, collectibleEmoji, totalCollectibles, groundColor, skyColor, label;
  var collected, gameSpeed, jumpVelocity, gravity;
  var playerY, playerVY, isJumping, isStumbling;
  var entities, spawnTimer, lastTime, scrollPos, bgScrollPos;
  var areaWidth, areaHeight, groundY;
  var nextSpawnDist, stumbleTimer;
  var boundKeyDown, boundTouchStart;
  var collectibleIndex;

  var PLAYER_LEFT_PCT = 0.22;
  var PLAYER_SIZE = 40;
  var GROUND_HEIGHT = 50;
  var JUMP_FORCE = -12;
  var GRAVITY_VAL = 0.55;
  var OBSTACLE_GAP_MIN = 220;
  var OBSTACLE_GAP_MAX = 380;

  function start(config, gameArea, onComplete) {
    container = gameArea;
    callback = onComplete;
    destroyed = false;

    character = config.character || '🦖';
    obstacles = config.obstacles || ['🪨', '🌵'];
    collectibleEmoji = config.collectible || '⭐';
    totalCollectibles = config.totalCollectibles || 8;
    groundColor = config.groundColor || '#8B7355';
    skyColor = config.skyColor || '#e8f8f5';
    label = config.label ? L(config.label) : '';

    collected = 0;
    gameSpeed = 3;
    playerY = 0;
    playerVY = 0;
    isJumping = false;
    isStumbling = false;
    entities = [];
    scrollPos = 0;
    bgScrollPos = 0;
    nextSpawnDist = 300;
    collectibleIndex = 0;

    render();
    bindEvents();
    lastTime = performance.now();
    seedEntities();
    rafId = requestAnimationFrame(gameLoop);
  }

  function render() {
    var html = '<style>';
    html += '.runner-area{position:relative;width:100%;height:100%;min-height:300px;overflow:hidden;border-radius:var(--radius-medium);touch-action:manipulation;-webkit-user-select:none;user-select:none;cursor:pointer;}';
    html += '.runner-sky{position:absolute;inset:0;bottom:' + GROUND_HEIGHT + 'px;}';
    html += '.runner-bg-layer{position:absolute;bottom:' + GROUND_HEIGHT + 'px;left:0;width:200%;height:60px;opacity:0.15;background:repeating-linear-gradient(90deg,transparent,transparent 60px,var(--theme-primary,#00b894) 60px,var(--theme-primary,#00b894) 62px);will-change:transform;}';
    html += '.runner-ground{position:absolute;bottom:0;left:0;width:200%;height:' + GROUND_HEIGHT + 'px;will-change:transform;}';
    html += '.runner-ground-pattern{width:100%;height:100%;background:repeating-linear-gradient(90deg,transparent,transparent 30px,rgba(0,0,0,0.08) 30px,rgba(0,0,0,0.08) 32px);}';
    html += '.runner-player{position:absolute;font-size:2rem;z-index:10;will-change:transform;transition:none;line-height:1;display:inline-block;transform:scaleX(-1);}';
    html += '.runner-player.stumble{animation:runner-stumble 0.6s ease;filter:brightness(0.6) saturate(0.3);}';
    html += '.runner-entity{position:absolute;font-size:1.8rem;z-index:5;will-change:transform;line-height:1;}';
    html += '.runner-entity.collectible{z-index:6;}';
    html += '.runner-flash{position:absolute;inset:0;background:rgba(255,0,0,0.25);z-index:15;pointer-events:none;animation:runner-flash-out 0.4s ease-out forwards;}';
    html += '@keyframes runner-flash-out{from{opacity:1;}to{opacity:0;}}';
    html += '.runner-ouch{position:absolute;font-family:var(--font-title);font-size:1.4rem;color:#e74c3c;z-index:20;pointer-events:none;animation:runner-ouch-float 0.8s ease-out forwards;text-shadow:0 1px 3px rgba(0,0,0,0.3);}';
    html += '@keyframes runner-ouch-float{0%{opacity:1;transform:translateY(0) scale(1);}100%{opacity:0;transform:translateY(-40px) scale(1.3);}}';
    html += '.runner-score{position:absolute;top:10px;right:14px;font-family:var(--font-title);font-size:clamp(1rem,3vw,1.3rem);color:var(--color-text);z-index:20;background:rgba(255,255,255,0.85);padding:4px 12px;border-radius:var(--radius-small);box-shadow:var(--shadow-soft);}';
    html += '.runner-label{position:absolute;top:10px;left:14px;font-family:var(--font-body);font-weight:700;font-size:clamp(0.75rem,2vw,0.9rem);color:var(--color-text-light);z-index:20;background:rgba(255,255,255,0.85);padding:4px 10px;border-radius:var(--radius-small);}';
    html += '.runner-tap-hint{position:absolute;bottom:' + (GROUND_HEIGHT + 10) + 'px;left:50%;transform:translateX(-50%);font-family:var(--font-body);font-weight:600;font-size:0.85rem;color:var(--color-text-light);z-index:20;opacity:0.7;white-space:nowrap;}';
    html += '@keyframes runner-stumble{0%{transform:scaleX(-1) translateX(0);}20%{transform:scaleX(-1) translateX(-10px);}40%{transform:scaleX(-1) translateX(8px);}60%{transform:scaleX(-1) translateX(-5px);}80%{transform:scaleX(-1) translateX(3px);}100%{transform:scaleX(-1) translateX(0);}}';
    html += '</style>';
    html += '<div class="runner-area" id="runner-area" style="background:' + skyColor + ';">';
    html += '<div class="runner-bg-layer" id="runner-bg"></div>';
    html += '<div class="runner-ground" id="runner-ground" style="background:' + groundColor + ';"><div class="runner-ground-pattern"></div></div>';
    html += '<div class="runner-player" id="runner-player">' + character + '</div>';
    html += '<div class="runner-score" id="runner-score">0/' + totalCollectibles + ' ' + collectibleEmoji + '</div>';
    if (label) {
      html += '<div class="runner-label">' + label + '</div>';
    }
    html += '<div class="runner-tap-hint" id="runner-hint">Tap / Space to jump!</div>';
    html += '</div>';
    container.innerHTML = html;

    var area = document.getElementById('runner-area');
    if (area) {
      areaWidth = area.offsetWidth;
      areaHeight = area.offsetHeight;
    }
    groundY = areaHeight - GROUND_HEIGHT - PLAYER_SIZE;
  }

  function bindEvents() {
    var area = document.getElementById('runner-area');
    if (!area) return;

    boundTouchStart = function (e) {
      e.preventDefault();
      jump();
      // Hide hint on first tap
      var hint = document.getElementById('runner-hint');
      if (hint) hint.style.display = 'none';
    };
    boundKeyDown = function (e) {
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        jump();
        var hint = document.getElementById('runner-hint');
        if (hint) hint.style.display = 'none';
      }
    };

    area.addEventListener('touchstart', boundTouchStart, { passive: false });
    area.addEventListener('mousedown', boundTouchStart);
    document.addEventListener('keydown', boundKeyDown);
  }

  function jump() {
    if (isJumping) return;
    isJumping = true;
    playerVY = JUMP_FORCE;
    AudioManager.tap();
  }

  function seedEntities() {
    // Pre-seed a few obstacles and collectibles ahead
    var dist = 350;
    for (var i = 0; i < 3; i++) {
      addObstacleAt(dist);
      dist += OBSTACLE_GAP_MIN + Math.random() * (OBSTACLE_GAP_MAX - OBSTACLE_GAP_MIN);
      if (collectibleIndex < totalCollectibles) {
        addCollectibleAt(dist - 80);
      }
    }
    nextSpawnDist = dist;
  }

  function addObstacleAt(xPos) {
    var emoji = obstacles[Math.floor(Math.random() * obstacles.length)];
    entities.push({
      type: 'obstacle',
      emoji: emoji,
      x: xPos,
      y: groundY + 4, // sit on ground
      width: 32,
      height: 36,
      el: null,
      active: true
    });
  }

  function addCollectibleAt(xPos) {
    entities.push({
      type: 'collectible',
      emoji: collectibleEmoji,
      x: xPos,
      y: groundY - 50, // float above ground
      width: 30,
      height: 30,
      el: null,
      active: true
    });
    collectibleIndex++;
  }

  function gameLoop(timestamp) {
    if (destroyed) return;
    var dt = Math.min((timestamp - lastTime) / 16.67, 3); // cap to prevent jumps
    lastTime = timestamp;

    var effectiveSpeed = isStumbling ? gameSpeed * 0.4 : gameSpeed;

    // Scroll
    scrollPos += effectiveSpeed * dt;
    bgScrollPos += effectiveSpeed * 0.3 * dt; // parallax

    // Update ground and bg layer position
    var ground = document.getElementById('runner-ground');
    var bg = document.getElementById('runner-bg');
    if (ground) ground.style.transform = 'translateX(' + (-(scrollPos % areaWidth)) + 'px)';
    if (bg) bg.style.transform = 'translateX(' + (-(bgScrollPos % areaWidth)) + 'px)';

    // Player physics
    if (isJumping) {
      playerVY += GRAVITY_VAL * dt;
      playerY += playerVY * dt;
      if (playerY >= 0) {
        playerY = 0;
        playerVY = 0;
        isJumping = false;
      }
    }

    var playerEl = document.getElementById('runner-player');
    var playerScreenX = areaWidth * PLAYER_LEFT_PCT;
    if (playerEl) {
      playerEl.style.left = playerScreenX + 'px';
      playerEl.style.top = (groundY + playerY) + 'px';
    }

    // Spawn more entities as player advances
    while (nextSpawnDist - scrollPos < areaWidth * 2) {
      addObstacleAt(nextSpawnDist);
      if (collectibleIndex < totalCollectibles) {
        // Place collectible between obstacles sometimes
        if (Math.random() < 0.7) {
          addCollectibleAt(nextSpawnDist - 60 - Math.random() * 60);
        }
      }
      nextSpawnDist += OBSTACLE_GAP_MIN + Math.random() * (OBSTACLE_GAP_MAX - OBSTACLE_GAP_MIN);
    }

    // Update entities
    var area = document.getElementById('runner-area');
    var playerBox = {
      x: playerScreenX + 6,
      y: groundY + playerY + 6,
      w: PLAYER_SIZE - 12,
      h: PLAYER_SIZE - 12
    };

    for (var i = entities.length - 1; i >= 0; i--) {
      var ent = entities[i];
      var screenX = ent.x - scrollPos;

      // Off-screen left - remove (and re-spawn missed collectibles)
      if (screenX < -60) {
        if (ent.type === 'collectible' && ent.active) {
          // Missed this collectible — spawn a replacement further ahead
          collectibleIndex--;
        }
        if (ent.el && ent.el.parentNode) ent.el.parentNode.removeChild(ent.el);
        entities.splice(i, 1);
        continue;
      }

      // Off-screen right - don't render yet
      if (screenX > areaWidth + 60) {
        if (ent.el && ent.el.parentNode) {
          ent.el.parentNode.removeChild(ent.el);
          ent.el = null;
        }
        continue;
      }

      // Create DOM element if needed
      if (!ent.el && area) {
        ent.el = document.createElement('div');
        ent.el.className = 'runner-entity' + (ent.type === 'collectible' ? ' collectible' : '');
        ent.el.textContent = ent.emoji;
        area.appendChild(ent.el);
      }

      if (ent.el) {
        ent.el.style.left = screenX + 'px';
        ent.el.style.top = ent.y + 'px';
      }

      // Collision detection (only active entities near player)
      if (ent.active && Math.abs(screenX - playerScreenX) < 50) {
        var entBox = {
          x: screenX + 4,
          y: ent.y + 4,
          w: ent.width - 8,
          h: ent.height - 8
        };

        if (boxesOverlap(playerBox, entBox)) {
          ent.active = false;
          if (ent.type === 'collectible') {
            collected++;
            AudioManager.collect();
            if (ent.el) {
              ent.el.style.transition = 'opacity 0.2s, transform 0.2s';
              ent.el.style.opacity = '0';
              ent.el.style.transform = 'scale(1.5)';
            }
            updateScore();
            updateProgress();
            if (collected >= totalCollectibles) {
              finishGame();
              return;
            }
          } else if (ent.type === 'obstacle') {
            if (!isStumbling) {
              isStumbling = true;
              AudioManager.wrong();
              if (playerEl) {
                playerEl.classList.remove('stumble');
                void playerEl.offsetWidth;
                playerEl.classList.add('stumble');
              }
              // Red flash overlay
              if (area) {
                var flash = document.createElement('div');
                flash.className = 'runner-flash';
                area.appendChild(flash);
                setTimeout(function () { if (flash.parentNode) flash.parentNode.removeChild(flash); }, 500);
              }
              // Floating "Ouch!" text
              if (area) {
                var ouch = document.createElement('div');
                ouch.className = 'runner-ouch';
                ouch.textContent = 'Ouch!';
                ouch.style.left = (playerScreenX - 10) + 'px';
                ouch.style.top = (groundY + playerY - 20) + 'px';
                area.appendChild(ouch);
                setTimeout(function () { if (ouch.parentNode) ouch.parentNode.removeChild(ouch); }, 900);
              }
              // Push obstacle off screen after hit
              if (ent.el) {
                ent.el.style.transition = 'opacity 0.3s, transform 0.3s';
                ent.el.style.opacity = '0';
                ent.el.style.transform = 'scale(0.5) translateY(10px)';
              }
              clearTimeout(stumbleTimer);
              stumbleTimer = setTimeout(function () {
                isStumbling = false;
                if (playerEl) playerEl.classList.remove('stumble');
              }, 600);
            }
          }
        }
      }
    }

    rafId = requestAnimationFrame(gameLoop);
  }

  function boxesOverlap(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function updateScore() {
    var el = document.getElementById('runner-score');
    if (el) el.textContent = collected + '/' + totalCollectibles + ' ' + collectibleEmoji;
  }

  function updateProgress() {
    var prog = document.getElementById('game-progress');
    if (prog) prog.textContent = collected + '/' + totalCollectibles;
  }

  function finishGame() {
    destroyed = true;
    if (rafId) cancelAnimationFrame(rafId);
    clearTimeout(stumbleTimer);
    setTimeout(function () {
      if (callback) callback();
    }, 400);
  }

  function destroy() {
    destroyed = true;
    if (rafId) cancelAnimationFrame(rafId);
    clearTimeout(stumbleTimer);

    var area = document.getElementById('runner-area');
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
