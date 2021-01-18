import React from 'react'
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native'

import Sound from 'react-native-sound'
import { round, abs, floor } from "mathjs"

import { setUpdateIntervalForType, gyroscope, SensorTypes } from "react-native-sensors"
import Geolocation from '@react-native-community/geolocation'
import ActivityRecognition from 'react-native-activity-recognition'

import { getLocWithLatLonGouv } from '../API/GeolocAPI'
import { getWeatherWithCity, getWeatherWitLatLon } from '../API/WeatherAPI'

import Base_de_mots from '../Helpers/WordBase'
import TexteMatin from '../Helpers/TexteMatin'
import TexteMidi from '../Helpers/TexteMidi'
import TexteSoir from '../Helpers/TexteSoir'
import TexteNuit from '../Helpers/TexteNuit'
import Camera from './Camera'

const audioFiles = {
  matin : [require("../Musics/matin_mus_1.mp3"),
           require("../Musics/matin_mus_2.mp3"),
           require("../Musics/matin_mus_3.mp3")],
  midi : [require("../Musics/midi_mus_1.mp3"),
          require("../Musics/midi_mus_2.mp3"),
          require("../Musics/midi_mus_3.mp3")]
  }

const fonts = {
  matin : "",
  midi : "",
  soir : "",
  nuit : ""
}

class Texte extends React.Component{

  constructor(props) {
    super(props)

    this.latitude = 0
    this.longitude = 0

    this.date = ""
    this.saison = ""
    this.heat = ""

    this.timer = ""
    this.index = 0

    this.soundMain = ""
    this.timerPaused = "true"

    this.text = ""
    this.font = ""

    this.state = {
      vers: ["Commencez à marcher !"],
      speed: "",
      city: "",
      populationDensity: 0,
      milieu: "",
      weatherDescription: "",
      temperature: 0,
      gyroscope: 0,
      moment:"",
      coefPolice: 1,
      coefTextSpeed: 5,
      nbLines: 4
    }

    // Il faut précharger un son pour que ça foncitonne bien
    this.soundMain = new Sound(require("../Musics/easter_egg.mp3"),
      (error, sound) => {
        if (error) {
          alert(error.message)
          return
        }else{
        }
      })
    this.soundMain.setNumberOfLoops(-1) // Lance une boucle infinie sur le son

    setUpdateIntervalForType(SensorTypes.gyroscope, 500)
    this.detectionIntervalMillis = 1000

    /* Le gyroscope n'est pas encore utilisé mais il est prêt */
    this.watchGyroscope = gyroscope.subscribe(({ x, y, z }) => {
      this.setState({ gyroscope: (abs(x) + abs(y) + abs(z)) * 10 })
    })

    // Récupère une première fois la localisation...
    this.watchGeolocation = Geolocation.getCurrentPosition(position => {
      this._getLocationInfo(position)
    })
    // ... puis surveille le changement sur la position
    this.watchGeolocation = Geolocation.watchPosition(position => {
      this._getLocationInfo(position)
    }, error => console.log("erreur chargement loc : ", error), { distanceFilter: 500, maximumAge: 10000 })

    this.watchActivity = ActivityRecognition.subscribe(detectedActivities => {
      const mostProbableActivity = detectedActivities.sorted[0].type
      const activityConfidence = detectedActivities.sorted[0].confidence
      if (mostProbableActivity != this.state.speed && mostProbableActivity != "UNKNOWN" && activityConfidence > 0/* Attention la confidence est en pourcentage sur android et sur ios c'est une note sur 3 */) {
        switch (mostProbableActivity) {
          case "STILL":
          case "STATIONARY":
          case "TILTING":
            this.setState({ speed : "stationary" })
            this.setState({ coefPolice: 1, nbLines: 4 })
            this._startTimer()
            break
          case "WALKING":
          case "ON_FOOT":
            this.setState({ speed : "walking" })
            this.setState({ coefTextSpeed: 5, coefPolice: 2, nbLines: 3 })
            this._startTimer()
            break
          case "RUNNING":
          this.setState({ speed : "running" })
            this.setState({ coefTextSpeed: 3, coefPolice: 3, nbLines: 2 })
            this._startTimer()
            break
          case "CYCLING":
          case "ON_BICYCLE":
            this.setState({ speed : "cycling" })
            this.setState({ coefTextSpeed: 1, coefPolice: 4, nbLines: 1 })
            this._startTimer()
            break
          case "AUTOMOTIVE":
          case "IN_VEHICLE":
            this.setState({ speed : "in_vehicle" })
            this.setState({ coefTextSpeed: 1, coefPolice: 4, nbLines: 1 })
            this._startTimer()
            break
          default:
            console.log("activity recognition error")

        }
      }
    })
  }


  /* =========================================================================*/
  /* =========================================================================*/


  componentDidMount() {
    this._getDateAndTime()
    this._setText()
    this._setFont()
    this._chooseSound()
    ActivityRecognition.start(this.detectionIntervalMillis)
    this._startTimer()
  }

// Cette fonction est un peu une honte mais je n'ai pas trouvé d'autre solution pour l'instant
  _interpret(sentence){
    var sentence_new = ""
    for (var i = 0; i < sentence.length; i++) {
      if (sentence.charAt(i) == "$") {
        var index = parseInt(sentence.charAt(i+2) + sentence.charAt(i+3))
        var tab = ""
        switch (sentence.charAt(i+1)) {
          case "A":
            tab = Base_de_mots.A[index]
            break
          case "G":
            tab = Base_de_mots.G[index]
            break
          case "V":
            tab = Base_de_mots.V[index]
            break
          case "N":
            tab = Base_de_mots.N[index]
            break
          default:
          sentence_new += "ERROR"
        }
        switch (sentence.charAt(i+4)) {
          case "A":
            sentence_new += tab[Math.floor((Math.random() * tab.length))]
            break
          case "G":
            if (this.state.milieu == "rural") sentence_new += tab.rural[Math.floor((Math.random() * tab.rural.length))]
            if (this.state.milieu == "urbain") sentence_new += tab.urbain[Math.floor((Math.random() * tab.urbain.length))]
            break
          case "V":
            if (this.state.speed == "stationary") sentence_new += tab.stationary[Math.floor((Math.random() * tab.stationary.length))]
            if (this.state.speed == "walking") sentence_new += tab.walking[Math.floor((Math.random() * tab.walking.length))]
            if (this.state.speed == "running") sentence_new += tab.running[Math.floor((Math.random() * tab.running.length))]
            if (this.state.speed == "cycling") sentence_new += tab.cycling[Math.floor((Math.random() * tab.cycling.length))]
            if (this.state.speed == "in_vehicle") sentence_new += tab.in_vehicle[Math.floor((Math.random() * tab.in_vehicle.length))]
            break
          case "T":
            if (this.heat == "cold") sentence_new += tab.cold[Math.floor((Math.random() * tab.cold.length))]
            if (this.heat == "sweet") sentence_new += tab.cold[Math.floor((Math.random() * tab.sweet.length))]
            if (this.heat == "hot") sentence_new += tab.cold[Math.floor((Math.random() * tab.hot.length))]
            break
          case "S":
            if (this.saison == "printemps") sentence_new += tab.printemps[Math.floor((Math.random() * tab.printemps.length))]
            if (this.saison == "été") sentence_new += tab.été[Math.floor((Math.random() * tab.été.length))]
            if (this.saison == "automne") sentence_new += tab.automne[Math.floor((Math.random() * tab.automne.length))]
            if (this.saison == "hiver") sentence_new += tab.hiver[Math.floor((Math.random() * tab.hiver.length))]
            break
          default:
          sentence_new += "ERROR"
        }
        i+=4
      }else{
        sentence_new += sentence.charAt(i)
      }
    }
    return sentence_new
  }

  _chooseSound(){
    // Il faut rajouter les sons du soir et de la nuit quand disponibles.
    var random = Math.floor((Math.random() * 3))
    var url = ""
    switch (this.state.moment) {
      case "matin":{
        url = audioFiles.matin.[random]
        break}
      case "midi":{
          url = audioFiles.midi.[random]
        break}
      case "soir":{
          url = audioFiles.matin.[random]
        break}
      case "nuit":{
          url = audioFiles.matin.[random]
        break}
      default:{
        url = require("../Musics/easter_egg.mp3")
        break}
    }
    this.soundMain = new Sound(url ,
    (error, sound) => {
      if (error) {
        alert(error.message)
        return
      }else{
        this._startMusic()
      }
    })
  }



  /* =========================================================================*/
  /*                          START AND STOP LOOPS                            */
  /* =========================================================================*/



  _startMusic(){
    this.soundMain.play((success) => {
      if (success) {
        console.log('successfully finished playing')
      } else {
        console.log('playback failed due to audio decoding errors')
      }
    })
  }

  _startTimer(){
    if (this.timerPaused == "true") {
      this.timerPaused = "false"

      this.timer = setInterval(()=>{
        if (this.index >= this.text.length) {
          this.index=0
        } else {
          this.setState({vers: ""})
          for (var i = 0; i < this.state.nbLines; i++) {
            if (this.index < this.text.length) {
              this.setState({vers: this.state.vers+"\n"+this._interpret(this.text[this.index])})
              this.index++
            }
          }
        }
      }, this.state.coefTextSpeed * 1000)
    }
  }

  _stopTimer(){
    clearInterval(this.timer)
    this.timerPaused = "true"
  }



  /* =========================================================================*/
  /*                            GET CAPTORS INFO                              */
  /* =========================================================================*/



  _getDateAndTime(){
    var d = new Date()
    this.date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
    var mois=d.getMonth()+1
    var heure=d.getHours()

    if (mois>=3 && mois<6) this.saison="printemps"
    else if (mois>=6 && mois<9) this.saison="été"
    else if (mois>=9 && mois<12) this.saison="automne"
    else this.saison="hiver"

    var moment

    switch(this.saison) {
      case "printemps": {
        if (heure<=6 && heure>20) moment="nuit" // possible faire un switch ?
        else if (heure>6 && heure<=10) moment="matin"
        else if (heure>10 && heure<=17) moment="midi" // réequilibrer les horaires si besoin pour avoir meilleure repartition entre les 4 textes
        else moment="soir"
        break}

      case "été":{
        if (heure<=5 && heure>22) moment="nuit"
        else if (heure>5 && heure<=10) moment="matin"
        else if (heure>10 && heure<=18) moment="midi"
        else moment="soir"
        break}

      case "automne":{
        if (heure<=6 && heure>20) moment="nuit"
        else if (heure>6 && heure<=10) moment="matin"
        else if (heure>10 && heure<=17) moment="midi"
        else moment="soir"
        break}

      case "hiver":{
        if (heure<=7 && heure>19) moment="nuit"
        else if (heure>7 && heure<=10) moment="matin"
        else if (heure>10 && heure<=17) moment="midi"
        else moment="soir"
        break}

      default:{
        if (heure<=5 && heure>21) moment="nuit"
        else if (heure>5 && heure<=10) moment="matin"
        else if (heure>10 && heure<=18) moment="midi"
        else moment="soir"
        break}
    }
    this.state.moment = moment
  }

  _getLocationInfo(position){
    getLocWithLatLonGouv(position.coords.latitude, position.coords.longitude).then(data =>{
      var popDensity = data[0].population * 100 / data[0].surface
      if (popDensity>=376) this.state.milieu="urbain"
      else this.state.milieu="rural"
      if (data[0].nom != this.state.city) {
        this.setState({city: data[0].nom, populationDensity: popDensity})
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
        this._getWeather()
      }
    })
  }

  _getWeather(){
    getWeatherWitLatLon(this.latitude, this.longitude).then(data => {
      this.setState({weatherDescription: data.weather[0].main, temperature: data.main.feels_like})
    })
    if (this.state.temperature < 12) {
      this.heat = "cold"
    } else {
      if (this.state.temperature > 25) {
        this.heat = "hot"
      } else {
        this.heat = "sweet"
      }
    }
  }



  /* =========================================================================*/
  /*                            SET TEXT AND FONTS                            */
  /* =========================================================================*/



  _setText(){
    switch(this.state.moment){
      case "matin":this.text=TexteMidi
        break
      case "midi":this.text=TexteMidi
        break
      case "soir":this.text=TexteMidi
        break
      case "nuit":this.text=TexteMidi
        break
      default:console.log("le temps de la journée ne peut être déterminé")
    }
  }

  _setFont(){
    switch(this.state.moment){
      case "matin":this.font=fonts.matin
        break
      case "midi":this.font=fonts.midi
        break
      case "soir":this.font=fonts.soir
        break
      case "nuit":this.font=fonts.nuit
        break
      default:console.log("le temps de la journée ne peut être déterminé")
    }
  }


  /* =========================================================================*/
  /*                      DISPLAY CAPTORS INFO AND TEXT                       */
  /* =========================================================================*/



  _displayText(){
    return(
      <View>
        <Text style={[styles.textOver, {fontSize: 20*this.state.coefPolice}]}>
          {this.state.vers}
        </Text>
      </View>
      )
    }

  _displaySpeed(){
    return(
      <View>
        <Text style={styles.textCaptors}> SPEED : {this.state.speed}  </Text>
        <Text style={styles.textCaptors}> GYRO : {this.state.gyroscope}  </Text>
      </View>
    )
  }

  _displayGeolocation(){
    return(
      <View>
        <Text style={styles.textCaptors}> City : {this.state.city}  </Text>
        <Text style={styles.textCaptors}> Pop Density : {round(this.state.populationDensity)}  Milieu : {this.state.milieu} </Text>
      </View>
    )
  }

  _displayWeather(){
    return(
      <View style={styles.textCaptors}>
        <Text style={styles.textCaptors}> Weather : {this.state.weatherDescription}  </Text>
        <Text style={styles.textCaptors}> Temperature : {this.state.temperature}°C</Text>
      </View>
    )
  }

  _displayTime(){
    return (
      <View>
        <Text style={styles.textCaptors}> Saison : {this.saison}  </Text>
        <Text style={styles.textCaptors}> Moment : {this.state.moment}  </Text>
      </View>
    )
  }


  /* =========================================================================*/
  /* =========================================================================*/


  componentWillUnmount() {
    this.watchGyroscope.unsubscribe()
    ActivityRecognition.stop()
    this.soundMain.release()
    this._stopTimer()
  }

  render(){
    return(
      <View style={styles.mainContainer}>
        <View style={styles.cameraContener}>
          <Camera/>
        </View>
        <View style={styles.textContainer}>
          {this._displayText()}
        </View>
        <View style={styles.containerCaptors}>
          {this._displayTime()}
          {this._displaySpeed()}
          {this._displayGeolocation()}
          {this._displayWeather()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 10,
    justifyContent: 'center',
  },
  cameraContener:{
    flex: 9
  },
  textContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center'
  },
  textOver: {
    fontSize: 40,
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 10
  },
  containerCaptors: {
    flex: 1,
    position: 'absolute',
    bottom: '10%'
  },
  textCaptors: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 10
  }
});

export default Texte
