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
          source={{
            uri: "https://img.freepik.com/premium-psd/leah-typography-text-silver-black-psd-transparent_1161162-30781.jpg?w=740",
          }}
          style={{
            width: 50,
            height: 50,
            //borderWidth: 1,
            borderRadius: 40,
          }}
        />
        <View style={{ marginTop: 30 }}>
          <Image
            source={require("../../assets/pic(2).png")}
            style={styles.picDesign}
          />
          <Text style={styles.txt}>
            Create target for 3 months, and pay with installments
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Login")}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                color: "white",
                fontFamily: Themes.fonts.text800,
              }}
            >
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
    width: "100%",
    //marginTop: 30,
  },
  txt: {
    textAlign: "center",
    fontFamily: Themes.fonts.text400,
    //fontWeight: "700",
    fontSize: 18,
  },
  btn: {
    //borderWidth: 1,
    padding: 7,
    //width: "90%",
    borderRadius: 10,
    backgroundColor: Themes.colors.primary,
  },
});
