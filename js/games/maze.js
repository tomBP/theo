/* ===== Maze Game ===== */
window.MazeGame = (function () {
  var grid, rows, cols, playerPos, goalPos, collectibles, collected;
  var container, onComplete, wallColor, pathEmoji, goalEmoji, playerEmoji;
  var touchStartX, touchStartY;
  var SWIPE_THRESHOLD = 30;
  var fogRadius, enemies, enemyTimer, timerInterval, startTimeMs;
  var boundKeyDown;

  function start(config, gameArea, done) {
    grid = config.grid;
    rows = grid.length;
    cols = grid[0].length;
    playerPos = { r: config.start.r, c: config.start.c };
    goalPos = config.goal;
    // Store start for reset
    grid._startR = config.start.r;
    grid._startC = config.start.c;
    collectibles = (config.collectibles || []).map(function (c) {
      return { r: c.r, c: c.c, emoji: c.emoji, collected: false };
    });
    collected = 0;
    wallColor = config.wallColor || '#2d8a4e';
    pathEmoji = config.pathEmoji || '';
    goalEmoji = config.goalEmoji || '🏆';
    playerEmoji = config.playerEmoji || '🦕';
    fogRadius = config.fogRadius || 0;
    onComplete = done;
    container = gameArea;

    // Parse enemies config
    enemies = (config.enemies || []).map(function (e) {
      return {
        path: e.path.slice(),
        pathIndex: 0,
        dir: 1,
        r: e.path[0].r,
        c: e.path[0].c,
        emoji: e.emoji || '👻'
      };
    });

    startTimeMs = Date.now();
    render();
    bindEvents();

    // Start enemy patrol
    if (enemies.length > 0) {
      enemyTimer = setInterval(function () {
        moveEnemies();
      }, 800);
    }

    // Start timer display
    if (config.showTimer) {
      timerInterval = setInterval(function () {
        updateTimerDisplay();
      }, 1000);
    }
  }

  function render() {
    // Dynamic cell sizing for larger grids
    var maxCellW = Math.floor((window.innerWidth - 40) / cols);
    var maxCellH = Math.floor((window.innerHeight * 0.55) / rows);
    var cellSize = Math.min(maxCellW, maxCellH, 50);
    cellSize = Math.max(cellSize, 24); // minimum 24px

    var html = '<div class="maze-container">';

    // Timer display
    html += '<div class="maze-top-bar">';
    if (collectibles.length > 0) {
      html += '<div class="maze-collectibles-count" id="maze-collect">' + t('collected') + ': ' + collected + '/' + collectibles.length + '</div>';
    }
    html += '<div class="maze-timer" id="maze-timer">0:00</div>';
    html += '</div>';

    html += '<div class="maze-grid" id="maze-grid" style="grid-template-columns:repeat(' + cols + ',1fr);">';

    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var cell = grid[r][c];
        var cls = 'maze-cell';
        var content = '';
        var style = 'width:' + cellSize + 'px;height:' + cellSize + 'px;font-size:' + Math.max(cellSize * 0.55, 12) + 'px;';

        // Fog of war
        if (fogRadius > 0) {
          var dist = Math.abs(r - playerPos.r) + Math.abs(c - playerPos.c);
          if (dist > fogRadius + 1) {
            cls += ' fog-hidden';
          } else if (dist > fogRadius) {
            cls += ' fog-dim';
          }
        }

        if (cell === 1) {
          cls += ' wall';
          html += '<div class="' + cls + '" style="' + style + 'background:' + wallColor + ';"></div>';
          continue;
        }

        cls += ' path';
        if (r === playerPos.r && c === playerPos.c) {
          cls += ' player';
          content = playerEmoji;
        } else if (r === goalPos.r && c === goalPos.c) {
          cls += ' goal';
          content = goalEmoji;
        } else if (hasEnemy(r, c)) {
          cls += ' enemy';
          content = getEnemyEmoji(r, c);
        } else {
          var coll = findCollectible(r, c);
          if (coll && !coll.collected) {
            cls += ' collectible';
            content = coll.emoji;
          }
        }

        html += '<div class="' + cls + '" data-r="' + r + '" data-c="' + c + '" style="' + style + '">' + content + '</div>';
      }
    }

    html += '</div>';
    html += '<div class="maze-swipe-hint">' + t('swipeHint') + '</div>';
    html += '</div>';
    container.innerHTML = html;
  }

  function hasEnemy(r, c) {
    for (var i = 0; i < enemies.length; i++) {
      if (enemies[i].r === r && enemies[i].c === c) return true;
    }
    return false;
  }

  function getEnemyEmoji(r, c) {
    for (var i = 0; i < enemies.length; i++) {
      if (enemies[i].r === r && enemies[i].c === c) return enemies[i].emoji;
    }
    return '👻';
  }

  function findCollectible(r, c) {
    for (var i = 0; i < collectibles.length; i++) {
      if (collectibles[i].r === r && collectibles[i].c === c) return collectibles[i];
    }
    return null;
  }

  function bindEvents() {
    var mazeEl = document.getElementById('maze-grid');
    if (!mazeEl) return;
    mazeEl.addEventListener('touchstart', onTouchStart, { passive: false });
    mazeEl.addEventListener('touchend', onTouchEnd, { passive: false });
    boundKeyDown = onKeyDown;
    document.addEventListener('keydown', boundKeyDown);
  }

  function onTouchStart(e) {
    e.preventDefault();
    var touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }

  function onTouchEnd(e) {
    e.preventDefault();
    var touch = e.changedTouches[0];
    var dx = touch.clientX - touchStartX;
    var dy = touch.clientY - touchStartY;

    if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) return;

    if (Math.abs(dx) > Math.abs(dy)) {
      movePlayer(0, dx > 0 ? 1 : -1);
    } else {
      movePlayer(dy > 0 ? 1 : -1, 0);
    }
  }

  function onKeyDown(e) {
    switch (e.key) {
      case 'ArrowUp': case 'w': case 'W': movePlayer(-1, 0); break;
      case 'ArrowDown': case 's': case 'S': movePlayer(1, 0); break;
      case 'ArrowLeft': case 'a': case 'A': movePlayer(0, -1); break;
      case 'ArrowRight': case 'd': case 'D': movePlayer(0, 1); break;
    }
  }

  function movePlayer(dr, dc) {
    var nr = playerPos.r + dr;
    var nc = playerPos.c + dc;

    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) return;
    if (grid[nr][nc] === 1) return;

    playerPos = { r: nr, c: nc };
    AudioManager.tap();

    // Check collectible
    var coll = findCollectible(nr, nc);
    if (coll && !coll.collected) {
      coll.collected = true;
      collected++;
      AudioManager.collect();
    }

    // Check enemy collision
    if (hasEnemy(nr, nc)) {
      resetToStart();
      return;
    }

    // Check goal
    if (nr === goalPos.r && nc === goalPos.c) {
      cleanupTimers();
      render();
      AudioManager.fanfare();
      setTimeout(onComplete, 600);
      return;
    }

    render();
    bindEvents();
  }

  function moveEnemies() {
    for (var i = 0; i < enemies.length; i++) {
      var en = enemies[i];
      var nextIdx = en.pathIndex + en.dir;

      // Bounce at path ends
      if (nextIdx < 0 || nextIdx >= en.path.length) {
        en.dir *= -1;
        nextIdx = en.pathIndex + en.dir;
      }

      if (nextIdx >= 0 && nextIdx < en.path.length) {
        en.pathIndex = nextIdx;
        en.r = en.path[nextIdx].r;
        en.c = en.path[nextIdx].c;
      }
    }

    // Check if any enemy is on the player
    if (hasEnemy(playerPos.r, playerPos.c)) {
      resetToStart();
      return;
    }

    render();
    bindEvents();
  }

  function resetToStart() {
    AudioManager.wrong();
    // Reset player position but keep collected items
    playerPos = { r: grid._startR || 0, c: grid._startC || 0 };
    // Try to find original start from the grid config (stored on first render)
    render();
    bindEvents();
  }

  function updateTimerDisplay() {
    var el = document.getElementById('maze-timer');
    if (!el) return;
    var elapsed = Math.floor((Date.now() - startTimeMs) / 1000);
    var mins = Math.floor(elapsed / 60);
    var secs = elapsed % 60;
    el.textContent = mins + ':' + (secs < 10 ? '0' : '') + secs;
  }

  function updateProgress() {
    var prog = document.getElementById('game-progress');
    if (prog && collectibles.length > 0) {
      prog.textContent = collected + '/' + collectibles.length;
    }
  }

  function cleanupTimers() {
    if (enemyTimer) { clearInterval(enemyTimer); enemyTimer = null; }
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  }

  function destroy() {
    cleanupTimers();
    if (boundKeyDown) document.removeEventListener('keydown', boundKeyDown);
    if (container) container.innerHTML = '';
  }

  return { start: start, destroy: destroy };
})();
