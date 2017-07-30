
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {
    TabNavigator,
} from 'react-navigation';
import { HomeScreen } from './HomeScreen';
import { HotScreen } from './HotScreen';

const BasicApp = TabNavigator({
    Main: {screen:HomeScreen },
    HotScreen: {screen:HotScreen },
});
module.exports=BasicApp;