import "react-native-gesture-handler";
import * as React from "react";
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
  Button,
  FlatList,
  Dimensions,
  Modal,
} from "react-native";
import { Themes } from "../Components/Themes";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faArrowLeftLong,
  faBowlFood,
  faCar,
  faCartShopping,
  faChair,
  faChild,
  faDog,
  faGamepad,
  faGlasses,
  faHome,
  faMagnifyingGlass,
  faMinusCircle,
  faMobile,
  faPlug,
  faPlusCircle,
  faQuestion,
  faShirt,
  faUserClock,
  faUserGroup,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { SlideInRight } from "react-native-reanimated";
import { useState } from "react";
import { ScrollView } from "react-native-virtualized-view";
import { useEffect } from "react";
import { AppContext } from "../Components/globalVariables";
import { useContext } from "react";
import {
  DocumentSnapshot,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/Settings";
import { formatMoney } from "../Components/FormatMoney";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export function Cart() {
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
  const [display, setDisplay] = useState(false);
  const [total, setTotal] = useState(undefined);

  const [filteredTargets, setfilteredTargets] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalVisibility2, setModalVisibility2] = useState(false);
  const [permit, setPermit] = useState(false);
  const [targetInvolved, setTargetInvolved] = useState(false);

  useEffect(() => {
    const q = collection(db, "cart");
    const filter = query(q, where("userUID", "==", userUID));
    onSnapshot(filter, (snapshot) => {
      const allData = [];
      snapshot.forEach((item) => {
        allData.push({ ...item.data(), cartID: item.id });
      });
      allData.length < 1 ? setPermit(true) : setPermit(false);
      setfilteredTargets(allData);
      setAllTargets(allData);
      const sum = allData.reduce((all, items) => {
        return all + items.cartGroupPrice;
      }, 0);
      setTotal(sum);
    });

    async function getColl() {
      const q = collection(db, "setActiveTargets");
      const filter = query(q, where("userUID", "==", userUID));
      const querySnapshot = await getDocs(filter);
      if (querySnapshot.empty === true) {
        setTargetInvolved(true);
      } else {
        setTargetInvolved(false);
      }
    }
    getColl();
    //getMessage();
  }, []);

  const getHeight = Dimensions.get("screen").height;
  const secHeight = getHeight * 0.13;

  const [count, setCount] = useState(1);
  const [cartStock, setCartStock] = useState(undefined);
  const [targetID, setTargetID] = useState(undefined);

  function deleteCart(id) {
    setPreloader(true);
    deleteDoc(doc(db, "cart", id))
      .then(() => {
        setPreloader(false);
        console.log("deleted successfully");
      })
      .catch(() => {
        setPreloader(false);
        console.log("something went wrong");
      });
  }

  const setTarget = async () => {
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
    const collQ = collection(db, "setActiveTargets");
    const filter = query(collQ, where("userUID", "==", userUID));

    const querySnapshot = await getDocs(q);
    const querySnapshot2 = await getDocs(q2);
    const querySnapshot3 = await getDocs(q3);
    const querySnapshot4 = await getDocs(q4);
    const querySnapshot5 = await getDocs(q5);
    const querySnapshot6 = await getDocs(filter);
    setPreloader(true);

    if (
      querySnapshot.empty === false ||
      querySnapshot2.empty === false ||
      querySnapshot3.empty === false ||
      querySnapshot4.empty === false ||
      querySnapshot5.empty === false ||
      querySnapshot6.empty === false
    ) {
      setPreloader(false);
      Alert.alert(
        "Mesage!",
        "You are already involved in an active target at the moment",
        [{ text: "Ok" }]
      );
    } else if (filteredTargets.length === 0) {
      setPreloader(false);
      Alert.alert(
        "Message!",
        "You do not have any product to set target with",
        [{ text: "Ok" }]
      );
    } else if (
      querySnapshot.empty === true &&
      querySnapshot2.empty === true &&
      querySnapshot3.empty === true &&
      querySnapshot4.empty === true &&
      querySnapshot5.empty === true &&
      filteredTargets.length >= 1 &&
      querySnapshot6.empty === true
    ) {
      setPreloader(false);
      navigation.navigate("CreateTarget");
    }
  };
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={Themes.colors.primary}
        barStyle={"light-content"}
      />

      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 30,
              //display: permit === true ? "none" : "flex",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faArrowLeftLong} size={22} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: Themes.fonts.text700,
                fontSize: 18,
              }}
            >
              Cart ({filteredTargets.length})
            </Text>
          </View>
          <View
            style={{
              height: Dimensions.get("screen").height * 0.77,
              //borderWidth: 1,
              display: permit === true ? "flex" : "none",
              marginTop: 10,
              justifyContent: "space-between",
            }}
          >
            <Image
              source={{
                uri: "https://img.freepik.com/free-vector/supermarket-shopping-cart-concept-illustration_114360-22408.jpg?t=st=1712824340~exp=1712827940~hmac=59ae2d526d5826e3f10bcdfdab51d92f70f5413b15a772c953296ce8c3187d0c&w=740",
              }}
              style={{ width: "100%", height: "60%", resizeMode: "stretch" }}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("SearchScreen")}
              style={{
                borderRadius: 10,
                backgroundColor: Themes.colors.primary,
                padding: 7,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  color: "white",
                  fontFamily: Themes.fonts.text800,
                }}
              >
                Shop
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={filteredTargets}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      //borderWidth: 1,
                      marginVertical: 5,
                      flexDirection: "row",
                      columnGap: 5,
                      alignItems: "center",
                      height: secHeight,
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{ width: 140, height: 90, borderRadius: 20 }}
                    />

                    <View
                      style={{
                        //borderWidth: 1,
                        width: "50%",
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("TargetDetails", {
                            seller: item.seller,
                            category: item.category,
                            product: item.product,
                            price: item.price,
                            image: item.image,
                            image2: item.image2,
                            image3: item.image3,
                            description: item.description,
                            stock: item.stock,
                            brand: item.brand,
                            targetID: item.targetID,
                          });
                          setTargetID(item.targetID);
                        }}
                      >
                        <View>
                          <Text>
                            {item.product.substring(0, 13)}
                            {"..."}
                          </Text>
                          <Text
                            style={{
                              fontFamily: Themes.fonts.text700,
                              fontSize: 18,
                            }}
                          >
                            ₦ {item.cartGroupPrice || item.price}
                          </Text>
                          <Text>({item.category})</Text>
                        </View>
                      </TouchableOpacity>

                      <View
                        style={{
                          //marginTop: 10,
                          //borderWidth: 1,
                          height: secHeight * 0.4,
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setCount(1);
                            const cart = collection(db, "cart");
                            const myDocumentData = {
                              cartGroupPrice: item.price * (item.stock + 1),
                              stock: item.stock + 1,
                            };
                            //const x = Object.freeze(myDocumentData);
                            const myDocRef = doc(cart, item.cartID);
                            setPreloader(true);
                            setDoc(myDocRef, myDocumentData, { merge: true })
                              .then(() => {
                                setPreloader(false);
                                console.log("Successful");
                              })
                              .catch(() => {
                                setPreloader(false);
                                console.log("unsuccessful");
                              });
                            //console.log(myDocumentData.cartGroupPrice);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faPlusCircle}
                            size={22}
                            color={Themes.colors.green}
                          />
                        </TouchableOpacity>
                        <Text style={{ fontFamily: Themes.fonts.text500 }}>
                          Qty: {item.stock}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setCount(1);
                            const cart = collection(db, "cart");
                            const myDocumentData = {
                              cartGroupPrice:
                                item.price * (item.stock - 1) == 0
                                  ? item.price
                                  : item.price * (item.stock - 1),
                              stock: item.stock <= 1 ? count : item.stock - 1,
                            };
                            //const x = Object.freeze(myDocumentData);
                            const myDocRef = doc(cart, item.cartID);
                            setPreloader(true);
                            setDoc(myDocRef, myDocumentData, { merge: true })
                              .then(() => {
                                setPreloader(false);
                                console.log("Successful");
                              })
                              .catch(() => {
                                setPreloader(false);
                                console.log("unsuccessful");
                              });
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faMinusCircle}
                            size={22}
                            color={Themes.colors.green}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        //borderWidth: 1,
                        height: "100%",
                        width: 22,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          deleteCart(item.cartID);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashCan} size={16} />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          //borderTopWidth: 1,
          //backgroundColor: Themes.colors.blueMedium,
          display: permit === true ? "none" : "flex",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>total: </Text>
          <Text style={{ fontFamily: Themes.fonts.text700, fontSize: 20 }}>
            {" "}
            ₦ {total}
          </Text>
        </View>
        <TouchableOpacity
          onPress={setTarget}
          style={{
            //borderWidth: 1,
            padding: 10,
            backgroundColor: Themes.colors.primary,
            borderRadius: 10,
            width: 160,
            display: targetInvolved !== true ? "none" : "flex",
          }}
        >
          <Text
            style={{
              fontFamily: Themes.fonts.text800,
              color: "white",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Set Target
          </Text>
        </TouchableOpacity>
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
  firstView: {
    //borderWidth: 1,
    //borderColor: "red",
    height: 160,
    width: 160,
    alignItems: "center",
    //justifyContent: "center",
    //borderRadius: 10,
  },
  imgDesign: {
    width: "90%",
    height: "90%",
    borderRadius: 15,
    borderWidth: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: Themes.fonts.text400,
    fontWeight: "600",
  },
  design: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
  },
  make: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : null,
    padding: 10,
  },
});
