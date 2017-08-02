import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import SendPostScreen from './components/SendPostScreen';
import { TabScreen } from './components/TabScreen';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React, { Component } from 'react';
import { mainReducer } from './reducers/Reducers'

const App = StackNavigator({
  Home: { screen: TabScreen },
  SendPostScreen: { screen: SendPostScreen },
});

class Unagi extends Component {
  constructor(props) {
    super(props);

    this.store = createStore(mainReducer);
    this.store.subscribe(() => {
      console.log("Current State");
      console.log(this.store.getState());
    });
  }

  render() {
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Unagi', () => Unagi);
