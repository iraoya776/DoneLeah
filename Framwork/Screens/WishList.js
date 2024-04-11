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
import {
  faArrowLeft,
  faHome,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../Firebase/Settings";
import { AppContext } from "../Components/globalVariables";
import { ScrollView } from "react-native-virtualized-view";

export function Wishlist() {
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
  const [permit, setPermit] = useState(false);

  useEffect(() => {
    const q = collection(db, "wishlist");
    const filter = query(
      q,
      where("userUID", "==", userUID)
      //where("targetID", "==", targetID)
    );
    onSnapshot(filter, (snapshot) => {
      const allData = [];
      snapshot.forEach((item) => {
        allData.push({
          ...item.data(),
          wishlistDocID: item.id,
        });
      });
      setAllTargets(allData);
      allData.length > 0 ? setPermit(true) : setPermit(false);
    });
  }, []);

  function deleteWishlistItem(id) {
    setPreloader(true);
    deleteDoc(doc(db, "wishlist", id))
      .then(() => {
        setPreloader(false);
        console.log("deleted successfully");
      })
      .catch(() => {
        setPreloader(false);
        console.log("something went wrong");
      });
  }

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
              columnGap: 20,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faArrowLeft} size={22} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: Themes.fonts.text800,
                fontSize: 18,
                display: permit === true ? "flex" : "none",
              }}
            >
              Wishlist
            </Text>
          </View>
          <View
            style={{
              //borderWidth: 1,
              height: Dimensions.get("screen").height * 0.83,
              marginTop: 10,
              display: permit !== true ? "flex" : "none",
            }}
          >
            <Image
              source={{
                uri: "https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?t=st=1712824511~exp=1712828111~hmac=2d3a34182cf65e74391886b99965c085f40c0b152515b69aedda1afb47173f7a&w=740",
              }}
              style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              display: permit === true ? "flex" : "none",
            }}
          >
            <FlatList
              numColumns={2}
              data={allTargets}
              renderItem={({ item }) => {
                return (
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
                    }}
                    style={{}}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        width: Dimensions.get("screen").width * 0.5,
                        height: 240,
                        //borderWidth: 1,
                      }}
                    >
                      <ImageBackground
                        source={{ uri: item.image }}
                        style={{
                          width: "96%",
                          height: 170,
                          //borderWidth: 1,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => deleteWishlistItem(item.wishlistDocID)}
                          style={{
                            //borderWidth: 1,
                            backgroundColor: "white",
                            width: 30,
                            height: 30,
                            borderRadius: 20,
                            alignItems: "center",
                            justifyContent: "center",
                            alignSelf: "flex-end",
                            margin: 5,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            size={18}
                            color={Themes.colors.primary}
                          />
                        </TouchableOpacity>
                      </ImageBackground>
                      <Text style={{ fontFamily: Themes.fonts.text400 }}>
                        {item.product.substring(0, 20)}
                        {"..."}
                      </Text>
                      <Text
                        style={{
                          fontFamily: Themes.fonts.text800,
                          fontSize: 18,
                        }}
                      >
                        ₦ {item.price}
                      </Text>
                    </View>
                  </TouchableOpacity>
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
