/* ===== SVG Generator Functions for 10 Monster Trucks ===== */
window.TruckSVG = {
  gravedigger: function () {
    return '<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
    '<linearGradient id="gd-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2d8a4e"/><stop offset="100%" stop-color="#1a6b35"/></linearGradient>' +
    '<linearGradient id="gd-cab" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#34a85a"/><stop offset="100%" stop-color="#2d8a4e"/></linearGradient>' +
    '<linearGradient id="gd-tire" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a1a1a"/><stop offset="100%" stop-color="#2d3436"/></linearGradient>' +
    '<linearGradient id="gd-rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#aaa"/><stop offset="100%" stop-color="#666"/></linearGradient>' +
    '<radialGradient id="gd-shadow" cx="0.5" cy="0.5"><stop offset="0%" stop-color="#000" stop-opacity="0.35"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>' +
    '<linearGradient id="gd-flame" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#2d8a4e"/><stop offset="100%" stop-color="#a8e06a"/></linearGradient>' +
    '</defs>' +
    // Ground shadow
    '<ellipse cx="110" cy="148" rx="85" ry="8" fill="url(#gd-shadow)"/>' +
    // Body rectangle with gradient
    '<rect x="40" y="52" width="140" height="48" rx="6" fill="url(#gd-body)" stroke="#145a28" stroke-width="0.5"/>' +
    // Panel lines on body
    '<line x1="75" y1="55" x2="75" y2="97" stroke="#145a28" stroke-width="0.5" opacity="0.4"/>' +
    '<line x1="145" y1="55" x2="145" y2="97" stroke="#145a28" stroke-width="0.5" opacity="0.4"/>' +
    '<line x1="110" y1="55" x2="110" y2="97" stroke="#145a28" stroke-width="0.5" opacity="0.4"/>' +
    '<line x1="43" y1="75" x2="177" y2="75" stroke="#145a28" stroke-width="0.5" opacity="0.3"/>' +
    // Cab rectangle with gradient
    '<rect x="55" y="28" width="85" height="30" rx="5" fill="url(#gd-cab)" stroke="#145a28" stroke-width="0.5"/>' +
    // Windshield left
    '<rect x="62" y="33" width="30" height="18" rx="3" fill="#a8d8ea" opacity="0.8"/>' +
    '<rect x="63" y="34" width="12" height="6" rx="2" fill="white" opacity="0.3"/>' +
    // Windshield right
    '<rect x="98" y="33" width="30" height="18" rx="3" fill="#a8d8ea" opacity="0.8"/>' +
    '<rect x="99" y="34" width="12" height="6" rx="2" fill="white" opacity="0.3"/>' +
    // Windshield divider
    '<rect x="93" y="32" width="4" height="20" rx="1" fill="#145a28"/>' +
    // Purple "GRAVE DIGGER" text
    '<text x="110" y="70" text-anchor="middle" font-size="9" font-weight="bold" fill="#9b59b6" font-family="sans-serif" letter-spacing="0.5">GRAVE DIGGER</text>' +
    // Tombstone shapes on body side (left)
    '<rect x="50" y="78" width="8" height="12" rx="2" fill="#555" opacity="0.6"/>' +
    '<path d="M50 78 Q54 72 58 78" fill="#555" opacity="0.6"/>' +
    '<line x1="54" y1="81" x2="54" y2="88" stroke="#888" stroke-width="0.5" opacity="0.5"/>' +
    // Tombstone (middle)
    '<rect x="62" y="80" width="7" height="10" rx="1.5" fill="#666" opacity="0.5"/>' +
    '<path d="M62 80 Q65.5 75 69 80" fill="#666" opacity="0.5"/>' +
    // Tombstone (right side)
    '<rect x="150" y="78" width="8" height="12" rx="2" fill="#555" opacity="0.6"/>' +
    '<path d="M150 78 Q154 72 158 78" fill="#555" opacity="0.6"/>' +
    '<line x1="154" y1="81" x2="154" y2="88" stroke="#888" stroke-width="0.5" opacity="0.5"/>' +
    // Green flame details on front fender
    '<path d="M42 88 Q35 80 38 72 Q42 78 44 74 Q46 80 42 88" fill="url(#gd-flame)" opacity="0.7"/>' +
    '<path d="M46 90 Q40 84 42 78 Q45 82 47 79 Q48 84 46 90" fill="url(#gd-flame)" opacity="0.5"/>' +
    // Green flame details on rear fender
    '<path d="M178 88 Q185 80 182 72 Q178 78 176 74 Q174 80 178 88" fill="url(#gd-flame)" opacity="0.7"/>' +
    '<path d="M174 90 Q180 84 178 78 Q175 82 173 79 Q172 84 174 90" fill="url(#gd-flame)" opacity="0.5"/>' +
    // Suspension rects
    '<rect x="60" y="95" width="10" height="16" rx="2" fill="#555" stroke="#444" stroke-width="0.5"/>' +
    '<rect x="150" y="95" width="10" height="16" rx="2" fill="#555" stroke="#444" stroke-width="0.5"/>' +
    // Left wheel - outer tire
    '<circle cx="70" cy="115" r="25" fill="url(#gd-tire)"/>' +
    // Left wheel - tread marks
    '<rect x="46" y="112" width="6" height="4" rx="1" fill="#111" transform="rotate(-15 49 114)"/>' +
    '<rect x="48" y="99" width="6" height="4" rx="1" fill="#111" transform="rotate(-50 51 101)"/>' +
    '<rect x="58" y="91" width="6" height="4" rx="1" fill="#111" transform="rotate(-80 61 93)"/>' +
    '<rect x="82" y="91" width="6" height="4" rx="1" fill="#111" transform="rotate(80 85 93)"/>' +
    '<rect x="88" y="99" width="6" height="4" rx="1" fill="#111" transform="rotate(50 91 101)"/>' +
    '<rect x="90" y="112" width="6" height="4" rx="1" fill="#111" transform="rotate(15 93 114)"/>' +
    // Left wheel - inner rim
    '<circle cx="70" cy="115" r="14" fill="url(#gd-rim)" stroke="#555" stroke-width="0.5"/>' +
    // Left wheel - hub
    '<circle cx="70" cy="115" r="6" fill="#888" stroke="#666" stroke-width="0.5"/>' +
    '<circle cx="70" cy="115" r="2" fill="#aaa"/>' +
    // Right wheel - outer tire
    '<circle cx="150" cy="115" r="25" fill="url(#gd-tire)"/>' +
    // Right wheel - tread marks
    '<rect x="126" y="112" width="6" height="4" rx="1" fill="#111" transform="rotate(-15 129 114)"/>' +
    '<rect x="128" y="99" width="6" height="4" rx="1" fill="#111" transform="rotate(-50 131 101)"/>' +
    '<rect x="138" y="91" width="6" height="4" rx="1" fill="#111" transform="rotate(-80 141 93)"/>' +
    '<rect x="162" y="91" width="6" height="4" rx="1" fill="#111" transform="rotate(80 165 93)"/>' +
    '<rect x="168" y="99" width="6" height="4" rx="1" fill="#111" transform="rotate(50 171 101)"/>' +
    '<rect x="170" y="112" width="6" height="4" rx="1" fill="#111" transform="rotate(15 173 114)"/>' +
    // Right wheel - inner rim
    '<circle cx="150" cy="115" r="14" fill="url(#gd-rim)" stroke="#555" stroke-width="0.5"/>' +
    // Right wheel - hub
    '<circle cx="150" cy="115" r="6" fill="#888" stroke="#666" stroke-width="0.5"/>' +
    '<circle cx="150" cy="115" r="2" fill="#aaa"/>' +
    // Front/rear bumper accents
    '<rect x="38" y="55" width="4" height="40" rx="2" fill="#145a28" opacity="0.5"/>' +
    '<rect x="178" y="55" width="4" height="40" rx="2" fill="#145a28" opacity="0.5"/>' +
    // Headlights
    '<circle cx="42" cy="62" r="3" fill="#f1c40f" opacity="0.8"/>' +
    '<circle cx="42" cy="62" r="1.5" fill="white" opacity="0.5"/>' +
    '</svg>';
  },

  megalodon: function () {
    return '<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
    '<linearGradient id="mg-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2980b9"/><stop offset="100%" stop-color="#1a5276"/></linearGradient>' +
    '<linearGradient id="mg-cab" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3498db"/><stop offset="100%" stop-color="#2980b9"/></linearGradient>' +
    '<linearGradient id="mg-tire" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a1a1a"/><stop offset="100%" stop-color="#2d3436"/></linearGradient>' +
    '<linearGradient id="mg-rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#aaa"/><stop offset="100%" stop-color="#666"/></linearGradient>' +
    '<radialGradient id="mg-shadow" cx="0.5" cy="0.5"><stop offset="0%" stop-color="#000" stop-opacity="0.35"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>' +
    '<linearGradient id="mg-fin" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#2980b9"/><stop offset="100%" stop-color="#5dade2"/></linearGradient>' +
    '</defs>' +
    // Ground shadow
    '<ellipse cx="110" cy="148" rx="85" ry="8" fill="url(#mg-shadow)"/>' +
    // Body rectangle with gradient
    '<rect x="40" y="52" width="140" height="48" rx="6" fill="url(#mg-body)" stroke="#154360" stroke-width="0.5"/>' +
    // Panel lines on body
    '<line x1="75" y1="55" x2="75" y2="97" stroke="#154360" stroke-width="0.5" opacity="0.4"/>' +
    '<line x1="145" y1="55" x2="145" y2="97" stroke="#154360" stroke-width="0.5" opacity="0.4"/>' +
    '<line x1="110" y1="55" x2="110" y2="97" stroke="#154360" stroke-width="0.5" opacity="0.3"/>' +
    '<line x1="43" y1="75" x2="177" y2="75" stroke="#154360" stroke-width="0.5" opacity="0.3"/>' +
    // Cab rectangle with gradient
    '<rect x="52" y="26" width="90" height="32" rx="5" fill="url(#mg-cab)" stroke="#154360" stroke-width="0.5"/>' +
    // Large dorsal fin (triangle on cab roof)
    '<polygon points="97,26 110,2 115,26" fill="url(#mg-fin)" stroke="#154360" stroke-width="0.5"/>' +
    '<line x1="107" y1="8" x2="107" y2="26" stroke="#154360" stroke-width="0.3" opacity="0.3"/>' +
    '<line x1="103" y1="16" x2="112" y2="16" stroke="#154360" stroke-width="0.3" opacity="0.3"/>' +
    // Windshield (single wide)
    '<rect x="60" y="31" width="72" height="20" rx="3" fill="#a8d8ea" opacity="0.8"/>' +
    '<rect x="62" y="32" width="28" height="7" rx="2" fill="white" opacity="0.3"/>' +
    // Eye on cab side
    '<circle cx="135" cy="38" r="7" fill="white" stroke="#154360" stroke-width="0.5"/>' +
    '<circle cx="137" cy="38" r="4" fill="#1a1a1a"/>' +
    '<circle cx="138" cy="36" r="1.5" fill="white" opacity="0.7"/>' +
    // White zigzag teeth along bottom edge of body
    '<polygon points="44,97 48,90 52,97" fill="white" opacity="0.9"/>' +
    '<polygon points="52,97 56,90 60,97" fill="white" opacity="0.9"/>' +
    '<polygon points="60,97 64,90 68,97" fill="white" opacity="0.9"/>' +
    '<polygon points="68,97 72,90 76,97" fill="white" opacity="0.85"/>' +
    '<polygon points="100,97 104,90 108,97" fill="white" opacity="0.85"/>' +
    '<polygon points="108,97 112,90 116,97" fill="white" opacity="0.9"/>' +
    '<polygon points="140,97 144,90 148,97" fill="white" opacity="0.85"/>' +
    '<polygon points="148,97 152,90 156,97" fill="white" opacity="0.9"/>' +
    '<polygon points="156,97 160,90 164,97" fill="white" opacity="0.9"/>' +
    '<polygon points="164,97 168,90 172,97" fill="white" opacity="0.9"/>' +
    // Suspension rects
    '<rect x="60" y="95" width="10" height="16" rx="2" fill="#555" stroke="#444" stroke-width="0.5"/>' +
    '<rect x="150" y="95" width="10" height="16" rx="2" fill="#555" stroke="#444" stroke-width="0.5"/>' +
    // Left wheel - outer tire
    '<circle cx="70" cy="115" r="25" fill="url(#mg-tire)"/>' +
    // Left wheel - tread marks
    '<rect x="46" y="112" width="6" height="4" rx="1" fill="#111" transform="rotate(-15 49 114)"/>' +
    '<rect x="48" y="99" width="6" height="4" rx="1" fill="#111" transform="rotate(-50 51 101)"/>' +
    '<rect x="58" y="91" width="6" height="4" rx="1" fill="#111" transform="rotate(-80 61 93)"/>' +
    '<rect x="82" y="91" width="6" height="4" rx="1" fill="#111" transform="rotate(80 85 93)"/>' +
    '<rect x="88" y="99" width="6" height="4" rx="1" fill="#111" transform="rotate(50 91 101)"/>' +
    '<rect x="90" y="112" width="6" height="4" rx="1" fill="#111" transform="rotate(15 93 114)"/>' +
    // Left wheel - inner rim
    '<circle cx="70" cy="115" r="14" fill="url(#mg-rim)" stroke="#555" stroke-width="0.5"/>' +
    // Left wheel - hub
    '<circle cx="70" cy="115" r="6" fill="#888" stroke="#666" stroke-width="0.5"/>' +
    '<circle cx="70" cy="115" r="2" fill="#aaa"/>' +
    // Right wheel - outer tire
    '<circle cx="150" cy="115" r="25" fill="url(#mg-tire)"/>' +
    // Right wheel - tread marks
    '<rect x="126" y="112" width="6" height="4" rx="1" fill="#111" transform="rotate(-15 129 114)"/>' +
    '<rect x="128" y="99" width="6" height="4" rx="1" fill="#111" transform="rotate(-50 131 101)"/>' +
    '<rect x="138" y="91" width="6" height="4" rx="1" fill="#111" transform="rotate(-80 141 93)"/>' +
    '<rect x="162" y="91" width="6" height="4" rx="1" fill="#111" transform="rotate(80 165 93)"/>' +
    '<rect x="168" y="99" width="6" height="4" rx="1" fill="#111" transform="rotate(50 171 101)"/>' +
    '<rect x="170" y="112" width="6" height="4" rx="1" fill="#111" transform="rotate(15 173 114)"/>' +
    // Right wheel - inner rim
    '<circle cx="150" cy="115" r="14" fill="url(#mg-rim)" stroke="#555" stroke-width="0.5"/>' +
    // Right wheel - hub
    '<circle cx="150" cy="115" r="6" fill="#888" stroke="#666" stroke-width="0.5"/>' +
    '<circle cx="150" cy="115" r="2" fill="#aaa"/>' +
    // Tail fin on rear
    '<polygon points="175,52 188,42 180,58" fill="url(#mg-fin)" opacity="0.7"/>' +
    // Headlights
    '<circle cx="42" cy="62" r="3" fill="#f1c40f" opacity="0.8"/>' +
    '<circle cx="42" cy="62" r="1.5" fill="white" opacity="0.5"/>' +
    // Body scale texture
    '<path d="M80 60 Q85 57 90 60" fill="none" stroke="#154360" stroke-width="0.4" opacity="0.3"/>' +
    '<path d="M95 60 Q100 57 105 60" fill="none" stroke="#154360" stroke-width="0.4" opacity="0.3"/>' +
    '<path d="M85 68 Q90 65 95 68" fill="none" stroke="#154360" stroke-width="0.4" opacity="0.3"/>' +
    '<path d="M100 68 Q105 65 110 68" fill="none" stroke="#154360" stroke-width="0.4" opacity="0.3"/>' +
    '</svg>';
  },

  eltoro: function () {
    return '<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
    '<linearGradient id="et-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e74c3c"/><stop offset="100%" stop-color="#c0392b"/></linearGradient>' +
    '<linearGradient id="et-cab" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ec7063"/><stop offset="100%" stop-color="#e74c3c"/></linearGradient>' +
    '<linearGradient id="et-tire" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a1a1a"/><stop offset="100%" stop-color="#2d3436"/></linearGradient>' +
    '<linearGradient id="et-rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#aaa"/><stop offset="100%" stop-color="#666"/></linearGradient>' +
    '<radialGradient id="et-shadow" cx="0.5" cy="0.5"><stop offset="0%" stop-color="#000" stop-opacity="0.35"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>' +
    '<linearGradient id="et-horn" x1="0" y1="1" x2="0.5" y2="0"><stop offset="0%" stop-color="#8B7355"/><stop offset="100%" stop-color="#c9b896"/></linearGradient>' +
    '</defs>' +
    // Ground shadow
    '<ellipse cx="110" cy="148" rx="85" ry="8" fill="url(#et-shadow)"/>' +
    // Body rectangle with gradient
    '<rect x="40" y="52" width="140" height="48" rx="6" fill="url(#et-body)" stroke="#922b21" stroke-width="0.5"/>' +
    // Panel lines on body
    '<line x1="75" y1="55" x2="75" y2="97" stroke="#922b21" stroke-width="0.5" opacity="0.4"/>' +
    '<line x1="145" y1="55" x2="145" y2="97" stroke="#922b21" stroke-width="0.5" opacity="0.4"/>' +
    '<line x1="110" y1="55" x2="110" y2="97" stroke="#922b21" stroke-width="0.5" opacity="0.3"/>' +
    '<line x1="43" y1="75" x2="177" y2="75" stroke="#922b21" stroke-width="0.5" opacity="0.3"/>' +
    // Cab rectangle with gradient
    '<rect x="55" y="28" width="85" height="30" rx="5" fill="url(#et-cab)" stroke="#922b21" stroke-width="0.5"/>' +
    // Curved bull horns from cab roof (left horn)
    '<path d="M65 28 Q55 12 42 8 Q38 6 36 10" fill="none" stroke="url(#et-horn)" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M65 28 Q55 12 42 8 Q38 6 36 10" fill="none" stroke="#c9b896" stroke-width="3" stroke-linecap="round" opacity="0.4"/>' +
    // Right horn
    '<path d="M130 28 Q140 12 153 8 Q157 6 159 10" fill="none" stroke="url(#et-horn)" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M130 28 Q140 12 153 8 Q157 6 159 10" fill="none" stroke="#c9b896" stroke-width="3" stroke-linecap="round" opacity="0.4"/>' +
    // Windshield left
    '<rect x="62" y="33" width="30" height="18" rx="3" fill="#a8d8ea" opacity="0.8"/>' +
    '<rect x="63" y="34" width="12" height="6" rx="2" fill="white" opacity="0.3"/>' +
    // Windshield right
    '<rect x="98" y="33" width="30" height="18" rx="3" fill="#a8d8ea" opacity="0.8"/>' +
    '<rect x="99" y="34" width="12" height="6" rx="2" fill="white" opacity="0.3"/>' +
    // Windshield divider
    '<rect x="93" y="32" width="4" height="20" rx="1" fill="#922b21"/>' +
    // Yellow eyes with red pupils (on body front area)
    '<circle cx="50" cy="65" r="6" fill="#f1c40f" stroke="#922b21" stroke-width="0.5"/>' +
    '<circle cx="50" cy="65" r="3" fill="#e74c3c"/>' +
    '<circle cx="51" cy="64" r="1" fill="white" opacity="0.5"/>' +
    // Right eye
    '<circle cx="50" cy="80" r="6" fill="#f1c40f" stroke="#922b21" stroke-width="0.5"/>' +
    '<circle cx="50" cy="80" r="3" fill="#e74c3c"/>' +
    '<circle cx="51" cy="79" r="1" fill="white" opacity="0.5"/>' +
    // Nose ring (circle at front)
    '<circle cx="38" cy="73" r="5" fill="none" stroke="#aaa" stroke-width="2"/>' +
    '<circle cx="38" cy="73" r="5" fill="none" stroke="#ccc" stroke-width="1" opacity="0.5"/>' +
    // Grey smoke puffs from nostrils
    '<circle cx="35" cy="62" r="4" fill="#bdc3c7" opacity="0.4"/>' +
    '<circle cx="30" cy="58" r="3" fill="#bdc3c7" opacity="0.3"/>' +
    '<circle cx="26" cy="55" r="2.5" fill="#bdc3c7" opacity="0.2"/>' +
    '<circle cx="35" cy="83" r="4" fill="#bdc3c7" opacity="0.4"/>' +
    '<circle cx="30" cy="87" r="3" fill="#bdc3c7" opacity="0.3"/>' +
    '<circle cx="26" cy="90" r="2.5" fill="#bdc3c7" opacity="0.2"/>' +
    // Suspension rects
    '<rect x="60" y="95" width="10" height="16" rx="2" fill="#555" stroke="#444" stroke-width="0.5"/>' +
    '<rect x="150" y="95" width="10" height="16" rx="2" fill="#555" stroke="#444" stroke-width="0.5"/>' +
    // Left wheel - outer tire
    '<circle cx="70" cy="115" r="25" fill="url(#et-tire)"/>' +
    // Left wheel - tread marks
    '<rect x="46" y="112" width="6" height="4" rx="1" fill="#111" transform="rotate(-15 49 114)"/>' +
    '<rect x="48" y="99" width="6" height="4" rx="1" fill="#111" transform="rotate(-50 51 101)"/>' +
    '<rect x="58" y="91" width="6" height="4" rx="1" fill="#111" transform="rotate(-80 61 93)"/>' +
    '<rect x="82" y="91" width="6" height="4" rx="1" fill="#111" transform="rotate(80 85 93)"/>' +
    '<rect x="88" y="99" width="6" height="4" rx="1" fill="#111" transform="rotate(50 91 101)"/>' +
    '<rect x="90" y="112" width="6" height="4" rx="1" fill="#111" transform="rotate(15 93 114)"/>' +
    // Left wheel - inner rim
    '<circle cx="70" cy="115" r="14" fill="url(#et-rim)" stroke="#555" stroke-width="0.5"/>' +
    // Left wheel - hub
    '<circle cx="70" cy="115" r="6" fill="#888" stroke="#666" stroke-width="0.5"/>' +
    '<circle cx="70" cy="115" r="2" fill="#aaa"/>' +
    // Right wheel - outer tire
    '<circle cx="150" cy="115" r="25" fill="url(#et-tire)"/>' +
    // Right wheel - tread marks
    '<rect x="126" y="112" width="6" height="4" rx="1" fill="#111" transform="rotate(-15 129 114)"/>' +
    '<rect x="128" y="99" width="6" height="4" rx="1" fill="#111" transform="rotate(-50 131 101)"/>' +
    '<rect x="138" y="91" width="6" height="4" rx="1" fill="#111" transform="rotate(-80 141 93)"/>' +
    '<rect x="162" y="91" width="6" height="4" rx="1" fill="#111" transform="rotate(80 165 93)"/>' +
    '<rect x="168" y="99" width="6" height="4" rx="1" fill="#111" transform="rotate(50 171 101)"/>' +
    '<rect x="170" y="112" width="6" height="4" rx="1" fill="#111" transform="rotate(15 173 114)"/>' +
    // Right wheel - inner rim
    '<circle cx="150" cy="115" r="14" fill="url(#et-rim)" stroke="#555" stroke-width="0.5"/>' +
    // Right wheel - hub
    '<circle cx="150" cy="115" r="6" fill="#888" stroke="#666" stroke-width="0.5"/>' +
    '<circle cx="150" cy="115" r="2" fill="#aaa"/>' +
    // Tail accent
    '<rect x="178" y="55" width="4" height="40" rx="2" fill="#922b21" opacity="0.5"/>' +
    // Headlights
    '<circle cx="42" cy="58" r="2" fill="#f1c40f" opacity="0.6"/>' +
    '</svg>';
  },

  maxd: function () {
    return '<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
    '<linearGradient id="mx-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2c3e50"/><stop offset="100%" stop-color="#1a252f"/></linearGradient>' +
    '<linearGradient id="mx-cab" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#34495e"/><stop offset="100%" stop-color="#2c3e50"/></linearGradient>' +
    '<linearGradient id="mx-tire" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a1a1a"/><stop offset="100%" stop-color="#2d3436"/></linearGradient>' +
    '<linearGradient id="mx-rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#aaa"/><stop offset="100%" stop-color="#666"/></linearGradient>' +
    '<radialGradient id="mx-shadow" cx="0.5" cy="0.5"><stop offset="0%" stop-color="#000" stop-opacity="0.35"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>' +
    '<linearGradient id="mx-fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f39c12"/><stop offset="100%" stop-color="#e67e22"/></linearGradient>' +
    '</defs>' +
    // Ground shadow
    '<ellipse cx="110" cy="148" rx="85" ry="8" fill="url(#mx-shadow)"/>' +
    // Body rectangle with gradient
    '<rect x="40" y="52" width="140" height="48" rx="6" fill="url(#mx-body)" stroke="#111820" stroke-width="0.5"/>' +
    // Panel lines on body
    '<line x1="75" y1="55" x2="75" y2="97" stroke="#111820" stroke-width="0.5" opacity="0.4"/>' +
    '<line x1="145" y1="55" x2="145" y2="97" stroke="#111820" stroke-width="0.5" opacity="0.4"/>' +
    '<line x1="110" y1="55" x2="110" y2="97" stroke="#111820" stroke-width="0.5" opacity="0.3"/>' +
    '<line x1="43" y1="75" x2="177" y2="75" stroke="#111820" stroke-width="0.5" opacity="0.3"/>' +
    // Elevated cab (trapezoidal path)
    '<path d="M58 52 L65 22 L130 22 L137 52" fill="url(#mx-cab)" stroke="#111820" stroke-width="0.5"/>' +
    // Cab roof line
    '<line x1="65" y1="22" x2="130" y2="22" stroke="#555" stroke-width="0.5"/>' +
    // Windshield left
    '<path d="M72 26 L68 48 L95 48 L95 26" fill="#a8d8ea" opacity="0.8"/>' +
    '<rect x="73" y="28" width="10" height="6" rx="1" fill="white" opacity="0.3"/>' +
    // Windshield right
    '<path d="M100 26 L100 48 L127 48 L123 26" fill="#a8d8ea" opacity="0.8"/>' +
    '<rect x="101" y="28" width="10" height="6" rx="1" fill="white" opacity="0.3"/>' +
    // Windshield divider
    '<rect x="96" y="24" width="4" height="26" rx="1" fill="#2c3e50"/>' +
    // "MAX-D" text in orange
    '<text x="110" y="72" text-anchor="middle" font-size="14" font-weight="bold" fill="#f39c12" font-family="sans-serif" letter-spacing="1">MAX-D</text>' +
    '<text x="110" y="72" text-anchor="middle" font-size="14" font-weight="bold" fill="#f5b041" font-family="sans-serif" letter-spacing="1" opacity="0.3" dy="-0.5">MAX-D</text>' +
    // Yellow/orange side fin polygons (left side)
    '<polygon points="40,55 28,48 40,65" fill="url(#mx-fin)" opacity="0.9"/>' +
    '<polygon points="40,60 32,54 40,72" fill="#e67e22" opacity="0.5"/>' +
    // Right side fin polygons
    '<polygon points="180,55 192,48 180,65" fill="url(#mx-fin)" opacity="0.9"/>' +
    '<polygon points="180,60 188,54 180,72" fill="#e67e22" opacity="0.5"/>' +
    // Bottom fin accents
    '<polygon points="40,88 30,82 40,95" fill="#f39c12" opacity="0.6"/>' +
    '<polygon points="180,88 190,82 180,95" fill="#f39c12" opacity="0.6"/>' +
    // Suspension rects
    '<rect x="60" y="95" width="10" height="16" rx="2" fill="#555" stroke="#444" stroke-width="0.5"/>' +
    '<rect x="150" y="95" width="10" height="16" rx="2" fill="#555" stroke="#444" stroke-width="0.5"/>' +
    // Left wheel - outer tire
    '<circle cx="70" cy="115" r="25" fill="url(#mx-tire)"/>' +
    // Left wheel - tread marks
    '<rect x="46" y="112" width="6" height="4" rx="1" fill="#111" transform="rotate(-15 49 114)"/>' +
    '<rect x="48" y="99" width="6" height="4" rx="1" fill="#111" transform="rotate(-50 51 101)"/>' +
    '<rect x="58" y="91" width="6" height="4" rx="1" fill="#111" transform="rotate(-80 61 93)"/>' +
    '<rect x="82" y="91" width="6" height="4" rx="1" fill="#111" transform="rotate(80 85 93)"/>' +
    '<rect x="88" y="99" width="6" height="4" rx="1" fill="#111" transform="rotate(50 91 101)"/>' +
    '<rect x="90" y="112" width="6" height="4" rx="1" fill="#111" transform="rotate(15 93 114)"/>' +
    // Left wheel - inner rim
    '<circle cx="70" cy="115" r="14" fill="url(#mx-rim)" stroke="#555" stroke-width="0.5"/>' +
    // Left wheel - hub
    '<circle cx="70" cy="115" r="6" fill="#888" stroke="#666" stroke-width="0.5"/>' +
    '<circle cx="70" cy="115" r="2" fill="#aaa"/>' +
    // Right wheel - outer tire
    '<circle cx="150" cy="115" r="25" fill="url(#mx-tire)"/>' +
    // Right wheel - tread marks
    '<rect x="126" y="112" width="6" height="4" rx="1" fill="#111" transform="rotate(-15 129 114)"/>' +
    '<rect x="128" y="99" width="6" height="4" rx="1" fill="#111" transform="rotate(-50 131 101)"/>' +
    '<rect x="138" y="91" width="6" height="4" rx="1" fill="#111" transform="rotate(-80 141 93)"/>' +
    '<rect x="162" y="91" width="6" height="4" rx="1" fill="#111" transform="rotate(80 165 93)"/>' +
    '<rect x="168" y="99" width="6" height="4" rx="1" fill="#111" transform="rotate(50 171 101)"/>' +
    '<rect x="170" y="112" width="6" height="4" rx="1" fill="#111" transform="rotate(15 173 114)"/>' +
    // Right wheel - inner rim
    '<circle cx="150" cy="115" r="14" fill="url(#mx-rim)" stroke="#555" stroke-width="0.5"/>' +
    // Right wheel - hub
    '<circle cx="150" cy="115" r="6" fill="#888" stroke="#666" stroke-width="0.5"/>' +
    '<circle cx="150" cy="115" r="2" fill="#aaa"/>' +
    // Headlights
    '<circle cx="42" cy="62" r="3" fill="#f39c12" opacity="0.8"/>' +
    '<circle cx="42" cy="62" r="1.5" fill="#f5e642" opacity="0.5"/>' +
    // Rear light
    '<circle cx="178" cy="62" r="2.5" fill="#e74c3c" opacity="0.7"/>' +
    // Roof scoop
    '<rect x="88" y="18" width="20" height="5" rx="2" fill="#34495e" stroke="#111820" stroke-width="0.5"/>' +
    '</svg>';
  },

  bluethunder: function () {
    return '<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
    '<linearGradient id="bt-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2980b9"/><stop offset="100%" stop-color="#3498db"/></linearGradient>' +
    '<linearGradient id="bt-cab" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3498db"/><stop offset="100%" stop-color="#2980b9"/></linearGradient>' +
    '<linearGradient id="bt-tire" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a1a1a"/><stop offset="100%" stop-color="#2d3436"/></linearGradient>' +
    '<linearGradient id="bt-rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#aaa"/><stop offset="100%" stop-color="#666"/></linearGradient>' +
    '<radialGradient id="bt-shadow" cx="0.5" cy="0.5"><stop offset="0%" stop-color="#000" stop-opacity="0.35"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>' +
    '<linearGradient id="bt-bolt" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f5e642"/><stop offset="100%" stop-color="#f1c40f"/></linearGradient>' +
    '</defs>' +
    // Ground shadow
    '<ellipse cx="110" cy="148" rx="85" ry="8" fill="url(#bt-shadow)"/>' +
    // Body rectangle with gradient
    '<rect x="40" y="52" width="140" height="48" rx="6" fill="url(#bt-body)" stroke="#1a6fa0" stroke-width="0.5"/>' +
    // Panel lines on body
    '<line x1="75" y1="55" x2="75" y2="97" stroke="#1a6fa0" stroke-width="0.5" opacity="0.4"/>' +
    '<line x1="145" y1="55" x2="145" y2="97" stroke="#1a6fa0" stroke-width="0.5" opacity="0.4"/>' +
    '<line x1="110" y1="55" x2="110" y2="97" stroke="#1a6fa0" stroke-width="0.5" opacity="0.3"/>' +
    '<line x1="43" y1="75" x2="177" y2="75" stroke="#1a6fa0" stroke-width="0.5" opacity="0.3"/>' +
    // Cab rectangle with gradient
    '<rect x="52" y="28" width="92" height="30" rx="5" fill="url(#bt-cab)" stroke="#1a6fa0" stroke-width="0.5"/>' +
    // Wide single windshield
    '<rect x="58" y="33" width="80" height="18" rx="3" fill="#a8d8ea" opacity="0.85"/>' +
    '<rect x="60" y="34" width="30" height="6" rx="2" fill="white" opacity="0.3"/>' +
    '<rect x="95" y="34" width="20" height="6" rx="2" fill="white" opacity="0.15"/>' +
    // Yellow lightning bolt polygon on side panel (main bolt)
    '<polygon points="88,56 94,56 86,76 92,76 78,97 84,80 78,80" fill="url(#bt-bolt)" stroke="#d4ac0d" stroke-width="0.5"/>' +
    // Second smaller bolt (right side)
    '<polygon points="128,56 133,56 126,72 131,72 120,90 125,76 120,76" fill="url(#bt-bolt)" stroke="#d4ac0d" stroke-width="0.5" opacity="0.7"/>' +
    // Lightning glow effect
    '<polygon points="88,56 94,56 86,76 92,76 78,97 84,80 78,80" fill="#f5e642" opacity="0.15" transform="scale(1.05) translate(-5 -4)"/>' +
    // "BLUE THUNDER" text
    '<text x="148" y="68" text-anchor="middle" font-size="5" font-weight="bold" fill="white" font-family="sans-serif" opacity="0.7" letter-spacing="0.5">BLUE</text>' +
    '<text x="148" y="75" text-anchor="middle" font-size="5" font-weight="bold" fill="white" font-family="sans-serif" opacity="0.7" letter-spacing="0.5">THUNDER</text>' +
    // Roof accent stripe
    '<rect x="55" y="27" width="86" height="3" rx="1" fill="#1a6fa0" opacity="0.6"/>' +
    // Suspension rects
    '<rect x="60" y="95" width="10" height="16" rx="2" fill="#555" stroke="#444" stroke-width="0.5"/>' +
    '<rect x="150" y="95" width="10" height="16" rx="2" fill="#555" stroke="#444" stroke-width="0.5"/>' +
    // Left wheel - outer tire
    '<circle cx="70" cy="115" r="25" fill="url(#bt-tire)"/>' +
    // Left wheel - tread marks
    '<rect x="46" y="112" width="6" height="4" rx="1" fill="#111" transform="rotate(-15 49 114)"/>' +
    '<rect x="48" y="99" width="6" height="4" rx="1" fill="#111" transform="rotate(-50 51 101)"/>' +
    '<rect x="58" y="91" width="6" height="4" rx="1" fill="#111" transform="rotate(-80 61 93)"/>' +
    '<rect x="82" y="91" width="6" height="4" rx="1" fill="#111" transform="rotate(80 85 93)"/>' +
    '<rect x="88" y="99" width="6" height="4" rx="1" fill="#111" transform="rotate(50 91 101)"/>' +
    '<rect x="90" y="112" width="6" height="4" rx="1" fill="#111" transform="rotate(15 93 114)"/>' +
    // Left wheel - inner rim
    '<circle cx="70" cy="115" r="14" fill="url(#bt-rim)" stroke="#555" stroke-width="0.5"/>' +
    // Left wheel - hub
    '<circle cx="70" cy="115" r="6" fill="#888" stroke="#666" stroke-width="0.5"/>' +
    '<circle cx="70" cy="115" r="2" fill="#aaa"/>' +
    // Right wheel - outer tire
    '<circle cx="150" cy="115" r="25" fill="url(#bt-tire)"/>' +
    // Right wheel - tread marks
    '<rect x="126" y="112" width="6" height="4" rx="1" fill="#111" transform="rotate(-15 129 114)"/>' +
    '<rect x="128" y="99" width="6" height="4" rx="1" fill="#111" transform="rotate(-50 131 101)"/>' +
    '<rect x="138" y="91" width="6" height="4" rx="1" fill="#111" transform="rotate(-80 141 93)"/>' +
    '<rect x="162" y="91" width="6" height="4" rx="1" fill="#111" transform="rotate(80 165 93)"/>' +
    '<rect x="168" y="99" width="6" height="4" rx="1" fill="#111" transform="rotate(50 171 101)"/>' +
    '<rect x="170" y="112" width="6" height="4" rx="1" fill="#111" transform="rotate(15 173 114)"/>' +
    // Right wheel - inner rim
    '<circle cx="150" cy="115" r="14" fill="url(#bt-rim)" stroke="#555" stroke-width="0.5"/>' +
    // Right wheel - hub
    '<circle cx="150" cy="115" r="6" fill="#888" stroke="#666" stroke-width="0.5"/>' +
    '<circle cx="150" cy="115" r="2" fill="#aaa"/>' +
    // Front/rear bumper accents
    '<rect x="38" y="55" width="4" height="40" rx="2" fill="#1a6fa0" opacity="0.5"/>' +
    '<rect x="178" y="55" width="4" height="40" rx="2" fill="#1a6fa0" opacity="0.5"/>' +
    // Headlights
    '<circle cx="42" cy="62" r="3" fill="#f1c40f" opacity="0.8"/>' +
    '<circle cx="42" cy="62" r="1.5" fill="white" opacity="0.5"/>' +
    // Rear light
    '<circle cx="178" cy="62" r="2.5" fill="#e74c3c" opacity="0.7"/>' +
    // Side stripe accent
    '<rect x="42" y="50" width="136" height="2" rx="1" fill="#5dade2" opacity="0.5"/>' +
    '<rect x="42" y="98" width="136" height="2" rx="1" fill="#1a5276" opacity="0.5"/>' +
    '</svg>';
  },

  zombie: function () {
    return '<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">' +
    // Defs: gradients
    '<defs>' +
      '<linearGradient id="zm-body" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#a29bfe"/>' +
        '<stop offset="100%" stop-color="#6c5ce7"/>' +
      '</linearGradient>' +
      '<linearGradient id="zm-cab" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#b8b5ff"/>' +
        '<stop offset="100%" stop-color="#a29bfe"/>' +
      '</linearGradient>' +
      '<radialGradient id="zm-eye">' +
        '<stop offset="0%" stop-color="#ffeaa7"/>' +
        '<stop offset="100%" stop-color="#fdcb6e"/>' +
      '</radialGradient>' +
      '<linearGradient id="zm-tire" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#2d3436"/>' +
        '<stop offset="100%" stop-color="#1a1a2e"/>' +
      '</linearGradient>' +
    '</defs>' +
    // Ground shadow
    '<ellipse cx="110" cy="148" rx="90" ry="6" fill="#1a1a2e" opacity="0.18"/>' +
    // Body rect with gradient
    '<rect x="45" y="50" width="130" height="50" rx="8" fill="url(#zm-body)"/>' +
    // Body panel lines
    '<line x1="80" y1="52" x2="80" y2="98" stroke="#5b4ccc" stroke-width="0.7" opacity="0.5"/>' +
    '<line x1="140" y1="52" x2="140" y2="98" stroke="#5b4ccc" stroke-width="0.7" opacity="0.5"/>' +
    '<line x1="47" y1="75" x2="173" y2="75" stroke="#5b4ccc" stroke-width="0.5" opacity="0.4"/>' +
    // Skull outline on body side panel
    '<circle cx="110" cy="68" r="7" fill="none" stroke="#ddd" stroke-width="1" opacity="0.6"/>' +
    '<rect x="106" y="74" width="8" height="4" rx="1" fill="none" stroke="#ddd" stroke-width="0.8" opacity="0.6"/>' +
    '<circle cx="108" cy="66" r="1.5" fill="#ddd" opacity="0.6"/>' +
    '<circle cx="112" cy="66" r="1.5" fill="#ddd" opacity="0.6"/>' +
    '<line x1="108" y1="70" x2="108" y2="73" stroke="#ddd" stroke-width="0.6" opacity="0.5"/>' +
    '<line x1="110" y1="70" x2="110" y2="73" stroke="#ddd" stroke-width="0.6" opacity="0.5"/>' +
    '<line x1="112" y1="70" x2="112" y2="73" stroke="#ddd" stroke-width="0.6" opacity="0.5"/>' +
    // Cab rect
    '<rect x="55" y="28" width="80" height="32" rx="6" fill="url(#zm-cab)"/>' +
    // Windshield with reflection
    '<rect x="62" y="33" width="30" height="20" rx="3" fill="#a8d8ea" opacity="0.75"/>' +
    '<line x1="65" y1="35" x2="72" y2="35" stroke="white" stroke-width="1.2" opacity="0.5" stroke-linecap="round"/>' +
    '<rect x="98" y="33" width="30" height="20" rx="3" fill="#a8d8ea" opacity="0.75"/>' +
    '<line x1="101" y1="35" x2="108" y2="35" stroke="white" stroke-width="1.2" opacity="0.5" stroke-linecap="round"/>' +
    // Large crazy eyes on cab
    '<circle cx="72" cy="38" r="10" fill="url(#zm-eye)" stroke="#2d3436" stroke-width="1"/>' +
    '<circle cx="72" cy="36" r="5" fill="#d63031"/>' +
    '<circle cx="72" cy="35" r="2" fill="#2d3436"/>' +
    '<circle cx="118" cy="38" r="10" fill="url(#zm-eye)" stroke="#2d3436" stroke-width="1"/>' +
    '<circle cx="120" cy="36" r="5" fill="#d63031"/>' +
    '<circle cx="120" cy="35" r="2" fill="#2d3436"/>' +
    // Green zigzag teeth along bottom of body
    '<path d="M50,98 L55,90 L60,98 L65,90 L70,98 L75,90 L80,98 L85,90 L90,98 L95,90 L100,98 L105,90 L110,98 L115,90 L120,98 L125,90 L130,98 L135,90 L140,98 L145,90 L150,98 L155,90 L160,98 L165,90 L170,98" fill="none" stroke="#00b894" stroke-width="2.5" stroke-linejoin="round"/>' +
    // Suspension rects
    '<rect x="60" y="95" width="8" height="16" rx="2" fill="#636e72"/>' +
    '<rect x="152" y="95" width="8" height="16" rx="2" fill="#636e72"/>' +
    // Left wheel
    '<circle cx="70" cy="115" r="25" fill="url(#zm-tire)"/>' +
    '<circle cx="70" cy="115" r="22" fill="#3d3d56"/>' +
    // Left tread marks
    '<line x1="48" y1="108" x2="54" y2="112" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="47" y1="115" x2="53" y2="115" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="48" y1="122" x2="54" y2="118" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="92" y1="108" x2="86" y2="112" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="93" y1="115" x2="87" y2="115" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="92" y1="122" x2="86" y2="118" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    // Left rim + hub
    '<circle cx="70" cy="115" r="10" fill="#777" stroke="#999" stroke-width="1"/>' +
    '<circle cx="70" cy="115" r="4" fill="#aaa"/>' +
    '<circle cx="70" cy="115" r="1.5" fill="#555"/>' +
    // Right wheel
    '<circle cx="150" cy="115" r="25" fill="url(#zm-tire)"/>' +
    '<circle cx="150" cy="115" r="22" fill="#3d3d56"/>' +
    // Right tread marks
    '<line x1="128" y1="108" x2="134" y2="112" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="127" y1="115" x2="133" y2="115" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="128" y1="122" x2="134" y2="118" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="172" y1="108" x2="166" y2="112" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="173" y1="115" x2="167" y2="115" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="172" y1="122" x2="166" y2="118" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    // Right rim + hub
    '<circle cx="150" cy="115" r="10" fill="#777" stroke="#999" stroke-width="1"/>' +
    '<circle cx="150" cy="115" r="4" fill="#aaa"/>' +
    '<circle cx="150" cy="115" r="1.5" fill="#555"/>' +
    '</svg>';
  },

  monstermutt: function () {
    return '<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">' +
    // Defs: gradients
    '<defs>' +
      '<linearGradient id="mm-body" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#ecf0f1"/>' +
        '<stop offset="100%" stop-color="#dfe6e9"/>' +
      '</linearGradient>' +
      '<linearGradient id="mm-cab" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#f5f6fa"/>' +
        '<stop offset="100%" stop-color="#ecf0f1"/>' +
      '</linearGradient>' +
      '<linearGradient id="mm-tire" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#2d3436"/>' +
        '<stop offset="100%" stop-color="#1a1a2e"/>' +
      '</linearGradient>' +
    '</defs>' +
    // Ground shadow
    '<ellipse cx="110" cy="148" rx="90" ry="6" fill="#1a1a2e" opacity="0.15"/>' +
    // Body rect with gradient
    '<rect x="45" y="50" width="130" height="50" rx="8" fill="url(#mm-body)" stroke="#bdc3c7" stroke-width="0.5"/>' +
    // Body panel lines
    '<line x1="80" y1="52" x2="80" y2="98" stroke="#bdc3c7" stroke-width="0.7" opacity="0.5"/>' +
    '<line x1="140" y1="52" x2="140" y2="98" stroke="#bdc3c7" stroke-width="0.7" opacity="0.5"/>' +
    '<line x1="47" y1="75" x2="173" y2="75" stroke="#bdc3c7" stroke-width="0.5" opacity="0.4"/>' +
    // 5 Dalmatian spots on body
    '<circle cx="60" cy="65" r="5" fill="#2d3436"/>' +
    '<circle cx="95" cy="60" r="6" fill="#2d3436"/>' +
    '<circle cx="130" cy="70" r="4.5" fill="#2d3436"/>' +
    '<circle cx="155" cy="58" r="5" fill="#2d3436"/>' +
    '<circle cx="115" cy="88" r="4" fill="#2d3436"/>' +
    // Cab rect
    '<rect x="55" y="28" width="80" height="32" rx="6" fill="url(#mm-cab)" stroke="#bdc3c7" stroke-width="0.5"/>' +
    // Windshield with reflection
    '<rect x="62" y="33" width="30" height="20" rx="3" fill="#a8d8ea" opacity="0.75"/>' +
    '<line x1="65" y1="35" x2="72" y2="35" stroke="white" stroke-width="1.2" opacity="0.5" stroke-linecap="round"/>' +
    '<rect x="98" y="33" width="30" height="20" rx="3" fill="#a8d8ea" opacity="0.75"/>' +
    '<line x1="101" y1="35" x2="108" y2="35" stroke="white" stroke-width="1.2" opacity="0.5" stroke-linecap="round"/>' +
    // Dog eyes on cab
    '<circle cx="75" cy="40" r="6" fill="white" stroke="#2d3436" stroke-width="0.8"/>' +
    '<circle cx="75" cy="39" r="3" fill="#2d3436"/>' +
    '<circle cx="115" cy="40" r="6" fill="white" stroke="#2d3436" stroke-width="0.8"/>' +
    '<circle cx="115" cy="39" r="3" fill="#2d3436"/>' +
    // Floppy ear paths drooping from cab sides
    '<path d="M55,32 Q40,28 36,42 Q34,52 44,50 Q50,48 55,40" fill="#ecf0f1" stroke="#bdc3c7" stroke-width="1"/>' +
    '<path d="M135,32 Q150,28 154,42 Q156,52 146,50 Q140,48 135,40" fill="#ecf0f1" stroke="#bdc3c7" stroke-width="1"/>' +
    // Black dog nose (ellipse at front of cab)
    '<ellipse cx="48" cy="62" rx="6" ry="4.5" fill="#2d3436"/>' +
    '<ellipse cx="47" cy="61" rx="1.5" ry="1" fill="#636e72" opacity="0.5"/>' +
    // Pink tongue hanging down from front
    '<path d="M48,66 Q46,78 50,82 Q54,84 56,78 Q55,72 52,66" fill="#fd79a8"/>' +
    '<line x1="50" y1="68" x2="52" y2="80" stroke="#e84393" stroke-width="0.5" opacity="0.5"/>' +
    // Suspension rects
    '<rect x="60" y="95" width="8" height="16" rx="2" fill="#636e72"/>' +
    '<rect x="152" y="95" width="8" height="16" rx="2" fill="#636e72"/>' +
    // Left wheel
    '<circle cx="70" cy="115" r="25" fill="url(#mm-tire)"/>' +
    '<circle cx="70" cy="115" r="22" fill="#3d3d3d"/>' +
    // Left tread marks
    '<line x1="48" y1="108" x2="54" y2="112" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="47" y1="115" x2="53" y2="115" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="48" y1="122" x2="54" y2="118" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="92" y1="108" x2="86" y2="112" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="93" y1="115" x2="87" y2="115" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="92" y1="122" x2="86" y2="118" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    // Left rim + hub
    '<circle cx="70" cy="115" r="10" fill="#777" stroke="#999" stroke-width="1"/>' +
    '<circle cx="70" cy="115" r="4" fill="#aaa"/>' +
    '<circle cx="70" cy="115" r="1.5" fill="#555"/>' +
    // Right wheel
    '<circle cx="150" cy="115" r="25" fill="url(#mm-tire)"/>' +
    '<circle cx="150" cy="115" r="22" fill="#3d3d3d"/>' +
    // Right tread marks
    '<line x1="128" y1="108" x2="134" y2="112" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="127" y1="115" x2="133" y2="115" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="128" y1="122" x2="134" y2="118" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="172" y1="108" x2="166" y2="112" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="173" y1="115" x2="167" y2="115" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="172" y1="122" x2="166" y2="118" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    // Right rim + hub
    '<circle cx="150" cy="115" r="10" fill="#777" stroke="#999" stroke-width="1"/>' +
    '<circle cx="150" cy="115" r="4" fill="#aaa"/>' +
    '<circle cx="150" cy="115" r="1.5" fill="#555"/>' +
    '</svg>';
  },

  dragon: function () {
    return '<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">' +
    // Defs: gradients
    '<defs>' +
      '<linearGradient id="dr-body" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#2ecc71"/>' +
        '<stop offset="100%" stop-color="#27ae60"/>' +
      '</linearGradient>' +
      '<linearGradient id="dr-cab" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#55efc4"/>' +
        '<stop offset="100%" stop-color="#2ecc71"/>' +
      '</linearGradient>' +
      '<linearGradient id="dr-fire" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0%" stop-color="#e74c3c"/>' +
        '<stop offset="50%" stop-color="#f39c12"/>' +
        '<stop offset="100%" stop-color="#f1c40f"/>' +
      '</linearGradient>' +
      '<linearGradient id="dr-tire" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#2d3436"/>' +
        '<stop offset="100%" stop-color="#1a1a2e"/>' +
      '</linearGradient>' +
    '</defs>' +
    // Ground shadow
    '<ellipse cx="110" cy="148" rx="90" ry="6" fill="#1a1a2e" opacity="0.18"/>' +
    // Body rect with gradient
    '<rect x="45" y="50" width="130" height="50" rx="8" fill="url(#dr-body)"/>' +
    // Body panel lines
    '<line x1="80" y1="52" x2="80" y2="98" stroke="#1e8449" stroke-width="0.7" opacity="0.5"/>' +
    '<line x1="140" y1="52" x2="140" y2="98" stroke="#1e8449" stroke-width="0.7" opacity="0.5"/>' +
    '<line x1="47" y1="75" x2="173" y2="75" stroke="#1e8449" stroke-width="0.5" opacity="0.4"/>' +
    // Wing-like shapes on body sides (left)
    '<path d="M50,55 Q30,40 35,65 Q38,72 48,68" fill="#27ae60" stroke="#1e8449" stroke-width="0.8" opacity="0.8"/>' +
    '<path d="M50,58 Q36,48 38,62" fill="none" stroke="#1e8449" stroke-width="0.5" opacity="0.5"/>' +
    // Wing-like shapes on body sides (right)
    '<path d="M170,55 Q190,40 185,65 Q182,72 172,68" fill="#27ae60" stroke="#1e8449" stroke-width="0.8" opacity="0.8"/>' +
    '<path d="M170,58 Q184,48 182,62" fill="none" stroke="#1e8449" stroke-width="0.5" opacity="0.5"/>' +
    // Scale pattern on body
    '<path d="M85,65 Q90,60 95,65" fill="none" stroke="#1e8449" stroke-width="0.6" opacity="0.4"/>' +
    '<path d="M100,65 Q105,60 110,65" fill="none" stroke="#1e8449" stroke-width="0.6" opacity="0.4"/>' +
    '<path d="M115,65 Q120,60 125,65" fill="none" stroke="#1e8449" stroke-width="0.6" opacity="0.4"/>' +
    '<path d="M90,80 Q95,75 100,80" fill="none" stroke="#1e8449" stroke-width="0.6" opacity="0.4"/>' +
    '<path d="M105,80 Q110,75 115,80" fill="none" stroke="#1e8449" stroke-width="0.6" opacity="0.4"/>' +
    // Cab rect
    '<rect x="55" y="28" width="85" height="32" rx="6" fill="url(#dr-cab)"/>' +
    // Windshield with reflection
    '<rect x="65" y="33" width="30" height="20" rx="3" fill="#a8d8ea" opacity="0.75"/>' +
    '<line x1="68" y1="35" x2="75" y2="35" stroke="white" stroke-width="1.2" opacity="0.5" stroke-linecap="round"/>' +
    '<rect x="100" y="33" width="30" height="20" rx="3" fill="#a8d8ea" opacity="0.75"/>' +
    '<line x1="103" y1="35" x2="110" y2="35" stroke="white" stroke-width="1.2" opacity="0.5" stroke-linecap="round"/>' +
    // Dragon horns on cab (left cluster)
    '<path d="M60,28 Q52,10 58,8 Q62,7 63,20 L63,28" fill="#2ecc71" stroke="#1e8449" stroke-width="0.8"/>' +
    '<path d="M68,28 Q64,14 68,12 Q72,11 72,22 L70,28" fill="#2ecc71" stroke="#1e8449" stroke-width="0.8"/>' +
    // Dragon horns on cab (right cluster)
    '<path d="M125,28 Q130,10 126,8 Q122,7 121,20 L122,28" fill="#2ecc71" stroke="#1e8449" stroke-width="0.8"/>' +
    '<path d="M132,28 Q138,14 134,12 Q130,11 130,22 L131,28" fill="#2ecc71" stroke="#1e8449" stroke-width="0.8"/>' +
    // Fire eyes (yellow with red iris)
    '<circle cx="76" cy="42" r="7" fill="#f1c40f" stroke="#e67e22" stroke-width="0.8"/>' +
    '<circle cx="76" cy="41" r="3.5" fill="#e74c3c"/>' +
    '<circle cx="76" cy="40" r="1.5" fill="#2d3436"/>' +
    '<circle cx="120" cy="42" r="7" fill="#f1c40f" stroke="#e67e22" stroke-width="0.8"/>' +
    '<circle cx="120" cy="41" r="3.5" fill="#e74c3c"/>' +
    '<circle cx="120" cy="40" r="1.5" fill="#2d3436"/>' +
    // Fire exhaust at rear (overlapping polygon clusters)
    '<polygon points="175,60 200,50 195,65 205,58 198,72 190,68" fill="#e74c3c" opacity="0.75"/>' +
    '<polygon points="175,62 195,55 192,68 202,62 196,75 188,70" fill="#e67e22" opacity="0.65"/>' +
    '<polygon points="175,65 190,58 188,70 198,64 193,76 185,72" fill="#f39c12" opacity="0.6"/>' +
    '<polygon points="175,67 186,62 185,72 193,67 190,78 183,74" fill="#f1c40f" opacity="0.55"/>' +
    // Suspension rects
    '<rect x="60" y="95" width="8" height="16" rx="2" fill="#636e72"/>' +
    '<rect x="152" y="95" width="8" height="16" rx="2" fill="#636e72"/>' +
    // Left wheel
    '<circle cx="70" cy="115" r="25" fill="url(#dr-tire)"/>' +
    '<circle cx="70" cy="115" r="22" fill="#3d3d3d"/>' +
    // Left tread marks
    '<line x1="48" y1="108" x2="54" y2="112" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="47" y1="115" x2="53" y2="115" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="48" y1="122" x2="54" y2="118" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="92" y1="108" x2="86" y2="112" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="93" y1="115" x2="87" y2="115" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="92" y1="122" x2="86" y2="118" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    // Left rim + hub
    '<circle cx="70" cy="115" r="10" fill="#777" stroke="#999" stroke-width="1"/>' +
    '<circle cx="70" cy="115" r="4" fill="#aaa"/>' +
    '<circle cx="70" cy="115" r="1.5" fill="#555"/>' +
    // Right wheel
    '<circle cx="150" cy="115" r="25" fill="url(#dr-tire)"/>' +
    '<circle cx="150" cy="115" r="22" fill="#3d3d3d"/>' +
    // Right tread marks
    '<line x1="128" y1="108" x2="134" y2="112" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="127" y1="115" x2="133" y2="115" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="128" y1="122" x2="134" y2="118" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="172" y1="108" x2="166" y2="112" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="173" y1="115" x2="167" y2="115" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    '<line x1="172" y1="122" x2="166" y2="118" stroke="#222" stroke-width="2" stroke-linecap="round"/>' +
    // Right rim + hub
    '<circle cx="150" cy="115" r="10" fill="#777" stroke="#999" stroke-width="1"/>' +
    '<circle cx="150" cy="115" r="4" fill="#aaa"/>' +
    '<circle cx="150" cy="115" r="1.5" fill="#555"/>' +
    '</svg>';
  },

  earthshaker: function () {
    return '<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">' +
    // Defs: gradients
    '<defs>' +
      '<linearGradient id="es-body" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#e67e22"/>' +
        '<stop offset="100%" stop-color="#d35400"/>' +
      '</linearGradient>' +
      '<linearGradient id="es-cab" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#f0a04b"/>' +
        '<stop offset="100%" stop-color="#e67e22"/>' +
      '</linearGradient>' +
      '<linearGradient id="es-tire" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#2d3436"/>' +
        '<stop offset="100%" stop-color="#1a1a2e"/>' +
      '</linearGradient>' +
      '<radialGradient id="es-dust">' +
        '<stop offset="0%" stop-color="#d2b48c" stop-opacity="0.4"/>' +
        '<stop offset="100%" stop-color="#d2b48c" stop-opacity="0"/>' +
      '</radialGradient>' +
    '</defs>' +
    // Ground shadow (wider for bigger wheels)
    '<ellipse cx="110" cy="152" rx="95" ry="6" fill="#1a1a2e" opacity="0.18"/>' +
    // Body rect with gradient
    '<rect x="45" y="48" width="130" height="50" rx="8" fill="url(#es-body)"/>' +
    // Body panel lines
    '<line x1="80" y1="50" x2="80" y2="96" stroke="#c0440e" stroke-width="0.7" opacity="0.5"/>' +
    '<line x1="140" y1="50" x2="140" y2="96" stroke="#c0440e" stroke-width="0.7" opacity="0.5"/>' +
    '<line x1="47" y1="73" x2="173" y2="73" stroke="#c0440e" stroke-width="0.5" opacity="0.4"/>' +
    // Crack/impact lines on body (short zigzag paths)
    '<path d="M60,55 L64,58 L58,63 L65,66" fill="none" stroke="#c0440e" stroke-width="1.2" opacity="0.6"/>' +
    '<path d="M90,52 L94,57 L88,60 L93,64" fill="none" stroke="#c0440e" stroke-width="1.2" opacity="0.6"/>' +
    '<path d="M120,55 L124,59 L118,62 L123,67" fill="none" stroke="#c0440e" stroke-width="1.2" opacity="0.6"/>' +
    '<path d="M155,53 L158,58 L153,61 L157,65" fill="none" stroke="#c0440e" stroke-width="1.2" opacity="0.6"/>' +
    '<path d="M70,80 L73,84 L68,87 L74,90" fill="none" stroke="#c0440e" stroke-width="1" opacity="0.5"/>' +
    '<path d="M140,78 L144,82 L138,86 L143,90" fill="none" stroke="#c0440e" stroke-width="1" opacity="0.5"/>' +
    // EARTHSHAKER text on body
    '<text x="110" y="78" text-anchor="middle" font-size="10" font-weight="bold" fill="#f1c40f" font-family="sans-serif" letter-spacing="1">EARTHSHAKER</text>' +
    // Cab rect
    '<rect x="55" y="26" width="80" height="32" rx="6" fill="url(#es-cab)"/>' +
    // Windshield with reflection
    '<rect x="62" y="31" width="30" height="20" rx="3" fill="#a8d8ea" opacity="0.75"/>' +
    '<line x1="65" y1="33" x2="72" y2="33" stroke="white" stroke-width="1.2" opacity="0.5" stroke-linecap="round"/>' +
    '<rect x="98" y="31" width="30" height="20" rx="3" fill="#a8d8ea" opacity="0.75"/>' +
    '<line x1="101" y1="33" x2="108" y2="33" stroke="white" stroke-width="1.2" opacity="0.5" stroke-linecap="round"/>' +
    // Headlights
    '<rect x="46" y="55" width="5" height="8" rx="1.5" fill="#f1c40f" opacity="0.7"/>' +
    '<rect x="170" y="55" width="5" height="8" rx="1.5" fill="#e74c3c" opacity="0.5"/>' +
    // Dust clouds at left wheel
    '<circle cx="45" cy="130" r="10" fill="url(#es-dust)"/>' +
    '<circle cx="38" cy="125" r="7" fill="url(#es-dust)"/>' +
    '<circle cx="50" cy="138" r="8" fill="url(#es-dust)"/>' +
    // Dust clouds at right wheel
    '<circle cx="175" cy="130" r="10" fill="url(#es-dust)"/>' +
    '<circle cx="182" cy="125" r="7" fill="url(#es-dust)"/>' +
    '<circle cx="170" cy="138" r="8" fill="url(#es-dust)"/>' +
    // Suspension rects (adjusted for larger wheels)
    '<rect x="58" y="93" width="10" height="18" rx="2" fill="#636e72"/>' +
    '<rect x="152" y="93" width="10" height="18" rx="2" fill="#636e72"/>' +
    // Left wheel (LARGER: r=28 at cy=118)
    '<circle cx="70" cy="118" r="28" fill="url(#es-tire)"/>' +
    '<circle cx="70" cy="118" r="25" fill="#3d3d3d"/>' +
    // Left tread marks (adjusted for r=28)
    '<line x1="45" y1="110" x2="52" y2="114" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>' +
    '<line x1="44" y1="118" x2="51" y2="118" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>' +
    '<line x1="45" y1="126" x2="52" y2="122" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>' +
    '<line x1="95" y1="110" x2="88" y2="114" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>' +
    '<line x1="96" y1="118" x2="89" y2="118" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>' +
    '<line x1="95" y1="126" x2="88" y2="122" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>' +
    // Left rim + hub (larger)
    '<circle cx="70" cy="118" r="11" fill="#777" stroke="#999" stroke-width="1"/>' +
    '<circle cx="70" cy="118" r="5" fill="#aaa"/>' +
    '<circle cx="70" cy="118" r="2" fill="#555"/>' +
    // Right wheel (LARGER: r=28 at cy=118)
    '<circle cx="150" cy="118" r="28" fill="url(#es-tire)"/>' +
    '<circle cx="150" cy="118" r="25" fill="#3d3d3d"/>' +
    // Right tread marks (adjusted for r=28)
    '<line x1="125" y1="110" x2="132" y2="114" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>' +
    '<line x1="124" y1="118" x2="131" y2="118" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>' +
    '<line x1="125" y1="126" x2="132" y2="122" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>' +
    '<line x1="175" y1="110" x2="168" y2="114" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>' +
    '<line x1="176" y1="118" x2="169" y2="118" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>' +
    '<line x1="175" y1="126" x2="168" y2="122" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>' +
    // Right rim + hub (larger)
    '<circle cx="150" cy="118" r="11" fill="#777" stroke="#999" stroke-width="1"/>' +
    '<circle cx="150" cy="118" r="5" fill="#aaa"/>' +
    '<circle cx="150" cy="118" r="2" fill="#555"/>' +
    '</svg>';
  },

  allTrucksMini: function (index) {
    var colors = ['#2d8a4e', '#2980b9', '#e74c3c', '#2c3e50', '#3498db', '#6c5ce7', '#ecf0f1', '#27ae60', '#d35400', '#e67e22'];
    var names = ['GD', 'MG', 'ET', 'MX', 'BT', 'ZM', 'MM', 'DR', 'ES', 'ALL'];
    var c = colors[index] || '#888';
    return '<svg viewBox="0 0 60 45" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="5" y="8" width="50" height="18" rx="4" fill="' + c + '"/>' +
      '<text x="30" y="20" text-anchor="middle" font-size="7" fill="white" font-weight="bold" font-family="sans-serif">' + (names[index] || '') + '</text>' +
      '<circle cx="16" cy="35" r="8" fill="#444"/><circle cx="16" cy="35" r="3" fill="#888"/>' +
      '<circle cx="44" cy="35" r="8" fill="#444"/><circle cx="44" cy="35" r="3" fill="#888"/>' +
      '</svg>';
  },

  stadium: function () {
    return '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<linearGradient id="stad-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2c3e50"/><stop offset="60%" stop-color="#6c5ce7"/><stop offset="100%" stop-color="#e17055"/></linearGradient>' +
      '<linearGradient id="stad-dirt" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#a0896c"/><stop offset="100%" stop-color="#8B7355"/></linearGradient>' +
      '</defs>' +
      '<rect x="0" y="0" width="400" height="300" fill="url(#stad-sky)"/>' +
      '<rect x="0" y="200" width="400" height="100" fill="url(#stad-dirt)"/>' +
      '<ellipse cx="200" cy="200" rx="190" ry="30" fill="#a0896c" opacity="0.6"/>' +
      '<rect x="10" y="50" width="30" height="150" fill="#636e72"/>' +
      '<rect x="360" y="50" width="30" height="150" fill="#636e72"/>' +
      '<rect x="0" y="40" width="400" height="20" rx="5" fill="#dfe6e9"/>' +
      '<circle cx="25" cy="45" r="8" fill="#f1c40f" opacity="0.8"/>' +
      '<circle cx="375" cy="45" r="8" fill="#f1c40f" opacity="0.8"/>' +
      '<circle cx="100" cy="42" r="5" fill="#f1c40f" opacity="0.6"/>' +
      '<circle cx="200" cy="40" r="5" fill="#f1c40f" opacity="0.6"/>' +
      '<circle cx="300" cy="42" r="5" fill="#f1c40f" opacity="0.6"/>' +
      '<rect x="40" y="60" width="320" height="50" fill="none" stroke="#b2bec3" stroke-width="1" opacity="0.3"/>' +
      '<line x1="40" y1="70" x2="360" y2="70" stroke="#b2bec3" stroke-width="0.5" opacity="0.3"/>' +
      '<line x1="40" y1="80" x2="360" y2="80" stroke="#b2bec3" stroke-width="0.5" opacity="0.3"/>' +
      '<line x1="40" y1="90" x2="360" y2="90" stroke="#b2bec3" stroke-width="0.5" opacity="0.3"/>' +
      '<line x1="40" y1="100" x2="360" y2="100" stroke="#b2bec3" stroke-width="0.5" opacity="0.3"/>' +
      '<text x="200" y="55" text-anchor="middle" font-size="14" fill="#e17055" font-weight="bold" font-family="sans-serif">' + t('stadiumTitle') + '</text>' +
      '<ellipse cx="100" cy="230" rx="40" ry="8" fill="#7a6652" opacity="0.4"/>' +
      '<ellipse cx="280" cy="240" rx="35" ry="6" fill="#7a6652" opacity="0.3"/>' +
      '<path d="M80 220 Q100 215 120 220 Q140 225 160 220" fill="none" stroke="#6b5b4a" stroke-width="2" opacity="0.3"/>' +
      '<path d="M220 230 Q250 225 280 230 Q310 235 340 228" fill="none" stroke="#6b5b4a" stroke-width="2" opacity="0.3"/>' +
      '</svg>';
  }
};
