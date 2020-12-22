import React from 'react'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function entierAleatoire(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}



class TextDisplay extends React.Component {

    constructor(props) {
        super(props) // en dessous on va créer les propriétés de notre component custom Search

        this.derive = [ // je devrais déclarer certaines parties du tableau en const ?
            "ça ",
            "rit ", // derive[1] : variable this.vbAction_Emotion
            "comme ",
            "avant ", // derive[3] : variable this.advTempo
            "les ",
            "dimanches ", // derive[5] : variable this.nom
            "au ",
            "loin ", // derive[7] : variable this.advSpatial
            "les clochers ", // derive[8] : variable this.groupeNominal1
            "et ",
            "les draps ", // derive[10] : variable this.groupeNominal2
            "qui ",
            "claquent ", // derive[12] : variable this.vbAction
            "tout près ",
            "des fleurs ", // derive[14] : variable this.groupeNominal3
            "sauvages " // derive[15] : variable this.adj
          ]
        // params par défaut
        this.temps="jour",
        this.meteo="soleil",
        this.lieu="ville",
        this.vitesse="marche lente"

        this.entier=0,

        this.newline1=" ",
        this.newline2=" ",

        this.vbAction_Emotion = "rit", // x sur q ttes ces variables doivent aller ds state
        this.advTempo = "avant", // qd elles changent ns voudrons que notre component soit re-rendu ? => OUI, dc ça compte pr moi
        this.nomPlur = "dimanches", 
        this.advSpatial = "loin",
        this.groupeNominal1 = ["les","clochers"],
        this.groupeNominal2 = ["les","draps"],
        this.vbAction = "claquent",
        this.groupeNominal3 = ["des","fleurs"],
        this.adj = "sauvages"

        /*
        this.state = { // concept de STATE important (savoir s'en servir)
            vbAction_Emotion = "rit", // x sur q ttes ces variables doivent aller ds state
            advTempo = "avant", // qd elles changent ns voudrons que notre component soit re-rendu ? => OUI, dc ça compte pr moi
            nom = "dimanches", 
            advSpatial = "loin",
            groupeNominal1 = ["les","clochers"],
            groupeNominal2 = ["les","draps"],
            vbAction = "claquent",
            groupeNominal3 = ["des","fleurs"],
            adj = "sauvages",
            /*
            films: [], // initialiser notre state avec un tableau de films vide
            isLoading: false // par défaut à false : on ne veut x de barre de chargement tant qu'on ne lance pas de recherche
            */
        } 

    _SimulateData() {
      var temps = "jour"; // temps de la journée par défaut
      var heure = getRandomInt(24);
      if (heure<=5 && heure>22) temps="nuit"; // à voir si je peux faire un switch
      else if (heure>5 && heure<=7) temps="aube";
      else if (heure>7 && heure<=19) temps="jour"; // option maj L
      else temps="crepuscule";
      this.temps=temps;

      var meteo = getRandomInt(4); // probablement mettre dans le state
      if (meteo===0) meteo="soleil";
      else if (meteo===1) meteo="nuage";
      else if (meteo===2) meteo="pluie";
      else meteo="neige";
      this.meteo=meteo;

      var lieu = getRandomInt(2);
      if (lieu===0) lieu="nature";
      else lieu="ville";
      this.lieu=lieu;

      var vitesse = getRandomInt(3);
      if (vitesse===0) vitesse="marche lente";
      else if (vitesse===1) {vitesse="marche rapide"; this.newline1=" \n"}
      else {vitesse="course"; this.newline1=this.newline2=" \n"} 
      this.vitesse=vitesse;

      //La variable contient un nombre aléatoire compris entre 1 et 10
      var entier = entierAleatoire(1, 10);this.entier=entier;

      console.log(this.temps);
      console.log(this.meteo);
      console.log(this.lieu);
      console.log(this.vitesse);
      console.log(this.entier);
      }
    
    

    render() {
      this._SimulateData();

      return ( // envie de faire un tableau qui contient tout le texte, certaines cases sont variables et d'autres non
        <View style={styles.main_container}>

        <Text 
          style={styles.textinput}
          editable={true}>
          Le temps du jour : {this.temps}{"\n"} 
          La météo du jour : {this.meteo}{"\n"} 
          Le lieu : {this.lieu}{"\n"} 
          La vitesse : {this.vitesse}{"\n"} 
          {"\n\n\n\n "} 
          test : {this.entier}
        </Text>

        <Text style={styles.textinput}>
          ça {this.vbAction_Emotion} {"\n"} 
          comme {this.advTempo}{this.newline2}les {this.nomPlur}{this.newline1}au {this.advSpatial}{this.newline2}{this.groupeNominal1[0]} {this.groupeNominal1[1]}{"\n"} 
          et {this.groupeNominal2[0]} {this.groupeNominal2[1]}{this.newline2}qui {this.vbAction}{this.newline1}tout près {this.groupeNominal3[0]}{this.newline1}{this.groupeNominal3[1]} {this.adj}{"\n"} 
        </Text>

        <Text 
          style={styles.textinput}
          multiline numberOfLines={20}>
          {"\n\n\n\n "} 
          ça rit (V – action/émotion) 
          comme avant (adv tempo.) les dimanches (N), au loin (adv spatial) les clochers (art + N) 
          et les draps (art + N) qui claquent (V) tout près des fleurs (art + N) sauvages (adj)          
        </Text>
          
        </View>
      )
    }

}
  

  // <Button title='Rechercher' onPress={() => {}}/>

  export default TextDisplay

  const styles = StyleSheet.create({
    main_container: {
      flex: 1,
      marginTop: 20,
      marginRight: 5, 
      marginLeft: 5, 
      marginBottom : 5,
      paddingTop : 30,
      paddingBottom : 5,
      paddingLeft: 10,
      paddingRight: 10
      // height: 50
    },
    baseText: {
        fontWeight: 'bold'
      },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        // height: 50,
        // borderColor: '#000000',
        // borderWidth: 1,
        // paddingLeft: 5,
      }

})

