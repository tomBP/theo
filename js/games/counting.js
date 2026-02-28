/* ===== Counting Game ===== */
window.CountingGame = (function () {
  var scenes, currentScene, container, onComplete;

  function start(config, gameArea, done) {
    scenes = config.scenes;
    currentScene = 0;
    onComplete = done;
    container = gameArea;
    showScene();
  }

  function showScene() {
    if (currentScene >= scenes.length) {
      onComplete();
      return;
    }
    var s = scenes[currentScene];
    var html = '<div class="counting-container">';
    html += '<div class="counting-scene">' + s.sceneSVG + '</div>';
    html += '<div class="counting-question">' + L(s.question) + '</div>';
    html += '<div class="counting-answers">';
    s.answers.forEach(function (a, i) {
      html += '<button class="counting-answer-btn" data-index="' + i + '" data-correct="' + (a === s.correct ? 'true' : 'false') + '">' + a + '</button>';
    });
    html += '</div>';
    html += '<div class="counting-feedback" id="counting-feedback"></div>';
    html += '</div>';
    container.innerHTML = html;

    container.querySelectorAll('.counting-answer-btn').forEach(function (btn) {
      btn.addEventListener('click', handleAnswer);
    });
  }

  function handleAnswer(e) {
    var btn = e.currentTarget;
    var isCorrect = btn.dataset.correct === 'true';
    var feedback = document.getElementById('counting-feedback');
    var allBtns = container.querySelectorAll('.counting-answer-btn');

    if (isCorrect) {
      AudioManager.correct();
      btn.classList.add('correct');
      allBtns.forEach(function (b) { b.removeEventListener('click', handleAnswer); });
      feedback.textContent = L(scenes[currentScene].fact) || t('youCountedIt');
      feedback.style.color = 'var(--color-success)';
      setTimeout(function () {
        currentScene++;
        updateProgress();
        showScene();
      }, 1200);
    } else {
      AudioManager.wrong();
      btn.classList.add('wrong');
      feedback.textContent = t('countAgain');
      feedback.style.color = 'var(--color-error)';
      setTimeout(function () {
        btn.classList.remove('wrong');
        btn.style.opacity = '0.4';
        btn.style.pointerEvents = 'none';
        feedback.textContent = '';
      }, 800);
    }
  }

  function updateProgress() {
    var prog = document.getElementById('game-progress');
    if (prog) prog.textContent = currentScene + '/' + scenes.length;
  }

  function destroy() {
    if (container) container.innerHTML = '';
  }

  return { start: start, destroy: destroy };
})();
