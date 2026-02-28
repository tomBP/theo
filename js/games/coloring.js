/* ===== Coloring Game ===== */
window.ColoringGame = (function () {
  var regions, totalRegions, filledCount, selectedColor;
  var container, onComplete;
  var palette = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#e84393', '#00cec9'];

  function start(config, gameArea, done) {
    regions = {};
    totalRegions = config.regionCount || 12;
    filledCount = 0;
    selectedColor = null;
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
        var wasEmpty = !regions[regionId];
        regions[regionId] = selectedColor;
        region.style.fill = selectedColor;
        AudioManager.tap();

        if (wasEmpty) {
          filledCount++;
          var prog = document.getElementById('coloring-progress');
          if (prog) prog.textContent = filledCount + '/' + totalRegions + ' ' + t('colored');

          if (filledCount >= totalRegions) {
            AudioManager.fanfare();
            setTimeout(onComplete, 600);
          }
        }
      });
    });
  }

  function destroy() {
    if (container) container.innerHTML = '';
  }

  return { start: start, destroy: destroy };
})();
