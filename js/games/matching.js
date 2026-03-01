/* ===== Memory Card Matching Game ===== */
window.MatchingGame = (function () {
  var cards, container, onComplete, matchedCount, totalPairs;
  var flipped = [], locked = false, facts;
  var flipCount, consecutiveMatches;

  function start(config, gameArea, done) {
    facts = config.facts || [];
    totalPairs = config.pairs.length;
    matchedCount = 0;
    flipCount = 0;
    consecutiveMatches = 0;
    flipped = [];
    locked = false;
    onComplete = done;
    container = gameArea;

    // Create card deck: each pair becomes 2 cards
    cards = [];
    config.pairs.forEach(function (pair, i) {
      cards.push({ id: i, pairId: pair.id, label: L(pair.labelA), type: 'A' });
      cards.push({ id: i, pairId: pair.id, label: L(pair.labelB), type: 'B' });
    });
    // Shuffle
    cards.sort(function () { return Math.random() - 0.5; });

    render(config.gridClass || 'grid-2x4');
    bindEvents();
  }

  function render(gridClass) {
    var html = '<div class="matching-container">';
    html += '<div class="matching-flips" id="matching-flips">' + t('flips') + ': 0</div>';
    html += '<div class="matching-streak-text" id="matching-streak"></div>';
    html += '<div class="matching-grid ' + gridClass + '">';
    cards.forEach(function (card, i) {
      html += '<div class="matching-card" data-index="' + i + '" data-pair="' + card.id + '">';
      html += '<div class="matching-card-inner">';
      html += '<div class="matching-card-front">' + Icons.questionMark() + '</div>';
      html += '<div class="matching-card-back">' + card.label + '</div>';
      html += '</div></div>';
    });
    html += '</div>';
    html += '<div class="matching-fact" id="matching-fact"></div>';
    html += '</div>';
    container.innerHTML = html;
  }

  function bindEvents() {
    container.querySelectorAll('.matching-card').forEach(function (el) {
      el.addEventListener('click', onCardClick);
    });
  }

  function onCardClick(e) {
    if (locked) return;
    var card = e.currentTarget;
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

    AudioManager.flip();
    card.classList.add('flipped');
    flipped.push(card);
    flipCount++;
    updateFlipDisplay();

    if (flipped.length === 2) {
      locked = true;
      checkMatch();
    }
  }

  function checkMatch() {
    var c1 = flipped[0];
    var c2 = flipped[1];
    var pair1 = c1.dataset.pair;
    var pair2 = c2.dataset.pair;

    if (pair1 === pair2) {
      // Match!
      AudioManager.match();
      c1.classList.add('matched');
      c2.classList.add('matched');
      matchedCount++;
      consecutiveMatches++;

      if (consecutiveMatches >= 2) {
        showStreakText(consecutiveMatches);
      }

      var fact = L(facts[matchedCount - 1]) || '';
      var factEl = document.getElementById('matching-fact');
      if (factEl && fact) factEl.textContent = fact;

      updateProgress();
      flipped = [];
      locked = false;

      if (matchedCount >= totalPairs) {
        setTimeout(onComplete, 800);
      }
    } else {
      // No match — flip back
      AudioManager.wrong();
      consecutiveMatches = 0;
      clearStreakText();
      setTimeout(function () {
        c1.classList.remove('flipped');
        c2.classList.remove('flipped');
        flipped = [];
        locked = false;
      }, 1500);
    }
  }

  function updateFlipDisplay() {
    var el = document.getElementById('matching-flips');
    if (el) el.textContent = t('flips') + ': ' + flipCount;
  }

  function showStreakText(count) {
    var el = document.getElementById('matching-streak');
    if (el) el.textContent = count + ' ' + t('inARow') + '!';
  }

  function clearStreakText() {
    var el = document.getElementById('matching-streak');
    if (el) el.textContent = '';
  }

  function updateProgress() {
    var prog = document.getElementById('game-progress');
    if (prog) prog.textContent = matchedCount + '/' + totalPairs;
  }

  function destroy() {
    flipped = [];
    locked = false;
    if (container) container.innerHTML = '';
  }

  return { start: start, destroy: destroy };
})();
