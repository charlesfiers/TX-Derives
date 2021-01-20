import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import Camera from './Camera'

const description = "Vous allez vivre une expérience poétique – visuelle et sonore – en marchant.\nSelon votre vitesse, mais aussi le moment de la journée, la saison, la température, l'environnement, votre expérience ne sera pas la même..."

class Accueil extends React.Component {

  _start(){
    this.props.navigation.navigate('Texte')
  }


  render(){
    return(
      <View style={styles.mainContainer}>
        <Text style={styles.welcomeText}>
          {description}
        </Text>
        <Button style={styles.buttonGo} title='GO' onPress={() => this._start()}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 50,
  },
  buttonGo: {
    width: 50,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFE7EE'
  }
})

export default Accueil
