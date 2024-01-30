import { StyleSheet } from "react-native";
import { colors } from "../../assets/themes/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorBackground,
  },
  listContainer: {
    marginTop: -10,
  },
  fabButtonContainer: {
    position: "absolute",
    right: 30,
    bottom: 30,
  },
  fabButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.colorSecondary,
  },
  fabButtonIcon: {
    fontSize: 30,
    color: colors.textInSecondary,
  },
});

export default styles;
