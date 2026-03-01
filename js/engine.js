/* ===== Level Lifecycle Engine ===== */
window.Engine = (function () {
  var currentLevel = null;
  var currentGame = null;

  var gameMap = {
    quiz: QuizGame,
    dragdrop: DragDropGame,
    matching: MatchingGame,
    maze: MazeGame,
    counting: CountingGame,
    coloring: ColoringGame,
    catcher: CatcherGame,
    runner: RunnerGame,
    simon: SimonGame,
    spotdiff: SpotDiffGame,
    sorting: SortingGame,
    tracer: TracerGame
  };

  function startLevel(levelData) {
    currentLevel = levelData;
    var gameArea = document.getElementById('game-area');
    var titleEl = document.getElementById('game-title');
    var progressEl = document.getElementById('game-progress');

    titleEl.textContent = L(levelData.name);
    progressEl.textContent = '';

    // Show learn screen first
    showLearnScreen(gameArea, levelData, function () {
      startGame(gameArea, levelData);
    });
  }

  function showLearnScreen(gameArea, levelData, onContinue) {
    var html = '<div class="learn-screen">';
    html += '<div class="learn-illustration">' + levelData.illustration() + '</div>';
    html += '<div class="learn-facts">';
    levelData.learnFacts.forEach(function (fact) {
      html += '<div class="learn-fact">' + L(fact) + '</div>';
    });
    html += '</div>';
    if (window.AvatarDialog) { html += AvatarDialog.render(levelData.id); }
    html += '<button class="learn-continue" id="learn-continue">' + t('letsGo') + '</button>';
    html += '</div>';
    gameArea.innerHTML = html;

    document.getElementById('learn-continue').addEventListener('click', function () {
      AudioManager.tap();
      onContinue();
    });
  }

  function startGame(gameArea, levelData) {
    var GameClass = gameMap[levelData.gameType];
    if (!GameClass) return;

    currentGame = GameClass;

    var config = levelData.config;
    if (levelData.gameType === 'quiz') {
      config.illustration = levelData.illustration();
    }

    GameClass.start(config, gameArea, function () {
      onLevelComplete(levelData);
    });

    // Set initial progress
    var progressEl = document.getElementById('game-progress');
    if (progressEl) {
      switch (levelData.gameType) {
        case 'quiz':
          progressEl.textContent = '0/' + config.questions.length;
          break;
        case 'counting':
          progressEl.textContent = '0/' + config.scenes.length;
          break;
        case 'dragdrop':
          progressEl.textContent = '0/' + config.pieces.length;
          break;
        case 'matching':
          progressEl.textContent = '0/' + config.pairs.length;
          break;
        case 'coloring':
          progressEl.textContent = '0/' + config.regionCount;
          break;
        case 'catcher':
          progressEl.textContent = '0/' + config.catchGoal;
          break;
        case 'runner':
          progressEl.textContent = '0/' + config.totalCollectibles;
          break;
        case 'simon':
          progressEl.textContent = '0/' + config.rounds;
          break;
        case 'spotdiff':
          progressEl.textContent = '0/' + config.totalDifferences;
          break;
        case 'sorting':
          progressEl.textContent = '0/' + config.items.length;
          break;
        case 'tracer':
          progressEl.textContent = '0%';
          break;
      }
    }
  }

  function onLevelComplete(levelData) {
    GameState.completeLevel(levelData.id);
    AudioManager.celebrate();

    // Show celebration screen
    App.showCelebration(levelData);
  }

  function cleanup() {
    if (currentGame && currentGame.destroy) {
      currentGame.destroy();
    }
    currentGame = null;
    currentLevel = null;
  }

  return {
    startLevel: startLevel,
    cleanup: cleanup
  };
})();
