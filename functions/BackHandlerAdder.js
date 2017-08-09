
import {BackHandler} from 'react-native';
import { NavigationActions } from 'react-navigation';

export const addBackHandler = (that) => {

  BackHandler.addEventListener('hardwareBackPress', () => {

    if (that.props.pageName === 'LogIn') {
      BackHandler.exitApp();
      return true;
    }
    if (that.props.pageName === "SignUp"){
      that.props.dispatch({ type: actions.SET_PAGE_NAME, pageName: "LogIn" })
      that.props.navigation.navigate('LogIn');
      return true;
    }
    if (that.props.pageName === 'Home') {
      BackHandler.exitApp();
      return true;
    }
    if (that.props.pageName == "SendPostScreen") {
      that.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "Home"});
      that.props.navigation.goBack();
      return true;
    }
    if (that.props.pageName == "PostScreen") {
      that.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "Home"});
      that.props.navigation.navigate("Home");
      return true;
    }
    if (that.props.pageName == "ReplayScreen") {
      that.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "PostScreen"});
      that.props.navigation.navigate("PostScreen");
      return true;
    }
    // return false;
  });
}