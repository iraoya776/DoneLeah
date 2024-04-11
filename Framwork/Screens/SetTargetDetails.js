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
  FlatList,
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
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Components/globalVariables";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/Settings";
import { ScrollView } from "react-native-virtualized-view";
import Carousel from "react-native-reanimated-carousel";
import { formatMoney } from "../Components/FormatMoney";

export function SetTargetDetails() {
  const route = useRoute();
  const {
    userUID,
    setUserInfo,
    userInfo,
    setPreloader,
    setAllTargets,
    allTargets,
    setAllCategory,
    allCategory,
    wishlistColour,
    setWishlistColour,
  } = useContext(AppContext);

  const [activeTargets, setActiveTargets] = useState([]);
  const [targetTotalPrice, setTargetTotalPrice] = useState(0);
  const [installments, setInstallments] = useState(0);

  useEffect(() => {
    async function checkDoc() {
      const docRef = doc(db, "setTargetsDirectlyFromProducts", userUID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const q = collection(db, "setTargetsDirectlyFromProducts");
        const filter = query(q, where("userUID", "==", userUID));
        onSnapshot(filter, (snapshot) => {
          const allData = [];
          snapshot.forEach((item) => {
            allData.push({ ...item.data(), setTargetID: item.id });
          });
          setActiveTargets(allData);
          //console.log("hi");
        });
      } else {
        const q2 = collection(db, "cartBundledTargets");
        const filter2 = query(q2, where("userUID", "==", userUID));
        onSnapshot(filter2, (snapshot) => {
          const allData = [];
          snapshot.forEach((item) => {
            allData.push({ ...item.data(), setTargetID: item.id });
            if (item.data().duration === "2 Weeks") {
              setTargetTotalPrice(
                item.data().cartProductsTotalPrice * 0.026 +
                  item.data().cartProductsTotalPrice
              );
            } else if (item.data().duration === "1 Month") {
              setTargetTotalPrice(
                item.data().cartProductsTotalPrice * 0.038 +
                  item.data().cartProductsTotalPrice
              );
            } else if (item.data().duration === "3 Months") {
              setTargetTotalPrice(
                item.data().cartProductsTotalPrice * 0.056 +
                  item.data().cartProductsTotalPrice
              );
            }
            if (
              item.data().paymentSchedule === "Weekly" &&
              item.data().duration === "1 Month"
            ) {
              setInstallments(targetTotalPrice / 4);
            } else if (
              item.data().paymentSchedule === "Weekly" &&
              item.data().duration === "3 Months"
            ) {
              setInstallments(targetTotalPrice / 12);
            } else if (
              item.data().paymentSchedule === "Monthly" &&
              item.data().duration === "1 Month"
            ) {
              setInstallments(targetTotalPrice / 1);
            } else if (
              item.data().paymentSchedule === "Monthly" &&
              item.data().duration === "3 Months"
            ) {
              setInstallments(targetTotalPrice / 3);
            }
          });
          setActiveTargets(allData);
        });
      }
    }
    checkDoc();
  }, []);

  const screenWidth = Dimensions.get("screen").width;
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
              alignItems: "center",
              flexDirection: "row",
              //columnGap: 30,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faArrowLeftLong} size={22} />
            </TouchableOpacity>
            <Text style={{ fontFamily: Themes.fonts.text800, fontSize: 18 }}>
              Set Target Details
            </Text>

            <TouchableOpacity>
              <FontAwesomeIcon
                icon={faHome}
                size={22}
                color={Themes.colors.greenDark}
              />
            </TouchableOpacity>
          </View>
          <View style={{}}></View>
          <View>
            <FlatList
              data={activeTargets}
              renderItem={({ item }) => {
                return (
                  <View style={{ marginTop: 10 }}>
                    <View
                      style={{
                        //borderWidth: 1,
                        height: 120,
                        justifyContent: "center",
                        backgroundColor: Themes.colors.primary,
                        borderRadius: 20,
                      }}
                    >
                      <Text style={{ textAlign: "center", color: "white" }}>
                        once you fund your account, target becomes active else
                        target becomes in active after 2 weeks
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          columnGap: 10,
                          margin: 3,
                        }}
                      >
                        <Text style={{ color: "white", marginLeft: 5 }}>
                          Installments:{" "}
                        </Text>
                        <Text
                          style={{
                            fontFamily: Themes.fonts.text600,
                            fontSize: 16.5,
                            color: "white",
                            //textAlign: "center",
                          }}
                        >
                          ₦ {installments}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          columnGap: 10,
                          margin: 3,
                        }}
                      >
                        <Text style={{ color: "white", marginLeft: 5 }}>
                          Balance:
                        </Text>
                        <Text
                          style={{
                            fontFamily: Themes.fonts.text600,
                            fontSize: 16.5,
                            color: "white",
                            //textAlign: "center",
                          }}
                        >
                          ₦ {targetTotalPrice - 0}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontFamily: Themes.fonts.text400,
                          marginTop: 10,
                        }}
                      >
                        {item.product ||
                          item.allCartProducts.map((item) => {
                            return `${item}\n\n`;
                          })}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontFamily: Themes.fonts.text800,
                        fontSize: 18,
                        textAlign: "right",
                      }}
                    >
                      total: ₦ {item.price || targetTotalPrice}
                    </Text>
                    <TouchableOpacity
                      style={{
                        marginTop: 20,
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 40,
                        borderColor: Themes.colors.primary,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: Themes.fonts.text800,
                          fontSize: 18,
                          textAlign: "center",
                          color: Themes.colors.primary,
                        }}
                      >
                        Fund Balance
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
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
