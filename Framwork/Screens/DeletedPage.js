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
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  faArrowLeft,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export function Deleted() {
  const navigation = useNavigation();
  const route = useRoute();
  const { firstName } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text
          style={{
            fontFamily: Themes.fonts.text800,
            textAlign: "center",
            fontSize: 18,
          }}
        >
          Sorry to see you go, {firstName}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{
            // borderWidth: 1,
            marginTop: 20,
            padding: 7,
            backgroundColor: Themes.colors.primary,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: Themes.fonts.text800,
              fontSize: 18,
              color: "white",
            }}
          >
            {" "}
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : null,
    padding: 10,
    justifyContent: "center",
  },
});
