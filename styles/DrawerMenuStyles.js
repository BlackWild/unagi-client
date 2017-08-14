import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  userBox: {
    backgroundColor: "#8BC34A",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  photo: {
    height: 80,
    width: 70,
    borderRadius: 40,
    backgroundColor: "#689F38",
    borderBottomWidth: 2,
    borderColor: "#9e9e9e",
    margin: 10
  },
  username: {
    color: "#ffffff",
    margin: 10,
    marginTop: 5,
    fontSize: 18
  },
  button: {
    color: "#689F38",
    margin: 0,
    fontFamily: "Vazir",
    fontSize: 16,
    textAlign: "right"
  },
  buttonView: {
    margin: 10,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignContent: "center",
    alignItems: "center"
  }
});
