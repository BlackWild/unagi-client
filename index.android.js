import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import {SendPostScreen} from './components/SendPostScreen';
import {TabScreen} from './components/TabScreen';

import { Provider } from 'react-redux';
import {createStore} from 'redux';
import React, { Component } from 'react';
import {testReducer} from './reducers/Reducers'

const App = StackNavigator({
  Home: { screen: TabScreen },
  SendPostScreen: { screen: SendPostScreen },
});

class Unagi extends Component {
    render() {
        return (
            <Provider store={createStore(testReducer)}>
              <App/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('Unagi', () => Unagi);
