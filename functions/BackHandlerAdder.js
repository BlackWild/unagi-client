import { BackHandler } from "react-native";

export const addBackHandler = that => {
  BackHandler.addEventListener("hardwareBackPress", () => {
    if (that.props.pageName === "LogIn") {
      BackHandler.exitApp();
      return true;
    }
    if (that.props.pageName === "SignUp") {
      that.props.navigation.state.params.onGoBack();
      that.props.navigation.goBack();
      that.props.dispatch({ type: actions.SET_PAGE_NAME, pageName: "LogIn" });
      return true;
    }
    if (that.props.pageName === "Home") {
      BackHandler.exitApp();
      return true;
    }
    if (that.props.pageName == "SendPostScreen") {
      that.props.navigation.state.params.onGoBack();
      that.props.navigation.goBack();
      that.props.dispatch({ type: actions.SET_PAGE_NAME, pageName: "Home" });
      return true;
    }
    if (that.props.pageName == "PostScreen") {
      that.props.navigation.navigate("Home");
      that.props.dispatch({ type: actions.SET_PAGE_NAME, pageName: "Home" });
      return true;
    }
    if (that.props.pageName == "SendReplyScreen") {
      that.props.navigation.navigate("PostScreen");
      that.props.dispatch({
        type: actions.SET_PAGE_NAME,
        pageName: "PostScreen"
      });
      return true;
    }

    //////////////   DrawerMenu Pages
    if (that.props.pageName === "UserPage") {
      that.props.app.unlockDrawer();
      that.props.navigation.goBack();
      that.props.dispatch({
        type: actions.SET_PAGE_NAME,
        pageName: that.props.pageNameNotFromDrawer
      });
      return true;
    }
    if (that.props.pageName === "AboutUsPage") {
      that.props.app.unlockDrawer();
      that.props.navigation.goBack();
      that.props.dispatch({
        type: actions.SET_PAGE_NAME,
        pageName: that.props.pageNameNotFromDrawer
      });
      return true;
    }
  });
};
