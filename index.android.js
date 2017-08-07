import React, { Component } from 'react';
import { AppRegistry , AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';

import { compose, applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import { mainReducer } from './reducers/Reducers'

import LoadingScreen from './components/LoadingScreen'
import SendPostScreen from './components/SendPostScreen';
import { TabScreen } from './components/TabScreen';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
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

    this.store = createStore(
      mainReducer,
      undefined,
      compose(
        applyMiddleware(),
        autoRehydrate()
      )
    );

    this.store.subscribe(() => {
      console.log("Current State");
      console.log("------------------------------");
      // console.log(this.store.getState());
      console.log("------------------------------");
    });

    const config = {
      storage: AsyncStorage,
    };
    persistStore(this.store, config);
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
