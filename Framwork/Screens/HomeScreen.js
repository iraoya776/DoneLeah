import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { Themes } from "../Components/Themes";
import { Avatar } from "react-native-paper";
import { useContext, useState } from "react";
import { AppContext } from "../Components/globalVariables";
import { useEffect } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { authentication, db } from "../../Firebase/Settings";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBell,
  faBook,
  faBowlFood,
  faBus,
  faCar,
  faCartShopping,
  faChair,
  faChild,
  faDog,
  faEyeSlash,
  faGamepad,
  faGlasses,
  faGlobe,
  faHandsHelping,
  faHandsHoldingChild,
  faHandshakeAngle,
  faHeart,
  faLightbulb,
  faMagnifyingGlass,
  faMobile,
  faMoneyBill,
  faMoneyBillTransfer,
  faPeopleGroup,
  faPhone,
  faPlug,
  faQuestion,
  faQuestionCircle,
  faRightLeft,
  faSchool,
  faShirt,
  faTv,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-native-reanimated-carousel";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Profile } from "./Profile";
import { number, object } from "yup";
import { useNavigation } from "@react-navigation/native";
import { LeahCategories } from "./LeahCategory";
import { deleteUser } from "firebase/auth";
import { ActiveTargets } from "./ActiveTargets";
import { Cart } from "./Cart";

const carouselLinks = [
  "https://img.freepik.com/free-vector/realistic-easter-background_23-2149327486.jpg?t=st=1712838476~exp=1712842076~hmac=1e9d0e0ebcbf91877f201ee0d78ebd78e81f2017617d8fdfed4edb97988b11fa&w=740",
  "https://img.freepik.com/free-vector/realistic-golden-easter-illustration_52683-58663.jpg?t=st=1712838526~exp=1712842126~hmac=6b34243cdede8654fc4cb8694b7015f2d41901aaceabdd5abf73b37e00462fb1&w=740",
  "https://img.freepik.com/free-vector/modern-trendy-golden-metallic-shiny-typography-happy-easter-background-easter-eggs_87521-2895.jpg?t=st=1712838569~exp=1712842169~hmac=a3d5d639b8afb3409ec8e673d51d7e9b505f5948703bee98a801be0e893809d5&w=740",
];

const easterLinks = [
  "https://img.freepik.com/premium-photo/happy-easter-day-white-egg-minimalist-design_626849-8789.jpg?w=740",
  "https://img.freepik.com/premium-photo/happy-easter-day-green-color-tulip-flower-egg_626849-8742.jpg?w=740",
  "https://img.freepik.com/premium-photo/white-bunny-rabbit-easter-day-design_626849-8819.jpg?w=740",
  "https://img.freepik.com/premium-photo/easter-day-design-background-blue-sky-color-butterfly_626849-8787.jpg?w=740",
];

export function Home({ route }) {
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
    groupInfo,
    setGroupInfo,
  } = useContext(AppContext);

  const screenWidth = Dimensions.get("screen").width;
  const [targets, setTargets] = useState([]);

  async function getUserInfo() {
    onSnapshot(doc(db, "users", userUID), (snapshot) => {
      //console.log(snapshot.data());
      if (snapshot.exists()) {
        setUserInfo(snapshot.data());
      }
    });
  }

  useEffect(() => {
    const q = collection(db, "targets");
    //const filter = query(q, where("price", ">", "500, 000"));
    onSnapshot(q, (snapshot) => {
      const allData = [];
      snapshot.forEach((item) => {
        allData.push({
          ...item.data(),
          targetID: item.id,
        });
      });
      // setJobs(allData.slice(0, 3));
      setAllTargets(allData);
      setTargets(allData);
    });
    getUserInfo();
  }, []);

  async function checkUser() {
    const q = query(
      collection(db, "groupForTargets"),
      where("userUID", "==", userUID)
    );
    const q2 = query(
      collection(db, "groupForTargets"),
      where("userUID2", "==", userUID)
    );
    const q3 = query(
      collection(db, "groupForTargets"),
      where("userUID3", "==", userUID)
    );
    const q4 = query(
      collection(db, "groupForTargets"),
      where("userUID4", "==", userUID)
    );
    const q5 = query(
      collection(db, "groupForTargets"),
      where("userUID5", "==", userUID)
    );
    const querySnapshot = await getDocs(q);
    const querySnapshot2 = await getDocs(q2);
    const querySnapshot3 = await getDocs(q3);
    const querySnapshot4 = await getDocs(q4);
    const querySnapshot5 = await getDocs(q5);

    if (
      querySnapshot.empty === false ||
      querySnapshot2.empty === false ||
      querySnapshot3.empty === false ||
      querySnapshot4.empty === false ||
      querySnapshot5.empty === false
    ) {
      navigation.navigate("GroupTargetScreen");
    } else {
      Alert.alert(
        "Message!",
        "You are not involved in any group at the moment",
        [{ text: "Ok" }]
      );
    }
  }

  async function checkCart() {
    const q = collection(db, "groupForTargets");
    const filter = query(q, where("userUID", "==", userUID));
    const filter2 = query(q, where("userUID2", "==", userUID));
    const filter3 = query(q, where("userUID3", "==", userUID));
    const filter4 = query(q, where("userUID4", "==", userUID));
    const filter5 = query(q, where("userUID5", "==", userUID));

    const querySnapshot = await getDocs(filter);
    const querySnapshot2 = await getDocs(filter2);
    const querySnapshot3 = await getDocs(filter3);
    const querySnapshot4 = await getDocs(filter4);
    const querySnapshot5 = await getDocs(filter5);

    let groupName;
    if (
      querySnapshot.empty === true &&
      querySnapshot2.empty === true &&
      querySnapshot3.empty === true &&
      querySnapshot4.empty === true &&
      querySnapshot5.empty === true
    ) {
      navigation.navigate("Cart");
    } else if (querySnapshot.empty === false) {
      querySnapshot.forEach((all) => {
        setGroupInfo(all.data().groupName);
        groupName = all.data().groupName;
      });
      navigation.navigate("GroupCart", { groupInfo, groupName });
    } else if (querySnapshot.empty === true) {
      querySnapshot2.forEach((all) => {
        setGroupInfo(all.data().groupName);
        groupName = all.data().groupName;
      });
      navigation.navigate("GroupCart", { groupInfo, groupName });
    } else if (querySnapshot2.empty === true) {
      querySnapshot3.forEach((all) => {
        setGroupInfo(all.data().groupName);
        groupName = all.data().groupName;
      });
      navigation.navigate("GroupCart", { groupInfo, groupName });
    } else if (querySnapshot3.empty === true) {
      querySnapshot4.forEach((all) => {
        setGroupInfo(all.data().groupName);
        groupName = all.data().groupName;
      });
      navigation.navigate("GroupCart", { groupInfo, groupName });
    } else if (querySnapshot4.empty === true) {
      querySnapshot5.forEach((all) => {
        setGroupInfo(all.data().groupName);
        groupName = all.data().groupName;
      });
      navigation.navigate("GroupCart", { groupInfo, groupName });
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={Themes.colors.primary}
        barStyle={"light-content"}
      />
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            onPressIn={() => navigation.navigate("SearchScreen")}
            style={{
              borderWidth: 1,
              padding: 4,
              paddingLeft: 15,
              fontSize: 17,
              width: "100%",
            }}
            placeholder="Search through Leah"
          ></TextInput>
          <View
            style={{
              position: "absolute",
              right: 10,
              borderWidth: 1,
              padding: 8,
              top: 10,
              backgroundColor: "black",
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="white" />
          </View>
        </View>

        <View>
          <View style={{ flex: 1 }}>
            <Carousel
              loop
              width={screenWidth}
              height={170}
              autoPlay={true}
              data={carouselLinks}
              scrollAnimationDuration={3000}
              //onSnapToItem={(index) => {console.log("2");}}
              renderItem={({ index }) => (
                <View
                  style={{
                    height: 170,
                    width: "100%",
                    // flex: 1,
                    // borderWidth: 1,
                    // justifyContent: 'center',
                    margin: 10,
                  }}
                >
                  <Image
                    style={{
                      width: "100%",
                      height: 170,
                      borderRadius: 10,
                      //justifyContent: "flex-end",
                    }}
                    source={{ uri: carouselLinks[index] }}
                  />
                </View>
              )}
            />
          </View>
          <View style={{ padding: 10 }}>
            <Text
              style={{
                fontFamily: Themes.fonts.text500,
                fontSize: 16,
                marginBottom: 5,
                marginTop: 10,
              }}
            >
              Start Shopping...
            </Text>
            <View
              style={{
                //borderWidth: 1,
                height: 122,
                marginVertical: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  //borderWidth: 1,
                  width: "49%",
                  height: 120,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Category", {
                      userInfo,
                    });
                    setAllCategory("Phones");
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{
                      uri: "https://img.freepik.com/free-psd/smartphone-with-touch-screen-gray-background-3d-rendering_1142-61358.jpg?w=740&t=st=1708098426~exp=1708099026~hmac=4e76bd2ce1d72fd857c24ca72e9a24411ad47eb346f636e0d8ede08645aaeca8",
                    }}
                    style={{ width: "100%", height: 90, borderRadius: 10 }}
                  />
                  <Text style={{ fontFamily: Themes.fonts.text400 }}>
                    Phones
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  //borderWidth: 1,
                  width: "49%",
                  height: 120,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Category", {
                      userInfo,
                    });
                    setAllCategory("Laptops");
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{
                      uri: "https://img.freepik.com/free-photo/electronic-device-balancing-concept_23-2150422322.jpg?w=740&t=st=1708098082~exp=1708098682~hmac=544be06e372d6c16c14c9039977aa1ac7eaf87160656dc47c618c13d144ccef3",
                    }}
                    style={{ width: "100%", height: 90, borderRadius: 10 }}
                  />
                  <Text style={{ fontFamily: Themes.fonts.text400 }}>
                    Laptops
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                //borderWidth: 1,
                height: 122,
                marginVertical: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  //borderWidth: 1,
                  width: "49%",

                  height: 120,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Category", {
                      userInfo,
                    });
                    setAllCategory("PCs");
                  }}
                  style={{
                    //borderWidth: 1,
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{
                      uri: "https://img.freepik.com/premium-photo/shot-desktop-computer-keyboard-mouse-creative-modern-office-generative-ai_39665-664.jpg?w=740",
                    }}
                    style={{ width: "100%", height: 90, borderRadius: 10 }}
                  />
                  <Text style={{ fontFamily: Themes.fonts.text600 }}>PCs</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  //borderWidth: 1,
                  width: "49%",
                  //alignItems: "center",
                  height: 120,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Category", {
                      userInfo,
                    });
                    setAllCategory("Accessories");
                  }}
                  style={{
                    //borderWidth: 1,
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{
                      uri: "https://img.freepik.com/free-photo/flat-lay-keyboard-headphones-with-copy-space_23-2148397826.jpg?w=740&t=st=1708099066~exp=1708099666~hmac=4e07e2da176aa2dc494302f54b81115268b0cd3214d1564b05308fdb6940024c",
                    }}
                    style={{
                      width: "100%",
                      height: 90,
                      borderRadius: 10,
                      resizeMode: "stretch",
                    }}
                  />
                  <Text style={{ fontFamily: Themes.fonts.text600 }}>
                    Accessories
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={{ marginTop: 5, marginBottom: 5 }}>
              <Text style={{ fontFamily: Themes.fonts.text700, fontSize: 16 }}>
                Top Brands
              </Text>
            </View> */}
            {/* <ScrollView horizontal>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity>
                  <View
                    style={{
                      // borderWidth: 1,
                      height: 130,
                      width: 130,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://img.freepik.com/free-vector/flat-design-hp-ph-logo_23-2149239520.jpg?w=740&t=st=1708174850~exp=1708175450~hmac=2b5c45a77246005b53f09cb20ece465e13767cce95348547ffc1e60b59c797ea",
                      }}
                      style={{ width: "90%", height: 105 }}
                    />
                    <Text style={{ fontSize: 16 }}>HP</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      // borderWidth: 1,
                      height: 130,
                      width: 130,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://img.freepik.com/premium-photo/humpolec-czech-republic-january-14-2022-apple-company-logo-button-web-app-phone_933530-8707.jpg?w=826",
                      }}
                      style={{ width: "90%", height: 105 }}
                    />
                    <Text style={{ fontSize: 16 }}>Apple</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      // borderWidth: 1,
                      height: 130,
                      width: 130,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://img.freepik.com/premium-photo/phone-with-colorful-landscape-it_882186-285.jpg?w=740",
                      }}
                      style={{ width: "90%", height: 105 }}
                    />
                    <Text style={{ fontSize: 16 }}>Samsung</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      //borderWidth: 1,
                      height: 130,
                      width: 130,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://img.freepik.com/premium-photo/sleek-laptop-mockup-trendy-background-highquality-realistic-effective-marketing_763042-4746.jpg?w=360",
                      }}
                      style={{ width: "90%", height: 105 }}
                    />
                    <Text style={{ fontSize: 16 }}>Dell</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      //borderWidth: 1,
                      height: 130,
                      width: 130,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://img.freepik.com/free-photo/view-3d-laptop-device-with-screen-keyboard_23-2150714005.jpg?t=st=1708175763~exp=1708179363~hmac=0958a93bc1f8ff04f299504d0a1f0a3898846fc0c62b8c3bd742f2e2ed5fe8c2&w=740",
                      }}
                      style={{ width: "90%", height: 105 }}
                    />
                    <Text style={{ fontSize: 16 }}>Toshiba</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView> */}
          </View>

          {/* <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 16, fontFamily: Themes.fonts.text700 }}>
              Targets below ₦ 500, 000
            </Text>
          </View> */}
          {/* <View style={{ flex: 1, padding: 10 }}>
            <Carousel
              loop
              width={screenWidth}
              height={220}
              data={easterLinks}
              scrollAnimationDuration={3000}
              //onSnapToItem={(index) => {console.log("2");}}
              renderItem={({ index }) => (
                <View
                  style={{
                    height: 220,
                    width: "100%",
                    // flex: 1,
                    // borderWidth: 1,
                    // justifyContent: 'center',
                    margin: 10,
                  }}
                >
                  <TouchableOpacity>
                    <ImageBackground
                      style={{
                        width: "100%",
                        height: 220,
                        borderRadius: 10,
                        resizeMode: "stretch",
                      }}
                      source={{ uri: easterLinks[index] }}
                    >
                      <Image
                        source={{
                          uri: "https://img.freepik.com/premium-photo/10-percent-discount-offers-tag-with-gold-style-design_2239-21039.jpg?w=740",
                        }}
                        style={{
                          width: 110,
                          height: "40%",
                          borderRadius: 40,
                          marginLeft: 5,
                          alignSelf: "flex-start",
                        }}
                      />
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View> */}
          {/* <View style={{ padding: 10, height: 265 }}>
            <Text style={{ fontSize: 17, fontFamily: Themes.fonts.text700 }}>
              Products below ₦250, 000
            </Text>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity style={{ width: "48%", height: 230 }}>
                <View
                  style={{
                    //borderWidth: 1,
                    height: 230,
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{
                      uri: "https://img.freepik.com/premium-psd/tablet-touchscreen-keyboard-isolated-black-mockup_117023-2985.jpg?w=740",
                    }}
                    style={{ width: "100%", height: 200, borderRadius: 10 }}
                  />
                  <Text style={{ fontFamily: Themes.fonts.text700 }}>
                    Hp EliteBook
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ height: 230, width: "48%" }}>
                <View
                  style={{
                    //borderWidth: 1,
                    height: 230,
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{
                      uri: "https://img.freepik.com/free-photo/smartphone-balancing-with-pink-background_23-2150271746.jpg?w=740&t=st=1708199318~exp=1708199918~hmac=922e05f059db57f6ddbae17c7e57eb9f0f958189e244ef10deba8e11c941b97e",
                    }}
                    style={{ width: "100%", height: 200, borderRadius: 10 }}
                  />
                  <Text style={{ fontFamily: Themes.fonts.text700 }}>
                    Samsung Galaxy A04s
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{ fontFamily: Themes.fonts.text700, fontSize: 17 }}>
              Products above ₦250, 000
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity style={{ height: 230, width: "48%" }}>
                <View style={{ height: 230, width: "100%" }}>
                  <Image
                    source={{
                      uri: "https://img.freepik.com/premium-photo/3d-laptops-white-background_751108-623.jpg?w=740",
                    }}
                    style={{ width: "100%", height: 200, borderRadius: 10 }}
                  />
                  <Text style={{ fontFamily: Themes.fonts.text700 }}>
                    HP OptiPlex 3020 SFF
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ height: 230, width: "48%" }}>
                <View style={{ height: 230, width: "100%" }}>
                  <Image
                    source={{
                      uri: "https://img.freepik.com/free-psd/elegant-computer-mockup_1310-736.jpg?w=740&t=st=1708200726~exp=1708201326~hmac=eb14d846526c9414bd24455cc1e8f3586845afc0f4b56158f4c373212d31038b",
                    }}
                    style={{ width: "100%", height: 200, borderRadius: 10 }}
                  />
                  <Text style={{ fontFamily: Themes.fonts.text700 }}>
                    Hp EliteBook 840 G5 Intel Core I5
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{ fontFamily: Themes.fonts.text700, fontSize: 17 }}>
              Others
            </Text>
            <View
              style={{
                marginTop: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity style={{ width: "48%", height: 230 }}>
                <View style={{ width: "100%", height: 230 }}>
                  <Image
                    source={{
                      uri: "https://img.freepik.com/free-photo/laptop-with-colorful-screen-gray-background-3d-rendering_1142-45900.jpg?t=st=1708201666~exp=1708205266~hmac=3a1c0b8a5ae139a367acdb57f4d70586748259bf9d9e8e6658b0fbce4d49dccc&w=740",
                    }}
                    style={{ width: "100%", height: 200, borderRadius: 10 }}
                  />
                  <Text style={{ fontFamily: Themes.fonts.text700 }}>
                    Ipason MaxBook P1 Pro
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: "48%", height: 230 }}>
                <View
                  style={{ width: "100%", height: 230, alignItems: "center" }}
                >
                  <Image
                    source={{
                      uri: "https://img.freepik.com/premium-photo/photo-featuring-hyper-detailed-shot-minimalist-laptop-stand_933496-26478.jpg?w=826",
                    }}
                    style={{ width: "100%", height: 200, borderRadius: 10 }}
                  />
                  <Text style={{ fontFamily: Themes.fonts.text700 }}>
                    Macson Laptop Stand
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

export function HomeScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let size;
          if (route.name === "Home") {
            size = focused ? 35 : 23;
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Categories") {
            size = focused ? 35 : 23;
            iconName = focused ? "view-grid" : "view-grid-outline";
          } else if (route.name === "Target") {
            size = focused ? 35 : 23;
            iconName = focused ? "account-clock" : "account-clock-outline";
          } else if (route.name === "Cart") {
            size = focused ? 36 : 23;
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Profile") {
            size = focused ? 35 : 23;
            iconName = focused ? "account" : "account-outline";
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: Themes.colors.primary,
        tabBarInactiveTintColor: Themes.colors.primary,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Categories" component={LeahCategories} /> */}
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Target" component={ActiveTargets} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : null,
    padding: 10,
    //justifyContent: "space-between",
  },
  img: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 50,
  },
  input: {
    //backgroundColor: "red",
    width: 50,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "white",
  },
  design: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  firstView: {
    borderWidth: 1,
    padding: 50,
    marginVertical: 10,
    borderRadius: 20,
    borderColor: Themes.colors.primary,
    backgroundColor: Themes.colors.redMedium,
  },
  secondView: {
    //borderWidth: 1,
    padding: 100,
    //borderRadius: 20,
    marginVertical: 5,
    borderColor: "white",
  },
  thirdView: {
    borderWidth: 1,
    marginVertical: 5,
    padding: 50,
    borderRadius: 20,
    //borderColor: "white",
  },
  tg: {
    fontSize: 17,
    color: Themes.colors.primary1,
    fontFamily: Themes.fonts.text300,
    //fontWeight: "00",
  },
  fourthView: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 100,
  },
});
