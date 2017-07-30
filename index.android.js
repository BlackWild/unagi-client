import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import {SendPostScreen} from './components/SendPostScreen';
BasicApp = require('./components/TabScreen');

const App = StackNavigator({
  Home: { screen: BasicApp },
  SendPostScreen: { screen: SendPostScreen },
})

AppRegistry.registerComponent('Unagi', () => App);
