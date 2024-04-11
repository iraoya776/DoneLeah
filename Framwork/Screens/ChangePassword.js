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
  Dimensions,
} from "react-native";
import { Themes } from "../Components/Themes";
import { useNavigation } from "@react-navigation/native";
import {
  faArrowLeft,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Formik } from "formik";
import * as yup from "yup";
import { useContext, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { authentication } from "../../Firebase/Settings";
import { AppContext } from "../Components/globalVariables";

const validation = yup.object({
  password1: yup.string().required("password is required").min(8).max(25),
  password2: yup.string().required("password is required").min(8).max(25),
});

export function ChangePassword() {
  const navigation = useNavigation();

  const {
    userUID,
    setUserInfo,
    userInfo,
    setPreloader,
    setAllTargets,
    allTargets,
    setAllCategory,
    allCategory,
    setTargetID,
  } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const getE = () => {
    if (userInfo.email !== email || email.includes("@gmail.") === false) {
      return setError("Email is not valid");
    } else if (userInfo.email === email && email.includes("@gmail.")) {
      sendPasswordResetEmail(authentication, email)
        .then(() => {
          // Password reset email sent!
          // ..
          console.log("email resetLink sent");
        })
        .catch((error) => {
          console.log("something went wrong");
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            columnGap: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faArrowLeftLong} size={22} />
          </TouchableOpacity>
          <Text style={{ fontFamily: Themes.fonts.text800, fontSize: 18 }}>
            Change Passoword
          </Text>
        </View>
        <View
          style={{
            //borderWidth: 1,
            height: Dimensions.get("screen").height * 0.85,
            justifyContent: "space-between",
          }}
        >
          <View style={{ height: "90%", justifyContent: "center" }}>
            <Text
              style={{
                fontFamily: Themes.fonts.text600,
                fontSize: 15,
                textAlign: "center",
                marginBottom: 40,
              }}
            >
              Enter the email associated with your account and we would send you
              a link to reset your password.
            </Text>
            <Text style={{ fontFamily: Themes.fonts.text400 }}>Email</Text>
            <TextInput
              placeholder="gigi@gmail.com"
              onChangeText={(inp) => setEmail(inp)}
              inputMode="email"
              autoCapitalize="none"
              style={{
                borderWidth: 1,
                fontSize: 18,
                padding: 3,
                paddingLeft: 10,
                borderRadius: 10,
              }}
            ></TextInput>
            <Text style={{ color: Themes.colors.red }}>{error}</Text>
          </View>
          <TouchableOpacity
            onPress={getE}
            style={{
              padding: 8,
              borderRadius: 10,
              backgroundColor: Themes.colors.primary,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontFamily: Themes.fonts.text800,
                fontSize: 18,
              }}
            >
              Continue
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
  },
});
