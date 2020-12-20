// fonction qui change la dérive

export default derive_matin = [
    "Partout l’air s'ouvre",
    "dans tes pas",
    "Le chemin s’étend",
    "pousse en deux, en mille",
    "et plante ses rumeurs d’oiseaux",
    "\n",
    "Novembre a ton allure",
    "\n",
    "Tu endosses la brise",
    "Tu endosses la rosée sur la fatigue des pierres",
    "et le temps battant le long des cimes d’acier",
    "Partout le monde levant",
    "Partout",
    "le matin en murmure dans la rousseur des herbes",
    "\n",
    "Le sol crépite",
    "plein du jour",
    "devant",
    "le jour par les racines qui croît",
    "Les arbres s’éclairent",
    "Les ombres tiédissent et se taisent",
    "\n",
    "Lentement",
    "la fraîcheur monte",
    "s’enfonce dans tes mains",
    "\n",
    "Tu marches",
    "Tu viens"
]

// %R retour à la ligne optionnel 
// %V verbe
// %G groupe nominal
// %N nom
// %P participe présent
// %A adverbe

// on peut fonctionner en recherchant des regexp
// on incrémente à chaque fois un compteur pour savoir à quel verbe, quel nom on en est => savoir dans quel champ chercher



derive_matin_2_0 = [
    "Partout %R l’air %V",
    "dans tes pas",
    "%G %V",
    "pousse en deux,%R en mille",
    "et plante %R ses %N %G",
    "\n",
    "%N a ton allure",
    "\n",
    "Tu %V %R la brise",
    "Tu %V %R la rosée %R sur %G des %N",
    "et le temps %R %P %R le long des cimes %G",
    "Partout %R le %N %R levant",
    "Partout",
    "le matin %R en %N %R dans la %N des %N",
    "\n",
    "Le %N %V",
    "%A du jour",
    "devant",
    "le jour %R par %G ses %R qui %V",
    "Les %N s’éclairent",
    "Les ombres %V %R et se taisent",
    "\n",
    "%A",
    "la %N %R %V",
    "%V %R dans tes %N",
    "\n",
    "Tu %V",
    "Tu viens"
]

/*
listes = [
    V : {
        campagne : {

        },
        ville : {
            
        }
    }
]
*/

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
    
    