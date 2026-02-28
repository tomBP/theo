/* ===== Quiz Game ===== */
window.QuizGame = (function () {
  var questions, currentQ, container, onComplete, illustration;

  function start(config, gameArea, done) {
    questions = config.questions;
    illustration = config.illustration || '';
    currentQ = 0;
    onComplete = done;
    container = gameArea;
    showQuestion();
  }

  function showQuestion() {
    if (currentQ >= questions.length) {
      onComplete();
      return;
    }
    var q = questions[currentQ];
    var html = '<div class="quiz-container">';
    if (illustration) {
      html += '<div class="quiz-illustration">' + illustration + '</div>';
    }
    html += '<div class="quiz-question">' + L(q.question) + '</div>';
    html += '<div class="quiz-answers">';
    q.answers.forEach(function (a, i) {
      html += '<button class="quiz-answer-btn" data-index="' + i + '" data-correct="' + (i === q.correct ? 'true' : 'false') + '">' + L(a) + '</button>';
    });
    html += '</div>';
    html += '<div class="quiz-feedback" id="quiz-feedback"></div>';
    html += '</div>';
    container.innerHTML = html;

    container.querySelectorAll('.quiz-answer-btn').forEach(function (btn) {
      btn.addEventListener('click', handleAnswer);
    });
  }

  function handleAnswer(e) {
    var btn = e.currentTarget;
    var isCorrect = btn.dataset.correct === 'true';
    var feedback = document.getElementById('quiz-feedback');
    var allBtns = container.querySelectorAll('.quiz-answer-btn');

    if (isCorrect) {
      AudioManager.correct();
      btn.classList.add('correct');
      allBtns.forEach(function (b) { b.removeEventListener('click', handleAnswer); });
      feedback.textContent = L(questions[currentQ].fact) || t('greatJob');
      feedback.style.color = 'var(--color-success)';
      setTimeout(function () {
        currentQ++;
        updateProgress();
        showQuestion();
      }, 1200);
    } else {
      AudioManager.wrong();
      btn.classList.add('wrong');
      feedback.textContent = t('tryAgain');
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
    if (prog) prog.textContent = currentQ + '/' + questions.length;
  }

  function destroy() {
    if (container) container.innerHTML = '';
  }

  return { start: start, destroy: destroy };
})();
