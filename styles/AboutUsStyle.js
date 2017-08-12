import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  pic: {
    width: 30,
    height: 30,
    margin: 10
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center"
  },
  bar: {
    padding: 10,
    margin: 0,
    flexDirection: "row",
    backgroundColor: "#8BC34A",
    justifyContent: "center"
  },

  post: {
    fontSize: 20,
    color: "#F1F1F1",
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Vazir"
  },
  text1: {
    fontSize: 20,
    fontFamily: "Vazir"
  },
  text2: {
    fontSize: 20,
    fontFamily: "Vazir",
    color: "#689F38",
    margin: 10
  },
  team5: {
    fontFamily: "Vazir",
    fontSize: 40,
    margin: 20,
    marginBottom: 5,
    color: "#689F38",
    borderBottomColor: "#689F38",
    borderBottomWidth: 3
  },
  center: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  }
});
