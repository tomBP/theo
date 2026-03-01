/* ===== Quiz Game ===== */
window.QuizGame = (function () {
  var questions, currentQ, container, onComplete, illustration;
  var streak, hasUsed5050;

  function start(config, gameArea, done) {
    questions = config.questions;
    illustration = config.illustration || '';
    currentQ = 0;
    streak = 0;
    hasUsed5050 = false;
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
      streak++;
      hasUsed5050 = false;
      if (streak >= 3) {
        showStreakCelebration(streak);
      }
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
      streak = 0;
      setTimeout(function () {
        btn.classList.remove('wrong');
        btn.style.opacity = '0.4';
        btn.style.pointerEvents = 'none';
        feedback.textContent = '';
        // Show 50/50 button if not used for this question
        if (!hasUsed5050) {
          show5050Button();
        }
      }, 800);
    }
  }

  function showStreakCelebration(count) {
    var el = document.createElement('div');
    el.className = 'quiz-streak-float';
    el.textContent = count + ' ' + t('inARow') + '!';
    document.body.appendChild(el);
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 1100);
  }

  function show5050Button() {
    var feedback = document.getElementById('quiz-feedback');
    if (!feedback) return;
    var btn = document.createElement('button');
    btn.className = 'quiz-5050-btn';
    btn.textContent = '50/50';
    btn.addEventListener('click', function () {
      apply5050();
      if (btn.parentNode) btn.parentNode.removeChild(btn);
    });
    feedback.after(btn);
  }

  function apply5050() {
    hasUsed5050 = true;
    var q = questions[currentQ];
    // Find wrong answers that are still visible
    var wrongBtns = [];
    container.querySelectorAll('.quiz-answer-btn').forEach(function (btn) {
      if (btn.dataset.correct === 'false' && btn.style.pointerEvents !== 'none') {
        wrongBtns.push(btn);
      }
    });
    // Eliminate one wrong answer (leave at least one wrong visible)
    if (wrongBtns.length > 1) {
      var idx = Math.floor(Math.random() * wrongBtns.length);
      wrongBtns[idx].style.opacity = '0.4';
      wrongBtns[idx].style.pointerEvents = 'none';
      wrongBtns[idx].removeEventListener('click', handleAnswer);
    }
    AudioManager.tap();
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
