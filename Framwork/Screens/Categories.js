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
import { ScrollView } from "react-native-virtualized-view";
import { Themes } from "../Components/Themes";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  faArrowLeft,
  faHome,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase/Settings";
import { AppContext } from "../Components/globalVariables";
import { formatMoney } from "../Components/FormatMoney";

export function Category() {
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
    wishlistColour,
    setWishlistColour,
  } = useContext(AppContext);
  //console.log(allCategory);
  const [list, setList] = useState([]);
  const [display, setDisplay] = useState(false);
  const [filteredTargets, setfilteredTargets] = useState([]);

  useEffect(() => {
    const q = collection(db, "targets");
    const filter = query(q, where("category", "==", allCategory));
    onSnapshot(filter, (snapshot) => {
      const allData = [];
      snapshot.forEach((item) => {
        allData.push({
          ...item.data(),
          targetID: item.id,
        });
      });
      setAllTargets(allData);
      setfilteredTargets(allData);
    });
  }, []);

  function handleSearch(inp) {
    //setSearch(inp);
    const filtered = allTargets.filter((all) => {
      if (all.hasOwnProperty("product")) {
        return all.product.toLowerCase().includes(inp.toLowerCase());
      } else {
        //return allTargets;
      }
    });
    setfilteredTargets(filtered);
  }

  const width = Dimensions.get("screen").width;
  const getWidth = 0.5 * width;
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
              justifyContent: "space-between",
            }}
          >
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
                  fontSize: 18,
                  fontFamily: Themes.fonts.text800,
                }}
              >
                {allCategory}
              </Text>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <FlatList
              numColumns={2}
              data={filteredTargets}
              renderItem={({ item }) => {
                return (
                  <View>
                    <View style={{}}>
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
                        <View
                          style={{
                            //borderWidth: 1,
                            width: getWidth,
                            //paddingTop: 5,
                            padding: 10,
                          }}
                        >
                          <Image
                            source={{ uri: item.image }}
                            style={{
                              width: "100%",
                              height: 180,
                              borderRadius: 20,
                            }}
                          />
                          <Text style={{}}>
                            {item.product.substring(0, 11)}
                            {"..."}
                          </Text>
                          <Text
                            style={{
                              fontFamily: Themes.fonts.text700,
                              fontSize: 18,
                            }}
                          >
                            ₦ {formatMoney(item.price)}
                          </Text>
                        </View>
                      </TouchableOpacity>
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
