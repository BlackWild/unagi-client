import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import {SendPostScreen} from './components/SendPostScreen';
import {TabScreen} from './components/TabScreen';

const App = StackNavigator({
  Home: { screen: TabScreen },
  SendPostScreen: { screen: SendPostScreen },
})

AppRegistry.registerComponent('Unagi', () => App);
