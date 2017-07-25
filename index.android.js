

import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { HomeScreen } from './components/HomeScreen';

const App = StackNavigator({
  Home: { screen: HomeScreen },
  // Profile: { screen: HomeScreen },
})

AppRegistry.registerComponent('unagiyooooo', () => App);
