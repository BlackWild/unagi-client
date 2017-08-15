import React, { Component } from "react";
import {
  View,
  AppRegistry,
  AsyncStorage,
  DrawerLayoutAndroid
} from "react-native";
import { StackNavigator } from "react-navigation";
import { NavigationActions } from "react-navigation";

import { compose, applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { persistStore, autoRehydrate } from "redux-persist";
import { mainReducer } from "./reducers/Reducers";

import LoadingScreen from "./components/LoadingScreen";
import SendPostScreen from "./components/SendPostScreen";
import { TabScreen } from "./components/TabScreen";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import PostScreen from "./components/PostScreen";
import SendReplyScreen from "./components/SendReplyScreen";
import UserPage from "./components/UserPage";
import AboutUsPage from "./components/AboutUsPage";
import DrawerMenu from "./components/DrawerMenu";

import { addBackHandler } from "./functions/BackHandlerAdder";

const App = StackNavigator({
  LoadingScreen: { screen: LoadingScreen },
  LogIn: { screen: LogIn },
  SignUp: { screen: SignUp },
  Home: { screen: TabScreen },
  SendPostScreen: { screen: SendPostScreen },
  SendReplyScreen: { screen: SendReplyScreen },
  PostScreen: { screen: PostScreen },
  UserPage: { screen: UserPage },
  AboutUsPage: { screen: AboutUsPage }
});

class Unagi extends Component {
  constructor(props) {
    super(props);
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.lockDrawer = this.lockDrawer.bind(this);
    this.unlockDrawer = this.unlockDrawer.bind(this);
    addBackHandler(this);
    this.state = {
      run: false
    };

    this.store = createStore(
      mainReducer,
      undefined,
      compose(applyMiddleware(), autoRehydrate())
    );

    // this.store.subscribe(() => {
    //   console.log("State Changed");
    //   console.log("------------------------------");
    //   console.log(this.store.getState().drawer.openDrawer);
    //   console.log("------------------------------");
    // });

    const config = {
      storage: AsyncStorage,
      blacklist: ["app", "navigation", "pageName"]
    };
    persistStore(this.store, config, () => {
      console.log("Store loaded from local storage");
      this.setState({
        run: true
      });
      this.store.dispatch({ type: "SET_APP_REF", app: this });
    });
  }

  openDrawer() {
    this.drawer.openDrawer();
  }
  closeDrawer() {
    this.drawer.closeDrawer();
  }
  unlockDrawer() {
    this.drawer.setNativeProps({
      drawerLockMode: "unlocked"
    });
  }
  lockDrawer() {
    this.drawer.setNativeProps({
      drawerLockMode: "locked-closed"
    });
  }

  render() {
    return (
      <Provider store={this.store}>
        {this.state.run
          ? <DrawerLayoutAndroid
              ref={rf => (this.drawer = rf)}
              drawerWidth={250}
              drawerPosition={DrawerLayoutAndroid.positions.Right}
              renderNavigationView={() => <DrawerMenu />}
              drawerLockMode="locked-closed"
            >
              <App />
            </DrawerLayoutAndroid>
          : <View style={{ flex: 1, backgroundColor: "#0091ea" }} />}
      </Provider>
    );
  }
}

AppRegistry.registerComponent("Unagi", () => Unagi);
