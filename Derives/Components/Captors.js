import React, { Component } from "react"
import { StyleSheet, View, Image, Text } from "react-native"
import { round } from "mathjs"

import { accelerometer, setUpdateIntervalForType, gyroscope, SensorTypes } from "react-native-sensors"
import Geolocation from '@react-native-community/geolocation'
import ActivityRecognition from 'react-native-activity-recognition'

import { getLocWithLatLonGouv } from '../API/GeolocAPI'
import { getWeatherWithCity, getWeatherWitLatLon } from '../API/WeatherAPI'


class Captors extends React.Component {

  constructor(props) {
    super(props)

    this.gyro = 0
    this.lat = 0
    this.lon = 0

    this.state = {
      speed: "",
      city: "",
      popDensity: 0,
      weatherDescription: "",
      temperature: 0
    }
  }

  componentDidMount() {
    setUpdateIntervalForType(SensorTypes.gyroscope, 10)
    this.subscription = gyroscope.subscribe(({ x, y, z }) => {
      this.gyro += (x + y + z)
    })
    this.setState({ subscription })

    this.watchGeo = Geolocation.getCurrentPosition(position => {
      this._getLocationInfo(position)
    }, error => console.log(error))

    this.watchGeo = Geolocation.watchPosition(position => {
      this._getLocationInfo(position)
    }, error => console.log(error), { distanceFilter: 500, maximumAge: 3000 })

    this.watchActivity = ActivityRecognition.subscribe(detectedActivities => {
      const mostProbableActivity = detectedActivities.sorted[0].type
      //const mostProbableActivity = detectedActivities
      if (mostProbableActivity != this.state.speed && mostProbableActivity != "UNKNOWN") {
        this.setState({ speed : mostProbableActivity })
      }
    })
    const detectionIntervalMillis = 1000
    ActivityRecognition.start(detectionIntervalMillis)
  }

  _getLocationInfo(position){
    getLocWithLatLonGouv(position.coords.latitude, position.coords.longitude).then(data =>{
      var density = data[0].population * 100 / data[0].surface
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
      console.log(data)
    })
  }

  componentWillUnmount() {
    this.state.subscription.unsubscribe()
    ActivityRecognition.stop()
    this.watchActivity()
  }

  _displaySpeed(){
    return(
      <Text style={styles.textCaptors}> SPEED : {this.state.speed}  </Text>
    )
  }

  _displayGeoloc(){
    return(
      <View>
        <Text style={styles.textCaptors}> City : {this.state.city}  </Text>
        <Text style={styles.textCaptors}> Pop Density : {round(this.state.popDensity)}  </Text>
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

  render() {
    return (
      <View style={styles.containerCaptors}>
        {this._displaySpeed()}
        {this._displayGeoloc()}
        {this._displayWeather()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerCaptors: {
    flex: 1,
    position: 'absolute',
    bottom: '0%'
  },
  textCaptors: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 10
  }
});

export default Captors
