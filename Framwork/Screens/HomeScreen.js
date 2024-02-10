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
  ScrollView,
} from "react-native";
import { Themes } from "../Components/Themes";
import { Avatar } from "react-native-paper";
import { useContext, useState } from "react";
import { AppContext } from "../Components/globalVariables";
import { useEffect } from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../Firebase/Settings";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBell,
  faBook,
  faBowlFood,
  faBus,
  faCar,
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
  faMobile,
  faMoneyBill,
  faMoneyBillTransfer,
  faPeopleGroup,
  faPhone,
  faPlug,
  faQuestion,
  faQuestionCircle,
  faSchool,
  faShirt,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-native-reanimated-carousel";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Shop } from "./Shop";
import { Help } from "./Help";
import { Sell } from "./Sell";
import { Profile } from "./Profile";

const carouselLinks = [
  "https://img.freepik.com/free-vector/bank-credit-finance-management-loan-agreement-signing-mortgage-money-credit_335657-3136.jpg?w=740&t=st=1707052909~exp=1707053509~hmac=0a88a180f5e2369119a4f5d55aff3a83752302b50add5dce2c925a06dd320921",
  "https://img.freepik.com/free-vector/financial-obligation-document-promissory-bill-loan-agreement-debt-return-promise-issuer-payee-signing-contract-businessmen-making-deal-vector-isolated-concept-metaphor-illustration_335657-2803.jpg?w=740&t=st=1707052966~exp=1707053566~hmac=618a9d29abcb9114a97412e2476beb06b586b9bb1e17c5143b418a49d7764fb4",
  "https://img.freepik.com/free-vector/e-wallet-concept-illustration_114360-7561.jpg?w=740&t=st=1707053009~exp=1707053609~hmac=527f3e5c3490493ddd4dafdea3dccc11dfc6c7f187ba739451460dcceee76e65",
];

export function Home({ navigation }) {
  const {
    userUID,
    setUserInfo,
    userInfo,
    setPreloader,
    setAllTargets,
    setDocID,
  } = useContext(AppContext);
  const [targets, setTargets] = useState([]);
  const [isBalanceVisible, setIsBalanceVisible] = useState([]);
  const screenWidth = Dimensions.get("screen").width;

  async function getUserInfo() {
    onSnapshot(doc(db, "users", userUID), (snapshot) => {
      //console.log(snapshot.data());
      if (snapshot.exists()) {
        setUserInfo(snapshot.data());
      }
    });
  }

  useEffect(() => {
    // console.log(userUID);
    const q = collection(db, "targets");
    const filter = query(q, where("provider", "==", "provider"));
    onSnapshot(q, (snapshot) => {
      const allData = [];
      snapshot.forEach((item) => {
        allData.push({ ...item.data(), targetID: item.id });
      });
      // setJobs(allData.slice(0, 3));
      setTargets(allData);
      //console.log("ghxhgh");
      //console.log(allData);
    });
    getUserInfo();
  }, []);

  function balanceVisibility() {
    setIsBalanceVisible(!isBalanceVisible);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.design}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Profile", {
                    userInfo,
                  });
                }}
                style={styles.input}
              >
                <Image source={{ uri: userInfo.image }} style={styles.img} />
              </TouchableOpacity>

              <Text style={{ fontSize: 20, fontFamily: Themes.fonts.text600 }}>
                {} Hi, {userInfo.firstName}
              </Text>
            </View>
            <TouchableOpacity>
              <FontAwesomeIcon
                icon={faBell}
                size={22}
                style={{ color: Themes.colors.primary }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 100,
              backgroundColor: Themes.colors.primary,
              borderRadius: 20,
              marginTop: 10,
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5,
                  marginLeft: 10,
                }}
              >
                <Text style={{ color: "white", fontSize: 20, marginLeft: 10 }}>
                  Credit Balance{"  "}
                </Text>
                <FontAwesomeIcon icon={faEyeSlash} size={20} color="white" />
              </View>
              <View
                style={{
                  //width: "40%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 17, color: "white", marginLeft: 40 }}>
                  {isBalanceVisible ? `${userInfo.balance}` : `****`}
                </Text>

                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    //alignItems: "flex-end",
                    //alignSelf: "flex-end",

                    padding: 10,
                    borderRadius: 40,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Themes.fonts.text600,
                      fontWeight: "700",
                      fontSize: 18,
                    }}
                  >
                    See Details
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Carousel
              loop
              width={screenWidth}
              height={150}
              autoPlay={true}
              data={carouselLinks}
              scrollAnimationDuration={3000}
              //onSnapToItem={(index) => {console.log("2");}}
              renderItem={({ index }) => (
                <View
                  style={{
                    height: 150,
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
                      height: 150,
                      borderRadius: 10,
                      //justifyContent: "flex-end",
                    }}
                    source={{ uri: carouselLinks[index] }}
                  />
                </View>
              )}
            />
          </View>

          <View
            style={{
              //borderWidth: 1,
              padding: 30,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert("stop rushing me man");
                }}
              >
                <FontAwesomeIcon
                  icon={faQuestion}
                  size={25}
                  style={{ color: Themes.colors.primary1 }}
                />
                <Text>Set Target</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity>
                <FontAwesomeIcon
                  icon={faHandsHelping}
                  size={25}
                  style={{ color: Themes.colors.primary1, alignSelf: "center" }}
                />
                <Text>Donations</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              //borderWidth: 1,
              height: 70,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() => {
                  {
                    navigation.navigate("Devices");
                  }
                  userInfo;
                }}
              >
                <FontAwesomeIcon
                  icon={faMobile}
                  size={22}
                  style={{ color: Themes.colors.primary, alignSelf: "center" }}
                />
                <Text>Devices</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  {
                    navigation.navigate("Appliances");
                  }
                  userInfo;
                }}
              >
                <FontAwesomeIcon
                  icon={faPlug}
                  size={22}
                  style={{ color: Themes.colors.primary, alignSelf: "center" }}
                />
                <Text>Appliances</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  {
                    navigation.navigate("Furnitures");
                  }
                  userInfo;
                }}
              >
                <FontAwesomeIcon
                  icon={faChair}
                  size={22}
                  style={{ color: Themes.colors.primary, alignSelf: "center" }}
                />
                <Text>Furnitures</Text>
              </TouchableOpacity>
            </View>
            <View style={{}}>
              <TouchableOpacity
                onPress={() => {
                  {
                    navigation.navigate("Vehicles");
                  }
                  userInfo;
                }}
              >
                <FontAwesomeIcon
                  icon={faCar}
                  size={22}
                  style={{ color: Themes.colors.primary, alignSelf: "center" }}
                />
                <Text>Vehicles</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: 70,
              marginTop: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <TouchableOpacity>
                <FontAwesomeIcon
                  icon={faShirt}
                  size={22}
                  style={{ alignSelf: "center", color: Themes.colors.primary }}
                />
                <Text>Fashion</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <FontAwesomeIcon
                  icon={faBowlFood}
                  size={22}
                  style={{ alignSelf: "center", color: Themes.colors.primary }}
                />
                <Text>Groceries</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <FontAwesomeIcon
                  icon={faGlasses}
                  size={22}
                  style={{ alignSelf: "center", color: Themes.colors.primary }}
                />
                <Text>Beauty</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <FontAwesomeIcon
                  icon={faGamepad}
                  size={22}
                  style={{ alignSelf: "center", color: Themes.colors.primary }}
                />
                <Text>Game Tech</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: 70,
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              //justifyContent: "flex-end",
            }}
          >
            <View>
              <TouchableOpacity>
                <FontAwesomeIcon
                  icon={faChild}
                  size={22}
                  style={{ alignSelf: "center", color: Themes.colors.primary }}
                />
                <Text>Kids</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 30 }}>
              <TouchableOpacity>
                <FontAwesomeIcon
                  icon={faDog}
                  size={22}
                  style={{ alignSelf: "center", color: Themes.colors.primary }}
                />
                <Text>Pet and Supplies</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.tg}>Targets for you...</Text>
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
          } else if (route.name === "Shop") {
            size = focused ? 35 : 23;
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Store") {
            size = focused ? 35 : 23;
            iconName = focused ? "store-plus" : "store-plus-outline";
          } else if (route.name === "Profile") {
            size = focused ? 35 : 23;
            iconName = focused ? "account" : "account-outline";
          } else if (route.name === "Help") {
            size = focused ? 35 : 23;
            iconName = focused
              ? "account-question"
              : "account-question-outline";
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
      <Tab.Screen name="Shop" component={Shop} />
      <Tab.Screen name="Store" component={Sell} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Help" component={Help} />
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
    width: 48,
    height: 50,
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
