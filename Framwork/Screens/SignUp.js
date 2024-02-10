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
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import { AppContext } from "../Components/globalVariables";
import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { authentication, db } from "../../Firebase/Settings";
import { doc, setDoc } from "firebase/firestore";

const validation = yup.object({
  email: yup.string().required().email("Enter a valid email").min(5).max(30),
  password: yup.string().required().min(8).max(20),
  phone: yup.number().required("please enter a valid phone number"),
  address: yup.string().required("address is required"),
  userName: yup.string().optional().min(4),
  firstName: yup.string().required("FirstName is required").min(3),
  lastName: yup.string().required("LastName is required").min(3),
  gender: yup.string().required("Gender is a required field"),
});
export function SignUp({ navigation }) {
  const { setUserUID, setPreloader } = useContext(AppContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Formik
            initialValues={{
              email: "",
              password: "",
              firstName: "",
              lastName: "",
              phone: "",
              userName: "",
              gender: "",
              address: "",
            }}
            onSubmit={(value) => {
              //console.log(value);
              setPreloader(true);
              createUserWithEmailAndPassword(
                authentication,
                value.email,
                value.password
              )
                .then(() => {
                  onAuthStateChanged(authentication, (user) => {
                    const userUID = user.uid;
                    //console.log(userUID);
                    setUserUID(userUID);
                    //navigation.navigate("HomePage");
                    setDoc(doc(db, "users", userUID), {
                      //fullName: value.fullName,
                      firstName: value.firstName,
                      lastName: value.lastName,
                      gender: value.gender,
                      email: value.email,
                      address: value.address,
                      userName: value.userName,
                      phone: value.phone,
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
                  console.log(error);
                  Alert.alert("Message", "couldn`t send data", [
                    { text: "Try Again" },
                  ]);
                });
            }}
            validationSchema={validation}
          >
            {(prop) => {
              return (
                <ScrollView>
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
                    <Text style={styles.txt}>Mobile Number*</Text>
                    <TextInput
                      inputMode="decimal"
                      style={styles.input}
                      onChangeText={prop.handleChange("phone")}
                      onBlur={prop.handleBlur("phone")}
                      value={prop.values.phone}
                    />
                    <Text
                      style={{
                        display:
                          prop.touched.phone && prop.errors.phone
                            ? "flex"
                            : "none",
                        color: "red",
                      }}
                    >
                      {prop.errors.phone}
                    </Text>
                    <Text style={styles.txt}>Username*</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={prop.handleChange("userName")}
                      onBlur={prop.handleBlur("userName")}
                      value={prop.values.userName}
                    />
                    <Text
                      style={{
                        display:
                          prop.touched.userName && prop.errors.userName
                            ? "flex"
                            : "none",
                        color: "red",
                      }}
                    >
                      {prop.errors.userName}
                    </Text>
                    <Text style={styles.txt}>Gender*</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={prop.handleChange("gender")}
                      onBlur={prop.handleBlur("gender")}
                      value={prop.values.gender}
                    />
                    <Text
                      style={{
                        display:
                          prop.touched.gender && prop.errors.gender
                            ? "flex"
                            : "none",
                        color: "red",
                      }}
                    >
                      {prop.errors.gender}
                    </Text>

                    <Text style={styles.txt}>Email*</Text>
                    <TextInput
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
                      {prop.errors.gender}
                    </Text>
                    <Text style={styles.txt}>Address*</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={prop.handleChange("address")}
                      onBlur={prop.handleBlur("address")}
                      value={prop.values.address}
                    />
                    <Text
                      style={{
                        display:
                          prop.touched.address && prop.errors.address
                            ? "flex"
                            : "none",
                        color: "red",
                      }}
                    >
                      {prop.errors.address}
                    </Text>
                    <Text style={styles.txt}>Password*</Text>
                    <TextInput
                      style={styles.input}
                      secureTextEntry
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
    padding: 11,
    borderRadius: 10,
    borderColor: Themes.colors.primary,
    fontSize: 20,
    //marginBottom: 15,
  },
  txt: {
    fontFamily: Themes.fonts.text400,
    fontSize: 16,
  },
  touch: {
    borderWidth: 1,
    borderRadius: 40,
    padding: 10,
    backgroundColor: Themes.colors.primary,
    borderColor: Themes.colors.primary,
    marginTop: 25,
  },
});
