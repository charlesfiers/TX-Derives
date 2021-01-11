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
    this.musicPaused = "true"
    this.timerPaused = "true"

    this.text = ""

    this.state = {
      vers: ["Commencez à marcher !"],
      speed: "",
      city: "",
      populationDensity: 0,
      milieu: "",
      weatherDescription: "",
      temperature: 0,
      gyroscope: 0,
      temps:"",
      coefPolice: 1,
      coefTextSpeed: 5,
      nbLines: 4
    }

    Sound.setCategory('Playback')
    this.soundMain = new Sound()
    this.soundMain.setNumberOfLoops(-1)

    setUpdateIntervalForType(SensorTypes.gyroscope, 500)
    this.detectionIntervalMillis = 1000

    /* Le gyroscope n'est pas encore utilisé mais il est prêt */
    this.watchGyroscope = gyroscope.subscribe(({ x, y, z }) => {
      this.setState({ gyroscope: (abs(x) + abs(y) + abs(z)) * 10 })
    })

    this.watchGeolocation = Geolocation.getCurrentPosition(position => {
      this._getLocationInfo(position)
    })

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
            this._stopMusic()
            break
          case "WALKING":
          case "ON_FOOT":
            this.setState({ coefTextSpeed: 5, coefPolice: 2, nbLines: 3 })
            this._startTimer()
            this._startMusic()
            break
          case "RUNNING":
            this.setState({ coefTextSpeed: 3, coefPolice: 3, nbLines: 2 })
            this._startTimer()
            this._startMusic()
            break
          case "CYCLING":
          case "ON_BICYCLE":
            this.setState({ coefTextSpeed: 1, coefPolice: 4, nbLines: 1 })
            this._startTimer()
            this._startMusic()
            break
          case "AUTOMOTIVE":
          case "IN_VEHICLE":
          console.log("VROOM VROOM CAR GOES BRRR")
          this._startTimer()
          this._startMusic()
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
    this._startTimer()
    this._chooseSound()
    this._startMusic()
    ActivityRecognition.start(this.detectionIntervalMillis)
  }

  _interpret(sentence){
    i=0
    //while (sentence.charAt(i) != null) {

    //}
    //return sentence
  }



  /* =========================================================================*/
  /*                          START AND STOP LOOPS                            */
  /* =========================================================================*/



  _chooseSound(random, temps){
    // Il faudrait trouver un moyen de changer cette fontionc en réussisant à concaténer
    // des variables et du texte dans la fonction require(), je n'ai pas réussi.
    // Il faut aussi rajouter les sons du soir et de la nuit quand disponibles.
    switch (temps) {
      case "matin":{
        switch (random) {
          case 1:{
            return require("../Musics/1_matin_Mus.mp3")
            break}
          case 2:{
            return require("../Musics/2_matin_Mus.mp3")
            break}
          case 3:{
            return require("../Musics/3_matin_Mus.mp3")
            break}
          default:{
            return require("../Musics/easter_egg.mp3")
            break}
        }
        break}
      case "midi":{
        switch (random) {
          case 1:{
            return require("../Musics/1_midi_Mus.mp3")
            break}
          case 2:{
            return require("../Musics/2_midi_Mus.mp3")
            break}
          case 3:{
            return require("../Musics/3_midi_Mus.mp3")
            break}
          default:{
            return require("../Musics/easter_egg.mp3")
            break}
        }
        break}
      case "soir":{
        switch (random) {
          case 1:{
            return require("../Musics/1_matin_Mus.mp3")
            break}
          case 2:{
            return require("../Musics/2_matin_Mus.mp3")
            break}
          case 3:{
            return require("../Musics/3_matin_Mus.mp3")
            break}
          default:{
            return require("../Musics/easter_egg.mp3")
            break}
          }
        break}
      case "nuit":{
        switch (random) {
          case 1:{
            return require("../Musics/1_matin_Mus.mp3")
            break}
          case 2:{
            return require("../Musics/2_matin_Mus.mp3")
            break}
          case 3:{
            return require("../Musics/3_matin_Mus.mp3")
            break}
          default:{
            return require("../Musics/easter_egg.mp3")
            break}
          }
        break}
      default:{
        return require("../Musics/easter_egg.mp3")
        break}
    }
  }

  _startMusic(){
    if (this.soundMain._duration == -1) {
      console.log("gnnnn")
      var random = Math.floor((Math.random() * 3) + 1)
      console.log(random)
      this.soundMain = new Sound(this._chooseSound(random, this.state.temps),
      (error, sound) => {
        if (error) {
          alert(error.message);
          return;
        }
      })
    }

    if (this.musicPaused == "true") {
      this.musicPaused = "false"

      this.soundMain.play((success) => {
        if (success) {
          console.log('successfully finished playing')
          this.soundMain.release()
        } else {
          console.log('playback failed due to audio decoding errors')
        }
      })
    }
  }

  _startTimer(){
    this._getDateAndTime()
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

  _stopMusic(){
    this.soundMain.pause()
    this.musicPaused = "true"
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

    var temps

    switch(this.saison) {
      case "printemps": {
        if (heure<=6 && heure>20) temps="nuit" // possible faire un switch ?
        else if (heure>6 && heure<=10) temps="matin"
        else if (heure>10 && heure<=17) temps="midi" // réequilibrer les horaires si besoin pour avoir meilleure repartition entre les 4 textes
        else temps="soir"
        break}

      case "été":{
        if (heure<=5 && heure>22) temps="nuit"
        else if (heure>5 && heure<=10) temps="matin"
        else if (heure>10 && heure<=18) temps="midi"
        else temps="soir"
        break}

      case "automne":{
        if (heure<=6 && heure>20) temps="nuit"
        else if (heure>6 && heure<=10) temps="matin"
        else if (heure>10 && heure<=17) temps="midi"
        else temps="soir"
        break}

      case "hiver":{
        if (heure<=7 && heure>19) temps="nuit"
        else if (heure>7 && heure<=10) temps="matin"
        else if (heure>10 && heure<=17) temps="midi"
        else temps="soir"
        break}

      default:{
        if (heure<=5 && heure>21) temps="nuit"
        else if (heure>5 && heure<=10) temps="matin"
        else if (heure>10 && heure<=18) temps="midi"
        else temps="soir"
        break}
    }
    this.state.temps = temps

    switch(this.state.temps){
      case "matin":this.text=TexteMatin
        break
      case "midi":this.text=TexteMatin
        break
      case "soir":this.text=TexteMatin
        break
      case "nuit":this.text="test"
        break
      default:console.log("le temps de la journée ne peut être déterminé")
    }
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
        <Text style={styles.textCaptors}> Temps : {this.state.temps}  </Text>
      </View>
    )
  }


  /* =========================================================================*/
  /* =========================================================================*/


  componentWillUnmount() {
    this.watchGyroscope.unsubscribe()
    ActivityRecognition.stop()
    this._stopMusic()
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
        <View style={styles.buttonContainer}>
          <Button title="STOP" onPress={() => {this._stopTimer(); this._stopMusic()}}/>
          <Button title="START" onPress={() => {this._startTimer(); this._startMusic()}}/>
        </View>
      </View>
    )
    //Les boutons START et STOP peuvent être retirés à l'avenir, ils m'étaient juste utiles pour tester.
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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
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
    bottom: '15%'
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
