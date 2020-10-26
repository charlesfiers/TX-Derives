import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import Camera from './Camera'

class Accueil extends React.Component {

  _start(){
    this.props.navigation.navigate('Texte')
  }

  render(){
    return(
      <View>
        <Text>Bienvenue dans DERIVES</Text>
        <Button title='GO' onPress={() => this._start()}/>
      </View>
    )
  }
}

export default Accueil
