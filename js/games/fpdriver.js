/* ===== First-Person Monster Truck Driver ===== */
window.FPDriverGame = (function () {
  var container, callback;
  var rafId, destroyed;
  var lastTime, areaWidth, areaHeight;
  var boundKeyDown, boundKeyUp;

  // Player state
  var playerLane; // 0=left, 1=center, 2=right
  var lanePos; // smooth 0-2 float for rendering
  var isJumping, jumpTimer, jumpDuration;
  var collected, totalCollectibles;
  var isDead, deathTimer;
  var speed, distance;
  var truckBounce;
  var graceTimer; // invincibility frames at start

  // Road & obstacles
  var obstacles, collectibles;
  var spawnTimer, collectibleTimer;
  var LANE_COUNT = 3;

  // Pseudo-3D road parameters
  var ROAD_VANISH_Y;
  var ROAD_BOTTOM_Y;
  var ROAD_LEFT_VANISH, ROAD_RIGHT_VANISH;
  var ROAD_LEFT_BOTTOM, ROAD_RIGHT_BOTTOM;

  // Config
  var collectibleEmoji, speedRamp;
  var baseSpeed, maxSpeed;

  // Steering wheel drag state
  var steerDragging = false;
  var steerStartX = 0;
  var steerAngle = 0; // -1 to 1
  var boundSteerDown, boundSteerMove, boundSteerUp;

  // Timing constants
  var OBSTACLE_INTERVAL = 2.0; // seconds between obstacles (was 1.8)
  var COLLECTIBLE_INTERVAL = 1.2; // seconds between collectibles
  var GRACE_PERIOD = 2.5; // seconds of invincibility at start
  var Z_SPEED_BASE = 0.32; // z units per second at base speed (was 0.45)
  var HIT_Z = 0.12; // z threshold for collision (how close to player)

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
    lanePos = 1;
    isJumping = false;
    jumpTimer = 0;
    jumpDuration = 0.65;
    collected = 0;
    isDead = false;
    speed = baseSpeed;
    distance = 0;
    truckBounce = 0;
    graceTimer = GRACE_PERIOD;
    obstacles = [];
    collectibles = [];
    spawnTimer = OBSTACLE_INTERVAL * 0.7; // first obstacle after ~1.3s
    collectibleTimer = 0.5; // first star quickly
  }

  function render() {
    var html = '<style>';
    html += '.fpd-area{position:relative;width:100%;height:100%;min-height:280px;overflow:hidden;border-radius:var(--radius-medium);touch-action:none;-webkit-user-select:none;user-select:none;cursor:pointer;background:#333;}';
    html += '.fpd-canvas{display:block;}';
    html += '.fpd-score{position:absolute;top:8px;right:10px;font-family:var(--font-title);font-size:clamp(0.9rem,2.8vw,1.2rem);color:var(--color-text);z-index:30;background:rgba(255,255,255,0.88);padding:3px 10px;border-radius:var(--radius-small);box-shadow:var(--shadow-soft);}';
    html += '.fpd-speed{position:absolute;top:8px;left:10px;font-family:var(--font-title);font-size:clamp(0.75rem,2.2vw,0.95rem);color:var(--color-text);z-index:30;background:rgba(255,255,255,0.88);padding:3px 10px;border-radius:var(--radius-small);}';
    html += '.fpd-hint{position:absolute;top:40%;left:50%;transform:translate(-50%,-50%);font-family:var(--font-body);font-weight:700;font-size:clamp(0.85rem,2.8vw,1.05rem);color:#fff;z-index:30;white-space:nowrap;background:rgba(0,0,0,0.6);padding:6px 14px;border-radius:var(--radius-small);pointer-events:none;transition:opacity 0.5s;}';
    // Steering wheel touch zone — covers the dashboard area
    html += '.fpd-steer-zone{position:absolute;bottom:0;left:0;right:0;height:22%;z-index:25;touch-action:none;-webkit-user-select:none;user-select:none;cursor:grab;}';
    html += '.fpd-steer-zone:active{cursor:grabbing;}';
    html += '.fpd-steer-hint{position:absolute;bottom:2%;left:50%;transform:translateX(-50%);font-family:var(--font-body);font-size:clamp(0.6rem,1.8vw,0.75rem);color:rgba(255,255,255,0.5);z-index:26;pointer-events:none;transition:opacity 0.5s;}';
    // Jump button on the right
    html += '.fpd-ctrl-jump{position:absolute;bottom:22%;right:10px;z-index:26;pointer-events:auto;border:none;outline:none;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;-webkit-user-select:none;user-select:none;touch-action:none;opacity:0.65;transition:opacity 0.15s,transform 0.1s;width:56px;height:56px;font-size:0.75rem;font-family:var(--font-title);font-weight:800;background:rgba(46,204,113,0.35);border:2px solid rgba(46,204,113,0.5);}';
    html += '.fpd-ctrl-jump:active{opacity:1;transform:scale(1.1);}';
    // Overlays
    html += '.fpd-flash{position:absolute;inset:0;background:rgba(255,0,0,0.3);z-index:35;pointer-events:none;animation:fpd-flash-out 0.5s ease-out forwards;}';
    html += '@keyframes fpd-flash-out{from{opacity:1;}to{opacity:0;}}';
    html += '.fpd-ouch{position:absolute;left:50%;top:30%;transform:translateX(-50%);font-family:var(--font-title);font-size:2rem;color:#e74c3c;z-index:36;pointer-events:none;animation:fpd-ouch-float 1s ease-out forwards;text-shadow:0 2px 6px rgba(0,0,0,0.4);}';
    html += '@keyframes fpd-ouch-float{0%{opacity:1;transform:translateX(-50%) translateY(0) scale(1);}100%{opacity:0;transform:translateX(-50%) translateY(-50px) scale(1.4);}}';
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
    // Steering wheel touch zone (drag left/right on dashboard to steer)
    html += '<div class="fpd-steer-zone" id="fpd-steer-zone"></div>';
    html += '<div class="fpd-steer-hint" id="fpd-steer-hint">' + L({
      es: 'Arrastra el volante para girar',
      en: 'Drag steering wheel to turn',
      ca: 'Arrossega el volant per girar'
    }) + '</div>';
    html += '<button class="fpd-ctrl-jump" id="fpd-jump" aria-label="Jump">JUMP</button>';
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

    // Road perspective — wider road that fills more of the screen
    ROAD_VANISH_Y = areaHeight * 0.38;
    ROAD_BOTTOM_Y = areaHeight;
    var vanishX = areaWidth * 0.5;
    ROAD_LEFT_VANISH = vanishX - areaWidth * 0.04;
    ROAD_RIGHT_VANISH = vanishX + areaWidth * 0.04;
    ROAD_LEFT_BOTTOM = -areaWidth * 0.25;
    ROAD_RIGHT_BOTTOM = areaWidth * 1.25;

    // Fade hint after 2.5s
    setTimeout(function () {
      var hint = document.getElementById('fpd-hint');
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
    var jumpBtn = document.getElementById('fpd-jump');
    var steerZone = document.getElementById('fpd-steer-zone');

    // Jump button
    if (jumpBtn) {
      jumpBtn.addEventListener('touchstart', function (e) { e.preventDefault(); e.stopPropagation(); doJump(); }, { passive: false });
      jumpBtn.addEventListener('mousedown', function (e) { e.preventDefault(); e.stopPropagation(); doJump(); });
    }

    // Steering wheel drag — drag left/right on the dashboard to change lanes
    var DRAG_THRESHOLD = 35; // pixels to trigger a lane change
    var lastLaneTriggered = 1; // track which lane was last triggered

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

      // Trigger lane changes based on drag distance
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
        steerStartX = x; // reset origin for continued drag
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

    // Keyboard still works
    boundKeyDown = function (e) {
      if (isDead) return;
      if (e.key === 'ArrowLeft' || e.key === 'a') { e.preventDefault(); steerLeft(); }
      else if (e.key === 'ArrowRight' || e.key === 'd') { e.preventDefault(); steerRight(); }
      else if (e.key === ' ' || e.key === 'ArrowUp') { e.preventDefault(); doJump(); }
    };
    boundKeyUp = function () {};
    document.addEventListener('keydown', boundKeyDown);
    document.addEventListener('keyup', boundKeyUp);

    // Fade steer hint after 3s
    setTimeout(function () {
      var hint = document.getElementById('fpd-steer-hint');
      if (hint) {
        hint.style.opacity = '0';
        setTimeout(function () { if (hint.parentNode) hint.parentNode.removeChild(hint); }, 600);
      }
    }, 3000);
  }

  // --- Spawning ---
  function spawnObstacle() {
    // During grace period, never spawn in player's lane
    var lane;
    if (graceTimer > 0) {
      var safeLanes = [0, 1, 2];
      safeLanes.splice(safeLanes.indexOf(playerLane), 1);
      lane = safeLanes[Math.floor(Math.random() * safeLanes.length)];
    } else {
      lane = Math.floor(Math.random() * LANE_COUNT);
    }
    var types = ['barrel', 'cone', 'tire', 'barrier'];
    var type = types[Math.floor(Math.random() * types.length)];

    obstacles.push({
      lane: lane,
      z: 1.0, // far away
      type: type,
      jumpable: (type === 'barrier'),
      active: true
    });
  }

  function spawnCollectible() {
    if (collected + countActiveCollectibles() >= totalCollectibles) return;
    // Prefer lanes without obstacles
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

  // --- Perspective ---
  function projectZ(z) {
    // z: 0=horizon(far), 1=player(near)
    var curve = z * z;
    return { y: ROAD_VANISH_Y + (ROAD_BOTTOM_Y - ROAD_VANISH_Y) * curve, scale: curve };
  }

  function getLaneX(lane, z) {
    var t = projectZ(z).scale;
    var le = ROAD_LEFT_VANISH + (ROAD_LEFT_BOTTOM - ROAD_LEFT_VANISH) * t;
    var re = ROAD_RIGHT_VANISH + (ROAD_RIGHT_BOTTOM - ROAD_RIGHT_VANISH) * t;
    var lw = (re - le) / LANE_COUNT;
    return le + lw * (lane + 0.5);
  }

  // --- Main Loop ---
  function gameLoop(timestamp) {
    if (destroyed) return;
    var rawDt = (timestamp - lastTime) / 1000; // seconds
    var dt = Math.min(rawDt, 0.1); // cap at 100ms
    lastTime = timestamp;

    if (isDead) { rafId = requestAnimationFrame(gameLoop); return; }

    // Speed ramping
    if (speedRamp && totalCollectibles > 0) {
      speed = baseSpeed + (maxSpeed - baseSpeed) * (collected / totalCollectibles);
    }

    // Grace period countdown
    if (graceTimer > 0) graceTimer -= dt;

    var speedFactor = speed / baseSpeed;
    var zPerSec = Z_SPEED_BASE * speedFactor;
    var zStep = zPerSec * dt;
    distance += zStep;

    truckBounce += dt * 4;

    // Smooth lane transition
    lanePos += (playerLane - lanePos) * Math.min(1, dt * 12);

    // Spawn obstacles on timer
    spawnTimer -= dt;
    if (spawnTimer <= 0) {
      spawnObstacle();
      // Interval gets slightly shorter as speed increases
      spawnTimer = OBSTACLE_INTERVAL / Math.sqrt(speedFactor) + Math.random() * 0.6;
    }

    // Spawn collectibles on timer
    collectibleTimer -= dt;
    if (collectibleTimer <= 0 && collected < totalCollectibles) {
      spawnCollectible();
      collectibleTimer = COLLECTIBLE_INTERVAL + Math.random() * 0.5;
    }

    // Jump
    if (isJumping) {
      jumpTimer += dt;
      if (jumpTimer >= jumpDuration) { isJumping = false; jumpTimer = 0; }
    }

    // Move obstacles
    for (var i = obstacles.length - 1; i >= 0; i--) {
      var obs = obstacles[i];
      obs.z -= zStep;

      // Collision — only when obstacle is close to player
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

    renderFrame();
    rafId = requestAnimationFrame(gameLoop);
  }

  // --- Rendering ---
  function renderFrame() {
    var canvas = document.getElementById('fpd-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var w = areaWidth, h = areaHeight;

    ctx.clearRect(0, 0, w, h);

    // Sky
    var sg = ctx.createLinearGradient(0, 0, 0, h * 0.40);
    sg.addColorStop(0, '#4a90d9');
    sg.addColorStop(0.7, '#87CEEB');
    sg.addColorStop(1, '#b8e4f9');
    ctx.fillStyle = sg;
    ctx.fillRect(0, 0, w, h * 0.42);

    // Sun
    ctx.fillStyle = '#FFD93D';
    ctx.beginPath(); ctx.arc(w * 0.83, h * 0.09, 16, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,217,61,0.2)';
    ctx.beginPath(); ctx.arc(w * 0.83, h * 0.09, 26, 0, Math.PI * 2); ctx.fill();

    // Clouds (scroll slowly)
    var cx1 = ((w * 0.15 + distance * 3) % (w * 1.3)) - w * 0.15;
    var cx2 = ((w * 0.5 + distance * 2) % (w * 1.3)) - w * 0.15;
    var cx3 = ((w * 0.8 + distance * 1.5) % (w * 1.3)) - w * 0.15;
    drawCloud(ctx, cx1, h * 0.06, 35);
    drawCloud(ctx, cx2, h * 0.12, 28);
    drawCloud(ctx, cx3, h * 0.04, 24);

    // Hills
    ctx.fillStyle = '#a0896c';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.38);
    ctx.lineTo(w * 0.12, h * 0.32);
    ctx.lineTo(w * 0.25, h * 0.36);
    ctx.lineTo(w * 0.4, h * 0.28);
    ctx.lineTo(w * 0.55, h * 0.34);
    ctx.lineTo(w * 0.7, h * 0.30);
    ctx.lineTo(w * 0.85, h * 0.35);
    ctx.lineTo(w, h * 0.32);
    ctx.lineTo(w, h * 0.40);
    ctx.lineTo(0, h * 0.40);
    ctx.closePath();
    ctx.fill();

    // Dirt
    var dg = ctx.createLinearGradient(0, h * 0.38, 0, h);
    dg.addColorStop(0, '#c4a56a');
    dg.addColorStop(0.3, '#a0896c');
    dg.addColorStop(1, '#8B7355');
    ctx.fillStyle = dg;
    ctx.fillRect(0, h * 0.38, w, h * 0.62);

    // Road
    drawRoad(ctx, w, h);

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

    // Truck hood + dashboard
    drawPlayerView(ctx, w, h);
    drawDashboard(ctx, w, h);

    // Grace period indicator
    if (graceTimer > 0) {
      ctx.fillStyle = 'rgba(46,204,113,0.15)';
      ctx.fillRect(0, 0, w * (graceTimer / GRACE_PERIOD), 4);
    }

    // Speed HUD
    var kmh = Math.round(60 + (speed - baseSpeed) * 25);
    var spEl = document.getElementById('fpd-speed');
    if (spEl) spEl.textContent = kmh + ' km/h';
  }

  function drawCloud(ctx, x, y, s) {
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.beginPath();
    ctx.arc(x, y, s * 0.36, 0, Math.PI * 2);
    ctx.arc(x + s * 0.26, y - s * 0.1, s * 0.3, 0, Math.PI * 2);
    ctx.arc(x + s * 0.48, y, s * 0.26, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawRoad(ctx, w, h) {
    var steps = 45;
    for (var i = 0; i < steps; i++) {
      var z1 = i / steps, z2 = (i + 1) / steps;
      var p1 = projectZ(z1), p2 = projectZ(z2);
      var t1 = p1.scale, t2 = p2.scale;

      var l1 = ROAD_LEFT_VANISH + (ROAD_LEFT_BOTTOM - ROAD_LEFT_VANISH) * t1;
      var r1 = ROAD_RIGHT_VANISH + (ROAD_RIGHT_BOTTOM - ROAD_RIGHT_VANISH) * t1;
      var l2 = ROAD_LEFT_VANISH + (ROAD_LEFT_BOTTOM - ROAD_LEFT_VANISH) * t2;
      var r2 = ROAD_RIGHT_VANISH + (ROAD_RIGHT_BOTTOM - ROAD_RIGHT_VANISH) * t2;

      // Scrolling stripes
      var stripe = Math.floor(((1 - z1) * 25 + distance * 15) % 2);
      ctx.fillStyle = stripe ? '#555a5e' : '#636e72';
      ctx.beginPath();
      ctx.moveTo(l1, p1.y); ctx.lineTo(r1, p1.y);
      ctx.lineTo(r2, p2.y); ctx.lineTo(l2, p2.y);
      ctx.closePath();
      ctx.fill();

      // Lane dividers (dashed yellow)
      if (!stripe && t1 > 0.01) {
        ctx.strokeStyle = '#FFD93D';
        ctx.lineWidth = Math.max(1, t1 * 5);
        for (var ln = 1; ln < LANE_COUNT; ln++) {
          var lx1 = l1 + (r1 - l1) * (ln / LANE_COUNT);
          var lx2 = l2 + (r2 - l2) * (ln / LANE_COUNT);
          ctx.beginPath(); ctx.moveTo(lx1, p1.y); ctx.lineTo(lx2, p2.y); ctx.stroke();
        }
      }

      // Road edges (white)
      if (t1 > 0.008) {
        ctx.strokeStyle = 'rgba(255,255,255,0.55)';
        ctx.lineWidth = Math.max(1.5, t1 * 4);
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

    var sz = 90 * sc;
    if (sz < 2) return;

    ctx.save();
    ctx.translate(x, y);

    switch (obs.type) {
      case 'barrel':
        // Outline glow for visibility
        ctx.shadowColor = 'rgba(255,100,0,0.5)';
        ctx.shadowBlur = sz * 0.3;
        ctx.fillStyle = '#e74c3c';
        roundRect(ctx, -sz * 0.38, -sz * 1.25, sz * 0.76, sz * 1.05, sz * 0.07);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#c0392b';
        ctx.fillRect(-sz * 0.3, -sz * 1.1, sz * 0.6, sz * 0.8);
        ctx.fillStyle = '#fdcb6e';
        ctx.fillRect(-sz * 0.18, -sz * 0.85, sz * 0.36, sz * 0.3);
        // Hazard stripes
        ctx.fillStyle = '#2d3436';
        ctx.fillRect(-sz * 0.38, -sz * 0.65, sz * 0.76, sz * 0.06);
        ctx.fillRect(-sz * 0.38, -sz * 1.2, sz * 0.76, sz * 0.06);
        // Warning symbol
        if (sz > 12) {
          ctx.fillStyle = '#fff';
          ctx.font = 'bold ' + Math.max(8, sz * 0.22) + 'px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('!', 0, -sz * 0.55);
        }
        break;

      case 'cone':
        ctx.shadowColor = 'rgba(255,100,0,0.5)';
        ctx.shadowBlur = sz * 0.3;
        ctx.fillStyle = '#ff6b35';
        ctx.beginPath();
        ctx.moveTo(0, -sz * 1.15);
        ctx.lineTo(-sz * 0.36, 0);
        ctx.lineTo(sz * 0.36, 0);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fillRect(-sz * 0.2, -sz * 0.7, sz * 0.4, sz * 0.1);
        ctx.fillRect(-sz * 0.27, -sz * 0.4, sz * 0.54, sz * 0.1);
        ctx.fillStyle = '#d63031';
        ctx.fillRect(-sz * 0.38, -sz * 0.06, sz * 0.76, sz * 0.08);
        break;

      case 'tire':
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = sz * 0.3;
        ctx.fillStyle = '#2d3436';
        ctx.beginPath(); ctx.arc(0, -sz * 0.5, sz * 0.55, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#636e72';
        ctx.beginPath(); ctx.arc(0, -sz * 0.5, sz * 0.4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#2d3436';
        ctx.beginPath(); ctx.arc(0, -sz * 0.5, sz * 0.18, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#b2bec3';
        ctx.beginPath(); ctx.arc(0, -sz * 0.5, sz * 0.08, 0, Math.PI * 2); ctx.fill();
        // Tread marks
        ctx.strokeStyle = '#444';
        ctx.lineWidth = Math.max(1, sz * 0.03);
        for (var ti = 0; ti < 8; ti++) {
          var ta = ti * Math.PI / 4;
          ctx.beginPath();
          ctx.moveTo(Math.cos(ta) * sz * 0.4, -sz * 0.5 + Math.sin(ta) * sz * 0.4);
          ctx.lineTo(Math.cos(ta) * sz * 0.55, -sz * 0.5 + Math.sin(ta) * sz * 0.55);
          ctx.stroke();
        }
        break;

      case 'barrier':
        ctx.shadowColor = 'rgba(255,0,0,0.4)';
        ctx.shadowBlur = sz * 0.3;
        ctx.fillStyle = '#dfe6e9';
        roundRect(ctx, -sz * 0.7, -sz * 0.45, sz * 1.4, sz * 0.45, 3);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#f5f6fa';
        ctx.fillRect(-sz * 0.7, -sz * 0.45, sz * 1.4, sz * 0.1);
        for (var si = 0; si < 5; si++) {
          ctx.fillStyle = si % 2 === 0 ? '#e74c3c' : '#fff';
          ctx.fillRect(-sz * 0.7 + si * sz * 0.28, -sz * 0.35, sz * 0.28, sz * 0.1);
        }
        if (sz > 8) {
          ctx.fillStyle = '#e74c3c';
          ctx.font = 'bold ' + Math.max(8, sz * 0.25) + 'px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('JUMP!', 0, -sz * 0.06);
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
    ctx.fillStyle = 'rgba(255,217,61,0.3)';
    ctx.beginPath(); ctx.arc(0, 0, sz * 1.4, 0, Math.PI * 2); ctx.fill();

    // Star
    ctx.fillStyle = '#FFD93D';
    ctx.strokeStyle = '#e67e22';
    ctx.lineWidth = Math.max(1, sz * 0.1);
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
      jumpOff = Math.sin((jumpTimer / jumpDuration) * Math.PI) * 35;
    }

    var bounce = Math.sin(truckBounce) * 1.2;
    var hoodY = h * 0.74 - jumpOff;
    var hoodH = h * 0.09;

    // Horizontal offset — cabin shifts left/right based on lane
    var laneShift = (lanePos - 1) * w * 0.12;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(w * 0.24 + laneShift, hoodY + bounce + 3, w * 0.52, hoodH);

    // Hood
    var hg = ctx.createLinearGradient(0, hoodY, 0, hoodY + hoodH);
    hg.addColorStop(0, '#e74c3c');
    hg.addColorStop(0.5, '#c0392b');
    hg.addColorStop(1, '#a93226');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.moveTo(w * 0.26 + laneShift, hoodY + hoodH + bounce);
    ctx.lineTo(w * 0.30 + laneShift, hoodY + bounce);
    ctx.lineTo(w * 0.70 + laneShift, hoodY + bounce);
    ctx.lineTo(w * 0.74 + laneShift, hoodY + hoodH + bounce);
    ctx.closePath();
    ctx.fill();

    // Scoop
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.moveTo(w * 0.42 + laneShift, hoodY + hoodH * 0.22 + bounce);
    ctx.lineTo(w * 0.44 + laneShift, hoodY - hoodH * 0.06 + bounce);
    ctx.lineTo(w * 0.56 + laneShift, hoodY - hoodH * 0.06 + bounce);
    ctx.lineTo(w * 0.58 + laneShift, hoodY + hoodH * 0.22 + bounce);
    ctx.closePath();
    ctx.fill();

    // Center line
    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w * 0.5 + laneShift, hoodY + bounce);
    ctx.lineTo(w * 0.5 + laneShift, hoodY + hoodH + bounce);
    ctx.stroke();

    // Flames
    drawFlame(ctx, w * 0.32 + laneShift, hoodY + hoodH * 0.5 + bounce, hoodH * 0.35, 1);
    drawFlame(ctx, w * 0.68 + laneShift, hoodY + hoodH * 0.5 + bounce, hoodH * 0.35, -1);

    // Side mirrors
    ctx.fillStyle = '#2d3436';
    ctx.fillRect(w * 0.18 + laneShift, hoodY - hoodH * 0.3 + bounce, w * 0.05, hoodH * 0.5);
    ctx.fillRect(w * 0.77 + laneShift, hoodY - hoodH * 0.3 + bounce, w * 0.05, hoodH * 0.5);
    ctx.fillStyle = '#a8d8ea';
    ctx.fillRect(w * 0.185 + laneShift, hoodY - hoodH * 0.2 + bounce, w * 0.04, hoodH * 0.3);
    ctx.fillRect(w * 0.775 + laneShift, hoodY - hoodH * 0.2 + bounce, w * 0.04, hoodH * 0.3);

    // Lane indicator (green arrow on road)
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

  function drawFlame(ctx, x, y, size, dir) {
    ctx.fillStyle = 'rgba(255,165,0,0.55)';
    ctx.beginPath();
    ctx.moveTo(x, y + size * 0.5);
    ctx.quadraticCurveTo(x + dir * size * 0.3, y, x + dir * size * 0.1, y - size * 0.5);
    ctx.quadraticCurveTo(x + dir * size * 0.4, y - size * 0.2, x + dir * size * 0.2, y + size * 0.5);
    ctx.closePath();
    ctx.fill();
  }

  function drawDashboard(ctx, w, h) {
    var dashH = h * 0.12;
    var dashY = h - dashH;

    // Dashboard horizontal shift to match cabin
    var dashShift = (lanePos - 1) * w * 0.12;

    var dg = ctx.createLinearGradient(0, dashY, 0, h);
    dg.addColorStop(0, '#3a3a3a');
    dg.addColorStop(0.12, '#2d3436');
    dg.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = dg;
    ctx.fillRect(0, dashY, w, dashH);
    ctx.fillStyle = '#555';
    ctx.fillRect(0, dashY, w, 2);

    // Steering wheel
    var cx = w * 0.5 + dashShift;
    var cy = dashY + dashH * 0.55;
    var wr = Math.min(dashH * 0.38, w * 0.10);
    var tilt = (lanePos - 1) * 30 + steerAngle * 20;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(tilt * Math.PI / 180);

    ctx.strokeStyle = '#444'; ctx.lineWidth = wr * 0.22;
    ctx.beginPath(); ctx.arc(0, 0, wr, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#5a5a5a'; ctx.lineWidth = wr * 0.14;
    ctx.beginPath(); ctx.arc(0, 0, wr, 0, Math.PI * 2); ctx.stroke();

    ctx.fillStyle = '#333';
    ctx.beginPath(); ctx.arc(0, 0, wr * 0.26, 0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = '#555'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(0, -wr); ctx.lineTo(0, -wr * 0.26); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-wr, 0); ctx.lineTo(-wr * 0.26, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(wr, 0); ctx.lineTo(wr * 0.26, 0); ctx.stroke();

    ctx.restore();

    // Speedometer (left)
    var gx = w * 0.16 + dashShift, gy = dashY + dashH * 0.55, gr = dashH * 0.28;
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(gx, gy, gr, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#444'; ctx.lineWidth = 1.5; ctx.stroke();

    var speedPct = Math.min(1, (speed - baseSpeed) / Math.max(0.1, maxSpeed - baseSpeed));
    var na = -Math.PI * 0.75 + speedPct * Math.PI * 1.5;
    ctx.strokeStyle = '#e74c3c'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(gx, gy);
    ctx.lineTo(gx + Math.cos(na) * gr * 0.65, gy + Math.sin(na) * gr * 0.65);
    ctx.stroke();

    ctx.fillStyle = '#e74c3c';
    ctx.font = 'bold ' + Math.max(6, gr * 0.4) + 'px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(Math.round(60 + (speed - baseSpeed) * 25), gx, gy + gr * 0.55);

    // Star gauge (right)
    var tx = w * 0.84 + dashShift;
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(tx, gy, gr, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#444'; ctx.lineWidth = 1.5; ctx.stroke();

    var starPct = collected / Math.max(1, totalCollectibles);
    if (starPct > 0) {
      ctx.strokeStyle = '#2ecc71'; ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(tx, gy, gr * 0.7, -Math.PI * 0.5, -Math.PI * 0.5 + starPct * Math.PI * 2);
      ctx.stroke();
    }

    ctx.fillStyle = '#2ecc71';
    ctx.font = 'bold ' + Math.max(6, gr * 0.4) + 'px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(collected + '/' + totalCollectibles, tx, gy + gr * 0.15);

    // Hands
    var hs = wr * 0.25;
    ctx.fillStyle = '#e8b88a';
    ctx.beginPath(); ctx.arc(cx - wr * 0.82, cy + wr * 0.12, hs, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#c9956a'; ctx.lineWidth = 0.5; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx + wr * 0.82, cy + wr * 0.12, hs, 0, Math.PI * 2); ctx.fill();
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
    var area = document.getElementById('fpd-area');
    if (area) {
      var els = area.querySelectorAll('.fpd-ouch,.fpd-flash,.fpd-reset-overlay');
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
    if (boundSteerMove) document.removeEventListener('mousemove', boundSteerMove);
    if (boundSteerUp) document.removeEventListener('mouseup', boundSteerUp);
    obstacles = [];
    collectibles = [];
    if (container) container.innerHTML = '';
  }

  return { start: start, destroy: destroy };
})();
