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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { fa2, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import * as yup from "yup";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../../Firebase/Settings";
import { useContext } from "react";
import { AppContext } from "../Components/globalVariables";

const validation = yup.object({
  email: yup.string().required().email("Enter a valid email").min(5).max(30),
  password: yup.string(),
});

export function Login({ navigation, route }) {
  //console.log(route);

  const { setUserUID, setPreloader } = useContext(AppContext);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          {/* <Image
            source={require("../../assets/leahLogo.png")}
            style={styles.ImgDesign}
          /> */}
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(value) => {
              setPreloader(true);
              signInWithEmailAndPassword(
                authentication,
                value.email,
                value.password
              )
                .then(() => {
                  onAuthStateChanged(authentication, (user) => {
                    setUserUID(user.uid);
                    // console.log(user.uid);
                    setPreloader(false);
                    navigation.navigate("HomeScreen");
                  });
                })
                .catch((error) => {
                  setPreloader(false);
                  // console.log(typeof error.code)
                  Alert.alert(
                    "Invalid email or password!",
                    "please make sure to enter a verified email address or password",
                    [{ text: "Try Again" }]
                  );
                  console.log(error);
                });
            }}
            validationSchema={validation}
          >
            {(prop) => {
              return (
                <View style={styles.design}>
                  <TextInput
                    style={styles.inputDesign}
                    inputMode="email"
                    autoCapitalize="none"
                    placeholder="Enter email"
                    onChangeText={prop.handleChange("email")}
                    onBlur={prop.handleBlur("email")}
                    value={prop.values.email}
                  />
                  <Text
                    style={{
                      display:
                        prop.touched.email && prop.errors.email
                          ? "flex"
                          : "none",
                      color: "red",
                    }}
                  >
                    {prop.errors.email}
                  </Text>

                  <TextInput
                    style={styles.inputDesign}
                    placeholder="Enter Password"
                    secureTextEntry
                    autoCapitalize="words"
                    onChangeText={prop.handleChange("password")}
                    onBlur={prop.handleBlur("password")}
                    value={prop.values.password}
                  />
                  <Text
                    style={{
                      display:
                        prop.touched.password && prop.errors.password
                          ? "flex"
                          : "none",
                      color: "red",
                    }}
                  >
                    {prop.errors.password}
                  </Text>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => navigation.navigate("ForgotPassword")}
                  >
                    <Text style={[styles.txt, { color: Themes.colors.red }]}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={prop.handleSubmit}
                    style={styles.touch}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: "white",
                        fontFamily: Themes.fonts.text600,
                      }}
                    >
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          </Formik>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={[styles.touch, { backgroundColor: "white" }]}
          >
            <Text
              style={{
                color: Themes.colors.primary,
                fontFamily: Themes.fonts.text800,
                fontSize: 18,
              }}
            >
              Sign-Up
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
  ImgDesign: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: "white",
    //borderRadius: 60,
    marginBottom: 30,
  },
  inputDesign: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    marginBottom: 10,
    borderRadius: 10,
    width: "100%",
    fontSize: 18,
    paddingLeft: 10,
  },
  input: {
    //backgroundColor: "red",
    width: 140,
  },
  txt: {
    color: Themes.colors.primary1,
    fontSize: 16,
    fontFamily: Themes.fonts.text400,
    marginBottom: 15,
  },
  touch: {
    borderWidth: 1,
    borderColor: Themes.colors.primary,
    padding: 7,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 10,
    width: "100%",
    backgroundColor: Themes.colors.primary,
  },
  design: {
    //justifyContent: "center",
  },
});
