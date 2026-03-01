/* ===== Simon Game ===== */
window.SimonGame = (function () {
  var container, callback;
  var colors, rounds, playSpeed;
  var sequence, playerIndex, currentRound;
  var isPlayingSequence, isPlayerTurn, destroyed;
  var playTimeouts, audioCtx;
  var PAD_TONES = [262, 330, 392, 523]; // C4, E4, G4, C5
  var label;
  var PAD_EMOJIS = ['\uD83E\uDD81', '\uD83D\uDC38', '\uD83D\uDC26', '\uD83C\uDF3B']; // lion, frog, bird, flower

  function start(config, gameArea, onComplete) {
    container = gameArea;
    callback = onComplete;
    destroyed = false;

    colors = config.colors || ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f'];
    rounds = config.rounds || 4;
    playSpeed = config.playSpeed || 600;
    label = config.label ? L(config.label) : '';

    sequence = [];
    playerIndex = 0;
    currentRound = 0;
    isPlayingSequence = false;
    isPlayerTurn = false;
    playTimeouts = [];

    // Create a local AudioContext for pad tones
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
    } catch (e) {
      audioCtx = null;
    }

    render();
    bindEvents();
    nextRound();
  }

  function render() {
    var html = '<style>';
    html += '.simon-container{display:flex;flex-direction:column;align-items:center;gap:16px;width:100%;max-width:400px;padding:10px;}';
    html += '.simon-status{font-family:var(--font-title);font-size:clamp(1rem,3vw,1.3rem);text-align:center;color:var(--color-text);min-height:1.6em;}';
    html += '.simon-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;width:100%;max-width:320px;aspect-ratio:1/1;}';
    html += '.simon-pad{border-radius:var(--radius-large);border:4px solid rgba(0,0,0,0.1);cursor:pointer;touch-action:manipulation;transition:transform 0.15s ease,box-shadow 0.15s ease,filter 0.15s ease;display:flex;align-items:center;justify-content:center;font-size:0;-webkit-user-select:none;user-select:none;position:relative;min-height:100px;}';
    html += '.simon-pad:active{transform:scale(0.96);}';
    html += '.simon-pad.lit{transform:scale(1.06);filter:brightness(1.4);box-shadow:0 0 25px 8px rgba(255,255,255,0.4),var(--shadow-medium);}';
    html += '.simon-pad.wrong-flash{animation:wobble 0.5s ease;}';
    html += '.simon-pad[disabled]{pointer-events:none;opacity:0.7;}';
    html += '.simon-round{font-family:var(--font-body);font-weight:700;font-size:clamp(0.9rem,2.5vw,1.1rem);text-align:center;color:var(--color-text-light);}';
    html += '.simon-message{font-family:var(--font-title);font-size:clamp(1.2rem,4vw,1.6rem);text-align:center;color:var(--color-success);min-height:1.6em;opacity:0;transition:opacity 0.3s ease;}';
    html += '.simon-message.visible{opacity:1;}';
    html += '</style>';
    html += '<div class="simon-container" id="simon-container">';
    if (label) {
      html += '<div class="simon-status" id="simon-status">' + label + '</div>';
    } else {
      html += '<div class="simon-status" id="simon-status"></div>';
    }
    html += '<div class="simon-grid" id="simon-grid">';
    for (var i = 0; i < 4; i++) {
      var color = colors[i] || '#ccc';
      html += '<div class="simon-pad" id="simon-pad-' + i + '" data-pad="' + i + '" style="background:' + color + ';box-shadow:var(--shadow-soft);" disabled><span class="simon-emoji-label">' + PAD_EMOJIS[i] + '</span></div>';
    }
    html += '</div>';
    html += '<div class="simon-round" id="simon-round"></div>';
    html += '<div class="simon-message" id="simon-message"></div>';
    html += '</div>';
    container.innerHTML = html;
  }

  function bindEvents() {
    for (var i = 0; i < 4; i++) {
      var pad = document.getElementById('simon-pad-' + i);
      if (pad) {
        pad.addEventListener('click', onPadClick);
        pad.addEventListener('touchstart', onPadTouch, { passive: true });
      }
    }
  }

  function onPadTouch(e) {
    // Handled via click, but prevent double-fire by marking
    var pad = e.currentTarget;
    pad._touched = true;
  }

  function onPadClick(e) {
    if (!isPlayerTurn || isPlayingSequence || destroyed) return;
    var pad = e.currentTarget;
    var padIndex = parseInt(pad.dataset.pad, 10);
    handlePadPress(padIndex);
  }

  function handlePadPress(padIndex) {
    if (!isPlayerTurn || isPlayingSequence || destroyed) return;

    var expectedIndex = sequence[playerIndex];

    if (padIndex === expectedIndex) {
      // Correct
      lightPad(padIndex, 300);
      playPadTone(padIndex, 300);
      playerIndex++;

      if (playerIndex >= sequence.length) {
        // Completed this round's sequence
        isPlayerTurn = false;
        setPadsEnabled(false);
        AudioManager.correct();

        if (currentRound >= rounds) {
          // Game complete!
          showMessage(t('amazing'));
          setTimeout(function () {
            if (!destroyed && callback) callback();
          }, 800);
        } else {
          // Next round
          showMessage(t('greatJob'));
          setTimeout(function () {
            if (destroyed) return;
            hideMessage();
            nextRound();
          }, 1200);
        }
      }
    } else {
      // Wrong
      AudioManager.wrong();
      var wrongPad = document.getElementById('simon-pad-' + padIndex);
      if (wrongPad) {
        wrongPad.classList.add('wrong-flash');
        setTimeout(function () {
          if (wrongPad) wrongPad.classList.remove('wrong-flash');
        }, 500);
      }
      // Forgiving: replay sequence, don't reset round
      isPlayerTurn = false;
      setPadsEnabled(false);
      updateStatus(label || '');
      setTimeout(function () {
        if (destroyed) return;
        playerIndex = 0;
        playSequence();
      }, 1000);
    }
  }

  function nextRound() {
    if (destroyed) return;
    currentRound++;
    // Add one random note to the sequence
    sequence.push(Math.floor(Math.random() * 4));
    playerIndex = 0;
    updateRound();
    updateProgress();

    setTimeout(function () {
      if (destroyed) return;
      playSequence();
    }, 600);
  }

  function playSequence() {
    if (destroyed) return;
    isPlayingSequence = true;
    isPlayerTurn = false;
    setPadsEnabled(false);
    updateStatus(label || '');

    // Clear any previous timeouts
    clearPlayTimeouts();

    for (var i = 0; i < sequence.length; i++) {
      (function (idx) {
        var t1 = setTimeout(function () {
          if (destroyed) return;
          lightPad(sequence[idx], playSpeed * 0.7);
          playPadTone(sequence[idx], playSpeed * 0.7);
        }, idx * playSpeed);
        playTimeouts.push(t1);
      })(i);
    }

    var endTimeout = setTimeout(function () {
      if (destroyed) return;
      isPlayingSequence = false;
      isPlayerTurn = true;
      setPadsEnabled(true);
      updateStatus(t('tryAgain').replace('!', '') + '!');
    }, sequence.length * playSpeed + 300);
    playTimeouts.push(endTimeout);
  }

  function lightPad(padIndex, duration) {
    var pad = document.getElementById('simon-pad-' + padIndex);
    if (!pad) return;
    pad.classList.add('lit');
    // Add ripple effect
    var ripple = document.createElement('div');
    ripple.className = 'simon-ripple';
    pad.appendChild(ripple);
    setTimeout(function () { if (ripple.parentNode) ripple.parentNode.removeChild(ripple); }, 700);
    var t = setTimeout(function () {
      if (pad) pad.classList.remove('lit');
    }, duration);
    playTimeouts.push(t);
  }

  function playPadTone(padIndex, duration) {
    if (!audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = PAD_TONES[padIndex] || 440;
      var dur = (duration || 300) / 1000;
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + dur);
    } catch (e) {
      // Fallback: use AudioManager.tap
      AudioManager.tap();
    }
  }

  function setPadsEnabled(enabled) {
    for (var i = 0; i < 4; i++) {
      var pad = document.getElementById('simon-pad-' + i);
      if (pad) {
        if (enabled) {
          pad.removeAttribute('disabled');
        } else {
          pad.setAttribute('disabled', '');
        }
      }
    }
  }

  function updateStatus(text) {
    var el = document.getElementById('simon-status');
    if (el) el.textContent = text;
  }

  function updateRound() {
    var el = document.getElementById('simon-round');
    if (el) el.textContent = t('greatJob').split('!')[0].trim() + ' - ' + currentRound + '/' + rounds;
  }

  function updateProgress() {
    var prog = document.getElementById('game-progress');
    if (prog) prog.textContent = currentRound + '/' + rounds;
  }

  function showMessage(text) {
    var el = document.getElementById('simon-message');
    if (el) {
      el.textContent = text;
      el.classList.add('visible');
    }
  }

  function hideMessage() {
    var el = document.getElementById('simon-message');
    if (el) {
      el.classList.remove('visible');
      el.textContent = '';
    }
  }

  function clearPlayTimeouts() {
    for (var i = 0; i < playTimeouts.length; i++) {
      clearTimeout(playTimeouts[i]);
    }
    playTimeouts = [];
  }

  function destroy() {
    destroyed = true;
    clearPlayTimeouts();

    for (var i = 0; i < 4; i++) {
      var pad = document.getElementById('simon-pad-' + i);
      if (pad) {
        pad.removeEventListener('click', onPadClick);
        pad.removeEventListener('touchstart', onPadTouch);
      }
    }

    if (audioCtx) {
      try { audioCtx.close(); } catch (e) { /* ignore */ }
      audioCtx = null;
    }

    sequence = [];
    playTimeouts = [];
    if (container) container.innerHTML = '';
  }

  return { start: start, destroy: destroy };
})();
