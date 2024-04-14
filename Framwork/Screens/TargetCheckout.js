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
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  faArrowLeft,
  faArrowLeftLong,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AppContext } from "../Components/globalVariables";
import { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { paystack_Public_Key } from "../../Firebase/Paystack";
import { Paystack } from "react-native-paystack-webview";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/Settings";

const validation = yup.object({
  //email: yup.string().required().email("Enter a valid email").min(5).max(30),

  amount: yup.number().required().min(1000).max(1000000),
});

export function TargetCheckout() {
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
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVsible] = useState(false);

  const route = useRoute();
  const { total, targetName, deliveryFee } = route.params;
  const [amountRaised, setAmountRaised] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [goodsPrice, setGoodsPrice] = useState(0);

  useEffect(() => {
    const getQ = async () => {
      const q = collection(db, "targetDetails");
      const filter = query(q, where("targetName", "==", targetName));
      const querySnapshot = await getDocs(filter);
      const allData = [];
      querySnapshot.forEach((all) => {
        allData.push(all.data());
      });
      const sum = allData.reduce((prev, curr) => {
        return prev + curr.amount;
      }, 0);
      setAmountRaised(sum);
      setRemainingBalance(total - amountRaised);
      setGoodsPrice(Math.abs(amountRaised - total));
    };
    getQ();
  });

  function setModal() {
    const change = setIsModalVsible(!isModalVisible);
  }

  async function validatePay() {
    const q = collection(db, "orders");
    const filter = query(q, where("targetName", "==", targetName));
    const querySnapshot = await getDocs(filter);
    if (querySnapshot.empty === false) {
      Alert.alert(
        "Message!",
        "Order has already been processed and set for delivery",
        [{ text: "Ok", onPress: navigation.navigate("Orders") }]
      );
    } else if (total - amountRaised <= 0) {
      navigation.navigate("TargetForm", { targetName, total, goodsPrice });
    } else {
      setModal();
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            <Text style={{ fontFamily: Themes.fonts.text800, fontSize: 18 }}>
              Checkout
            </Text>
          </View>
          <View
            style={{
              //borderWidth: 1,
              marginTop: 10,
              height: Dimensions.get("screen").height * 0.66,
            }}
          >
            <Image
              source={require("../../assets/onlinePay.png")}
              style={{ width: "100%", height: "60%", resizeMode: "stretch" }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            //marginBottom: 10,
          }}
        >
          <Text style={{ fontFamily: Themes.fonts.text400 }}>
            Delivery Fee:
          </Text>
          <Text style={{ fontFamily: Themes.fonts.text800 }}>
            {" "}
            ₦ {deliveryFee}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <Text style={{ fontFamily: Themes.fonts.text400 }}>Cart Total:</Text>
          <Text style={{ fontFamily: Themes.fonts.text800 }}>₦ {total}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: Themes.fonts.text400 }}>
            Amount raised:{" "}
          </Text>
          <Text style={{ fontFamily: Themes.fonts.text800 }}>
            {" "}
            ₦ {amountRaised}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: Themes.fonts.text400 }}>
            Remaining Balance:{" "}
          </Text>
          <Text style={{ fontFamily: Themes.fonts.text800, fontSize: 18 }}>
            {" "}
            ₦ {remainingBalance <= 0 ? 0 : remainingBalance}
          </Text>
        </View>

        <TouchableOpacity
          onPress={validatePay}
          style={{
            borderRadius: 10,
            backgroundColor: Themes.colors.primary,
            padding: 10,
          }}
        >
          <Text
            style={{
              fontFamily: Themes.fonts.text800,
              fontSize: 18,
              color: "white",
              //letterSpacing: 10,
              textAlign: "center",
            }}
          >
            {remainingBalance > 0 ? "Continue" : "Order Now"}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal transparent={true} visible={isModalVisible} animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            //borderWidth: 1,
            justifyContent: "flex-end",
            //padding: 10,
          }}
        >
          <View
            style={{
              height: "35%",
              width: "100%",
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              backgroundColor: Themes.colors.greenDark,
              //padding: 10,
            }}
          >
            <TouchableOpacity
              onPress={setModal}
              style={{
                width: 30,
                //borderWidth: 1,
                margin: 10,
                alignSelf: "flex-end",
              }}
            >
              <FontAwesomeIcon icon={faXmarkCircle} size={22} color="white" />
            </TouchableOpacity>
            <View>
              <Formik
                initialValues={{
                  amount: "",
                }}
                onSubmit={(value) => {
                  //if (total >= Number(value.amount) ) {
                  if (
                    amountRaised +
                      (Number(value.amount) * 0.018 + Number(value.amount)) <=
                    total * 0.018 + total
                  ) {
                    navigation.navigate("Pay2", {
                      amount:
                        Number(value.amount * 0.018) + Number(value.amount),
                      targetName,
                      total,
                      deliveryFee,
                      interest: Number(value.amount) * 0.018,
                      goodsPrice,
                      amountRaised,
                    });
                    //console.log("Good");
                  } else {
                    Alert.alert(
                      "Unsuccessful",
                      `₦ ${value.amount} too large for remaining ₦ ${remainingBalance} target price`
                    );
                  }
                }}
                validationSchema={validation}
              >
                {(prop) => {
                  return (
                    <View
                      style={{
                        marginTop: 5,
                        //borderWidth: 1,
                        height: Dimensions.get("screen").height * 0.25,
                        paddingLeft: 10,
                        paddingRight: 10,
                        justifyContent: "space-between",
                      }}
                    >
                      <RootSiblingParent>
                        <View>
                          <Text
                            style={{
                              color: "white",
                              fontFamily: Themes.fonts.text400,
                              marginTop: 20,
                              textAlign: "center",
                            }}
                          >
                            Amount
                          </Text>
                          <TextInput
                            placeholder="2000"
                            inputMode="numeric"
                            onChangeText={prop.handleChange("amount")}
                            onBlur={prop.handleBlur("amount")}
                            value={prop.values.amount}
                            style={{
                              padding: 2,
                              fontSize: 18,
                              borderWidth: 1,
                              borderColor: "white",
                              borderRadius: 10,
                              //color: "white",
                              backgroundColor: "white",
                              paddingLeft: 10,
                            }}
                          ></TextInput>
                          <Text
                            style={{
                              display:
                                prop.touched.amount && prop.errors.amount
                                  ? "flex"
                                  : "none",
                              color: "red",
                              marginTop: 3,
                            }}
                          >
                            {prop.errors.amount}
                          </Text>
                        </View>

                        <View>
                          <TouchableOpacity
                            onPress={prop.handleSubmit}
                            style={{
                              borderRadius: 10,
                              backgroundColor: "white",
                              padding: 5,
                              marginTop: 10,
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: Themes.fonts.text800,
                                fontSize: 18,
                                textAlign: "center",
                                color: Themes.colors.text,
                              }}
                            >
                              Pay
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </RootSiblingParent>
                    </View>
                  );
                }}
              </Formik>
            </View>
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
