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
import { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/Settings";

const validation = yup.object({
  //email: yup.string().required().email("Enter a valid email").min(5).max(30),
  phoneNumber: yup.number().required("please enter a valid phone number"),
  address: yup.string().required("address is required"),
  //title: yup.string().required("give your target a name").min(5),
  occupation: yup.string().required("occupation is required").min(5),
});
export function CartTargetForm() {
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
  const { total } = route.params;
  const [duration, setDuration] = useState("1 Month");
  const [paymentSchedule, setPaymentSchedule] = useState("Weekly");
  const [employmentStatus, setEmploymentStatus] = useState("Worker");
  const [email, setEmail] = useState(userInfo.email);

  const allCartProducts = [];
  const cartImages = [];
  allTargets.map((item) => allCartProducts.push(item.product));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={Themes.colors.primary}
        barStyle={"light-content"}
      />

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
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faArrowLeftLong} size={22} />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontFamily: Themes.fonts.text800 }}>
              Cart Target Form
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
              <FontAwesomeIcon
                icon={faHome}
                size={22}
                color={Themes.colors.greenDark}
              />
            </TouchableOpacity>
          </View>
          <Formik
            initialValues={{
              //title: "",
              phoneNumber: "",
              occupation: "",
              address: "",
            }}
            onSubmit={(value) => {
              async function checkTargets() {
                const docRef = doc(db, "cartBundledTargets", userUID);
                const docRef2 = doc(
                  db,
                  "setTargetsDirectlyFromProducts",
                  userUID
                );
                const docSnap = await getDoc(docRef);
                const docSnap2 = await getDoc(docRef2);
                if (docSnap.exists() || docSnap2.exists()) {
                  Alert.alert(
                    "Hello!",
                    "you can only create a target at a time",
                    [{ text: "Ok" }]
                  );
                } else {
                  const cartCollection = collection(db, "cartBundledTargets");
                  const myDocumentData = {
                    //title: value.title,
                    phoneNumber: Number(value.phoneNumber),
                    occupation: value.occupation,
                    address: value.address,
                    allCartProducts,
                    duration,
                    paymentSchedule,
                    employmentStatus,
                    userUID,
                    cartProductsTotalPrice: Number(total),
                    status: "active",
                    createdAt: new Date().getTime(),
                  };
                  const myDocRef = doc(cartCollection, userUID);
                  setDoc(myDocRef, myDocumentData)
                    .then(() => {
                      //navigation.navigate("Cart");
                      console.log("successful");
                    })
                    .catch(() => {
                      console.log("unsuccessful");
                    });
                }
              }
              checkTargets();
            }}
            validationSchema={validation}
          >
            {(prop) => {
              return (
                <ScrollView>
                  <View style={{ marginTop: 5 }}>
                    {/* <Text style={styles.txt}>Title*</Text>
                    <TextInput
                      style={styles.inp}
                      inputMode="text"
                      autoCapitalize="words"
                      onChangeText={prop.handleChange("title")}
                      onBlur={prop.handleBlur("title")}
                      value={prop.values.title}
                    ></TextInput>
                    <Text
                      style={{
                        display:
                          prop.touched.title && prop.errors.title
                            ? "flex"
                            : "none",
                        color: "red",
                      }}
                    >
                      {prop.errors.title}
                    </Text> */}
                    <Text style={styles.txt}>Mobile Number*</Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View
                        style={{
                          borderWidth: 1,
                          padding: 8.6,
                          borderRightWidth: 0,
                          borderTopLeftRadius: 10,
                          borderBottomLeftRadius: 10,
                        }}
                      >
                        <Text style={{ fontSize: 20 }}>+123</Text>
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
                    {/* <Text style={styles.txt}>Email*</Text>
              <TextInput
                style={styles.inp}
                inputMode="email"
                onChangeText={(inp) => setEmail(inp.trim())}
                value={email}
                autoCapitalize="none"
                autoComplete="off"
              ></TextInput>{" "} */}

                    <Text style={styles.txt}>Select Duration*</Text>
                    <Picker
                      selectedValue={duration}
                      onValueChange={(itemValue) => setDuration(itemValue)}
                      dropdownIconColor={Themes.colors.green}
                      mode="dropdown"
                    >
                      <Picker.Item label="1 Month" value="1 Month" />
                      <Picker.Item label="3 Months" value="3 Months" />
                    </Picker>

                    <Text style={styles.txt}>Payment Schedule*</Text>
                    <Picker
                      selectedValue={paymentSchedule}
                      onValueChange={(itemValue) =>
                        setPaymentSchedule(itemValue)
                      }
                      mode="dropdown"
                      dropdownIconColor={Themes.colors.green}
                    >
                      <Picker.Item label="Weekly" value="Weekly" />
                      <Picker.Item label="Monthly" value="Monthly" />
                    </Picker>

                    <Text style={styles.txt}>Employment Status*</Text>
                    <Picker
                      selectedValue={employmentStatus}
                      onValueChange={(itemValue) =>
                        setEmploymentStatus(itemValue)
                      }
                      mode="dropdown"
                      dropdownIconColor={Themes.colors.green}
                    >
                      <Picker.Item label="Worker" value="Worker" />
                      <Picker.Item label="Employee" value="Employee" />
                      <Picker.Item
                        label="Self-Employed"
                        value="Self-Employed"
                      />
                    </Picker>

                    <Text style={styles.txt}>Occupation*</Text>
                    <TextInput
                      style={styles.inp}
                      inputMode="text"
                      autoCapitalize="words"
                      onChangeText={prop.handleChange("occupation")}
                      onBlur={prop.handleBlur("occupation")}
                      value={prop.values.occupation}
                    ></TextInput>
                    <Text
                      style={{
                        display:
                          prop.touched.occupation && prop.errors.occupation
                            ? "flex"
                            : "none",
                        color: "red",
                      }}
                    >
                      {prop.errors.occupation}
                    </Text>
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
    padding: 8,
    borderRadius: 10,
    fontSize: 20,
  },
  txt: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: Themes.fonts.text500,
  },
});
