import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Themes } from "../Components/Themes";

export function IntroScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/icon.png")}
          style={{
            width: 50,
            height: 50,
            borderWidth: 1,
            borderColor: "black",
          }}
        />
        <View style={{ marginTop: 30 }}>
          <Image
            source={require("../../assets/pic(2).png")}
            style={styles.picDesign}
          />
          <Text style={styles.txt}>
            Set target for all commodities online, or pay with interests gotten
            from debt servicing. You can set targets for a week, month, or year.
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ textAlign: "center", fontSize: 16, color: "white" }}>
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : null,
    padding: 10,
    justifyContent: "space-between",
  },
  picDesign: {
    height: 300,
    width: "90%",
    marginTop: 30,
  },
  txt: {
    textAlign: "center",
    fontFamily: Themes.fonts.text500,
    //fontWeight: "700",
    fontSize: 25,
  },
  btn: {
    borderWidth: 1,
    padding: 10,
    //width: "90%",
    borderRadius: 40,
    backgroundColor: Themes.colors.primary,
  },
});
