/* ===== Maze Game ===== */
window.MazeGame = (function () {
  var grid, rows, cols, playerPos, goalPos, collectibles, collected;
  var container, onComplete, wallColor, pathEmoji, goalEmoji, playerEmoji;
  var touchStartX, touchStartY;
  var SWIPE_THRESHOLD = 30;

  function start(config, gameArea, done) {
    grid = config.grid;
    rows = grid.length;
    cols = grid[0].length;
    playerPos = config.start;
    goalPos = config.goal;
    collectibles = (config.collectibles || []).map(function (c) {
      return { r: c.r, c: c.c, emoji: c.emoji, collected: false };
    });
    collected = 0;
    wallColor = config.wallColor || '#2d8a4e';
    pathEmoji = config.pathEmoji || '';
    goalEmoji = config.goalEmoji || '🏆';
    playerEmoji = config.playerEmoji || '🦕';
    onComplete = done;
    container = gameArea;
    render();
    bindEvents();
  }

  function render() {
    var html = '<div class="maze-container">';
    if (collectibles.length > 0) {
      html += '<div class="maze-collectibles-count" id="maze-collect">' + t('collected') + ': ' + collected + '/' + collectibles.length + '</div>';
    }
    html += '<div class="maze-grid" id="maze-grid" style="grid-template-columns: repeat(' + cols + ', 1fr);">';

    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var cell = grid[r][c];
        var cls = 'maze-cell';
        var content = '';

        if (cell === 1) {
          cls += ' wall';
          html += '<div class="' + cls + '" style="background:' + wallColor + ';"></div>';
          continue;
        }

        cls += ' path';
        if (r === playerPos.r && c === playerPos.c) {
          cls += ' player';
          content = playerEmoji;
        } else if (r === goalPos.r && c === goalPos.c) {
          cls += ' goal';
          content = goalEmoji;
        } else {
          var coll = findCollectible(r, c);
          if (coll && !coll.collected) {
            cls += ' collectible';
            content = coll.emoji;
          }
        }

        html += '<div class="' + cls + '" data-r="' + r + '" data-c="' + c + '">' + content + '</div>';
      }
    }

    html += '</div>';
    html += '<div class="maze-swipe-hint">' + t('swipeHint') + '</div>';
    html += '</div>';
    container.innerHTML = html;
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
    document.addEventListener('keydown', onKeyDown);
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
      case 'ArrowUp': movePlayer(-1, 0); break;
      case 'ArrowDown': movePlayer(1, 0); break;
      case 'ArrowLeft': movePlayer(0, -1); break;
      case 'ArrowRight': movePlayer(0, 1); break;
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

    // Check goal
    if (nr === goalPos.r && nc === goalPos.c) {
      render();
      AudioManager.fanfare();
      setTimeout(onComplete, 600);
      return;
    }

    render();
    bindEvents();
  }

  function updateProgress() {
    var prog = document.getElementById('game-progress');
    if (prog && collectibles.length > 0) {
      prog.textContent = collected + '/' + collectibles.length;
    }
  }

  function destroy() {
    document.removeEventListener('keydown', onKeyDown);
    if (container) container.innerHTML = '';
  }

  return { start: start, destroy: destroy };
})();
