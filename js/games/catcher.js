/* ===== Catcher Game ===== */
window.CatcherGame = (function () {
  var container, callback;
  var catcherX, catcherWidth, areaWidth, areaHeight;
  var items, score, catchGoal, speed, spawnRate;
  var goodSet, badSet, goodLabel, badLabel;
  var rafId, spawnTimer, lastTime;
  var isDragging, dragStartX, catcherStartX;
  var boundKeyDown, boundKeyUp, boundTouchStart, boundTouchMove, boundTouchEnd;
  var boundMouseDown, boundMouseMove, boundMouseUp;
  var keysDown;
  var destroyed;

  function start(config, gameArea, onComplete) {
    container = gameArea;
    callback = onComplete;
    destroyed = false;

    goodSet = config.goodItems || ['🥚'];
    badSet = config.badItems || ['🪨'];
    catchGoal = config.catchGoal || 10;
    speed = config.speed || 2;
    spawnRate = config.spawnRate || 1500;
    goodLabel = config.goodLabel ? L(config.goodLabel) : '';
    badLabel = config.badLabel ? L(config.badLabel) : '';

    score = 0;
    items = [];
    isDragging = false;
    keysDown = {};
    catcherWidth = 80;

    render();
    bindEvents();
    lastTime = performance.now();
    gameLoop(lastTime);
    scheduleSpawn();
  }

  function render() {
    var html = '<style>';
    html += '.catcher-area{position:relative;width:100%;height:100%;min-height:300px;overflow:hidden;background:linear-gradient(180deg,var(--theme-secondary,#dfe6e9) 0%,var(--theme-primary,#00b894) 100%);border-radius:var(--radius-medium);touch-action:none;-webkit-user-select:none;user-select:none;}';
    html += '.catcher-basket{position:absolute;bottom:10px;width:80px;height:44px;display:flex;align-items:center;justify-content:center;font-size:2rem;border-radius:var(--radius-small);background:var(--color-white);box-shadow:var(--shadow-medium);transition:none;z-index:10;touch-action:none;}';
    html += '.catcher-item{position:absolute;font-size:1.8rem;z-index:5;pointer-events:none;will-change:transform;}';
    html += '.catcher-score{position:absolute;top:10px;left:50%;transform:translateX(-50%);font-family:var(--font-title);font-size:clamp(1.1rem,3.5vw,1.5rem);color:var(--color-white);text-shadow:0 2px 4px rgba(0,0,0,0.3);z-index:20;white-space:nowrap;}';
    html += '.catcher-label{position:absolute;bottom:60px;left:50%;transform:translateX(-50%);font-family:var(--font-body);font-weight:700;font-size:clamp(0.8rem,2.5vw,1rem);color:var(--color-white);text-shadow:0 1px 3px rgba(0,0,0,0.3);z-index:20;text-align:center;white-space:nowrap;opacity:0.9;}';
    html += '.catcher-area.wobble-active{animation:wobble 0.5s ease;}';
    html += '</style>';
    html += '<div class="catcher-area" id="catcher-area">';
    html += '<div class="catcher-score" id="catcher-score">0/' + catchGoal + ' ' + goodSet[0] + '</div>';
    if (goodLabel) {
      html += '<div class="catcher-label">' + goodLabel + '</div>';
    }
    html += '<div class="catcher-basket" id="catcher-basket">🧺</div>';
    html += '</div>';
    container.innerHTML = html;

    var area = document.getElementById('catcher-area');
    if (area) {
      areaWidth = area.offsetWidth;
      areaHeight = area.offsetHeight;
    }
    catcherX = (areaWidth - catcherWidth) / 2;
    updateCatcherPosition();
  }

  function updateCatcherPosition() {
    var basket = document.getElementById('catcher-basket');
    if (basket) {
      basket.style.left = catcherX + 'px';
    }
  }

  function bindEvents() {
    var area = document.getElementById('catcher-area');
    if (!area) return;

    boundTouchStart = onTouchStart;
    boundTouchMove = onTouchMove;
    boundTouchEnd = onTouchEnd;
    boundMouseDown = onMouseDown;
    boundMouseMove = onMouseMove;
    boundMouseUp = onMouseUp;
    boundKeyDown = onKeyDown;
    boundKeyUp = onKeyUp;

    area.addEventListener('touchstart', boundTouchStart, { passive: false });
    area.addEventListener('touchmove', boundTouchMove, { passive: false });
    area.addEventListener('touchend', boundTouchEnd, { passive: false });
    area.addEventListener('mousedown', boundMouseDown);
    document.addEventListener('mousemove', boundMouseMove);
    document.addEventListener('mouseup', boundMouseUp);
    document.addEventListener('keydown', boundKeyDown);
    document.addEventListener('keyup', boundKeyUp);
  }

  function onTouchStart(e) {
    e.preventDefault();
    var touch = e.touches[0];
    isDragging = true;
    var area = document.getElementById('catcher-area');
    var rect = area ? area.getBoundingClientRect() : { left: 0 };
    dragStartX = touch.clientX - rect.left;
    catcherStartX = catcherX;
  }

  function onTouchMove(e) {
    e.preventDefault();
    if (!isDragging) return;
    var touch = e.touches[0];
    var area = document.getElementById('catcher-area');
    var rect = area ? area.getBoundingClientRect() : { left: 0 };
    var currentX = touch.clientX - rect.left;
    var delta = currentX - dragStartX;
    catcherX = clampCatcher(catcherStartX + delta);
    updateCatcherPosition();
  }

  function onTouchEnd(e) {
    e.preventDefault();
    isDragging = false;
  }

  function onMouseDown(e) {
    isDragging = true;
    var area = document.getElementById('catcher-area');
    var rect = area ? area.getBoundingClientRect() : { left: 0 };
    dragStartX = e.clientX - rect.left;
    catcherStartX = catcherX;
  }

  function onMouseMove(e) {
    if (!isDragging) return;
    var area = document.getElementById('catcher-area');
    var rect = area ? area.getBoundingClientRect() : { left: 0 };
    var currentX = e.clientX - rect.left;
    var delta = currentX - dragStartX;
    catcherX = clampCatcher(catcherStartX + delta);
    updateCatcherPosition();
  }

  function onMouseUp() {
    isDragging = false;
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      keysDown[e.key] = true;
    }
  }

  function onKeyUp(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      keysDown[e.key] = false;
    }
  }

  function clampCatcher(x) {
    return Math.max(0, Math.min(areaWidth - catcherWidth, x));
  }

  function scheduleSpawn() {
    if (destroyed) return;
    spawnTimer = setTimeout(function () {
      if (destroyed) return;
      spawnItem();
      scheduleSpawn();
    }, spawnRate + (Math.random() * 400 - 200));
  }

  function spawnItem() {
    var area = document.getElementById('catcher-area');
    if (!area || destroyed) return;

    // Recalculate in case of resize
    areaWidth = area.offsetWidth;
    areaHeight = area.offsetHeight;

    var isGood = Math.random() < 0.65;
    var set = isGood ? goodSet : badSet;
    var emoji = set[Math.floor(Math.random() * set.length)];

    var el = document.createElement('div');
    el.className = 'catcher-item';
    el.textContent = emoji;
    var x = Math.random() * (areaWidth - 40);
    el.style.left = x + 'px';
    el.style.top = '-40px';
    area.appendChild(el);

    items.push({
      el: el,
      x: x,
      y: -40,
      isGood: isGood,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 4
    });
  }

  function gameLoop(timestamp) {
    if (destroyed) return;
    var dt = (timestamp - lastTime) / 16.67; // normalize to ~60fps
    lastTime = timestamp;

    // Keyboard movement
    var keySpeed = 6 * dt;
    if (keysDown['ArrowLeft']) {
      catcherX = clampCatcher(catcherX - keySpeed);
      updateCatcherPosition();
    }
    if (keysDown['ArrowRight']) {
      catcherX = clampCatcher(catcherX + keySpeed);
      updateCatcherPosition();
    }

    // Update items
    var fallSpeed = speed * 2.5 * dt;
    var catcherBottom = areaHeight - 10;
    var catcherTop = catcherBottom - 44;
    var toRemove = [];

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      item.y += fallSpeed;
      item.rotation += item.rotationSpeed * dt;
      item.el.style.top = item.y + 'px';
      item.el.style.transform = 'rotate(' + item.rotation + 'deg)';

      // Check if caught (item center overlaps catcher)
      var itemCenterX = item.x + 18;
      var itemBottom = item.y + 36;

      if (itemBottom >= catcherTop && item.y <= catcherBottom) {
        // Generous hitbox: item center within catcher width + padding
        if (itemCenterX >= catcherX - 10 && itemCenterX <= catcherX + catcherWidth + 10) {
          // Caught!
          if (item.isGood) {
            score++;
            AudioManager.correct();
            updateScore();
            updateProgress();
            if (score >= catchGoal) {
              finishGame();
              return;
            }
          } else {
            AudioManager.wrong();
            triggerShake();
          }
          toRemove.push(i);
          continue;
        }
      }

      // Remove if off-screen
      if (item.y > areaHeight + 50) {
        toRemove.push(i);
      }
    }

    // Remove items (reverse order)
    for (var j = toRemove.length - 1; j >= 0; j--) {
      var idx = toRemove[j];
      if (items[idx].el.parentNode) {
        items[idx].el.parentNode.removeChild(items[idx].el);
      }
      items.splice(idx, 1);
    }

    rafId = requestAnimationFrame(gameLoop);
  }

  function updateScore() {
    var el = document.getElementById('catcher-score');
    if (el) el.textContent = score + '/' + catchGoal + ' ' + goodSet[0];
  }

  function updateProgress() {
    var prog = document.getElementById('game-progress');
    if (prog) prog.textContent = score + '/' + catchGoal;
  }

  function triggerShake() {
    var area = document.getElementById('catcher-area');
    if (!area) return;
    area.classList.remove('wobble-active');
    // Force reflow to restart animation
    void area.offsetWidth;
    area.classList.add('wobble-active');
    setTimeout(function () {
      if (area) area.classList.remove('wobble-active');
    }, 500);
  }

  function finishGame() {
    destroyed = true;
    clearTimeout(spawnTimer);
    if (rafId) cancelAnimationFrame(rafId);
    setTimeout(function () {
      if (callback) callback();
    }, 400);
  }

  function destroy() {
    destroyed = true;
    clearTimeout(spawnTimer);
    if (rafId) cancelAnimationFrame(rafId);

    var area = document.getElementById('catcher-area');
    if (area) {
      area.removeEventListener('touchstart', boundTouchStart);
      area.removeEventListener('touchmove', boundTouchMove);
      area.removeEventListener('touchend', boundTouchEnd);
      area.removeEventListener('mousedown', boundMouseDown);
    }
    document.removeEventListener('mousemove', boundMouseMove);
    document.removeEventListener('mouseup', boundMouseUp);
    document.removeEventListener('keydown', boundKeyDown);
    document.removeEventListener('keyup', boundKeyUp);

    items = [];
    keysDown = {};
    if (container) container.innerHTML = '';
  }

  return { start: start, destroy: destroy };
})();
