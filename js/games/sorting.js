/* ===== Sorting Game ===== */
window.SortingGame = (function () {
  var container, onComplete, categories, items, facts;
  var sortedCount, totalItems;
  var dragging = null, dragOffsetX = 0, dragOffsetY = 0;
  var selectedItemId = null;
  var boundMove, boundEnd;

  function start(config, gameArea, done) {
    container = gameArea;
    onComplete = done;
    categories = config.categories || [];
    items = (config.items || []).map(function (item) {
      return { id: item.id, label: item.label, emoji: item.emoji, category: item.category, sorted: false };
    });
    facts = config.facts || [];
    totalItems = items.length;
    sortedCount = 0;
    dragging = null;
    selectedItemId = null;

    // Shuffle items
    items.sort(function () { return Math.random() - 0.5; });

    render();
    bindEvents();
    updateProgress();
  }

  function render() {
    var html = '<style>';
    html += '.sorting-container {';
    html += '  display: flex; flex-direction: column; align-items: center;';
    html += '  gap: 16px; width: 100%; height: 100%; position: relative;';
    html += '}';
    html += '.sorting-counter {';
    html += '  font-family: var(--font-body); font-weight: 800;';
    html += '  font-size: clamp(1rem, 3vw, 1.3rem); text-align: center;';
    html += '  color: var(--theme-primary, #00b894);';
    html += '}';
    html += '.sorting-items {';
    html += '  display: flex; flex-wrap: wrap; gap: 10px;';
    html += '  justify-content: center; padding: 10px; width: 100%;';
    html += '  max-width: 500px; min-height: 80px;';
    html += '}';
    html += '.sorting-item {';
    html += '  display: flex; flex-direction: column; align-items: center;';
    html += '  justify-content: center; gap: 2px;';
    html += '  padding: 10px 14px; background: var(--color-white);';
    html += '  border-radius: var(--radius-small); box-shadow: var(--shadow-soft);';
    html += '  cursor: grab; touch-action: none; user-select: none;';
    html += '  transition: transform var(--transition-fast), box-shadow var(--transition-fast);';
    html += '  min-width: 70px;';
    html += '}';
    html += '.sorting-item:active { cursor: grabbing; }';
    html += '.sorting-item-emoji {';
    html += '  font-size: clamp(1.5rem, 5vw, 2rem); line-height: 1;';
    html += '}';
    html += '.sorting-item-label {';
    html += '  font-family: var(--font-body); font-weight: 700;';
    html += '  font-size: clamp(0.7rem, 2vw, 0.85rem); text-align: center;';
    html += '}';
    html += '.sorting-item.dragging {';
    html += '  position: fixed; z-index: 1000; transform: scale(1.1);';
    html += '  box-shadow: var(--shadow-heavy); pointer-events: none;';
    html += '}';
    html += '.sorting-item.sorted {';
    html += '  opacity: 0.3; pointer-events: none;';
    html += '}';
    html += '.sorting-item.selected {';
    html += '  border: 3px solid var(--theme-primary, #00b894);';
    html += '  transform: scale(1.05); box-shadow: var(--shadow-medium);';
    html += '}';
    html += '.sorting-buckets {';
    html += '  display: flex; gap: 12px; width: 100%; max-width: 500px;';
    html += '  justify-content: center; flex-wrap: wrap; padding: 10px;';
    html += '}';
    html += '.sorting-bucket {';
    html += '  flex: 1; min-width: 100px; max-width: 180px;';
    html += '  min-height: 80px; border-radius: var(--radius-medium);';
    html += '  display: flex; flex-direction: column; align-items: center;';
    html += '  justify-content: center; gap: 6px; padding: 14px 10px;';
    html += '  cursor: pointer; touch-action: manipulation;';
    html += '  transition: transform var(--transition-fast), box-shadow var(--transition-fast);';
    html += '  border: 3px dashed rgba(255,255,255,0.6);';
    html += '}';
    html += '.sorting-bucket:active { transform: scale(0.97); }';
    html += '.sorting-bucket-label {';
    html += '  font-family: var(--font-body); font-weight: 800;';
    html += '  font-size: clamp(0.85rem, 2.5vw, 1.1rem); color: var(--color-white);';
    html += '  text-align: center; text-shadow: 0 1px 3px rgba(0,0,0,0.2);';
    html += '}';
    html += '.sorting-bucket-count {';
    html += '  font-family: var(--font-body); font-weight: 700;';
    html += '  font-size: 0.75rem; color: rgba(255,255,255,0.8);';
    html += '}';
    html += '.sorting-bucket.highlight {';
    html += '  transform: scale(1.05); box-shadow: var(--shadow-medium);';
    html += '  border-style: solid;';
    html += '}';
    html += '@keyframes sorting-shake {';
    html += '  0%, 100% { transform: translateX(0); }';
    html += '  20% { transform: translateX(-5px); }';
    html += '  40% { transform: translateX(5px); }';
    html += '  60% { transform: translateX(-3px); }';
    html += '  80% { transform: translateX(3px); }';
    html += '}';
    html += '.sorting-bucket-shake { animation: sorting-shake 0.4s ease; }';
    html += '.sorting-fact {';
    html += '  font-family: var(--font-body); font-weight: 700;';
    html += '  font-size: clamp(0.85rem, 2.5vw, 1rem); text-align: center;';
    html += '  min-height: 1.5em; color: var(--theme-primary, #00b894);';
    html += '  padding: 0 10px;';
    html += '}';
    html += '</style>';

    html += '<div class="sorting-container">';
    html += '<div class="sorting-counter" id="sorting-counter"></div>';

    // Items area
    html += '<div class="sorting-items" id="sorting-items">';
    items.forEach(function (item) {
      html += '<div class="sorting-item" data-id="' + item.id + '" id="sort-item-' + item.id + '">';
      html += '<span class="sorting-item-emoji">' + item.emoji + '</span>';
      html += '<span class="sorting-item-label">' + L(item.label) + '</span>';
      html += '</div>';
    });
    html += '</div>';

    html += '<div class="sorting-fact" id="sorting-fact"></div>';

    // Buckets
    html += '<div class="sorting-buckets" id="sorting-buckets">';
    categories.forEach(function (cat) {
      html += '<div class="sorting-bucket" data-category="' + cat.id + '" id="bucket-' + cat.id + '"';
      html += ' style="background: ' + cat.color + ';">';
      html += '<div class="sorting-bucket-label">' + L(cat.label) + '</div>';
      html += '<div class="sorting-bucket-count" id="bucket-count-' + cat.id + '"></div>';
      html += '</div>';
    });
    html += '</div>';

    html += '</div>';
    container.innerHTML = html;
  }

  function bindEvents() {
    // Pointer drag on items
    container.querySelectorAll('.sorting-item').forEach(function (el) {
      el.addEventListener('pointerdown', onPointerDown);
    });

    // Tap on buckets (for tap-to-place accessibility)
    container.querySelectorAll('.sorting-bucket').forEach(function (el) {
      el.addEventListener('pointerdown', onBucketTap);
    });

    boundMove = function (e) { onPointerMove(e); };
    boundEnd = function (e) { onPointerEnd(e); };
    document.addEventListener('pointermove', boundMove);
    document.addEventListener('pointerup', boundEnd);
    document.addEventListener('pointercancel', boundEnd);
  }

  function onPointerDown(e) {
    var el = e.currentTarget;
    if (el.classList.contains('sorted')) return;
    e.preventDefault();

    var itemId = el.dataset.id;

    // If no drag happens (very short), treat as tap-select
    var rect = el.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;

    // Deselect previous selection if different
    if (selectedItemId && selectedItemId !== itemId) {
      var prev = container.querySelector('#sort-item-' + selectedItemId);
      if (prev) prev.classList.remove('selected');
    }

    selectedItemId = itemId;
    el.classList.add('selected');

    dragging = el;
    el.classList.add('dragging');
    el.style.left = (e.clientX - dragOffsetX) + 'px';
    el.style.top = (e.clientY - dragOffsetY) + 'px';
    el.style.width = rect.width + 'px';
    el.style.height = rect.height + 'px';
    el.setPointerCapture(e.pointerId);
    AudioManager.tap();
  }

  function onPointerMove(e) {
    if (!dragging) return;
    e.preventDefault();
    dragging.style.left = (e.clientX - dragOffsetX) + 'px';
    dragging.style.top = (e.clientY - dragOffsetY) + 'px';

    // Highlight bucket under pointer
    var buckets = container.querySelectorAll('.sorting-bucket');
    buckets.forEach(function (b) { b.classList.remove('highlight'); });
    var bucket = findBucketAt(e.clientX, e.clientY);
    if (bucket) bucket.classList.add('highlight');
  }

  function onPointerEnd(e) {
    if (!dragging) return;
    var el = dragging;
    dragging = null;

    el.classList.remove('dragging');
    el.style.cssText = '';

    var bucket = findBucketAt(e.clientX, e.clientY);
    container.querySelectorAll('.sorting-bucket').forEach(function (b) { b.classList.remove('highlight'); });

    if (bucket) {
      attemptSort(el.dataset.id, bucket.dataset.category, bucket);
    }
  }

  function onBucketTap(e) {
    // If an item is selected (tap mode) and user taps a bucket, attempt sort
    if (!selectedItemId) return;
    if (dragging) return; // Don't double-handle during drag

    var bucket = e.currentTarget;
    var itemId = selectedItemId;
    selectedItemId = null;

    var itemEl = container.querySelector('#sort-item-' + itemId);
    if (itemEl) itemEl.classList.remove('selected');

    attemptSort(itemId, bucket.dataset.category, bucket);
  }

  function attemptSort(itemId, bucketCategoryId, bucketEl) {
    var item = null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === itemId) { item = items[i]; break; }
    }
    if (!item || item.sorted) return;

    if (item.category === bucketCategoryId) {
      // Correct!
      item.sorted = true;
      sortedCount++;
      AudioManager.snap();

      var itemEl = container.querySelector('#sort-item-' + itemId);
      if (itemEl) {
        itemEl.classList.add('sorted');
        itemEl.classList.remove('selected');
      }

      // Show fact
      var fact = L(facts[sortedCount - 1]) || '';
      var factEl = container.querySelector('#sorting-fact');
      if (factEl && fact) factEl.textContent = fact;

      selectedItemId = null;
      updateProgress();

      if (sortedCount >= totalItems) {
        setTimeout(onComplete, 800);
      }
    } else {
      // Wrong - shake the bucket
      AudioManager.wrong();
      bucketEl.classList.add('sorting-bucket-shake');
      setTimeout(function () {
        bucketEl.classList.remove('sorting-bucket-shake');
      }, 400);

      // Reset item selection
      var itemEl = container.querySelector('#sort-item-' + itemId);
      if (itemEl) itemEl.classList.remove('selected');
      selectedItemId = null;
    }
  }

  function findBucketAt(x, y) {
    var buckets = container.querySelectorAll('.sorting-bucket');
    for (var i = 0; i < buckets.length; i++) {
      var rect = buckets[i].getBoundingClientRect();
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return buckets[i];
      }
    }
    return null;
  }

  function updateProgress() {
    var counter = container.querySelector('#sorting-counter');
    if (counter) {
      counter.textContent = L({es: 'Ordenados', en: 'Sorted', ca: 'Ordenats'}) + ': ' + sortedCount + '/' + totalItems;
    }
    var prog = document.getElementById('game-progress');
    if (prog) prog.textContent = sortedCount + '/' + totalItems;
  }

  function destroy() {
    if (boundMove) {
      document.removeEventListener('pointermove', boundMove);
      document.removeEventListener('pointerup', boundEnd);
      document.removeEventListener('pointercancel', boundEnd);
    }
    boundMove = null;
    boundEnd = null;
    dragging = null;
    selectedItemId = null;
    if (container) container.innerHTML = '';
  }

  return { start: start, destroy: destroy };
})();
