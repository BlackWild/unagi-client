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
    backgroundColor: "#0091ea",
    justifyContent: "center"
  },

  post: {
    fontSize: 20,
    color: "#F1F1F1",
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Vazir"
  },
  userBox: {
    backgroundColor: "#0091ea",
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  photo: {
    // height: 80,
    // width: 70,
    // borderRadius: 40,
    height: 96,
    width: 84,
    borderRadius: 48,
    backgroundColor: "#01579b",
    borderBottomWidth: 2,
    borderColor: "#9e9e9e",
    margin: 10
  },
  username: {
    color: "#ffffff",
    margin: 10,
    marginTop: 5,
    fontSize: 18
  }
});
