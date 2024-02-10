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
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Themes } from "../Components/Themes";

export function Devices({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={{
              textAlign: "center",
              marginBottom: 5,
              fontSize: 20,
              color: Themes.colors.primary,
            }}
          >
            Devices
          </Text>
          <ScrollView>
            <TouchableOpacity>
              <View style={styles.design}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?size=626&ext=jpg&ga=GA1.2.1337870543.1702039743&semt=sph",
                  }}
                  style={styles.imgDesign}
                />
                <Text style={styles.txt}>Phones</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.design}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/free-photo/electronic-device-balancing-concept_23-2150422322.jpg?w=740&t=st=1707475020~exp=1707475620~hmac=d9618955d2b07c98be0033044fce80a7426ab2717feec5a2fa29af6352a83f7a",
                  }}
                  style={styles.imgDesign}
                />
                <Text style={styles.txt}>Laptops</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.design}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/free-psd/realistic-computer-design_1310-690.jpg?w=740&t=st=1707475354~exp=1707475954~hmac=cd52ca85a618bdb24bc6de9262a8b33c79d60a8b1f4fbe3d48f5aa902ccd7a35",
                  }}
                  style={styles.imgDesign}
                />
                <Text style={styles.txt}>PC</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.design}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/premium-photo/abstract-flying-tech-pieces-white-background-laptop-computer-speakers-headphones-music-technology-concept-3d-rendering_670147-14654.jpg?w=740",
                  }}
                  style={styles.imgDesign}
                />
                <Text style={styles.txt}>Accessories</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : null,
    padding: 10,
  },
  imgDesign: {
    width: 160,
    height: 160,
    borderRadius: 20,
  },
  design: {
    height: 200,
    //borderWidth: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    //borderRadius: 20,
    //alignItems: "center",
    //marginHorizontal: 5,
  },
  txt: {
    //textAlign: "center",
    fontSize: 18,
    marginRight: 40,
    fontFamily: Themes.fonts.text400,
  },
});
