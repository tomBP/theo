/* ===== Internationalization Engine ===== */
(function () {
  var STORAGE_KEY = 'theo-adventure-lang';
  var DEFAULT_LANG = 'es';

  var ui = {
    pageTitle: {
      es: 'La Aventura de Theo',
      en: "Theo's Dino & Truck Adventure",
      ca: "L'Aventura de Theo"
    },
    splashTitle: {
      es: 'LA AVENTURA<br>DE THEO',
      en: "THEO'S<br>ADVENTURE",
      ca: "L'AVENTURA<br>DE THEO"
    },
    tapToStart: {
      es: 'TOCA PARA EMPEZAR',
      en: 'TAP TO START',
      ca: 'TOCA PER COMENCAR'
    },
    chooseAdventure: {
      es: 'ELIGE TU AVENTURA',
      en: 'CHOOSE YOUR ADVENTURE',
      ca: 'TRIA LA TEVA AVENTURA'
    },
    dinosaurs: {
      es: 'DINOSAURIOS',
      en: 'DINOSAURS',
      ca: 'DINOSAURES'
    },
    monsterTrucks: {
      es: 'MONSTER TRUCKS',
      en: 'MONSTER TRUCKS',
      ca: 'MONSTER TRUCKS'
    },
    completed: {
      es: 'completados',
      en: 'completed',
      ca: 'completats'
    },
    amazing: {
      es: '!INCREIBLE!',
      en: 'AMAZING!',
      ca: 'INCREIBLE!'
    },
    nextLevel: {
      es: 'SIGUIENTE NIVEL',
      en: 'NEXT LEVEL',
      ca: 'SEGUENT NIVELL'
    },
    backToMenu: {
      es: 'VOLVER AL MENU',
      en: 'BACK TO MENU',
      ca: 'TORNAR AL MENU'
    },
    letsGo: {
      es: '!VAMOS!',
      en: "LET'S GO!",
      ca: 'ANEM-HI!'
    },
    greatJob: {
      es: '!Muy bien!',
      en: 'Great job!',
      ca: 'Molt be!'
    },
    tryAgain: {
      es: '!Intenta otra vez!',
      en: 'Try again!',
      ca: 'Torna-ho a provar!'
    },
    youCountedIt: {
      es: '!Lo contaste!',
      en: 'You counted it!',
      ca: "L'has comptat!"
    },
    countAgain: {
      es: '!Cuenta otra vez!',
      en: 'Count again!',
      ca: 'Compta una altra vegada!'
    },
    collected: {
      es: 'Recogidos',
      en: 'Collected',
      ca: 'Recollits'
    },
    swipeHint: {
      es: '!Desliza o usa las flechas para moverte!',
      en: 'Swipe or use arrow keys to move!',
      ca: 'Llisca o usa les fletxes per moure!'
    },
    pickColor: {
      es: '!Elige un color y toca una zona!',
      en: 'Pick a color, then tap a region!',
      ca: 'Tria un color i toca una zona!'
    },
    tapRegion: {
      es: '!Ahora toca una zona para colorearla!',
      en: 'Now tap a region to color it!',
      ca: 'Ara toca una zona per pintar-la!'
    },
    pickFirst: {
      es: '!Elige un color primero!',
      en: 'Pick a color first!',
      ca: 'Tria un color primer!'
    },
    colored: {
      es: 'coloreados',
      en: 'colored',
      ca: 'pintats'
    },
    stadiumTitle: {
      es: 'ESTADIO MONSTER TRUCK',
      en: 'MONSTER TRUCK STADIUM',
      ca: 'ESTADI MONSTER TRUCK'
    },
    watchRepeat: {
      es: '!Observa y repite!',
      en: 'Watch and repeat!',
      ca: 'Observa i repeteix!'
    },
    catchItems: {
      es: '!Atrapa los objetos buenos!',
      en: 'Catch the good items!',
      ca: 'Atrapa els objectes bons!'
    },
    jumpObstacles: {
      es: '!Salta los obstaculos!',
      en: 'Jump over obstacles!',
      ca: 'Salta els obstacles!'
    },
    findDifferences: {
      es: '!Encuentra las diferencias!',
      en: 'Find the differences!',
      ca: 'Troba les diferencies!'
    },
    sortItems: {
      es: '!Ordena los elementos!',
      en: 'Sort the items!',
      ca: 'Ordena els elements!'
    },
    traceShape: {
      es: '!Traza la forma!',
      en: 'Trace the shape!',
      ca: 'Traca la forma!'
    },
    round: {
      es: 'Ronda',
      en: 'Round',
      ca: 'Ronda'
    },
    found: {
      es: 'Encontrados',
      en: 'Found',
      ca: 'Trobats'
    },
    sorted: {
      es: 'Ordenados',
      en: 'Sorted',
      ca: 'Ordenats'
    },
    caught: {
      es: 'Atrapados',
      en: 'Caught',
      ca: 'Atrapats'
    },
    worldMap: {
      es: 'MAPA DEL MUNDO',
      en: 'WORLD MAP',
      ca: 'MAPA DEL MON'
    },
    swipeToExplore: {
      es: 'Desliza para explorar',
      en: 'Swipe to explore',
      ca: 'Llisca per explorar'
    },
    herbivore: {
      es: 'Herbivoro',
      en: 'Herbivore',
      ca: 'Herbivor'
    },
    carnivore: {
      es: 'Carnivoro',
      en: 'Carnivore',
      ca: 'Carnivor'
    },
    bigTrucks: {
      es: 'Camiones grandes',
      en: 'Big trucks',
      ca: 'Camions grans'
    },
    smallTrucks: {
      es: 'Camiones pequenos',
      en: 'Small trucks',
      ca: 'Camions petits'
    },
    reset: {
      es: 'Reiniciar',
      en: 'Reset',
      ca: 'Reiniciar'
    },
    oops: {
      es: '!Oops!',
      en: 'Oops!',
      ca: 'Oops!'
    },
    missedOne: {
      es: '!Se escapo uno!',
      en: 'Missed one!',
      ca: 'Se n\'ha escapat un!'
    },
    pressEnter: {
      es: 'Pulsa Enter',
      en: 'Press Enter',
      ca: 'Prem Enter'
    },
    coins: {
      es: 'Monedas',
      en: 'Coins',
      ca: 'Monedes'
    },
    doubleJumpHint: {
      es: '!Doble salto!',
      en: 'Double jump!',
      ca: 'Doble salt!'
    },
    time: {
      es: 'Tiempo',
      en: 'Time',
      ca: 'Temps'
    }
  };

  var currentLang = DEFAULT_LANG;

  function init() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (saved === 'es' || saved === 'en' || saved === 'ca')) {
      currentLang = saved;
    }
  }

  function getLang() {
    return currentLang;
  }

  function setLang(lang) {
    if (lang === 'es' || lang === 'en' || lang === 'ca') {
      currentLang = lang;
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    }
  }

  function L(obj) {
    if (!obj || typeof obj === 'string') return obj || '';
    return obj[currentLang] || obj.es || obj.en || '';
  }

  function t(key) {
    var entry = ui[key];
    if (!entry) return key;
    return entry[currentLang] || entry.es || entry.en || key;
  }

  init();

  window.I18n = {
    getLang: getLang,
    setLang: setLang,
    L: L,
    t: t
  };
  window.L = L;
  window.t = t;
})();
