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
  Modal,
} from "react-native";
import { Themes } from "../Components/Themes";
import { useNavigation } from "@react-navigation/native";
import {
  faArrowLeft,
  faArrowLeftLong,
  faArrowRightLong,
  faCartShopping,
  faHome,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Components/globalVariables";
import {
  collection,
  deleteDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/Settings";

export function ActiveTargets() {
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
  const [creation, setCreation] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [total, setTotal] = useState(0);
  const [targetName, setTargetName] = useState("");
  const [collectedID, setCollectedID] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [orderFiles, setOrderFiles] = useState([]);
  const [contsructedBalance, setConstructedBalance] = useState(0);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    async function sourceDoc() {
      const q = collection(db, "setActiveTargets");
      const filter = query(q, where("userUID", "==", userUID));
      const querySnapshot = await getDocs(filter);
      //const allData = [];
      querySnapshot.forEach((all) => {
        setCreation(all.data().createdAt);
        setTargetName(all.data().targetName);
        setCollectedID(all.data().userUID);
      });
      querySnapshot.empty === true ? setDisplay(true) : setDisplay(false);
    }
    sourceDoc();

    const getDays = (time) => {
      const getTime = Date.now();
      const dateContruct = new Date(time);
      const diff = getTime - dateContruct;
      const secondsPassed = diff / 1000;
      const minutesPassed = secondsPassed / 60;
      const hoursPassed = minutesPassed / 60;
      const daysPassed = hoursPassed / 24;
      const result = Math.round(daysPassed);
      setDeadline(90 - result);
    };
    getDays(creation);

    async function getTotal() {
      const q = collection(db, "cart");
      const filter = query(q, where("targetName", "==", targetName));
      const querySnapshot = await getDocs(filter);
      //console.log(querySnapshot.empty);
      const allData = [];
      querySnapshot.forEach((all) => {
        allData.push({ ...all.data() });
      });
      const sum = allData.reduce((all, items) => {
        return all + items.cartGroupPrice;
      }, 0);
      //console.log(sum);
      setTotal(sum);
      setDeliveryFee(0.004 * sum);
    }
    getTotal();

    async function getQ() {
      const q = collection(db, "targetDetails");
      const filter = query(q, where("targetName", "==", targetName));
      const querySnapshot = await getDocs(filter);
      const allData = [];

      const allDocs = [];
      onSnapshot(filter, (snapshot) => {
        snapshot.forEach((item) => {
          allDocs.push(item.data());
        });
      });

      querySnapshot.forEach((all) => {
        allData.push(all.data());
      });
      const sum = allData.reduce((all, items) => {
        return all + items.amount;
      }, 0);
      // const sum2 = allDocs.reduce((all, items) => {
      //   return all + items.amount;
      // }, 0);

      setConstructedBalance(total - sum);
      //console.log(sum);
    }
    getQ();
  });

  const setModal = () => {
    const changeFactor = !isModalVisible;
    setIsModalVisible(changeFactor);
  };
  const closeModal = () => {
    const changeFactor = !isModalVisible;
    setIsModalVisible(changeFactor);
  };

  const targetDelete = async () => {
    const q = query(
      collection(db, "cart"),
      where("targetName", "==", targetName)
    );
    const q2 = query(
      collection(db, "setActiveTargets"),
      where("targetName", "==", targetName)
    );
    const querySnapshot = await getDocs(q);
    const querySnapshot2 = await getDocs(q2);
    //setPreloader(true)
    querySnapshot.docs.forEach((userDocRef) => {
      setPreloader(true);
      deleteDoc(userDocRef.ref)
        .then(() => {
          setPreloader(false);
          console.log("cart collection deleted successfully");
        })
        .catch(() => {
          setPreloader(false);
          console.log("unsuccessful");
        });
    });
    querySnapshot2.docs.forEach((userDocRef) => {
      deleteDoc(userDocRef.ref)
        .then(() => {
          setPreloader(false);
          console.log("target deleted successfully");
          navigation.navigate("Profile");
        })
        .catch(() => {
          setPreloader(false);
          console.log("unsuccessful");
        });
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            columnGap: 20,
            //justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faArrowLeftLong} size={22} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: Themes.fonts.text800,
              fontSize: 18,
              display: display === false ? "flex" : "none",
            }}
          >
            {targetName}
          </Text>
        </View>
        <View
          style={{
            height: Dimensions.get("screen").height * 0.79,
            //borderWidth: 1,
            justifyContent: "space-between",
            display: display === true ? "flex" : "none",
          }}
        >
          <Image
            source={{
              uri: "https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?t=st=1712668685~exp=1712672285~hmac=456385c9ae23e0793a6c497b87922980679b988958452976b678c96ed8983bac&w=740",
            }}
            style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
          />
        </View>
        <View
          style={{
            display: display === false ? "flex" : "none",
            height: Dimensions.get("screen").height * 0.4,
            borderWidth: 1,
            marginTop: 10,
            justifyContent: "space-between",
            backgroundColor: Themes.colors.greenDark,
            borderBottomRightRadius: 40,
            borderTopLeftRadius: 40,
          }}
        >
          <View
            style={{
              padding: 10,
              marginVertical: 60,
            }}
          >
            <Text
              style={{
                fontFamily: Themes.fonts.text500,
                textAlign: "center",
                color: "white",
              }}
            >
              Remaining Balance:
            </Text>
            <Text
              style={{
                fontFamily: Themes.fonts.text800,
                fontSize: 20,
                //marginVertical: 60,
                textAlign: "center",
                color: "white",
              }}
            >
              ₦ {contsructedBalance <= 0 ? 0 : contsructedBalance}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: Themes.fonts.text800,
                textAlign: "center",
                color: "white",
              }}
            >
              {deadline} days to go
            </Text>
            <Text
              style={{
                fontFamily: Themes.fonts.text400,
                textAlign: "center",
                color: "white",
              }}
            >
              Target is automatically disabled once the deadline reaches
            </Text>
          </View>
          <View
            style={{
              //borderWidth: 1,
              height: "22%",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={setModal}
              style={{
                margin: 15,
                //borderWidth: 1,
                padding: 2,
                borderRadius: 20,
                width: "40%",
                backgroundColor: "white",
              }}
            >
              <Text
                style={{
                  fontFamily: Themes.fonts.text800,
                  fontSize: 18,
                  textAlign: "center",
                  color: Themes.colors.greenDark,
                }}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{ padding: 10, display: display === true ? "none" : "flex" }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TargetCheckout", {
              total,
              targetName,
              deliveryFee,
            })
          }
          style={{
            backgroundColor: Themes.colors.primary,
            borderRadius: 10,
            padding: 8,
            width: "100%",
            //borderWidth: 1,

            //justifyContent: "space-evenly",
            //borderColor: Themes.colors.primary,
          }}
        >
          <Text
            style={{
              fontFamily: Themes.fonts.text800,
              fontSize: 18,
              color: "white",
              textAlign: "center",
            }}
          >
            Check-Out
          </Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: Themes.colors.greenDark,
              height: 170,
              padding: 10,
              //borderWidth: 1,
              //borderRadius: 30,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{ padding: 8, alignItems: "flex-end" }}
              onPress={closeModal}
            >
              <FontAwesomeIcon icon={faXmarkCircle} size={22} color="white" />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: Themes.fonts.text400,
                color: "white",
                fontSize: 16,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Once deleted, all data including cart collection, and target
              information is lost permanently
            </Text>
            <TouchableOpacity
              onPress={() => {
                targetDelete();
                closeModal();
              }}
              style={{
                //borderWidth: 1,
                padding: 6,
                borderRadius: 20,
                backgroundColor: Themes.colors.primary,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  fontFamily: Themes.fonts.text700,
                  textAlign: "center",
                }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
