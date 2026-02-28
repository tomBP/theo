/* ===== localStorage Progress Manager ===== */
window.GameState = (function () {
  var STORAGE_KEY = 'theo-adventure-progress';

  function load() {
    try {
      var data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (data && Array.isArray(data.completed)) return data;
    } catch (e) { /* ignore */ }
    return { completed: [] };
  }

  function save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* ignore */ }
  }

  function isCompleted(levelId) {
    return load().completed.indexOf(levelId) !== -1;
  }

  function completeLevel(levelId) {
    var state = load();
    if (state.completed.indexOf(levelId) === -1) {
      state.completed.push(levelId);
      save(state);
    }
  }

  function isUnlocked(levelId, allLevelIds) {
    var idx = allLevelIds.indexOf(levelId);
    if (idx === 0) return true;
    return isCompleted(allLevelIds[idx - 1]);
  }

  function getCompletedCount(theme) {
    var state = load();
    return state.completed.filter(function (id) {
      return id.indexOf(theme) === 0;
    }).length;
  }

  function resetProgress() {
    save({ completed: [] });
  }

  return {
    isCompleted: isCompleted,
    completeLevel: completeLevel,
    isUnlocked: isUnlocked,
    getCompletedCount: getCompletedCount,
    resetProgress: resetProgress
  };
})();
