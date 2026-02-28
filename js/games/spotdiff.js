/* ===== Spot the Difference Game ===== */
window.SpotDiffGame = (function () {
  var container, onComplete, differences, foundSet, totalDiffs;
  var boundHandlers = [];

  function start(config, gameArea, done) {
    container = gameArea;
    onComplete = done;
    differences = config.differences || [];
    totalDiffs = config.totalDifferences || differences.length;
    foundSet = {};
    boundHandlers = [];
    render(config);
    bindEvents();
    updateProgress();
  }

  function render(config) {
    var html = '<style>';
    html += '.spotdiff-container {';
    html += '  display: flex; flex-direction: column; align-items: center;';
    html += '  gap: 12px; width: 100%;';
    html += '}';
    html += '.spotdiff-panels {';
    html += '  display: flex; gap: 12px; width: 100%; max-width: 600px;';
    html += '  justify-content: center; align-items: flex-start;';
    html += '}';
    html += '@media (max-width: 499px) {';
    html += '  .spotdiff-panels { flex-direction: column; align-items: center; }';
    html += '  .spotdiff-panel { width: 100% !important; max-width: 300px; }';
    html += '}';
    html += '@media (min-width: 500px) {';
    html += '  .spotdiff-panel { width: 50%; }';
    html += '}';
    html += '.spotdiff-panel {';
    html += '  position: relative; border-radius: var(--radius-medium);';
    html += '  background: var(--color-white); box-shadow: var(--shadow-soft);';
    html += '  overflow: hidden;';
    html += '}';
    html += '.spotdiff-panel svg { display: block; width: 100%; height: auto; }';
    html += '.spotdiff-panel-label {';
    html += '  position: absolute; top: 6px; left: 50%; transform: translateX(-50%);';
    html += '  font-family: var(--font-body); font-weight: 800;';
    html += '  font-size: 0.7rem; color: var(--color-white);';
    html += '  background: rgba(0,0,0,0.35); padding: 2px 10px;';
    html += '  border-radius: var(--radius-small); pointer-events: none; z-index: 5;';
    html += '}';
    html += '.spotdiff-overlay {';
    html += '  position: absolute; inset: 0; cursor: pointer;';
    html += '  touch-action: manipulation; z-index: 3;';
    html += '}';
    html += '.spotdiff-counter {';
    html += '  font-family: var(--font-body); font-weight: 800;';
    html += '  font-size: clamp(1rem, 3vw, 1.3rem); text-align: center;';
    html += '  color: var(--theme-primary, #00b894);';
    html += '}';
    html += '.spotdiff-feedback {';
    html += '  font-family: var(--font-body); font-weight: 700;';
    html += '  font-size: clamp(0.85rem, 2.5vw, 1rem); text-align: center;';
    html += '  min-height: 1.5em; color: var(--color-success);';
    html += '  transition: opacity var(--transition-fast);';
    html += '}';
    html += '.spotdiff-found-marker {';
    html += '  position: absolute; border-radius: 50%;';
    html += '  border: 3px solid var(--color-success); pointer-events: none;';
    html += '  z-index: 4; animation: spotdiff-pulse 1.5s ease-in-out infinite;';
    html += '  box-shadow: 0 0 8px rgba(0,184,148,0.5);';
    html += '}';
    html += '@keyframes spotdiff-pulse {';
    html += '  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }';
    html += '  50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.7; }';
    html += '}';
    html += '@keyframes spotdiff-shake {';
    html += '  0%, 100% { transform: translateX(0); }';
    html += '  20% { transform: translateX(-4px); }';
    html += '  40% { transform: translateX(4px); }';
    html += '  60% { transform: translateX(-3px); }';
    html += '  80% { transform: translateX(3px); }';
    html += '}';
    html += '.spotdiff-shake { animation: spotdiff-shake 0.4s ease; }';
    html += '</style>';

    html += '<div class="spotdiff-container">';
    html += '<div class="spotdiff-counter" id="spotdiff-counter"></div>';
    html += '<div class="spotdiff-panels">';

    // Left panel - original
    html += '<div class="spotdiff-panel" id="spotdiff-left">';
    html += '<div class="spotdiff-panel-label">Original</div>';
    html += config.baseSVG;
    html += '</div>';

    // Right panel - modified (with tap overlay)
    html += '<div class="spotdiff-panel" id="spotdiff-right">';
    html += '<div class="spotdiff-panel-label">' + (L({es: 'Modificado', en: 'Modified', ca: 'Modificat'}) || 'Modified') + '</div>';
    html += config.modifiedSVG;
    html += '<div class="spotdiff-overlay" id="spotdiff-overlay"></div>';
    html += '</div>';

    html += '</div>';
    html += '<div class="spotdiff-feedback" id="spotdiff-feedback"></div>';
    html += '</div>';

    container.innerHTML = html;
  }

  function bindEvents() {
    var overlay = container.querySelector('#spotdiff-overlay');
    if (!overlay) return;
    var handler = function (e) {
      e.preventDefault();
      handleTap(e);
    };
    overlay.addEventListener('pointerdown', handler);
    boundHandlers.push({ el: overlay, event: 'pointerdown', fn: handler });
  }

  function handleTap(e) {
    var panel = container.querySelector('#spotdiff-right');
    if (!panel) return;

    var svg = panel.querySelector('svg');
    if (!svg) return;

    var rect = svg.getBoundingClientRect();
    // Get SVG viewBox dimensions
    var vb = svg.viewBox.baseVal;
    var vbWidth = vb.width || 200;
    var vbHeight = vb.height || 200;

    // Convert screen coords to SVG coords
    var clientX = e.clientX;
    var clientY = e.clientY;
    var svgX = ((clientX - rect.left) / rect.width) * vbWidth;
    var svgY = ((clientY - rect.top) / rect.height) * vbHeight;

    // Check if tap is near any unfound difference
    var hitDiff = null;
    for (var i = 0; i < differences.length; i++) {
      var diff = differences[i];
      if (foundSet[diff.id]) continue;
      var dx = svgX - diff.cx;
      var dy = svgY - diff.cy;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= diff.radius) {
        hitDiff = diff;
        break;
      }
    }

    if (hitDiff) {
      onFoundDifference(hitDiff, panel, rect, vbWidth, vbHeight);
    } else {
      onMiss(panel);
    }
  }

  function onFoundDifference(diff, panel, rect, vbWidth, vbHeight) {
    foundSet[diff.id] = true;
    AudioManager.correct();

    // Place marker on the modified panel (right)
    var scaleX = rect.width / vbWidth;
    var scaleY = rect.height / vbHeight;
    var markerSize = diff.radius * 2 * Math.max(scaleX, scaleY);

    var marker = document.createElement('div');
    marker.className = 'spotdiff-found-marker';
    marker.style.width = markerSize + 'px';
    marker.style.height = markerSize + 'px';
    marker.style.left = ((diff.cx / vbWidth) * 100) + '%';
    marker.style.top = ((diff.cy / vbHeight) * 100) + '%';
    panel.appendChild(marker);

    // Also mark on original panel
    var leftPanel = container.querySelector('#spotdiff-left');
    if (leftPanel) {
      var markerL = document.createElement('div');
      markerL.className = 'spotdiff-found-marker';
      markerL.style.width = markerSize + 'px';
      markerL.style.height = markerSize + 'px';
      markerL.style.left = ((diff.cx / vbWidth) * 100) + '%';
      markerL.style.top = ((diff.cy / vbHeight) * 100) + '%';
      leftPanel.appendChild(markerL);
    }

    // Show description
    var feedback = container.querySelector('#spotdiff-feedback');
    if (feedback) {
      feedback.textContent = L(diff.description) || '';
      feedback.style.opacity = '1';
      setTimeout(function () {
        if (feedback) feedback.style.opacity = '0';
      }, 2000);
    }

    updateProgress();

    // Check completion
    var foundCount = Object.keys(foundSet).length;
    if (foundCount >= totalDiffs) {
      setTimeout(onComplete, 800);
    }
  }

  function onMiss(panel) {
    AudioManager.wrong();
    panel.classList.add('spotdiff-shake');
    setTimeout(function () {
      panel.classList.remove('spotdiff-shake');
    }, 400);
  }

  function updateProgress() {
    var foundCount = Object.keys(foundSet).length;
    var counter = container.querySelector('#spotdiff-counter');
    if (counter) {
      counter.textContent = L({es: 'Encontrados', en: 'Found', ca: 'Trobats'}) + ': ' + foundCount + '/' + totalDiffs;
    }
    var prog = document.getElementById('game-progress');
    if (prog) prog.textContent = foundCount + '/' + totalDiffs;
  }

  function destroy() {
    boundHandlers.forEach(function (h) {
      h.el.removeEventListener(h.event, h.fn);
    });
    boundHandlers = [];
    foundSet = {};
    if (container) container.innerHTML = '';
  }

  return { start: start, destroy: destroy };
})();
