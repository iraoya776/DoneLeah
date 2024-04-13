import {
  faArrowLeftLong,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Dimensions, FlatList, StatusBar } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Themes } from "../Components/Themes";
import { AppContext } from "../Components/globalVariables";
import { useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/Settings";
import { ScrollView } from "react-native-virtualized-view";

export function Orders() {
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
  const [orders, setOrders] = useState([]);
  const [permit, setPermit] = useState(false);

  useEffect(() => {
    async function getQ() {
      const q = collection(db, "orders");
      const filter = query(q, where("userUID", "==", userUID));
      const querySnapshot = await getDocs(filter);
      querySnapshot.empty === true ? setPermit(true) : setPermit(false);
      const allData = [];
      querySnapshot.forEach((all) => {
        allData.push(all.data());
      });
      allData.sort((a, b) => {
        b.createdAt - a.createdAt;
      });
      setOrders(allData);
    }
    getQ();
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 20,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faArrowLeftLong} size={20} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: Themes.fonts.text800,
                fontSize: 18,
                display: permit !== true ? "flex" : "none",
              }}
            >
              Orders
            </Text>
          </View>
          <View
            style={{
              //borderWidth: 1,
              height: Dimensions.get("screen").height * 0.85,
              justifyContent: "space-between",
              display: permit === true ? "flex" : "none",
            }}
          >
            <Image
              source={{
                uri: "https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg?t=st=1712823000~exp=1712826600~hmac=59ac4a09ef5c1301fd0c93ab18de2a834fb042c1ed623a6c3bd182eecca07333&w=740",
              }}
              style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
            />
          </View>
          <View
            style={{
              display: permit !== true ? "flex" : "none",
            }}
          >
            <FlatList
              data={orders}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      padding: 10,
                      //borderWidth: 0.2,
                      backgroundColor: "white",
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 10,
                      marginVertical: 10,
                      borderRadius: 10,
                    }}
                  >
                    <Image
                      source={{ uri: userInfo.image }}
                      style={{ width: 30, height: 30, borderRadius: 50 }}
                    />
                    <View>
                      <View style={{ flexDirection: "row" }}>
                        <Text>({item.targetName}) target for </Text>
                        <Text style={{ fontFamily: Themes.fonts.text800 }}>
                          ₦ {item.total}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 5,
                          columnGap: 5,
                        }}
                      >
                        <FontAwesomeIcon icon={faLocationDot} />
                        <Text style={{ fontFamily: Themes.fonts.text400 }}>
                          {item.address}
                        </Text>
                        <Text style={{ textAlign: "right" }}>
                          {"{Processing}"}
                        </Text>
                      </View>
                    </View>
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
