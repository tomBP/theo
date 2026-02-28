/* ===== UI Icons ===== */
window.Icons = {
  star: function (filled) {
    var color = filled ? '#f9ca24' : '#dfe6e9';
    return '<svg viewBox="0 0 24 24" width="24" height="24">' +
      '<polygon points="12,2 15.1,8.3 22,9.2 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.2 8.9,8.3" ' +
      'fill="' + color + '" stroke="' + (filled ? '#f39c12' : '#b2bec3') + '" stroke-width="1"/>' +
      '</svg>';
  },

  starLarge: function () {
    return '<svg viewBox="0 0 48 48" width="48" height="48">' +
      '<polygon points="24,4 30.2,16.6 44,18.4 34,28.2 36.4,42 24,35.6 11.6,42 14,28.2 4,18.4 17.8,16.6" ' +
      'fill="#f9ca24" stroke="#f39c12" stroke-width="1.5"/>' +
      '</svg>';
  },

  lock: function () {
    return '<svg viewBox="0 0 24 24" width="28" height="28">' +
      '<rect x="5" y="11" width="14" height="11" rx="2" fill="#b2bec3"/>' +
      '<path d="M8 11V7a4 4 0 0 1 8 0v4" fill="none" stroke="#636e72" stroke-width="2" stroke-linecap="round"/>' +
      '</svg>';
  },

  questionMark: function () {
    return '<svg viewBox="0 0 32 32" width="32" height="32">' +
      '<circle cx="16" cy="16" r="14" fill="var(--theme-primary, #00b894)" opacity="0.2"/>' +
      '<text x="16" y="22" text-anchor="middle" font-size="20" font-weight="bold" fill="var(--theme-primary, #00b894)">?</text>' +
      '</svg>';
  }
};
