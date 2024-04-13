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
  faPeopleGroup,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Components/globalVariables";
import { db, firebaseDB } from "../../Firebase/Settings";
import { child, get, onValue, ref, set } from "firebase/database";
import { Formik } from "formik";
import * as yup from "yup";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";

const validation = yup.object({
  groupName: yup
    .string()
    .required(
      "please make sure you are not involved in any group at the moment and the entered group name is unique"
    )
    .min(4)
    .max(22),
});

export function CreateGroup() {
  const {
    userUID,
    userInfo,
    setPreloader,
    setAllTargets,
    allTargets,
    setAllCategory,
    allCategory,
    setTargetID,
  } = useContext(AppContext);
  const navigation = useNavigation();
  const userUID2 = "";
  const userUID3 = "";
  const userUID4 = "";
  const userUID5 = "";

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
            <Text style={{ fontFamily: Themes.fonts.text800, fontSize: 18 }}>
              Create Group
            </Text>
          </View>
          <View
            style={{
              height: Dimensions.get("screen").height * 0.85,
              //borderWidth: 1,
              //justifyContent: "center",
            }}
          >
            <View
              style={{
                //borderWidth: 1,
                marginTop: 15,
                height: Dimensions.get("screen").height * 0.4,
              }}
            >
              <Image
                source={require("../../assets/people.png")}
                style={{
                  height: "100%",
                  width: "100%",
                  //borderWidth: 1,
                  borderRadius: 220,
                }}
              />
            </View>
            <View
              style={{
                //borderWidth: 1,
                height: Dimensions.get("screen").height * 0.42,
                justifyContent: "space-between",
              }}
            >
              <Formik
                initialValues={{ groupName: "" }}
                onSubmit={(value) => {
                  const q = collection(db, "groupForTargets");
                  async function checkGroup() {
                    const q = query(
                      collection(db, "groupForTargets"),
                      where("groupName", "==", value.groupName)
                    );
                    const q2 = query(
                      collection(db, "groupForTargets"),
                      where("userUID", "==", userUID)
                    );
                    const q3 = query(
                      collection(db, "groupForTargets"),
                      where("userUID2", "==", userUID)
                    );
                    const q4 = query(
                      collection(db, "groupForTargets"),
                      where("userUID3", "==", userUID)
                    );
                    const q5 = query(
                      collection(db, "groupForTargets"),
                      where("userUID4", "==", userUID)
                    );
                    const q6 = query(
                      collection(db, "groupForTargets"),
                      where("userUID5", "==", userUID)
                    );

                    setPreloader(true);
                    const querySnapshot = await getDocs(q);
                    const querySnapshot2 = await getDocs(q2);
                    const querySnapshot3 = await getDocs(q3);
                    const querySnapshot4 = await getDocs(q4);
                    const querySnapshot5 = await getDocs(q5);
                    const querySnapshot6 = await getDocs(q6);

                    if (
                      querySnapshot.empty === false &&
                      (querySnapshot2.empty === false ||
                        querySnapshot3.empty === false ||
                        querySnapshot4.empty === false ||
                        querySnapshot5.empty === false ||
                        querySnapshot6.empty === false)
                    ) {
                      setPreloader(false);
                      console.log(
                        "Please make sure you are not involved in any group, and groupName is unique"
                      );
                    } else if (
                      querySnapshot.empty === true &&
                      querySnapshot2.empty === true &&
                      querySnapshot3.empty === true &&
                      querySnapshot4.empty === true &&
                      querySnapshot5.empty === true &&
                      querySnapshot6.empty === true
                    ) {
                      setPreloader(false);
                      const myDocumentData = {
                        groupName: value.groupName,
                        status: "active",
                        userUID,
                        userUID2,
                        userUID3,
                        userUID4,
                        userUID5,
                        createdAt: new Date().getTime(),
                      };
                      const docRef = doc(db, "groupForTargets", userUID);
                      setPreloader(false);
                      setDoc(docRef, myDocumentData)
                        .then(() => {
                          setPreloader(false);
                          Alert.alert(
                            "Message!",
                            `"${value.groupName}" has been made successfully`,
                            [{ text: "Ok" }]
                          );
                        })
                        .catch(() => {
                          setPreloader(false);
                          console.log("unsuccessful");
                        });

                      const q = query(
                        collection(db, "cart"),
                        where("userUID", "==", userUID)
                      );
                      const querySnapshot = await getDocs(q);
                      const allData = [];
                      setPreloader(false);
                      querySnapshot.docs.forEach((userDocRef) => {
                        updateDoc(userDocRef.ref, {
                          groupName: value.groupName,
                        })
                          .then(() => {
                            setPreloader(false);
                            console.log(`${value.groupName} added succesfully`);
                          })
                          .catch(() => {
                            setPreloader(false);
                            console.log("error");
                          });
                      });

                      const myDocumentData2 = {
                        groupName: value.groupName,
                        name: userInfo.firstName + " " + userInfo.lastName,
                        image: userInfo.image,
                        comment: userInfo.firstName + " just created a group",
                        userUID: userInfo.userUID,
                        createdAt: new Date().getTime(),
                      };
                      const myDocRef3 = collection(db, "groupComments");
                      setPreloader(false);
                      addDoc(myDocRef3, myDocumentData2)
                        .then(() => {
                          setPreloader(false);
                          navigation.navigate("GroupTargetScreen");
                          console.log(
                            "users liable for comment added successfully"
                          );
                        })
                        .catch(() => {
                          setPreloader(false);
                          console.log("unsuccessful");
                        });
                    }
                  }
                  checkGroup();
                }}
                validationSchema={validation}
              >
                {(prop) => {
                  return (
                    <View style={{ marginTop: 10 }}>
                      <Text style={styles.txt}> Group Name*</Text>
                      <TextInput
                        style={styles.inp}
                        inputMode="text"
                        placeholder="Best Buddies"
                        onBlur={prop.handleBlur("groupName")}
                        onChangeText={prop.handleChange("groupName")}
                        value={prop.values.groupName}
                        //onChangeText={}
                      ></TextInput>
                      <Text
                        style={{
                          //marginBottom: 4,
                          display:
                            prop.touched.groupName && prop.errors.groupName
                              ? "flex"
                              : "none",
                          color: "red",
                        }}
                      >
                        {prop.errors.groupName}
                      </Text>

                      <View
                        style={{
                          //borderWidth: 1,
                          height:
                            prop.values.groupName.length < 1 ? "70%" : "75%",
                          justifyContent: "flex-end",
                        }}
                      >
                        <TouchableOpacity
                          onPress={prop.handleSubmit}
                          style={{
                            padding: 8,
                            borderRadius: 10,
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
            </View>
          </View>
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
  txt: {
    fontFamily: Themes.fonts.text600,
    fontWeight: "600",
    fontSize: 16,
  },
  inp: {
    fontSize: 18,
    padding: 3,
    borderWidth: 1,
    borderRadius: 10,
  },
});
