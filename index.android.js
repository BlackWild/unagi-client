

import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { HomeScreen } from './components/HomeScreen';
import {SendPostScreen} from './components/SendPostScreen';

const App = StackNavigator({
  Home: { screen: HomeScreen },
  SendPostScreen: { screen: SendPostScreen },
})

AppRegistry.registerComponent('unagiyooooo', () => App);
