/* ===== Web Audio API Synthesized Sounds ===== */
window.AudioManager = (function () {
  let ctx = null;

  function init() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
  }

  function playTone(freq, duration, type, volume) {
    if (!ctx) return;
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume || 0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  }

  function tap() {
    playTone(600, 0.1, 'sine', 0.2);
  }

  function correct() {
    if (!ctx) return;
    playTone(523, 0.15, 'sine', 0.3);
    setTimeout(function () { playTone(659, 0.15, 'sine', 0.3); }, 100);
    setTimeout(function () { playTone(784, 0.25, 'sine', 0.3); }, 200);
  }

  function wrong() {
    playTone(200, 0.3, 'triangle', 0.2);
  }

  function snap() {
    playTone(800, 0.08, 'square', 0.15);
    setTimeout(function () { playTone(1000, 0.08, 'square', 0.15); }, 60);
  }

  function flip() {
    playTone(400, 0.1, 'triangle', 0.15);
  }

  function match() {
    playTone(523, 0.1, 'sine', 0.25);
    setTimeout(function () { playTone(784, 0.2, 'sine', 0.25); }, 80);
  }

  function collect() {
    playTone(880, 0.12, 'sine', 0.2);
    setTimeout(function () { playTone(1100, 0.12, 'sine', 0.2); }, 80);
  }

  function fanfare() {
    if (!ctx) return;
    var notes = [523, 659, 784, 1047];
    notes.forEach(function (freq, i) {
      setTimeout(function () { playTone(freq, 0.3, 'sine', 0.3); }, i * 150);
    });
    setTimeout(function () {
      playTone(1047, 0.6, 'sine', 0.35);
    }, 600);
  }

  function celebrate() {
    if (!ctx) return;
    var melody = [523, 587, 659, 784, 880, 1047, 1175, 1319];
    melody.forEach(function (freq, i) {
      setTimeout(function () { playTone(freq, 0.15, 'sine', 0.2); }, i * 80);
    });
    setTimeout(fanfare, 700);
  }

  return {
    init: init,
    tap: tap,
    correct: correct,
    wrong: wrong,
    snap: snap,
    flip: flip,
    match: match,
    collect: collect,
    fanfare: fanfare,
    celebrate: celebrate
  };
})();
