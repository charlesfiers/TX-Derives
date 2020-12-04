import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import Camera from './Camera'

class Accueil extends React.Component {

  _start(){
    this.props.navigation.navigate('Texte')
  }

  _captorsView(){
    this.props.navigation.navigate('Captors')
  }

  render(){
    return(
      <View>
        <Text>Bienvenue dans DERIVES</Text>
        <Button title='GO' onPress={() => this._start()}/>
        <Button title='Capteurs' onPress={() => this._captorsView()}/>
      </View>
    )
  }
}

export default Accueil
