import { StyleSheet } from "react-native";

export const headerStyles = StyleSheet.create({
  headerBox: {
    height: 50,
    backgroundColor: "#8BC34A",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },

  logo: {
    fontSize: 24,
    color: "white",
    margin: 5,
    marginLeft: 13,
    fontFamily: "Vazir"
  },
  pagesHeader: {
    height: 60,
    backgroundColor: "#8BC34A",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleHeader: {
    fontSize: 20,
    color: "#F1F1F1",
    marginRight: 20,
    fontFamily: "Vazir"
  },
  backPic: {
    width: 30,
    height: 30,
    margin: 10
  }
});
