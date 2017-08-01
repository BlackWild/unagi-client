

import { TabNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import HotScreen from './HotScreen';

export const TabScreen = TabNavigator({
    Home: {screen:HomeScreen },
    HotScreen: {screen:HotScreen },
},{
    tabBarOptions:{
        style:{
            backgroundColor:"#8BC34A"
        }
    }
});
