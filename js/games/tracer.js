/* ===== Tracer Game ===== */
window.TracerGame = (function () {
  var container, onComplete;
  var tracePath, viewBox, shapeLabel, strokeColor, guideColor, strokeWidth, threshold;
  var samplePoints, covered, numSamples;
  var isDrawing, userPoints, coveragePercent;
  var boundMove, boundEnd, rafId;

  var NUM_SAMPLES = 50;

  function start(config, gameArea, done) {
    container = gameArea;
    onComplete = done;
    tracePath = config.tracePath || '';
    viewBox = config.viewBox || '0 0 300 300';
    shapeLabel = config.shapeLabel || {};
    strokeColor = config.strokeColor || '#f1c40f';
    guideColor = config.guideColor || '#dfe6e9';
    strokeWidth = config.strokeWidth || 20;
    threshold = config.completionThreshold || 0.75;
    numSamples = NUM_SAMPLES;
    samplePoints = [];
    covered = [];
    isDrawing = false;
    userPoints = [];
    coveragePercent = 0;
    rafId = null;

    render();
    sampleGuidePath();
    bindEvents();
    updateProgress();
  }

  function render() {
    var html = '<style>';
    html += '.tracer-container {';
    html += '  display: flex; flex-direction: column; align-items: center;';
    html += '  gap: 12px; width: 100%;';
    html += '}';
    html += '.tracer-label {';
    html += '  font-family: var(--font-title); font-weight: 800;';
    html += '  font-size: clamp(1.2rem, 4vw, 1.6rem); text-align: center;';
    html += '  color: var(--theme-primary, #00b894);';
    html += '}';
    html += '.tracer-canvas {';
    html += '  position: relative; width: 100%; max-width: 400px;';
    html += '  background: var(--color-white); border-radius: var(--radius-medium);';
    html += '  box-shadow: var(--shadow-soft); overflow: hidden;';
    html += '  touch-action: none; cursor: crosshair;';
    html += '}';
    html += '.tracer-canvas svg { display: block; width: 100%; height: auto; }';
    html += '.tracer-progress-bar {';
    html += '  width: 100%; max-width: 400px; height: 20px;';
    html += '  background: #ecf0f1; border-radius: 10px; overflow: hidden;';
    html += '  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);';
    html += '}';
    html += '.tracer-progress-fill {';
    html += '  height: 100%; border-radius: 10px;';
    html += '  transition: width var(--transition-fast);';
    html += '  background: linear-gradient(90deg, var(--color-success), #55efc4);';
    html += '}';
    html += '.tracer-percent {';
    html += '  font-family: var(--font-body); font-weight: 800;';
    html += '  font-size: clamp(1rem, 3vw, 1.3rem); text-align: center;';
    html += '  color: var(--theme-primary, #00b894);';
    html += '}';
    html += '.tracer-controls {';
    html += '  display: flex; gap: 12px;';
    html += '}';
    html += '.tracer-reset-btn {';
    html += '  font-family: var(--font-body); font-weight: 700;';
    html += '  font-size: clamp(0.85rem, 2.5vw, 1rem); padding: 10px 20px;';
    html += '  border: 2px solid #dfe6e9; border-radius: var(--radius-small);';
    html += '  background: var(--color-white); cursor: pointer;';
    html += '  touch-action: manipulation; transition: all var(--transition-fast);';
    html += '}';
    html += '.tracer-reset-btn:active { transform: scale(0.95); }';
    html += '</style>';

    html += '<div class="tracer-container">';
    html += '<div class="tracer-label">' + L(shapeLabel) + '</div>';

    // SVG drawing surface
    html += '<div class="tracer-canvas" id="tracer-canvas">';
    html += '<svg id="tracer-svg" viewBox="' + viewBox + '" xmlns="http://www.w3.org/2000/svg">';

    // Guide path (dotted outline)
    html += '<path id="tracer-guide" d="' + tracePath + '"';
    html += ' fill="none" stroke="' + guideColor + '"';
    html += ' stroke-width="' + strokeWidth + '" stroke-linecap="round"';
    html += ' stroke-linejoin="round" stroke-dasharray="4 8" />';

    // Covered segments will be rendered as individual path segments
    html += '<g id="tracer-covered"></g>';

    // User stroke (polyline drawn by player)
    html += '<polyline id="tracer-stroke" fill="none"';
    html += ' stroke="' + strokeColor + '" stroke-width="' + strokeWidth + '"';
    html += ' stroke-linecap="round" stroke-linejoin="round" opacity="0.7" />';

    html += '</svg>';
    html += '</div>';

    // Progress bar
    html += '<div class="tracer-progress-bar">';
    html += '<div class="tracer-progress-fill" id="tracer-fill" style="width: 0%;"></div>';
    html += '</div>';
    html += '<div class="tracer-percent" id="tracer-percent">0%</div>';

    // Reset button
    html += '<div class="tracer-controls">';
    html += '<button class="tracer-reset-btn" id="tracer-reset">';
    html += L({es: 'Empezar de nuevo', en: 'Start over', ca: 'Tornar a comencar'});
    html += '</button>';
    html += '</div>';

    html += '</div>';
    container.innerHTML = html;
  }

  function sampleGuidePath() {
    var svgEl = container.querySelector('#tracer-guide');
    if (!svgEl) return;

    var totalLength = svgEl.getTotalLength();
    samplePoints = [];
    covered = [];

    for (var i = 0; i < numSamples; i++) {
      var t = (i / (numSamples - 1)) * totalLength;
      var pt = svgEl.getPointAtLength(t);
      samplePoints.push({ x: pt.x, y: pt.y });
      covered.push(false);
    }
  }

  function bindEvents() {
    var canvas = container.querySelector('#tracer-canvas');
    if (!canvas) return;

    var downHandler = function (e) {
      e.preventDefault();
      isDrawing = true;
      userPoints = [];
      // Clear previous stroke
      var strokeEl = container.querySelector('#tracer-stroke');
      if (strokeEl) strokeEl.setAttribute('points', '');
      handlePointerAt(e);
    };

    var moveHandler = function (e) {
      if (!isDrawing) return;
      e.preventDefault();
      handlePointerAt(e);
    };

    var upHandler = function (e) {
      if (!isDrawing) return;
      isDrawing = false;
    };

    canvas.addEventListener('pointerdown', downHandler);

    boundMove = moveHandler;
    boundEnd = upHandler;
    document.addEventListener('pointermove', boundMove);
    document.addEventListener('pointerup', boundEnd);
    document.addEventListener('pointercancel', boundEnd);

    // Reset button
    var resetBtn = container.querySelector('#tracer-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        resetTracing();
      });
    }
  }

  function handlePointerAt(e) {
    var svg = container.querySelector('#tracer-svg');
    if (!svg) return;

    var rect = svg.getBoundingClientRect();
    var vbParts = viewBox.split(/\s+/);
    var vbW = parseFloat(vbParts[2]) || 300;
    var vbH = parseFloat(vbParts[3]) || 300;

    // Convert pointer coords to SVG coords
    var svgX = ((e.clientX - rect.left) / rect.width) * vbW;
    var svgY = ((e.clientY - rect.top) / rect.height) * vbH;

    userPoints.push({ x: svgX, y: svgY });

    // Update polyline stroke
    updateStroke();

    // Check coverage
    checkCoverage(svgX, svgY);
    updateVisuals();
    updateProgress();
  }

  function updateStroke() {
    var strokeEl = container.querySelector('#tracer-stroke');
    if (!strokeEl) return;

    var pts = '';
    for (var i = 0; i < userPoints.length; i++) {
      pts += userPoints[i].x.toFixed(1) + ',' + userPoints[i].y.toFixed(1);
      if (i < userPoints.length - 1) pts += ' ';
    }
    strokeEl.setAttribute('points', pts);
  }

  function checkCoverage(px, py) {
    var hitRadius = strokeWidth;
    var anyNew = false;
    for (var i = 0; i < samplePoints.length; i++) {
      if (covered[i]) continue;
      var dx = px - samplePoints[i].x;
      var dy = py - samplePoints[i].y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= hitRadius) {
        covered[i] = true;
        anyNew = true;
      }
    }
    if (anyNew) {
      AudioManager.tap();
    }

    // Compute coverage
    var count = 0;
    for (var j = 0; j < covered.length; j++) {
      if (covered[j]) count++;
    }
    coveragePercent = count / numSamples;

    // Check completion
    if (coveragePercent >= threshold) {
      isDrawing = false;
      AudioManager.correct();
      showCompletionText();
      setTimeout(onComplete, 600);
    }
  }

  function updateVisuals() {
    // Update covered segment visuals
    var coveredGroup = container.querySelector('#tracer-covered');
    if (!coveredGroup) return;

    // Build segments of consecutive covered points for efficient rendering
    var html = '';
    var guideEl = container.querySelector('#tracer-guide');
    if (!guideEl) return;
    var totalLength = guideEl.getTotalLength();

    // Render covered segments as circles at sample points
    for (var i = 0; i < samplePoints.length; i++) {
      if (covered[i]) {
        html += '<circle cx="' + samplePoints[i].x.toFixed(1) + '"';
        html += ' cy="' + samplePoints[i].y.toFixed(1) + '"';
        html += ' r="' + (strokeWidth * 0.5) + '"';
        html += ' fill="' + strokeColor + '" opacity="0.4" />';
      }
    }
    // Add guide dots (3 glowing dots at next uncovered segment)
    var guideDotCount = 0;
    for (var j = 0; j < samplePoints.length && guideDotCount < 3; j++) {
      if (!covered[j]) {
        html += '<circle class="tracer-guide-dot"';
        html += ' cx="' + samplePoints[j].x.toFixed(1) + '"';
        html += ' cy="' + samplePoints[j].y.toFixed(1) + '"';
        html += ' r="7" />';
        guideDotCount++;
      }
    }

    coveredGroup.innerHTML = html;

    // Update progress bar
    var pct = Math.min(Math.round(coveragePercent * 100), 100);
    var fillEl = container.querySelector('#tracer-fill');
    if (fillEl) fillEl.style.width = pct + '%';

    var pctEl = container.querySelector('#tracer-percent');
    if (pctEl) pctEl.textContent = pct + '%';
  }

  function showCompletionText() {
    var svg = container.querySelector('#tracer-svg');
    if (!svg) return;
    var vbParts = viewBox.split(/\s+/);
    var vbW = parseFloat(vbParts[2]) || 300;
    var vbH = parseFloat(vbParts[3]) || 300;
    var textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textEl.setAttribute('class', 'tracer-completion-text');
    textEl.setAttribute('x', vbW / 2);
    textEl.setAttribute('y', vbH / 2);
    textEl.textContent = t('amazing');
    svg.appendChild(textEl);
  }

  function resetTracing() {
    isDrawing = false;
    userPoints = [];
    coveragePercent = 0;

    for (var i = 0; i < covered.length; i++) {
      covered[i] = false;
    }

    var strokeEl = container.querySelector('#tracer-stroke');
    if (strokeEl) strokeEl.setAttribute('points', '');

    var coveredGroup = container.querySelector('#tracer-covered');
    if (coveredGroup) coveredGroup.innerHTML = '';

    var fillEl = container.querySelector('#tracer-fill');
    if (fillEl) fillEl.style.width = '0%';

    var pctEl = container.querySelector('#tracer-percent');
    if (pctEl) pctEl.textContent = '0%';

    updateProgress();
    AudioManager.tap();
  }

  function updateProgress() {
    var pct = Math.min(Math.round(coveragePercent * 100), 100);
    var prog = document.getElementById('game-progress');
    if (prog) prog.textContent = pct + '%';
  }

  function destroy() {
    isDrawing = false;
    if (boundMove) {
      document.removeEventListener('pointermove', boundMove);
      document.removeEventListener('pointerup', boundEnd);
      document.removeEventListener('pointercancel', boundEnd);
    }
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    boundMove = null;
    boundEnd = null;
    if (container) container.innerHTML = '';
  }

  return { start: start, destroy: destroy };
})();
