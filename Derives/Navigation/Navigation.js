import { StyleSheet, Image } from 'react-native';

import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import Accueil from '../Components/Accueil'
import Texte from '../Components/Texte'

const StackNavigator = createStackNavigator({
  Search: {
    screen: Accueil,
    navigationOptions: {
      title: 'Accueil'
    }
  },
  Texte: {
    screen: Texte,
    navigationOptions: {
      title: null
      //headerShown: false
    }
  }
})


export default createAppContainer(StackNavigator)
