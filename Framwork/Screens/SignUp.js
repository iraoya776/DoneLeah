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
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import { AppContext } from "../Components/globalVariables";
import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { authentication, db } from "../../Firebase/Settings";
import { doc, setDoc } from "firebase/firestore";
import RNPickerSelect from "react-native-picker-select";

const validation = yup.object({
  email: yup.string().required().email("Enter a valid email").min(5).max(30),
  password: yup.string().required(),
  userName: yup.string().optional().min(4),
  firstName: yup.string().required("FirstName is required").min(3),
  lastName: yup.string().required("LastName is required").min(3),
});
export function SignUp({ navigation }) {
  const { setUserUID, setPreloader } = useContext(AppContext);
  const [gender, setGender] = useState("Male");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : "height" && Platform.OS === "android"
              ? "padding"
              : "height"
          }
        >
          <Formik
            initialValues={{
              email: "",
              password: "",
              firstName: "",
              lastName: "",
              gender: "",
            }}
            onSubmit={(value) => {
              setPreloader(true);
              createUserWithEmailAndPassword(
                authentication,
                value.email,
                value.password
              )
                .then(() => {
                  onAuthStateChanged(authentication, (user) => {
                    setPreloader(false);
                    const userUID = user.uid;
                    //console.log(userUID);
                    setUserUID(userUID);
                    //navigation.navigate("HomePage");
                    setDoc(doc(db, "users", userUID), {
                      userUID,
                      firstName: value.firstName,
                      lastName: value.lastName,
                      gender: gender,
                      email: value.email,
                      balance: 100,
                      image:
                        "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?t=st=1712838855~exp=1712842455~hmac=bd3857b6d44bf8ce99c7f777f568b092513e3d2c12e6bfd14fe2bd7c3b6bfa09&w=740",
                    })
                      .then(() => {
                        setPreloader(false);
                        navigation.navigate("HomeScreen");
                      })
                      .catch((error) => {
                        setPreloader(false);
                        Alert.alert("Message!", "Something went wrong", [
                          { text: "Try Again" },
                        ]);
                      });
                  });
                })
                .catch((error) => {
                  setPreloader(false);
                  //console.log(error);
                  Alert.alert(
                    "Message",
                    "soemthing went wrong, please check if you entered the correct email",
                    [{ text: "Try Again" }]
                  );
                });
            }}
            validationSchema={validation}
          >
            {(prop) => {
              return (
                <ScrollView>
                  <View
                    style={{
                      //borderWidth: 1,
                      height: Dimensions.get("screen").height * 0.87,
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 25,
                          color: Themes.colors.primary,
                          textAlign: "center",
                          marginBottom: 10,
                        }}
                      >
                        Create an Account
                      </Text>

                      <Text style={styles.txt}>First Name*</Text>
                      <TextInput
                        style={styles.input}
                        autoCapitalize="words"
                        onChangeText={prop.handleChange("firstName")}
                        onBlur={prop.handleBlur("firstName")}
                        value={prop.values.firstName}
                      />
                      <Text
                        style={{
                          display:
                            prop.touched.firstName && prop.errors.firstName
                              ? "flex"
                              : "none",
                          color: "red",
                        }}
                      >
                        {prop.errors.firstName}
                      </Text>

                      <Text style={styles.txt}>Last Name*</Text>
                      <TextInput
                        style={styles.input}
                        autoCapitalize="words"
                        onChangeText={prop.handleChange("lastName")}
                        onBlur={prop.handleBlur("lastName")}
                        value={prop.values.lastName}
                      />
                      <Text
                        style={{
                          display:
                            prop.touched.lastName && prop.errors.lastName
                              ? "flex"
                              : "none",
                          color: "red",
                        }}
                      >
                        {prop.errors.lastName}
                      </Text>
                      <View style={{ borderWidth: 1, borderRadius: 10 }}>
                        <Text style={[styles.txt, { marginBottom: -6 }]}>
                          Gender*
                        </Text>

                        <Picker
                          selectedValue={gender}
                          onValueChange={(itemValue) => setGender(itemValue)}
                        >
                          <Picker.Item label="Male" value="Male" />
                          <Picker.Item label="Female" value="Female" />
                        </Picker>
                      </View>

                      <Text style={styles.txt}>Email*</Text>
                      <TextInput
                        inputMode="email"
                        autoCapitalize="none"
                        style={styles.input}
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

                      <Text style={styles.txt}>Password*</Text>
                      <TextInput
                        style={styles.input}
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
                    </View>
                    <View>
                      <TouchableOpacity
                        style={styles.touch}
                        onPress={prop.handleSubmit}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            color: "white",
                            fontFamily: Themes.fonts.text600,
                            textAlign: "center",
                          }}
                        >
                          Continue
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              );
            }}
          </Formik>
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
    //justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    padding: 3,
    borderRadius: 10,
    //borderColor: Themes.colors.primary,
    fontSize: 18,
    marginBottom: 5,
    paddingLeft: 10,
  },
  txt: {
    fontFamily: Themes.fonts.text400,
    fontSize: 16,
  },
  touch: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 7,
    backgroundColor: Themes.colors.primary,
    borderColor: Themes.colors.primary,
    marginTop: 25,
  },
});
