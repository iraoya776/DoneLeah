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
import { useNavigation } from "@react-navigation/native";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Components/globalVariables";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/Settings";
import { ScrollView } from "react-native-virtualized-view";

export function History() {
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

  const [updates, setUpdates] = useState([]);
  //const [targetName, setTargetName] = useState("")
  const [permit, setPermit] = useState("");

  useEffect(() => {
    async function getQ() {
      const q = collection(db, "targetDetails");
      const filter = query(q, where("userUID", "==", userUID));
      const querySnapshot = await getDocs(filter);
      querySnapshot.empty === false ? setPermit(true) : setPermit(false);
      const allData = [];
      querySnapshot.forEach((all) => {
        allData.push(all.data());
      });
      const refresh = allData.sort((a, b) => {
        a.createdAt - b.createdAt;
      });
      setUpdates(refresh);
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
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <FontAwesomeIcon icon={faArrowLeft} size={22} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: Themes.fonts.text800,
                fontSize: 18,
                display: permit !== true ? "none" : "flex",
              }}
            >
              Welcome, {userInfo.firstName}
            </Text>
          </View>
          <View
            style={{
              height: Dimensions.get("screen").height * 0.83,
              //borderWidth: 1,
              marginTop: 10,
              justifyContent: "space-between",
              display: permit === true ? "none" : "flex",
            }}
          >
            <Image
              source={{
                uri: "https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?t=st=1712668685~exp=1712672285~hmac=456385c9ae23e0793a6c497b87922980679b988958452976b678c96ed8983bac&w=740",
              }}
              style={{ width: "100%", height: "60%", resizeMode: "stretch" }}
            />
            <Text
              style={{
                fontFamily: Themes.fonts.text400,
                fontSize: 16,
                textAlign: "center",
              }}
            >
              You have no transaction record at the moment
            </Text>
          </View>
          <View style={{ display: permit !== true ? "none" : "flex" }}>
            <FlatList
              data={updates}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      borderWidth: 0.2,
                      padding: 10,
                      flexDirection: "row",
                      columnGap: 5,
                      backgroundColor: "white",
                      marginTop: 10,
                      //borderRadius: 10,
                    }}
                  >
                    <Image
                      source={{ uri: userInfo.image }}
                      style={{ width: 30, height: 30, borderRadius: 50 }}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        width: 95,
                        alignItems: "center",
                        //borderWidth: 1,
                      }}
                    >
                      {/* <Text style={{ fontFamily: Themes.fonts.text800 }}>
                        Hi, {userInfo.firstName}
                      </Text> */}
                      <Text>You just paid </Text>
                      <Text style={{ fontFamily: Themes.fonts.text800 }}>
                        ₦ {item.amount} {}
                      </Text>
                      <Text>for </Text>

                      <Text style={{ fontFamily: Themes.fonts.text400 }}>
                        "{item.targetName}"{" "}
                      </Text>
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
