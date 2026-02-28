/* ===== All 20 Level Definitions ===== */
window.LevelData = {
  dino: [
    {
      id: 'dino-1',
      name: { es: 'T-Rex', en: 'T-Rex', ca: 'T-Rex' },
      gameType: 'quiz',
      illustration: function () { return DinoSVG.trex(); },
      keyFact: { es: 'El T-Rex tenia la mordida mas fuerte de cualquier animal terrestre!', en: 'T-Rex had the strongest bite of any land animal ever!', ca: 'El T-Rex tenia la mossegada mes forta de qualsevol animal terrestre!' },
      learnFacts: [
        { es: 'El T-Rex fue uno de los carnivoros mas grandes!', en: 'T-Rex was one of the biggest meat-eaters ever!', ca: 'El T-Rex va ser un dels carnivors mes grans!' },
        { es: 'Su nombre significa "Rey Lagarto Tirano"', en: 'Its name means "Tyrant Lizard King"', ca: 'El seu nom significa "Rei Llangardaix Tira"' },
        { es: 'El T-Rex tenia brazos diminutos pero mandibulas ENORMES!', en: 'T-Rex had tiny arms but HUGE jaws!', ca: 'El T-Rex tenia bracos diminuts pero mandibules ENORMES!' }
      ],
      config: {
        questions: [
          { question: { es: 'Que significa T-Rex?', en: 'What does T-Rex mean?', ca: 'Que significa T-Rex?' }, answers: [{ es: 'Rey Lagarto Tirano', en: 'Tyrant Lizard King', ca: 'Rei Llangardaix Tira' }, { es: 'Rex de Brazos Cortos', en: 'Tiny Arms Rex', ca: 'Rex de Bracos Curts' }, { es: 'Reptil del Trueno', en: 'Thunder Reptile', ca: 'Reptil del Tro' }], correct: 0, fact: { es: 'Rey Lagarto Tirano — que nombre tan genial!', en: 'Tyrant Lizard King — what a cool name!', ca: 'Rei Llangardaix Tira — quin nom tan genial!' } },
          { question: { es: 'Que tenia de especial la mordida del T-Rex?', en: "What was special about T-Rex's bite?", ca: 'Que tenia d\'especial la mossegada del T-Rex?' }, answers: [{ es: 'Muy debil', en: 'Very weak', ca: 'Molt feble' }, { es: 'La mas fuerte de cualquier animal terrestre', en: 'Strongest of any land animal', ca: 'La mes forta de qualsevol animal terrestre' }, { es: 'No tenia dientes', en: 'It had no teeth', ca: 'No tenia dents' }], correct: 1, fact: { es: 'El T-Rex podia triturar huesos con su mordida!', en: 'T-Rex could crush bones with its bite!', ca: 'El T-Rex podia triturar ossos amb la seva mossegada!' } },
          { question: { es: 'Como eran los brazos del T-Rex?', en: "How big were T-Rex's arms?", ca: 'Com eren els bracos del T-Rex?' }, answers: [{ es: 'Muy largos', en: 'Very long', ca: 'Molt llargs' }, { es: 'Diminutos y cortos', en: 'Tiny and short', ca: 'Diminuts i curts' }, { es: 'No tenia brazos', en: 'No arms at all', ca: 'No tenia bracos' }], correct: 1, fact: { es: 'Sus brazos median solo 1 metro!', en: 'Its arms were only about 3 feet long!', ca: 'Els seus bracos feien nomes 1 metre!' } },
          { question: { es: 'Que comia el T-Rex?', en: 'What did T-Rex eat?', ca: 'Que menjava el T-Rex?' }, answers: [{ es: 'Solo plantas', en: 'Only plants', ca: 'Nomes plantes' }, { es: 'Otros dinosaurios', en: 'Other dinosaurs', ca: 'Altres dinosaures' }, { es: 'Solo peces', en: 'Only fish', ca: 'Nomes peixos' }], correct: 1, fact: { es: 'El T-Rex era un feroz carnivoro!', en: 'T-Rex was a fierce meat-eater!', ca: 'El T-Rex era un feroc carnivor!' } },
          { question: { es: 'Como se movia el T-Rex?', en: 'How did T-Rex move?', ca: 'Com es movia el T-Rex?' }, answers: [{ es: 'Volaba', en: 'It flew', ca: 'Volava' }, { es: 'Caminaba sobre dos patas', en: 'Walked on two legs', ca: 'Caminava sobre dues potes' }, { es: 'Reptaba como una serpiente', en: 'Slithered like a snake', ca: 'Reptava com una serp' }], correct: 1, fact: { es: 'El T-Rex caminaba sobre dos patas poderosas!', en: 'T-Rex walked on two powerful legs!', ca: 'El T-Rex caminava sobre dues potes poderoses!' } }
        ]
      }
    },
    {
      id: 'dino-2',
      name: { es: 'Triceratops', en: 'Triceratops', ca: 'Triceratops' },
      gameType: 'dragdrop',
      illustration: function () { return DinoSVG.triceratops(); },
      keyFact: { es: 'El Triceratops tenia 3 cuernos y una gran cresta para protegerse!', en: 'Triceratops had 3 horns and a big frill to protect itself!', ca: 'El Triceratops tenia 3 banyes i una gran cresta per protegir-se!' },
      learnFacts: [
        { es: 'Triceratops significa "cara de tres cuernos"', en: 'Triceratops means "three-horned face"', ca: 'Triceratops significa "cara de tres banyes"' },
        { es: 'Su cresta podia medir 2 metros de ancho!', en: 'Its frill could be 7 feet wide!', ca: 'La seva cresta podia fer 2 metres d\'ample!' },
        { es: 'Pesaba tanto como un camion de basura', en: 'It was as heavy as a garbage truck', ca: 'Pesava tant com un camio d\'escombraries' }
      ],
      config: {
        pieces: [
          { id: 'head', outlineSVG: '<rect x="30" y="40" width="70" height="60" rx="10" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<ellipse cx="30" cy="25" rx="25" ry="20" fill="#a0896c"/>' },
          { id: 'horn1', outlineSVG: '<line x1="50" y1="40" x2="40" y2="15" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<polygon points="30,40 25,10 35,10" fill="#c4a77d"/>' },
          { id: 'horn2', outlineSVG: '<line x1="70" y1="40" x2="65" y2="15" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<polygon points="30,40 25,10 35,10" fill="#c4a77d"/>' },
          { id: 'body', outlineSVG: '<ellipse cx="170" cy="70" rx="60" ry="35" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<ellipse cx="30" cy="25" rx="28" ry="20" fill="#8B7355"/>' },
          { id: 'legs', outlineSVG: '<rect x="130" y="105" width="80" height="30" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<rect x="8" y="10" width="44" height="30" rx="5" fill="#8B7355"/>' },
          { id: 'tail', outlineSVG: '<path d="M230 65 Q255 60 255 80" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<path d="M10 15 Q40 10 45 30" fill="#8B7355" stroke="none"/>' }
        ],
        facts: [
          { es: 'El Triceratops tenia una cabeza enorme!', en: 'Triceratops had a huge head!', ca: 'El Triceratops tenia un cap enorme!' },
          { es: 'Sus cuernos eran para defenderse!', en: 'Its horns were for defense!', ca: 'Les seves banyes eren per defensar-se!' },
          { es: 'Dos cuernos largos sobre los ojos!', en: 'Two long horns above the eyes!', ca: 'Dues banyes llargues sobre els ulls!' },
          { es: 'Un cuerpo enorme y fuerte!', en: 'A massive, strong body!', ca: 'Un cos enorme i fort!' },
          { es: 'Cuatro patas robustas!', en: 'Four sturdy legs!', ca: 'Quatre potes robustes!' },
          { es: 'Una cola corta y gruesa!', en: 'A short, thick tail!', ca: 'Una cua curta i gruixuda!' }
        ]
      }
    },
    {
      id: 'dino-3',
      name: { es: 'Stegosaurus', en: 'Stegosaurus', ca: 'Stegosaurus' },
      gameType: 'counting',
      illustration: function () { return DinoSVG.stegosaurus(); },
      keyFact: { es: 'El Stegosaurus tenia 17 placas en su espalda y una cola con pinchos llamada tagomizer!', en: 'Stegosaurus had 17 plates on its back and a spiked tail called a thagomizer!', ca: 'L\'Stegosaurus tenia 17 plaques a l\'esquena i una cua amb punxes anomenada tagomizer!' },
      learnFacts: [
        { es: 'Stegosaurus significa "lagarto con tejado"', en: 'Stegosaurus means "roof lizard"', ca: 'Stegosaurus significa "llangardaix amb teulada"' },
        { es: 'Su cerebro era del tamano de una nuez!', en: 'Its brain was the size of a walnut!', ca: 'El seu cervell era de la mida d\'una nou!' },
        { es: 'Los pinchos de la cola se llaman tagomizer', en: 'The tail spikes are called a thagomizer', ca: 'Les punxes de la cua s\'anomenen tagomizer' }
      ],
      config: {
        scenes: [
          {
            question: { es: 'Cuantas placas puedes contar?', en: 'How many plates can you count?', ca: 'Quantes plaques pots comptar?' },
            sceneSVG: '<svg viewBox="0 0 300 200"><rect x="0" y="0" width="300" height="200" fill="#e8f8f5"/><polygon points="60,120 68,90 76,120" fill="#e67e22"/><polygon points="80,115 88,82 96,115" fill="#e67e22"/><polygon points="100,112 108,78 116,112" fill="#e67e22"/><polygon points="120,112 128,76 136,112" fill="#e67e22"/><polygon points="140,115 148,84 156,115" fill="#e67e22"/><ellipse cx="150" cy="130" rx="80" ry="25" fill="#7B8D4E"/></svg>',
            answers: [4, 5, 6], correct: 5, fact: { es: 'Cinco placas en fila!', en: 'Five plates in a row!', ca: 'Cinc plaques en fila!' }
          },
          {
            question: { es: 'Cuantos pinchos tiene la cola?', en: 'How many tail spikes?', ca: 'Quantes punxes te la cua?' },
            sceneSVG: '<svg viewBox="0 0 300 200"><rect x="0" y="0" width="300" height="200" fill="#e8f8f5"/><line x1="80" y1="120" x2="180" y2="120" stroke="#7B8D4E" stroke-width="12" stroke-linecap="round"/><polygon points="180,110 210,100 195,120" fill="#c0392b"/><polygon points="190,108 220,95 205,118" fill="#c0392b"/><polygon points="185,130 215,140 200,120" fill="#c0392b"/><polygon points="195,132 225,145 210,122" fill="#c0392b"/></svg>',
            answers: [3, 4, 5], correct: 4, fact: { es: 'Cuatro pinchos afilados!', en: 'Four sharp tail spikes!', ca: 'Quatre punxes esmolades!' }
          },
          {
            question: { es: 'Cuantos bebes Stegosaurus hay?', en: 'How many baby Stegosauruses?', ca: 'Quants bebes Stegosaurus hi ha?' },
            sceneSVG: '<svg viewBox="0 0 300 200"><rect x="0" y="0" width="300" height="200" fill="#e8f8f5"/><ellipse cx="80" cy="150" rx="25" ry="15" fill="#8fa05a"/><polygon points="65,140 69,128 73,140" fill="#e67e22"/><polygon points="75,138 79,126 83,138" fill="#e67e22"/><ellipse cx="160" cy="155" rx="22" ry="13" fill="#8fa05a"/><polygon points="148,146 151,136 154,146" fill="#e67e22"/><polygon points="157,144 160,134 163,144" fill="#e67e22"/><ellipse cx="240" cy="150" rx="25" ry="15" fill="#8fa05a"/><polygon points="228,140 232,128 236,140" fill="#e67e22"/><polygon points="238,138 242,126 246,138" fill="#e67e22"/></svg>',
            answers: [2, 3, 4], correct: 3, fact: { es: 'Tres bebes dinos adorables!', en: 'Three cute baby dinos!', ca: 'Tres bebes dinos adorables!' }
          },
          {
            question: { es: 'Cuantas patas tiene el Stegosaurus?', en: 'How many legs does Stegosaurus have?', ca: 'Quantes potes te l\'Stegosaurus?' },
            sceneSVG: '<svg viewBox="0 0 300 200"><rect x="0" y="0" width="300" height="200" fill="#e8f8f5"/><ellipse cx="150" cy="110" rx="70" ry="30" fill="#7B8D4E"/><rect x="95" y="128" width="14" height="35" rx="4" fill="#6a7d3e"/><rect x="120" y="130" width="14" height="33" rx="4" fill="#6a7d3e"/><rect x="160" y="130" width="14" height="33" rx="4" fill="#6a7d3e"/><rect x="185" y="128" width="14" height="35" rx="4" fill="#6a7d3e"/></svg>',
            answers: [2, 4, 6], correct: 4, fact: { es: 'Cuatro patas fuertes!', en: 'Four strong legs!', ca: 'Quatre potes fortes!' }
          },
          {
            question: { es: 'Cuantos arboles hay en el bosque?', en: 'How many trees in the forest?', ca: 'Quants arbres hi ha al bosc?' },
            sceneSVG: '<svg viewBox="0 0 300 200"><rect x="0" y="0" width="300" height="200" fill="#e8f8f5"/><rect x="35" y="100" width="10" height="50" fill="#8B7355"/><polygon points="20,110 40,40 60,110" fill="#27ae60"/><rect x="95" y="90" width="10" height="60" fill="#8B7355"/><polygon points="80,100 100,25 120,100" fill="#2ecc71"/><rect x="155" y="95" width="10" height="55" fill="#8B7355"/><polygon points="140,105 160,30 180,105" fill="#27ae60"/><rect x="215" y="100" width="10" height="50" fill="#8B7355"/><polygon points="200,110 220,40 240,110" fill="#2ecc71"/><rect x="265" y="90" width="10" height="60" fill="#8B7355"/><polygon points="250,100 270,25 290,100" fill="#27ae60"/><ellipse cx="100" cy="170" rx="25" ry="15" fill="#7B8D4E"/></svg>',
            answers: [4, 5, 6], correct: 5, fact: { es: 'Cinco arboles para comer!', en: 'Five trees for munching!', ca: 'Cinc arbres per menjar!' }
          }
        ]
      }
    },
    {
      id: 'dino-4',
      name: { es: 'Brachiosaurus', en: 'Brachiosaurus', ca: 'Brachiosaurus' },
      gameType: 'maze',
      illustration: function () { return DinoSVG.brachiosaurus(); },
      keyFact: { es: 'El Brachiosaurus era tan alto como un edificio de 4 pisos!', en: 'Brachiosaurus was as tall as a 4-story building!', ca: 'El Brachiosaurus era tan alt com un edifici de 4 pisos!' },
      learnFacts: [
        { es: 'Brachiosaurus significa "lagarto brazo"', en: 'Brachiosaurus means "arm lizard"', ca: 'Brachiosaurus significa "llangardaix brac"' },
        { es: 'Media 26 metros de largo!', en: 'It was 85 feet long!', ca: 'Feia 26 metres de llarg!' },
        { es: 'Sus patas delanteras eran mas largas que las traseras', en: 'Its front legs were longer than its back legs', ca: 'Les seves potes davanteres eren mes llargues que les del darrere' }
      ],
      config: {
        grid: [[0,0,1,1,1,1,0],[1,0,1,0,0,0,0],[1,0,0,0,1,1,0],[1,1,1,0,1,0,0],[0,0,0,0,1,0,1],[0,1,1,0,0,0,1],[0,0,1,1,1,0,0]],
        start: { r: 0, c: 0 }, goal: { r: 0, c: 6 },
        playerEmoji: '🦕', goalEmoji: '🌿', wallColor: '#2d8a4e',
        collectibles: [{ r: 1, c: 3, emoji: '🍃' }, { r: 4, c: 0, emoji: '🌱' }, { r: 6, c: 1, emoji: '🍃' }]
      }
    },
    {
      id: 'dino-5',
      name: { es: 'Velociraptor', en: 'Velociraptor', ca: 'Velociraptor' },
      gameType: 'matching',
      illustration: function () { return DinoSVG.velociraptor(); },
      keyFact: { es: 'El Velociraptor era del tamano de un pavo, tenia plumas y una gran garra!', en: 'Velociraptor was turkey-sized, had feathers, and a big sickle claw!', ca: 'El Velociraptor era de la mida d\'un gall dindi, tenia plomes i una gran urpa!' },
      learnFacts: [
        { es: 'Velociraptor significa "ladron veloz"', en: 'Velociraptor means "swift thief"', ca: 'Velociraptor significa "lladre veloc"' },
        { es: 'Media solo 60 centimetros de alto!', en: 'It was only about 2 feet tall!', ca: 'Feia nomes 60 centimetres d\'alt!' },
        { es: 'Tenia plumas como un pajaro', en: 'It had feathers like a bird', ca: 'Tenia plomes com un ocell' }
      ],
      config: {
        gridClass: 'grid-2x4',
        pairs: [
          { id: 'size', labelA: { es: '🦃 Tamano de pavo', en: '🦃 Turkey-sized', ca: '🦃 Mida de gall dindi' }, labelB: { es: '📏 60 cm de alto', en: '📏 2 feet tall', ca: '📏 60 cm d\'alt' } },
          { id: 'claw', labelA: { es: '🔪 Garra curva', en: '🔪 Sickle claw', ca: '🔪 Urpa corba' }, labelB: { es: '🦶 Arma en el dedo', en: '🦶 Big toe weapon', ca: '🦶 Arma al dit' } },
          { id: 'speed', labelA: { es: '💨 Muy rapido', en: '💨 Very fast', ca: '💨 Molt rapid' }, labelB: { es: '🏃 Corria a 60 km/h', en: '🏃 40 mph runner', ca: '🏃 Corria a 60 km/h' } },
          { id: 'feather', labelA: { es: '🪶 Tenia plumas', en: '🪶 Had feathers', ca: '🪶 Tenia plomes' }, labelB: { es: '🐦 Pariente de las aves', en: '🐦 Bird relative', ca: '🐦 Parent dels ocells' } }
        ],
        facts: [
          { es: 'El Velociraptor era pequenito!', en: 'Velociraptor was tiny!', ca: 'El Velociraptor era petit!' },
          { es: 'Su garra era mortal!', en: 'Its claw was deadly!', ca: 'La seva urpa era mortal!' },
          { es: 'Cazador super rapido!', en: 'Super speedy hunter!', ca: 'Cacador super rapid!' },
          { es: 'Dinosaurio con plumas!', en: 'Feathered dinosaur!', ca: 'Dinosaure amb plomes!' }
        ]
      }
    },
    {
      id: 'dino-6',
      name: { es: 'Ankylosaurus', en: 'Ankylosaurus', ca: 'Ankylosaurus' },
      gameType: 'coloring',
      illustration: function () { return DinoSVG.ankylosaurus(); },
      keyFact: { es: 'El Ankylosaurus era como un tanque viviente con una cola de mazo!', en: 'Ankylosaurus was like a living tank with a club tail!', ca: 'L\'Ankylosaurus era com un tanc vivent amb una cua de maca!' },
      learnFacts: [
        { es: 'Ankylosaurus significa "lagarto fusionado"', en: 'Ankylosaurus means "fused lizard"', ca: 'Ankylosaurus significa "llangardaix fusionat"' },
        { es: 'Estaba cubierto de placas de armadura osea', en: 'It was covered in bony armor plates', ca: 'Estava cobert de plaques d\'armadura ossia' },
        { es: 'Su mazo de cola podia romper huesos!', en: 'Its tail club could break bones!', ca: 'La seva maca de cua podia trencar ossos!' }
      ],
      config: {
        regionCount: 12,
        svgContent: '<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="300" height="220" fill="#f0f4ff"/><ellipse class="coloring-region" data-region="body" cx="140" cy="120" rx="70" ry="40" fill="#ecf0f1"/><ellipse class="coloring-region" data-region="head" cx="60" cy="105" rx="28" ry="22" fill="#ecf0f1"/><circle class="coloring-region" data-region="eye" cx="50" cy="98" r="6" fill="#ecf0f1"/><circle class="coloring-region" data-region="armor1" cx="105" cy="90" r="12" fill="#ecf0f1"/><circle class="coloring-region" data-region="armor2" cx="135" cy="86" r="13" fill="#ecf0f1"/><circle class="coloring-region" data-region="armor3" cx="165" cy="88" r="12" fill="#ecf0f1"/><rect class="coloring-region" data-region="leg1" x="95" y="148" width="18" height="28" rx="6" fill="#ecf0f1"/><rect class="coloring-region" data-region="leg2" x="140" y="148" width="18" height="28" rx="6" fill="#ecf0f1"/><path class="coloring-region" data-region="tail" d="M210 115 Q240 108 245 120" fill="#ecf0f1" stroke="#b2bec3" stroke-width="2"/><circle class="coloring-region" data-region="club" cx="252" cy="118" r="14" fill="#ecf0f1"/><polygon class="coloring-region" data-region="spike1" points="80,95 74,78 86,78" fill="#ecf0f1"/><polygon class="coloring-region" data-region="spike2" points="190,95 184,78 196,78" fill="#ecf0f1"/></svg>'
      }
    },
    {
      id: 'dino-7',
      name: { es: 'Parasaurolophus', en: 'Parasaurolophus', ca: 'Parasaurolophus' },
      gameType: 'quiz',
      illustration: function () { return DinoSVG.parasaurolophus(); },
      keyFact: { es: 'El Parasaurolophus usaba su cresta como una trompeta para hacer sonidos!', en: 'Parasaurolophus used its crest like a trumpet to make sounds!', ca: 'El Parasaurolophus usava la seva cresta com una trompeta per fer sons!' },
      learnFacts: [
        { es: 'Tenia un tubo largo en la cabeza llamado cresta', en: 'It had a long tube on its head called a crest', ca: 'Tenia un tub llarg al cap anomenat cresta' },
        { es: 'La cresta podia hacer sonidos graves como un trombon', en: 'The crest could make deep sounds like a trombone', ca: 'La cresta podia fer sons greus com un trombo' },
        { es: 'Caminaba sobre 2 y 4 patas', en: 'It walked on both 2 and 4 legs', ca: 'Caminava sobre 2 i 4 potes' }
      ],
      config: {
        questions: [
          { question: { es: 'Que tiene el Parasaurolophus en la cabeza?', en: "What is on Parasaurolophus' head?", ca: 'Que te el Parasaurolophus al cap?' }, answers: [{ es: 'Cuernos', en: 'Horns', ca: 'Banyes' }, { es: 'Una cresta larga', en: 'A long crest', ca: 'Una cresta llarga' }, { es: 'Plumas', en: 'Feathers', ca: 'Plomes' }], correct: 1, fact: { es: 'Una cresta hueca como un tubo!', en: 'A hollow crest like a tube!', ca: 'Una cresta buida com un tub!' } },
          { question: { es: 'Para que usaba la cresta?', en: 'What did it use the crest for?', ca: 'Per a que usava la cresta?' }, answers: [{ es: 'Cavar', en: 'Digging', ca: 'Cavar' }, { es: 'Hacer sonidos', en: 'Making sounds', ca: 'Fer sons' }, { es: 'Nadar', en: 'Swimming', ca: 'Nedar' }], correct: 1, fact: { es: 'Podia tocar la trompeta con su cresta!', en: 'It could trumpet through its crest!', ca: 'Podia tocar la trompeta amb la seva cresta!' } },
          { question: { es: 'A que instrumento se parece el sonido de la cresta?', en: 'What instrument does the crest sound like?', ca: 'A quin instrument s\'assembla el so de la cresta?' }, answers: [{ es: 'Tambor', en: 'Drum', ca: 'Tambor' }, { es: 'Trombon', en: 'Trombone', ca: 'Trombo' }, { es: 'Guitarra', en: 'Guitar', ca: 'Guitarra' }], correct: 1, fact: { es: 'Sonidos graves como un trombon!', en: 'Deep trombone-like sounds!', ca: 'Sons greus com un trombo!' } },
          { question: { es: 'Que comia el Parasaurolophus?', en: 'What did Parasaurolophus eat?', ca: 'Que menjava el Parasaurolophus?' }, answers: [{ es: 'Carne', en: 'Meat', ca: 'Carn' }, { es: 'Plantas', en: 'Plants', ca: 'Plantes' }, { es: 'Rocas', en: 'Rocks', ca: 'Roques' }], correct: 1, fact: { es: 'Un tranquilo herbivoro!', en: 'A gentle plant-eater!', ca: 'Un tranquil herbivor!' } },
          { question: { es: 'Como caminaba?', en: 'How did it walk?', ca: 'Com caminava?' }, answers: [{ es: 'Siempre a 4 patas', en: 'Always on 4 legs', ca: 'Sempre a 4 potes' }, { es: 'A 2 o 4 patas', en: 'On 2 or 4 legs', ca: 'A 2 o 4 potes' }, { es: 'Podia volar', en: 'It could fly', ca: 'Podia volar' }], correct: 1, fact: { es: 'Podia caminar de ambas formas!', en: 'It could walk both ways!', ca: 'Podia caminar de les dues maneres!' } }
        ]
      }
    },
    {
      id: 'dino-8',
      name: { es: 'Spinosaurus', en: 'Spinosaurus', ca: 'Spinosaurus' },
      gameType: 'dragdrop',
      illustration: function () { return DinoSVG.spinosaurus(); },
      keyFact: { es: 'El Spinosaurus era mas grande que el T-Rex y le encantaba comer peces!', en: 'Spinosaurus was bigger than T-Rex and loved to eat fish!', ca: 'L\'Spinosaurus era mes gran que el T-Rex i li encantava menjar peixos!' },
      learnFacts: [
        { es: 'El Spinosaurus tenia una vela gigante en su espalda', en: 'Spinosaurus had a giant sail on its back', ca: 'L\'Spinosaurus tenia una vela gegant a l\'esquena' },
        { es: 'Era el dinosaurio carnivoro mas grande', en: 'It was the biggest meat-eating dinosaur', ca: 'Era el dinosaure carnivor mes gran' },
        { es: 'Pasaba mucho tiempo en el agua pescando', en: 'It spent lots of time in water catching fish', ca: 'Passava molt de temps a l\'aigua pescant' }
      ],
      config: {
        pieces: [
          { id: 'fish1', outlineSVG: '<ellipse cx="80" cy="160" rx="20" ry="10" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<ellipse cx="30" cy="25" rx="18" ry="9" fill="#3498db"/><polygon points="46,25 55,18 55,32" fill="#3498db"/>' },
          { id: 'fish2', outlineSVG: '<ellipse cx="140" cy="170" rx="20" ry="10" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<ellipse cx="30" cy="25" rx="18" ry="9" fill="#2ecc71"/><polygon points="46,25 55,18 55,32" fill="#2ecc71"/>' },
          { id: 'fish3', outlineSVG: '<ellipse cx="200" cy="155" rx="20" ry="10" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<ellipse cx="30" cy="25" rx="18" ry="9" fill="#e74c3c"/><polygon points="46,25 55,18 55,32" fill="#e74c3c"/>' },
          { id: 'fish4', outlineSVG: '<ellipse cx="50" cy="180" rx="20" ry="10" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<ellipse cx="30" cy="25" rx="18" ry="9" fill="#f39c12"/><polygon points="46,25 55,18 55,32" fill="#f39c12"/>' },
          { id: 'fish5', outlineSVG: '<ellipse cx="170" cy="185" rx="20" ry="10" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<ellipse cx="30" cy="25" rx="18" ry="9" fill="#9b59b6"/><polygon points="46,25 55,18 55,32" fill="#9b59b6"/>' },
          { id: 'fish6', outlineSVG: '<ellipse cx="110" cy="195" rx="20" ry="10" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<ellipse cx="30" cy="25" rx="18" ry="9" fill="#1abc9c"/><polygon points="46,25 55,18 55,32" fill="#1abc9c"/>' },
          { id: 'fish7', outlineSVG: '<ellipse cx="240" cy="175" rx="20" ry="10" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<ellipse cx="30" cy="25" rx="18" ry="9" fill="#e84393"/><polygon points="46,25 55,18 55,32" fill="#e84393"/>' },
          { id: 'fish8', outlineSVG: '<ellipse cx="260" cy="195" rx="20" ry="10" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<ellipse cx="30" cy="25" rx="18" ry="9" fill="#00cec9"/><polygon points="46,25 55,18 55,32" fill="#00cec9"/>' }
        ],
        facts: [
          { es: 'Nam, un pez azul!', en: 'Yum, a blue fish!', ca: 'Nyam, un peix blau!' },
          { es: 'Uno verde tambien!', en: 'A green one too!', ca: 'Un de verd tambe!' },
          { es: 'Pez rojo — picante!', en: 'Red fish — spicy!', ca: 'Peix vermell — picant!' },
          { es: 'Pez dorado — elegante!', en: 'Golden fish — fancy!', ca: 'Peix daurat — elegant!' },
          { es: 'Pez morado!', en: 'Purple fish!', ca: 'Peix morat!' },
          { es: 'Pez turquesa!', en: 'Teal fish!', ca: 'Peix turquesa!' },
          { es: 'Pez rosa!', en: 'Pink fish!', ca: 'Peix rosa!' },
          { es: 'Barriga llena!', en: 'All full up!', ca: 'Panxa plena!' }
        ]
      }
    },
    {
      id: 'dino-9',
      name: { es: 'Pteranodon', en: 'Pteranodon', ca: 'Pteranodon' },
      gameType: 'maze',
      illustration: function () { return DinoSVG.pteranodon(); },
      keyFact: { es: 'El Pteranodon era un reptil volador con una envergadura de 10 metros!', en: 'Pteranodon was a flying reptile with a 33-foot wingspan!', ca: 'El Pteranodon era un reptil volador amb una envergadura de 10 metres!' },
      learnFacts: [
        { es: 'El Pteranodon NO era un dinosaurio — era un reptil volador!', en: 'Pteranodon was NOT a dinosaur — it was a flying reptile!', ca: 'El Pteranodon NO era un dinosaure — era un reptil volador!' },
        { es: 'Su envergadura era de 10 metros — enorme!', en: 'Its wingspan was 33 feet — huge!', ca: 'La seva envergadura era de 10 metres — enorme!' },
        { es: 'Comia peces recogiendolos del agua', en: 'It ate fish by scooping them up', ca: 'Menjava peixos recollint-los de l\'aigua' }
      ],
      config: {
        grid: [[0,0,0,1,1,1,1,0],[1,1,0,0,0,1,0,0],[1,0,0,1,0,0,0,1],[1,0,1,1,1,0,1,1],[0,0,0,0,1,0,0,0],[0,1,1,0,0,0,1,0]],
        start: { r: 0, c: 0 }, goal: { r: 5, c: 7 },
        playerEmoji: '🦅', goalEmoji: '🪺', wallColor: '#a8d8ea',
        collectibles: [{ r: 1, c: 3, emoji: '⭐' }, { r: 4, c: 0, emoji: '🐟' }, { r: 2, c: 5, emoji: '⭐' }]
      }
    },
    {
      id: 'dino-10',
      name: { es: 'Diplodocus', en: 'Diplodocus', ca: 'Diplodocus' },
      gameType: 'counting',
      illustration: function () { return DinoSVG.diplodocus(); },
      keyFact: { es: 'El Diplodocus media tanto como 3 autobuses escolares y tenia una cola como un latigo!', en: 'Diplodocus was as long as 3 school buses and had a whip tail!', ca: 'El Diplodocus feia tant com 3 autobusos escolars i tenia una cua com un fuet!' },
      learnFacts: [
        { es: 'Diplodocus significa "doble viga"', en: 'Diplodocus means "double beam"', ca: 'Diplodocus significa "doble biga"' },
        { es: 'Media 27 metros de largo!', en: 'It was 90 feet long!', ca: 'Feia 27 metres de llarg!' },
        { es: 'Su cola podia chasquear como un latigo', en: 'Its tail could crack like a whip', ca: 'La seva cua podia petar com un fuet' }
      ],
      config: {
        scenes: [
          {
            question: { es: 'Cuantos Diplodocus hay en la manada?', en: 'How many Diplodocuses in the herd?', ca: 'Quants Diplodocus hi ha al ramat?' },
            sceneSVG: '<svg viewBox="0 0 300 200"><rect x="0" y="0" width="300" height="200" fill="#e8f8f5"/><ellipse cx="60" cy="140" rx="30" ry="18" fill="#7A8B5A"/><path d="M40 135 Q30 105 25 85" stroke="#8a9c6a" stroke-width="6" fill="none"/><ellipse cx="150" cy="135" rx="35" ry="20" fill="#7A8B5A"/><path d="M125 130 Q115 95 110 75" stroke="#8a9c6a" stroke-width="7" fill="none"/><ellipse cx="250" cy="140" rx="30" ry="18" fill="#7A8B5A"/><path d="M230 135 Q220 105 215 85" stroke="#8a9c6a" stroke-width="6" fill="none"/></svg>',
            answers: [2, 3, 4], correct: 3, fact: { es: 'Tres amigos de cuello largo!', en: 'Three long-necked friends!', ca: 'Tres amics de coll llarg!' }
          },
          {
            question: { es: 'Cuantos huevos hay en el nido?', en: 'How many eggs in the nest?', ca: 'Quants ous hi ha al niu?' },
            sceneSVG: '<svg viewBox="0 0 300 200"><rect x="0" y="0" width="300" height="200" fill="#e8f8f5"/><ellipse cx="150" cy="150" rx="80" ry="30" fill="#8B7355"/><ellipse cx="110" cy="130" rx="18" ry="22" fill="#f5f0e1"/><ellipse cx="150" cy="125" rx="18" ry="22" fill="#f5f0e1"/><ellipse cx="190" cy="130" rx="18" ry="22" fill="#f5f0e1"/><ellipse cx="130" cy="118" rx="18" ry="22" fill="#f5f0e1"/><ellipse cx="170" cy="118" rx="18" ry="22" fill="#f5f0e1"/><ellipse cx="150" cy="108" rx="18" ry="22" fill="#f5f0e1"/></svg>',
            answers: [5, 6, 7], correct: 6, fact: { es: 'Seis huevos — gran familia!', en: 'Six eggs — big family!', ca: 'Sis ous — gran familia!' }
          },
          {
            question: { es: 'Cuantos arboles para merendar?', en: 'How many trees for snacking?', ca: 'Quants arbres per berenar?' },
            sceneSVG: '<svg viewBox="0 0 300 200"><rect x="0" y="0" width="300" height="200" fill="#e8f8f5"/><rect x="35" y="80" width="8" height="70" fill="#8B7355"/><circle cx="39" cy="60" r="25" fill="#27ae60"/><rect x="95" y="70" width="8" height="80" fill="#8B7355"/><circle cx="99" cy="50" r="28" fill="#2ecc71"/><rect x="165" y="80" width="8" height="70" fill="#8B7355"/><circle cx="169" cy="60" r="25" fill="#27ae60"/><rect x="235" y="75" width="8" height="75" fill="#8B7355"/><circle cx="239" cy="55" r="27" fill="#2ecc71"/></svg>',
            answers: [3, 4, 5], correct: 4, fact: { es: 'Cuatro arboles deliciosos!', en: 'Four yummy trees!', ca: 'Quatre arbres deliciosos!' }
          },
          {
            question: { es: 'Cuantas huellas hay en el suelo?', en: 'How many footprints on the ground?', ca: 'Quantes petjades hi ha al terra?' },
            sceneSVG: '<svg viewBox="0 0 300 200"><rect x="0" y="0" width="300" height="200" fill="#e8dcc8"/><ellipse cx="50" cy="60" rx="15" ry="20" fill="#c4a77d"/><ellipse cx="120" cy="100" rx="15" ry="20" fill="#c4a77d"/><ellipse cx="80" cy="150" rx="15" ry="20" fill="#c4a77d"/><ellipse cx="180" cy="50" rx="15" ry="20" fill="#c4a77d"/><ellipse cx="220" cy="130" rx="15" ry="20" fill="#c4a77d"/><ellipse cx="260" cy="70" rx="15" ry="20" fill="#c4a77d"/><ellipse cx="160" cy="170" rx="15" ry="20" fill="#c4a77d"/></svg>',
            answers: [6, 7, 8], correct: 7, fact: { es: 'Siete huellas gigantes!', en: 'Seven giant footprints!', ca: 'Set petjades gegants!' }
          },
          {
            question: { es: 'Cuantos autobuses de largo mide el Diplodocus?', en: 'How many school buses long is Diplodocus?', ca: 'Quants autobusos de llarg fa el Diplodocus?' },
            sceneSVG: '<svg viewBox="0 0 300 200"><rect x="0" y="0" width="300" height="200" fill="#e8f8f5"/><rect x="20" y="110" width="75" height="35" rx="5" fill="#f1c40f"/><circle cx="35" cy="152" r="8" fill="#2d3436"/><circle cx="80" cy="152" r="8" fill="#2d3436"/><rect x="112" y="110" width="75" height="35" rx="5" fill="#f1c40f"/><circle cx="127" cy="152" r="8" fill="#2d3436"/><circle cx="172" cy="152" r="8" fill="#2d3436"/><rect x="204" y="110" width="75" height="35" rx="5" fill="#f1c40f"/><circle cx="219" cy="152" r="8" fill="#2d3436"/><circle cx="264" cy="152" r="8" fill="#2d3436"/><path d="M30 100 Q150 40 270 100" stroke="#7A8B5A" stroke-width="8" fill="none"/></svg>',
            answers: [2, 3, 4], correct: 3, fact: { es: 'Tan largo como 3 autobuses!', en: 'As long as 3 school buses!', ca: 'Tan llarg com 3 autobusos!' }
          }
        ]
      }
    }
  ],

  truck: [
    {
      id: 'truck-1',
      name: { es: 'Grave Digger', en: 'Grave Digger', ca: 'Grave Digger' },
      gameType: 'quiz',
      illustration: function () { return TruckSVG.gravedigger(); },
      keyFact: { es: 'Grave Digger se construyo en 1982 y tiene 1500 caballos de fuerza!', en: 'Grave Digger was built in 1982 and has 1500 horsepower!', ca: 'Grave Digger es va construir el 1982 i te 1500 cavalls de forca!' },
      learnFacts: [
        { es: 'Grave Digger es el monster truck mas famoso de la historia!', en: 'Grave Digger is the most famous monster truck ever!', ca: 'Grave Digger es el monster truck mes famos de la historia!' },
        { es: 'Lo construyo Dennis Anderson', en: 'It was built by Dennis Anderson', ca: 'El va construir Dennis Anderson' },
        { es: 'El camion tiene mas de 1500 caballos de fuerza!', en: 'The truck has over 1500 horsepower!', ca: 'El camio te mes de 1500 cavalls de forca!' }
      ],
      config: {
        questions: [
          { question: { es: 'Cuando se construyo Grave Digger?', en: 'When was Grave Digger built?', ca: 'Quan es va construir Grave Digger?' }, answers: [{ es: '1982', en: '1982', ca: '1982' }, { es: '2010', en: '2010', ca: '2010' }, { es: '1776', en: '1776', ca: '1776' }], correct: 0, fact: { es: 'Hace mas de 40 anos!', en: 'Over 40 years ago!', ca: 'Fa mes de 40 anys!' } },
          { question: { es: 'Quien construyo Grave Digger?', en: 'Who built Grave Digger?', ca: 'Qui va construir Grave Digger?' }, answers: [{ es: 'Papa Noel', en: 'Santa Claus', ca: 'El Pare Noel' }, { es: 'Dennis Anderson', en: 'Dennis Anderson', ca: 'Dennis Anderson' }, { es: 'Un robot', en: 'A robot', ca: 'Un robot' }], correct: 1, fact: { es: 'Dennis Anderson lo construyo!', en: 'Dennis Anderson built it!', ca: 'Dennis Anderson el va construir!' } },
          { question: { es: 'Cuantos caballos de fuerza tiene?', en: 'How much horsepower?', ca: 'Quants cavalls de forca te?' }, answers: [{ es: '10', en: '10', ca: '10' }, { es: '150', en: '150', ca: '150' }, { es: '1500', en: '1500', ca: '1500' }], correct: 2, fact: { es: '1500 — eso es super potente!', en: '1500 — that is super powerful!', ca: '1500 — aixo es super potent!' } },
          { question: { es: 'De que color es Grave Digger?', en: 'What color is Grave Digger?', ca: 'De quin color es Grave Digger?' }, answers: [{ es: 'Rosa', en: 'Pink', ca: 'Rosa' }, { es: 'Verde y morado', en: 'Green and purple', ca: 'Verd i morat' }, { es: 'Amarillo', en: 'Yellow', ca: 'Groc' }], correct: 1, fact: { es: 'Verde con morado tenebroso!', en: 'Green with spooky purple!', ca: 'Verd amb morat tenebrós!' } },
          { question: { es: 'Que hace mejor Grave Digger?', en: 'What does Grave Digger do best?', ca: 'Que fa millor Grave Digger?' }, answers: [{ es: 'Nadar', en: 'Swimming', ca: 'Nedar' }, { es: 'Aplastar coches y dar volteretas', en: 'Crushing cars and doing backflips', ca: 'Aixafar cotxes i fer volteretes' }, { es: 'Cocinar', en: 'Cooking', ca: 'Cuinar' }], correct: 1, fact: { es: 'Aplastar y dar volteretas!', en: 'Crushing and flipping!', ca: 'Aixafar i fer volteretes!' } }
        ]
      }
    },
    {
      id: 'truck-2',
      name: { es: 'Megalodon', en: 'Megalodon', ca: 'Megalodon' },
      gameType: 'matching',
      illustration: function () { return TruckSVG.megalodon(); },
      keyFact: { es: 'Megalodon lleva el nombre del mega-tiburon prehistorico!', en: 'Megalodon is named after the prehistoric mega-shark!', ca: 'Megalodon porta el nom del mega-tauró prehistoric!' },
      learnFacts: [
        { es: 'Megalodon significa "diente grande"', en: 'Megalodon means "big tooth"', ca: 'Megalodon significa "dent gran"' },
        { es: 'El verdadero tiburon Megalodon media 18 metros!', en: 'The real Megalodon shark was 60 feet long!', ca: 'El veritable tauró Megalodon feia 18 metres!' },
        { es: 'Este camion tiene una aleta de tiburon enorme encima', en: 'This truck has a huge shark fin on top', ca: 'Aquest camio te una aleta de tauró enorme a sobre' }
      ],
      config: {
        gridClass: 'grid-2x4',
        pairs: [
          { id: 'name', labelA: { es: '🦈 Megalodon', en: '🦈 Megalodon', ca: '🦈 Megalodon' }, labelB: { es: '🦷 "Diente grande"', en: '🦷 "Big Tooth"', ca: '🦷 "Dent gran"' } },
          { id: 'size', labelA: { es: '📏 18 metros', en: '📏 60 feet', ca: '📏 18 metres' }, labelB: { es: '🐋 Tiburon enorme', en: '🐋 Huge shark', ca: '🐋 Tauró enorme' } },
          { id: 'truck', labelA: { es: '🚛 Monster truck', en: '🚛 Monster truck', ca: '🚛 Monster truck' }, labelB: { es: '🦈 Diseno de tiburon', en: '🦈 Shark design', ca: '🦈 Disseny de tauró' } },
          { id: 'power', labelA: { es: '💪 1500 CV', en: '💪 1500 HP', ca: '💪 1500 CV' }, labelB: { es: '⚡ Super rapido', en: '⚡ Super fast', ca: '⚡ Super rapid' } }
        ],
        facts: [
          { es: 'Diente grande de verdad!', en: 'Big tooth indeed!', ca: 'Dent gran de debo!' },
          { es: 'Tiburon prehistorico gigante!', en: 'Giant prehistoric shark!', ca: 'Tauró prehistoric gegant!' },
          { es: 'El diseno mas genial!', en: 'Coolest truck design!', ca: 'El disseny mes genial!' },
          { es: 'Muchisima potencia!', en: 'So much power!', ca: 'Moltissima potencia!' }
        ]
      }
    },
    {
      id: 'truck-3',
      name: { es: 'El Toro Loco', en: 'El Toro Loco', ca: 'El Toro Loco' },
      gameType: 'coloring',
      illustration: function () { return TruckSVG.eltoro(); },
      keyFact: { es: 'El Toro Loco echa humo de verdad por la nariz!', en: 'El Toro Loco means "The Crazy Bull" in Spanish — it blows real smoke!', ca: 'El Toro Loco treu fum de debo pel nas!' },
      learnFacts: [
        { es: 'El Toro Loco significa "The Crazy Bull" en ingles', en: 'El Toro Loco means "The Crazy Bull"', ca: 'El Toro Loco significa "El Brau Boig"' },
        { es: 'Tiene cuernos de verdad y echa humo por la nariz!', en: 'It has real horns and blows smoke from its nose!', ca: 'Te banyes de debo i treu fum pel nas!' },
        { es: 'Es uno de los camiones mas populares', en: "It's one of the most popular trucks", ca: 'Es un dels camions mes populars' }
      ],
      config: {
        regionCount: 12,
        svgContent: '<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="300" height="220" fill="#f0f4ff"/><rect class="coloring-region" data-region="body" x="65" y="70" width="170" height="55" rx="10" fill="#ecf0f1"/><rect class="coloring-region" data-region="cab" x="80" y="42" width="100" height="38" rx="8" fill="#ecf0f1"/><rect class="coloring-region" data-region="window1" x="88" y="48" width="38" height="24" rx="4" fill="#ecf0f1"/><rect class="coloring-region" data-region="window2" x="134" y="48" width="38" height="24" rx="4" fill="#ecf0f1"/><path class="coloring-region" data-region="horn1" d="M80 42 Q65 18 58 25" fill="#ecf0f1" stroke="#b2bec3" stroke-width="2"/><path class="coloring-region" data-region="horn2" d="M180 42 Q195 18 202 25" fill="#ecf0f1" stroke="#b2bec3" stroke-width="2"/><circle class="coloring-region" data-region="eye1" cx="100" cy="58" r="8" fill="#ecf0f1"/><circle class="coloring-region" data-region="eye2" cx="160" cy="58" r="8" fill="#ecf0f1"/><ellipse class="coloring-region" data-region="nose" cx="130" cy="78" rx="14" ry="8" fill="#ecf0f1"/><circle class="coloring-region" data-region="wheel1" cx="100" cy="145" r="28" fill="#ecf0f1"/><circle class="coloring-region" data-region="wheel2" cx="200" cy="145" r="28" fill="#ecf0f1"/><rect class="coloring-region" data-region="bumper" x="65" y="118" width="170" height="10" rx="3" fill="#ecf0f1"/></svg>'
      }
    },
    {
      id: 'truck-4',
      name: { es: 'Max-D', en: 'Max-D', ca: 'Max-D' },
      gameType: 'dragdrop',
      illustration: function () { return TruckSVG.maxd(); },
      keyFact: { es: 'Max-D tiene neumaticos de casi 2 metros de alto!', en: 'Max-D has tires that are nearly 6 feet tall!', ca: 'Max-D te pneumatics de quasi 2 metres d\'alt!' },
      learnFacts: [
        { es: 'Max-D significa Maximum Destruction!', en: 'Max-D stands for Maximum Destruction!', ca: 'Max-D significa Maximum Destruction!' },
        { es: 'Sus neumaticos miden 168 cm — casi 2 metros!', en: 'Its tires are 66 inches tall — almost 6 feet!', ca: 'Els seus pneumatics fan 168 cm — quasi 2 metres!' },
        { es: 'Tiene el record del salto mas largo en monster truck', en: 'It holds the record for longest monster truck jump', ca: 'Te el record del salt mes llarg en monster truck' }
      ],
      config: {
        pieces: [
          { id: 'cab', outlineSVG: '<path d="M80 30 L100 10 L180 10 L200 30" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<path d="M5 40 L15 10 L45 10 L55 40" fill="#34495e"/>' },
          { id: 'body', outlineSVG: '<rect x="60" y="30" width="160" height="60" rx="8" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<rect x="5" y="10" width="50" height="30" rx="5" fill="#2c3e50"/>' },
          { id: 'wheel1', outlineSVG: '<circle cx="100" cy="120" r="30" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<circle cx="30" cy="25" r="20" fill="#444"/><circle cx="30" cy="25" r="8" fill="#888"/>' },
          { id: 'wheel2', outlineSVG: '<circle cx="180" cy="120" r="30" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<circle cx="30" cy="25" r="20" fill="#444"/><circle cx="30" cy="25" r="8" fill="#888"/>' },
          { id: 'spoiler', outlineSVG: '<polygon points="190,28 220,15 220,35" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<polygon points="10,30 40,10 40,35" fill="#f39c12"/>' },
          { id: 'lights', outlineSVG: '<rect x="60" y="35" width="20" height="12" rx="3" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<rect x="15" y="18" width="30" height="14" rx="4" fill="#f1c40f" opacity="0.8"/>' }
        ],
        facts: [
          { es: 'La cabina esta muy alta!', en: 'The cab sits way up high!', ca: 'La cabina esta molt alta!' },
          { es: 'Carroceria enorme!', en: 'Massive body!', ca: 'Carrosseria enorme!' },
          { es: 'Neumaticos de casi 2 metros!', en: 'Tires almost 6 feet tall!', ca: 'Pneumatics de quasi 2 metres!' },
          { es: 'Neumatico trasero gigante!', en: 'Giant back tire!', ca: 'Pneumatic del darrere gegant!' },
          { es: 'Un aleron para la velocidad!', en: 'A spoiler for speed!', ca: 'Un alero per a la velocitat!' },
          { es: 'Luces brillantes!', en: 'Bright lights!', ca: 'Llums brillants!' }
        ]
      }
    },
    {
      id: 'truck-5',
      name: { es: 'Blue Thunder', en: 'Blue Thunder', ca: 'Blue Thunder' },
      gameType: 'counting',
      illustration: function () { return TruckSVG.bluethunder(); },
      keyFact: { es: 'Blue Thunder tiene un diseno de rayo y es super ruidoso!', en: 'Blue Thunder has a lightning bolt design and is super loud!', ca: 'Blue Thunder te un disseny de llamp i es super sorollos!' },
      learnFacts: [
        { es: 'Blue Thunder tiene un rayo genial pintado', en: 'Blue Thunder has a cool lightning bolt on it', ca: 'Blue Thunder te un llamp genial pintat' },
        { es: 'Es uno de los monster trucks mas ruidosos', en: 'It is one of the loudest monster trucks', ca: 'Es un dels monster trucks mes sorollosos' },
        { es: 'El motor es increiblemente potente', en: 'The engine is incredibly powerful', ca: 'El motor es increiblement potent' }
      ],
      config: {
        scenes: [
          {
            question: { es: 'Cuantos rayos tiene el camion?', en: 'How many bolts on the truck?', ca: 'Quants llamps te el camio?' },
            sceneSVG: '<svg viewBox="0 0 300 200"><rect x="0" y="0" width="300" height="200" fill="#ffeaa7"/><rect x="60" y="60" width="180" height="70" rx="10" fill="#3498db"/><polygon points="100,70 95,95 115,90 105,120 125,85 108,90 115,70" fill="#f1c40f"/><polygon points="170,65 165,90 185,85 175,115 195,80 178,85 185,65" fill="#f1c40f"/><polygon points="135,75 130,100 150,95 140,125 160,90 143,95 150,75" fill="#f1c40f"/></svg>',
            answers: [2, 3, 4], correct: 3, fact: { es: 'Tres rayos electricos!', en: 'Three lightning bolts!', ca: 'Tres llamps electrics!' }
          },
          {
            question: { es: 'Cuantos neumaticos en total?', en: 'How many tires total?', ca: 'Quants pneumatics en total?' },
            sceneSVG: '<svg viewBox="0 0 300 200"><rect x="0" y="0" width="300" height="200" fill="#ffeaa7"/><circle cx="60" cy="140" r="25" fill="#2d3436"/><circle cx="60" cy="140" r="10" fill="#888"/><circle cx="140" cy="140" r="25" fill="#2d3436"/><circle cx="140" cy="140" r="10" fill="#888"/><circle cx="220" cy="140" r="25" fill="#2d3436"/><circle cx="220" cy="140" r="10" fill="#888"/><rect x="35" y="70" width="210" height="50" rx="8" fill="#3498db"/></svg>',
            answers: [3, 4, 6], correct: 3, fact: { es: 'Tres neumaticos grandes! (Normalmente 4, pero esta es una vista lateral!)', en: 'Three big tires! (Usually 4, but this is a side view!)', ca: 'Tres pneumatics grans! (Normalment 4, pero es una vista lateral!)' }
          },
          {
            question: { es: 'Cuantos fans animando?', en: 'How many fans cheering?', ca: 'Quants fans animant?' },
            sceneSVG: '<svg viewBox="0 0 300 200"><rect x="0" y="0" width="300" height="200" fill="#ffeaa7"/><circle cx="40" cy="50" r="15" fill="#fab1a0"/><circle cx="90" cy="45" r="15" fill="#dfe6e9"/><circle cx="140" cy="50" r="15" fill="#a29bfe"/><circle cx="190" cy="45" r="15" fill="#81ecec"/><circle cx="240" cy="50" r="15" fill="#ffeaa7" stroke="#e17055" stroke-width="1"/><circle cx="270" cy="55" r="15" fill="#55efc4"/><rect x="50" y="120" width="200" height="60" rx="8" fill="#3498db"/></svg>',
            answers: [5, 6, 7], correct: 6, fact: { es: 'Seis fans enloquecidos!', en: 'Six fans going wild!', ca: 'Sis fans entusiasmats!' }
          },
          {
            question: { es: 'Cuantos coches aplasto el camion?', en: 'How many cars did the truck crush?', ca: 'Quants cotxes va aixafar el camio?' },
            sceneSVG: '<svg viewBox="0 0 300 200"><rect x="0" y="0" width="300" height="200" fill="#ffeaa7"/><rect x="20" y="140" width="50" height="25" rx="5" fill="#e74c3c" transform="rotate(-5 45 152)"/><rect x="80" y="145" width="50" height="25" rx="5" fill="#3498db" transform="rotate(3 105 157)"/><rect x="140" y="140" width="50" height="25" rx="5" fill="#27ae60" transform="rotate(-8 165 152)"/><rect x="200" y="145" width="50" height="25" rx="5" fill="#f39c12" transform="rotate(5 225 157)"/><rect x="100" y="80" width="100" height="45" rx="8" fill="#2980b9"/></svg>',
            answers: [3, 4, 5], correct: 4, fact: { es: 'Cuatro coches aplastados!', en: 'Four cars flattened!', ca: 'Quatre cotxes aixafats!' }
          },
          {
            question: { es: 'Cuantos tubos de escape?', en: 'How many exhaust pipes?', ca: 'Quants tubs d\'escapament?' },
            sceneSVG: '<svg viewBox="0 0 300 200"><rect x="0" y="0" width="300" height="200" fill="#ffeaa7"/><rect x="60" y="80" width="180" height="60" rx="8" fill="#3498db"/><rect x="195" y="60" width="12" height="25" rx="3" fill="#636e72"/><rect x="215" y="55" width="12" height="30" rx="3" fill="#636e72"/><circle cx="201" cy="55" r="8" fill="#b2bec3"/><circle cx="221" cy="50" r="8" fill="#b2bec3"/></svg>',
            answers: [1, 2, 3], correct: 2, fact: { es: 'Dos tubos de escape enormes!', en: 'Two big exhaust pipes!', ca: 'Dos tubs d\'escapament enormes!' }
          }
        ]
      }
    },
    {
      id: 'truck-6',
      name: { es: 'Zombie', en: 'Zombie', ca: 'Zombie' },
      gameType: 'maze',
      illustration: function () { return TruckSVG.zombie(); },
      keyFact: { es: 'Zombie es el maestro del derrape y hace donuts increibles!', en: 'Zombie is the master of drifting and does amazing donuts!', ca: 'Zombie es el mestre del derrapatge i fa donuts increibles!' },
      learnFacts: [
        { es: 'Zombie tiene dientes verdes tenebrosos y ojos locos', en: 'Zombie has creepy green teeth and wild eyes', ca: 'Zombie te dents verdes tenebroses i ulls bojos' },
        { es: 'Es increible derrapando de lado', en: 'It is amazing at drifting sideways', ca: 'Es increible derrapant de costat' },
        { es: 'El piloto hace trucos increibles', en: 'The driver does incredible tricks', ca: 'El pilot fa trucs increibles' }
      ],
      config: {
        grid: [[0,0,1,0,0,0,0],[0,1,1,0,1,1,0],[0,0,0,0,0,1,0],[1,1,0,1,0,0,0],[0,0,0,1,0,1,1],[0,1,0,0,0,0,0],[0,1,1,1,1,0,0]],
        start: { r: 0, c: 0 }, goal: { r: 6, c: 6 },
        playerEmoji: '🧟', goalEmoji: '🏆', wallColor: '#636e72',
        collectibles: [{ r: 2, c: 2, emoji: '⭐' }, { r: 3, c: 4, emoji: '🔧' }, { r: 5, c: 3, emoji: '⭐' }]
      }
    },
    {
      id: 'truck-7',
      name: { es: 'Monster Mutt Dalmatian', en: 'Monster Mutt Dalmatian', ca: 'Monster Mutt Dalmatian' },
      gameType: 'quiz',
      illustration: function () { return TruckSVG.monstermutt(); },
      keyFact: { es: 'Monster Mutt Dalmatian tiene orejas que rebotan y una cola que se mueve!', en: 'Monster Mutt Dalmatian has bouncing ears and a wagging tail!', ca: 'Monster Mutt Dalmatian te orelles que reboten i una cua que es mou!' },
      learnFacts: [
        { es: 'Parece un cachorro dalmata gigante!', en: 'It looks like a giant dalmatian puppy!', ca: 'Sembla un cadell dalmata gegant!' },
        { es: 'Sus orejas rebotan cuando conduce!', en: 'Its ears actually bounce when it drives!', ca: 'Les seves orelles reboten quan condueix!' },
        { es: 'Los dalmatas son famosos por ir en camiones de bomberos', en: 'Dalmatians are famous for riding on fire trucks', ca: 'Els dalmatas son famosos per anar en camions de bombers' }
      ],
      config: {
        questions: [
          { question: { es: 'A que animal se parece Monster Mutt?', en: 'What animal does Monster Mutt look like?', ca: 'A quin animal s\'assembla Monster Mutt?' }, answers: [{ es: 'Gato', en: 'Cat', ca: 'Gat' }, { es: 'Perro dalmata', en: 'Dalmatian dog', ca: 'Gos dalmata' }, { es: 'Caballo', en: 'Horse', ca: 'Cavall' }], correct: 1, fact: { es: 'Un camion cachorro con manchas!', en: 'A spotted puppy truck!', ca: 'Un camio cadell amb taques!' } },
          { question: { es: 'Que se mueve cuando conduce?', en: 'What moves when the truck drives?', ca: 'Que es mou quan condueix?' }, answers: [{ es: 'Sus orejas rebotan!', en: 'Its ears bounce!', ca: 'Les seves orelles reboten!' }, { es: 'Las ventanas', en: 'Its windows', ca: 'Les finestres' }, { es: 'Nada', en: 'Nothing', ca: 'Res' }], correct: 0, fact: { es: 'Orejas rebotando por todos lados!', en: 'Floppy bouncing ears!', ca: 'Orelles rebotant per tot arreu!' } },
          { question: { es: 'En que camiones van los dalmatas de verdad?', en: 'What kind of real trucks do Dalmatians ride?', ca: 'En quins camions van els dalmatas de debo?' }, answers: [{ es: 'Camiones de helados', en: 'Ice cream trucks', ca: 'Camions de gelats' }, { es: 'Camiones de bomberos', en: 'Fire trucks', ca: 'Camions de bombers' }, { es: 'Camiones de correo', en: 'Mail trucks', ca: 'Camions de correu' }], correct: 1, fact: { es: 'Los dalmatas son perros de bomberos!', en: 'Dalmatians are firehouse dogs!', ca: 'Els dalmatas son gossos de bombers!' } },
          { question: { es: 'Que patron tiene el camion?', en: 'What pattern does the truck have?', ca: 'Quin patro te el camio?' }, answers: [{ es: 'Rayas', en: 'Stripes', ca: 'Ratlles' }, { es: 'Manchas', en: 'Spots', ca: 'Taques' }, { es: 'Estrellas', en: 'Stars', ca: 'Estrelles' }], correct: 1, fact: { es: 'Manchas negras sobre blanco!', en: 'Black spots on white!', ca: 'Taques negres sobre blanc!' } },
          { question: { es: 'Que mas se mueve en el camion?', en: 'What else moves on the truck?', ca: 'Que mes es mou al camio?' }, answers: [{ es: 'La cola se mueve!', en: 'Its tail wags!', ca: 'La cua es mou!' }, { es: 'El techo se abre', en: 'The roof opens', ca: 'El sostre s\'obre' }, { es: 'Salen alas', en: 'Wings pop out', ca: 'Surten ales' }], correct: 0, fact: { es: 'Una cola moviéndose — que mono!', en: 'A wagging tail — so cute!', ca: 'Una cua movent-se — que bonic!' } }
        ]
      }
    },
    {
      id: 'truck-8',
      name: { es: 'Dragon', en: 'Dragon', ca: 'Dragon' },
      gameType: 'dragdrop',
      illustration: function () { return TruckSVG.dragon(); },
      keyFact: { es: 'Dragon lanza FUEGO DE VERDAD y tiene alas a los lados!', en: 'Dragon shoots REAL fire and has wings on the side!', ca: 'Dragon llanca FOC DE DEBO i te ales als costats!' },
      learnFacts: [
        { es: 'Dragon es uno de los monster trucks mas geniales!', en: 'Dragon is one of the coolest monster trucks ever!', ca: 'Dragon es un dels monster trucks mes genials!' },
        { es: 'Lanza fuego de verdad por la boca!', en: 'It actually shoots real fire from its mouth!', ca: 'Llanca foc de debo per la boca!' },
        { es: 'Tiene alas grandes a los lados', en: 'It has big wings on the sides', ca: 'Te ales grans als costats' }
      ],
      config: {
        pieces: [
          { id: 'body', outlineSVG: '<rect x="55" y="60" width="160" height="55" rx="8" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<rect x="5" y="10" width="50" height="30" rx="5" fill="#27ae60"/>' },
          { id: 'head', outlineSVG: '<rect x="55" y="30" width="90" height="40" rx="6" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<rect x="5" y="8" width="50" height="30" rx="5" fill="#2ecc71"/>' },
          { id: 'eye1', outlineSVG: '<circle cx="82" cy="48" r="8" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<circle cx="30" cy="25" r="12" fill="#f1c40f"/><circle cx="30" cy="25" r="5" fill="#e74c3c"/>' },
          { id: 'eye2', outlineSVG: '<circle cx="128" cy="48" r="8" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<circle cx="30" cy="25" r="12" fill="#f1c40f"/><circle cx="30" cy="25" r="5" fill="#e74c3c"/>' },
          { id: 'wing1', outlineSVG: '<path d="M60 60 Q40 30 55 25" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<path d="M30 40 Q10 10 25 5" fill="#2ecc71" stroke="none"/>' },
          { id: 'wing2', outlineSVG: '<path d="M210 60 Q230 30 215 25" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<path d="M30 40 Q50 10 35 5" fill="#2ecc71" stroke="none"/>' },
          { id: 'fire', outlineSVG: '<polygon points="215,65 245,55 215,80" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<polygon points="10,25 50,15 10,40" fill="#e74c3c"/><polygon points="10,28 45,20 10,38" fill="#f39c12"/>' },
          { id: 'wheels', outlineSVG: '<circle cx="100" cy="140" r="25" fill="none" stroke="#b2bec3" stroke-width="2" stroke-dasharray="5,5"/>', pieceSVG: '<circle cx="30" cy="25" r="20" fill="#444"/><circle cx="30" cy="25" r="8" fill="#888"/>' }
        ],
        facts: [
          { es: 'Carroceria fuerte!', en: 'Strong body!', ca: 'Carrosseria forta!' },
          { es: 'Cabeza de dragon!', en: 'Dragon head!', ca: 'Cap de draco!' },
          { es: 'Ojo de fuego!', en: 'Fiery eye!', ca: 'Ull de foc!' },
          { es: 'Otro ojo de fuego!', en: 'Another fiery eye!', ca: 'Un altre ull de foc!' },
          { es: 'Ala izquierda!', en: 'Left wing!', ca: 'Ala esquerra!' },
          { es: 'Ala derecha!', en: 'Right wing!', ca: 'Ala dreta!' },
          { es: 'Fuego de verdad!', en: 'Real fire!', ca: 'Foc de debo!' },
          { es: 'Ruedas gigantes!', en: 'Giant wheels!', ca: 'Rodes gegants!' }
        ]
      }
    },
    {
      id: 'truck-9',
      name: { es: 'Earthshaker', en: 'Earthshaker', ca: 'Earthshaker' },
      gameType: 'matching',
      illustration: function () { return TruckSVG.earthshaker(); },
      keyFact: { es: 'Earthshaker es tan pesado que el suelo tiembla cuando aterriza!', en: 'Earthshaker is so heavy that the ground shakes when it lands!', ca: 'Earthshaker es tan pesat que el terra tremola quan aterra!' },
      learnFacts: [
        { es: 'Earthshaker pesa unas 4500 kilos!', en: 'Earthshaker weighs about 10,000 pounds!', ca: 'Earthshaker pesa unes 4500 quilos!' },
        { es: 'Cuando aterriza de un salto, puedes sentir el suelo temblar!', en: 'When it lands from a jump, you can feel the ground shake!', ca: 'Quan aterra d\'un salt, pots sentir el terra tremolar!' },
        { es: 'Tiene neumaticos enormes para aplastar coches', en: 'It has massive tires for crushing cars', ca: 'Te pneumatics enormes per aixafar cotxes' }
      ],
      config: {
        gridClass: 'grid-2x5',
        pairs: [
          { id: 'weight', labelA: { es: '⚖️ 4500 kg', en: '⚖️ 10,000 lbs', ca: '⚖️ 4500 kg' }, labelB: { es: '🐘 Pesado como un elefante', en: '🐘 Heavy as elephant', ca: '🐘 Pesat com un elefant' } },
          { id: 'tires', labelA: { es: '🛞 Neumaticos de 168 cm', en: '🛞 66-inch tires', ca: '🛞 Pneumatics de 168 cm' }, labelB: { es: '📏 Casi 2 metros!', en: '📏 Nearly 6 feet!', ca: '📏 Quasi 2 metres!' } },
          { id: 'shake', labelA: { es: '🌍 La tierra tiembla!', en: '🌍 Earth shakes!', ca: '🌍 La terra tremola!' }, labelB: { es: '💥 Aterrizajes enormes!', en: '💥 Big landings!', ca: '💥 Aterratges enormes!' } },
          { id: 'engine', labelA: { es: '⚡ 1500 CV', en: '⚡ 1500 HP', ca: '⚡ 1500 CV' }, labelB: { es: '🔥 Super motor', en: '🔥 Super engine', ca: '🔥 Super motor' } },
          { id: 'jump', labelA: { es: '🦘 Saltos enormes', en: '🦘 Huge jumps', ca: '🦘 Salts enormes' }, labelB: { es: '✈️ 10 metros en el aire!', en: '✈️ 30ft in the air!', ca: '✈️ 10 metres a l\'aire!' } }
        ],
        facts: [
          { es: 'Increiblemente pesado!', en: 'So incredibly heavy!', ca: 'Increiblement pesat!' },
          { es: 'Neumaticos enormes!', en: 'Massive tires!', ca: 'Pneumatics enormes!' },
          { es: 'Siente temblar el suelo!', en: 'Feel the ground shake!', ca: 'Sent tremolar el terra!' },
          { es: 'Motor potentisimo!', en: 'Powerful engine!', ca: 'Motor potentissim!' },
          { es: 'Saltos increibles!', en: 'Amazing jumps!', ca: 'Salts increibles!' }
        ]
      }
    },
    {
      id: 'truck-10',
      name: { es: 'TODOS LOS TRUCKS', en: 'ALL TRUCKS', ca: 'TOTS ELS TRUCKS' },
      gameType: 'coloring',
      illustration: function () { return TruckSVG.stadium(); },
      keyFact: { es: 'Completaste TODOS los niveles! Eres un CAMPEON de Dinos y Trucks!', en: 'You completed ALL the levels! You are a Dino & Truck CHAMPION!', ca: 'Has completat TOTS els nivells! Ets un CAMPIO de Dinos i Trucks!' },
      learnFacts: [
        { es: 'Aprendiste sobre 10 dinosaurios increibles!', en: 'You learned about 10 amazing dinosaurs!', ca: 'Has apres sobre 10 dinosaures increibles!' },
        { es: 'Aprendiste sobre 10 monster trucks geniales!', en: 'You learned about 10 incredible monster trucks!', ca: 'Has apres sobre 10 monster trucks genials!' },
        { es: 'Es hora del gran final — colorea TODOS los trucks!', en: 'Time for the grand finale — color ALL the trucks!', ca: 'Es hora del gran final — pinta TOTS els trucks!' }
      ],
      config: {
        regionCount: 20,
        palette: ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#e84393', '#00cec9'],
        svgContent: function () {
          return '<svg viewBox="0 0 400 350" xmlns="http://www.w3.org/2000/svg">' +
            '<rect x="0" y="0" width="400" height="350" fill="#f0f4ff"/>' +
            '<rect x="0" y="240" width="400" height="110" fill="#c4a77d"/>' +
            '<ellipse cx="200" cy="240" rx="195" ry="25" fill="#8B7355"/>' +
            '<text x="200" y="30" text-anchor="middle" font-size="16" fill="#e17055" font-weight="bold" font-family="sans-serif">' + t('stadiumTitle') + '</text>' +
            '<rect class="coloring-region" data-region="t1-body" x="10" y="60" width="60" height="25" rx="4" fill="#ecf0f1"/>' +
            '<circle class="coloring-region" data-region="t1-w" cx="25" cy="95" r="10" fill="#ecf0f1"/>' +
            '<rect class="coloring-region" data-region="t2-body" x="90" y="55" width="60" height="25" rx="4" fill="#ecf0f1"/>' +
            '<circle class="coloring-region" data-region="t2-w" cx="105" cy="90" r="10" fill="#ecf0f1"/>' +
            '<rect class="coloring-region" data-region="t3-body" x="170" y="60" width="60" height="25" rx="4" fill="#ecf0f1"/>' +
            '<circle class="coloring-region" data-region="t3-w" cx="185" cy="95" r="10" fill="#ecf0f1"/>' +
            '<rect class="coloring-region" data-region="t4-body" x="250" y="55" width="60" height="25" rx="4" fill="#ecf0f1"/>' +
            '<circle class="coloring-region" data-region="t4-w" cx="265" cy="90" r="10" fill="#ecf0f1"/>' +
            '<rect class="coloring-region" data-region="t5-body" x="330" y="60" width="60" height="25" rx="4" fill="#ecf0f1"/>' +
            '<circle class="coloring-region" data-region="t5-w" cx="345" cy="95" r="10" fill="#ecf0f1"/>' +
            '<rect class="coloring-region" data-region="t6-body" x="30" y="140" width="60" height="25" rx="4" fill="#ecf0f1"/>' +
            '<circle class="coloring-region" data-region="t6-w" cx="45" cy="175" r="10" fill="#ecf0f1"/>' +
            '<rect class="coloring-region" data-region="t7-body" x="110" y="135" width="60" height="25" rx="4" fill="#ecf0f1"/>' +
            '<circle class="coloring-region" data-region="t7-w" cx="125" cy="170" r="10" fill="#ecf0f1"/>' +
            '<rect class="coloring-region" data-region="t8-body" x="190" y="140" width="60" height="25" rx="4" fill="#ecf0f1"/>' +
            '<circle class="coloring-region" data-region="t8-w" cx="205" cy="175" r="10" fill="#ecf0f1"/>' +
            '<rect class="coloring-region" data-region="t9-body" x="270" y="135" width="60" height="25" rx="4" fill="#ecf0f1"/>' +
            '<circle class="coloring-region" data-region="t9-w" cx="285" cy="170" r="10" fill="#ecf0f1"/>' +
            '<rect class="coloring-region" data-region="t10-body" x="155" y="200" width="90" height="30" rx="6" fill="#ecf0f1"/>' +
            '<circle class="coloring-region" data-region="t10-w" cx="175" cy="235" r="12" fill="#ecf0f1"/>' +
            '</svg>';
        }
      }
    }
  ]
};

