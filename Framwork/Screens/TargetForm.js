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
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  faArrowLeft,
  faArrowLeftLong,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Picker } from "@react-native-picker/picker";
import { AppContext } from "../Components/globalVariables";
import { useContext, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { db } from "../../Firebase/Settings";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

const validation = yup.object({
  //email: yup.string().required().email("Enter a valid email").min(5).max(30),
  phoneNumber: yup.number().required("please enter a valid phone number"),
  phoneNumber2: yup.number().optional(),
  address: yup.string().required("address is required").min(5),
});
export function TargetForm() {
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
  } = useContext(AppContext);

  const route = useRoute();
  const { targetName, total, goodsPrice } = route.params;

  const [duration, setDuration] = useState("1 Month");
  const [deliveryMethod, setDeliveryMethod] = useState("Pick-up");
  const [email, setEmail] = useState(userInfo.email);

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
            <Text style={{ fontSize: 18, fontFamily: Themes.fonts.text800 }}>
              Target Form
            </Text>
          </View>
          <Formik
            initialValues={{
              phoneNumber: "",
              address: "",
              phoneNumber2: "",
            }}
            onSubmit={(value) => {
              async function checkTargets() {
                const targetInfo = collection(db, "orders");
                const myDocumentData = {
                  userUID,
                  targetName,
                  total,
                  address: value.address,
                  mobile1: Number(value.phoneNumber),
                  mobile2: Number(value.phoneNumber2),
                  createdAt: Number(new Date().getTime()),
                };
                addDoc(targetInfo, myDocumentData)
                  .then(() => {
                    //navigation.goBack();
                    //console.log("successful");
                  })
                  .catch(() => {
                    console.log("unsuccessful");
                  });

                const myDocumentData2 = {
                  balance: goodsPrice,
                };
                const docRef = doc(db, "users", userUID);
                setPreloader(false);
                setDoc(docRef, myDocumentData2, { merge: true })
                  .then(() => {
                    setPreloader(false);
                    navigation.goBack();
                    //console.log("successful");
                  })
                  .catch(() => {
                    setPreloader(false);
                    console.log("unsuccessful");
                  });
              }
              checkTargets();
            }}
            validationSchema={validation}
          >
            {(prop) => {
              return (
                <ScrollView>
                  <View
                    style={{
                      marginTop: 5,
                      //borderWidth: 1,
                      height: Dimensions.get("screen").height * 0.84,
                    }}
                  >
                    <Text style={styles.txt}>Mobile Number*</Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View
                        style={{
                          borderWidth: 1,
                          padding: 8,
                          borderRightWidth: 0,
                          borderTopLeftRadius: 10,
                          borderBottomLeftRadius: 10,
                        }}
                      >
                        <Text style={{ fontSize: 18 }}>+123</Text>
                      </View>
                      <TextInput
                        style={[
                          styles.inp,
                          {
                            width: Dimensions.get("screen").width * 0.77,
                            borderRadius: 0,
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                          },
                        ]}
                        inputMode="numeric"
                        onChangeText={prop.handleChange("phoneNumber")}
                        onBlur={prop.handleBlur("phoneNumber")}
                        value={prop.values.phoneNumber}
                      ></TextInput>
                    </View>
                    <Text
                      style={{
                        display:
                          prop.touched.phoneNumber && prop.errors.phoneNumber
                            ? "flex"
                            : "none",
                        color: "red",
                      }}
                    >
                      {prop.errors.phoneNumber}
                    </Text>
                    <Text style={styles.txt}>
                      Alternative Mobile Number (Optional)*
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View
                        style={{
                          borderWidth: 1,
                          padding: 8,
                          borderRightWidth: 0,
                          borderTopLeftRadius: 10,
                          borderBottomLeftRadius: 10,
                        }}
                      >
                        <Text style={{ fontSize: 18 }}>+123</Text>
                      </View>
                      <TextInput
                        style={[
                          styles.inp,
                          {
                            width: Dimensions.get("screen").width * 0.77,
                            borderRadius: 0,
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                          },
                        ]}
                        inputMode="numeric"
                        onChangeText={prop.handleChange("phoneNumber2")}
                        onBlur={prop.handleBlur("phoneNumber2")}
                        value={prop.values.phoneNumber2}
                      ></TextInput>
                    </View>
                    <Text
                      style={{
                        display:
                          prop.touched.phoneNumber2 && prop.errors.phoneNumber2
                            ? "flex"
                            : "none",
                        color: "red",
                      }}
                    >
                      {prop.errors.phoneNumber2}
                    </Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        marginTop: 10,
                      }}
                    >
                      <Text style={styles.txt}>Delivery Method*</Text>
                      <Picker
                        selectedValue={deliveryMethod}
                        onValueChange={(itemValue) =>
                          setDeliveryMethod(itemValue)
                        }
                        mode="dropdown"
                        dropdownIconColor={Themes.colors.green}
                      >
                        <Picker.Item label="Pick-up" value="Pick-up" />
                        <Picker.Item
                          label="Door-Delivery"
                          value="Door-Delivery"
                        />
                      </Picker>
                    </View>

                    <Text style={styles.txt}>Address*</Text>
                    <TextInput
                      style={styles.inp}
                      inputMode="text"
                      autoCapitalize="words"
                      onChangeText={prop.handleChange("address")}
                      onBlur={prop.handleBlur("address")}
                      value={prop.values.address}
                    ></TextInput>
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
                    <View
                      style={{
                        height:
                          prop.values.phoneNumber.length < 1 &&
                          prop.values.phoneNumber2.length < 1
                            ? "49%"
                            : "49%",
                        //borderWidth: 1,
                        justifyContent: "flex-end",
                      }}
                    >
                      <TouchableOpacity
                        onPress={prop.handleSubmit}
                        style={{
                          //borderWidth: 1,
                          marginTop: 30,
                          padding: 10,
                          borderRadius: 40,
                          backgroundColor: Themes.colors.blueMedium,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: Themes.fonts.text700,
                            textAlign: "center",
                            color: "white",
                          }}
                        >
                          Submit
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
  },
  inp: {
    borderWidth: 1,
    padding: 7,
    borderRadius: 10,
    fontSize: 18,
  },
  txt: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: Themes.fonts.text500,
  },
});
