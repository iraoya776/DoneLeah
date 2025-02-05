import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
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

export function MyHelp({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Text>Help</Text>
        </View>
      </ScrollView>
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
            <Text style={{ fontSize: 18 }}>My store</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => navigation.navigate("CreateStore")}
          >
            <Text style={{ fontSize: 18 }}>Create Store</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const Drawer = createDrawerNavigator();

export function Help() {
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

        <Drawer.Screen name="MyHelp" component={MyHelp} />
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
