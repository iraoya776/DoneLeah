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
} from "react-native";
import { Themes } from "../Components/Themes";
import { useNavigation, useRoute } from "@react-navigation/native";
//import * as React from "react";
import {
  faArrowLeft,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Components/globalVariables";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/Settings";
import { Paystack } from "react-native-paystack-webview";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";
import { paystack_Key } from "../../Firebase/Paystack";

export function Pay2() {
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
    groupInfo,
    setGroupInfo,
  } = useContext(AppContext);

  const navigation = useNavigation();
  const route = useRoute();
  const { amount, targetName, total, deliveryFee, interest } = route.params;
  const [contsructedBalance, setConstructedBalance] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function getQ() {
      const q = collection(db, "targetDetails");
      const filter = query(q, where("targetName", "==", targetName));

      const e = collection(db, "users");
      const filter2 = query(e, where("userUID", "==", userUID));
      const querySnapshot2 = await getDocs(filter2);

      const querySnapshot = await getDocs(filter);
      const allData = [];
      querySnapshot.forEach((all) => {
        allData.push(all.data());
      });
      const sum = allData.reduce((all, items) => {
        return all + items.amount;
      }, 0);
      setConstructedBalance(sum);

      const allDocs = [];
      querySnapshot2.forEach((all) => {
        allDocs.push(all.data());
      });

      const sum2 = allDocs.reduce((all, items) => {
        return all + items.balance;
      }, 0);
      setBalance(sum2);
    }
    getQ();
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RootSiblingParent>
        <ScrollView>
          <View style={styles.container}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                columnGap: 30,
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesomeIcon icon={faArrowLeftLong} size={22} />
              </TouchableOpacity>
              <Text>Pay</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Paystack
                paystackKey={paystack_Key}
                amount={amount}
                billingEmail={userInfo.email}
                firstName={userInfo.firstName}
                lastName={userInfo.lastName}
                activityIndicatorColor="green"
                onCancel={(e) => {
                  // handle response here
                  navigation.goBack();
                  Toast.show("Transaction Cancelled!!", {
                    duration: Toast.durations.LONG,
                  });
                }}
                onSuccess={(res) => {
                  const myDocumentData = {
                    targetName,
                    amount: Number(amount) - Number(interest),
                    remainingBalance: Number(total) - Number(amount),
                    deliveryFee,
                    createdAt: new Date().getTime(),
                    userUID,
                  };
                  const myDocRef3 = collection(db, "targetDetails");
                  setPreloader(false);
                  addDoc(myDocRef3, myDocumentData)
                    .then(() => {
                      setPreloader(false);
                      Toast.show("Transaction Approved!!", {
                        duration: Toast.durations.LONG,
                      });
                      navigation.goBack();
                    })
                    .catch(() => {
                      setPreloader(false);
                      Toast.show("Transaction Declined!!", {
                        duration: Toast.durations.LONG,
                      });
                      navigation.goBack();
                      //console.log("unsuccessful");
                    });

                  // const myDocumentData2 = {
                  //   balance: contsructedBalance + Number(myDocumentData.amount),
                  // };
                  // const docRef = doc(db, "users", userUID);
                  // setPreloader(false);
                  // setDoc(docRef, myDocumentData2, { merge: true })
                  //   .then(() => {
                  //     setPreloader(false);
                  //     navigation.goBack();
                  //     //console.log("successful");
                  //   })
                  //   .catch(() => {
                  //     setPreloader(false);
                  //     //console.log("unsuccessful");
                  //   });
                }}
                autoStart={true}
              />
            </View>
          </View>
        </ScrollView>
      </RootSiblingParent>
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
