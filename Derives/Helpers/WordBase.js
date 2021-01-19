/* === Helpers contenant la base de mots, en format json === */

export default base_de_mots = {
  V : [
    ["s'ouvre", "tremble", "perce", "éclate", "s'étend", "gronde", "s'étire", "s'avance"],
    ["endosses", "chausses", "franchis"],
    {stationary : ["flâneur"], walking : ["battant"], running : ["chahutant"], cycling : ["dévalant"], in_vehicle : ["floutant"]},
    {stationary : ["crépite"], walking : ["remue", "bouge"], running : ["s'ébroue"], cycling : ["défile"], in_vehicle : ["disparaît"]},
    ["croît", "s'entête", "persiste"],
    ["tiédissent", "sourient", "valsent"],
    {stationary : ["monte"], walking : ["grimpe", "te rencontre"], running : ["se soulève", "t'affleure"], cycling : ["te fouette"], in_vehicle : ["te transperce"]},
    ["s'enfonce", "résonne", "exulte"],
    {stationary : ["es immobile"], walking : ["marches", "avances"], running : ["cours", "t'élances"], cycling : ["roules"], in_vehicle : ["fuses"]},
    {stationary : ["t'apprend"], walking : ["te ressemble"], running : ["te sait"], cycling : ["te devinne"], in_vehicle : ["t'oublie"]},
    ["vendange", "emprunte", "amasse"], //10
    {stationary : ["fredonne"], walking : ["scande"], running : ["clame"], cycling : ["crie"], in_vehicle : ["hurle"]},
    ["s'éteint", "s'abolit", "s'oublie", "se range"],
    ["sèchent", "endurent", "soutiennent"],
    ["s'augmente", "pèse", "se peuple", "s'ouvre"],
    ["s'abritent", "veillent", "grandissent", "résistent"],
    ["répand", "tisse", "écume"],
    ["se penche", "coule", "baille"],
    ["s'empochent", "se récoltent", "se ramassent"],
    ["perdurent", "fécondent", "s'étendent"],
    {stationary : ["longes"], walking : ["prends"], running : ["avales"], cycling : ["traces"], in_vehicle : ["souffles"]}, //20
    {stationary : ["te retourner"], walking : ["faiblir"], running : ["ralentir"], cycling : ["t'arrêter"], in_vehicle : ["freiner"]},
    ["s'imprime", "se retient", "se recompose"],
    ["emprunte", "achemine", "borde", "suit"],
    ["pèse", "sème", "reste"],
    {stationary : ["veille"], walking : ["surveille"], running : ["s'acharne"], cycling : ["te suit"], in_vehicle : ["te poursuit"]},
    ["s'est dressé", "a dansé", "s'est usé"],
    ["raconte", "emporte", "cultive", "rejoue"],
    {stationary : ["frayes"], walking : ["prolonges"], running : ["aventures"], cycling : ["fuses"], in_vehicle : ["roules"]},
    ["amorce", "ouvre", "lève"],

  ],
  N : [
    {rural : ["e chemin", "a terre", "a campagne"], urbain : ["a ville", "a route", "e trottoir", "a chaussée"]},
    ["rumeurs", "nuées", "légendes", "histoires", "silences", "traces", "miettes"],
    {printemps : ["le printemps"], automne : ["l'automne"], hiver : ["l'hiver"], été : ["l'été"]},
    {cold : ["fraîcheur"], sweet : ["douceur"], hot : ["chaleur"]}, // à modifier selon weather_description
    ["la fatigue", "le silence", "le sommeil"],
    {rural : ["bêtes"], urbain : ["pierres"]},
    ["monde", "chant", "pays"],
    ["murmure", "chantier"],
    {rural : ["herbes"], urbain : ["rues"]},
    ["sol", "ciel"],
    ["les racines", "la graine"], //10
    {rural : ["arbres", "champs"], urbain : ["toits", "ponts", "grues"]},
    ["mains", "jambes"],
    {printemps : ["de fraises", "de cerises", "de prunes", "de pêches", "d'abricots", "d'avocats", "de bananes"], automne : ["de pommes", "de poires", "de coings"], hiver : ["d'oranges", "de clémentines", "de mandarines"], été : ["de melons", "de pastèques", "de framboises", "de figues"]},
    {printemps : ["de jonquilles", "de muguet", "de jacinthes"], automne : ["de camélias", "de sauge", "de feuilles mortes", "de mousse"], hiver : ["de perce-neige", "d'iris", "de pensées"], été : ["de dahlias", "de roses", "de geraniums", "d'œillets", "de pétunias"]},
    {stationary : ["secondes"], walking : ["pas"], running : ["rues"], cycling : ["rues"], in_vehicle : ["villes"]},
    ["visages", "noms", "traits"],
    {stationary : ["L'errance"], walking : ["Le souvenir"], running : ["La guerre"], cycling : ["La course"], in_vehicle : ["Le voyage"]},
    ["taille", "mesure", "hauteur"],
    ["de pays", "du midi"],
    ["mondes", "temps"], //20
    ["statues", "murs", "portes", "marelles"],
    ["Les yeux", "Le corps"],
    ["avenue", "ligne de fuite", "contre-allée"],
    {stationary : ["tes semelles"], walking : ["tes talons"], running : ["ton souffle"], cycling : ["ton sillage"], in_vehicle : ["tes roues"]},
    ["gyrophares", "coeurs", "néons", "odeurs", "clochers"],
    ["'insolence", "'aplomb", "a vaillance", "a joie"],
    ["torches", "proues", "métamorphoses"],

  ],
  G : [
    {rural : ["de blé"], urbain : ["d'acier"]},
    ["La mère s'apaise", "Le père se tait"],
    ["dans ton dos", "sur tes épaules", "à l'abreuvoir"],
    ["e secoue la nappe", "'attardent les rires", "'allongent les jeux"],
    ["après le vin du dimanche", "devant la fin du feu"],
    ["aux pieds", "au seuil"],
    {printemps : ["sous les bourgeons"], automne : ["sous les feuilles mortes"], hiver : ["sous le gel"], été : ["sous le soleil"]},
    ["Tes âges ont", "Tes pas ont", "Dans"],
  ],
  A : [
    ["rousseur", "clameur"],
    ["plein", "ébahi", "au bord"],
    {stationary : ["très lentement"], walking : ["lentement"], running : ["soudainement"], cycling : ["brusquement"], in_vehicle : ["succintement"]},
    {stationary : ["silencieusement"], walking : ["bruissant"], running : ["rugissant"], cycling : ["détalant"], in_vehicle : ["vrombissant"]},
  ],
}
