import { StyleSheet, Image } from 'react-native';

import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import Accueil from '../Components/Accueil'
import Texte from '../Components/Texte'
import Captors from '../Components/Captors'

const StackNavigator = createStackNavigator({
  Accueil: {
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
  },
  Captors: {
    screen: Captors,
    navigationOptions: {
      title: 'Capteurs'
    }
  }
})


export default createAppContainer(StackNavigator)
