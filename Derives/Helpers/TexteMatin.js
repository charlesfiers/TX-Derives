// fonction qui change la dérive

export default derive_matin = [
    "Partout",
    "l’air %V1%AL%",
    "dans tes pas",
    "%GN1%GPS% %V2%AL%",
    "pousse en deux",
    "en mille",
    "et plante",
    "ses %N1%AL% d'oiseaux",
    "%N2%DATE% a ton allure",
    "Tu %V3%AL%",
    "la %N3%TEMP%",
    "Tu %V3%AL%",
    "la rosée",
    "sur %GN2%AL% des %N4%AL%",
    "et le temps",
    "%V4%VITESSE%",
    "le long des cimes %GN3%GPS%",
    "Partout",
    "le %N5%AL%",
    "levant",
    "Partout",
    "le matin",
    "en %N5%AL%",
    "dans la %N6%AL% des %N7%GPS%",
    "Le %N8%AL% %V5%VITESSE%",
    "%A1%AL% du jour",
    "devant",
    "le jour",
    "par %GN4%AL% ses",
    "qui %V6%AL%",
    "Les %N9%GPS% s’éclairent",
    "Les ombres %V7%AL%",
    "et se taisent",
    "%A2%VITESSE%",
    "la %N10%TEMP%",
    "%V8%VITESSE%",
    "%V9%AL%",
    "dans tes %N11%AL%",
    "Tu %V10%VITESSE%",
    "Tu viens"
]



derive_matin2 =[
    {
    string :"Partout ",
    variable : false
    },
    {
    string : "\n",
    variable : true,
    critère : "vitesse1"
    },
    {
    string : "l’air ",
    variable : false
    },
    {
    string : "s’ouvre ",
    variable : true,
    critère : "aleatoire",
    nb_possibilite : 4,
    champ : ["s’ouvre", "tremble", "perce", "éclate"],
    },
    {
    string : "\n",
    variable : false
    },
    {
    string : "dans tes pas",
    variable : false
    },
    {
    string : "\n",
    variable : false
    },
    {
    string : "Le chemin ",
    variable : true,
    critère : "aleatoire",
    nb_possibilite : 6,
    champ : ["Le chemin", "La terre", "Le trottoir", "La ville", "La forêt", "La mer", "La campagne"]
    },
    {
    string : "s’étend ",
    variable : true,
    critère : "aleatoire",
    nb_possibilite : 4, // pour les champs je me suis arrétée ici --------------------
    },
    {
    string : "pousse en deux, ",
    variable : false
    },
    {
    string : "\n",
    variable : true,
    critère : "vitesse1"
    },
    {
    string : "en mille",
    variable : false
    },
    {
    string : "\n",
    variable : false
    },
    {
    string : "et plante ",
    variable : false
    },
    {
    string : "\n",
    variable : true,
    critère : "vitesse1"
    },
    {
    string : "ses ",
    variable : false
    },
    {
    string : "rumeurs ",
    variable : true,
    critère : "aleatoire",
    nb_possibilite : 3,
    },
    {
    string : "d’oiseaux ",
    variable : true,
    critère : "aleatoire",
    nb_possibilite : 3,
    },
    {
    string : "\n\n",
    variable : false
    },
    {
    string : "Novembre ",
    variable : true,
    critère : "date",
    },
    {
    string : "a ton allure",
    variable : false
    },
    {
    string : "\n\n",
    variable : false
    },
    {
    string : "Tu",
    variable : false
    },
    {
    string : "endosses ",
    variable : true,
    critère : "aleatoire",
    nb_possibilite : 3,
    },
    {
    string : "\n",
    variable : true,
    critère : "vitesse2"
    },
    {
    string : "la brise ",
    variable : true,
    critère : "meteo",
    nb_possibilite : 3,
    },
    {
    string : "\n",
    variable : false
    },
    {
    string : "Tu",
    variable : false
    },
    {
    string : "endosses ",
    variable : true,
    critère : "aleatoire", // il faut que ce soit le même verbe que endosses d'avant
    nb_possibilite : 3,
    },
    {
    string : "\n",
    variable : true,
    critère : "vitesse2"
    },
    {
    string : "la rosée ",
    variable : false,
    },
    {
    string : "\n",
    variable : true,
    critère : "vitesse1"
    },
    {
    string : "sur",
    variable : false,
    },
    {
    string : "la fatigue ",
    variable : true,
    critère : "aleatoire", // il faut que ce soit le même verbe que endosses d'avant
    nb_possibilite : 3,
    },
    {
    string : "des",
    variable : false,
    },
    {
    string : "pierres ",
    variable : true,
    critère : "gps", // il faut que ce soit le même verbe que endosses d'avant
    nb_possibilite : 2,
    },
    {
    string : "\n",
    variable : false
    },
    {
    string : "et le temps ",
    variable : false
    },
    {
    string : "\n",
    variable : true,
    critère : "vitesse2"
    },
    {
    string : "battant ",
    variable : true,
    critère : "vitesse" // à mettre en place
    },
    {
    string : "\n",
    variable : true,
    critère : "vitesse1"
    },
    {
    string : "le long des cimes ",
    variable : false
    },
    {
    string : "d’acier ",
    variable : true,
    critère : "gps", // il faut que ce soit le même verbe que endosses d'avant
    nb_possibilite : 2,
    },
    {
    string : "\n",
    variable : false
    },
    {
    string : "Partout ",
    variable : false
    },
    {
    string : "\n",
    variable : true,
    critère : "vitesse1"
    },
    {
    string : "le ",
    variable : false
    },
    {
    string : "monde ",
    variable : true,
    critère : "aleatoire",
    nb_possibilite : 3,
    },
    {
    string : "\n",
    variable : true,
    critère : "vitesse2"
    },
    {
    string : "levant ",
    variable : false
    },
    {
    string : "\n",
    variable : false
    },
    {
    string : "Partout",
    variable : false
    },
    {
    string : "\n",
    variable : false
    },
    {
    string : "le matin",
    variable : false
    },
    {
    string : "\n",
    variable : true,
    critère : "vitesse2"
    },
    {
    string : "en ",
    variable : false
    },
    {
    string : "murmure ",
    variable : true,
    critère : "aleatoire",
    nb_possibilite : 2,
    },
    {
    string : "\n",
    variable : true,
    critère : "vitesse1"
    },
    {
    string : "dans la ",
    variable : false
    },
    {
    string : "rousseur ",
    variable : true,
    critère : "aleatoire",
    nb_possibilite : 2,
    },
    {
    string : "des ",
    variable : false
    },
    {
    string : "herbes ",
    variable : true,
    critère : "gps", // il faut que ce soit le même verbe que endosses d'avant
    nb_possibilite : 3,
    },
    // je me suis arrétée là ----------------------------
    {
    string : "\n\n",
    variable : false
    },
    "Le",
    "sol crépite",
    {
    string : "\n",
    variable : false
    },
    "plein",
    "du jour",
    {
    string : "\n",
    variable : false
    },
    "devant",
    {
    string : "\n",
    variable : false
    },
    "le jour",{
    string : "\n",
    variable : true,
    critère : "vitesse1"
    },
    "par",
    "les racines",
    {
    string : "\n",
    variable : true,
    critère : "vitesse2"
    },
    "qui",
    "croît",
    {
    string : "\n",
    variable : false
    },
    "Les",
    "arbres",
    "s’éclairent",
    {
    string : "\n",
    variable : false
    },
    "Les ombres",
    "tiédissent",
    {
    string : "\n",
    variable : true,
    critère : "vitesse1"
    },
    "et se taisent",
    {
    string : "\n\n",
    variable : false
    },
    "Lentement",
    {
    string : "\n",
    variable : false
    },
    "la",
    "fraîcheur",
    {
    string : "\n",
    variable : true,
    critère : "vitesse2"
    },
    "monte",
    {
    string : "\n",
    variable : false
    },
    "s’enfonce",
    {
    string : "\n",
    variable : true,
    critère : "vitesse1"
    },
    "dans tes",
    "mains",
    {
    string : "\n\n",
    variable : false
    },
    "Tu",
    "marches",
    "Tu viens"
    ]
