import "react-native-gesture-handler";
import { useContext } from "react";
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
import { AppContext } from "../Components/globalVariables";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faBowlFood,
  faCar,
  faChair,
  faChild,
  faDog,
  faGamepad,
  faGlasses,
  faL,
  faMobile,
  faPlug,
  faQuestion,
  faShirt,
} from "@fortawesome/free-solid-svg-icons";
import { Themes } from "../Components/Themes";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { CreateStores } from "./CreateStores";

function MyStore() {
  const {
    userUID,
    setUserInfo,
    userInfo,
    setPreloader,
    setAllTargets,
    setDocID,
  } = useContext(AppContext);

  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{ flexDirection: "row", alignItems: "center", columnGap: 70 }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faArrowLeft} size={22} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18 }}>My Store </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export function CustomDrawerContent({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/cardPayments.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("MyStore")}>
            <Text style={{ fontSize: 18, fontFamily: Themes.fonts.text700 }}>
              My store
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => navigation.navigate("CreateStore")}
          >
            <Text style={{ fontSize: 18, fontFamily: Themes.fonts.text700 }}>
              Create Store
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const Drawer = createDrawerNavigator();

export function Stores() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        defaultStatus="open"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        //initialRouteName="All Products"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Drawer.Screen
          name="ShopList"
          component={ShopList}
          //options={{ headerShown: false }}
        /> */}

        <Drawer.Screen name="MyStore" component={MyStore} />
        <Drawer.Screen name="CreateStore" component={CreateStores} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : null,
    padding: 10,
  },
});
