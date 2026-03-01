/* ===== Avatar Dialog System ===== */
window.AvatarDialog = (function () {

  /* Map each level to a family member */
  var levelAssignments = {
    'dino-1':  'flor',
    'dino-2':  'yeray',
    'dino-3':  'nonna',
    'dino-4':  'titoTom',
    'dino-5':  'titaMaira',
    'dino-6':  'nonno',
    'dino-7':  'yaro',
    'dino-8':  'cai',
    'dino-9':  'flor',
    'dino-10': 'yeray',
    'truck-1':  'nonna',
    'truck-2':  'nonno',
    'truck-3':  'titoTom',
    'truck-4':  'titaMaira',
    'truck-5':  'flor',
    'truck-6':  'yeray',
    'truck-7':  'cai',
    'truck-8':  'yaro',
    'truck-9':  'nonna',
    'truck-10': 'nonno'
  };

  /* Display names */
  var names = {
    theo: 'Theo',
    flor: { es: 'Mama Flor', en: 'Mama Flor', ca: 'Mama Flor' },
    yeray: { es: 'Papa Yeray', en: 'Papa Yeray', ca: 'Papa Yeray' },
    titoTom: { es: 'Tito Tom', en: 'Uncle Tom', ca: 'Tiet Tom' },
    titaMaira: { es: 'Tita Maira', en: 'Auntie Maira', ca: 'Tieta Maira' },
    cai: 'Cai',
    yaro: 'Yaro',
    nonna: 'Nonna',
    nonno: 'Nonno',
    toffee: 'Toffee',
    lula: 'Lula'
  };

  /* Trilingual advice per level */
  var advice = {
    'dino-1': {
      es: 'Lee bien cada pregunta antes de contestar, cielito!',
      en: 'Read each question carefully before answering, sweetie!',
      ca: 'Llegeix be cada pregunta abans de respondre, cielet!'
    },
    'dino-2': {
      es: 'Arrastra cada pieza a su lugar. Tu puedes!',
      en: 'Drag each piece to its place. You can do it!',
      ca: 'Arrossega cada peca al seu lloc. Tu pots!'
    },
    'dino-3': {
      es: 'Cuenta con calma, uno por uno!',
      en: 'Count calmly, one by one!',
      ca: 'Compta amb calma, un per un!'
    },
    'dino-4': {
      es: 'Salta con cuidado y recoge todas las estrellas!',
      en: 'Jump carefully and collect all the stars!',
      ca: 'Salta amb compte i recull totes les estrelles!'
    },
    'dino-5': {
      es: 'Encuentra las parejas iguales, preciosa!',
      en: 'Find the matching pairs, beautiful!',
      ca: 'Troba les parelles iguals, preciosa!'
    },
    'dino-6': {
      es: 'Elige los colores que mas te gusten!',
      en: 'Choose the colors you like best!',
      ca: 'Tria els colors que mes t\'agradin!'
    },
    'dino-7': {
      es: 'Mira bien la secuencia y repitela!',
      en: 'Watch the sequence closely and repeat it!',
      ca: 'Mira be la sequencia i repeteix-la!'
    },
    'dino-8': {
      es: 'Atrapa los peces buenos con la cesta!',
      en: 'Catch the good fish with the basket!',
      ca: 'Atrapa els peixos bons amb la cistella!'
    },
    'dino-9': {
      es: 'Busca el camino correcto por el laberinto!',
      en: 'Find the right path through the maze!',
      ca: 'Busca el cami correcte pel laberint!'
    },
    'dino-10': {
      es: 'Clasifica cada dinosaurio en su grupo!',
      en: 'Sort each dinosaur into its group!',
      ca: 'Classifica cada dinosaure al seu grup!'
    },
    'truck-1': {
      es: 'Piensa bien antes de elegir tu respuesta!',
      en: 'Think well before choosing your answer!',
      ca: 'Pensa be abans de triar la teva resposta!'
    },
    'truck-2': {
      es: 'Recuerda donde estan las cartas!',
      en: 'Remember where the cards are!',
      ca: 'Recorda on son les cartes!'
    },
    'truck-3': {
      es: 'Pinta el camion con tus colores favoritos!',
      en: 'Paint the truck with your favorite colors!',
      ca: 'Pinta el camio amb els teus colors preferits!'
    },
    'truck-4': {
      es: 'Cada pieza tiene su lugar perfecto!',
      en: 'Each piece has its perfect place!',
      ca: 'Cada peca te el seu lloc perfecte!'
    },
    'truck-5': {
      es: 'Mueve la cesta rapido para atrapar los rayos!',
      en: 'Move the basket quickly to catch the bolts!',
      ca: 'Mou la cistella rapid per atrapar els llamps!'
    },
    'truck-6': {
      es: 'Salta los obstaculos y no te rindas!',
      en: 'Jump over obstacles and never give up!',
      ca: 'Salta els obstacles i no et rendeixis!'
    },
    'truck-7': {
      es: 'Mira las dos imagenes con mucha atencion!',
      en: 'Look at both pictures very carefully!',
      ca: 'Mira les dues imatges amb molta atencio!'
    },
    'truck-8': {
      es: 'Escucha el patron y repitelo igualito!',
      en: 'Listen to the pattern and repeat it exactly!',
      ca: 'Escolta el patro i repeteix-lo igualito!'
    },
    'truck-9': {
      es: 'Los grandes a un lado y los pequenos al otro!',
      en: 'Big ones on one side, small ones on the other!',
      ca: 'Els grans a un costat i els petits a l\'altre!'
    },
    'truck-10': {
      es: 'Traza la forma con cuidado, campeona!',
      en: 'Trace the shape carefully, champion!',
      ca: 'Traca la forma amb cura, campiona!'
    }
  };

  function getName(memberId) {
    var n = names[memberId];
    if (!n) return memberId;
    if (typeof n === 'string') return n;
    return L(n);
  }

  function getAvatar(memberId) {
    if (window.AvatarSVG && typeof window.AvatarSVG[memberId] === 'function') {
      return window.AvatarSVG[memberId]();
    }
    return '';
  }

  function render(levelId) {
    var memberId = levelAssignments[levelId];
    if (!memberId) return '';

    var adviceObj = advice[levelId];
    if (!adviceObj) return '';

    var name = getName(memberId);
    var avatar = getAvatar(memberId);
    var text = L(adviceObj);

    var html = '<div class="avatar-dialog" aria-label="' + name + '">';
    html += '<div class="avatar-portrait">' + avatar + '</div>';
    html += '<div class="avatar-speech">';
    html += '<div class="avatar-name">' + name + '</div>';
    html += '<div class="avatar-text">' + text + '</div>';
    html += '</div>';
    html += '</div>';

    return html;
  }

  return {
    render: render,
    getAvatar: getAvatar,
    getName: getName
  };
})();
