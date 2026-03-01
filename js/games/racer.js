/* ===== Racer Game — Two trucks race around an oval track ===== */
window.RacerGame = (function () {
  var container, callback;
  var rafId, destroyed;
  var trackCx, trackCy, trackRx, trackRy;
  var playerAngle, cpuAngle, playerSpeed, cpuSpeed;
  var laps, cpuLaps, targetLaps;
  var lastTime, areaWidth, areaHeight;
  var boundKeyDown, boundKeyUp, boundTouchStart, boundTouchEnd;
  var isAccelerating;
  var playerTruck, cpuTruck;
  var trackPoints;
  var checkpointsPassed, cpuCheckpointsPassed;
  var lastCheckpoint, cpuLastCheckpoint;
  var NUM_CHECKPOINTS;
  var countdown, countdownTimer;
  var raceStarted, raceFinished;
  var cpuDifficulty;
  var playerBestLap, playerLapStart;
  var steerLeft, steerRight;
  var playerLane, cpuLane;
  var INNER_LANE, OUTER_LANE;

  // Physics
  var ACCEL = 0.0003;
  var BRAKE_DECEL = 0.0006;
  var FRICTION = 0.00012;
  var MAX_SPEED = 0.022;
  var CPU_BASE_SPEED = 0.015;
  var CPU_VARIANCE = 0.004;

  function start(config, gameArea, onComplete) {
    container = gameArea;
    callback = onComplete;
    destroyed = false;

    targetLaps = config.laps || 3;
    playerTruck = config.playerTruck || TruckSVG.gravedigger();
    cpuTruck = config.cpuTruck || TruckSVG.rampage();
    cpuDifficulty = config.cpuDifficulty || 0.8;

    CPU_BASE_SPEED = 0.012 + cpuDifficulty * 0.006;
    CPU_VARIANCE = 0.003;

    resetState();
    render();
    bindEvents();
    startCountdown();
  }

  function resetState() {
    playerAngle = Math.PI;
    cpuAngle = Math.PI + 0.15;
    playerSpeed = 0;
    cpuSpeed = CPU_BASE_SPEED;
    laps = 0;
    cpuLaps = 0;
    isAccelerating = false;
    steerLeft = false;
    steerRight = false;
    raceStarted = false;
    raceFinished = false;
    playerBestLap = Infinity;
    playerLapStart = 0;

    NUM_CHECKPOINTS = 8;
    checkpointsPassed = 0;
    cpuCheckpointsPassed = 0;
    lastCheckpoint = -1;
    cpuLastCheckpoint = -1;

    INNER_LANE = 0;
    OUTER_LANE = 1;
    playerLane = OUTER_LANE;
    cpuLane = INNER_LANE;

    countdown = 3;
  }

  function render() {
    var area = container;
    var rect = area.getBoundingClientRect();
    areaWidth = rect.width || 380;
    areaHeight = rect.height || 320;

    trackCx = areaWidth / 2;
    trackCy = areaHeight / 2;
    trackRx = Math.min(areaWidth * 0.4, 170);
    trackRy = Math.min(areaHeight * 0.35, 130);

    var html = '<style>';
    html += '.racer-area{position:relative;width:100%;height:100%;min-height:300px;overflow:hidden;border-radius:var(--radius-medium);touch-action:manipulation;-webkit-user-select:none;user-select:none;background:#5a8f3c;}';
    html += '.racer-track-svg{position:absolute;inset:0;width:100%;height:100%;}';
    html += '.racer-truck{position:absolute;width:44px;height:32px;z-index:10;pointer-events:none;transform-origin:center center;}';
    html += '.racer-truck svg{display:block;width:100%;height:100%;}';
    html += '.racer-hud{position:absolute;top:8px;right:10px;font-family:var(--font-title);font-size:clamp(0.8rem,2.5vw,1rem);color:#fff;z-index:20;background:rgba(0,0,0,0.55);padding:6px 12px;border-radius:var(--radius-small);text-align:right;line-height:1.6;}';
    html += '.racer-pos{position:absolute;top:8px;left:10px;font-family:var(--font-title);font-size:clamp(0.9rem,3vw,1.2rem);z-index:20;background:rgba(0,0,0,0.55);padding:6px 12px;border-radius:var(--radius-small);color:#fff;}';
    html += '.racer-countdown{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:var(--font-title);font-size:clamp(3rem,12vw,5rem);color:#fff;z-index:30;text-shadow:0 4px 16px rgba(0,0,0,0.5);animation:racer-count-pop 0.8s ease-out;}';
    html += '@keyframes racer-count-pop{0%{transform:translate(-50%,-50%) scale(2);opacity:0;}30%{transform:translate(-50%,-50%) scale(1);opacity:1;}100%{transform:translate(-50%,-50%) scale(1);opacity:1;}}';
    html += '.racer-hint{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);font-family:var(--font-body);font-weight:600;font-size:0.8rem;color:rgba(255,255,255,0.8);z-index:20;white-space:nowrap;background:rgba(0,0,0,0.4);padding:4px 10px;border-radius:var(--radius-small);}';
    html += '.racer-finish-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.6);z-index:30;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;animation:runner-overlay-in 0.3s ease;}';
    html += '.racer-finish-text{font-family:var(--font-title);font-size:clamp(1.8rem,6vw,2.5rem);color:white;text-shadow:0 2px 8px rgba(0,0,0,0.4);}';
    html += '.racer-finish-sub{font-family:var(--font-body);font-weight:700;font-size:clamp(0.9rem,3vw,1.1rem);color:rgba(255,255,255,0.9);}';
    html += '.racer-pedal{position:absolute;bottom:12px;width:70px;height:70px;border-radius:50%;z-index:25;border:3px solid rgba(255,255,255,0.5);display:flex;align-items:center;justify-content:center;font-family:var(--font-title);font-size:1.4rem;color:#fff;touch-action:manipulation;-webkit-user-select:none;user-select:none;}';
    html += '.racer-pedal-go{right:12px;background:rgba(46,204,113,0.7);}';
    html += '.racer-pedal-go.active{background:rgba(46,204,113,1);}';
    html += '.racer-steer{position:absolute;bottom:12px;width:56px;height:56px;border-radius:50%;z-index:25;border:3px solid rgba(255,255,255,0.4);display:flex;align-items:center;justify-content:center;font-family:var(--font-title);font-size:1.2rem;color:#fff;touch-action:manipulation;-webkit-user-select:none;user-select:none;background:rgba(255,255,255,0.2);}';
    html += '.racer-steer.active{background:rgba(255,255,255,0.5);}';
    html += '.racer-steer-left{left:12px;}';
    html += '.racer-steer-right{left:76px;}';
    html += '</style>';

    html += '<div class="racer-area" id="racer-area">';

    // Track SVG
    html += '<svg class="racer-track-svg" id="racer-track-svg" viewBox="0 0 ' + areaWidth + ' ' + areaHeight + '" preserveAspectRatio="xMidYMid meet">';
    // Grass bg
    html += '<rect width="' + areaWidth + '" height="' + areaHeight + '" fill="#5a8f3c"/>';
    // Grass texture lines
    for (var g = 0; g < 12; g++) {
      var gx = Math.random() * areaWidth;
      var gy = Math.random() * areaHeight;
      html += '<line x1="' + gx + '" y1="' + gy + '" x2="' + (gx + 4) + '" y2="' + (gy - 8) + '" stroke="#4a7a30" stroke-width="1.5" opacity="0.4"/>';
    }
    // Track outer edge
    var laneW = 28;
    html += '<ellipse cx="' + trackCx + '" cy="' + trackCy + '" rx="' + (trackRx + laneW + 4) + '" ry="' + (trackRy + laneW + 4) + '" fill="none" stroke="#444" stroke-width="3"/>';
    // Track surface (outer lane)
    html += '<ellipse cx="' + trackCx + '" cy="' + trackCy + '" rx="' + (trackRx + laneW) + '" ry="' + (trackRy + laneW) + '" fill="#666" stroke="none"/>';
    // Track surface (inner hole = infield)
    html += '<ellipse cx="' + trackCx + '" cy="' + trackCy + '" rx="' + (trackRx - laneW) + '" ry="' + (trackRy - laneW) + '" fill="#5a8f3c" stroke="#444" stroke-width="3"/>';
    // Lane divider (dashed)
    html += '<ellipse cx="' + trackCx + '" cy="' + trackCy + '" rx="' + trackRx + '" ry="' + trackRy + '" fill="none" stroke="#999" stroke-width="1.5" stroke-dasharray="10 8"/>';
    // Start/finish line
    var finishX = trackCx + trackRx;
    html += '<line x1="' + finishX + '" y1="' + (trackCy - laneW - 6) + '" x2="' + finishX + '" y2="' + (trackCy + laneW + 6) + '" stroke="#fff" stroke-width="3"/>';
    // Checkered pattern on finish
    for (var ci = 0; ci < 4; ci++) {
      var cy_ = trackCy - laneW - 4 + ci * 14;
      for (var cj = 0; cj < 2; cj++) {
        var cx_ = finishX - 3 + cj * 6;
        if ((ci + cj) % 2 === 0) {
          html += '<rect x="' + cx_ + '" y="' + cy_ + '" width="6" height="7" fill="#222"/>';
        }
      }
    }
    // Infield text
    html += '<text x="' + trackCx + '" y="' + (trackCy - 6) + '" text-anchor="middle" font-size="11" fill="#3d6e24" font-weight="bold" font-family="sans-serif" opacity="0.6">' + t('stadiumTitle') + '</text>';
    html += '<text x="' + trackCx + '" y="' + (trackCy + 12) + '" text-anchor="middle" font-size="10" fill="#3d6e24" font-family="sans-serif" opacity="0.5">' + targetLaps + ' laps</text>';

    html += '</svg>';

    // Trucks
    html += '<div class="racer-truck" id="racer-player">' + playerTruck + '</div>';
    html += '<div class="racer-truck" id="racer-cpu" style="opacity:0.85;">' + cpuTruck + '</div>';

    // HUD
    html += '<div class="racer-hud" id="racer-hud">Lap 0/' + targetLaps + '</div>';
    html += '<div class="racer-pos" id="racer-pos">2nd</div>';

    // Countdown
    html += '<div class="racer-countdown" id="racer-countdown">3</div>';

    // Controls hint
    html += '<div class="racer-hint" id="racer-hint">';
    html += L({ es: 'Mantener = Acelerar | Flechas = Cambiar carril', en: 'Hold = Accelerate | Arrows = Switch lane', ca: 'Mantenir = Accelerar | Fletxes = Canviar carril' });
    html += '</div>';

    // Touch pedals
    html += '<div class="racer-pedal racer-pedal-go" id="racer-go">&#9654;</div>';
    html += '<div class="racer-steer racer-steer-left" id="racer-left">&larr;</div>';
    html += '<div class="racer-steer racer-steer-right" id="racer-right">&rarr;</div>';

    html += '</div>';

    container.innerHTML = html;

    // Recompute after render
    var el = document.getElementById('racer-area');
    if (el) {
      areaWidth = el.offsetWidth;
      areaHeight = el.offsetHeight;
      trackCx = areaWidth / 2;
      trackCy = areaHeight / 2;
      trackRx = Math.min(areaWidth * 0.4, 170);
      trackRy = Math.min(areaHeight * 0.35, 130);
    }
  }

  function getTruckPos(angle, lane) {
    var offset = lane === INNER_LANE ? -14 : 14;
    var rx = trackRx + offset;
    var ry = trackRy + offset;
    var x = trackCx + Math.cos(angle) * rx;
    var y = trackCy + Math.sin(angle) * ry;
    // tangent angle for rotation
    var dx = -Math.sin(angle) * rx;
    var dy = Math.cos(angle) * ry;
    var rot = Math.atan2(dy, dx) * (180 / Math.PI);
    return { x: x, y: y, rot: rot };
  }

  function getCheckpoint(angle) {
    // map angle (0..2PI) to checkpoint index
    var norm = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    return Math.floor(norm / (2 * Math.PI) * NUM_CHECKPOINTS);
  }

  function startCountdown() {
    countdown = 3;
    var cdEl = document.getElementById('racer-countdown');
    if (cdEl) cdEl.textContent = '3';

    countdownTimer = setInterval(function () {
      if (destroyed) { clearInterval(countdownTimer); return; }
      countdown--;
      var cdEl = document.getElementById('racer-countdown');
      if (countdown > 0) {
        if (cdEl) {
          cdEl.textContent = countdown;
          cdEl.style.animation = 'none';
          void cdEl.offsetHeight;
          cdEl.style.animation = 'racer-count-pop 0.8s ease-out';
        }
      } else if (countdown === 0) {
        if (cdEl) {
          cdEl.textContent = L({ es: '!YA!', en: 'GO!', ca: 'JA!' });
          cdEl.style.color = '#2ecc71';
          cdEl.style.animation = 'none';
          void cdEl.offsetHeight;
          cdEl.style.animation = 'racer-count-pop 0.8s ease-out';
        }
        AudioManager.tap();
        raceStarted = true;
        lastTime = performance.now();
        playerLapStart = lastTime;
        rafId = requestAnimationFrame(gameLoop);
      } else {
        clearInterval(countdownTimer);
        if (cdEl && cdEl.parentNode) {
          cdEl.style.transition = 'opacity 0.5s';
          cdEl.style.opacity = '0';
          setTimeout(function () {
            if (cdEl.parentNode) cdEl.parentNode.removeChild(cdEl);
          }, 500);
        }
      }
    }, 1000);
  }

  function bindEvents() {
    boundKeyDown = function (e) {
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        isAccelerating = true;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        switchLane(INNER_LANE);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        switchLane(OUTER_LANE);
      }
      var hint = document.getElementById('racer-hint');
      if (hint) hint.style.display = 'none';
    };

    boundKeyUp = function (e) {
      if (e.key === ' ' || e.key === 'ArrowUp') {
        isAccelerating = false;
      }
    };

    document.addEventListener('keydown', boundKeyDown);
    document.addEventListener('keyup', boundKeyUp);

    // Touch controls
    var goBtn = document.getElementById('racer-go');
    var leftBtn = document.getElementById('racer-left');
    var rightBtn = document.getElementById('racer-right');

    if (goBtn) {
      var goDown = function (e) {
        e.preventDefault();
        isAccelerating = true;
        goBtn.classList.add('active');
        var hint = document.getElementById('racer-hint');
        if (hint) hint.style.display = 'none';
      };
      var goUp = function (e) {
        e.preventDefault();
        isAccelerating = false;
        goBtn.classList.remove('active');
      };
      goBtn.addEventListener('touchstart', goDown, { passive: false });
      goBtn.addEventListener('mousedown', goDown);
      goBtn.addEventListener('touchend', goUp, { passive: false });
      goBtn.addEventListener('touchcancel', goUp, { passive: false });
      goBtn.addEventListener('mouseup', goUp);
      goBtn.addEventListener('mouseleave', goUp);
    }

    if (leftBtn) {
      leftBtn.addEventListener('touchstart', function (e) { e.preventDefault(); switchLane(INNER_LANE); }, { passive: false });
      leftBtn.addEventListener('click', function () { switchLane(INNER_LANE); });
    }
    if (rightBtn) {
      rightBtn.addEventListener('touchstart', function (e) { e.preventDefault(); switchLane(OUTER_LANE); }, { passive: false });
      rightBtn.addEventListener('click', function () { switchLane(OUTER_LANE); });
    }
  }

  function switchLane(lane) {
    if (raceFinished) return;
    if (playerLane !== lane) {
      playerLane = lane;
      AudioManager.tap();
    }
  }

  function gameLoop(timestamp) {
    if (destroyed || raceFinished) return;

    var dt = Math.min((timestamp - lastTime) / 16.67, 3);
    lastTime = timestamp;

    // --- Player physics ---
    if (isAccelerating) {
      playerSpeed += ACCEL * dt;
      if (playerSpeed > MAX_SPEED) playerSpeed = MAX_SPEED;
    } else {
      playerSpeed -= BRAKE_DECEL * dt;
      if (playerSpeed < 0) playerSpeed = 0;
    }

    // Outer lane is longer, so effective angular speed is slightly slower
    var playerLaneFactor = playerLane === OUTER_LANE ? 0.88 : 1.0;
    playerAngle += playerSpeed * dt * playerLaneFactor;

    // --- CPU AI ---
    // CPU varies speed with some randomness
    var cpuTarget = CPU_BASE_SPEED + (Math.sin(timestamp * 0.001) * CPU_VARIANCE);
    // CPU is slightly faster when behind, slower when ahead
    var angleDiff = playerAngle - cpuAngle;
    if (angleDiff > 0.3) {
      cpuTarget *= 1.08;
    } else if (angleDiff < -0.3) {
      cpuTarget *= 0.94;
    }
    cpuSpeed += (cpuTarget - cpuSpeed) * 0.02 * dt;
    var cpuLaneFactor = cpuLane === OUTER_LANE ? 0.88 : 1.0;
    cpuAngle += cpuSpeed * dt * cpuLaneFactor;

    // CPU lane switching - occasionally switches to try to block or gain advantage
    if (Math.random() < 0.003 * dt) {
      cpuLane = cpuLane === INNER_LANE ? OUTER_LANE : INNER_LANE;
    }
    // If CPU is on same lane as player and close, try to stay there (blocking)
    if (cpuLane === playerLane) {
      var gap = Math.abs(playerAngle - cpuAngle) % (2 * Math.PI);
      if (gap > 0.5 && Math.random() < 0.01 * dt) {
        cpuLane = INNER_LANE; // Go back to optimal lane
      }
    }

    // --- Checkpoint tracking ---
    var playerCp = getCheckpoint(playerAngle);
    if (playerCp !== lastCheckpoint) {
      var expected = (lastCheckpoint + 1) % NUM_CHECKPOINTS;
      if (playerCp === expected) {
        checkpointsPassed++;
        if (playerCp === 0 && checkpointsPassed >= NUM_CHECKPOINTS) {
          // Completed a lap
          laps++;
          checkpointsPassed = 0;
          var now = performance.now();
          var lapTime = now - playerLapStart;
          if (lapTime < playerBestLap) playerBestLap = lapTime;
          playerLapStart = now;
          AudioManager.collect();
          if (laps >= targetLaps) {
            finishRace(true);
            return;
          }
        }
      }
      lastCheckpoint = playerCp;
    }

    var cpuCp = getCheckpoint(cpuAngle);
    if (cpuCp !== cpuLastCheckpoint) {
      var cpuExpected = (cpuLastCheckpoint + 1) % NUM_CHECKPOINTS;
      if (cpuCp === cpuExpected) {
        cpuCheckpointsPassed++;
        if (cpuCp === 0 && cpuCheckpointsPassed >= NUM_CHECKPOINTS) {
          cpuLaps++;
          cpuCheckpointsPassed = 0;
          if (cpuLaps >= targetLaps) {
            finishRace(false);
            return;
          }
        }
      }
      cpuLastCheckpoint = cpuCp;
    }

    // --- Render trucks ---
    var pPos = getTruckPos(playerAngle, playerLane);
    var cPos = getTruckPos(cpuAngle, cpuLane);

    var playerEl = document.getElementById('racer-player');
    var cpuEl = document.getElementById('racer-cpu');

    if (playerEl) {
      playerEl.style.left = (pPos.x - 22) + 'px';
      playerEl.style.top = (pPos.y - 16) + 'px';
      playerEl.style.transform = 'rotate(' + pPos.rot.toFixed(1) + 'deg)';
    }
    if (cpuEl) {
      cpuEl.style.left = (cPos.x - 22) + 'px';
      cpuEl.style.top = (cPos.y - 16) + 'px';
      cpuEl.style.transform = 'rotate(' + cPos.rot.toFixed(1) + 'deg)';
    }

    // --- HUD ---
    var hudEl = document.getElementById('racer-hud');
    if (hudEl) {
      var displayLap = Math.min(laps + 1, targetLaps);
      var speedPct = Math.round((playerSpeed / MAX_SPEED) * 100);
      hudEl.innerHTML = 'Lap ' + displayLap + '/' + targetLaps + '<br>' + speedPct + ' km/h';
    }

    // Position
    var posEl = document.getElementById('racer-pos');
    if (posEl) {
      var playerProgress = laps * NUM_CHECKPOINTS + checkpointsPassed + (playerAngle % (2 * Math.PI)) / (2 * Math.PI);
      var cpuProgress = cpuLaps * NUM_CHECKPOINTS + cpuCheckpointsPassed + (cpuAngle % (2 * Math.PI)) / (2 * Math.PI);
      if (playerProgress >= cpuProgress) {
        posEl.textContent = '1st';
        posEl.style.color = '#2ecc71';
      } else {
        posEl.textContent = '2nd';
        posEl.style.color = '#e74c3c';
      }
    }

    rafId = requestAnimationFrame(gameLoop);
  }

  function finishRace(playerWon) {
    raceFinished = true;

    var area = document.getElementById('racer-area');
    if (!area) return;

    if (playerWon) {
      AudioManager.correct();
      var overlay = document.createElement('div');
      overlay.className = 'racer-finish-overlay';
      overlay.innerHTML = '<div class="racer-finish-text">' + L({ es: '!GANASTE!', en: 'YOU WIN!', ca: 'HAS GUANYAT!' }) + '</div>' +
        '<div class="racer-finish-sub">' + t('amazing') + '</div>';
      area.appendChild(overlay);
      setTimeout(function () {
        if (!destroyed && callback) callback();
      }, 1500);
    } else {
      AudioManager.wrong();
      var overlay = document.createElement('div');
      overlay.className = 'racer-finish-overlay';
      overlay.innerHTML = '<div class="racer-finish-text" style="color:#e74c3c;">' + L({ es: '!Te ganaron!', en: 'YOU LOST!', ca: "T'han guanyat!" }) + '</div>' +
        '<div class="racer-finish-sub">' + t('tryAgain') + '</div>';
      area.appendChild(overlay);

      // Tap to retry
      var retryHandler = function (e) {
        e.preventDefault();
        e.stopPropagation();
        overlay.removeEventListener('touchstart', retryHandler);
        overlay.removeEventListener('click', retryHandler);
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        retry();
      };
      overlay.addEventListener('touchstart', retryHandler, { passive: false });
      overlay.addEventListener('click', retryHandler);
    }
  }

  function retry() {
    // Clear old trucks
    var playerEl = document.getElementById('racer-player');
    var cpuEl = document.getElementById('racer-cpu');

    resetState();

    // Reset truck positions
    var pPos = getTruckPos(playerAngle, playerLane);
    var cPos = getTruckPos(cpuAngle, cpuLane);

    if (playerEl) {
      playerEl.style.left = (pPos.x - 22) + 'px';
      playerEl.style.top = (pPos.y - 16) + 'px';
      playerEl.style.transform = 'rotate(' + pPos.rot.toFixed(1) + 'deg)';
    }
    if (cpuEl) {
      cpuEl.style.left = (cPos.x - 22) + 'px';
      cpuEl.style.top = (cPos.y - 16) + 'px';
      cpuEl.style.transform = 'rotate(' + cPos.rot.toFixed(1) + 'deg)';
    }

    // Update HUD
    var hudEl = document.getElementById('racer-hud');
    if (hudEl) hudEl.innerHTML = 'Lap 0/' + targetLaps;
    var posEl = document.getElementById('racer-pos');
    if (posEl) { posEl.textContent = '2nd'; posEl.style.color = '#e74c3c'; }

    // Re-add countdown
    var area = document.getElementById('racer-area');
    if (area) {
      var cdEl = document.createElement('div');
      cdEl.className = 'racer-countdown';
      cdEl.id = 'racer-countdown';
      cdEl.textContent = '3';
      area.appendChild(cdEl);
    }

    startCountdown();
  }

  function destroy() {
    destroyed = true;
    raceFinished = true;
    if (rafId) cancelAnimationFrame(rafId);
    if (countdownTimer) clearInterval(countdownTimer);

    document.removeEventListener('keydown', boundKeyDown);
    document.removeEventListener('keyup', boundKeyUp);

    if (container) container.innerHTML = '';
  }

  return { start: start, destroy: destroy };
})();
