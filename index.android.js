import React, { Component } from 'react';
import { View, AppRegistry , AsyncStorage} from 'react-native';
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
import PostScreen from './components/PostScreen';
import ReplayScreen from './components/ReplayScreen';

import {addBackHandler} from './functions/BackHandlerAdder';

const App = StackNavigator({
  LoadingScreen: { screen: LoadingScreen},
  LogIn: {screen: LogIn},
  SignUp: {screen: SignUp},
  Home: { screen: TabScreen },
  SendPostScreen: { screen: SendPostScreen },
  ReplayScreen: {screen: ReplayScreen},
  PostScreen: {screen: PostScreen},
});

class Unagi extends Component {
  constructor(props) {
    super(props);
    addBackHandler(this);
    this.state = {
      run: false
    }

    this.store = createStore(
      mainReducer,
      undefined,
      compose(
        applyMiddleware(),
        autoRehydrate()
      )
    );

    // this.store.subscribe(() => {
    //   console.log("State Changed");
    //   console.log("------------------------------");
    //   // console.log(this.store.getState().userInfo);
    //   // console.log("------------------------------");
    // });

    const config = {
      storage: AsyncStorage,
    };
    persistStore(this.store, config, ()=>{
      console.log("Store loaded from local storage");
      this.setState({
        run: true
      });
    });
  }

  render() {
    return (
      <Provider store={this.store}>
        { this.state.run ? (<App />) : (<View style={{flex:1, backgroundColor: "#8BC34A"}}/>) }
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Unagi', () => Unagi);
