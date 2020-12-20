import React from 'react'
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native'

import Sound from 'react-native-sound'
import { round, abs } from "mathjs"

import { accelerometer, setUpdateIntervalForType, gyroscope, SensorTypes } from "react-native-sensors"
import Geolocation from '@react-native-community/geolocation'
import ActivityRecognition from 'react-native-activity-recognition'

import { getLocWithLatLonGouv } from '../API/GeolocAPI'
import { getWeatherWithCity, getWeatherWitLatLon } from '../API/WeatherAPI'

import test from '../Helpers/Test1'
import texteMatin from '../Helpers/TexteMatin'
import texteMidi from '../Helpers/TexteMidi'
import Camera from './Camera'

class Texte extends React.Component{

  constructor(props) {
    super(props)

    this.lat = 0
    this.lon = 0

    this.date = ""
    this.saison=""

    this.timer = ""
    this.index = 0

    this.musicPaused = "true"
    this.timerPaused = "true"

    this.state = {
      vers: "Commencez à marcher !",
      speed: "",
      city: "",
      popDensity: 0,
      milieu:"",
      weatherDescription: "",
      temperature: 0,
      gyro: 0,
      temps:"",
      coefPolice: 1,
      coefTextSpeed: 5,
      nbLines: 4
    }


    Sound.setCategory('Playback')
    this.sound1 = new Sound('son_test2.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error)
        return
      } else {
        this.sound1.setNumberOfLoops(-1)
        this.sound1.play((success) => {
          if (success) {
            console.log('successfully finished playing');
            this.sound1.release()
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        })
      }
    })

    setUpdateIntervalForType(SensorTypes.gyroscope, 500)
    this.watchGyro = gyroscope.subscribe(({ x, y, z }) => {
      this.setState({ gyro: (abs(x) + abs(y) + abs(z)) * 10 })
    })

    this.watchGeo = Geolocation.getCurrentPosition(position => {
      this._getLocationInfo(position)
    }, error => console.log(error))

    this.watchActivity = ActivityRecognition.subscribe(detectedActivities => {
      const mostProbableActivity = detectedActivities.sorted[0].type
      //const mostProbableActivity = detectedActivities
      if (mostProbableActivity != this.state.speed && mostProbableActivity != "UNKNOWN") {
        this.setState({ speed : mostProbableActivity })
        switch (mostProbableActivity) {
          case "STILL":
          case "STATIONARY":
          case "TILTING":
            this._stopMusic()
            this._stopTimer()
            this.setState({ coefPolice: 1, nbLines: 4 })
            break
          case "WALKING":
          case "ON_FOOT":
            this.setState({ coefTextSpeed: 5, coefPolice: 1.5, nbLines: 3 })
            this._startMusic()
            this._startTimer()
            break
          case "RUNNING":
            this.setState({ coefTextSpeed: 3, coefPolice: 2, nbLines: 2 })
            this._startMusic()
            this._startTimer()
            break
          case "CYCLING":
          case "ON_BICYCLE":
            this.setState({ coefTextSpeed: 1, coefPolice: 2.5, nbLines: 1 })
            this._startMusic()
            this._startTimer()
            break
          case "AUTOMOTIVE":
          case "IN_VEHICLE":
          console.log("VROOM VROOM CAR GOES BRRR")
          this._startMusic()
          this._startTimer()
            break
          default:
            console.log("activity recognition error")

        }
      }
    })
    this.detectionIntervalMillis = 2000
  }

  componentDidMount() {
    this.watchGeo = Geolocation.watchPosition(position => {
      this._getLocationInfo(position)
    }, error => console.log(error), { distanceFilter: 500, maximumAge: 3000 })

    this._startMusic()
    this._startTimer()
    ActivityRecognition.start(this.detectionIntervalMillis)
  }

  _startMusic(){
    if (this.musicPaused == "true") {
      this.musicPaused = "false"

      this.sound1.play((success) => {
        if (success) {
          console.log('successfully finished playing');
          this.sound1.release()
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      })
    }
  }

  _startTimer(){
    var text;
    switch(this.state.temps){
      case "matin":text=texteMatin; break
      case "midi":text=texteMidi; break
      case "soir":text=texteMatin; break
      case "nuit":text=test; break
      default:console.log("le temps de la journée ne peut être déterminé")
    }
    

    if (this.timerPaused == "true") {
      this.timerPaused = "false"

      this.timer = setInterval(()=>{
        if (this.index >= text.length) {
          this.index=0
        } else {
          this.setState({vers: text[this.index]})
          this.index++
        }
      }, this.state.coefTextSpeed * 1000)
    }
  }

  _stopMusic(){
    this.sound1.pause()
    this.musicPaused = "true"
  }

  _stopTimer(){
    clearInterval(this.timer)
    this.timerPaused = "true"
  }

  _getLocationInfo(position){
    getLocWithLatLonGouv(position.coords.latitude, position.coords.longitude).then(data =>{
      var density = data[0].population * 100 / data[0].surface
      if (density>=376) this.state.milieu="urbain";
      else this.state.milieu="rural";
      if (data[0].nom != this.state.city) {
        this.setState({city: data[0].nom, popDensity: density})
        this.lat = position.coords.latitude
        this.lon = position.coords.longitude
        this._getWeather()
      }
    })
  }

  _getWeather(){
    //getWeatherWithCity(this.state.city).then(data =>{
      //this.setState({weatherDescription: data.current.weather_descriptions, temperature: data.current.temperature})
    //})
    getWeatherWitLatLon(this.lat, this.lon).then(data => {
      this.setState({weatherDescription: data.weather[0].main, temperature: data.main.feels_like})
      //console.log(data)
    })
  }

  _displayText(){
    switch (this.state.nbLines) {
      case 4:
        return(
          <View>
            <Text style={[styles.textOver, {fontSize: 20*this.state.coefPolice}]}>
              {this.state.vers}
            </Text>
            <Text style={[styles.textOver, {fontSize: 20*this.state.coefPolice}]}>
              {this.state.vers}
            </Text>
            <Text style={[styles.textOver, {fontSize: 20*this.state.coefPolice}]}>
              {this.state.vers}
            </Text>
            <Text style={[styles.textOver, {fontSize: 20*this.state.coefPolice}]}>
              {this.state.vers}
            </Text>
          </View>
        )
        break
      case 3:
        return(
          <View>
            <Text style={[styles.textOver, {fontSize: 20*this.state.coefPolice}]}>
              {this.state.vers}
            </Text>
            <Text style={[styles.textOver, {fontSize: 20*this.state.coefPolice}]}>
              {this.state.vers}
            </Text>
            <Text style={[styles.textOver, {fontSize: 20*this.state.coefPolice}]}>
              {this.state.vers}
            </Text>
          </View>
          )
          break
        case 2:
          return(
            <View>
              <Text style={[styles.textOver, {fontSize: 20*this.state.coefPolice}]}>
                {this.state.vers}
              </Text>
              <Text style={[styles.textOver, {fontSize: 20*this.state.coefPolice}]}>
                {this.state.vers}
              </Text>
            </View>
            )
            break
          case 1:
            return(
              <View>
                <Text style={[styles.textOver, {fontSize: 20*this.state.coefPolice}]}>
                  {this.state.vers}
                </Text>
              </View>
              )
              break
      default:
        console.log("erreur nb vers affichés")
    }

  }

  _displaySpeed(){
    return(
      <View>
        <Text style={styles.textCaptors}> SPEED : {this.state.speed}  </Text>
        <Text style={styles.textCaptors}> GYRO : {this.state.gyro}  </Text>
      </View>
    )
  }

  _displayGeoloc(){
    return(
      <View>
        <Text style={styles.textCaptors}> City : {this.state.city}  </Text>
        <Text style={styles.textCaptors}> Pop Density : {round(this.state.popDensity)}  Milieu : {this.state.milieu} </Text>
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

  componentWillUnmount() {
    this.watchGyro.unsubscribe()
    ActivityRecognition.stop()
    this.watchActivity()
    this.sound1.stop()
  }

  _getTimeData(){
    var d = new Date();
    this.date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    console.log(this.date);
    var mois=d.getMonth()+1;
    var heure=d.getHours();

    if (mois>=3 && mois<6) this.saison="printemps";
    else if (mois>=6 && mois<9) this.saison="été";
    else if (mois>=9 && mois<12) this.saison="automne";
    else this.saison="hiver";

    var temps;

    switch(this.saison) {
      case "printemps": {
        if (heure<=6 && heure>20) temps="nuit"; // possible faire un switch ?
        else if (heure>6 && heure<=10) temps="matin";
        else if (heure>10 && heure<=17) temps="midi"; // réequilibrer les horaires si besoin pour avoir meilleure repartition entre les 4 textes
        else temps="soir";
        break;}

      case "été":{
        if (heure<=5 && heure>22) temps="nuit"; 
        else if (heure>5 && heure<=10) temps="matin";
        else if (heure>10 && heure<=18) temps="midi"; 
        else temps="soir";
        break;}

      case "automne":{
        if (heure<=6 && heure>20) temps="nuit"; 
        else if (heure>6 && heure<=10) temps="matin";
        else if (heure>10 && heure<=17) temps="midi"; 
        else temps="soir";
        break;}
        
      case "hiver":{
        if (heure<=7 && heure>19) temps="nuit"; 
        else if (heure>7 && heure<=10) temps="matin";
        else if (heure>10 && heure<=17) temps="midi"; 
        else temps="soir";
        break;}

      default:{
        if (heure<=5 && heure>21) temps="nuit"; 
        else if (heure>5 && heure<=10) temps="matin";
        else if (heure>10 && heure<=18) temps="midi"; 
        else temps="soir";
        break;}
    }
    this.state.temps=temps;
  }

  _displayTime(){
    this._getTimeData();
    return (
      <View>
        <Text style={styles.textCaptors}> Saison : {this.saison}  </Text>
        <Text style={styles.textCaptors}> Temps : {this.state.temps}  </Text>
      </View>
    )
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
          {this._displayGeoloc()}
          {this._displayWeather()}
        </View>
        <View style={styles.buttonContainer}>
          <Button title="STOP" onPress={() => this._stopLoop()}/>
          <Button title="START" onPress={() => this._startLoop()}/>
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
