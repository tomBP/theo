/* ===== Drag and Drop Game ===== */
window.DragDropGame = (function () {
  var pieces, container, onComplete, placedCount, totalPieces, facts;
  var dragging = null, offsetX = 0, offsetY = 0;

  function start(config, gameArea, done) {
    pieces = config.pieces;
    facts = config.facts || [];
    totalPieces = pieces.length;
    placedCount = 0;
    onComplete = done;
    container = gameArea;
    render();
    bindEvents();
  }

  function render() {
    var html = '<div class="dragdrop-container">';
    html += '<div class="dragdrop-outline" id="dragdrop-outline">';
    html += '<svg viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg">';
    // Outline shape
    pieces.forEach(function (p) {
      html += '<g class="drop-zone" id="drop-' + p.id + '" data-id="' + p.id + '">';
      html += p.outlineSVG;
      html += '</g>';
    });
    html += '</svg></div>';
    html += '<div class="dragdrop-fact" id="dragdrop-fact"></div>';
    html += '<div class="dragdrop-pieces" id="dragdrop-pieces">';
    // Shuffle pieces
    var shuffled = pieces.slice().sort(function () { return Math.random() - 0.5; });
    shuffled.forEach(function (p) {
      html += '<div class="drag-piece" data-id="' + p.id + '" id="piece-' + p.id + '">';
      html += '<svg viewBox="0 0 60 50" xmlns="http://www.w3.org/2000/svg">' + p.pieceSVG + '</svg>';
      html += '</div>';
    });
    html += '</div></div>';
    container.innerHTML = html;
  }

  function bindEvents() {
    var piecesEl = container.querySelectorAll('.drag-piece');
    piecesEl.forEach(function (el) {
      el.addEventListener('touchstart', onDragStart, { passive: false });
      el.addEventListener('mousedown', onDragStart);
    });
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('touchend', onDragEnd);
    document.addEventListener('mouseup', onDragEnd);
  }

  function onDragStart(e) {
    e.preventDefault();
    var el = e.currentTarget;
    if (el.classList.contains('placed')) return;
    dragging = el;
    var rect = el.getBoundingClientRect();
    var touch = e.touches ? e.touches[0] : e;
    offsetX = touch.clientX - rect.left;
    offsetY = touch.clientY - rect.top;
    el.classList.add('dragging');
    el.style.left = (touch.clientX - offsetX) + 'px';
    el.style.top = (touch.clientY - offsetY) + 'px';
    el.style.width = rect.width + 'px';
    el.style.height = rect.height + 'px';
    AudioManager.tap();
  }

  function onDragMove(e) {
    if (!dragging) return;
    e.preventDefault();
    var touch = e.touches ? e.touches[0] : e;
    dragging.style.left = (touch.clientX - offsetX) + 'px';
    dragging.style.top = (touch.clientY - offsetY) + 'px';

    // Highlight nearest drop zone
    var dropZones = container.querySelectorAll('.drop-zone:not(.filled)');
    dropZones.forEach(function (dz) { dz.classList.remove('highlight'); });
    var nearest = findNearestDrop(touch.clientX, touch.clientY);
    if (nearest) nearest.classList.add('highlight');
  }

  function onDragEnd(e) {
    if (!dragging) return;
    var touch = e.changedTouches ? e.changedTouches[0] : e;
    var pieceId = dragging.dataset.id;
    var dropZone = findMatchingDrop(touch.clientX, touch.clientY, pieceId);

    if (dropZone) {
      // Snap!
      AudioManager.snap();
      dropZone.classList.add('filled');
      dragging.classList.add('placed');
      dragging.classList.remove('dragging');
      dragging.style.cssText = '';
      placedCount++;

      var fact = L(facts[placedCount - 1]) || '';
      var factEl = document.getElementById('dragdrop-fact');
      if (factEl && fact) factEl.textContent = fact;

      updateProgress();

      if (placedCount >= totalPieces) {
        setTimeout(onComplete, 800);
      }
    } else {
      // Return to pieces area
      dragging.classList.remove('dragging');
      dragging.style.cssText = '';
      AudioManager.wrong();
    }

    container.querySelectorAll('.drop-zone').forEach(function (dz) { dz.classList.remove('highlight'); });
    dragging = null;
  }

  function findNearestDrop(x, y) {
    var dropZones = container.querySelectorAll('.drop-zone:not(.filled)');
    var closest = null, closestDist = Infinity;
    dropZones.forEach(function (dz) {
      var svg = dz.closest('svg');
      if (!svg) return;
      var svgRect = svg.getBoundingClientRect();
      var bbox = dz.getBBox();
      var scaleX = svgRect.width / svg.viewBox.baseVal.width;
      var scaleY = svgRect.height / svg.viewBox.baseVal.height;
      var cx = svgRect.left + (bbox.x + bbox.width / 2) * scaleX;
      var cy = svgRect.top + (bbox.y + bbox.height / 2) * scaleY;
      var dist = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
      if (dist < closestDist) {
        closestDist = dist;
        closest = dz;
      }
    });
    return closestDist < 60 ? closest : null;
  }

  function findMatchingDrop(x, y, pieceId) {
    var dropZones = container.querySelectorAll('.drop-zone:not(.filled)');
    var match = null;
    dropZones.forEach(function (dz) {
      if (dz.dataset.id !== pieceId) return;
      var svg = dz.closest('svg');
      if (!svg) return;
      var svgRect = svg.getBoundingClientRect();
      var bbox = dz.getBBox();
      var scaleX = svgRect.width / svg.viewBox.baseVal.width;
      var scaleY = svgRect.height / svg.viewBox.baseVal.height;
      var cx = svgRect.left + (bbox.x + bbox.width / 2) * scaleX;
      var cy = svgRect.top + (bbox.y + bbox.height / 2) * scaleY;
      var dist = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
      if (dist < 60) match = dz;
    });
    return match;
  }

  function updateProgress() {
    var prog = document.getElementById('game-progress');
    if (prog) prog.textContent = placedCount + '/' + totalPieces;
  }

  function destroy() {
    document.removeEventListener('touchmove', onDragMove);
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('touchend', onDragEnd);
    document.removeEventListener('mouseup', onDragEnd);
    dragging = null;
    if (container) container.innerHTML = '';
  }

  return { start: start, destroy: destroy };
})();
