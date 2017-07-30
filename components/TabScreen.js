
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {
    TabNavigator,
} from 'react-navigation';
import { HomeScreen } from './HomeScreen';
import { HotScreen } from './HotScreen';

const BasicApp = TabNavigator({
    Home: {screen:HomeScreen },
    HotScreen: {screen:HotScreen },
},{
    tabBarOptions:{
        style:{
            backgroundColor:"#8BC34A"
        }
    }
});
module.exports=BasicApp;