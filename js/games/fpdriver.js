/* ===== First-Person Monster Truck Driver ===== */
window.FPDriverGame = (function () {
  var container, callback;
  var rafId, destroyed;
  var lastTime, areaWidth, areaHeight;
  var boundKeyDown, boundKeyUp;

  // Player state
  var playerLane; // 0=left, 1=center, 2=right
  var targetLane; // smooth lane transition target
  var lanePos; // smooth 0-2 float for rendering
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
  var ROAD_VANISH_Y;
  var ROAD_BOTTOM_Y;
  var ROAD_LEFT_VANISH, ROAD_RIGHT_VANISH;
  var ROAD_LEFT_BOTTOM, ROAD_RIGHT_BOTTOM;

  // Config
  var collectibleEmoji, speedRamp;
  var baseSpeed, maxSpeed;

  function start(config, gameArea, onComplete) {
    container = gameArea;
    callback = onComplete;
    destroyed = false;

    totalCollectibles = config.totalCollectibles || 10;
    collectibleEmoji = config.collectible || '⭐';
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
    targetLane = 1;
    lanePos = 1;
    isJumping = false;
    jumpTimer = 0;
    jumpDuration = 0.45;
    collected = 0;
    isDead = false;
    speed = baseSpeed;
    distance = 0;
    truckBounce = 0;
    obstacles = [];
    collectibles = [];
    nextObstacleDist = 2.0;
    nextCollectibleDist = 1.0;
  }

  function render() {
    var html = '<style>';
    html += '.fpd-area{position:relative;width:100%;height:100%;min-height:300px;overflow:hidden;border-radius:var(--radius-medium);touch-action:none;-webkit-user-select:none;user-select:none;cursor:pointer;background:#333;}';
    html += '.fpd-canvas{display:block;}';
    html += '.fpd-score{position:absolute;top:10px;right:14px;font-family:var(--font-title);font-size:clamp(1rem,3vw,1.3rem);color:var(--color-text);z-index:30;background:rgba(255,255,255,0.85);padding:4px 12px;border-radius:var(--radius-small);box-shadow:var(--shadow-soft);}';
    html += '.fpd-speed{position:absolute;top:10px;left:14px;font-family:var(--font-title);font-size:clamp(0.8rem,2.5vw,1rem);color:var(--color-text);z-index:30;background:rgba(255,255,255,0.85);padding:4px 12px;border-radius:var(--radius-small);}';
    html += '.fpd-hint{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:var(--font-body);font-weight:700;font-size:clamp(0.9rem,3vw,1.1rem);color:#fff;z-index:30;white-space:nowrap;background:rgba(0,0,0,0.6);padding:8px 16px;border-radius:var(--radius-small);pointer-events:none;}';
    // Control buttons
    html += '.fpd-ctrl{position:absolute;z-index:25;border:none;outline:none;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.6rem;color:#fff;background:rgba(255,255,255,0.18);-webkit-user-select:none;user-select:none;touch-action:none;}';
    html += '.fpd-ctrl:active{background:rgba(255,255,255,0.4);}';
    html += '.fpd-ctrl-left{bottom:12px;left:12px;width:60px;height:60px;}';
    html += '.fpd-ctrl-right{bottom:12px;left:80px;width:60px;height:60px;}';
    html += '.fpd-ctrl-jump{bottom:12px;right:12px;width:70px;height:70px;font-size:1.3rem;font-family:var(--font-title);}';
    // Overlays
    html += '.fpd-flash{position:absolute;inset:0;background:rgba(255,0,0,0.35);z-index:35;pointer-events:none;animation:fpd-flash-out 0.5s ease-out forwards;}';
    html += '@keyframes fpd-flash-out{from{opacity:1;}to{opacity:0;}}';
    html += '.fpd-ouch{position:absolute;font-family:var(--font-title);font-size:2rem;color:#e74c3c;z-index:36;pointer-events:none;animation:fpd-ouch-float 1s ease-out forwards;text-shadow:0 2px 4px rgba(0,0,0,0.4);}';
    html += '@keyframes fpd-ouch-float{0%{opacity:1;transform:translateY(0) scale(1);}100%{opacity:0;transform:translateY(-60px) scale(1.5);}}';
    html += '.fpd-reset-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.55);z-index:40;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;animation:fpd-ov-in 0.3s ease;}';
    html += '@keyframes fpd-ov-in{from{opacity:0;}to{opacity:1;}}';
    html += '.fpd-reset-text{font-family:var(--font-title);font-size:clamp(1.5rem,5vw,2rem);color:white;text-shadow:0 2px 8px rgba(0,0,0,0.4);}';
    html += '.fpd-reset-sub{font-family:var(--font-body);font-weight:700;font-size:clamp(0.9rem,3vw,1.1rem);color:rgba(255,255,255,0.9);}';
    html += '</style>';

    html += '<div class="fpd-area" id="fpd-area">';
    html += '<canvas class="fpd-canvas" id="fpd-canvas"></canvas>';
    html += '<div class="fpd-score" id="fpd-score">0/' + totalCollectibles + ' ' + collectibleEmoji + '</div>';
    html += '<div class="fpd-speed" id="fpd-speed">60 km/h</div>';
    html += '<div class="fpd-hint" id="fpd-hint">' + L({
      es: 'Esquiva obstaculos y recoge estrellas!',
      en: 'Dodge obstacles and collect stars!',
      ca: 'Esquiva obstacles i recull estrelles!'
    }) + '</div>';
    // On-screen controls
    html += '<button class="fpd-ctrl fpd-ctrl-left" id="fpd-left">&larr;</button>';
    html += '<button class="fpd-ctrl fpd-ctrl-right" id="fpd-right">&rarr;</button>';
    html += '<button class="fpd-ctrl fpd-ctrl-jump" id="fpd-jump">JUMP</button>';
    html += '</div>';

    container.innerHTML = html;

    var area = document.getElementById('fpd-area');
    if (area) {
      areaWidth = area.offsetWidth;
      areaHeight = area.offsetHeight;
    }

    var canvas = document.getElementById('fpd-canvas');
    if (canvas) {
      canvas.width = areaWidth;
      canvas.height = areaHeight;
      canvas.style.width = areaWidth + 'px';
      canvas.style.height = areaHeight + 'px';
    }

    ROAD_VANISH_Y = areaHeight * 0.40;
    ROAD_BOTTOM_Y = areaHeight;
    var vanishX = areaWidth * 0.5;
    ROAD_LEFT_VANISH = vanishX - areaWidth * 0.03;
    ROAD_RIGHT_VANISH = vanishX + areaWidth * 0.03;
    ROAD_LEFT_BOTTOM = -areaWidth * 0.1;
    ROAD_RIGHT_BOTTOM = areaWidth * 1.1;

    // Hide hint after 3 seconds
    setTimeout(function () {
      var hint = document.getElementById('fpd-hint');
      if (hint && hint.parentNode) hint.parentNode.removeChild(hint);
    }, 3000);
  }

  function steerLeft() {
    if (isDead) return;
    if (playerLane > 0) {
      playerLane--;
      AudioManager.tap();
    }
  }

  function steerRight() {
    if (isDead) return;
    if (playerLane < 2) {
      playerLane++;
      AudioManager.tap();
    }
  }

  function doJump() {
    if (isJumping || isDead) return;
    isJumping = true;
    jumpTimer = 0;
    AudioManager.tap();
  }

  function bindEvents() {
    // On-screen buttons
    var leftBtn = document.getElementById('fpd-left');
    var rightBtn = document.getElementById('fpd-right');
    var jumpBtn = document.getElementById('fpd-jump');

    if (leftBtn) {
      leftBtn.addEventListener('touchstart', function (e) { e.preventDefault(); e.stopPropagation(); steerLeft(); }, { passive: false });
      leftBtn.addEventListener('mousedown', function (e) { e.preventDefault(); e.stopPropagation(); steerLeft(); });
    }
    if (rightBtn) {
      rightBtn.addEventListener('touchstart', function (e) { e.preventDefault(); e.stopPropagation(); steerRight(); }, { passive: false });
      rightBtn.addEventListener('mousedown', function (e) { e.preventDefault(); e.stopPropagation(); steerRight(); });
    }
    if (jumpBtn) {
      jumpBtn.addEventListener('touchstart', function (e) { e.preventDefault(); e.stopPropagation(); doJump(); }, { passive: false });
      jumpBtn.addEventListener('mousedown', function (e) { e.preventDefault(); e.stopPropagation(); doJump(); });
    }

    // Keyboard
    boundKeyDown = function (e) {
      if (isDead) return;
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        e.preventDefault(); steerLeft();
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        e.preventDefault(); steerRight();
      } else if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault(); doJump();
      }
    };
    boundKeyUp = function () {};

    document.addEventListener('keydown', boundKeyDown);
    document.addEventListener('keyup', boundKeyUp);
  }

  // --- Spawning ---
  function spawnObstacle() {
    var lane = Math.floor(Math.random() * LANE_COUNT);
    var types = ['barrel', 'cone', 'tire', 'barrier'];
    var type = types[Math.floor(Math.random() * types.length)];
    var jumpable = (type === 'barrier');

    obstacles.push({
      lane: lane,
      z: 1.0,
      type: type,
      jumpable: jumpable,
      active: true
    });
  }

  function spawnCollectible() {
    if (collected + countActiveCollectibles() >= totalCollectibles) return;
    // Avoid spawning on same lane as an upcoming obstacle
    var safeLanes = [0, 1, 2];
    for (var i = 0; i < obstacles.length; i++) {
      if (obstacles[i].z > 0.7) {
        var idx = safeLanes.indexOf(obstacles[i].lane);
        if (idx > -1 && safeLanes.length > 1) safeLanes.splice(idx, 1);
      }
    }
    var lane = safeLanes[Math.floor(Math.random() * safeLanes.length)];
    collectibles.push({
      lane: lane,
      z: 1.0,
      active: true
    });
  }

  function countActiveCollectibles() {
    var c = 0;
    for (var i = 0; i < collectibles.length; i++) {
      if (collectibles[i].active) c++;
    }
    return c;
  }

  // --- Perspective ---
  function projectZ(z) {
    // z: 0 = horizon (far), 1 = player (near)
    var curve = z * z;
    var screenY = ROAD_VANISH_Y + (ROAD_BOTTOM_Y - ROAD_VANISH_Y) * curve;
    return { y: screenY, scale: curve };
  }

  function getLaneX(lane, z) {
    var proj = projectZ(z);
    var t = proj.scale;
    var leftEdge = ROAD_LEFT_VANISH + (ROAD_LEFT_BOTTOM - ROAD_LEFT_VANISH) * t;
    var rightEdge = ROAD_RIGHT_VANISH + (ROAD_RIGHT_BOTTOM - ROAD_RIGHT_VANISH) * t;
    var roadWidth = rightEdge - leftEdge;
    var laneWidth = roadWidth / LANE_COUNT;
    return leftEdge + laneWidth * (lane + 0.5);
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

    // Z-speed: how fast objects approach (fraction of z per frame)
    var zSpeed = 0.012 * speed * dt;
    distance += zSpeed;

    // Truck bounce
    truckBounce += dt * 0.25;

    // Smooth lane transition
    lanePos += (playerLane - lanePos) * Math.min(1, 0.2 * dt * 4);

    // --- Spawn obstacles ---
    nextObstacleDist -= zSpeed;
    if (nextObstacleDist <= 0) {
      spawnObstacle();
      // Spawn more frequently as speed increases
      nextObstacleDist = 0.25 + Math.random() * 0.35;
    }

    // --- Spawn collectibles ---
    nextCollectibleDist -= zSpeed;
    if (nextCollectibleDist <= 0 && collected < totalCollectibles) {
      spawnCollectible();
      nextCollectibleDist = 0.18 + Math.random() * 0.25;
    }

    // --- Jump timer ---
    if (isJumping) {
      jumpTimer += dt * 0.035;
      if (jumpTimer >= jumpDuration) {
        isJumping = false;
        jumpTimer = 0;
      }
    }

    // --- Move & collide obstacles ---
    var HIT_Z_MIN = 0.02;
    var HIT_Z_MAX = 0.18;

    for (var i = obstacles.length - 1; i >= 0; i--) {
      var obs = obstacles[i];
      obs.z -= zSpeed;

      if (obs.active && obs.z < HIT_Z_MAX && obs.z > -HIT_Z_MIN) {
        if (obs.lane === playerLane) {
          if (obs.jumpable && isJumping) {
            obs.active = false; // cleared it
          } else {
            triggerDeath();
            rafId = requestAnimationFrame(gameLoop);
            return;
          }
        }
      }
      if (obs.z < -0.15) {
        obstacles.splice(i, 1);
      }
    }

    // --- Move & collide collectibles ---
    for (var j = collectibles.length - 1; j >= 0; j--) {
      var col = collectibles[j];
      col.z -= zSpeed;

      if (col.active && col.z < HIT_Z_MAX && col.z > -HIT_Z_MIN) {
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
      if (col.z < -0.15) {
        collectibles.splice(j, 1);
      }
    }

    renderFrame();
    rafId = requestAnimationFrame(gameLoop);
  }

  // --- Rendering ---
  function renderFrame() {
    var canvas = document.getElementById('fpd-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var w = areaWidth;
    var h = areaHeight;

    ctx.clearRect(0, 0, w, h);

    // Sky
    var skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.42);
    skyGrad.addColorStop(0, '#4a90d9');
    skyGrad.addColorStop(0.7, '#87CEEB');
    skyGrad.addColorStop(1, '#b8e4f9');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.44);

    // Sun
    ctx.fillStyle = '#FFD93D';
    ctx.beginPath(); ctx.arc(w * 0.82, h * 0.1, 18, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,217,61,0.25)';
    ctx.beginPath(); ctx.arc(w * 0.82, h * 0.1, 28, 0, Math.PI * 2); ctx.fill();

    // Clouds
    drawCloud(ctx, w * 0.12, h * 0.07, 38);
    drawCloud(ctx, w * 0.42, h * 0.13, 32);
    drawCloud(ctx, w * 0.72, h * 0.05, 28);

    // Hills
    ctx.fillStyle = '#a0896c';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.40);
    ctx.lineTo(w * 0.12, h * 0.33);
    ctx.lineTo(w * 0.25, h * 0.37);
    ctx.lineTo(w * 0.4, h * 0.29);
    ctx.lineTo(w * 0.55, h * 0.35);
    ctx.lineTo(w * 0.7, h * 0.31);
    ctx.lineTo(w * 0.85, h * 0.36);
    ctx.lineTo(w, h * 0.34);
    ctx.lineTo(w, h * 0.42);
    ctx.lineTo(0, h * 0.42);
    ctx.closePath();
    ctx.fill();

    // Dirt ground
    var dirtGrad = ctx.createLinearGradient(0, h * 0.40, 0, h);
    dirtGrad.addColorStop(0, '#c4a56a');
    dirtGrad.addColorStop(0.3, '#a0896c');
    dirtGrad.addColorStop(1, '#8B7355');
    ctx.fillStyle = dirtGrad;
    ctx.fillRect(0, h * 0.40, w, h * 0.6);

    // Road
    drawRoad(ctx, w, h);

    // Entities sorted far-to-near
    var allEnts = [];
    for (var oi = 0; oi < obstacles.length; oi++) {
      if (obstacles[oi].z > -0.1 && obstacles[oi].z < 1.05)
        allEnts.push({ kind: 'obs', d: obstacles[oi] });
    }
    for (var ci = 0; ci < collectibles.length; ci++) {
      if (collectibles[ci].active && collectibles[ci].z > -0.1 && collectibles[ci].z < 1.05)
        allEnts.push({ kind: 'col', d: collectibles[ci] });
    }
    allEnts.sort(function (a, b) { return b.d.z - a.d.z; });
    for (var ei = 0; ei < allEnts.length; ei++) {
      if (allEnts[ei].kind === 'obs') drawObstacle(ctx, allEnts[ei].d);
      else drawCollectible(ctx, allEnts[ei].d);
    }

    // Player truck view & dashboard
    drawPlayerView(ctx, w, h);
    drawDashboard(ctx, w, h);

    // HUD speed
    var kmh = Math.round(60 + speed * 18);
    var spEl = document.getElementById('fpd-speed');
    if (spEl) spEl.textContent = kmh + ' km/h';
  }

  function drawCloud(ctx, x, y, s) {
    ctx.fillStyle = 'rgba(255,255,255,0.65)';
    ctx.beginPath();
    ctx.arc(x, y, s * 0.38, 0, Math.PI * 2);
    ctx.arc(x + s * 0.28, y - s * 0.12, s * 0.32, 0, Math.PI * 2);
    ctx.arc(x + s * 0.52, y, s * 0.28, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawRoad(ctx, w, h) {
    var steps = 50;
    for (var i = 0; i < steps; i++) {
      var z1 = i / steps;
      var z2 = (i + 1) / steps;
      var p1 = projectZ(z1);
      var p2 = projectZ(z2);
      var t1 = p1.scale, t2 = p2.scale;

      var l1 = ROAD_LEFT_VANISH + (ROAD_LEFT_BOTTOM - ROAD_LEFT_VANISH) * t1;
      var r1 = ROAD_RIGHT_VANISH + (ROAD_RIGHT_BOTTOM - ROAD_RIGHT_VANISH) * t1;
      var l2 = ROAD_LEFT_VANISH + (ROAD_LEFT_BOTTOM - ROAD_LEFT_VANISH) * t2;
      var r2 = ROAD_RIGHT_VANISH + (ROAD_RIGHT_BOTTOM - ROAD_RIGHT_VANISH) * t2;

      // Road stripes that scroll
      var stripe = Math.floor(((1 - z1) * 30 + distance * 25) % 2);
      ctx.fillStyle = stripe === 0 ? '#636e72' : '#555a5e';
      ctx.beginPath();
      ctx.moveTo(l1, p1.y); ctx.lineTo(r1, p1.y);
      ctx.lineTo(r2, p2.y); ctx.lineTo(l2, p2.y);
      ctx.closePath();
      ctx.fill();

      // Lane dividers
      if (stripe === 0 && t1 > 0.015) {
        ctx.strokeStyle = '#FFD93D';
        ctx.lineWidth = Math.max(1, t1 * 4);
        for (var ln = 1; ln < LANE_COUNT; ln++) {
          var lx1 = l1 + (r1 - l1) * (ln / LANE_COUNT);
          var lx2 = l2 + (r2 - l2) * (ln / LANE_COUNT);
          ctx.beginPath(); ctx.moveTo(lx1, p1.y); ctx.lineTo(lx2, p2.y); ctx.stroke();
        }
      }

      // Road edges
      if (t1 > 0.01) {
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = Math.max(1, t1 * 3);
        ctx.beginPath(); ctx.moveTo(l1, p1.y); ctx.lineTo(l2, p2.y); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(r1, p1.y); ctx.lineTo(r2, p2.y); ctx.stroke();
      }
    }
  }

  function drawObstacle(ctx, obs) {
    var zScreen = 1.0 - obs.z; // 0=far, 1=near
    var proj = projectZ(zScreen);
    var x = getLaneX(obs.lane, zScreen);
    var y = proj.y;
    var sc = proj.scale;
    if (sc < 0.008) return;

    var sz = 50 * sc;
    if (sz < 2) return;

    ctx.save();
    ctx.translate(x, y);

    switch (obs.type) {
      case 'barrel':
        ctx.fillStyle = '#2d3436';
        roundRect(ctx, -sz * 0.4, -sz * 1.3, sz * 0.8, sz * 1.1, sz * 0.08);
        ctx.fill();
        ctx.fillStyle = '#636e72';
        ctx.fillRect(-sz * 0.33, -sz * 1.15, sz * 0.66, sz * 0.85);
        ctx.fillStyle = '#fdcb6e';
        ctx.fillRect(-sz * 0.2, -sz * 0.9, sz * 0.4, sz * 0.35);
        ctx.fillStyle = '#2d3436';
        ctx.fillRect(-sz * 0.4, -sz * 0.7, sz * 0.8, sz * 0.06);
        break;
      case 'cone':
        ctx.fillStyle = '#e17055';
        ctx.beginPath();
        ctx.moveTo(0, -sz * 1.2);
        ctx.lineTo(-sz * 0.35, 0);
        ctx.lineTo(sz * 0.35, 0);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillRect(-sz * 0.2, -sz * 0.7, sz * 0.4, sz * 0.1);
        ctx.fillRect(-sz * 0.27, -sz * 0.4, sz * 0.54, sz * 0.1);
        ctx.fillStyle = '#d63031';
        roundRect(ctx, -sz * 0.4, -sz * 0.08, sz * 0.8, sz * 0.08, 2);
        ctx.fill();
        break;
      case 'tire':
        ctx.fillStyle = '#2d3436';
        ctx.beginPath(); ctx.arc(0, -sz * 0.55, sz * 0.55, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#636e72';
        ctx.beginPath(); ctx.arc(0, -sz * 0.55, sz * 0.38, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#2d3436';
        ctx.beginPath(); ctx.arc(0, -sz * 0.55, sz * 0.18, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#b2bec3';
        ctx.beginPath(); ctx.arc(0, -sz * 0.55, sz * 0.08, 0, Math.PI * 2); ctx.fill();
        break;
      case 'barrier':
        // Ramp/barrier (jumpable!)
        ctx.fillStyle = '#b2bec3';
        roundRect(ctx, -sz * 0.7, -sz * 0.45, sz * 1.4, sz * 0.45, 3);
        ctx.fill();
        ctx.fillStyle = '#dfe6e9';
        ctx.fillRect(-sz * 0.7, -sz * 0.45, sz * 1.4, sz * 0.12);
        // Red-white warning stripes
        for (var si = 0; si < 4; si++) {
          ctx.fillStyle = si % 2 === 0 ? '#e74c3c' : '#fff';
          ctx.fillRect(-sz * 0.7 + si * sz * 0.35, -sz * 0.33, sz * 0.35, sz * 0.1);
        }
        // "JUMP" label when close enough
        if (sz > 12) {
          ctx.fillStyle = '#e74c3c';
          ctx.font = 'bold ' + Math.max(7, sz * 0.22) + 'px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('JUMP!', 0, -sz * 0.08);
        }
        break;
    }
    ctx.restore();
  }

  function drawCollectible(ctx, col) {
    if (!col.active) return;
    var zScreen = 1.0 - col.z;
    var proj = projectZ(zScreen);
    var x = getLaneX(col.lane, zScreen);
    var y = proj.y;
    var sc = proj.scale;
    if (sc < 0.01) return;

    var sz = 30 * sc;
    if (sz < 2) return;

    var floatY = Math.sin(distance * 20 + col.z * 8) * sz * 0.4;

    ctx.save();
    ctx.translate(x, y - sz * 2 + floatY);

    // Glow
    ctx.fillStyle = 'rgba(255,217,61,0.35)';
    ctx.beginPath(); ctx.arc(0, 0, sz * 1.5, 0, Math.PI * 2); ctx.fill();

    // Star
    ctx.fillStyle = '#FFD93D';
    ctx.strokeStyle = '#e67e22';
    ctx.lineWidth = Math.max(1, sz * 0.12);
    drawStar(ctx, 0, 0, 5, sz, sz * 0.45);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  function drawStar(ctx, cx, cy, spikes, outerR, innerR) {
    var rot = -Math.PI / 2;
    var step = Math.PI / spikes;
    ctx.beginPath();
    for (var i = 0; i < spikes; i++) {
      ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
      rot += step;
      ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
      rot += step;
    }
    ctx.closePath();
  }

  function drawPlayerView(ctx, w, h) {
    var jumpOff = 0;
    if (isJumping) {
      var jp = jumpTimer / jumpDuration;
      jumpOff = Math.sin(jp * Math.PI) * 40;
    }

    var bounce = Math.sin(truckBounce) * 1.5;
    var hoodY = h * 0.70 - jumpOff;
    var hoodH = h * 0.14;

    // Hood shadow
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fillRect(w * 0.12, hoodY + bounce + 4, w * 0.76, hoodH);

    // Hood
    var hg = ctx.createLinearGradient(0, hoodY, 0, hoodY + hoodH);
    hg.addColorStop(0, '#e74c3c');
    hg.addColorStop(0.5, '#c0392b');
    hg.addColorStop(1, '#a93226');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.moveTo(w * 0.15, hoodY + hoodH + bounce);
    ctx.lineTo(w * 0.20, hoodY + bounce);
    ctx.lineTo(w * 0.80, hoodY + bounce);
    ctx.lineTo(w * 0.85, hoodY + hoodH + bounce);
    ctx.closePath();
    ctx.fill();

    // Hood scoop
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.moveTo(w * 0.38, hoodY + hoodH * 0.25 + bounce);
    ctx.lineTo(w * 0.40, hoodY - hoodH * 0.08 + bounce);
    ctx.lineTo(w * 0.60, hoodY - hoodH * 0.08 + bounce);
    ctx.lineTo(w * 0.62, hoodY + hoodH * 0.25 + bounce);
    ctx.closePath();
    ctx.fill();

    // Center line
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w * 0.5, hoodY + bounce);
    ctx.lineTo(w * 0.5, hoodY + hoodH + bounce);
    ctx.stroke();

    // Flame decals
    drawFlame(ctx, w * 0.22, hoodY + hoodH * 0.5 + bounce, hoodH * 0.4, 1);
    drawFlame(ctx, w * 0.78, hoodY + hoodH * 0.5 + bounce, hoodH * 0.4, -1);

    // Side mirrors
    ctx.fillStyle = '#2d3436';
    ctx.fillRect(w * 0.05, hoodY - hoodH * 0.35 + bounce, w * 0.07, hoodH * 0.55);
    ctx.fillRect(w * 0.88, hoodY - hoodH * 0.35 + bounce, w * 0.07, hoodH * 0.55);
    ctx.fillStyle = '#a8d8ea';
    ctx.fillRect(w * 0.055, hoodY - hoodH * 0.25 + bounce, w * 0.055, hoodH * 0.35);
    ctx.fillRect(w * 0.885, hoodY - hoodH * 0.25 + bounce, w * 0.055, hoodH * 0.35);

    // Lane position indicator on road (green chevron)
    var indicZ = 0.82;
    var indX = getLaneX(lanePos, indicZ);
    var indP = projectZ(indicZ);
    var indY = indP.y;
    var indSc = indP.scale;
    ctx.fillStyle = 'rgba(46,204,113,0.45)';
    ctx.beginPath();
    var aw = 18 * indSc;
    ctx.moveTo(indX, indY - 14 * indSc);
    ctx.lineTo(indX - aw, indY + 8 * indSc);
    ctx.lineTo(indX + aw, indY + 8 * indSc);
    ctx.closePath();
    ctx.fill();
  }

  function drawFlame(ctx, x, y, size, dir) {
    ctx.fillStyle = 'rgba(255,165,0,0.6)';
    ctx.beginPath();
    ctx.moveTo(x, y + size * 0.5);
    ctx.quadraticCurveTo(x + dir * size * 0.3, y, x + dir * size * 0.1, y - size * 0.5);
    ctx.quadraticCurveTo(x + dir * size * 0.4, y - size * 0.2, x + dir * size * 0.2, y + size * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(255,69,0,0.4)';
    ctx.beginPath();
    ctx.moveTo(x + dir * size * 0.05, y + size * 0.4);
    ctx.quadraticCurveTo(x + dir * size * 0.35, y + size * 0.1, x + dir * size * 0.15, y - size * 0.3);
    ctx.quadraticCurveTo(x + dir * size * 0.45, y, x + dir * size * 0.25, y + size * 0.4);
    ctx.closePath();
    ctx.fill();
  }

  function drawDashboard(ctx, w, h) {
    var dashH = h * 0.20;
    var dashY = h - dashH;

    var dg = ctx.createLinearGradient(0, dashY, 0, h);
    dg.addColorStop(0, '#3d3d3d');
    dg.addColorStop(0.15, '#2d3436');
    dg.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = dg;
    ctx.fillRect(0, dashY, w, dashH);
    ctx.fillStyle = '#555';
    ctx.fillRect(0, dashY, w, 2);

    // Steering wheel
    var cx = w * 0.5;
    var cy = dashY + dashH * 0.58;
    var wr = Math.min(dashH * 0.40, w * 0.11);
    var tilt = (lanePos - 1) * 28;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(tilt * Math.PI / 180);

    // Outer ring
    ctx.strokeStyle = '#444';
    ctx.lineWidth = wr * 0.24;
    ctx.beginPath(); ctx.arc(0, 0, wr, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#5a5a5a';
    ctx.lineWidth = wr * 0.15;
    ctx.beginPath(); ctx.arc(0, 0, wr, 0, Math.PI * 2); ctx.stroke();

    // Center hub
    ctx.fillStyle = '#333';
    ctx.beginPath(); ctx.arc(0, 0, wr * 0.28, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#555'; ctx.lineWidth = 1; ctx.stroke();

    // Spokes
    ctx.strokeStyle = '#555'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(0, -wr); ctx.lineTo(0, -wr * 0.28); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-wr, 0); ctx.lineTo(-wr * 0.28, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(wr, 0); ctx.lineTo(wr * 0.28, 0); ctx.stroke();

    ctx.restore();

    // Speedometer (left gauge)
    var gx = w * 0.17;
    var gy = dashY + dashH * 0.55;
    var gr = dashH * 0.30;

    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(gx, gy, gr, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#444'; ctx.lineWidth = 2; ctx.stroke();

    // Tick marks
    for (var ti = 0; ti <= 8; ti++) {
      var ta = -Math.PI * 0.75 + (ti / 8) * Math.PI * 1.5;
      var x1 = gx + Math.cos(ta) * gr * 0.75;
      var y1 = gy + Math.sin(ta) * gr * 0.75;
      var x2 = gx + Math.cos(ta) * gr * 0.9;
      var y2 = gy + Math.sin(ta) * gr * 0.9;
      ctx.strokeStyle = ti > 5 ? '#e74c3c' : '#888';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    }

    // Needle
    var speedPct = Math.min(1, (speed - baseSpeed) / Math.max(1, maxSpeed - baseSpeed));
    var na = -Math.PI * 0.75 + speedPct * Math.PI * 1.5;
    ctx.strokeStyle = '#e74c3c'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(gx, gy);
    ctx.lineTo(gx + Math.cos(na) * gr * 0.7, gy + Math.sin(na) * gr * 0.7);
    ctx.stroke();
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath(); ctx.arc(gx, gy, 3, 0, Math.PI * 2); ctx.fill();

    var kmh = Math.round(60 + speed * 18);
    ctx.fillStyle = '#e74c3c';
    ctx.font = 'bold ' + Math.max(7, gr * 0.38) + 'px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(kmh, gx, gy + gr * 0.6);

    // Star counter (right gauge)
    var tx = w * 0.83;
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(tx, gy, gr, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#444'; ctx.lineWidth = 2; ctx.stroke();

    // Star fill arc
    var starPct = collected / Math.max(1, totalCollectibles);
    ctx.strokeStyle = '#2ecc71'; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(tx, gy, gr * 0.75, -Math.PI * 0.5, -Math.PI * 0.5 + starPct * Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#2ecc71';
    ctx.font = 'bold ' + Math.max(7, gr * 0.38) + 'px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(collected + '/' + totalCollectibles, tx, gy + gr * 0.15);

    // Hands
    var hs = wr * 0.30;
    ctx.fillStyle = '#e8b88a';
    ctx.beginPath(); ctx.arc(cx - wr * 0.85, cy + wr * 0.15, hs, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#c9956a'; ctx.lineWidth = 1; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx + wr * 0.85, cy + wr * 0.15, hs, 0, Math.PI * 2); ctx.fill();
    ctx.stroke();
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

    var area = document.getElementById('fpd-area');
    if (area) {
      var flash = document.createElement('div');
      flash.className = 'fpd-flash';
      area.appendChild(flash);
      setTimeout(function () { if (flash.parentNode) flash.parentNode.removeChild(flash); }, 600);

      var ouch = document.createElement('div');
      ouch.className = 'fpd-ouch';
      ouch.textContent = t('oops');
      ouch.style.left = (areaWidth * 0.38) + 'px';
      ouch.style.top = (areaHeight * 0.30) + 'px';
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
      doReset();
    };
    overlay.addEventListener('touchstart', restartHandler, { passive: false });
    overlay.addEventListener('click', restartHandler);
  }

  function doReset() {
    var area = document.getElementById('fpd-area');
    if (area) {
      var els = area.querySelectorAll('.fpd-ouch,.fpd-flash,.fpd-reset-overlay');
      for (var i = 0; i < els.length; i++) {
        if (els[i].parentNode) els[i].parentNode.removeChild(els[i]);
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
    nextObstacleDist = 2.0;
    nextCollectibleDist = 1.0;
    playerLane = 1;
    lanePos = 1;
    updateScore();
    updateProgress();
    lastTime = performance.now();
  }

  function updateScore() {
    var el = document.getElementById('fpd-score');
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

    obstacles = [];
    collectibles = [];
    if (container) container.innerHTML = '';
  }

  return { start: start, destroy: destroy };
})();
