/* ===== Runner Game (Mario-style) ===== */
window.RunnerGame = (function () {
  var container, callback;
  var rafId, destroyed;
  var character, collectibleEmoji, totalCollectibles, groundColor, skyColor, label;
  var collected, gameSpeed, jumpVelocity, gravity;
  var playerY, playerVY, isJumping, hasDoubleJumped;
  var entities, lastTime, scrollPos, bgScrollPos;
  var areaWidth, areaHeight, groundY;
  var nextSegmentDist;
  var boundKeyDown, boundKeyUp, boundTouchStart;
  var collectibleIndex;
  var isDead, deathTimer;
  var keysDown;
  var hasGaps, hasPlatforms, hasDoubleJump, theme;

  var PLAYER_LEFT_PCT = 0.22;
  var PLAYER_SIZE = 40;
  var GROUND_HEIGHT = 50;
  var JUMP_FORCE = -12;
  var DOUBLE_JUMP_FORCE = -10.2; // 85% of normal
  var GRAVITY_VAL = 0.55;
  var SEGMENT_MIN = 240;
  var SEGMENT_MAX = 400;

  // Entity types
  var TYPE_BLOCK = 'block';
  var TYPE_PIPE = 'pipe';
  var TYPE_ENEMY = 'enemy';
  var TYPE_GAP = 'gap';
  var TYPE_PLATFORM = 'platform';
  var TYPE_COLLECTIBLE = 'collectible';

  function start(config, gameArea, onComplete) {
    container = gameArea;
    callback = onComplete;
    destroyed = false;

    character = config.character || '🦖';
    collectibleEmoji = config.collectible || '⭐';
    totalCollectibles = config.totalCollectibles || 10;
    groundColor = config.groundColor || '#8B7355';
    skyColor = config.skyColor || '#e8f8f5';
    label = config.label ? L(config.label) : '';
    hasGaps = config.hasGaps || false;
    hasPlatforms = config.hasPlatforms || false;
    hasDoubleJump = config.hasDoubleJump || false;
    theme = config.theme || '';

    resetState();
    render();
    bindEvents();
    lastTime = performance.now();
    seedTerrain();
    rafId = requestAnimationFrame(gameLoop);
  }

  function resetState() {
    collected = 0;
    gameSpeed = 3;
    playerY = 0;
    playerVY = 0;
    isJumping = false;
    hasDoubleJumped = false;
    isDead = false;
    entities = [];
    scrollPos = 0;
    bgScrollPos = 0;
    nextSegmentDist = 350;
    collectibleIndex = 0;
    keysDown = {};
  }

  function render() {
    var html = '<style>';
    html += '.runner-area{position:relative;width:100%;height:100%;min-height:300px;overflow:hidden;border-radius:var(--radius-medium);touch-action:manipulation;-webkit-user-select:none;user-select:none;cursor:pointer;}';
    html += '.runner-sky{position:absolute;inset:0;bottom:' + GROUND_HEIGHT + 'px;}';
    html += '.runner-bg-layer{position:absolute;bottom:' + GROUND_HEIGHT + 'px;left:0;width:200%;height:100%;will-change:transform;pointer-events:none;}';
    html += '.runner-ground{position:absolute;bottom:0;left:0;width:200%;height:' + GROUND_HEIGHT + 'px;will-change:transform;}';
    html += '.runner-ground-pattern{width:100%;height:100%;background:repeating-linear-gradient(90deg,transparent,transparent 30px,rgba(0,0,0,0.08) 30px,rgba(0,0,0,0.08) 32px);}';
    html += '.runner-player{position:absolute;font-size:2rem;z-index:10;will-change:transform;transition:none;line-height:1;display:inline-block;transform:scaleX(-1);width:' + PLAYER_SIZE + 'px;height:' + PLAYER_SIZE + 'px;}';
    html += '.runner-player svg{display:block;width:100%;height:100%;}';
    html += '.runner-player.dead{animation:runner-death 0.6s ease-out forwards;}';
    html += '.runner-entity{position:absolute;z-index:5;will-change:transform;line-height:1;pointer-events:none;}';
    html += '.runner-entity.collectible{z-index:6;font-size:1.8rem;}';
    html += '.runner-flash{position:absolute;inset:0;background:rgba(255,0,0,0.3);z-index:15;pointer-events:none;animation:runner-flash-out 0.5s ease-out forwards;}';
    html += '@keyframes runner-flash-out{from{opacity:1;}to{opacity:0;}}';
    html += '.runner-ouch{position:absolute;font-family:var(--font-title);font-size:1.6rem;color:#e74c3c;z-index:20;pointer-events:none;animation:runner-ouch-float 1s ease-out forwards;text-shadow:0 2px 4px rgba(0,0,0,0.3);}';
    html += '@keyframes runner-ouch-float{0%{opacity:1;transform:translateY(0) scale(1);}100%{opacity:0;transform:translateY(-60px) scale(1.5);}}';
    html += '@keyframes runner-death{0%{transform:scaleX(-1) translateY(0);}30%{transform:scaleX(-1) translateY(-40px);}100%{transform:scaleX(-1) translateY(40px);opacity:0;}}';
    html += '.runner-score{position:absolute;top:10px;right:14px;font-family:var(--font-title);font-size:clamp(1rem,3vw,1.3rem);color:var(--color-text);z-index:20;background:rgba(255,255,255,0.85);padding:4px 12px;border-radius:var(--radius-small);box-shadow:var(--shadow-soft);}';
    html += '.runner-label{position:absolute;top:10px;left:14px;font-family:var(--font-body);font-weight:700;font-size:clamp(0.75rem,2vw,0.9rem);color:var(--color-text-light);z-index:20;background:rgba(255,255,255,0.85);padding:4px 10px;border-radius:var(--radius-small);}';
    html += '.runner-tap-hint{position:absolute;bottom:' + (GROUND_HEIGHT + 10) + 'px;left:50%;transform:translateX(-50%);font-family:var(--font-body);font-weight:600;font-size:0.85rem;color:var(--color-text-light);z-index:20;opacity:0.7;white-space:nowrap;}';
    // SVG obstacle styles
    html += '.runner-block{position:absolute;z-index:5;pointer-events:none;}';
    html += '.runner-pipe{position:absolute;z-index:5;pointer-events:none;}';
    html += '.runner-enemy{position:absolute;z-index:6;pointer-events:none;font-size:1.6rem;}';
    html += '.runner-gap-marker{position:absolute;z-index:4;pointer-events:none;}';
    html += '.runner-platform{position:absolute;z-index:4;pointer-events:none;}';
    // Reset overlay
    html += '.runner-reset-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.5);z-index:30;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;animation:runner-overlay-in 0.3s ease;}';
    html += '@keyframes runner-overlay-in{from{opacity:0;}to{opacity:1;}}';
    html += '.runner-reset-text{font-family:var(--font-title);font-size:clamp(1.5rem,5vw,2rem);color:white;text-shadow:0 2px 8px rgba(0,0,0,0.4);}';
    html += '.runner-reset-sub{font-family:var(--font-body);font-weight:700;font-size:clamp(0.9rem,3vw,1.1rem);color:rgba(255,255,255,0.9);}';
    // Cloud decorations in sky
    html += '.runner-cloud{position:absolute;opacity:0.4;z-index:1;pointer-events:none;}';
    html += '</style>';
    html += '<div class="runner-area" id="runner-area" style="background:' + skyColor + ';">';
    // Background decorations
    html += theme === 'dino' ? renderDinoBackground() : theme === 'truck' ? renderTruckBackground() : renderClouds();
    html += '<div class="runner-bg-layer" id="runner-bg"></div>';
    html += '<div class="runner-ground" id="runner-ground" style="background:' + groundColor + ';"><div class="runner-ground-pattern"></div></div>';
    html += '<div class="runner-player" id="runner-player"' + (character.indexOf('<svg') === 0 ? ' style="font-size:0;"' : '') + '>' + character + '</div>';
    html += '<div class="runner-score" id="runner-score">0/' + totalCollectibles + ' ' + collectibleEmoji + '</div>';
    if (label) {
      html += '<div class="runner-label">' + label + '</div>';
    }
    var hint = hasDoubleJump ? 'Tap / Space! (x2)' : 'Tap / Space!';
    html += '<div class="runner-tap-hint" id="runner-hint">' + hint + '</div>';
    html += '</div>';
    container.innerHTML = html;

    var area = document.getElementById('runner-area');
    if (area) {
      areaWidth = area.offsetWidth;
      areaHeight = area.offsetHeight;
    }
    groundY = areaHeight - GROUND_HEIGHT - PLAYER_SIZE;
  }

  function renderClouds() {
    var html = '';
    var cloudPositions = [
      { x: '10%', y: '8%', w: 60 },
      { x: '35%', y: '15%', w: 45 },
      { x: '60%', y: '5%', w: 55 },
      { x: '85%', y: '12%', w: 50 }
    ];
    for (var i = 0; i < cloudPositions.length; i++) {
      var c = cloudPositions[i];
      html += '<div class="runner-cloud" style="left:' + c.x + ';top:' + c.y + ';">';
      html += '<svg width="' + c.w + '" height="' + Math.round(c.w * 0.5) + '" viewBox="0 0 60 30">';
      html += '<ellipse cx="20" cy="20" rx="18" ry="10" fill="white"/>';
      html += '<ellipse cx="35" cy="15" rx="15" ry="12" fill="white"/>';
      html += '<ellipse cx="45" cy="20" rx="14" ry="9" fill="white"/>';
      html += '</svg></div>';
    }
    return html;
  }

  function renderDinoBackground() {
    var html = '';
    // Clouds
    html += renderClouds();
    // Prehistoric vegetation silhouettes in background
    var plants = [
      { x: '5%', y: '55%', w: 40 },
      { x: '25%', y: '50%', w: 50 },
      { x: '50%', y: '52%', w: 45 },
      { x: '75%', y: '48%', w: 55 },
      { x: '92%', y: '54%', w: 38 }
    ];
    for (var i = 0; i < plants.length; i++) {
      var p = plants[i];
      html += '<div class="runner-cloud" style="left:' + p.x + ';top:' + p.y + ';opacity:0.15;">';
      html += '<svg width="' + p.w + '" height="' + Math.round(p.w * 1.5) + '" viewBox="0 0 40 60">';
      // Palm tree silhouette
      html += '<rect x="18" y="20" width="4" height="40" fill="#2d5a1e" rx="2"/>';
      html += '<path d="M20 22 Q5 10 2 18 Q8 16 20 22Z" fill="#3d7a2e"/>';
      html += '<path d="M20 22 Q35 10 38 18 Q32 16 20 22Z" fill="#3d7a2e"/>';
      html += '<path d="M20 20 Q10 2 8 12 Q14 10 20 20Z" fill="#4a8a3e"/>';
      html += '<path d="M20 20 Q30 2 32 12 Q26 10 20 20Z" fill="#4a8a3e"/>';
      html += '</svg></div>';
    }
    return html;
  }

  function renderTruckBackground() {
    var html = '';
    html += renderClouds();
    // City/industrial building silhouettes
    var buildings = [
      { x: '3%', y: '40%', w: 35, h: 70 },
      { x: '18%', y: '45%', w: 28, h: 55 },
      { x: '38%', y: '35%', w: 40, h: 80 },
      { x: '58%', y: '42%', w: 32, h: 60 },
      { x: '78%', y: '38%', w: 36, h: 72 },
      { x: '93%', y: '46%', w: 25, h: 50 }
    ];
    for (var i = 0; i < buildings.length; i++) {
      var b = buildings[i];
      html += '<div class="runner-cloud" style="left:' + b.x + ';top:' + b.y + ';opacity:0.12;">';
      html += '<svg width="' + b.w + '" height="' + b.h + '" viewBox="0 0 40 80">';
      html += '<rect x="2" y="5" width="36" height="75" fill="#636e72" rx="2"/>';
      html += '<rect x="6" y="10" width="6" height="6" fill="#dfe6e9" opacity="0.5"/>';
      html += '<rect x="16" y="10" width="6" height="6" fill="#dfe6e9" opacity="0.4"/>';
      html += '<rect x="28" y="10" width="6" height="6" fill="#dfe6e9" opacity="0.5"/>';
      html += '<rect x="6" y="22" width="6" height="6" fill="#dfe6e9" opacity="0.4"/>';
      html += '<rect x="16" y="22" width="6" height="6" fill="#dfe6e9" opacity="0.5"/>';
      html += '<rect x="28" y="22" width="6" height="6" fill="#dfe6e9" opacity="0.3"/>';
      html += '<rect x="6" y="34" width="6" height="6" fill="#dfe6e9" opacity="0.5"/>';
      html += '<rect x="16" y="34" width="6" height="6" fill="#dfe6e9" opacity="0.4"/>';
      html += '<rect x="28" y="34" width="6" height="6" fill="#dfe6e9" opacity="0.5"/>';
      html += '</svg></div>';
    }
    return html;
  }

  function bindEvents() {
    var area = document.getElementById('runner-area');
    if (!area) return;

    boundTouchStart = function (e) {
      e.preventDefault();
      jump();
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
      keysDown[e.key] = true;
    };
    boundKeyUp = function (e) {
      keysDown[e.key] = false;
    };

    area.addEventListener('touchstart', boundTouchStart, { passive: false });
    area.addEventListener('mousedown', boundTouchStart);
    document.addEventListener('keydown', boundKeyDown);
    document.addEventListener('keyup', boundKeyUp);
  }

  function jump() {
    if (isDead) return;
    if (!isJumping) {
      isJumping = true;
      hasDoubleJumped = false;
      playerVY = JUMP_FORCE;
      AudioManager.tap();
    } else if (hasDoubleJump && !hasDoubleJumped) {
      hasDoubleJumped = true;
      playerVY = DOUBLE_JUMP_FORCE;
      AudioManager.tap();
    }
  }

  // ---- Terrain Generation ----
  function seedTerrain() {
    var dist = 350;
    for (var i = 0; i < 4; i++) {
      dist = generateSegment(dist);
    }
    nextSegmentDist = dist;
  }

  function generateSegment(startDist) {
    var segType = pickSegmentType();
    var dist = startDist;

    switch (segType) {
      case 'block':
        addBlock(dist);
        if (collectibleIndex < totalCollectibles && Math.random() < 0.6) {
          addCollectibleAt(dist + 15, groundY - 70);
        }
        dist += SEGMENT_MIN + Math.random() * (SEGMENT_MAX - SEGMENT_MIN);
        break;

      case 'pipe':
        addPipe(dist);
        if (collectibleIndex < totalCollectibles && Math.random() < 0.5) {
          addCollectibleAt(dist + 10, groundY - 80);
        }
        dist += SEGMENT_MIN + Math.random() * 100;
        break;

      case 'enemy':
        addEnemy(dist);
        dist += SEGMENT_MIN + Math.random() * 80;
        break;

      case 'gap':
        if (hasGaps) {
          addGap(dist, 60 + Math.random() * 30);
          if (collectibleIndex < totalCollectibles) {
            addCollectibleAt(dist + 30, groundY - 50);
          }
          dist += 120 + Math.random() * 80;
        } else {
          addBlock(dist);
          dist += SEGMENT_MIN;
        }
        break;

      case 'platform':
        if (hasPlatforms) {
          var platY = groundY - 60 - Math.random() * 40;
          addPlatform(dist, platY, 80);
          if (collectibleIndex < totalCollectibles) {
            addCollectibleAt(dist + 30, platY - 30);
          }
          dist += 150 + Math.random() * 100;
        } else {
          addBlock(dist);
          if (collectibleIndex < totalCollectibles) {
            addCollectibleAt(dist + 15, groundY - 60);
          }
          dist += SEGMENT_MIN;
        }
        break;

      default:
        // Simple collectible between empty space
        if (collectibleIndex < totalCollectibles) {
          addCollectibleAt(dist, groundY - 40);
        }
        dist += 200;
        break;
    }

    return dist;
  }

  function pickSegmentType() {
    var types = ['block', 'block', 'pipe', 'enemy'];
    if (hasGaps) types.push('gap');
    if (hasPlatforms) types.push('platform', 'platform');
    return types[Math.floor(Math.random() * types.length)];
  }

  function addBlock(xPos) {
    entities.push({
      type: TYPE_BLOCK,
      x: xPos, y: groundY - 4, width: 32, height: 36,
      el: null, active: true, solid: true
    });
  }

  function addPipe(xPos) {
    var h = 40 + Math.random() * 20;
    entities.push({
      type: TYPE_PIPE,
      x: xPos, y: groundY + PLAYER_SIZE - h, width: 36, height: h,
      el: null, active: true, solid: true
    });
  }

  function addEnemy(xPos) {
    entities.push({
      type: TYPE_ENEMY,
      x: xPos, y: groundY + 4, width: 30, height: 32,
      el: null, active: true, solid: true,
      patrolDir: 1, patrolDist: 0, patrolMax: 60
    });
  }

  function addGap(xPos, width) {
    entities.push({
      type: TYPE_GAP,
      x: xPos, y: groundY + PLAYER_SIZE, width: width, height: GROUND_HEIGHT + 20,
      el: null, active: true, solid: false
    });
  }

  function addPlatform(xPos, yPos, width) {
    entities.push({
      type: TYPE_PLATFORM,
      x: xPos, y: yPos, width: width, height: 12,
      el: null, active: true, solid: false
    });
  }

  function addCollectibleAt(xPos, yPos) {
    entities.push({
      type: TYPE_COLLECTIBLE,
      x: xPos, y: yPos,
      width: 30, height: 30,
      el: null, active: true, solid: false
    });
    collectibleIndex++;
  }

  // ---- Create DOM for entities ----
  function createEntityEl(ent) {
    var el = document.createElement('div');

    switch (ent.type) {
      case TYPE_BLOCK:
        el.className = 'runner-block';
        if (theme === 'dino') {
          el.innerHTML = '<svg width="32" height="36" viewBox="0 0 32 36"><path d="M4 36 L2 20 Q0 12 8 6 L16 2 Q24 0 30 8 L32 16 Q32 28 28 36Z" fill="#8b7355"/><path d="M4 36 L2 20 Q0 12 8 6 L16 2 Q20 4 18 12 L14 24 Q10 32 4 36Z" fill="#a0896c"/><circle cx="12" cy="18" r="2" fill="#7a6548" opacity="0.4"/><circle cx="22" cy="14" r="1.5" fill="#7a6548" opacity="0.3"/><path d="M8 28 L14 24" stroke="#7a6548" stroke-width="0.5" opacity="0.3"/></svg>';
        } else if (theme === 'truck') {
          // Oil barrel
          el.innerHTML = '<svg width="32" height="36" viewBox="0 0 32 36"><rect x="4" y="2" width="24" height="32" rx="3" fill="#2d3436"/><rect x="6" y="4" width="20" height="28" rx="2" fill="#636e72"/><rect x="4" y="8" width="24" height="3" fill="#2d3436"/><rect x="4" y="24" width="24" height="3" fill="#2d3436"/><rect x="10" y="12" width="12" height="10" rx="1" fill="#fdcb6e"/><rect x="14" y="14" width="4" height="6" fill="#2d3436"/></svg>';
        } else {
          el.innerHTML = '<svg width="32" height="36" viewBox="0 0 32 36"><rect x="0" y="0" width="32" height="36" fill="#c0392b" rx="2"/><rect x="2" y="2" width="13" height="16" fill="#e74c3c" rx="1"/><rect x="17" y="2" width="13" height="16" fill="#e74c3c" rx="1"/><rect x="8" y="20" width="16" height="14" fill="#e74c3c" rx="1"/><rect x="0" y="18" width="32" height="2" fill="#a93226"/><rect x="15" y="0" width="2" height="18" fill="#a93226"/></svg>';
        }
        break;
      case TYPE_PIPE:
        el.className = 'runner-pipe';
        var pw = ent.width, ph = ent.height;
        if (theme === 'dino') {
          el.innerHTML = '<svg width="' + pw + '" height="' + ph + '" viewBox="0 0 ' + pw + ' ' + ph + '"><path d="M' + (pw*0.1) + ' ' + ph + ' L' + (pw*0.3) + ' 8 Q' + (pw*0.5) + ' 0 ' + (pw*0.7) + ' 8 L' + (pw*0.9) + ' ' + ph + 'Z" fill="#6d5c4a"/><path d="M' + (pw*0.1) + ' ' + ph + ' L' + (pw*0.3) + ' 8 Q' + (pw*0.4) + ' 4 ' + (pw*0.45) + ' 10 L' + (pw*0.35) + ' ' + ph + 'Z" fill="#8b7355" opacity="0.6"/><ellipse cx="' + (pw*0.5) + '" cy="6" rx="' + (pw*0.15) + '" ry="3" fill="#e74c3c" opacity="0.6"/></svg>';
        } else if (theme === 'truck') {
          // Traffic cone
          el.innerHTML = '<svg width="' + pw + '" height="' + ph + '" viewBox="0 0 ' + pw + ' ' + ph + '"><path d="M' + (pw*0.15) + ' ' + ph + ' L' + (pw*0.4) + ' 6 Q' + (pw*0.5) + ' 0 ' + (pw*0.6) + ' 6 L' + (pw*0.85) + ' ' + ph + 'Z" fill="#e17055"/><rect x="' + (pw*0.1) + '" y="' + (ph-6) + '" width="' + (pw*0.8) + '" height="6" rx="2" fill="#d63031"/><rect x="' + (pw*0.3) + '" y="' + (ph*0.3) + '" width="' + (pw*0.4) + '" height="4" fill="white" opacity="0.8"/><rect x="' + (pw*0.25) + '" y="' + (ph*0.6) + '" width="' + (pw*0.5) + '" height="4" fill="white" opacity="0.8"/></svg>';
        } else {
          el.innerHTML = '<svg width="' + pw + '" height="' + ph + '" viewBox="0 0 ' + pw + ' ' + ph + '"><rect x="0" y="0" width="' + pw + '" height="10" fill="#27ae60" rx="2"/><rect x="3" y="10" width="' + (pw - 6) + '" height="' + (ph - 10) + '" fill="#2ecc71"/><rect x="3" y="10" width="4" height="' + (ph - 10) + '" fill="#27ae60" opacity="0.5"/></svg>';
        }
        break;
      case TYPE_ENEMY:
        el.className = 'runner-enemy';
        if (theme === 'dino') {
          el.innerHTML = '<svg width="30" height="32" viewBox="0 0 30 32"><g fill="#c0392b"><rect x="10" y="2" width="8" height="6" rx="1"/><rect x="8" y="8" width="6" height="10"/><rect x="14" y="10" width="8" height="6" rx="1"/><rect x="20" y="8" width="4" height="3"/></g><g fill="#a93226"><rect x="8" y="18" width="3" height="8" rx="1"/><rect x="14" y="18" width="3" height="8" rx="1"/></g><rect x="12" y="4" width="2.5" height="2" rx="1" fill="white"/><rect x="13" y="4.5" width="1" height="1" fill="#222"/><rect x="10" y="7" width="4" height="1" fill="#e74c3c"/><rect x="22" y="9" width="3" height="1" fill="#e74c3c"/></svg>';
        } else if (theme === 'truck') {
          // Tire obstacle
          el.innerHTML = '<svg width="30" height="32" viewBox="0 0 30 32"><circle cx="15" cy="16" r="14" fill="#2d3436"/><circle cx="15" cy="16" r="10" fill="#636e72"/><circle cx="15" cy="16" r="5" fill="#2d3436"/><circle cx="15" cy="16" r="2" fill="#dfe6e9"/><path d="M15 6 L15 10" stroke="#2d3436" stroke-width="2"/><path d="M15 22 L15 26" stroke="#2d3436" stroke-width="2"/><path d="M5 16 L9 16" stroke="#2d3436" stroke-width="2"/><path d="M21 16 L25 16" stroke="#2d3436" stroke-width="2"/></svg>';
        } else {
          el.textContent = '👾';
        }
        break;
      case TYPE_GAP:
        el.className = 'runner-gap-marker';
        el.style.width = ent.width + 'px';
        el.style.height = ent.height + 'px';
        if (theme === 'dino') {
          el.style.background = 'linear-gradient(180deg, #4a3728 0%, #2a1f15 40%, #1a120b 100%)';
        } else if (theme === 'truck') {
          el.style.background = 'linear-gradient(180deg, #2d3436 0%, #1a1a2e 50%, #0a0a15 100%)';
        } else {
          el.style.background = 'rgba(0,0,0,0.7)';
        }
        el.style.borderRadius = '0 0 4px 4px';
        break;
      case TYPE_PLATFORM:
        el.className = 'runner-platform';
        if (theme === 'dino') {
          var w = ent.width;
          el.innerHTML = '<svg width="' + w + '" height="12" viewBox="0 0 ' + w + ' 12"><rect x="0" y="2" width="' + w + '" height="10" fill="#8b7355" rx="3"/><rect x="0" y="0" width="' + w + '" height="5" fill="#6d8b5e" rx="3"/><rect x="4" y="6" width="8" height="2" fill="#7a6548" rx="1" opacity="0.4"/><rect x="' + (w-14) + '" y="7" width="6" height="2" fill="#7a6548" rx="1" opacity="0.3"/></svg>';
        } else if (theme === 'truck') {
          // Metal ramp/platform
          var w = ent.width;
          el.innerHTML = '<svg width="' + w + '" height="12" viewBox="0 0 ' + w + ' 12"><rect x="0" y="0" width="' + w + '" height="12" fill="#636e72" rx="2"/><rect x="0" y="0" width="' + w + '" height="4" fill="#b2bec3" rx="2"/><rect x="4" y="5" width="6" height="2" fill="#dfe6e9" opacity="0.3"/><rect x="' + (w*0.5) + '" y="5" width="6" height="2" fill="#dfe6e9" opacity="0.3"/><rect x="2" y="10" width="' + (w-4) + '" height="2" fill="#2d3436" rx="1"/></svg>';
        } else {
          el.innerHTML = '<svg width="' + ent.width + '" height="12" viewBox="0 0 ' + ent.width + ' 12"><rect x="0" y="0" width="' + ent.width + '" height="12" fill="#8B7355" rx="2"/><rect x="0" y="0" width="' + ent.width + '" height="4" fill="#a0896c" rx="2"/></svg>';
        }
        break;
      case TYPE_COLLECTIBLE:
        el.className = 'runner-entity collectible';
        el.textContent = collectibleEmoji;
        break;
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
    bgScrollPos += gameSpeed * 0.3 * dt;

    // Update ground and bg
    var ground = document.getElementById('runner-ground');
    var bg = document.getElementById('runner-bg');
    if (ground) ground.style.transform = 'translateX(' + (-(scrollPos % areaWidth)) + 'px)';
    if (bg) bg.style.transform = 'translateX(' + (-(bgScrollPos % areaWidth)) + 'px)';

    // Player physics
    playerVY += GRAVITY_VAL * dt;
    playerY += playerVY * dt;

    var onPlatform = false;
    var inGap = false;

    // Check platform collisions (land on top)
    var playerScreenX = areaWidth * PLAYER_LEFT_PCT;
    var playerWorldX = scrollPos + playerScreenX;
    var playerBottom = groundY + playerY + PLAYER_SIZE;
    var playerLeft = playerWorldX + 6;
    var playerRight = playerWorldX + PLAYER_SIZE - 6;

    for (var p = 0; p < entities.length; p++) {
      var ent = entities[p];
      if (!ent.active) continue;

      if (ent.type === TYPE_PLATFORM && playerVY >= 0) {
        // Check if player is landing on platform
        var platScreenY = ent.y;
        if (playerBottom >= platScreenY && playerBottom <= platScreenY + 16 &&
            playerRight > ent.x - scrollPos + 4 && playerLeft < ent.x - scrollPos + ent.width - 4) {
          playerY = platScreenY - groundY - PLAYER_SIZE;
          playerVY = 0;
          isJumping = false;
          hasDoubleJumped = false;
          onPlatform = true;
        }
      }

      // Check gap
      if (ent.type === TYPE_GAP) {
        var gapScreenX = ent.x - scrollPos;
        if (playerScreenX + PLAYER_SIZE / 2 > gapScreenX + 8 &&
            playerScreenX + PLAYER_SIZE / 2 < gapScreenX + ent.width - 8 &&
            playerY >= -2) {
          inGap = true;
        }
      }
    }

    // Ground collision
    if (!onPlatform && !inGap) {
      if (playerY >= 0) {
        playerY = 0;
        playerVY = 0;
        isJumping = false;
        hasDoubleJumped = false;
      }
    }

    // Fall into gap = death
    if (inGap && playerY >= 0) {
      playerY += 5 * dt;
      if (playerY > 60) {
        triggerDeath();
        rafId = requestAnimationFrame(gameLoop);
        return;
      }
    }

    // Update player position
    var playerEl = document.getElementById('runner-player');
    if (playerEl) {
      playerEl.style.left = playerScreenX + 'px';
      playerEl.style.top = (groundY + playerY) + 'px';
    }

    // Spawn more terrain
    while (nextSegmentDist - scrollPos < areaWidth * 2.5) {
      nextSegmentDist = generateSegment(nextSegmentDist);
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
      var e = entities[i];
      var screenX = e.x - scrollPos;

      // Animate enemies
      if (e.type === TYPE_ENEMY && e.active) {
        e.patrolDist += 0.8 * e.patrolDir * dt;
        if (Math.abs(e.patrolDist) > e.patrolMax) {
          e.patrolDir *= -1;
        }
        screenX += e.patrolDist;
      }

      // Off-screen left - remove
      if (screenX < -100) {
        if (e.type === TYPE_COLLECTIBLE && e.active) {
          collectibleIndex--;
        }
        if (e.el && e.el.parentNode) e.el.parentNode.removeChild(e.el);
        entities.splice(i, 1);
        continue;
      }

      // Off-screen right - don't render
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
        if (e.type === TYPE_ENEMY) {
          e.el.style.transform = e.patrolDir < 0 ? 'scaleX(-1)' : '';
        }
      }

      // Collision detection
      if (e.active && e.type !== TYPE_GAP && e.type !== TYPE_PLATFORM) {
        var entBox = {
          x: screenX + 4,
          y: e.y + 4,
          w: e.width - 8,
          h: e.height - 8
        };

        if (Math.abs(screenX - playerScreenX) < 60 && boxesOverlap(playerBox, entBox)) {
          if (e.type === TYPE_COLLECTIBLE) {
            e.active = false;
            collected++;
            AudioManager.collect();
            if (e.el) {
              e.el.style.transition = 'opacity 0.2s, transform 0.2s';
              e.el.style.opacity = '0';
              e.el.style.transform = 'scale(1.5)';
            }
            // Floating "+1" text
            showPlusOne(screenX, e.y);
            updateScore();
            updateProgress();
            if (collected >= totalCollectibles) {
              finishGame();
              return;
            }
          } else {
            // Hit obstacle/enemy = death
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
    var area = document.getElementById('runner-area');
    if (!area) return;
    var el = document.createElement('div');
    el.className = 'runner-plus-one';
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

    var playerEl = document.getElementById('runner-player');
    var area = document.getElementById('runner-area');

    // Death animation on player
    if (playerEl) {
      playerEl.classList.add('dead');
    }

    // Red flash
    if (area) {
      var flash = document.createElement('div');
      flash.className = 'runner-flash';
      area.appendChild(flash);
      setTimeout(function () { if (flash.parentNode) flash.parentNode.removeChild(flash); }, 600);
    }

    // "Oops!" text
    var playerScreenX = areaWidth * PLAYER_LEFT_PCT;
    if (area) {
      var ouch = document.createElement('div');
      ouch.className = 'runner-ouch';
      ouch.textContent = t('oops');
      ouch.style.left = (playerScreenX - 10) + 'px';
      ouch.style.top = (groundY + playerY - 20) + 'px';
      area.appendChild(ouch);
      setTimeout(function () { if (ouch.parentNode) ouch.parentNode.removeChild(ouch); }, 1100);
    }

    // Show reset overlay after a beat, then reset
    deathTimer = setTimeout(function () {
      if (destroyed) return;
      showResetOverlay();
    }, 800);
  }

  function showResetOverlay() {
    var area = document.getElementById('runner-area');
    if (!area) return;

    var overlay = document.createElement('div');
    overlay.className = 'runner-reset-overlay';
    overlay.innerHTML = '<div class="runner-reset-text">' + t('oops') + '</div>' +
      '<div class="runner-reset-sub">' + t('tryAgain') + '</div>';
    area.appendChild(overlay);

    // Tap/click to restart
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
    // Clear old entities
    var area = document.getElementById('runner-area');
    if (area) {
      var oldEnts = area.querySelectorAll('.runner-entity,.runner-block,.runner-pipe,.runner-enemy,.runner-gap-marker,.runner-platform,.runner-ouch,.runner-flash,.runner-reset-overlay');
      for (var i = 0; i < oldEnts.length; i++) {
        if (oldEnts[i].parentNode) oldEnts[i].parentNode.removeChild(oldEnts[i]);
      }
    }

    // Reset state
    collected = 0;
    gameSpeed = 3;
    playerY = 0;
    playerVY = 0;
    isJumping = false;
    hasDoubleJumped = false;
    isDead = false;
    entities = [];
    scrollPos = 0;
    bgScrollPos = 0;
    nextSegmentDist = 350;
    collectibleIndex = 0;

    // Reset player visual
    var playerEl = document.getElementById('runner-player');
    if (playerEl) {
      playerEl.classList.remove('dead');
      playerEl.style.left = (areaWidth * PLAYER_LEFT_PCT) + 'px';
      playerEl.style.top = groundY + 'px';
    }

    updateScore();
    updateProgress();

    // Re-seed and restart
    seedTerrain();
    lastTime = performance.now();
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
    clearTimeout(deathTimer);
    setTimeout(function () {
      if (callback) callback();
    }, 400);
  }

  function destroy() {
    destroyed = true;
    if (rafId) cancelAnimationFrame(rafId);
    clearTimeout(deathTimer);

    var area = document.getElementById('runner-area');
    if (area) {
      area.removeEventListener('touchstart', boundTouchStart);
      area.removeEventListener('mousedown', boundTouchStart);
    }
    document.removeEventListener('keydown', boundKeyDown);
    if (boundKeyUp) document.removeEventListener('keyup', boundKeyUp);

    entities = [];
    keysDown = {};
    if (container) container.innerHTML = '';
  }

  return { start: start, destroy: destroy };
})();
