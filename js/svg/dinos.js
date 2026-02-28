/* ===== SVG Generator Functions for 10 Dinosaurs ===== */
window.DinoSVG = {
  trex: function () {
    return '<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="trex-body-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4a7c59"/><stop offset="100%" stop-color="#3d5a3a"/></linearGradient>' +
      '<linearGradient id="trex-belly-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5a9c6a"/><stop offset="100%" stop-color="#4a7c59"/></linearGradient>' +
      '<radialGradient id="trex-head-grad" cx="0.4" cy="0.4"><stop offset="0%" stop-color="#5a9c6a"/><stop offset="100%" stop-color="#3d5a3a"/></radialGradient>' +
      '<linearGradient id="trex-leg-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4a7c59"/><stop offset="100%" stop-color="#2d4a2e"/></linearGradient>' +
      '<radialGradient id="trex-shadow-grad" cx="0.5" cy="0.5"><stop offset="0%" stop-color="#000" stop-opacity="0.3"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<ellipse cx="108" cy="172" rx="65" ry="6" fill="url(#trex-shadow-grad)"/>' +
      '<path d="M140 120 Q165 112 172 128 Q178 142 155 138 Q148 136 142 130" fill="url(#trex-body-grad)" stroke="#2d4a2e" stroke-width="0.5"/>' +
      '<path d="M155 130 Q162 128 168 132" fill="none" stroke="#2d4a2e" stroke-width="0.5"/>' +
      '<path d="M150 134 Q158 132 163 136" fill="none" stroke="#2d4a2e" stroke-width="0.5"/>' +
      '<ellipse cx="105" cy="125" rx="48" ry="32" fill="url(#trex-body-grad)" stroke="#2d4a2e" stroke-width="0.5"/>' +
      '<ellipse cx="105" cy="135" rx="38" ry="18" fill="url(#trex-belly-grad)" opacity="0.6"/>' +
      '<circle cx="85" cy="115" r="2" fill="#2d4a2e" opacity="0.15"/>' +
      '<circle cx="95" cy="110" r="2.5" fill="#2d4a2e" opacity="0.12"/>' +
      '<circle cx="108" cy="112" r="2" fill="#2d4a2e" opacity="0.15"/>' +
      '<circle cx="118" cy="116" r="1.8" fill="#2d4a2e" opacity="0.12"/>' +
      '<circle cx="75" cy="120" r="1.5" fill="#2d4a2e" opacity="0.1"/>' +
      '<circle cx="130" cy="118" r="2" fill="#2d4a2e" opacity="0.12"/>' +
      '<circle cx="100" cy="120" r="1.5" fill="#2d4a2e" opacity="0.1"/>' +
      '<circle cx="115" cy="125" r="1.8" fill="#2d4a2e" opacity="0.1"/>' +
      '<circle cx="90" cy="128" r="2" fill="#2d4a2e" opacity="0.08"/>' +
      '<path d="M80 118 Q72 68 68 60" fill="none" stroke="#3d5a3a" stroke-width="12"/>' +
      '<ellipse cx="66" cy="66" rx="32" ry="24" fill="url(#trex-head-grad)" stroke="#2d4a2e" stroke-width="0.5"/>' +
      '<path d="M38 72 Q34 78 36 82 Q60 84 70 80" fill="#3d5a3a" stroke="#2d4a2e" stroke-width="0.5"/>' +
      '<ellipse cx="60" cy="76" rx="22" ry="8" fill="#4a7c59" opacity="0.5"/>' +
      '<rect x="40" y="72" width="3" height="5" rx="0.5" fill="#f0f0e0" opacity="0.9"/>' +
      '<rect x="45" y="72" width="3" height="5" rx="0.5" fill="#f0f0e0" opacity="0.9"/>' +
      '<rect x="50" y="73" width="2.5" height="4" rx="0.5" fill="#f0f0e0" opacity="0.9"/>' +
      '<rect x="55" y="73" width="2.5" height="4" rx="0.5" fill="#f0f0e0" opacity="0.9"/>' +
      '<rect x="42" y="79" width="2.5" height="4" rx="0.5" fill="#f0f0e0" opacity="0.9" transform="rotate(180 43.25 81)"/>' +
      '<rect x="47" y="79" width="2.5" height="4" rx="0.5" fill="#f0f0e0" opacity="0.9" transform="rotate(180 48.25 81)"/>' +
      '<rect x="52" y="79" width="2" height="3.5" rx="0.5" fill="#f0f0e0" opacity="0.8" transform="rotate(180 53 80.75)"/>' +
      '<circle cx="38" cy="68" r="1.5" fill="#3d5a3a"/>' +
      '<circle cx="42" cy="64" r="1.2" fill="#3d5a3a"/>' +
      '<circle cx="55" cy="58" r="7" fill="white" stroke="#2d4a2e" stroke-width="0.5"/>' +
      '<circle cx="55" cy="58" r="4.5" fill="#8B4513"/>' +
      '<circle cx="55" cy="58" r="2.5" fill="#1a1a1a"/>' +
      '<circle cx="53" cy="56" r="1.2" fill="white" opacity="0.9"/>' +
      '<path d="M50 52 Q48 48 52 50" fill="#3d5a3a"/>' +
      '<path d="M62 52 Q60 48 64 50" fill="#3d5a3a"/>' +
      '<circle cx="50" cy="62" r="1" fill="#2d4a2e" opacity="0.2"/>' +
      '<circle cx="60" cy="56" r="1.2" fill="#2d4a2e" opacity="0.15"/>' +
      '<circle cx="72" cy="60" r="1.5" fill="#2d4a2e" opacity="0.15"/>' +
      '<circle cx="78" cy="65" r="1" fill="#2d4a2e" opacity="0.12"/>' +
      '<path d="M82 55 Q86 42 90 55" fill="#5a9c6a" stroke="#3d5a3a" stroke-width="0.5"/>' +
      '<path d="M74 52 Q77 40 81 52" fill="#5a9c6a" stroke="#3d5a3a" stroke-width="0.5"/>' +
      '<ellipse cx="62" cy="88" rx="7" ry="4" fill="#5a9c6a"/>' +
      '<path d="M58 90 Q54 92 56 88" fill="#5a9c6a"/>' +
      '<path d="M65 89 Q62 93 60 90" fill="#5a9c6a"/>' +
      '<path d="M55 92 L52 95" stroke="#2d4a2e" stroke-width="1.5" stroke-linecap="round"/>' +
      '<path d="M60 93 L58 96" stroke="#2d4a2e" stroke-width="1.5" stroke-linecap="round"/>' +
      '<path d="M65 92 L63 95" stroke="#2d4a2e" stroke-width="1.5" stroke-linecap="round"/>' +
      '<path d="M120 142 Q122 145 122 155 Q122 165 120 170 Q118 172 116 170 Q114 165 114 155 Q114 145 116 142" fill="url(#trex-leg-grad)" stroke="#2d4a2e" stroke-width="0.5"/>' +
      '<path d="M110 170 L106 174 L110 172 L114 174 L118 172 L122 174 L118 170" fill="#2d4a2e"/>' +
      '<path d="M92 145 Q94 148 94 158 Q94 165 92 168 Q90 170 88 168 Q86 165 86 158 Q86 148 88 145" fill="url(#trex-leg-grad)" stroke="#2d4a2e" stroke-width="0.5"/>' +
      '<path d="M82 168 L78 172 L82 170 L86 172 L90 170 L94 172 L90 168" fill="#2d4a2e"/>' +
      '<path d="M95 150 Q97 152 97 157" fill="none" stroke="#2d4a2e" stroke-width="0.4"/>' +
      '<path d="M118 148 Q120 150 120 156" fill="none" stroke="#2d4a2e" stroke-width="0.4"/>' +
      '</svg>';
  },
  triceratops: function () {
    return '<svg viewBox="0 0 220 180" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="tric-body-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8B7355"/><stop offset="100%" stop-color="#6b5038"/></linearGradient>' +
      '<linearGradient id="tric-belly-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#a0896c"/><stop offset="100%" stop-color="#8B7355"/></linearGradient>' +
      '<radialGradient id="tric-head-grad" cx="0.5" cy="0.4"><stop offset="0%" stop-color="#a0896c"/><stop offset="100%" stop-color="#6b5038"/></radialGradient>' +
      '<radialGradient id="tric-frill-grad" cx="0.5" cy="0.6"><stop offset="0%" stop-color="#c4a77d"/><stop offset="60%" stop-color="#a0896c"/><stop offset="100%" stop-color="#8B7355"/></radialGradient>' +
      '<linearGradient id="tric-leg-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8B7355"/><stop offset="100%" stop-color="#5a4028"/></linearGradient>' +
      '<radialGradient id="tric-shadow-grad" cx="0.5" cy="0.5"><stop offset="0%" stop-color="#000" stop-opacity="0.3"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<ellipse cx="120" cy="172" rx="70" ry="6" fill="url(#tric-shadow-grad)"/>' +
      '<path d="M168 112 Q188 108 190 120 Q192 132 175 128 Q170 126 166 122" fill="url(#tric-body-grad)" stroke="#5a4028" stroke-width="0.5"/>' +
      '<path d="M175 120 Q180 118 185 122" fill="none" stroke="#5a4028" stroke-width="0.5"/>' +
      '<ellipse cx="125" cy="118" rx="52" ry="34" fill="url(#tric-body-grad)" stroke="#5a4028" stroke-width="0.5"/>' +
      '<ellipse cx="125" cy="130" rx="40" ry="18" fill="url(#tric-belly-grad)" opacity="0.5"/>' +
      '<circle cx="105" cy="110" r="2" fill="#5a4028" opacity="0.12"/>' +
      '<circle cx="115" cy="108" r="2.5" fill="#5a4028" opacity="0.1"/>' +
      '<circle cx="130" cy="106" r="2" fill="#5a4028" opacity="0.12"/>' +
      '<circle cx="142" cy="110" r="1.8" fill="#5a4028" opacity="0.1"/>' +
      '<circle cx="150" cy="115" r="2" fill="#5a4028" opacity="0.1"/>' +
      '<circle cx="118" cy="115" r="1.5" fill="#5a4028" opacity="0.08"/>' +
      '<circle cx="135" cy="118" r="1.8" fill="#5a4028" opacity="0.08"/>' +
      '<circle cx="98" cy="115" r="1.5" fill="#5a4028" opacity="0.1"/>' +
      '<ellipse cx="62" cy="92" rx="36" ry="30" fill="url(#tric-head-grad)" stroke="#5a4028" stroke-width="0.5"/>' +
      '<path d="M30 58 Q42 22 60 18 Q78 22 90 58 Q78 52 60 50 Q42 52 30 58Z" fill="url(#tric-frill-grad)" stroke="#8B7355" stroke-width="1.5"/>' +
      '<circle cx="45" cy="40" r="5" fill="#8B7355" opacity="0.4"/>' +
      '<circle cx="60" cy="35" r="6" fill="#8B7355" opacity="0.35"/>' +
      '<circle cx="75" cy="40" r="5" fill="#8B7355" opacity="0.4"/>' +
      '<path d="M32 58 Q38 55 44 58" fill="none" stroke="#6b5038" stroke-width="1"/>' +
      '<path d="M76 58 Q82 55 88 58" fill="none" stroke="#6b5038" stroke-width="1"/>' +
      '<circle cx="50" cy="42" r="3" fill="#6b5038" opacity="0.2"/>' +
      '<circle cx="70" cy="42" r="3" fill="#6b5038" opacity="0.2"/>' +
      '<line x1="30" y1="98" x2="14" y2="82" stroke="#c4a77d" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M14 82 L11 76" stroke="#f0e6d0" stroke-width="3" stroke-linecap="round"/>' +
      '<line x1="42" y1="68" x2="32" y2="48" stroke="#c4a77d" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M32 48 L29 42" stroke="#f0e6d0" stroke-width="2.5" stroke-linecap="round"/>' +
      '<line x1="58" y1="64" x2="52" y2="44" stroke="#c4a77d" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M52 44 L50 38" stroke="#f0e6d0" stroke-width="2.5" stroke-linecap="round"/>' +
      '<path d="M35 96 Q28 102 32 106 Q58 110 68 104" fill="#6b5038" stroke="#5a4028" stroke-width="0.5"/>' +
      '<circle cx="50" cy="82" r="6.5" fill="white" stroke="#5a4028" stroke-width="0.5"/>' +
      '<circle cx="50" cy="82" r="4" fill="#8B6914"/>' +
      '<circle cx="50" cy="82" r="2.2" fill="#1a1a1a"/>' +
      '<circle cx="48" cy="80" r="1.2" fill="white" opacity="0.9"/>' +
      '<circle cx="34" cy="92" r="1.2" fill="#6b5038"/>' +
      '<circle cx="36" cy="88" r="1" fill="#6b5038"/>' +
      '<path d="M38 100 Q36 102 38 103" fill="#5a4028"/>' +
      '<circle cx="65" cy="80" r="1.5" fill="#5a4028" opacity="0.15"/>' +
      '<circle cx="72" cy="85" r="1.2" fill="#5a4028" opacity="0.12"/>' +
      '<circle cx="55" cy="90" r="1" fill="#5a4028" opacity="0.1"/>' +
      '<path d="M95 140 Q97 145 97 155 Q97 162 95 168 Q93 170 91 168 Q89 162 89 152 Q89 145 91 140" fill="url(#tric-leg-grad)" stroke="#5a4028" stroke-width="0.5"/>' +
      '<path d="M85 168 L82 172 L86 170 L90 172 L94 170 L98 172 L95 168" fill="#5a4028"/>' +
      '<path d="M145 140 Q147 145 147 155 Q147 162 145 168 Q143 170 141 168 Q139 162 139 152 Q139 145 141 140" fill="url(#tric-leg-grad)" stroke="#5a4028" stroke-width="0.5"/>' +
      '<path d="M135 168 L132 172 L136 170 L140 172 L144 170 L148 172 L145 168" fill="#5a4028"/>' +
      '<path d="M78 145 Q80 148 80 155 Q80 160 78 164 Q76 166 74 164 Q72 160 72 155 Q72 148 74 145" fill="url(#tric-leg-grad)" stroke="#5a4028" stroke-width="0.5" opacity="0.7"/>' +
      '<path d="M160 142 Q162 145 162 152 Q162 158 160 162 Q158 164 156 162 Q154 158 154 152 Q154 145 156 142" fill="url(#tric-leg-grad)" stroke="#5a4028" stroke-width="0.5" opacity="0.7"/>' +
      '</svg>';
  },
  stegosaurus: function () {
    return '<svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="steg-body-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7B8D4E"/><stop offset="100%" stop-color="#5a6b35"/></linearGradient>' +
      '<linearGradient id="steg-belly-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8fa05a"/><stop offset="100%" stop-color="#7B8D4E"/></linearGradient>' +
      '<radialGradient id="steg-head-grad" cx="0.4" cy="0.4"><stop offset="0%" stop-color="#8fa05a"/><stop offset="100%" stop-color="#5a6b35"/></radialGradient>' +
      '<linearGradient id="steg-plate-grad" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#d35400"/><stop offset="50%" stop-color="#e67e22"/><stop offset="100%" stop-color="#f39c12"/></linearGradient>' +
      '<linearGradient id="steg-leg-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7B8D4E"/><stop offset="100%" stop-color="#3d4a25"/></linearGradient>' +
      '<radialGradient id="steg-shadow-grad" cx="0.5" cy="0.5"><stop offset="0%" stop-color="#000" stop-opacity="0.3"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<ellipse cx="125" cy="172" rx="80" ry="6" fill="url(#steg-shadow-grad)"/>' +
      '<path d="M190 118 Q212 114 210 128 Q208 138 195 135" fill="url(#steg-body-grad)" stroke="#3d4a25" stroke-width="0.5"/>' +
      '<polygon points="200,128 218,122 214,136" fill="#c0392b" stroke="#992d22" stroke-width="0.5"/>' +
      '<polygon points="208,124 226,118 222,132" fill="#c0392b" stroke="#992d22" stroke-width="0.5"/>' +
      '<polygon points="204,132 220,128 218,140" fill="#c0392b" stroke="#992d22" stroke-width="0.5"/>' +
      '<polygon points="212,128 228,124 226,136" fill="#c0392b" stroke="#992d22" stroke-width="0.5"/>' +
      '<ellipse cx="125" cy="120" rx="62" ry="30" fill="url(#steg-body-grad)" stroke="#3d4a25" stroke-width="0.5"/>' +
      '<ellipse cx="125" cy="132" rx="50" ry="16" fill="url(#steg-belly-grad)" opacity="0.5"/>' +
      '<path d="M70 115 Q62 108 55 105" fill="none" stroke="#5a6b35" stroke-width="8"/>' +
      '<ellipse cx="52" cy="104" rx="20" ry="16" fill="url(#steg-head-grad)" stroke="#3d4a25" stroke-width="0.5"/>' +
      '<path d="M35 108 Q30 112 34 114 Q48 116 52 112" fill="#5a6b35" stroke="#3d4a25" stroke-width="0.5"/>' +
      '<circle cx="44" cy="99" r="5" fill="white" stroke="#3d4a25" stroke-width="0.5"/>' +
      '<circle cx="44" cy="99" r="3" fill="#6B4226"/>' +
      '<circle cx="44" cy="99" r="1.8" fill="#1a1a1a"/>' +
      '<circle cx="43" cy="97.5" r="1" fill="white" opacity="0.9"/>' +
      '<circle cx="36" cy="104" r="1" fill="#3d4a25"/>' +
      '<circle cx="38" cy="101" r="0.8" fill="#3d4a25"/>' +
      '<circle cx="100" cy="112" r="2" fill="#3d4a25" opacity="0.12"/>' +
      '<circle cx="112" cy="110" r="2.5" fill="#3d4a25" opacity="0.1"/>' +
      '<circle cx="128" cy="108" r="2" fill="#3d4a25" opacity="0.12"/>' +
      '<circle cx="140" cy="112" r="1.8" fill="#3d4a25" opacity="0.1"/>' +
      '<circle cx="155" cy="114" r="2" fill="#3d4a25" opacity="0.1"/>' +
      '<circle cx="90" cy="118" r="1.5" fill="#3d4a25" opacity="0.08"/>' +
      '<circle cx="165" cy="118" r="1.5" fill="#3d4a25" opacity="0.08"/>' +
      '<polygon points="78,92 86,66 94,92" fill="url(#steg-plate-grad)" stroke="#d35400" stroke-width="0.8"/>' +
      '<polygon points="94,88 103,60 112,88" fill="url(#steg-plate-grad)" stroke="#d35400" stroke-width="0.8"/>' +
      '<polygon points="110,86 120,56 130,86" fill="url(#steg-plate-grad)" stroke="#d35400" stroke-width="0.8"/>' +
      '<polygon points="128,86 138,58 148,86" fill="url(#steg-plate-grad)" stroke="#d35400" stroke-width="0.8"/>' +
      '<polygon points="145,88 154,64 163,88" fill="url(#steg-plate-grad)" stroke="#d35400" stroke-width="0.8"/>' +
      '<line x1="86" y1="78" x2="86" y2="90" stroke="#d35400" stroke-width="0.4" opacity="0.5"/>' +
      '<line x1="103" y1="72" x2="103" y2="86" stroke="#d35400" stroke-width="0.4" opacity="0.5"/>' +
      '<line x1="120" y1="68" x2="120" y2="84" stroke="#d35400" stroke-width="0.4" opacity="0.5"/>' +
      '<line x1="138" y1="70" x2="138" y2="84" stroke="#d35400" stroke-width="0.4" opacity="0.5"/>' +
      '<line x1="154" y1="76" x2="154" y2="86" stroke="#d35400" stroke-width="0.4" opacity="0.5"/>' +
      '<path d="M88 142 Q90 148 90 158 Q90 164 88 168 Q86 170 84 168 Q82 164 82 155 Q82 148 84 142" fill="url(#steg-leg-grad)" stroke="#3d4a25" stroke-width="0.5"/>' +
      '<path d="M78 168 L75 172 L79 170 L83 172 L87 170 L91 172 L88 168" fill="#3d4a25"/>' +
      '<path d="M148 142 Q150 148 150 158 Q150 164 148 168 Q146 170 144 168 Q142 164 142 155 Q142 148 144 142" fill="url(#steg-leg-grad)" stroke="#3d4a25" stroke-width="0.5"/>' +
      '<path d="M138 168 L135 172 L139 170 L143 172 L147 170 L151 172 L148 168" fill="#3d4a25"/>' +
      '<path d="M105 145 Q107 148 107 156 Q107 162 105 166 Q103 168 101 166 Q99 162 99 156 Q99 148 101 145" fill="url(#steg-leg-grad)" stroke="#3d4a25" stroke-width="0.5" opacity="0.7"/>' +
      '<path d="M162 144 Q164 147 164 154 Q164 160 162 164 Q160 166 158 164 Q156 160 156 154 Q156 147 158 144" fill="url(#steg-leg-grad)" stroke="#3d4a25" stroke-width="0.5" opacity="0.7"/>' +
      '</svg>';
  },
  brachiosaurus: function () {
    return '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="brach-body-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6B8E5A"/><stop offset="100%" stop-color="#4d7048"/></linearGradient>' +
      '<linearGradient id="brach-belly-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7da06a"/><stop offset="100%" stop-color="#6B8E5A"/></linearGradient>' +
      '<linearGradient id="brach-neck-grad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#7da06a"/><stop offset="100%" stop-color="#4d7048"/></linearGradient>' +
      '<radialGradient id="brach-head-grad" cx="0.4" cy="0.4"><stop offset="0%" stop-color="#7da06a"/><stop offset="100%" stop-color="#4d7048"/></radialGradient>' +
      '<linearGradient id="brach-leg-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6B8E5A"/><stop offset="100%" stop-color="#3a5030"/></linearGradient>' +
      '<radialGradient id="brach-shadow-grad" cx="0.5" cy="0.5"><stop offset="0%" stop-color="#000" stop-opacity="0.3"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<ellipse cx="125" cy="192" rx="55" ry="6" fill="url(#brach-shadow-grad)"/>' +
      '<path d="M158 148 Q178 143 180 155 Q182 164 168 161 Q162 158 158 153" fill="url(#brach-body-grad)" stroke="#3a5030" stroke-width="0.5"/>' +
      '<path d="M165 155 Q170 153 175 156" fill="none" stroke="#3a5030" stroke-width="0.4"/>' +
      '<ellipse cx="125" cy="150" rx="42" ry="28" fill="url(#brach-body-grad)" stroke="#3a5030" stroke-width="0.5"/>' +
      '<ellipse cx="125" cy="160" rx="34" ry="15" fill="url(#brach-belly-grad)" opacity="0.5"/>' +
      '<circle cx="110" cy="142" r="2" fill="#3a5030" opacity="0.12"/>' +
      '<circle cx="122" cy="140" r="2.5" fill="#3a5030" opacity="0.1"/>' +
      '<circle cx="135" cy="138" r="2" fill="#3a5030" opacity="0.12"/>' +
      '<circle cx="145" cy="142" r="1.8" fill="#3a5030" opacity="0.1"/>' +
      '<circle cx="115" cy="148" r="1.5" fill="#3a5030" opacity="0.08"/>' +
      '<circle cx="138" cy="150" r="1.8" fill="#3a5030" opacity="0.08"/>' +
      '<circle cx="100" cy="146" r="1.5" fill="#3a5030" opacity="0.1"/>' +
      '<path d="M98 144 Q92 110 88 80 Q85 55 82 40" fill="none" stroke="url(#brach-neck-grad)" stroke-width="18" stroke-linecap="round"/>' +
      '<path d="M92 142 Q88 115 84 85 Q82 65 80 48" fill="none" stroke="#7da06a" stroke-width="10" stroke-linecap="round" opacity="0.4"/>' +
      '<circle cx="90" cy="100" r="1.5" fill="#3a5030" opacity="0.1"/>' +
      '<circle cx="88" cy="80" r="1.2" fill="#3a5030" opacity="0.1"/>' +
      '<circle cx="86" cy="65" r="1.5" fill="#3a5030" opacity="0.12"/>' +
      '<circle cx="94" cy="120" r="1.8" fill="#3a5030" opacity="0.08"/>' +
      '<circle cx="92" cy="90" r="1" fill="#3a5030" opacity="0.1"/>' +
      '<ellipse cx="82" cy="35" rx="16" ry="12" fill="url(#brach-head-grad)" stroke="#3a5030" stroke-width="0.5"/>' +
      '<path d="M68 38 Q64 42 68 44 Q78 46 82 42" fill="#4d7048" stroke="#3a5030" stroke-width="0.5"/>' +
      '<circle cx="76" cy="30" r="4.5" fill="white" stroke="#3a5030" stroke-width="0.5"/>' +
      '<circle cx="76" cy="30" r="2.8" fill="#5a8040"/>' +
      '<circle cx="76" cy="30" r="1.6" fill="#1a1a1a"/>' +
      '<circle cx="75" cy="28.5" r="0.9" fill="white" opacity="0.9"/>' +
      '<circle cx="70" cy="34" r="0.8" fill="#3a5030"/>' +
      '<circle cx="72" cy="32" r="0.6" fill="#3a5030"/>' +
      '<path d="M88 28 Q92 22 94 28" fill="#7da06a" stroke="#4d7048" stroke-width="0.5"/>' +
      '<circle cx="80" cy="38" r="1" fill="#3a5030" opacity="0.15"/>' +
      '<circle cx="86" cy="32" r="1.2" fill="#3a5030" opacity="0.12"/>' +
      '<path d="M108 165 Q110 170 110 178 Q110 186 108 190 Q106 192 104 190 Q102 186 102 178 Q102 170 104 165" fill="url(#brach-leg-grad)" stroke="#3a5030" stroke-width="0.5"/>' +
      '<ellipse cx="106" cy="191" rx="6" ry="3" fill="#3a5030"/>' +
      '<path d="M138 165 Q140 170 140 178 Q140 186 138 190 Q136 192 134 190 Q132 186 132 178 Q132 170 134 165" fill="url(#brach-leg-grad)" stroke="#3a5030" stroke-width="0.5"/>' +
      '<ellipse cx="136" cy="191" rx="6" ry="3" fill="#3a5030"/>' +
      '<path d="M100 168 Q102 172 102 179 Q102 184 100 188 Q98 190 96 188 Q94 184 94 179 Q94 172 96 168" fill="url(#brach-leg-grad)" stroke="#3a5030" stroke-width="0.5" opacity="0.7"/>' +
      '<path d="M148 166 Q150 170 150 177 Q150 182 148 186 Q146 188 144 186 Q142 182 142 177 Q142 170 144 166" fill="url(#brach-leg-grad)" stroke="#3a5030" stroke-width="0.5" opacity="0.7"/>' +
      '<path d="M110 172 Q112 175 112 180" fill="none" stroke="#3a5030" stroke-width="0.3"/>' +
      '<path d="M140 172 Q142 175 142 180" fill="none" stroke="#3a5030" stroke-width="0.3"/>' +
      '</svg>';
  },
  velociraptor: function () {
    return '<svg viewBox="0 0 180 160" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="velo-body-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5D8A4E"/><stop offset="100%" stop-color="#3d6a3a"/></linearGradient>' +
      '<linearGradient id="velo-belly-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6a9c58"/><stop offset="100%" stop-color="#5D8A4E"/></linearGradient>' +
      '<radialGradient id="velo-head-grad" cx="0.4" cy="0.4"><stop offset="0%" stop-color="#6a9c58"/><stop offset="100%" stop-color="#3d6a3a"/></radialGradient>' +
      '<linearGradient id="velo-feather-grad" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#5D8A4E"/><stop offset="100%" stop-color="#8BC34A"/></linearGradient>' +
      '<linearGradient id="velo-leg-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5D8A4E"/><stop offset="100%" stop-color="#2d4a2a"/></linearGradient>' +
      '<radialGradient id="velo-shadow-grad" cx="0.5" cy="0.5"><stop offset="0%" stop-color="#000" stop-opacity="0.3"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<ellipse cx="95" cy="152" rx="50" ry="5" fill="url(#velo-shadow-grad)"/>' +
      '<path d="M125 88 Q152 80 158 95 Q162 108 142 104 Q135 100 128 95" fill="url(#velo-body-grad)" stroke="#2d4a2a" stroke-width="0.5"/>' +
      '<path d="M140 98 Q148 96 154 100" fill="none" stroke="#2d4a2a" stroke-width="0.4"/>' +
      '<path d="M136 102 Q142 100 148 104" fill="none" stroke="#2d4a2a" stroke-width="0.4"/>' +
      '<ellipse cx="98" cy="92" rx="32" ry="20" fill="url(#velo-body-grad)" stroke="#2d4a2a" stroke-width="0.5"/>' +
      '<ellipse cx="98" cy="100" rx="24" ry="10" fill="url(#velo-belly-grad)" opacity="0.5"/>' +
      '<circle cx="85" cy="86" r="1.5" fill="#2d4a2a" opacity="0.12"/>' +
      '<circle cx="95" cy="84" r="2" fill="#2d4a2a" opacity="0.1"/>' +
      '<circle cx="108" cy="86" r="1.5" fill="#2d4a2a" opacity="0.12"/>' +
      '<circle cx="115" cy="90" r="1.2" fill="#2d4a2a" opacity="0.1"/>' +
      '<circle cx="90" cy="92" r="1" fill="#2d4a2a" opacity="0.08"/>' +
      '<circle cx="105" cy="94" r="1.2" fill="#2d4a2a" opacity="0.08"/>' +
      '<path d="M75 88 Q68 62 60 55" fill="none" stroke="#3d6a3a" stroke-width="8"/>' +
      '<ellipse cx="55" cy="58" rx="22" ry="16" fill="url(#velo-head-grad)" stroke="#2d4a2a" stroke-width="0.5"/>' +
      '<path d="M36 62 Q28 68 34 70 Q48 72 54 68" fill="#3d6a3a" stroke="#2d4a2a" stroke-width="0.5"/>' +
      '<path d="M36 63 L34 64" stroke="#f0e0d0" stroke-width="0.8"/>' +
      '<path d="M40 64 L38 65" stroke="#f0e0d0" stroke-width="0.8"/>' +
      '<path d="M44 64 L42 65" stroke="#f0e0d0" stroke-width="0.8"/>' +
      '<path d="M38 68 L36 67" stroke="#f0e0d0" stroke-width="0.8"/>' +
      '<path d="M42 69 L40 68" stroke="#f0e0d0" stroke-width="0.8"/>' +
      '<circle cx="46" cy="52" r="5.5" fill="white" stroke="#2d4a2a" stroke-width="0.5"/>' +
      '<circle cx="46" cy="52" r="3.5" fill="#CC6600"/>' +
      '<circle cx="46" cy="52" r="2" fill="#1a1a1a"/>' +
      '<circle cx="44.5" cy="50.5" r="1" fill="white" opacity="0.9"/>' +
      '<circle cx="38" cy="58" r="0.8" fill="#2d4a2a"/>' +
      '<circle cx="40" cy="56" r="0.6" fill="#2d4a2a"/>' +
      '<path d="M68 52 Q74 40 70 52" fill="url(#velo-feather-grad)" stroke="#5D8A4E" stroke-width="0.3" opacity="0.7"/>' +
      '<path d="M72 55 Q80 42 76 55" fill="url(#velo-feather-grad)" stroke="#5D8A4E" stroke-width="0.3" opacity="0.7"/>' +
      '<path d="M76 60 Q84 46 80 60" fill="url(#velo-feather-grad)" stroke="#5D8A4E" stroke-width="0.3" opacity="0.7"/>' +
      '<path d="M80 65 Q88 50 84 65" fill="url(#velo-feather-grad)" stroke="#5D8A4E" stroke-width="0.3" opacity="0.6"/>' +
      '<path d="M115 80 Q122 72 118 80" fill="url(#velo-feather-grad)" stroke="#5D8A4E" stroke-width="0.3" opacity="0.5"/>' +
      '<path d="M120 82 Q128 74 124 82" fill="url(#velo-feather-grad)" stroke="#5D8A4E" stroke-width="0.3" opacity="0.5"/>' +
      '<ellipse cx="50" cy="72" rx="5" ry="3" fill="#6a9c58"/>' +
      '<path d="M48 74 L45 76" stroke="#2d4a2a" stroke-width="1" stroke-linecap="round"/>' +
      '<line x1="52" y1="74" x2="50" y2="76" stroke="#2d4a2a" stroke-width="1" stroke-linecap="round"/>' +
      '<path d="M100 106 Q102 112 102 125 Q102 138 100 145 Q98 148 96 145 Q94 138 94 125 Q94 112 96 106" fill="url(#velo-leg-grad)" stroke="#2d4a2a" stroke-width="0.5"/>' +
      '<path d="M90 145 L84 148" stroke="#e74c3c" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M90 145 L88 150 L92 148 L96 150 L100 148 L102 150 L100 145" fill="#2d4a2a"/>' +
      '<path d="M85 108 Q87 114 87 125 Q87 135 85 140 Q83 142 81 140 Q79 135 79 125 Q79 114 81 108" fill="url(#velo-leg-grad)" stroke="#2d4a2a" stroke-width="0.5"/>' +
      '<path d="M75 140 L68 143" stroke="#e74c3c" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M75 140 L73 145 L77 143 L81 145 L85 143 L87 145 L85 140" fill="#2d4a2a"/>' +
      '</svg>';
  },
  ankylosaurus: function () {
    return '<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="anky-body-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8B7D5B"/><stop offset="100%" stop-color="#6a5c3d"/></linearGradient>' +
      '<linearGradient id="anky-belly-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#9c8d6a"/><stop offset="100%" stop-color="#8B7D5B"/></linearGradient>' +
      '<radialGradient id="anky-head-grad" cx="0.4" cy="0.4"><stop offset="0%" stop-color="#9c8d6a"/><stop offset="100%" stop-color="#6a5c3d"/></radialGradient>' +
      '<linearGradient id="anky-armor-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#9c8d6a"/><stop offset="100%" stop-color="#6a5c3d"/></linearGradient>' +
      '<linearGradient id="anky-leg-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8B7D5B"/><stop offset="100%" stop-color="#4a3f28"/></linearGradient>' +
      '<radialGradient id="anky-shadow-grad" cx="0.5" cy="0.5"><stop offset="0%" stop-color="#000" stop-opacity="0.3"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="anky-club-grad" cx="0.4" cy="0.4"><stop offset="0%" stop-color="#9c8d6a"/><stop offset="100%" stop-color="#4a3f28"/></radialGradient>' +
      '</defs>' +
      '<ellipse cx="110" cy="152" rx="75" ry="6" fill="url(#anky-shadow-grad)"/>' +
      '<ellipse cx="110" cy="110" rx="62" ry="28" fill="url(#anky-body-grad)" stroke="#4a3f28" stroke-width="0.5"/>' +
      '<ellipse cx="110" cy="122" rx="50" ry="14" fill="url(#anky-belly-grad)" opacity="0.5"/>' +
      '<path d="M170 108 Q190 105 200 110 Q204 114 200 118" fill="url(#anky-body-grad)" stroke="#4a3f28" stroke-width="0.5"/>' +
      '<path d="M198 112 Q210 108 216 112" fill="none" stroke="#4a3f28" stroke-width="3"/>' +
      '<circle cx="214" cy="112" r="8" fill="url(#anky-club-grad)" stroke="#4a3f28" stroke-width="1"/>' +
      '<circle cx="212" cy="110" r="2" fill="#4a3f28" opacity="0.2"/>' +
      '<ellipse cx="80" cy="98" rx="6" ry="4" fill="url(#anky-armor-grad)" stroke="#4a3f28" stroke-width="0.3"/>' +
      '<ellipse cx="92" cy="94" rx="7" ry="5" fill="url(#anky-armor-grad)" stroke="#4a3f28" stroke-width="0.3"/>' +
      '<ellipse cx="105" cy="92" rx="7" ry="5" fill="url(#anky-armor-grad)" stroke="#4a3f28" stroke-width="0.3"/>' +
      '<ellipse cx="118" cy="92" rx="7" ry="5" fill="url(#anky-armor-grad)" stroke="#4a3f28" stroke-width="0.3"/>' +
      '<ellipse cx="131" cy="94" rx="7" ry="5" fill="url(#anky-armor-grad)" stroke="#4a3f28" stroke-width="0.3"/>' +
      '<ellipse cx="143" cy="98" rx="6" ry="4" fill="url(#anky-armor-grad)" stroke="#4a3f28" stroke-width="0.3"/>' +
      '<ellipse cx="86" cy="104" rx="5" ry="3.5" fill="url(#anky-armor-grad)" stroke="#4a3f28" stroke-width="0.3"/>' +
      '<ellipse cx="98" cy="100" rx="6" ry="4" fill="url(#anky-armor-grad)" stroke="#4a3f28" stroke-width="0.3"/>' +
      '<ellipse cx="112" cy="98" rx="6" ry="4" fill="url(#anky-armor-grad)" stroke="#4a3f28" stroke-width="0.3"/>' +
      '<ellipse cx="125" cy="100" rx="6" ry="4" fill="url(#anky-armor-grad)" stroke="#4a3f28" stroke-width="0.3"/>' +
      '<ellipse cx="137" cy="104" rx="5" ry="3.5" fill="url(#anky-armor-grad)" stroke="#4a3f28" stroke-width="0.3"/>' +
      '<circle cx="92" cy="108" r="3" fill="#9c8d6a" opacity="0.3"/>' +
      '<circle cx="105" cy="106" r="3.5" fill="#9c8d6a" opacity="0.25"/>' +
      '<circle cx="118" cy="106" r="3.5" fill="#9c8d6a" opacity="0.25"/>' +
      '<circle cx="130" cy="108" r="3" fill="#9c8d6a" opacity="0.3"/>' +
      '<polygon points="55,108 50,100 60,108" fill="#8B7D5B" stroke="#4a3f28" stroke-width="0.5"/>' +
      '<polygon points="62,104 58,96 68,104" fill="#8B7D5B" stroke="#4a3f28" stroke-width="0.5"/>' +
      '<polygon points="152,104 148,96 158,104" fill="#8B7D5B" stroke="#4a3f28" stroke-width="0.5"/>' +
      '<polygon points="160,108 156,100 166,108" fill="#8B7D5B" stroke="#4a3f28" stroke-width="0.5"/>' +
      '<polygon points="166,112 162,104 172,112" fill="#8B7D5B" stroke="#4a3f28" stroke-width="0.5"/>' +
      '<polygon points="49,112 44,104 54,112" fill="#8B7D5B" stroke="#4a3f28" stroke-width="0.5"/>' +
      '<circle cx="100" cy="112" r="1.8" fill="#4a3f28" opacity="0.1"/>' +
      '<circle cx="115" cy="114" r="2" fill="#4a3f28" opacity="0.08"/>' +
      '<circle cx="128" cy="112" r="1.5" fill="#4a3f28" opacity="0.1"/>' +
      '<circle cx="88" cy="116" r="1.5" fill="#4a3f28" opacity="0.08"/>' +
      '<ellipse cx="55" cy="108" rx="18" ry="14" fill="url(#anky-head-grad)" stroke="#4a3f28" stroke-width="0.5"/>' +
      '<path d="M40 112 Q34 116 38 118 Q48 120 54 116" fill="#6a5c3d" stroke="#4a3f28" stroke-width="0.5"/>' +
      '<circle cx="48" cy="102" r="4.5" fill="white" stroke="#4a3f28" stroke-width="0.5"/>' +
      '<circle cx="48" cy="102" r="2.8" fill="#8B6914"/>' +
      '<circle cx="48" cy="102" r="1.5" fill="#1a1a1a"/>' +
      '<circle cx="47" cy="100.5" r="0.9" fill="white" opacity="0.9"/>' +
      '<circle cx="40" cy="108" r="1" fill="#4a3f28"/>' +
      '<circle cx="42" cy="106" r="0.8" fill="#4a3f28"/>' +
      '<circle cx="62" cy="102" r="1.2" fill="#4a3f28" opacity="0.15"/>' +
      '<circle cx="58" cy="106" r="1" fill="#4a3f28" opacity="0.12"/>' +
      '<polygon points="45,96 42,90 48,96" fill="#8B7D5B" stroke="#4a3f28" stroke-width="0.4"/>' +
      '<polygon points="52,94 50,88 55,94" fill="#8B7D5B" stroke="#4a3f28" stroke-width="0.4"/>' +
      '<polygon points="60,96 58,90 63,96" fill="#8B7D5B" stroke="#4a3f28" stroke-width="0.4"/>' +
      '<path d="M82 128 Q84 132 84 140 Q84 146 82 150 Q80 152 78 150 Q76 146 76 140 Q76 132 78 128" fill="url(#anky-leg-grad)" stroke="#4a3f28" stroke-width="0.5"/>' +
      '<ellipse cx="80" cy="151" rx="5" ry="2.5" fill="#4a3f28"/>' +
      '<path d="M138 128 Q140 132 140 140 Q140 146 138 150 Q136 152 134 150 Q132 146 132 140 Q132 132 134 128" fill="url(#anky-leg-grad)" stroke="#4a3f28" stroke-width="0.5"/>' +
      '<ellipse cx="136" cy="151" rx="5" ry="2.5" fill="#4a3f28"/>' +
      '<path d="M92 130 Q94 134 94 140 Q94 145 92 148 Q90 150 88 148 Q86 145 86 140 Q86 134 88 130" fill="url(#anky-leg-grad)" stroke="#4a3f28" stroke-width="0.5" opacity="0.7"/>' +
      '<path d="M128 130 Q130 134 130 140 Q130 145 128 148 Q126 150 124 148 Q122 145 122 140 Q122 134 124 130" fill="url(#anky-leg-grad)" stroke="#4a3f28" stroke-width="0.5" opacity="0.7"/>' +
      '</svg>';
  },
  parasaurolophus: function () {
    return '<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="para-body-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5B8C5A"/><stop offset="100%" stop-color="#3d6c3a"/></linearGradient>' +
      '<linearGradient id="para-belly-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6a9c68"/><stop offset="100%" stop-color="#5B8C5A"/></linearGradient>' +
      '<radialGradient id="para-head-grad" cx="0.4" cy="0.4"><stop offset="0%" stop-color="#6a9c68"/><stop offset="100%" stop-color="#3d6c3a"/></radialGradient>' +
      '<linearGradient id="para-crest-grad" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="#3d6c3a"/><stop offset="100%" stop-color="#6a9c68"/></linearGradient>' +
      '<linearGradient id="para-leg-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5B8C5A"/><stop offset="100%" stop-color="#2d4c2a"/></linearGradient>' +
      '<radialGradient id="para-shadow-grad" cx="0.5" cy="0.5"><stop offset="0%" stop-color="#000" stop-opacity="0.3"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<ellipse cx="100" cy="172" rx="60" ry="6" fill="url(#para-shadow-grad)"/>' +
      '<path d="M135 108 Q158 102 162 115 Q165 126 148 122 Q142 120 136 114" fill="url(#para-body-grad)" stroke="#2d4c2a" stroke-width="0.5"/>' +
      '<path d="M145 116 Q152 114 158 118" fill="none" stroke="#2d4c2a" stroke-width="0.4"/>' +
      '<path d="M140 120 Q146 118 152 122" fill="none" stroke="#2d4c2a" stroke-width="0.4"/>' +
      '<ellipse cx="100" cy="108" rx="42" ry="28" fill="url(#para-body-grad)" stroke="#2d4c2a" stroke-width="0.5"/>' +
      '<ellipse cx="100" cy="120" rx="34" ry="14" fill="url(#para-belly-grad)" opacity="0.5"/>' +
      '<circle cx="85" cy="100" r="2" fill="#2d4c2a" opacity="0.12"/>' +
      '<circle cx="96" cy="98" r="2.5" fill="#2d4c2a" opacity="0.1"/>' +
      '<circle cx="110" cy="100" r="2" fill="#2d4c2a" opacity="0.12"/>' +
      '<circle cx="120" cy="104" r="1.8" fill="#2d4c2a" opacity="0.1"/>' +
      '<circle cx="78" cy="106" r="1.5" fill="#2d4c2a" opacity="0.08"/>' +
      '<circle cx="130" cy="106" r="1.5" fill="#2d4c2a" opacity="0.08"/>' +
      '<circle cx="105" cy="108" r="1.8" fill="#2d4c2a" opacity="0.08"/>' +
      '<circle cx="92" cy="112" r="1.5" fill="#2d4c2a" opacity="0.1"/>' +
      '<path d="M70 100 Q62 72 58 60" fill="none" stroke="#3d6c3a" stroke-width="10"/>' +
      '<path d="M66 98 Q60 75 56 65" fill="none" stroke="#6a9c68" stroke-width="5" opacity="0.4"/>' +
      '<ellipse cx="55" cy="58" rx="22" ry="16" fill="url(#para-head-grad)" stroke="#2d4c2a" stroke-width="0.5"/>' +
      '<path d="M56 48 Q62 28 80 22 Q84 22 82 26" fill="url(#para-crest-grad)" stroke="#3d6c3a" stroke-width="1"/>' +
      '<path d="M60 46 Q66 32 78 26" fill="none" stroke="#2d4c2a" stroke-width="0.4" opacity="0.5"/>' +
      '<path d="M58 44 Q64 34 72 30" fill="none" stroke="#6a9c68" stroke-width="0.6" opacity="0.3"/>' +
      '<path d="M36 62 Q28 68 32 72 Q46 76 55 70" fill="#3d6c3a" stroke="#2d4c2a" stroke-width="0.5"/>' +
      '<path d="M34 64 Q30 66 32 68" fill="none" stroke="#2d4c2a" stroke-width="0.3"/>' +
      '<ellipse cx="42" cy="66" rx="12" ry="5" fill="#5B8C5A" opacity="0.4"/>' +
      '<circle cx="46" cy="52" r="5.5" fill="white" stroke="#2d4c2a" stroke-width="0.5"/>' +
      '<circle cx="46" cy="52" r="3.5" fill="#5a8040"/>' +
      '<circle cx="46" cy="52" r="2" fill="#1a1a1a"/>' +
      '<circle cx="44.5" cy="50.5" r="1" fill="white" opacity="0.9"/>' +
      '<circle cx="38" cy="58" r="1" fill="#2d4c2a"/>' +
      '<circle cx="40" cy="56" r="0.8" fill="#2d4c2a"/>' +
      '<circle cx="62" cy="54" r="1.2" fill="#2d4c2a" opacity="0.15"/>' +
      '<circle cx="68" cy="58" r="1" fill="#2d4c2a" opacity="0.12"/>' +
      '<circle cx="55" cy="62" r="1.5" fill="#2d4c2a" opacity="0.1"/>' +
      '<ellipse cx="58" cy="80" rx="5" ry="3.5" fill="#6a9c68"/>' +
      '<line x1="55" y1="82" x2="52" y2="85" stroke="#2d4c2a" stroke-width="1" stroke-linecap="round"/>' +
      '<path d="M60 83 L58 86" stroke="#2d4c2a" stroke-width="1" stroke-linecap="round"/>' +
      '<path d="M56 82 L53 85" stroke="#2d4c2a" stroke-width="1" stroke-linecap="round"/>' +
      '<path d="M105 128 Q107 135 107 148 Q107 160 105 168 Q103 170 101 168 Q99 160 99 148 Q99 135 101 128" fill="url(#para-leg-grad)" stroke="#2d4c2a" stroke-width="0.5"/>' +
      '<path d="M95 168 L92 172 L96 170 L100 172 L104 170 L108 172 L105 168" fill="#2d4c2a"/>' +
      '<path d="M88 130 Q90 137 90 148 Q90 158 88 164 Q86 166 84 164 Q82 158 82 148 Q82 137 84 130" fill="url(#para-leg-grad)" stroke="#2d4c2a" stroke-width="0.5"/>' +
      '<path d="M78 164 L75 168 L79 166 L83 168 L87 166 L91 168 L88 164" fill="#2d4c2a"/>' +
      '<path d="M108 135 Q110 138 110 145" fill="none" stroke="#2d4c2a" stroke-width="0.4"/>' +
      '<path d="M90 137 Q92 140 92 146" fill="none" stroke="#2d4c2a" stroke-width="0.4"/>' +
      '</svg>';
  },
  spinosaurus: function () {
    return '<svg viewBox="0 0 220 190" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="spino-body-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4E7A8B"/><stop offset="100%" stop-color="#3a5f6e"/></linearGradient>' +
      '<linearGradient id="spino-belly-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5a8c9c"/><stop offset="100%" stop-color="#4E7A8B"/></linearGradient>' +
      '<radialGradient id="spino-head-grad" cx="0.4" cy="0.4"><stop offset="0%" stop-color="#5a8c9c"/><stop offset="100%" stop-color="#3a5f6e"/></radialGradient>' +
      '<linearGradient id="spino-sail-grad" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#3a5f6e"/><stop offset="40%" stop-color="#e67e22"/><stop offset="100%" stop-color="#e74c3c"/></linearGradient>' +
      '<linearGradient id="spino-leg-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4E7A8B"/><stop offset="100%" stop-color="#2a4550"/></linearGradient>' +
      '<radialGradient id="spino-shadow-grad" cx="0.5" cy="0.5"><stop offset="0%" stop-color="#000" stop-opacity="0.3"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<ellipse cx="110" cy="182" rx="70" ry="6" fill="url(#spino-shadow-grad)"/>' +
      '<path d="M155 130 Q178 124 182 138 Q185 150 168 146 Q162 144 156 138" fill="url(#spino-body-grad)" stroke="#2a4550" stroke-width="0.5"/>' +
      '<path d="M165 140 Q172 138 178 142" fill="none" stroke="#2a4550" stroke-width="0.4"/>' +
      '<path d="M160 144 Q166 142 172 146" fill="none" stroke="#2a4550" stroke-width="0.4"/>' +
      '<ellipse cx="110" cy="132" rx="52" ry="30" fill="url(#spino-body-grad)" stroke="#2a4550" stroke-width="0.5"/>' +
      '<ellipse cx="110" cy="145" rx="42" ry="14" fill="url(#spino-belly-grad)" opacity="0.5"/>' +
      '<path d="M78 104 Q88 42 98 36 Q108 42 118 65 Q128 42 138 36 Q148 50 155 104" fill="url(#spino-sail-grad)" stroke="#c0392b" stroke-width="0.8" opacity="0.9"/>' +
      '<line x1="88" y1="68" x2="88" y2="102" stroke="#3a5f6e" stroke-width="0.5" opacity="0.4"/>' +
      '<line x1="98" y1="42" x2="98" y2="102" stroke="#3a5f6e" stroke-width="0.5" opacity="0.4"/>' +
      '<line x1="108" y1="52" x2="108" y2="102" stroke="#3a5f6e" stroke-width="0.5" opacity="0.4"/>' +
      '<line x1="118" y1="55" x2="118" y2="102" stroke="#3a5f6e" stroke-width="0.5" opacity="0.4"/>' +
      '<line x1="128" y1="50" x2="128" y2="102" stroke="#3a5f6e" stroke-width="0.5" opacity="0.4"/>' +
      '<line x1="138" y1="45" x2="138" y2="102" stroke="#3a5f6e" stroke-width="0.5" opacity="0.4"/>' +
      '<line x1="148" y1="60" x2="148" y2="102" stroke="#3a5f6e" stroke-width="0.5" opacity="0.4"/>' +
      '<circle cx="95" cy="124" r="2" fill="#2a4550" opacity="0.12"/>' +
      '<circle cx="108" cy="122" r="2.5" fill="#2a4550" opacity="0.1"/>' +
      '<circle cx="122" cy="124" r="2" fill="#2a4550" opacity="0.12"/>' +
      '<circle cx="134" cy="128" r="1.8" fill="#2a4550" opacity="0.1"/>' +
      '<circle cx="85" cy="130" r="1.5" fill="#2a4550" opacity="0.08"/>' +
      '<circle cx="140" cy="132" r="1.5" fill="#2a4550" opacity="0.08"/>' +
      '<circle cx="115" cy="134" r="1.8" fill="#2a4550" opacity="0.08"/>' +
      '<path d="M72 126 Q60 92 52 80" fill="none" stroke="#3a5f6e" stroke-width="10"/>' +
      '<path d="M68 124 Q58 96 50 86" fill="none" stroke="#5a8c9c" stroke-width="5" opacity="0.4"/>' +
      '<ellipse cx="42" cy="78" rx="28" ry="14" fill="url(#spino-head-grad)" stroke="#2a4550" stroke-width="0.5"/>' +
      '<path d="M16 80 Q10 84 14 86 Q28 90 38 84" fill="#3a5f6e" stroke="#2a4550" stroke-width="0.5"/>' +
      '<ellipse cx="30" cy="82" rx="16" ry="4" fill="#4E7A8B" opacity="0.4"/>' +
      '<rect x="18" y="80" width="2.5" height="4" rx="0.5" fill="#f0f0e0" opacity="0.9"/>' +
      '<rect x="22" y="80" width="2.5" height="4" rx="0.5" fill="#f0f0e0" opacity="0.9"/>' +
      '<rect x="26" y="81" width="2" height="3.5" rx="0.5" fill="#f0f0e0" opacity="0.9"/>' +
      '<rect x="30" y="81" width="2" height="3" rx="0.5" fill="#f0f0e0" opacity="0.8"/>' +
      '<rect x="20" y="84" width="2" height="3" rx="0.5" fill="#f0f0e0" opacity="0.8" transform="rotate(180 21 85.5)"/>' +
      '<rect x="24" y="84" width="2" height="3" rx="0.5" fill="#f0f0e0" opacity="0.8" transform="rotate(180 25 85.5)"/>' +
      '<rect x="28" y="84" width="2" height="2.5" rx="0.5" fill="#f0f0e0" opacity="0.7" transform="rotate(180 29 85.25)"/>' +
      '<circle cx="38" cy="72" r="5.5" fill="white" stroke="#2a4550" stroke-width="0.5"/>' +
      '<circle cx="38" cy="72" r="3.5" fill="#cc6633"/>' +
      '<circle cx="38" cy="72" r="2" fill="#1a1a1a"/>' +
      '<circle cx="36.5" cy="70.5" r="1" fill="white" opacity="0.9"/>' +
      '<circle cx="18" cy="78" r="1" fill="#2a4550"/>' +
      '<circle cx="20" cy="76" r="0.8" fill="#2a4550"/>' +
      '<circle cx="50" cy="74" r="1.2" fill="#2a4550" opacity="0.15"/>' +
      '<circle cx="56" cy="78" r="1" fill="#2a4550" opacity="0.12"/>' +
      '<ellipse cx="80" cy="178" rx="22" ry="3" fill="#5a8c9c" opacity="0.25"/>' +
      '<path d="M82 178 Q78 180 84 180 Q90 180 86 178" fill="#5a8c9c" opacity="0.15"/>' +
      '<ellipse cx="130" cy="178" rx="18" ry="2.5" fill="#5a8c9c" opacity="0.2"/>' +
      '<path d="M100 152 Q102 158 102 168 Q102 176 100 180 Q98 182 96 180 Q94 176 94 168 Q94 158 96 152" fill="url(#spino-leg-grad)" stroke="#2a4550" stroke-width="0.5"/>' +
      '<path d="M90 180 L86 184 L90 182 L94 184 L98 182 L102 184 L100 180" fill="#2a4550"/>' +
      '<path d="M128 152 Q130 158 130 168 Q130 176 128 180 Q126 182 124 180 Q122 176 122 168 Q122 158 124 152" fill="url(#spino-leg-grad)" stroke="#2a4550" stroke-width="0.5"/>' +
      '<path d="M118 180 L114 184 L118 182 L122 184 L126 182 L130 184 L128 180" fill="#2a4550"/>' +
      '<path d="M103 158 Q105 162 105 170" fill="none" stroke="#2a4550" stroke-width="0.4"/>' +
      '<path d="M130 158 Q132 162 132 170" fill="none" stroke="#2a4550" stroke-width="0.4"/>' +
      '</svg>';
  },
  pteranodon: function () {
    return '<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="ptero-body-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7B6BA5"/><stop offset="100%" stop-color="#5a4d80"/></linearGradient>' +
      '<linearGradient id="ptero-belly-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8b7cb5"/><stop offset="100%" stop-color="#7B6BA5"/></linearGradient>' +
      '<radialGradient id="ptero-head-grad" cx="0.4" cy="0.4"><stop offset="0%" stop-color="#8b7cb5"/><stop offset="100%" stop-color="#5a4d80"/></radialGradient>' +
      '<linearGradient id="ptero-wing-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7B6BA5"/><stop offset="100%" stop-color="#5a4d80"/></linearGradient>' +
      '<linearGradient id="ptero-membrane-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8b7cb5" stop-opacity="0.6"/><stop offset="100%" stop-color="#5a4d80" stop-opacity="0.3"/></linearGradient>' +
      '<radialGradient id="ptero-shadow-grad" cx="0.5" cy="0.5"><stop offset="0%" stop-color="#000" stop-opacity="0.2"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<ellipse cx="120" cy="155" rx="30" ry="4" fill="url(#ptero-shadow-grad)"/>' +
      '<path d="M120 82 Q80 70 40 48 Q20 36 8 30 Q6 28 10 32 Q16 40 30 56 Q50 78 80 88 Q100 94 118 90" fill="url(#ptero-membrane-grad)" stroke="#5a4d80" stroke-width="0.5"/>' +
      '<path d="M122 82 Q160 70 200 48 Q220 36 232 30 Q234 28 230 32 Q224 40 210 56 Q190 78 160 88 Q140 94 124 90" fill="url(#ptero-membrane-grad)" stroke="#5a4d80" stroke-width="0.5"/>' +
      '<line x1="120" y1="82" x2="40" y2="48" stroke="#5a4d80" stroke-width="1.5"/>' +
      '<line x1="40" y1="48" x2="8" y2="30" stroke="#5a4d80" stroke-width="1"/>' +
      '<line x1="122" y1="82" x2="200" y2="48" stroke="#5a4d80" stroke-width="1.5"/>' +
      '<line x1="200" y1="48" x2="232" y2="30" stroke="#5a4d80" stroke-width="1"/>' +
      '<path d="M60 62 Q65 78 80 88" fill="none" stroke="#7B6BA5" stroke-width="0.4" opacity="0.5"/>' +
      '<path d="M80 56 Q85 72 95 84" fill="none" stroke="#7B6BA5" stroke-width="0.4" opacity="0.5"/>' +
      '<path d="M100 52 Q105 68 112 80" fill="none" stroke="#7B6BA5" stroke-width="0.4" opacity="0.4"/>' +
      '<path d="M180 62 Q175 78 160 88" fill="none" stroke="#7B6BA5" stroke-width="0.4" opacity="0.5"/>' +
      '<path d="M160 56 Q155 72 145 84" fill="none" stroke="#7B6BA5" stroke-width="0.4" opacity="0.5"/>' +
      '<path d="M140 52 Q135 68 128 80" fill="none" stroke="#7B6BA5" stroke-width="0.4" opacity="0.4"/>' +
      '<path d="M50 55 Q55 70 70 82" fill="none" stroke="#7B6BA5" stroke-width="0.3" opacity="0.35"/>' +
      '<path d="M190 55 Q185 70 170 82" fill="none" stroke="#7B6BA5" stroke-width="0.3" opacity="0.35"/>' +
      '<ellipse cx="121" cy="88" rx="18" ry="12" fill="url(#ptero-body-grad)" stroke="#5a4d80" stroke-width="0.5"/>' +
      '<ellipse cx="121" cy="94" rx="14" ry="6" fill="url(#ptero-belly-grad)" opacity="0.5"/>' +
      '<circle cx="115" cy="85" r="1.2" fill="#5a4d80" opacity="0.12"/>' +
      '<circle cx="125" cy="84" r="1.5" fill="#5a4d80" opacity="0.1"/>' +
      '<circle cx="118" cy="90" r="1" fill="#5a4d80" opacity="0.08"/>' +
      '<circle cx="128" cy="88" r="1.2" fill="#5a4d80" opacity="0.1"/>' +
      '<path d="M110 82 Q104 70 100 64" fill="none" stroke="#5a4d80" stroke-width="5"/>' +
      '<ellipse cx="96" cy="62" rx="16" ry="10" fill="url(#ptero-head-grad)" stroke="#5a4d80" stroke-width="0.5"/>' +
      '<path d="M98 55 Q110 38 125 32 Q128 32 126 35" fill="#7B6BA5" stroke="#5a4d80" stroke-width="0.8"/>' +
      '<path d="M100 54 Q108 42 118 36" fill="none" stroke="#5a4d80" stroke-width="0.3" opacity="0.4"/>' +
      '<path d="M82 64 Q74 68 78 70 Q88 72 94 68" fill="#5a4d80" stroke="#3d3560" stroke-width="0.5"/>' +
      '<circle cx="90" cy="57" r="4.5" fill="white" stroke="#5a4d80" stroke-width="0.5"/>' +
      '<circle cx="90" cy="57" r="2.8" fill="#cc6699"/>' +
      '<circle cx="90" cy="57" r="1.6" fill="#1a1a1a"/>' +
      '<circle cx="89" cy="55.5" r="0.8" fill="white" opacity="0.9"/>' +
      '<circle cx="84" cy="62" r="0.8" fill="#5a4d80"/>' +
      '<circle cx="86" cy="60" r="0.6" fill="#5a4d80"/>' +
      '<circle cx="100" cy="58" r="1" fill="#5a4d80" opacity="0.15"/>' +
      '<circle cx="104" cy="62" r="0.8" fill="#5a4d80" opacity="0.12"/>' +
      '<path d="M116 98 Q118 108 118 120 Q118 130 116 136" fill="none" stroke="#5a4d80" stroke-width="2"/>' +
      '<path d="M126 98 Q128 108 128 120 Q128 130 126 136" fill="none" stroke="#5a4d80" stroke-width="2"/>' +
      '<path d="M112 136 L110 140 L114 138 L118 140 L118 136" fill="#5a4d80"/>' +
      '<path d="M122 136 L120 140 L124 138 L128 140 L128 136" fill="#5a4d80"/>' +
      '</svg>';
  },
  diplodocus: function () {
    return '<svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="diplo-body-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7A8B5A"/><stop offset="100%" stop-color="#5a6b3a"/></linearGradient>' +
      '<linearGradient id="diplo-belly-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8a9c6a"/><stop offset="100%" stop-color="#7A8B5A"/></linearGradient>' +
      '<linearGradient id="diplo-neck-grad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#8a9c6a"/><stop offset="100%" stop-color="#5a6b3a"/></linearGradient>' +
      '<radialGradient id="diplo-head-grad" cx="0.4" cy="0.4"><stop offset="0%" stop-color="#8a9c6a"/><stop offset="100%" stop-color="#5a6b3a"/></radialGradient>' +
      '<linearGradient id="diplo-leg-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7A8B5A"/><stop offset="100%" stop-color="#3a4a25"/></linearGradient>' +
      '<radialGradient id="diplo-shadow-grad" cx="0.5" cy="0.5"><stop offset="0%" stop-color="#000" stop-opacity="0.3"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<ellipse cx="130" cy="172" rx="75" ry="6" fill="url(#diplo-shadow-grad)"/>' +
      '<path d="M168 128 Q190 122 205 128 Q215 134 218 140 Q220 148 210 146 Q206 144 200 138" fill="url(#diplo-body-grad)" stroke="#3a4a25" stroke-width="0.5"/>' +
      '<path d="M205 136 Q215 130 225 128 Q232 128 236 132" fill="none" stroke="#5a6b3a" stroke-width="3"/>' +
      '<path d="M234 132 Q238 134 240 132" fill="none" stroke="#5a6b3a" stroke-width="2"/>' +
      '<path d="M208 140 Q214 138 218 142" fill="none" stroke="#3a4a25" stroke-width="0.4"/>' +
      '<path d="M200 142 Q206 140 212 144" fill="none" stroke="#3a4a25" stroke-width="0.4"/>' +
      '<ellipse cx="130" cy="130" rx="48" ry="30" fill="url(#diplo-body-grad)" stroke="#3a4a25" stroke-width="0.5"/>' +
      '<ellipse cx="130" cy="142" rx="40" ry="16" fill="url(#diplo-belly-grad)" opacity="0.5"/>' +
      '<circle cx="115" cy="122" r="2" fill="#3a4a25" opacity="0.12"/>' +
      '<circle cx="128" cy="120" r="2.5" fill="#3a4a25" opacity="0.1"/>' +
      '<circle cx="142" cy="122" r="2" fill="#3a4a25" opacity="0.12"/>' +
      '<circle cx="152" cy="126" r="1.8" fill="#3a4a25" opacity="0.1"/>' +
      '<circle cx="108" cy="128" r="1.5" fill="#3a4a25" opacity="0.08"/>' +
      '<circle cx="160" cy="130" r="1.5" fill="#3a4a25" opacity="0.08"/>' +
      '<circle cx="135" cy="132" r="1.8" fill="#3a4a25" opacity="0.08"/>' +
      '<circle cx="120" cy="136" r="1.5" fill="#3a4a25" opacity="0.1"/>' +
      '<path d="M92 124 Q80 88 68 60 Q58 38 48 28" fill="none" stroke="url(#diplo-neck-grad)" stroke-width="14" stroke-linecap="round"/>' +
      '<path d="M86 120 Q76 90 64 64 Q56 44 48 35" fill="none" stroke="#8a9c6a" stroke-width="7" stroke-linecap="round" opacity="0.4"/>' +
      '<circle cx="78" cy="92" r="1.5" fill="#3a4a25" opacity="0.1"/>' +
      '<circle cx="72" cy="75" r="1.2" fill="#3a4a25" opacity="0.1"/>' +
      '<circle cx="66" cy="58" r="1.5" fill="#3a4a25" opacity="0.12"/>' +
      '<circle cx="60" cy="45" r="1" fill="#3a4a25" opacity="0.1"/>' +
      '<circle cx="82" cy="105" r="1.8" fill="#3a4a25" opacity="0.08"/>' +
      '<circle cx="75" cy="82" r="1.2" fill="#3a4a25" opacity="0.08"/>' +
      '<ellipse cx="44" cy="25" rx="14" ry="10" fill="url(#diplo-head-grad)" stroke="#3a4a25" stroke-width="0.5"/>' +
      '<path d="M32 28 Q26 32 30 34 Q40 36 44 32" fill="#5a6b3a" stroke="#3a4a25" stroke-width="0.5"/>' +
      '<circle cx="38" cy="20" r="4" fill="white" stroke="#3a4a25" stroke-width="0.5"/>' +
      '<circle cx="38" cy="20" r="2.5" fill="#5a8040"/>' +
      '<circle cx="38" cy="20" r="1.4" fill="#1a1a1a"/>' +
      '<circle cx="37" cy="18.5" r="0.8" fill="white" opacity="0.9"/>' +
      '<circle cx="33" cy="24" r="0.7" fill="#3a4a25"/>' +
      '<circle cx="35" cy="22" r="0.5" fill="#3a4a25"/>' +
      '<circle cx="48" cy="22" r="1" fill="#3a4a25" opacity="0.15"/>' +
      '<circle cx="52" cy="26" r="0.8" fill="#3a4a25" opacity="0.12"/>' +
      '<line x1="52" y1="18" x2="56" y2="14" stroke="#8a9c6a" stroke-width="0.5" opacity="0.3"/>' +
      '<path d="M112 150 Q114 156 114 164 Q114 170 112 174 Q110 176 108 174 Q106 170 106 164 Q106 156 108 150" fill="url(#diplo-leg-grad)" stroke="#3a4a25" stroke-width="0.5"/>' +
      '<ellipse cx="110" cy="175" rx="6" ry="3" fill="#3a4a25"/>' +
      '<path d="M148 150 Q150 156 150 164 Q150 170 148 174 Q146 176 144 174 Q142 170 142 164 Q142 156 144 150" fill="url(#diplo-leg-grad)" stroke="#3a4a25" stroke-width="0.5"/>' +
      '<ellipse cx="146" cy="175" rx="6" ry="3" fill="#3a4a25"/>' +
      '<path d="M104 152 Q106 157 106 163 Q106 168 104 172 Q102 174 100 172 Q98 168 98 163 Q98 157 100 152" fill="url(#diplo-leg-grad)" stroke="#3a4a25" stroke-width="0.5" opacity="0.7"/>' +
      '<path d="M156 152 Q158 157 158 163 Q158 168 156 172 Q154 174 152 172 Q150 168 150 163 Q150 157 152 152" fill="url(#diplo-leg-grad)" stroke="#3a4a25" stroke-width="0.5" opacity="0.7"/>' +
      '<path d="M116 156 Q118 160 118 166" fill="none" stroke="#3a4a25" stroke-width="0.3"/>' +
      '<path d="M150 156 Q152 160 152 166" fill="none" stroke="#3a4a25" stroke-width="0.3"/>' +
      '</svg>';
  }
};
