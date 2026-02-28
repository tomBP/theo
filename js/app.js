/* ===== Screen Router, Navigation, Bootstrap ===== */
window.App = (function () {
  var currentTheme = null;
  var currentLevelIndex = -1;
  var screens = {};

  function init() {
    screens = {
      splash: document.getElementById('screen-splash'),
      theme: document.getElementById('screen-theme'),
      levels: document.getElementById('screen-levels'),
      game: document.getElementById('screen-game'),
      celebration: document.getElementById('screen-celebration')
    };

    // Splash screen illustration
    document.getElementById('splash-illustration').innerHTML =
      DinoSVG.trex() + TruckSVG.gravedigger();

    // Bind language selector
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        I18n.setLang(btn.dataset.lang);
        applyLanguage();
        updateThemeCards();
      });
    });

    // Bind navigation
    document.getElementById('btn-start').addEventListener('click', function () {
      AudioManager.init();
      AudioManager.tap();
      showScreen('theme');
      updateThemeCards();
    });

    document.getElementById('btn-theme-dino').addEventListener('click', function () {
      AudioManager.tap();
      selectTheme('dino');
    });

    document.getElementById('btn-theme-truck').addEventListener('click', function () {
      AudioManager.tap();
      selectTheme('truck');
    });

    document.getElementById('btn-back-themes').addEventListener('click', function () {
      AudioManager.tap();
      Engine.cleanup();
      showScreen('theme');
      updateThemeCards();
    });

    document.getElementById('btn-back-levels').addEventListener('click', function () {
      AudioManager.tap();
      Engine.cleanup();
      showScreen('levels');
      renderLevelGrid();
    });

    document.getElementById('btn-next-level').addEventListener('click', function () {
      AudioManager.tap();
      goToNextLevel();
    });

    // Theme card illustrations
    document.getElementById('theme-dino-illustration').innerHTML = DinoSVG.trex();
    document.getElementById('theme-truck-illustration').innerHTML = TruckSVG.gravedigger();

    // Apply language on init
    applyLanguage();
  }

  function applyLanguage() {
    // Update page title
    document.title = t('pageTitle');

    // Splash
    document.getElementById('splash-title').innerHTML = t('splashTitle');
    document.getElementById('btn-start').textContent = t('tapToStart');

    // Theme select
    document.getElementById('theme-screen-title').textContent = t('chooseAdventure');
    document.getElementById('theme-dino-label').textContent = t('dinosaurs');
    document.getElementById('theme-truck-label').textContent = t('monsterTrucks');

    // Celebration
    document.getElementById('celebration-title').textContent = t('amazing');

    // Language selector active state
    var lang = I18n.getLang();
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  function showScreen(name) {
    Object.keys(screens).forEach(function (key) {
      screens[key].classList.remove('active');
    });
    screens[name].classList.add('active');
  }

  function updateThemeCards() {
    var dinoCount = GameState.getCompletedCount('dino');
    var truckCount = GameState.getCompletedCount('truck');
    document.getElementById('theme-dino-stars').innerHTML =
      Icons.star(true).repeat(dinoCount) + Icons.star(false).repeat(10 - dinoCount) +
      '<br>' + dinoCount + '/10 ' + t('completed');
    document.getElementById('theme-truck-stars').innerHTML =
      Icons.star(true).repeat(truckCount) + Icons.star(false).repeat(10 - truckCount) +
      '<br>' + truckCount + '/10 ' + t('completed');
  }

  function selectTheme(theme) {
    currentTheme = theme;
    document.body.setAttribute('data-theme', theme);
    document.getElementById('levels-title').textContent =
      theme === 'dino' ? t('dinosaurs') : t('monsterTrucks');
    showScreen('levels');
    renderLevelGrid();
  }

  function renderLevelGrid() {
    var grid = document.getElementById('levels-grid');
    var levels = LevelData[currentTheme];
    var levelIds = levels.map(function (l) { return l.id; });

    var html = '';
    levels.forEach(function (level, i) {
      var completed = GameState.isCompleted(level.id);
      var unlocked = GameState.isUnlocked(level.id, levelIds);
      var cls = 'level-btn';
      if (completed) cls += ' completed';
      if (!unlocked) cls += ' locked';

      html += '<button class="' + cls + '" data-index="' + i + '"' +
        (!unlocked ? ' disabled' : '') + '>';
      html += '<div class="level-number">' + (i + 1) + '</div>';

      if (!unlocked) {
        html += '<div class="level-lock">' + Icons.lock() + '</div>';
      } else {
        html += '<div class="level-name">' + L(level.name) + '</div>';
        if (completed) {
          html += '<div class="level-stars">' +
            Icons.star(true) + Icons.star(true) + Icons.star(true) +
            '</div>';
        }
      }

      html += '</button>';
    });

    grid.innerHTML = html;

    // Bind level buttons
    grid.querySelectorAll('.level-btn:not(.locked)').forEach(function (btn) {
      btn.addEventListener('click', function () {
        AudioManager.tap();
        var index = parseInt(btn.dataset.index);
        launchLevel(index);
      });
    });
  }

  function launchLevel(index) {
    currentLevelIndex = index;
    var levels = LevelData[currentTheme];
    var level = levels[index];
    showScreen('game');
    Engine.startLevel(level);
  }

  function showCelebration(levelData) {
    showScreen('celebration');

    // Stars
    var starsEl = document.getElementById('celebration-stars');
    starsEl.innerHTML =
      '<div class="celebration-star">' + Icons.starLarge() + '</div>' +
      '<div class="celebration-star">' + Icons.starLarge() + '</div>' +
      '<div class="celebration-star">' + Icons.starLarge() + '</div>';

    // Illustration
    document.getElementById('celebration-illustration').innerHTML = levelData.illustration();

    // Fact
    document.getElementById('celebration-fact').textContent = L(levelData.keyFact);

    // Celebration title
    document.getElementById('celebration-title').textContent = t('amazing');

    // Confetti
    launchConfetti();

    // Next button label
    var btn = document.getElementById('btn-next-level');
    var levels = LevelData[currentTheme];
    if (currentLevelIndex >= levels.length - 1) {
      btn.textContent = t('backToMenu');
    } else {
      btn.textContent = t('nextLevel');
    }
  }

  function goToNextLevel() {
    var levels = LevelData[currentTheme];
    clearConfetti();
    Engine.cleanup();

    if (currentLevelIndex >= levels.length - 1) {
      // Finished all levels in this theme
      showScreen('theme');
      updateThemeCards();
    } else {
      // Go to next level
      currentLevelIndex++;
      launchLevel(currentLevelIndex);
    }
  }

  function launchConfetti() {
    var container = document.getElementById('confetti-container');
    container.innerHTML = '';
    var colors = ['#e74c3c', '#f39c12', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#e84393', '#00cec9'];

    for (var i = 0; i < 50; i++) {
      var piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = (2 + Math.random() * 3) + 's';
      piece.style.animationDelay = Math.random() * 2 + 's';
      var size = 6 + Math.random() * 10;
      piece.style.width = size + 'px';
      piece.style.height = size + 'px';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      container.appendChild(piece);
    }
  }

  function clearConfetti() {
    var container = document.getElementById('confetti-container');
    if (container) container.innerHTML = '';
  }

  // Bootstrap
  document.addEventListener('DOMContentLoaded', init);

  return {
    showCelebration: showCelebration,
    showScreen: showScreen
  };
})();
