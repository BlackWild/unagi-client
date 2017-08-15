import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  paragraph: {
    margin: 7,
    marginBottom: 4,
    fontSize: 12,
    textAlign: "auto",
    color: "#34495e",
    fontFamily: "Vazir"
  },
  postBox: {
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 8,
    backgroundColor: "#e1f5fe",
    borderRadius: 10
  },
  userBox: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  likeBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "#9e9e9e"
  },
  user: {
    color: "#0077c0",
    fontSize: 14,
    fontFamily: "Vazir",
    textAlign: "right"
  },
  replyText: {
    paddingRight: 10,
    borderRightWidth: 3,
    borderColor: "#0077c0",
    fontFamily: "Vazir",
    fontSize: 12
  },
  reply: {
    paddingRight: 10,
    paddingTop: 5
  }
});
