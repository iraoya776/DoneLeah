import { useContext, useEffect, useState } from "react";
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
import { AppContext } from "../Components/globalVariables";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeftLong,
  faArrowRight,
  faChevronRight,
  faCreditCard,
  faEyeSlash,
  faFolderOpen,
  faHeart,
  faInfoCircle,
  faKey,
  faPeopleGroup,
  faQuestion,
  faUser,
  faUserClock,
  faUserPen,
  faUserXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Themes } from "../Components/Themes";
import { formatMoney } from "../Components/FormatMoney";
import { authentication, db } from "../../Firebase/Settings";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  where,
} from "firebase/firestore";
import { query } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Profile() {
  const navigation = useNavigation();
  const {
    userUID,
    setUserInfo,
    userInfo,
    setPreloader,
    setAllTargets,
    setDocID,
    setUserUID,
  } = useContext(AppContext);

  const [userBalance, setUserBalance] = useState(0);

  function removeSession() {
    //const auth = getAuth();

    signOut(authentication)
      .then(() => {
        // Sign-out successful.
        //console.log("Successful");
        navigation.navigate("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  }

  const [val, setVal] = useState(userInfo.balance);
  const [recent, setRecent] = useState(false);
  const [myVal, setMyVal] = useState(false);

  useEffect(() => {
    const getQ = async () => {
      const q = collection(db, "orders");
    };

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("visible");
        const updatedVal = JSON.parse(value);
      } catch (e) {
        // error reading value...
      }
    };
    getData();

    if (myVal === false) {
      setVal(userInfo.balance);
    } else if (myVal !== false) {
      //console.log("true");
      setVal("********");
    }
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={Themes.colors.primary}
        barStyle={"light-content"}
      />
      <View style={styles.container}>
        <View
          style={{
            //justifyContent: "space-between",
            //borderWidth: 1,
            height: "92%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              //alignSelf: "center",
            }}
          >
            <Image
              source={{
                uri:
                  userInfo.image ||
                  "https://img.freepik.com/free-photo/portrait-cool-man-with-sunglasses-dancing_23-2148851011.jpg?w=360&t=st=1708073800~exp=1708074400~hmac=cc3a95cbdfde08834fa4b22980fa082ffc907a3928c3eb1b6149240ae445ad38",
              }}
              style={{ width: 40, height: 40, borderRadius: 40 }}
            />
            <Text style={{ fontSize: 18, fontFamily: Themes.fonts.text800 }}>
              {"  "}
              {userInfo.firstName}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              marginTop: 5,
              height: 115,
              borderBottomRightRadius: 40,
              borderTopLeftRadius: 40,
              padding: 10,
              backgroundColor: Themes.colors.greenDark,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ color: "white", fontFamily: Themes.fonts.text400 }}
              >
                Balance:{"  "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  const storeData = async (value) => {
                    try {
                      await AsyncStorage.setItem(
                        "visible",
                        JSON.stringify(false)
                      );
                      const value = await AsyncStorage.getItem("visible");
                      const updatedVal = JSON.parse(value);
                      //console.log(updatedVal === false);
                      if (myVal === false) {
                        await AsyncStorage.setItem(
                          "visible",
                          JSON.stringify(!false)
                        );
                        const value2 = await AsyncStorage.getItem("visible");
                        const updatedVal2 = JSON.parse(value2);
                        setMyVal(updatedVal2);
                        //console.log(updatedVal2);
                        //console.log("Hey");
                      } else if (myVal === true) {
                        //console.log("hello");

                        await AsyncStorage.setItem(
                          "visible",
                          JSON.stringify(!true)
                        );
                        const value2 = await AsyncStorage.getItem("visible");
                        const updatedVal2 = JSON.parse(value2);
                        setMyVal(updatedVal2);
                      }
                    } catch (e) {
                      // saving error
                    }
                  };
                  storeData();
                }}
              >
                <FontAwesomeIcon icon={faEyeSlash} size={20} color="white" />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontFamily: Themes.fonts.text800,
                fontSize: 18,
                textAlign: "center",
                color: "white",
              }}
            >
              ₦ {val <= 0 ? 0 : val}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("History")}
              style={{
                backgroundColor: "white",
                alignSelf: "flex-end",
                borderRadius: 10,
                margin: 3,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: Themes.fonts.text500,
                  fontSize: 16,
                  color: Themes.colors.greenDark,
                }}
              >
                Transaction History
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 25,
            }}
          >
            <View
              style={{
                //borderWidth: 1,
                height: "95.5%",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("EditProfile")}
              >
                <View style={styles.design}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 15,
                    }}
                  >
                    <FontAwesomeIcon icon={faUserPen} size={20} />
                    <Text style={styles.txt}>Edit Profile</Text>
                  </View>
                  <FontAwesomeIcon icon={faChevronRight} size={18} />
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity>
                <View style={styles.design}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 15,
                    }}
                  >
                    <FontAwesomeIcon icon={faFolderOpen} size={20} />
                    <Text style={styles.txt}>Transaction History</Text>
                  </View>
                  <FontAwesomeIcon icon={faChevronRight} size={18} />
                </View>
              </TouchableOpacity> */}
              {/* <TouchableOpacity onPress={() => navigation.navigate("History")}>
                <View style={styles.design}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 15,
                    }}
                  >
                    <FontAwesomeIcon icon={faCreditCard} size={20} />
                    <Text style={styles.txt}>Transaction History</Text>
                  </View>
                  <FontAwesomeIcon icon={faChevronRight} size={18} />
                </View>
              </TouchableOpacity> */}

              <TouchableOpacity onPress={() => navigation.navigate("Wishlist")}>
                <View style={styles.design}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 15,
                    }}
                  >
                    <FontAwesomeIcon icon={faHeart} size={20} />
                    <Text style={styles.txt}>Wishlist</Text>
                  </View>
                  <FontAwesomeIcon icon={faChevronRight} size={18} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
                <View style={styles.design}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 15,
                    }}
                  >
                    <FontAwesomeIcon icon={faFolderOpen} size={20} />
                    <Text style={styles.txt}>Orders</Text>
                  </View>
                  <FontAwesomeIcon icon={faChevronRight} size={18} />
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => navigation.navigate("LeahInfo")}>
                <View style={styles.design}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 15,
                    }}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} size={20} />
                    <Text style={styles.txt}>Leah-Info</Text>
                  </View>
                  <FontAwesomeIcon icon={faChevronRight} size={18} />
                </View>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => navigation.navigate("ChangePassword")}
              >
                <View style={styles.design}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 15,
                    }}
                  >
                    <FontAwesomeIcon icon={faKey} size={20} />
                    <Text style={styles.txt}>Change Password</Text>
                  </View>
                  <FontAwesomeIcon icon={faChevronRight} size={18} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("DeleteAccount")}
              >
                <View style={styles.design}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 15,
                    }}
                  >
                    <FontAwesomeIcon icon={faUserXmark} size={20} />
                    <Text style={styles.txt}>Delete Account</Text>
                  </View>
                  <FontAwesomeIcon icon={faChevronRight} size={18} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            onPress={removeSession}
            style={{
              //borderWidth: 1,
              padding: 7,
              borderRadius: 10,
              backgroundColor: Themes.colors.primary,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontFamily: Themes.fonts.text700,
                color: "white",
              }}
            >
              Log-Out
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
    justifyContent: "space-between",
  },
  design: {
    //borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txt: {
    fontFamily: Themes.fonts.text400,
    fontSize: 17,
  },
});
