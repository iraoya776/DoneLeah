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
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              //borderWidth: 1,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{
                  uri:
                    userInfo.image ||
                    "https://img.freepik.com/free-photo/portrait-cool-man-with-sunglasses-dancing_23-2148851011.jpg?w=360&t=st=1708073800~exp=1708074400~hmac=cc3a95cbdfde08834fa4b22980fa082ffc907a3928c3eb1b6149240ae445ad38",
                }}
                style={{ width: 40, height: 40, borderRadius: 40 }}
              />
              <Text style={{ fontSize: 18, fontFamily: Themes.fonts.text700 }}>
                {"  "}
                {userInfo.firstName}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <FontAwesomeIcon icon={faUserPen} size={22} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              //marginTop: 5,
              //borderWidth: 1,
              height: 100,
              backgroundColor: Themes.colors.greenDark,
              padding: 10,
              justifyContent: "center",
              //alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white" }}>Balance:</Text>
            <Text
              style={{
                fontFamily: Themes.fonts.text800,
                color: "white",
                fontSize: 20,
                //alignSelf: "center",
                //marginTop: 5,
              }}
            >
              ₦ {userInfo.balance}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("History")}
              style={{
                backgroundColor: "white",
                padding: 2,
                width: "50%",
                alignSelf: "flex-end",
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: Themes.fonts.text500,
                  fontSize: 15,
                  textAlign: "center",
                }}
              >
                Transaction History
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 15,
            }}
          >
            <View
              style={{
                //borderWidth: 1,
                height: "84.5%",
                justifyContent: "space-between",
              }}
            >
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
                    <Text style={styles.txt}>Orders</Text>
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
