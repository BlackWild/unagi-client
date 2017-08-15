import { TabNavigator } from "react-navigation";
import HomeScreen from "./HomeScreen";
import HotScreen from "./HotScreen";

export const TabScreen = TabNavigator(
  {
    خانه: {
      screen: HomeScreen
    },
    "پست های داغ": { screen: HotScreen }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "#0091ea"
      },
      labelStyle: {
        fontSize: 14,
        fontFamily: "Vazir"
      }
    }
  }
);
