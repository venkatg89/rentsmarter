import { StyleSheet, Dimensions } from "react-native";
import Fonts from "../../Themes/Fonts";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  child: { width, justifyContent: "center" },
  text: { fontSize: width * 0.5, textAlign: "center" },
  planText: {
    fontFamily: Fonts.type.regularText,
    fontSize: Fonts.size.h6,
    letterSpacing: 0,
    fontWeight: "400",
    color: "#605B57",
  },
  indicatorStyle: {
    backgroundColor: "#121212",
    borderRadius: 15,
    opacity: 0.75,
    margin: 10,
  },
  listText: {
    fontFamily: Fonts.type.regularText,
    fontSize: Fonts.size.h6,
    letterSpacing: 0,
    fontWeight: "400",
    color: "#085280",
  },
  dialogContentView: {
    // paddingLeft: 18,
    // paddingRight: 18,
  },
  errorHeader: {
    fontFamily: Fonts.type.regularText,
    fontSize: Fonts.size.h5,
    letterSpacing: 0,
    fontWeight: "600",
    color: "#085280",
    margin: 10,
  },
  errorDescription: {
    fontFamily: Fonts.type.regularText,
    fontSize: Fonts.size.h6,
    letterSpacing: 0,
    textAlign: "center",
    fontWeight: "400",
    color: "#605B57",
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  errorFilterDescription: {
    fontFamily: Fonts.type.regularText,
    fontSize: Fonts.size.h6,
    letterSpacing: 0,
    textAlign: "center",
    fontWeight: "400",
    color: "#085280",
  },
  filTerTitle: {
    fontFamily: Fonts.type.semiboldText,
    fontSize: Fonts.size.h6,
    letterSpacing: 0,
    color: "#000000",
  },
  resetText: {
    fontFamily: Fonts.type.regularText,
    fontSize: Fonts.size.h6,
    letterSpacing: 0,
    textAlign: "center",
    fontWeight: "400",
    color: "#085280",
  },
  filterItem: {
    padding: Fonts.size.reguler,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sortText: {
    fontSize: Fonts.size.small,
  },
});
