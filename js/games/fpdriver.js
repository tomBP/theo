/* ===== First-Person Monster Truck Driver ===== */
window.FPDriverGame = (function () {
  var container, callback;
  var rafId, destroyed;
  var lastTime, areaWidth, areaHeight;
  var boundKeyDown, boundKeyUp, boundTouchStart, boundTouchMove, boundTouchEnd;

  // Player state
  var playerLane; // 0=left, 1=center, 2=right
  var isJumping, jumpTimer, jumpDuration;
  var collected, totalCollectibles;
  var isDead, deathTimer;
  var speed, distance;
  var truckBounce;

  // Road & obstacles
  var obstacles, collectibles;
  var nextObstacleDist, nextCollectibleDist;
  var LANE_COUNT = 3;

  // Pseudo-3D road parameters
  var ROAD_VANISH_Y; // vanishing point Y (percentage of height)
  var ROAD_BOTTOM_Y; // bottom of road
  var ROAD_LEFT_VANISH, ROAD_RIGHT_VANISH;
  var ROAD_LEFT_BOTTOM, ROAD_RIGHT_BOTTOM;

  // Touch tracking
  var touchStartX, touchStartY;

  // Config
  var truckSVG, collectibleEmoji, speedRamp;
  var baseSpeed, maxSpeed;

  function start(config, gameArea, onComplete) {
    container = gameArea;
    callback = onComplete;
    destroyed = false;

    totalCollectibles = config.totalCollectibles || 10;
    collectibleEmoji = config.collectible || '⭐';
    truckSVG = config.truckSVG || '';
    speedRamp = config.speedRamp !== false;
    baseSpeed = config.baseSpeed || 3;
    maxSpeed = config.maxSpeed || 7;

    resetState();
    render();
    bindEvents();
    lastTime = performance.now();
    rafId = requestAnimationFrame(gameLoop);
  }

  function resetState() {
    playerLane = 1;
    isJumping = false;
    jumpTimer = 0;
    jumpDuration = 0.5;
    collected = 0;
    isDead = false;
    speed = baseSpeed;
    distance = 0;
    truckBounce = 0;
    obstacles = [];
    collectibles = [];
    nextObstacleDist = 40;
    nextCollectibleDist = 25;
    touchStartX = 0;
    touchStartY = 0;
  }

  function render() {
    var html = '<style>';
    // Main container
    html += '.fpd-area{position:relative;width:100%;height:100%;min-height:300px;overflow:hidden;border-radius:var(--radius-medium);touch-action:manipulation;-webkit-user-select:none;user-select:none;cursor:pointer;background:linear-gradient(180deg,#87CEEB 0%,#b8e4f9 40%,#e8d5a3 42%,#c4a56a 100%);}';

    // Sky with horizon
    html += '.fpd-sky{position:absolute;top:0;left:0;width:100%;height:42%;background:linear-gradient(180deg,#4a90d9 0%,#87CEEB 60%,#b8e4f9 100%);z-index:1;}';
    html += '.fpd-mountains{position:absolute;bottom:0;left:0;width:100%;height:40%;z-index:2;}';

    // Ground / dirt area
    html += '.fpd-ground{position:absolute;top:42%;left:0;width:100%;height:58%;background:linear-gradient(180deg,#c4a56a 0%,#a0896c 30%,#8B7355 100%);z-index:3;overflow:hidden;}';

    // Road surface
    html += '.fpd-road{position:absolute;z-index:4;overflow:hidden;}';

    // Canvas for road rendering
    html += '.fpd-canvas{position:absolute;top:0;left:0;width:100%;height:100%;z-index:5;}';

    // Dashboard
    html += '.fpd-dashboard{position:absolute;bottom:0;left:0;width:100%;height:22%;z-index:20;pointer-events:none;}';

    // Truck / steering wheel view
    html += '.fpd-wheel{position:absolute;bottom:2%;left:50%;transform:translateX(-50%);z-index:21;pointer-events:none;opacity:0.9;}';

    // HUD
    html += '.fpd-score{position:absolute;top:10px;right:14px;font-family:var(--font-title);font-size:clamp(1rem,3vw,1.3rem);color:var(--color-text);z-index:30;background:rgba(255,255,255,0.85);padding:4px 12px;border-radius:var(--radius-small);box-shadow:var(--shadow-soft);}';
    html += '.fpd-speed{position:absolute;top:10px;left:14px;font-family:var(--font-title);font-size:clamp(0.8rem,2.5vw,1rem);color:var(--color-text);z-index:30;background:rgba(255,255,255,0.85);padding:4px 12px;border-radius:var(--radius-small);}';
    html += '.fpd-hint{position:absolute;bottom:24%;left:50%;transform:translateX(-50%);font-family:var(--font-body);font-weight:600;font-size:0.85rem;color:rgba(255,255,255,0.9);z-index:30;white-space:nowrap;background:rgba(0,0,0,0.4);padding:4px 10px;border-radius:var(--radius-small);}';

    // Obstacle/collectible entities
    html += '.fpd-entity{position:absolute;z-index:10;pointer-events:none;transform-origin:center bottom;}';

    // Lane indicators
    html += '.fpd-lane-btn{position:absolute;bottom:24%;width:30%;height:40%;z-index:15;background:transparent;border:none;outline:none;}';
    html += '.fpd-lane-left{left:0;}';
    html += '.fpd-lane-right{right:0;}';
    html += '.fpd-lane-center{left:35%;width:30%;}';

    // Flash effect
    html += '.fpd-flash{position:absolute;inset:0;background:rgba(255,0,0,0.3);z-index:25;pointer-events:none;animation:fpd-flash-out 0.5s ease-out forwards;}';
    html += '@keyframes fpd-flash-out{from{opacity:1;}to{opacity:0;}}';
    html += '.fpd-ouch{position:absolute;font-family:var(--font-title);font-size:1.6rem;color:#e74c3c;z-index:26;pointer-events:none;animation:fpd-ouch-float 1s ease-out forwards;text-shadow:0 2px 4px rgba(0,0,0,0.3);}';
    html += '@keyframes fpd-ouch-float{0%{opacity:1;transform:translateY(0) scale(1);}100%{opacity:0;transform:translateY(-60px) scale(1.5);}}';

    // Plus one
    html += '.fpd-plus-one{position:absolute;font-family:var(--font-title);font-size:1.4rem;color:#2ecc71;z-index:26;pointer-events:none;animation:fpd-plus-float 0.9s ease-out forwards;text-shadow:0 2px 4px rgba(0,0,0,0.3);}';
    html += '@keyframes fpd-plus-float{0%{opacity:1;transform:translateY(0) scale(1);}100%{opacity:0;transform:translateY(-50px) scale(1.3);}}';

    // Reset overlay
    html += '.fpd-reset-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.5);z-index:35;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;animation:fpd-overlay-in 0.3s ease;}';
    html += '@keyframes fpd-overlay-in{from{opacity:0;}to{opacity:1;}}';
    html += '.fpd-reset-text{font-family:var(--font-title);font-size:clamp(1.5rem,5vw,2rem);color:white;text-shadow:0 2px 8px rgba(0,0,0,0.4);}';
    html += '.fpd-reset-sub{font-family:var(--font-body);font-weight:700;font-size:clamp(0.9rem,3vw,1.1rem);color:rgba(255,255,255,0.9);}';

    html += '</style>';

    html += '<div class="fpd-area" id="fpd-area">';

    // Canvas for pseudo-3D road
    html += '<canvas class="fpd-canvas" id="fpd-canvas"></canvas>';

    // HUD
    html += '<div class="fpd-score" id="fpd-score">0/' + totalCollectibles + ' ' + collectibleEmoji + '</div>';
    html += '<div class="fpd-speed" id="fpd-speed">60 km/h</div>';

    // Hint
    html += '<div class="fpd-hint" id="fpd-hint">' + L({
      es: 'Desliza o flechas = Mover | Toca o Espacio = Saltar',
      en: 'Swipe or Arrows = Move | Tap or Space = Jump',
      ca: 'Llisca o fletxes = Moure | Toca o Espai = Saltar'
    }) + '</div>';

    // Dashboard - steering wheel + hands
    html += '<div class="fpd-dashboard" id="fpd-dashboard"></div>';

    html += '</div>';

    container.innerHTML = html;

    var area = document.getElementById('fpd-area');
    if (area) {
      areaWidth = area.offsetWidth;
      areaHeight = area.offsetHeight;
    }

    // Set up canvas
    var canvas = document.getElementById('fpd-canvas');
    if (canvas) {
      canvas.width = areaWidth;
      canvas.height = areaHeight;
    }

    // Compute road perspective params
    ROAD_VANISH_Y = areaHeight * 0.42;
    ROAD_BOTTOM_Y = areaHeight;
    var vanishX = areaWidth * 0.5;
    ROAD_LEFT_VANISH = vanishX - areaWidth * 0.02;
    ROAD_RIGHT_VANISH = vanishX + areaWidth * 0.02;
    ROAD_LEFT_BOTTOM = -areaWidth * 0.15;
    ROAD_RIGHT_BOTTOM = areaWidth * 1.15;

    renderDashboard();
  }

  function renderDashboard() {
    var dash = document.getElementById('fpd-dashboard');
    if (!dash) return;

    var w = areaWidth;
    var h = areaHeight * 0.22;

    var svg = '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg">';

    // Dashboard body
    svg += '<rect x="0" y="' + (h * 0.15) + '" width="' + w + '" height="' + (h * 0.85) + '" fill="#2d3436" rx="8"/>';
    svg += '<rect x="0" y="' + (h * 0.15) + '" width="' + w + '" height="' + (h * 0.2) + '" fill="#636e72" rx="4"/>';

    // Speedometer (left)
    var gx = w * 0.18;
    var gy = h * 0.55;
    svg += '<circle cx="' + gx + '" cy="' + gy + '" r="' + (h * 0.28) + '" fill="#1a1a1a" stroke="#555" stroke-width="2"/>';
    svg += '<circle cx="' + gx + '" cy="' + gy + '" r="' + (h * 0.22) + '" fill="none" stroke="#e74c3c" stroke-width="1.5" stroke-dasharray="4 3"/>';
    svg += '<text x="' + gx + '" y="' + (gy + 4) + '" text-anchor="middle" fill="#e74c3c" font-size="' + Math.max(10, h * 0.18) + '" font-family="sans-serif" font-weight="bold" id="fpd-speedo-text">60</text>';

    // Steering wheel (center)
    var cx = w * 0.5;
    var cy = h * 0.6;
    var wr = Math.min(h * 0.38, w * 0.12);
    svg += '<circle cx="' + cx + '" cy="' + cy + '" r="' + wr + '" fill="none" stroke="#444" stroke-width="' + (wr * 0.25) + '"/>';
    svg += '<circle cx="' + cx + '" cy="' + cy + '" r="' + wr + '" fill="none" stroke="#555" stroke-width="' + (wr * 0.18) + '"/>';
    svg += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (wr * 0.35) + '" fill="#333" stroke="#555" stroke-width="1"/>';
    // Spokes
    svg += '<line x1="' + cx + '" y1="' + (cy - wr) + '" x2="' + cx + '" y2="' + (cy - wr * 0.35) + '" stroke="#555" stroke-width="3"/>';
    svg += '<line x1="' + (cx - wr) + '" y1="' + cy + '" x2="' + (cx - wr * 0.35) + '" y2="' + cy + '" stroke="#555" stroke-width="3"/>';
    svg += '<line x1="' + (cx + wr) + '" y1="' + cy + '" x2="' + (cx + wr * 0.35) + '" y2="' + cy + '" stroke="#555" stroke-width="3"/>';

    // Tachometer (right)
    var tx = w * 0.82;
    svg += '<circle cx="' + tx + '" cy="' + gy + '" r="' + (h * 0.28) + '" fill="#1a1a1a" stroke="#555" stroke-width="2"/>';
    svg += '<circle cx="' + tx + '" cy="' + gy + '" r="' + (h * 0.22) + '" fill="none" stroke="#2ecc71" stroke-width="1.5" stroke-dasharray="4 3"/>';
    svg += '<text x="' + tx + '" y="' + (gy + 4) + '" text-anchor="middle" fill="#2ecc71" font-size="' + Math.max(10, h * 0.18) + '" font-family="sans-serif" font-weight="bold">' + collectibleEmoji + '</text>';

    svg += '</svg>';
    dash.innerHTML = svg;
  }

  function bindEvents() {
    var area = document.getElementById('fpd-area');
    if (!area) return;

    boundTouchStart = function (e) {
      e.preventDefault();
      var touch = e.touches ? e.touches[0] : e;
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    };

    boundTouchMove = function (e) {
      e.preventDefault();
    };

    boundTouchEnd = function (e) {
      e.preventDefault();
      if (isDead) return;
      var touch = e.changedTouches ? e.changedTouches[0] : e;
      var dx = touch.clientX - touchStartX;
      var dy = touch.clientY - touchStartY;
      var absDx = Math.abs(dx);
      var absDy = Math.abs(dy);

      var hint = document.getElementById('fpd-hint');
      if (hint) hint.style.display = 'none';

      if (absDx > 30 && absDx > absDy) {
        // Horizontal swipe - change lane
        if (dx < 0 && playerLane > 0) {
          playerLane--;
          AudioManager.tap();
        } else if (dx > 0 && playerLane < 2) {
          playerLane++;
          AudioManager.tap();
        }
      } else if (absDy > 30 && absDy > absDx && dy < 0) {
        // Swipe up = jump
        doJump();
      } else if (absDx < 15 && absDy < 15) {
        // Tap = jump
        doJump();
      }
    };

    boundKeyDown = function (e) {
      if (isDead) return;
      var hint = document.getElementById('fpd-hint');
      if (hint) hint.style.display = 'none';

      if (e.key === 'ArrowLeft' || e.key === 'a') {
        e.preventDefault();
        if (playerLane > 0) { playerLane--; AudioManager.tap(); }
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        e.preventDefault();
        if (playerLane < 2) { playerLane++; AudioManager.tap(); }
      } else if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        doJump();
      }
    };

    boundKeyUp = function (e) {};

    area.addEventListener('touchstart', boundTouchStart, { passive: false });
    area.addEventListener('touchmove', boundTouchMove, { passive: false });
    area.addEventListener('touchend', boundTouchEnd, { passive: false });
    area.addEventListener('mousedown', function (e) {
      touchStartX = e.clientX;
      touchStartY = e.clientY;
    });
    area.addEventListener('mouseup', function (e) {
      if (isDead) return;
      var dx = e.clientX - touchStartX;
      var dy = e.clientY - touchStartY;
      var absDx = Math.abs(dx);
      var absDy = Math.abs(dy);
      var hint = document.getElementById('fpd-hint');
      if (hint) hint.style.display = 'none';

      if (absDx > 30 && absDx > absDy) {
        if (dx < 0 && playerLane > 0) { playerLane--; AudioManager.tap(); }
        else if (dx > 0 && playerLane < 2) { playerLane++; AudioManager.tap(); }
      } else if (absDy > 30 && dy < 0) {
        doJump();
      } else {
        doJump();
      }
    });

    document.addEventListener('keydown', boundKeyDown);
    document.addEventListener('keyup', boundKeyUp);
  }

  function doJump() {
    if (isJumping || isDead) return;
    isJumping = true;
    jumpTimer = 0;
    AudioManager.tap();
  }

  // --- Spawning ---
  function spawnObstacle() {
    var lane = Math.floor(Math.random() * LANE_COUNT);
    var types = ['barrel', 'cone', 'tire', 'barrier'];
    var type = types[Math.floor(Math.random() * types.length)];
    var jumpable = (type === 'barrier' || Math.random() < 0.3);

    obstacles.push({
      lane: lane,
      z: 1.0, // 1.0 = far away at horizon, 0.0 = at player
      type: type,
      jumpable: jumpable,
      active: true
    });
  }

  function spawnCollectible() {
    if (collected + countActiveCollectibles() >= totalCollectibles) return;
    var lane = Math.floor(Math.random() * LANE_COUNT);
    collectibles.push({
      lane: lane,
      z: 1.0,
      active: true
    });
  }

  function countActiveCollectibles() {
    var count = 0;
    for (var i = 0; i < collectibles.length; i++) {
      if (collectibles[i].active) count++;
    }
    return count;
  }

  // --- Perspective projection ---
  function projectZ(z) {
    // z: 1.0 = horizon, 0.0 = bottom of screen (player position)
    // Returns screen Y and scale
    var t = 1.0 - z; // 0 = horizon, 1 = bottom
    // Use exponential curve for depth
    var curve = t * t;
    var screenY = ROAD_VANISH_Y + (ROAD_BOTTOM_Y - ROAD_VANISH_Y) * curve;
    var scale = curve;
    return { y: screenY, scale: scale };
  }

  function getLaneX(lane, z) {
    var proj = projectZ(z);
    var t = proj.scale;
    // Interpolate road edges
    var leftEdge = ROAD_LEFT_VANISH + (ROAD_LEFT_BOTTOM - ROAD_LEFT_VANISH) * t;
    var rightEdge = ROAD_RIGHT_VANISH + (ROAD_RIGHT_BOTTOM - ROAD_RIGHT_VANISH) * t;
    var roadWidth = rightEdge - leftEdge;
    // Lane centers: divide road into 3 equal parts
    var laneWidth = roadWidth / LANE_COUNT;
    var x = leftEdge + laneWidth * (lane + 0.5);
    return x;
  }

  // --- Main Loop ---
  function gameLoop(timestamp) {
    if (destroyed) return;
    var dt = Math.min((timestamp - lastTime) / 16.67, 3);
    lastTime = timestamp;

    if (isDead) {
      rafId = requestAnimationFrame(gameLoop);
      return;
    }

    // Speed ramping
    if (speedRamp && totalCollectibles > 0) {
      speed = baseSpeed + (maxSpeed - baseSpeed) * (collected / totalCollectibles);
    }

    var moveStep = speed * 0.012 * dt;
    distance += moveStep;

    // Truck bounce effect
    truckBounce += dt * 0.3;

    // Spawn logic
    nextObstacleDist -= moveStep;
    if (nextObstacleDist <= 0) {
      spawnObstacle();
      nextObstacleDist = 12 + Math.random() * 15;
    }

    nextCollectibleDist -= moveStep;
    if (nextCollectibleDist <= 0 && collected < totalCollectibles) {
      spawnCollectible();
      nextCollectibleDist = 8 + Math.random() * 12;
    }

    // Update jump
    if (isJumping) {
      jumpTimer += dt * 0.04;
      if (jumpTimer >= jumpDuration) {
        isJumping = false;
        jumpTimer = 0;
      }
    }

    // Move obstacles toward player
    for (var i = obstacles.length - 1; i >= 0; i--) {
      var obs = obstacles[i];
      obs.z -= moveStep * 0.04;

      // Collision check at z ~ 0.05-0.15 (close to player)
      if (obs.active && obs.z < 0.15 && obs.z > -0.05) {
        if (obs.lane === playerLane) {
          if (obs.jumpable && isJumping) {
            // Successfully jumped over!
          } else {
            triggerDeath();
            rafId = requestAnimationFrame(gameLoop);
            return;
          }
        }
      }

      // Remove past player
      if (obs.z < -0.1) {
        obstacles.splice(i, 1);
      }
    }

    // Move collectibles toward player
    for (var j = collectibles.length - 1; j >= 0; j--) {
      var col = collectibles[j];
      col.z -= moveStep * 0.04;

      if (col.active && col.z < 0.15 && col.z > -0.05) {
        if (col.lane === playerLane) {
          col.active = false;
          collected++;
          AudioManager.collect();
          updateScore();
          updateProgress();
          if (collected >= totalCollectibles) {
            finishGame();
            return;
          }
        }
      }

      if (col.z < -0.1) {
        collectibles.splice(j, 1);
      }
    }

    // Render everything on canvas
    renderFrame();

    rafId = requestAnimationFrame(gameLoop);
  }

  function renderFrame() {
    var canvas = document.getElementById('fpd-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var w = areaWidth;
    var h = areaHeight;

    ctx.clearRect(0, 0, w, h);

    // --- Sky ---
    var skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.42);
    skyGrad.addColorStop(0, '#4a90d9');
    skyGrad.addColorStop(0.7, '#87CEEB');
    skyGrad.addColorStop(1, '#b8e4f9');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.44);

    // Sun
    ctx.fillStyle = '#FFD93D';
    ctx.beginPath();
    ctx.arc(w * 0.8, h * 0.12, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,217,61,0.3)';
    ctx.beginPath();
    ctx.arc(w * 0.8, h * 0.12, 30, 0, Math.PI * 2);
    ctx.fill();

    // Clouds
    drawCloud(ctx, w * 0.15, h * 0.08, 40);
    drawCloud(ctx, w * 0.45, h * 0.14, 35);
    drawCloud(ctx, w * 0.75, h * 0.06, 30);

    // Mountains/hills on horizon
    ctx.fillStyle = '#8B7355';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.42);
    ctx.lineTo(w * 0.1, h * 0.34);
    ctx.lineTo(w * 0.2, h * 0.38);
    ctx.lineTo(w * 0.35, h * 0.30);
    ctx.lineTo(w * 0.5, h * 0.36);
    ctx.lineTo(w * 0.65, h * 0.32);
    ctx.lineTo(w * 0.8, h * 0.37);
    ctx.lineTo(w * 0.9, h * 0.33);
    ctx.lineTo(w, h * 0.38);
    ctx.lineTo(w, h * 0.42);
    ctx.closePath();
    ctx.fill();

    // Dirt ground
    var dirtGrad = ctx.createLinearGradient(0, h * 0.42, 0, h);
    dirtGrad.addColorStop(0, '#c4a56a');
    dirtGrad.addColorStop(0.4, '#a0896c');
    dirtGrad.addColorStop(1, '#8B7355');
    ctx.fillStyle = dirtGrad;
    ctx.fillRect(0, h * 0.42, w, h * 0.58);

    // --- Road ---
    drawRoad(ctx, w, h);

    // --- Obstacles ---
    // Sort by z (far first, close last) for correct overlap
    var allEntities = [];
    for (var oi = 0; oi < obstacles.length; oi++) {
      if (obstacles[oi].z > -0.05 && obstacles[oi].z < 1.05) {
        allEntities.push({ kind: 'obstacle', data: obstacles[oi] });
      }
    }
    for (var ci = 0; ci < collectibles.length; ci++) {
      if (collectibles[ci].active && collectibles[ci].z > -0.05 && collectibles[ci].z < 1.05) {
        allEntities.push({ kind: 'collectible', data: collectibles[ci] });
      }
    }
    allEntities.sort(function (a, b) { return b.data.z - a.data.z; });

    for (var ei = 0; ei < allEntities.length; ei++) {
      var ent = allEntities[ei];
      if (ent.kind === 'obstacle') {
        drawObstacle(ctx, ent.data);
      } else {
        drawCollectible(ctx, ent.data);
      }
    }

    // --- Player truck (first person - just show hood) ---
    drawPlayerView(ctx, w, h);

    // --- Dashboard overlay ---
    drawDashboardOverlay(ctx, w, h);

    // Update speed display
    var speedKmh = Math.round(60 + speed * 15);
    var speedEl = document.getElementById('fpd-speed');
    if (speedEl) speedEl.textContent = speedKmh + ' km/h';
  }

  function drawCloud(ctx, x, y, size) {
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath();
    ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
    ctx.arc(x + size * 0.3, y - size * 0.15, size * 0.35, 0, Math.PI * 2);
    ctx.arc(x + size * 0.55, y, size * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawRoad(ctx, w, h) {
    // Draw road trapezoid from horizon to bottom
    var steps = 40;
    for (var i = 0; i < steps; i++) {
      var z1 = i / steps;
      var z2 = (i + 1) / steps;
      var p1 = projectZ(z1);
      var p2 = projectZ(z2);

      var t1 = p1.scale;
      var t2 = p2.scale;

      var left1 = ROAD_LEFT_VANISH + (ROAD_LEFT_BOTTOM - ROAD_LEFT_VANISH) * t1;
      var right1 = ROAD_RIGHT_VANISH + (ROAD_RIGHT_BOTTOM - ROAD_RIGHT_VANISH) * t1;
      var left2 = ROAD_LEFT_VANISH + (ROAD_LEFT_BOTTOM - ROAD_LEFT_VANISH) * t2;
      var right2 = ROAD_RIGHT_VANISH + (ROAD_RIGHT_BOTTOM - ROAD_RIGHT_VANISH) * t2;

      // Alternate road color for depth effect
      var stripe = Math.floor((z1 * 20 + distance * 2) % 2);
      ctx.fillStyle = stripe === 0 ? '#636e72' : '#555a5e';
      ctx.beginPath();
      ctx.moveTo(left1, p1.y);
      ctx.lineTo(right1, p1.y);
      ctx.lineTo(right2, p2.y);
      ctx.lineTo(left2, p2.y);
      ctx.closePath();
      ctx.fill();

      // Lane dividers (dashed)
      if (stripe === 0 && t1 > 0.03) {
        ctx.strokeStyle = '#FFD93D';
        ctx.lineWidth = Math.max(1, t1 * 3);
        for (var lane = 1; lane < LANE_COUNT; lane++) {
          var lx1 = left1 + (right1 - left1) * (lane / LANE_COUNT);
          var lx2 = left2 + (right2 - left2) * (lane / LANE_COUNT);
          ctx.beginPath();
          ctx.moveTo(lx1, p1.y);
          ctx.lineTo(lx2, p2.y);
          ctx.stroke();
        }
      }

      // Road edges (white lines)
      if (t1 > 0.02) {
        ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        ctx.lineWidth = Math.max(1, t1 * 2);
        ctx.beginPath();
        ctx.moveTo(left1, p1.y);
        ctx.lineTo(left2, p2.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(right1, p1.y);
        ctx.lineTo(right2, p2.y);
        ctx.stroke();
      }
    }
  }

  function drawObstacle(ctx, obs) {
    var proj = projectZ(1.0 - obs.z);
    var x = getLaneX(obs.lane, 1.0 - obs.z);
    var y = proj.y;
    var scale = proj.scale;
    if (scale < 0.01) return;

    var size = 40 * scale;
    if (size < 3) return;

    ctx.save();
    ctx.translate(x, y);

    switch (obs.type) {
      case 'barrel':
        // Oil barrel
        ctx.fillStyle = '#2d3436';
        ctx.fillRect(-size * 0.4, -size * 1.2, size * 0.8, size * 1.0);
        ctx.fillStyle = '#636e72';
        ctx.fillRect(-size * 0.35, -size * 1.1, size * 0.7, size * 0.8);
        ctx.fillStyle = '#fdcb6e';
        ctx.fillRect(-size * 0.2, -size * 0.85, size * 0.4, size * 0.35);
        // Stripes
        ctx.fillStyle = '#2d3436';
        ctx.fillRect(-size * 0.4, -size * 0.7, size * 0.8, size * 0.06);
        ctx.fillRect(-size * 0.4, -size * 0.4, size * 0.8, size * 0.06);
        break;

      case 'cone':
        // Traffic cone
        ctx.fillStyle = '#e17055';
        ctx.beginPath();
        ctx.moveTo(0, -size * 1.1);
        ctx.lineTo(-size * 0.35, 0);
        ctx.lineTo(size * 0.35, 0);
        ctx.closePath();
        ctx.fill();
        // White stripes
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillRect(-size * 0.18, -size * 0.65, size * 0.36, size * 0.1);
        ctx.fillRect(-size * 0.25, -size * 0.35, size * 0.5, size * 0.1);
        // Base
        ctx.fillStyle = '#d63031';
        ctx.fillRect(-size * 0.4, -size * 0.08, size * 0.8, size * 0.08);
        break;

      case 'tire':
        // Tire
        ctx.fillStyle = '#2d3436';
        ctx.beginPath();
        ctx.arc(0, -size * 0.5, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#636e72';
        ctx.beginPath();
        ctx.arc(0, -size * 0.5, size * 0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#2d3436';
        ctx.beginPath();
        ctx.arc(0, -size * 0.5, size * 0.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#dfe6e9';
        ctx.beginPath();
        ctx.arc(0, -size * 0.5, size * 0.08, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'barrier':
        // Concrete barrier / ramp (jumpable)
        ctx.fillStyle = '#b2bec3';
        ctx.fillRect(-size * 0.6, -size * 0.4, size * 1.2, size * 0.4);
        ctx.fillStyle = '#dfe6e9';
        ctx.fillRect(-size * 0.6, -size * 0.4, size * 1.2, size * 0.1);
        // Warning stripes
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(-size * 0.6, -size * 0.3, size * 0.2, size * 0.2);
        ctx.fillRect(-size * 0.15, -size * 0.3, size * 0.2, size * 0.2);
        ctx.fillRect(size * 0.3, -size * 0.3, size * 0.2, size * 0.2);
        break;
    }

    ctx.restore();
  }

  function drawCollectible(ctx, col) {
    if (!col.active) return;
    var proj = projectZ(1.0 - col.z);
    var x = getLaneX(col.lane, 1.0 - col.z);
    var y = proj.y;
    var scale = proj.scale;
    if (scale < 0.02) return;

    var size = 25 * scale;
    if (size < 3) return;

    // Floating star
    var floatY = Math.sin(distance * 3 + col.z * 10) * size * 0.3;

    ctx.save();
    ctx.translate(x, y - size * 1.5 + floatY);

    // Glow
    ctx.fillStyle = 'rgba(255,217,61,0.4)';
    ctx.beginPath();
    ctx.arc(0, 0, size * 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Star shape
    ctx.fillStyle = '#FFD93D';
    ctx.strokeStyle = '#f39c12';
    ctx.lineWidth = Math.max(1, size * 0.1);
    drawStar(ctx, 0, 0, 5, size, size * 0.5);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  function drawStar(ctx, cx, cy, spikes, outerR, innerR) {
    var rot = Math.PI / 2 * 3;
    var step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerR);
    for (var i = 0; i < spikes; i++) {
      ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
      rot += step;
      ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerR);
    ctx.closePath();
  }

  function drawPlayerView(ctx, w, h) {
    // Jump effect - lift viewport
    var jumpOffset = 0;
    if (isJumping) {
      var jumpProgress = jumpTimer / jumpDuration;
      jumpOffset = Math.sin(jumpProgress * Math.PI) * 35;
    }

    // Monster truck hood visible at bottom
    var hoodY = h * 0.72 - jumpOffset;
    var hoodH = h * 0.12;
    var bounce = Math.sin(truckBounce) * 2;

    // Hood shadow
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(w * 0.15, hoodY + bounce + 3, w * 0.7, hoodH);

    // Main hood
    var hoodGrad = ctx.createLinearGradient(0, hoodY, 0, hoodY + hoodH);
    hoodGrad.addColorStop(0, '#e74c3c');
    hoodGrad.addColorStop(0.5, '#c0392b');
    hoodGrad.addColorStop(1, '#a93226');
    ctx.fillStyle = hoodGrad;

    ctx.beginPath();
    ctx.moveTo(w * 0.18, hoodY + hoodH + bounce);
    ctx.lineTo(w * 0.22, hoodY + bounce);
    ctx.lineTo(w * 0.78, hoodY + bounce);
    ctx.lineTo(w * 0.82, hoodY + hoodH + bounce);
    ctx.closePath();
    ctx.fill();

    // Hood scoop
    ctx.fillStyle = '#2d3436';
    ctx.beginPath();
    ctx.moveTo(w * 0.4, hoodY + hoodH * 0.2 + bounce);
    ctx.lineTo(w * 0.42, hoodY - hoodH * 0.1 + bounce);
    ctx.lineTo(w * 0.58, hoodY - hoodH * 0.1 + bounce);
    ctx.lineTo(w * 0.6, hoodY + hoodH * 0.2 + bounce);
    ctx.closePath();
    ctx.fill();

    // Hood panel lines
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w * 0.5, hoodY + bounce);
    ctx.lineTo(w * 0.5, hoodY + hoodH + bounce);
    ctx.stroke();

    // Side mirrors
    ctx.fillStyle = '#2d3436';
    ctx.fillRect(w * 0.08, hoodY - hoodH * 0.3 + bounce, w * 0.08, hoodH * 0.5);
    ctx.fillRect(w * 0.84, hoodY - hoodH * 0.3 + bounce, w * 0.08, hoodH * 0.5);
    // Mirror reflections
    ctx.fillStyle = '#a8d8ea';
    ctx.fillRect(w * 0.09, hoodY - hoodH * 0.2 + bounce, w * 0.06, hoodH * 0.3);
    ctx.fillRect(w * 0.85, hoodY - hoodH * 0.2 + bounce, w * 0.06, hoodH * 0.3);

    // Lane indicator arrows on road
    var laneX = getLaneX(playerLane, 0.85);
    var arrowY = h * 0.62;
    ctx.fillStyle = 'rgba(46,204,113,0.5)';
    ctx.beginPath();
    ctx.moveTo(laneX, arrowY - 10);
    ctx.lineTo(laneX - 12, arrowY + 6);
    ctx.lineTo(laneX + 12, arrowY + 6);
    ctx.closePath();
    ctx.fill();
  }

  function drawDashboardOverlay(ctx, w, h) {
    // Dashboard at very bottom
    var dashH = h * 0.22;
    var dashY = h - dashH;

    // Dark dashboard
    var dashGrad = ctx.createLinearGradient(0, dashY, 0, h);
    dashGrad.addColorStop(0, '#3d3d3d');
    dashGrad.addColorStop(0.2, '#2d3436');
    dashGrad.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = dashGrad;
    ctx.fillRect(0, dashY, w, dashH);

    // Top edge highlight
    ctx.fillStyle = '#555';
    ctx.fillRect(0, dashY, w, 3);

    // Steering wheel
    var cx = w * 0.5;
    var cy = dashY + dashH * 0.55;
    var wr = Math.min(dashH * 0.38, w * 0.12);

    // Steering tilt based on lane
    var tilt = (playerLane - 1) * 25; // -25, 0, 25 degrees

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(tilt * Math.PI / 180);

    // Wheel rim
    ctx.strokeStyle = '#555';
    ctx.lineWidth = wr * 0.22;
    ctx.beginPath();
    ctx.arc(0, 0, wr, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#666';
    ctx.lineWidth = wr * 0.16;
    ctx.beginPath();
    ctx.arc(0, 0, wr, 0, Math.PI * 2);
    ctx.stroke();

    // Center
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(0, 0, wr * 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Spokes
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -wr);
    ctx.lineTo(0, -wr * 0.3);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-wr, 0);
    ctx.lineTo(-wr * 0.3, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(wr, 0);
    ctx.lineTo(wr * 0.3, 0);
    ctx.stroke();

    ctx.restore();

    // Speedometer (left)
    var gx = w * 0.18;
    var gy = dashY + dashH * 0.55;
    var gr = dashH * 0.28;

    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(gx, gy, gr, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Speed needle
    var speedPct = (speed - baseSpeed) / (maxSpeed - baseSpeed);
    var needleAngle = -Math.PI * 0.75 + speedPct * Math.PI * 1.5;
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.lineTo(gx + Math.cos(needleAngle) * gr * 0.7, gy + Math.sin(needleAngle) * gr * 0.7);
    ctx.stroke();

    // Speed text
    var speedKmh = Math.round(60 + speed * 15);
    ctx.fillStyle = '#e74c3c';
    ctx.font = 'bold ' + Math.max(8, gr * 0.45) + 'px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(speedKmh, gx, gy + gr * 0.55);

    // Star counter (right)
    var tx = w * 0.82;
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(tx, gy, gr, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#2ecc71';
    ctx.font = 'bold ' + Math.max(8, gr * 0.45) + 'px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(collected + '/' + totalCollectibles, tx, gy + gr * 0.15);

    // Hands on wheel
    var handSize = wr * 0.35;
    ctx.fillStyle = '#f0c27a';
    // Left hand
    var lhx = cx - wr * 0.85;
    var lhy = cy + wr * 0.2;
    ctx.beginPath();
    ctx.arc(lhx, lhy, handSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#d4a76a';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Right hand
    var rhx = cx + wr * 0.85;
    var rhy = cy + wr * 0.2;
    ctx.beginPath();
    ctx.arc(rhx, rhy, handSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  function triggerDeath() {
    isDead = true;
    AudioManager.wrong();

    var area = document.getElementById('fpd-area');

    // Red flash
    if (area) {
      var flash = document.createElement('div');
      flash.className = 'fpd-flash';
      area.appendChild(flash);
      setTimeout(function () { if (flash.parentNode) flash.parentNode.removeChild(flash); }, 600);

      var ouch = document.createElement('div');
      ouch.className = 'fpd-ouch';
      ouch.textContent = t('oops');
      ouch.style.left = (areaWidth * 0.4) + 'px';
      ouch.style.top = (areaHeight * 0.35) + 'px';
      area.appendChild(ouch);
      setTimeout(function () { if (ouch.parentNode) ouch.parentNode.removeChild(ouch); }, 1100);
    }

    deathTimer = setTimeout(function () {
      if (destroyed) return;
      showResetOverlay();
    }, 800);
  }

  function showResetOverlay() {
    var area = document.getElementById('fpd-area');
    if (!area) return;

    var overlay = document.createElement('div');
    overlay.className = 'fpd-reset-overlay';
    overlay.innerHTML = '<div class="fpd-reset-text">' + t('oops') + '</div>' +
      '<div class="fpd-reset-sub">' + t('tryAgain') + '</div>';
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
    var area = document.getElementById('fpd-area');
    if (area) {
      var overlays = area.querySelectorAll('.fpd-ouch,.fpd-flash,.fpd-reset-overlay,.fpd-plus-one');
      for (var i = 0; i < overlays.length; i++) {
        if (overlays[i].parentNode) overlays[i].parentNode.removeChild(overlays[i]);
      }
    }

    collected = 0;
    isDead = false;
    isJumping = false;
    jumpTimer = 0;
    speed = baseSpeed;
    distance = 0;
    truckBounce = 0;
    obstacles = [];
    collectibles = [];
    nextObstacleDist = 40;
    nextCollectibleDist = 25;
    playerLane = 1;

    updateScore();
    updateProgress();
    lastTime = performance.now();
  }

  function updateScore() {
    var el = document.getElementById('fpd-score');
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

    var area = document.getElementById('fpd-area');
    if (area) {
      area.removeEventListener('touchstart', boundTouchStart);
      area.removeEventListener('touchmove', boundTouchMove);
      area.removeEventListener('touchend', boundTouchEnd);
    }
    document.removeEventListener('keydown', boundKeyDown);
    document.removeEventListener('keyup', boundKeyUp);

    obstacles = [];
    collectibles = [];
    if (container) container.innerHTML = '';
  }

  return { start: start, destroy: destroy };
})();
