/* ===== Coloring Game ===== */
window.ColoringGame = (function () {
  var regions, totalRegions, filledCount, selectedColor;
  var container, onComplete;
  var palette = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#e84393', '#00cec9'];
  var history;

  function start(config, gameArea, done) {
    regions = {};
    totalRegions = config.regionCount || 12;
    filledCount = 0;
    selectedColor = null;
    history = [];
    onComplete = done;
    container = gameArea;
    if (config.palette) palette = config.palette;
    var svg = typeof config.svgContent === 'function' ? config.svgContent() : config.svgContent;
    render(svg);
    bindEvents();
  }

  function render(svgContent) {
    var html = '<div class="coloring-container">';
    html += '<div class="coloring-instruction" id="coloring-instruction">' + t('pickColor') + '</div>';
    html += '<div class="coloring-canvas" id="coloring-canvas">' + svgContent + '</div>';
    html += '<div class="coloring-palette" id="coloring-palette">';
    palette.forEach(function (color) {
      html += '<div class="color-swatch" data-color="' + color + '" style="background:' + color + ';"></div>';
    });
    html += '</div>';
    html += '<button class="coloring-undo-btn" id="coloring-undo" disabled>' + t('undo') + '</button>';
    html += '<div class="coloring-progress" id="coloring-progress">' + filledCount + '/' + totalRegions + ' ' + t('colored') + '</div>';
    html += '</div>';
    container.innerHTML = html;
  }

  function bindEvents() {
    // Color palette
    container.querySelectorAll('.color-swatch').forEach(function (swatch) {
      swatch.addEventListener('click', function () {
        container.querySelectorAll('.color-swatch').forEach(function (s) { s.classList.remove('selected'); });
        swatch.classList.add('selected');
        selectedColor = swatch.dataset.color;
        AudioManager.tap();
        var inst = document.getElementById('coloring-instruction');
        if (inst) inst.textContent = t('tapRegion');
      });
    });

    // SVG regions
    container.querySelectorAll('.coloring-region').forEach(function (region) {
      region.addEventListener('click', function () {
        if (!selectedColor) {
          var inst = document.getElementById('coloring-instruction');
          if (inst) inst.textContent = t('pickFirst');
          return;
        }
        var regionId = region.dataset.region;
        var prevColor = regions[regionId] || null;
        var wasEmpty = !regions[regionId];
        regions[regionId] = selectedColor;
        region.style.fill = selectedColor;
        AudioManager.tap();

        // Track history
        history.push({ regionId: regionId, prevColor: prevColor, wasEmpty: wasEmpty });
        updateUndoButton();

        if (wasEmpty) {
          filledCount++;
          updateProgressDisplay();

          if (filledCount >= totalRegions) {
            AudioManager.fanfare();
            setTimeout(onComplete, 600);
          }
        }
      });
    });

    // Undo button
    var undoBtn = document.getElementById('coloring-undo');
    if (undoBtn) {
      undoBtn.addEventListener('click', function () {
        if (history.length === 0) return;
        var entry = history.pop();
        var region = container.querySelector('.coloring-region[data-region="' + entry.regionId + '"]');
        if (region) {
          if (entry.prevColor) {
            regions[entry.regionId] = entry.prevColor;
            region.style.fill = entry.prevColor;
          } else {
            delete regions[entry.regionId];
            region.style.fill = '';
          }
        }
        if (entry.wasEmpty) {
          filledCount--;
          updateProgressDisplay();
        }
        updateUndoButton();
        AudioManager.tap();
      });
    }
  }

  function updateUndoButton() {
    var btn = document.getElementById('coloring-undo');
    if (btn) btn.disabled = history.length === 0;
  }

  function updateProgressDisplay() {
    var prog = document.getElementById('coloring-progress');
    if (prog) prog.textContent = filledCount + '/' + totalRegions + ' ' + t('colored');
  }

  function destroy() {
    if (container) container.innerHTML = '';
  }

  return { start: start, destroy: destroy };
})();
