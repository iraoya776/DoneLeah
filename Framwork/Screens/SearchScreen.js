import { ScrollView } from "react-native-virtualized-view";
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
import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Components/globalVariables";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../Firebase/Settings";
import { formatMoney } from "../Components/FormatMoney";

export function SearchScreen() {
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

  const [search, setSearch] = useState("Hp Laptop");
  const [filteredTargets, setfilteredTargets] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const q = collection(db, "targets");
    const filter = query(q, where("seller", "==", "Leah"));
    onSnapshot(filter, (snapshot) => {
      const allData = [];
      snapshot.forEach((item) => {
        allData.push({
          ...item.data(),
          targetID: item.id,
        });
      });
      setfilteredTargets(allData);
      setAllTargets(allData);
    });
  }, []);

  function handleSearch(inp) {
    //setSearch(inp);
    const filtered = allTargets.filter((all) => {
      if (all.hasOwnProperty("product")) {
        return (
          all.product.toLowerCase().includes(inp.toLowerCase()) ||
          all.product.toUpperCase().includes(inp.toUpperCase())
        );
      } else {
        //return allTargets;
      }
    });
    setfilteredTargets(filtered);
  }

  const navigation = useNavigation();

  const width = Dimensions.get("screen").width;
  const getWidth = 0.5 * width;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              //columnGap: 30,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faArrowLeft} size={22} />
            </TouchableOpacity>
            <View
              style={{
                width: "87%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextInput
                onChangeText={(inp) => handleSearch(inp)}
                onPressIn={() => setDisplay(true)}
                placeholder="Search all products"
                style={{
                  borderWidth: 1,
                  fontSize: 17,
                  paddingLeft: 10,
                  padding: 4,
                  width: "92%",
                  fontFamily: Themes.fonts.text500,
                }}
              ></TextInput>
            </View>
          </View>
          <Text
            style={{
              //borderWidth: 1,
              //marginTop: 5,
              fontSize: 16,
              fontFamily: Themes.fonts.text400,
              textAlign: "center",
              letterSpacing: 0.5,
              //marginBottom: 5,
              display: display ? "flex" : "none",
            }}
          >
            {filteredTargets.length === 0
              ? "Search did not return any product"
              : ` ${filteredTargets.length} products available`}
          </Text>
          <FlatList
            numColumns={2}
            data={filteredTargets}
            renderItem={({ item }) => {
              return (
                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("TargetDetails", {
                        product: item.product,
                        price: item.price,
                        image: item.image,
                        description: item.description,
                        image2: item.image2,
                        image3: item.image3,
                        category: item.category,
                        brand: item.brand,
                        seller: item.seller,
                        targetID: item.targetID,
                      });
                    }}
                    style={{}}
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
                        style={{ width: "100%", height: 180, borderRadius: 20 }}
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
              );
            }}
          />
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
  design: {
    borderWidth: 1,
    padding: 6,
    width: 150,
    marginVertical: 5,
    borderRadius: 10,
  },
  txt: {
    textAlign: "center",
  },
});
