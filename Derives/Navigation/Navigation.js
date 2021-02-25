import { StyleSheet, Image } from 'react-native';

import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import Accueil from '../Components/Accueil'
import Texte from '../Components/Texte'

const StackNavigator = createStackNavigator({
  Accueil: {
    screen: Accueil,
    navigationOptions: {
      title: 'Dérives'
    }
  },
  Texte: {
    screen: Texte,
    navigationOptions: {
      title: null
      //headerShown: false (cette option peut être intéressante pour enlever le bandeau supérieure qui masque une partie de l'écran)
    }
  }
})


export default createAppContainer(StackNavigator)
