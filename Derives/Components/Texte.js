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
          alert(error.message);
          return;
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
        this.setState({ speed : mostProbableActivity })
        this._displayText()
        switch (mostProbableActivity) {
          case "STILL":
          case "STATIONARY":
          case "TILTING":
            this.setState({ coefPolice: 1, nbLines: 4 })
            this._startTimer()
            break
          case "WALKING":
          case "ON_FOOT":
            this.setState({ coefTextSpeed: 5, coefPolice: 2, nbLines: 3 })
            this._startTimer()
            break
          case "RUNNING":
            this.setState({ coefTextSpeed: 3, coefPolice: 3, nbLines: 2 })
            this._startTimer()
            break
          case "CYCLING":
          case "ON_BICYCLE":
            this.setState({ coefTextSpeed: 1, coefPolice: 4, nbLines: 1 })
            this._startTimer()
            break
          case "AUTOMOTIVE":
          case "IN_VEHICLE":
          console.log("CAR GOES VROOM VROOM")
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

  _interpret(sentence){
    i=0
    //while (sentence.charAt(i) != null) {

    //}
    //return sentence
  }

  _chooseSound(){
    // Il faut rajouter les sons du soir et de la nuit quand disponibles.
    var random = Math.floor((Math.random() * 3))
    var url = ""
    console.log(this.state.moment)
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
            this.setState({vers: this.state.vers+"\n"+this.text[this.index]})
            this.index++
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
  }



  /* =========================================================================*/
  /*                            SET TEXT AND FONTS                            */
  /* =========================================================================*/



  _setText(){
    switch(this.state.moment){
      case "matin":this.text=TexteMatin
        break
      case "midi":this.text=TexteMidi
        break
      case "soir":this.text="test"
        break
      case "nuit":this.text="test"
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
