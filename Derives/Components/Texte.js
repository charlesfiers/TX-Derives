import React from 'react'
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native'
import Sound from 'react-native-sound'

import test from '../Helpers/Test1'
import Camera from './Camera'

class Texte extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      vers: "",
      endTimer: "false"
    }
    this.timer = ""
    this.index = 0
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
  }

  componentDidMount() {
    this._startLoop()
  }

  _startLoop(){
    this.setState({endTimer: "false"})
    this.timer = setInterval(()=>{
      if (this.index >= test.length) {
        this.index=0
      } else {
        this.setState({vers: test[this.index]})
        this.index++
      }
    }, 5000)
  }

  _stopLoop(){
    this.setState({endTimer: "true"})
    clearInterval(this.timer)
  }

  _displayText(){
    if (this.state.endTimer == "false") {
      return(
        <Text style={styles.textOver}>
          {this.state.vers}
        </Text>
      )
    }else{
      return(
        <Text style={styles.textOver}>
          STOPPED
        </Text>
      )
    }
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
  }
});

export default Texte
