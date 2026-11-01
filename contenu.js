/* =====================================================================
   CONTENU DU PORTFOLIO — c'est le seul fichier à modifier au quotidien.
   =====================================================================

   RÈGLES DE BASE
   - Un texte bilingue s'écrit  { fr: 'Texte français', en: 'English text' }.
     Si la version anglaise manque, le français s'affiche à la place.
   - Un texte identique dans les deux langues peut s'écrire simplement 'Texte'.
   - Dans un long texte, une ligne vide (\n\n) crée un nouveau paragraphe.
   - Les apostrophes : utilise ’ (apostrophe typographique) ou écris \'
   - Chaque élément d'une liste se termine par une virgule.

   AJOUTER UNE IMAGE
   1. Dépose la photo dans le dossier  img/  (de préférence en .jpg, moins
      de 2000 px de large, idéalement sous 300 Ko).
   2. Écris son chemin dans ce fichier :  'img/ma-photo.jpg'

   AJOUTER UNE RÉALISATION
   Copie un bloc { titre: ..., avant: ..., apres: ... } dans une liste
   « projets », puis change les textes et les images.

   AJOUTER UNE SECTION (= un nouvel onglet du site)
   Copie une section entière dans la liste SECTIONS (tout en bas) :
   elle devient une page à part, avec son onglet dans la barre de menu
   si elle a un « menu ». L'ordre de la liste est l'ordre du menu.

   Les types de blocs disponibles sont décrits juste avant SECTIONS.
   ===================================================================== */


/* ---------- Informations générales ---------- */
const SITE = {
  nom: 'Alizée Famechon',
  metier: { fr: 'Restauratrice art du feu', en: 'Fire-arts conservator-restorer' },
  accroche: {
    fr: 'Conservation-restauration de la céramique et du verre. Je redonne cohérence aux objets, un fragment après l’autre.',
    en: 'Conservation-restoration of ceramics and glass. I restore coherence to objects, one fragment at a time.'
  },
  boutonAccueil: { texte: { fr: 'Voir les réalisations', en: 'See my work' }, lien: '#experience' },

  contact: {
    email: 'tookiatelier@gmail.com',
    telephone: '+33 6 14 61 42 18',
    portrait: 'img/portrait.jpg',
    liens: [
      { texte: 'Instagram : tooki.art_restoration', lien: 'https://www.instagram.com/tooki.art_restoration' },
      { texte: 'LinkedIn : alizée-famechon-tookirestoration' }
    ]
  }
};


/* ---------- Traductions des techniques et matériaux ----------
   Dans les réalisations, les techniques et les matériaux s'écrivent en
   français. Ajoute ici leur traduction anglaise quand tu en crées un nouveau. */
const TRADUCTIONS = {
  'Nettoyage': 'Cleaning',
  'Collage': 'Gluing',
  'Remontage': 'Reassembly',
  'Comblement': 'Filling',
  'Retouche': 'Inpainting',
  'Dérestauration': 'Retouch removal',
  'Kintsugi': 'Kintsugi',
  'Marquage': 'Marking',

  'Terre cuite': 'Earthenware',
  'Faïence stannifère': 'Tin-glazed earthenware',
  'Faïence fine': 'Fine earthenware',
  'Porcelaine': 'Porcelain',
  'Grès et porcelaine': 'Stoneware and porcelain',
  'Plâtre': 'Plaster',
  'Céramique': 'Ceramic',
  'Verre': 'Glass'
};


/* ---------- Curriculum vitae ----------
   « categorie » sert à afficher les expériences dans les bons onglets :
   'atelier', 'musee' ou 'kintsugi' (elle choisit aussi la couleur de la punaise).
   enCours: true ajoute le badge « en cours ».
   image: 'img/..' (facultatif) : la photo de la carte punaisée sur le tableau du CV.
   Les cartes sont reliées par le fil dans l'ordre de cette liste. */
const CV = {
  pdf: 'cv-alizee-famechon.pdf',
  poste: { fr: 'Restauratrice-conservatrice de céramique et de verre', en: 'Ceramics and glass conservator-restorer' },
  resume: {
    fr: 'Spécialisée dans les arts du feu, actuellement en Master Conservation-Restauration. Stages en ateliers privés, musées et institutions patrimoniales en France, en Belgique et aux Pays-Bas, sur la céramique, le verre et la mosaïque.',
    en: 'Specialized in the fire arts, currently completing a Master’s in Conservation-Restoration. Internships in private studios, museums and heritage institutions in France, Belgium and the Netherlands, on ceramics, glass and mosaics.'
  },

  experiences: [
    {
      date: { fr: 'Août – Décembre 2026', en: 'Aug – Dec 2026' },
      titre: { fr: 'Stage conservation-restauration', en: 'Conservation-restoration internship' },
      lieu: 'Rijksmuseum · Amsterdam, Pays-Bas',
      categorie: 'musee', enCours: true, image: 'img/rijks-marq-x0.jpg',
      missions: {
        fr: ['Restauration et recherche au sein de l’atelier de conservation céramique, pierre et verre', 'Analyses IRR et XRF d’objets de collection', 'Marquage des objets', 'Mise en place et pratique de traitements', 'Préparation d’objets pour des prêts à des expositions externes', 'Interventions de restauration dans les salles d’exposition permanente', 'Rédaction d’articles et de documentation de restauration'],
        en: ['Restoration and research in the ceramics, stone and glass conservation studio', 'IRR and XRF analysis of collection objects', 'Object marking', 'Setting up and carrying out treatments', 'Preparing objects for loan to external exhibitions', 'Restoration work in the permanent galleries', 'Writing articles and restoration documentation']
      }
    },
    {
      date: { fr: 'Juillet 2026', en: 'July 2026' },
      titre: { fr: 'Stage conservation-restauration de mosaïques', en: 'Mosaic conservation-restoration internship' },
      lieu: 'Musée et site archéologique de Saint-Romain-en-Gal · France',
      categorie: 'musee', image: 'img/srg-chantier-1.jpg',
      missions: {
        fr: ['Support : habillage des chants de panneaux en résine époxy chargée, ponçage, sur la mosaïque de Bellérophon d’Autun (environ 100 m²)', 'Surface : réintégration de tesselles, joint de chaux teinté périphérique, nettoyage final', 'Manutention : installation de panneaux sur tréteaux, retournement', 'Copie d’une mosaïque antique (18 × 18 cm) : taille, dessin et pose des tesselles, support', 'Visites : centre CREAM (Vienne), collections permanentes, fouilles en cours'],
        en: ['Support: edge-dressing of panels with filled epoxy resin and finish sanding on the Autun Bellerophon mosaic (about 100 m²)', 'Surface: reintegration of tesserae, tinted lime perimeter grout, final cleaning', 'Handling: placing panels on trestles, turning them over', 'Copy of an ancient mosaic (18 × 18 cm): cutting, drawing and laying tesserae, making the support', 'Visits: CREAM centre (Vienne), permanent collections, ongoing excavations']
      }
    },
    {
      date: { fr: 'Septembre 2025 et juin 2026', en: 'Sept 2025 and June 2026' },
      titre: { fr: 'Stage restauration', en: 'Restoration internship' },
      lieu: 'AMO Studio',
      categorie: 'kintsugi', image: 'img/k-celadon-a.jpg',
      missions: {
        fr: ['Formation au kintsugi : préparation des matériaux à base d’urushi, collage, comblement, finition métallique', 'Organisation et animation d’ateliers d’initiation au kintsugi pour des particuliers et un hôtel de luxe', 'Restauration d’objets en céramique pour des collectionneurs privés'],
        en: ['Kintsugi training: urushi-based materials, gluing, filling, metal finish', 'Organising and leading kintsugi introduction workshops for private clients and a luxury hotel', 'Restoration of ceramic objects for private collectors']
      }
    },
    {
      date: { fr: 'Juin 2025', en: 'June 2025' },
      titre: { fr: 'Intervention in situ : statuaire en plâtre', en: 'On-site work: plaster statuary' },
      lieu: 'Fondation Eugène Napoléon · chantier-école',
      categorie: 'musee', image: 'img/statue-a.jpg',
      missions: {
        fr: ['Restauration de quatre statues religieuses en plâtre', 'Chantier de restauration collectif in situ', 'Étude préalable et rapport de restauration complet'],
        en: ['Restoration of four religious plaster statues', 'Collective on-site restoration project', 'Preliminary study and full restoration report']
      }
    },
    {
      date: { fr: 'Octobre – Décembre 2024', en: 'Oct – Dec 2024' },
      titre: { fr: 'Stage restauration de céramique', en: 'Ceramics restoration internship' },
      lieu: 'Atelier Shan-Tse',
      categorie: 'atelier', image: 'img/couple-a.jpg',
      missions: {
        fr: ['Techniques de restauration de la porcelaine', 'Gestion complète d’un projet client, du diagnostic à la livraison', 'Respect du cahier des charges'],
        en: ['Porcelain restoration techniques', 'Full management of a client project, from diagnosis to delivery', 'Compliance with the project brief']
      }
    },
    {
      date: { fr: 'Juin 2024', en: 'June 2024' },
      titre: { fr: 'Stage gestion des collections', en: 'Collections management internship' },
      lieu: 'Musée Grand Curtius · Liège, Belgique',
      categorie: 'musee',
      missions: {
        fr: ['Assistance à la conservatrice du département Arts décoratifs', 'Inventaire : description, localisation, photographie, saisie dans Flora', 'Manipulation et conditionnement d’objets', 'Gestion des réserves, archivage, recherches historiques'],
        en: ['Assisting the decorative arts curator', 'Inventory: description, location, photography, data entry in Flora', 'Handling and packing objects', 'Storage management, archiving, historical research']
      }
    }
  ],

  memoire: {
    date: { fr: 'Octobre 2025 – Octobre 2027', en: 'October 2025 – October 2027' },
    titre: { fr: 'Prêt œuvres de mémoire – Mobilier national', en: 'Loan works for the thesis – Mobilier national' },
    texte: {
      fr: 'Conservation-restauration : restauration d’une paire de vases en porcelaine chinoise famille rose de l’époque Tongzhi (XIXe siècle), montés en bronze de style Louis XV.\n\nÉtude technique et scientifique : dans quelle mesure l’incorporation de charges dans des résines acryliques thermoformées permet-elle un procédé de comblement mieux adapté à la porcelaine ?',
      en: 'Conservation-restoration: restoration of a pair of Chinese famille rose porcelain vases from the Tongzhi period (19th century), with Louis XV-style bronze mounts.\n\nTechnical and scientific study: to what extent does adding fillers to thermoformed acrylic resins allow an infilling process better suited to porcelain?'
    }
  },

  formations: [
    {
      date: '2025 – 2027', ecole: 'Condé Paris',
      titre: { fr: 'Master conservation-restauration', en: 'Master’s in conservation-restoration' },
      texte: { fr: 'Formation technique et scientifique avancée : pratique de la restauration, sciences des matériaux, méthodologie de recherche, gestion de projet, mémoire et stage de fin d’études.', en: 'Advanced technical and scientific training: restoration practice, materials science, research methodology, project management, thesis and final internship.' }
    },
    {
      date: '2022 – 2025', ecole: 'Condé',
      titre: { fr: 'Licence conservation du patrimoine', en: 'Bachelor’s in heritage conservation' },
      texte: { fr: 'Spécialisation céramique et verre. Dessin d’observation, modelage, histoire de l’art, sciences appliquées, langues, restauration et conservation préventive.', en: 'Ceramics and glass specialization. Observational drawing, modelling, art history, applied sciences, languages, restoration and preventive conservation.' }
    }
  ],

  // niveau : de 1 à 5 points
  langues: [
    { nom: { fr: 'Français', en: 'French' }, detail: { fr: 'Langue maternelle', en: 'Native' }, niveau: 5 },
    { nom: { fr: 'Anglais', en: 'English' }, detail: 'C2', niveau: 5 },
    { nom: { fr: 'Italien', en: 'Italian' }, detail: 'A2', niveau: 2 },
    { nom: { fr: 'Coréen', en: 'Korean' }, detail: 'A1', niveau: 1 }
  ],
  logiciels: ['Microsoft 365', 'Suite Adobe', 'Flora', 'Axiell', 'Procreate', 'Blender']
};


/* =====================================================================
   SECTIONS DU SITE
   Chaque section : { id, menu, titre, fond, blocs: [ ... ] }
     id    : nom court sans espace ni accent (sert au lien #id)
     menu  : texte dans la barre de navigation (enlève-le pour cacher)
     fond  : 'clair', 'creme' ou 'brume' (dégradé flou pastel, comme l'accueil)

   TYPES DE BLOCS
   { type: 'texte', titre, texte, image, etiquettes }
        Paragraphes, avec une photo en arche à gauche si « image » est rempli.
   { type: 'galerie', titre, sousTitre, intro, filtres: true, projets: [...] }
        Cartes avant / après. filtres: true ajoute les filtres par technique
        et matériau. Un projet :
        { titre, materiau, techniques: [...], description,
          avant: 'img/..', apres: 'img/..',        ← curseur avant / après
          image: 'img/..',                          ← ou une seule image
          etiquettes: { fr: ['Avant', 'Après'], en: [...] },  (facultatif)
          vues: [ 'img/..', { src: 'img/..', legende: {...} } ] (facultatif) }
   { type: 'etapes', titre, intro, etapes: [ { titre, texte, image } ] }
        Pas à pas cliquable. Une étape peut avoir « image », « images: [..] »
        (plusieurs vues numérotées) ou « avant » + « apres ».
   { type: 'photos', titre, sousTitre, intro, images: [ { src, legende } ] }
        Rangée de photos qui s'agrandissent au clic.
        fond: true sur une image l'affiche sur fond coloré (pour les .png détourés).
   { type: 'experiences', categorie: 'musee' }   Cartes tirées du CV.
   { type: 'memoire' }                           Encadré du sujet de mémoire.
   { type: 'bientot', titre, texte }             Encadré « à venir ».
   { type: 'cv' }                                Frise du CV complète.
   { type: 'contact' }                           Bloc de contact.
   { type: 'onglets', onglets: [ { titre, blocs: [...] } ] }
        Onglets ; chaque onglet contient ses propres blocs.

   « ratio » (largeur ÷ hauteur, ex. 0.75) est facultatif partout :
   s'il manque, il est calculé automatiquement à partir de la photo.
   ===================================================================== */

const SECTIONS = [

  /* ----- À propos ----- */
  {
    id: 'apropos', menu: { fr: 'À propos', en: 'About' }, fond: 'clair',
    blocs: [
      {
        type: 'texte',
        titre: { fr: 'Qui suis-je ?', en: 'About me' },
        image: 'img/about.jpg',
        legendeImage: { fr: 'Alizée Famechon restaurant une statue en plâtre', en: 'Alizée Famechon restoring a plaster statue' },
        texte: {
          fr: 'Étudiante en mastère de Conservation-Restauration, je me spécialise dans la céramique et le verre avec une grande motivation et une vraie passion pour les arts du feu. Minutieuse, attentive et précise, j’aime comprendre la matière et redonner cohérence aux objets.\n\nMes stages en ateliers m’ont permis de gagner rapidement en autonomie et d’affiner mon sens du détail. Curieuse et motivée, je cherche constamment à progresser, explorer de nouvelles techniques et m’investir pleinement dans chaque projet de restauration.',
          en: 'I am a master’s student in Conservation-Restoration, specializing in ceramics and glass, driven by strong motivation and a genuine passion for ceramic and glass materials. Meticulous, attentive, and precise, I enjoy understanding materials and restoring coherence to objects.\n\nMy internships in private studios have allowed me to quickly gain autonomy and refine my attention to detail. Curious and highly motivated, I constantly seek to improve, explore new techniques, and fully commit to every restoration project.'
        },
        etiquettes: [
          { fr: 'Mastère conservation-restauration', en: 'Master’s in conservation-restoration' },
          { fr: 'Céramique', en: 'Ceramics' },
          { fr: 'Verre', en: 'Glass' }
        ]
      }
    ]
  },

  /* ----- Expérience (avec onglets) ----- */
  {
    id: 'experience', menu: { fr: 'Expérience', en: 'Experience' }, fond: 'creme',
    titre: { fr: 'Expérience', en: 'Experience' },
    blocs: [
      {
        type: 'onglets',
        onglets: [

          /* --- Onglet 1 : Atelier privé --- */
          {
            titre: { fr: 'Atelier privé', en: 'Private studio' },
            blocs: [
              { type: 'experiences', categorie: 'atelier' },
              {
                type: 'galerie', filtres: true,
                titre: { fr: 'Réalisations', en: 'Work' },
                intro: { fr: 'Glisse la poignée pour comparer l’avant et l’après. Clique sur la loupe pour voir le détail.', en: 'Drag the handle to compare before and after. Click the magnifier for details.' },
                projets: [
                  {
                    titre: { fr: 'Taureau en terre cuite', en: 'Earthenware bull' },
                    materiau: 'Terre cuite', techniques: ['Collage'],
                    description: { fr: 'Cornes recollées sur un corps en terre cuite.', en: 'Horns glued back onto an earthenware body.' },
                    avant: 'img/taureau-b.jpg', apres: 'img/taureau-a.jpg', ratio: 0.8
                  },
                  {
                    titre: { fr: 'Chien en faïence stannifère', en: 'Tin-glazed earthenware dog' },
                    materiau: 'Faïence stannifère', techniques: ['Remontage', 'Collage', 'Comblement'],
                    description: { fr: 'Remontage de nombreux fragments et comblement de la lacune du corps.', en: 'Reassembly of many fragments and infill of the loss in the body.' },
                    avant: 'img/chien-b.jpg', apres: 'img/chien-a.jpg', ratio: 0.8
                  },
                  {
                    titre: { fr: 'Groupe en porcelaine', en: 'Porcelain figure group' },
                    materiau: 'Porcelaine', techniques: ['Collage'],
                    description: { fr: 'Intervention sur les mains du groupe.', en: 'Work on the hands of the group.' },
                    avant: 'img/couple-b.jpg', apres: 'img/couple-a.jpg', ratio: 1,
                    vues: ['img/couple-x0.jpg']
                  },
                  {
                    titre: { fr: 'Assiette en porcelaine', en: 'Porcelain plate' },
                    materiau: 'Porcelaine', techniques: ['Collage', 'Retouche'],
                    description: { fr: 'Collage du fragment et retouche des lacunes.', en: 'Fragment glued back and losses inpainted.' },
                    avant: 'img/assiette-b.jpg', apres: 'img/assiette-a.jpg', ratio: 1
                  },
                  {
                    titre: { fr: 'Figure en grès et porcelaine', en: 'Stoneware and porcelain figure' },
                    materiau: 'Grès et porcelaine', techniques: ['Collage', 'Retouche'],
                    description: { fr: 'Remontage de la figure, de la main et du support en bois.', en: 'Reassembly of the figure, the hand and the wooden stand.' },
                    avant: 'img/figure-b.jpg', apres: 'img/figure-a.jpg', ratio: 0.5,
                    vues: ['img/figure-x0.jpg', 'img/figure-x1.jpg', 'img/figure-x2.jpg']
                  },
                  {
                    titre: { fr: 'Support en bois : retouche', en: 'Wooden stand: inpainting' },
                    materiau: 'Grès et porcelaine', techniques: ['Retouche'],
                    description: { fr: 'Retouche de la volute du support.', en: 'Inpainting of the scroll on the stand.' },
                    avant: 'img/volute-b.jpg', apres: 'img/volute-a.jpg', ratio: 0.8
                  },
                  {
                    titre: { fr: 'Buste en plâtre', en: 'Plaster bust' },
                    materiau: 'Plâtre', techniques: ['Collage', 'Comblement', 'Retouche'],
                    description: { fr: 'Buste fracturé : recollage des éclats, comblement et retouche.', en: 'Fractured bust: fragments glued back, infill and inpainting.' },
                    avant: 'img/buste-b.jpg', apres: 'img/buste-a.jpg', ratio: 0.75,
                    vues: ['img/buste-x0.jpg', 'img/buste-x1.jpg']
                  },
                  {
                    titre: { fr: 'Vase à décor doré', en: 'Gilt-decorated vase' },
                    materiau: 'Faïence fine', techniques: ['Collage'],
                    description: { fr: 'Vase brisé en plusieurs fragments, recollé.', en: 'Vase broken into several fragments, glued back.' },
                    avant: 'img/vase-b.jpg', apres: 'img/vase-a.jpg', ratio: 1.5
                  },
                  {
                    titre: { fr: 'Théière verte et or', en: 'Green and gold teapot' },
                    materiau: 'Céramique', techniques: ['Collage'],
                    description: { fr: 'Fragments du bord recollés.', en: 'Rim fragments glued back.' },
                    avant: 'img/theiere-b.jpg', apres: 'img/theiere-a.jpg', ratio: 1,
                    vues: ['img/theiere-x0.jpg']
                  },
                  {
                    titre: { fr: 'Théière : nettoyage', en: 'Teapot: cleaning' },
                    materiau: 'Céramique', techniques: ['Nettoyage'],
                    description: { fr: 'Nettoyage au générateur de vapeur.', en: 'Steam cleaning.' },
                    avant: 'img/theiere-net-b.jpg', apres: 'img/theiere-net-a.jpg', ratio: 1,
                    vues: ['img/theiere-net-x0.jpg']
                  },
                  {
                    titre: { fr: 'Assiette au dragon', en: 'Dragon plate' },
                    materiau: 'Céramique', techniques: ['Collage'],
                    description: { fr: 'Assiette brisée en de nombreux fragments, recollée.', en: 'Plate broken into many fragments, glued back.' },
                    avant: 'img/dragon-b.jpg', apres: 'img/dragon-a.jpg', ratio: 1
                  },
                  {
                    titre: { fr: 'Coq en céramique', en: 'Ceramic rooster' },
                    materiau: 'Céramique', techniques: ['Remontage'],
                    description: { fr: 'Remontage d’un coq brisé en plusieurs morceaux.', en: 'Reassembly of a rooster broken into several pieces.' },
                    avant: 'img/coq-b.jpg', apres: 'img/coq-a.jpg', ratio: 0.5,
                    vues: ['img/coq-x0.jpg', 'img/coq-x1.jpg', 'img/coq-x2.jpg']
                  },
                  {
                    titre: { fr: 'Soucoupe peinte', en: 'Painted saucer' },
                    materiau: 'Céramique', techniques: ['Nettoyage'],
                    description: { fr: 'Nettoyage avec un gel aqueux au pH élevé.', en: 'Cleaning with an alkaline aqueous gel.' },
                    avant: 'img/soucoupe-b.jpg', apres: 'img/soucoupe-a.jpg', ratio: 1,
                    vues: ['img/soucoupe-x0.jpg']
                  },
                  {
                    titre: { fr: 'Pièce à décor sculpté', en: 'Sculpted decorative piece' },
                    materiau: 'Céramique', techniques: ['Dérestauration'],
                    description: { fr: 'Dérestauration d’une retouche par apport de solvant.', en: 'Retouch removal by applying solvent.' },
                    avant: 'img/derest-b.jpg', apres: 'img/derest-a.jpg', ratio: 0.5,
                    vues: ['img/derest-x0.jpg', 'img/derest-x1.jpg', 'img/derest-x2.jpg', 'img/derest-x3.jpg']
                  },
                  {
                    titre: { fr: 'Fleur manquante', en: 'Missing flower' },
                    materiau: 'Céramique', techniques: ['Comblement', 'Retouche'],
                    description: { fr: 'Reconstitution d’un élément manquant par modelage et comblement : moulage en plâtre, puis retouche couleur.', en: 'Reconstruction of a missing element through modelling and infill: plaster cast, then colour inpainting.' },
                    avant: 'img/fleur-b.jpg', apres: 'img/fleur-a.jpg', ratio: 0.5,
                    etiquettes: { fr: ['Moulage plâtre', 'Retouche couleur'], en: ['Plaster cast', 'Colour inpainting'] },
                    vues: ['img/fleur-x0.jpg', 'img/fleur-x1.jpg']
                  }
                ]
              },
              {
                type: 'etapes',
                titre: { fr: 'Pas à pas : restauration du verre', en: 'Step by step: glass restoration' },
                ratio: 0.6,
                etapes: [
                  { titre: { fr: 'Collage par infiltration', en: 'Infiltration bonding' }, texte: { fr: 'Les fragments sont recollés par infiltration.', en: 'The fragments are bonded by infiltration.' }, avant: 'img/proc-g0.jpg', apres: 'img/proc-g1.jpg' },
                  { titre: { fr: 'Verre recollé', en: 'Rebonded glass' }, texte: { fr: 'Le verre recollé, avant comblement.', en: 'The rebonded glass, before filling.' }, image: 'img/proc-g2.jpg' },
                  { titre: { fr: 'Moule en silicone', en: 'Silicone mould' }, texte: { fr: 'Coulage du moule fermé en silicone.', en: 'Casting of the closed silicone mould.' }, image: 'img/proc-g3.jpg' },
                  { titre: { fr: 'Coulée de résine', en: 'Resin casting' }, texte: { fr: 'La résine est coulée par le haut du moule, puis polymérise.', en: 'The resin is poured from the top of the mould, then polymerizes.' }, image: 'img/proc-g4.jpg' },
                  { titre: { fr: 'Comblement final', en: 'Final infill' }, texte: { fr: 'Le comblement est terminé.', en: 'The infill is complete.' }, image: 'img/proc-g5.jpg' }
                ]
              }
            ]
          },

          /* --- Onglet 2 : Musée --- */
          {
            titre: { fr: 'Musée', en: 'Museum' },
            blocs: [
              { type: 'experiences', categorie: 'musee' },
              {
                type: 'galerie',
                titre: 'Rijksmuseum · Amsterdam',
                sousTitre: { fr: 'Août – décembre 2026 · Stage conservation-restauration', en: 'Aug – Dec 2026 · Conservation-restoration internship' },
                intro: { fr: 'Marquage des numéros d’inventaire sur les objets de collection. Glisse la poignée pour comparer avant et après, ou ouvre la fiche pour voir chaque photo en grand.', en: 'Marking inventory numbers on collection objects. Drag the handle to compare before and after, or open the card to see each photo full size.' },
                projets: [
                  {
                    titre: { fr: 'Théière : marquage d’inventaire', en: 'Teapot: inventory marking' },
                    materiau: 'Porcelaine', techniques: ['Marquage'],
                    description: { fr: 'Marquage des numéros d’inventaire sur une théière en porcelaine et sur son couvercle : BK-2026-17-1 et BK-2026-17-2.', en: 'Inventory numbers marked on a porcelain teapot and on its lid: BK-2026-17-1 and BK-2026-17-2.' },
                    avant: 'img/rijks-marq-b.jpg', apres: 'img/rijks-marq-a.jpg', ratio: 0.75,
                    vues: [
                      { src: 'img/rijks-marq-x0.jpg', legende: { fr: 'Avant : théière et couvercle', en: 'Before: teapot and lid' } },
                      { src: 'img/rijks-marq-x1.jpg', legende: { fr: 'Après : base et couvercle marqués', en: 'After: marked base and lid' } }
                    ]
                  }
                ]
              },
              {
                type: 'photos',
                titre: { fr: 'Musée et site archéologique de Saint-Romain-en-Gal', en: 'Saint-Romain-en-Gal museum and archaeological site' },
                sousTitre: { fr: 'Juillet 2026 · Chantier de fouille', en: 'July 2026 · Excavation site' },
                intro: { fr: 'Travail sur chantier de fouille : dégagement de béton moderne pour les fouilles archéologiques du mausolée, aide au traitement de mosaïque in situ.', en: 'Work on an excavation site: removing modern concrete for the archaeological excavation of the mausoleum, assisting with in situ mosaic treatment.' },
                images: [
                  { src: 'img/srg-chantier-1.jpg', legende: { fr: 'Dégagement de béton moderne au perforateur sur le chantier de fouille du mausolée', en: 'Removing modern concrete with a hammer drill on the mausoleum excavation site' } },
                  { src: 'img/srg-chantier-2.jpg', legende: { fr: 'Dégagement de béton moderne au burineur entre les maçonneries antiques', en: 'Breaking up modern concrete with a demolition hammer between the ancient masonry walls' } }
                ]
              },
              {
                type: 'galerie',
                titre: 'Fondation Eugène Napoléon',
                intro: { fr: 'Chantier-école : restauration in situ de quatre statues religieuses en plâtre (nettoyage, comblement réversible, retouche).', en: 'Training site: on-site restoration of four religious plaster statues (cleaning, reversible infill, inpainting).' },
                projets: [
                  {
                    titre: { fr: 'Statue en plâtre', en: 'Plaster statue' },
                    materiau: 'Plâtre', techniques: ['Nettoyage', 'Comblement', 'Retouche'],
                    description: { fr: 'Nettoyage, comblement réversible et retouche.', en: 'Cleaning, reversible infill and inpainting.' },
                    avant: 'img/statue-b.jpg', apres: 'img/statue-a.jpg', ratio: 0.75,
                    vues: ['img/statue-x0.jpg', 'img/statue-x1.jpg', 'img/statue-x2.jpg']
                  },
                  {
                    titre: { fr: 'Statue : nettoyage des pieds', en: 'Statue: cleaning the feet' },
                    materiau: 'Plâtre', techniques: ['Nettoyage'],
                    description: { fr: 'Micro-aspiration et éponge mélamine formaldéhyde.', en: 'Micro-suction and melamine formaldehyde sponge.' },
                    avant: 'img/pieds-b.jpg', apres: 'img/pieds-a.jpg', ratio: 1.5286
                  },
                  {
                    titre: { fr: 'Statue : nettoyage de la tête', en: 'Statue: cleaning the head' },
                    materiau: 'Plâtre', techniques: ['Nettoyage'],
                    description: { fr: 'Micro-aspiration et éponge mélamine formaldéhyde.', en: 'Micro-suction and melamine formaldehyde sponge.' },
                    avant: 'img/tete-b.jpg', apres: 'img/tete-a.jpg', ratio: 1
                  },
                  {
                    titre: { fr: 'Statue : comblement', en: 'Statue: infill' },
                    materiau: 'Plâtre', techniques: ['Comblement'],
                    description: { fr: 'Préparation de la surface, mise en place du moule, adhésion du comblement réversible, retouche.', en: 'Surface preparation, mould set-up, adhesion of the reversible infill, inpainting.' },
                    avant: 'img/drape-b.jpg', apres: 'img/drape-a.jpg', ratio: 1,
                    vues: ['img/drape-x0.jpg', 'img/drape-x1.jpg', 'img/drape-x2.jpg', 'img/drape-x3.jpg']
                  },
                  {
                    titre: { fr: 'Statue : retouche du drapé', en: 'Statue: inpainting the drapery' },
                    materiau: 'Plâtre', techniques: ['Retouche'],
                    description: { fr: 'Retouche d’un pli du drapé.', en: 'Inpainting of a fold in the drapery.' },
                    avant: 'img/pli-b.jpg', apres: 'img/pli-a.jpg', ratio: 0.8
                  },
                  {
                    titre: { fr: 'Statue : retouche de la tête', en: 'Statue: inpainting the head' },
                    materiau: 'Plâtre', techniques: ['Retouche'],
                    description: { fr: 'Retouche des lacunes de surface sur la tête.', en: 'Inpainting of surface losses on the head.' },
                    avant: 'img/tete-ret-b.jpg', apres: 'img/tete-ret-a.jpg', ratio: 0.8
                  }
                ]
              },
              {
                type: 'bientot',
                titre: { fr: 'Expérience en musée', en: 'Museum experience' },
                texte: { fr: 'Les photos des restaurations du Rijksmuseum, de Saint-Romain-en-Gal et du Grand Curtius viendront ici.', en: 'Photos of restorations carried out in museums will appear here.' }
              }
            ]
          },

          /* --- Onglet 3 : Mémoire --- */
          {
            titre: { fr: 'Mémoire de recherche', en: 'Thesis research' },
            blocs: [
              { type: 'memoire' },
              {
                type: 'bientot',
                titre: { fr: 'Recherches de mémoire', en: 'Thesis research' },
                texte: { fr: 'Les images de la restauration du mémoire viendront ici.', en: 'Images of the thesis restoration will appear here.' }
              }
            ]
          },

          /* --- Onglet 4 : Kintsugi --- */
          {
            titre: 'Kintsugi',
            blocs: [
              { type: 'experiences', categorie: 'kintsugi' },
              {
                type: 'etapes',
                titre: { fr: 'Pas à pas : restauration kintsugi', en: 'Step by step: kintsugi restoration' },
                intro: { fr: 'La méthode illustrée par la restauration d’un vase coréen en céladon, de l’isolation des tranches à la finition à l’or. Choisis une étape pour voir l’image.', en: 'The method, illustrated by the restoration of a Korean celadon vase, from isolating the edges to the gold finish. Pick a step to see its image.' },
                ratio: 0.75,
                etapes: [
                  { titre: { fr: 'Isolation des tranches', en: 'Edge isolation' }, texte: { fr: 'Les tranches des fragments sont isolées au blanc d’œuf.', en: 'The edges of the fragments are isolated with egg white.' }, image: 'img/k-celadon-b.jpg' },
                  { titre: { fr: 'Collage', en: 'Gluing' }, texte: { fr: 'Colle préparée avec de l’urushi et de la farine ; les fragments sont maintenus le temps du séchage.', en: 'Adhesive prepared with urushi and flour; the fragments are held in place while it cures.' }, image: 'img/k-celadon-x0.jpg' },
                  { titre: { fr: 'Comblement', en: 'Filling' }, texte: { fr: 'Poudre de tonoko mélangée à l’urushi pour combler la lacune et les joints. Trois vues : touche les numéros sur l’image.', en: 'Tonoko powder mixed with urushi to fill the loss and the joins. Three views: tap the numbers on the image.' }, images: ['img/k-celadon-c2.jpg', 'img/k-celadon-c3.jpg', 'img/k-celadon-c1.jpg'] },
                  { titre: { fr: 'Couche finale', en: 'Final layer' }, texte: { fr: 'Dernière couche de laque noire (roiro-urushi) sur les joints et le comblement. Deux faces du vase.', en: 'Final layer of black lacquer (roiro-urushi) on the joins and the fill. Two sides of the vase.' }, images: ['img/k-celadon-x1.jpg', 'img/k-celadon-x2.jpg'] },
                  { titre: { fr: 'Finition métallique', en: 'Metal finish' }, texte: { fr: 'La poudre d’or est déposée au pinceau sur la laque.', en: 'Gold powder is brushed onto the lacquer.' }, image: 'img/k-celadon-x3.jpg' },
                  { titre: { fr: 'Résultat', en: 'Result' }, texte: { fr: 'Le vase terminé. Glisse la poignée pour comparer avant et après.', en: 'The finished vase. Drag the handle to compare before and after.' }, avant: 'img/k-celadon-b.jpg', apres: 'img/k-celadon-a.jpg' }
                ]
              },
              {
                type: 'galerie',
                titre: { fr: 'Réalisations', en: 'Work' },
                projets: [
                  {
                    titre: { fr: 'Vase coréen en céladon', en: 'Korean celadon vase' },
                    materiau: 'Céramique', techniques: ['Kintsugi'],
                    description: { fr: 'Restauration au kintsugi : collage des fragments, comblement de la lacune et pose de la laque noire, puis dorure.', en: 'Kintsugi restoration: gluing the fragments, filling the loss and applying black lacquer, then gilding.' },
                    avant: 'img/k-celadon-b.jpg', apres: 'img/k-celadon-a.jpg', ratio: 0.75,
                    etiquettes: { fr: ['Avant', 'Après dorure'], en: ['Before', 'After gilding'] },
                    vues: [
                      { src: 'img/k-celadon-x0.jpg', legende: { fr: 'Collage', en: 'Gluing' } },
                      { src: 'img/k-celadon-c2.jpg', legende: { fr: 'Comblement (1/3)', en: 'Filling (1/3)' } },
                      { src: 'img/k-celadon-c3.jpg', legende: { fr: 'Comblement (2/3)', en: 'Filling (2/3)' } },
                      { src: 'img/k-celadon-c1.jpg', legende: { fr: 'Comblement (3/3)', en: 'Filling (3/3)' } },
                      { src: 'img/k-celadon-x1.jpg', legende: { fr: 'Laque noire', en: 'Black lacquer' } },
                      { src: 'img/k-celadon-x2.jpg', legende: { fr: 'Laque noire, autre face', en: 'Black lacquer, other side' } },
                      { src: 'img/k-celadon-x3.jpg', legende: { fr: 'Dorure', en: 'Gilding' } }
                    ]
                  },
                  {
                    titre: { fr: 'Assiette kintsugi', en: 'Kintsugi plate' },
                    materiau: 'Céramique', techniques: ['Kintsugi'],
                    description: { fr: 'Couche finale de roiro-urushi, puis finition à la poudre d’or.', en: 'Final layer of roiro-urushi, then gold powder finish.' },
                    avant: 'img/k-assiette-b.jpg', apres: 'img/k-assiette-a.jpg', ratio: 1,
                    etiquettes: { fr: ['Roiro-urushi', 'Poudre d’or'], en: ['Roiro-urushi', 'Gold powder'] },
                    vues: ['img/k-assiette-x0.jpg', 'img/k-assiette-x1.jpg']
                  },
                  {
                    titre: { fr: 'Vase kintsugi', en: 'Kintsugi vase' },
                    materiau: 'Céramique', techniques: ['Kintsugi'],
                    description: { fr: 'Collage à l’urushi et à la farine, puis comblement à la poudre de tonoko et à l’urushi.', en: 'Gluing with urushi and flour, then tonoko powder and urushi filling.' },
                    avant: 'img/k-vase-b.jpg', apres: 'img/k-vase-a.jpg', ratio: 0.75,
                    etiquettes: { fr: ['Collage', 'Comblement'], en: ['Gluing', 'Filling'] },
                    vues: ['img/k-vase-x0.jpg', 'img/k-vase-x1.jpg']
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  /* ----- CV ----- */
  {
    id: 'cv', menu: 'CV', fond: 'clair',
    titre: { fr: 'Curriculum vitae', en: 'Curriculum vitae' },
    blocs: [{ type: 'cv' }]
  },

  /* ----- Modelage ----- */
  {
    id: 'modelage', menu: { fr: 'Modelage', en: 'Modelling' }, fond: 'creme',
    titre: { fr: 'Modelage', en: 'Modelling' },
    blocs: [
      {
        type: 'photos',
        images: [
          { src: 'img/mod-hugo.jpg', legende: { fr: 'Buste modelé en terre', en: 'Clay bust' } },
          { src: 'img/mod-ours.jpg', legende: { fr: 'Ours modelés en terre', en: 'Clay bears' } },
          { src: 'img/mod-relief.jpg', legende: { fr: 'Bas-relief', en: 'Relief' } },
          { src: 'img/mod-torse.png', legende: { fr: 'Torse en plâtre', en: 'Plaster torso' }, fond: true }
        ]
      }
    ]
  },

  /* ----- Contact ----- */
  {
    id: 'contact', menu: 'Contact', fond: 'brume',
    blocs: [{ type: 'contact' }]
  }
];
