import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  pic: {
    width: 20,
    height: 20,
    margin: 10
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1f5fe"
  },
  charRemain: {
    fontSize: 20,
    // color:'#F1F1F1',
    color: "#FFFFFF",
    fontFamily: "Vazir",
    textAlign: "center",
    justifyContent: "center"
    // margin: 10,
  },
  overChar: {
    color: "#FF7043" //"#f44336"
  },
  textarea: {
    flex: 1,
    width: 350,
    color: "#000000",
    backgroundColor: "#e1f5fe",
    justifyContent: "center",
    alignItems: "flex-start",
    textAlign: "auto",
    textAlignVertical: "top",
    fontFamily: "Vazir"
  },

  bar: {
    padding: 10,
    margin: 0,
    flexDirection: "row",
    backgroundColor: "#0091ea",
    justifyContent: "center"
    // textAlign: 'center'
  },

  post: {
    fontSize: 20,
    color: "#F1F1F1",
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Vazir"
    // margin: 10,
  }
});
