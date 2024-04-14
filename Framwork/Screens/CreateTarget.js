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
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Formik } from "formik";
import * as yup from "yup";
import { useContext } from "react";
import { AppContext } from "../Components/globalVariables";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/Settings";

const validation = yup.object({
  targetName: yup
    .string()
    .required("please make sure target name is unique")
    .min(4)
    .max(25),
});

export function CreateTarget() {
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
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faArrowLeftLong} size={22} />
            </TouchableOpacity>
            <Text style={{ fontFamily: Themes.fonts.text800, fontSize: 18 }}>
              Create Target
            </Text>
            <TouchableOpacity>
              <FontAwesomeIcon
                icon={faHome}
                size={22}
                color={Themes.colors.greenDark}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 15,
              height: Dimensions.get("screen").height * 0.4,
            }}
          >
            <Image
              source={require("../../assets/target.png")}
              style={{ width: "100%", height: "100%", borderRadius: 220 }}
            />
          </View>
          <Formik
            initialValues={{ targetName: "" }}
            onSubmit={(value) => {
              //const q = collection(db, "setActiveTargets");
              async function checkDoc() {
                // const q = query(
                //   collection(db, "setActiveTargets"),
                //   where("targetName", "==", value.targetName)
                // );
                const qColl = query(
                  collection(db, "groupForTargets"),
                  where("groupName", "==", value.targetName)
                );
                const q2 = collection(db, "targetDetails");
                const filter = query(
                  q2,
                  where("targetName", "==", value.targetName)
                );
                //const filter2 = query(q2, where("userUID", "==", userUID));
                const querySnapshot = await getDocs(filter);
                //const querySnapshot2 = await getDocs(filter2);
                const querySnapshot3 = await getDocs(qColl);
                if (querySnapshot3.empty === false) {
                  Alert.alert(
                    "Unsuccessful",
                    `${value.targetName} already exist`
                  );
                } else if (
                  querySnapshot.empty === true &&
                  querySnapshot3.empty === true
                ) {
                  const myDocumentData = {
                    targetName: value.targetName,
                    userUID: userInfo.userUID,
                    status: "active",
                    createdAt: new Date().getTime(),
                  };
                  const docRef = doc(db, "setActiveTargets", userUID);
                  setPreloader(true);
                  setDoc(docRef, myDocumentData)
                    .then(() => {
                      setPreloader(false);
                      console.log("target successfully made");
                    })
                    .catch(() => {
                      setPreloader(false);
                      console.log("unsuccessful");
                    });

                  const q = query(
                    collection(db, "cart"),
                    where("userUID", "==", userUID)
                  );
                  const querySnapshot3 = await getDocs(q);
                  const allData = [];
                  setPreloader(false);
                  querySnapshot3.docs.forEach((userDocRef) => {
                    updateDoc(userDocRef.ref, {
                      targetName: value.targetName,
                    })
                      .then(() => {
                        setPreloader(false);
                        console.log(`${value.targetName} added succesfully`);
                        navigation.navigate("ActiveTargets");
                      })
                      .catch(() => {
                        setPreloader(false);
                        console.log("error");
                      });
                  });
                }
              }
              checkDoc();
            }}
            validationSchema={validation}
          >
            {(prop) => {
              return (
                <View>
                  <Text style={{ fontFamily: Themes.fonts.text500 }}>
                    Target Name*
                  </Text>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      fontSize: 17,
                      paddingLeft: 10,
                      padding: 1,
                      borderRadius: 10,
                    }}
                    placeholder="Apple Laptop Wish"
                    inputMode="text"
                    onBlur={prop.handleBlur("targetName")}
                    onChangeText={prop.handleChange("targetName")}
                    value={prop.values.targetName}
                  ></TextInput>
                  <Text
                    style={{
                      //marginBottom: 4,
                      display:
                        prop.touched.targetName && prop.errors.targetName
                          ? "flex"
                          : "none",
                      color: "red",
                    }}
                  >
                    {prop.errors.targetName}
                  </Text>
                  <View
                    style={{
                      //borderWidth: 1,
                      height:
                        prop.values.targetName.length >= 1 ? "55.5%" : "54.5%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <TouchableOpacity
                      onPress={prop.handleSubmit}
                      style={{
                        //borderWidth: 1,
                        padding: 8,
                        borderRadius: 10,
                        marginTop: 5,
                        backgroundColor: Themes.colors.primary,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: Themes.fonts.text800,
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        Continue
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
});
