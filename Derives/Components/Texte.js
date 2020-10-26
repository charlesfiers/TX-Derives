import React from 'react'
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native'
import test from '../Helpers/Test1'
import Camera from './Camera'

class Texte extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      vers: "WAITING",
      endTimer: "false"
    }
  }

  componentDidMount() {
    this._startLoop()
  }

  _startLoop(){
    var i = 0
    console.log("OK1")
    timer = setInterval(()=>{
      if (i >= test.length) {
        i=0
      } else {
        console.log("OK3")
        this.setState({vers: test[i]})
        i++
      }
    }, 5000)
  }

  _stopLoop(){
    this.setState({endTimer: "true"})
    console.log(this.state.endTimer)
  }

  _displayText(){
      return(
        <Text style={styles.textOver}>
          {this.state.vers}
        </Text>
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
        <Button title="STOP" onPress={() => this._stopLoop()}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cameraContener:{
    flex: 1
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
  }
});

export default Texte
