
import {BackHandler} from 'react-native';
import { NavigationActions } from 'react-navigation';

export const addBackHandler = (that) => {

  BackHandler.addEventListener('hardwareBackPress', () => {
    console.log("back clicked -->   ", that.props.pageName);
    if (that.props.pageName === 'LogIn') {
      return true;
    }
    if (that.props.pageName === "SignUp"){
      that.props.dispatch({ type: actions.SET_PAGE_NAME, pageName: "LogIn" })
      that.props.navigation.navigate('LogIn');
      return true;
    }
    if (that.props.pageName === 'Home') {
      return true;
    }
    if (that.props.pageName == "SendPostScreen") {
      that.props.dispatch({type: actions.SET_PAGE_NAME, pageName: "Home"});
      that.props.navigation.goBack();
      return true;
    }
    // return false;
  });
}