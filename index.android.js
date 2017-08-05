import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';

import LoadingScreen from './components/LoadingScreen'
import SendPostScreen from './components/SendPostScreen';
import { TabScreen } from './components/TabScreen';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React, { Component } from 'react';
import { mainReducer } from './reducers/Reducers'
import {addBackHandler} from './functions/BackHandlerAdder';

const App = StackNavigator({
  LoadingScreen: { screen: LoadingScreen},
  LogIn: {screen: LogIn},
  SignUp: {screen: SignUp},
  Home: { screen: TabScreen },
  SendPostScreen: { screen: SendPostScreen },
});

class Unagi extends Component {
  constructor(props) {
    super(props);
    addBackHandler(this);

    this.store = createStore(mainReducer);
    this.store.subscribe(() => {
      console.log("Current State");
      console.log("------------------------------");
      // console.log(this.store.getState());
      console.log("------------------------------");
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
