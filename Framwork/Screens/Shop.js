import "react-native-gesture-handler";
import * as React from "react";
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
  Button,
  FlatList,
} from "react-native";
import { Themes } from "../Components/Themes";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faCartShopping,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { SlideInRight } from "react-native-reanimated";
import { useState } from "react";
import { ScrollView } from "react-native-virtualized-view";
import { Devices } from "../Screens/Devices";
import { Appliances } from "./Appliances";
import { useEffect } from "react";

function HomeScreens({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Go to notifications"
      />
    </View>
  );
}

function Device() {
  return <Devices />;
}
function Appliance() {
  return <Appliances />;
}

function sayHello({ navigation }) {
  return (
    <View>
      <Text>{Alert.alert("Hello")}</Text>
    </View>
  );
}

function ShopList({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faArrowLeft} size={20} />
            </TouchableOpacity>
            <Text
              style={{
                //textAlign: "center",
                fontSize: 22,
                fontFamily: Themes.fonts.text700,
                color: Themes.colors.primary,
              }}
            >
              {"   "}
              All Products
            </Text>
          </View>

          <View style={styles.design}>
            <TouchableOpacity>
              <View style={styles.firstView}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/free-psd/dark-mobile-device-mockup_149660-801.jpg?w=740&t=st=1707231932~exp=1707232532~hmac=af85b508b85aa1a29524ba40b8b33649a0a3f204296476253517c4bef50b86d5",
                  }}
                  style={styles.imgDesign}
                />

                <Text style={styles.title}>Devices</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.firstView}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/free-vector/household-appliances-realistic-composition_1284-65307.jpg?w=826&t=st=1707233639~exp=1707234239~hmac=a3e38cf6426e4dea9cd800381491f07648e62dbc00632788b85ff8aaad420a69",
                  }}
                  style={styles.imgDesign}
                />

                <Text style={styles.title}>Appliances</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.design}>
            <TouchableOpacity>
              <View style={styles.firstView}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/free-psd/realistic-modern-living-room-with-sofa-white-wall_176382-494.jpg?w=740&t=st=1707233799~exp=1707234399~hmac=245146da72c4620e07e4da02f97b520b354663bb73ef79aa5d8ad1e5dc188c63",
                  }}
                  style={styles.imgDesign}
                />

                <Text style={styles.title}>Furnitures</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.firstView}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/free-photo/car-car-park_1150-8889.jpg?w=740&t=st=1707233914~exp=1707234514~hmac=d39b30748ff6f65eb2c0c52b27b2915dc255db02216cf03f3264490f7e395536",
                  }}
                  style={styles.imgDesign}
                />

                <Text style={styles.title}>Vehicles</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.design}>
            <TouchableOpacity>
              <View style={styles.firstView}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/free-photo/female-friends-out-shopping-together_53876-25041.jpg?w=740&t=st=1707234052~exp=1707234652~hmac=bc7a6d73259bc361046aba121d7f195fe1d01f10a16a41b67b668639f06027ed",
                  }}
                  style={styles.imgDesign}
                />

                <Text style={styles.title}>Fashion</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.firstView}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/free-photo/delivery-concept-handsome-african-american-delivery-man-carrying-package-box-grocery-food-drink-from-store-isolated-grey-studio-background-copy-space_1258-1232.jpg?w=740&t=st=1707234139~exp=1707234739~hmac=fce79ad4dc3221a64bb2da1830f5f533ec883e727da2f84081f5893a59de91f0",
                  }}
                  style={styles.imgDesign}
                />

                <Text style={styles.title}>Groceries</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.design}>
            <TouchableOpacity>
              <View style={styles.firstView}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/free-photo/portrait-beautiful-african-woman-with-towel-head-smiling-resting-spa-salon_176420-12911.jpg?w=740&t=st=1707234339~exp=1707234939~hmac=27b59283ac7a078ac52b0f03e40bedc0d044173b6a59a8ef92ac4f91bb7d8f48",
                  }}
                  style={styles.imgDesign}
                />

                <Text style={styles.title}>Beauty</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.firstView}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/free-photo/view-illuminated-neon-gaming-keyboard-setup-controller_23-2149529367.jpg?w=740&t=st=1707234590~exp=1707235190~hmac=3d92435ebdda7c9990c5fe0a1592a9ecd36f9b1796bd7e7200facdc16a1ae95f",
                  }}
                  style={styles.imgDesign}
                />

                <Text style={styles.title}>Game Tech</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.design}>
            <TouchableOpacity>
              <View style={styles.firstView}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/premium-photo/portrait-cute-welsh-springer-spaniel-dog-city_743855-19831.jpg?w=740",
                  }}
                  style={styles.imgDesign}
                />

                <Text style={styles.title}>Pet and Supplies</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.firstView}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/free-photo/little-girl-with-backpack-studio_23-2147851792.jpg?w=740&t=st=1707235443~exp=1707236043~hmac=b8377d90a633775bc7507ebc594e5bb715a2379dd39373f75ec45696333e0b5d",
                  }}
                  style={styles.imgDesign}
                />

                <Text style={styles.title}>Kids</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function CustomDrawerContent({ navigation }) {
  const [fashion, setFashion] = useState();
  const productLists = [
    {
      products: "Men",
      id: 1,
    },
    {
      products: "Women",
      id: 2,
    },
    {
      products: "Sports",
      id: 3,
    },
  ];

  const [devices, setDevices] = useState([
    { products: "Phones", id: 1 },
    { products: "Laptops", id: 2 },
    { products: "PC", id: 3 },
    { products: "Accessories", id: 4 },
  ]);

  const [appliances, setAppliances] = useState();
  const allAppliances = [
    { products: "Home", id: 1 },
    { products: "Office", id: 2 },
  ];
  const [Furnitures, setFurnitures] = useState();

  const allFurnitures = [
    { products: "Home", id: 1 },
    { products: "Office", id: 2 },
  ];
  const [vehicles, setVehicles] = useState();

  const allVehicles = [
    { products: "Light", id: 1 },
    { products: "Heavy", id: 2 },
    { products: "Parts", id: 3 },
  ];
  const [groceries, setGroceries] = useState();
  const allGroceries = [
    { products: "Fruits and Vegetables", id: 1 },
    { products: "Meat", id: 2 },
    { products: "Diary", id: 3 },
    { products: "Frozen Food", id: 4 },
    { products: "Canned Goods", id: 5 },
    { products: "Bakery", id: 6 },
  ];
  const [beauty, setBeauty] = useState();

  const beautyProducts = [
    { products: "Men", id: 1 },
    { products: "Women", id: 2 },
    { products: "Unisex", id: 3 },
  ];

  const [gameTech, setGameTech] = useState();
  const gameProducts = [
    { products: "Games", id: 1 },
    { products: "Console", id: 2 },
    { products: "Others", id: 3 },
  ];
  const [pet, setPet] = useState();

  const pets = [
    { products: "Pets", id: 1 },
    { products: "Pet Foods", id: 2 },
    { products: "Medicine", id: 3 },
  ];
  const [kids, setKids] = useState();
  const allKids = [
    { products: "Baby Products", id: 1 },
    { products: "Toddlers and Kindergartens", id: 2 },
    { products: "Others", id: 3 },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[
          styles.make,
          {
            backgroundColor: Themes.colors.primary1,
            justifyContent: "space-between",
            //borderWidth: 1,
            //height: ,
          },
        ]}
      >
        <View style={{}}>
          <FontAwesomeIcon
            icon={faCartShopping}
            size={22}
            style={{ alignSelf: "center", color: Themes.colors.primary }}
          />
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Device");
                {
                  setFurnitures("");
                  setVehicles("");
                  setGroceries("");
                  setBeauty("");
                  setGameTech("");
                  setFashion("");
                  setPet("");
                  setKids("");
                  setAppliances("");
                }
              }}
              style={{ marginBottom: 10 }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Themes.fonts.text700,
                  color: Themes.colors.primary,
                }}
              >
                Devices
              </Text>
            </TouchableOpacity>
            <FlatList
              data={devices}
              renderItem={({ item }) => {
                return (
                  <View>
                    <TouchableOpacity style={{ marginBottom: 15 }}>
                      <Text
                        style={{
                          fontFamily: Themes.fonts.text600,
                          color: "white",
                        }}
                      >
                        {item.products}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                {
                  navigation.navigate("Appliance");
                }
                setAppliances(allAppliances);
                {
                  setDevices("");
                  setFurnitures("");
                  setVehicles("");
                  setGroceries("");
                  setBeauty("");
                  setGameTech("");
                  setFashion("");
                  setPet("");
                  setKids("");
                }
              }}
              style={{ marginBottom: 10 }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Themes.fonts.text700,
                  color: Themes.colors.primary,
                }}
              >
                Appliance
              </Text>
            </TouchableOpacity>
            <FlatList
              data={appliances}
              renderItem={({ item }) => {
                return (
                  <View>
                    <TouchableOpacity style={{ marginBottom: 15 }}>
                      <Text
                        style={{
                          fontFamily: Themes.fonts.text600,
                          color: "white",
                        }}
                      >
                        {item.products}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                setFurnitures(allFurnitures);
                {
                  setAppliances("");
                  setDevices("");
                  setVehicles("");
                  setGroceries("");
                  setBeauty("");
                  setGameTech("");
                  setFashion("");
                  setPet("");
                  setKids("");
                }
              }}
              style={{ marginBottom: 10 }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Themes.fonts.text700,
                  color: Themes.colors.primary,
                }}
              >
                Furnitures
              </Text>
            </TouchableOpacity>
            <FlatList
              data={Furnitures}
              renderItem={({ item }) => {
                return (
                  <View>
                    <TouchableOpacity style={{ marginBottom: 15 }}>
                      <Text
                        style={{
                          fontFamily: Themes.fonts.text600,
                          color: "white",
                        }}
                      >
                        {item.products}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                setVehicles(allVehicles);
                {
                  setAppliances("");
                  setFurnitures("");
                  setDevices("");
                  setGroceries("");
                  setBeauty("");
                  setGameTech("");
                  setFashion("");
                  setPet("");
                  setKids("");
                }
              }}
              style={{ marginBottom: 10 }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Themes.fonts.text700,
                  color: Themes.colors.primary,
                }}
              >
                Vehicles
              </Text>
            </TouchableOpacity>
            <FlatList
              data={vehicles}
              renderItem={({ item }) => {
                return (
                  <View>
                    <TouchableOpacity style={{ marginBottom: 15 }}>
                      <Text
                        style={{
                          fontFamily: Themes.fonts.text600,
                          color: "white",
                        }}
                      >
                        {item.products}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                setGroceries(allGroceries);
                {
                  setAppliances("");
                  setFurnitures("");
                  setDevices("");
                  setFurnitures("");
                  setVehicles("");

                  setBeauty("");
                  setGameTech("");
                  setFashion("");
                  setPet("");
                  setKids("");
                }
              }}
              style={{ marginBottom: 10 }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Themes.fonts.text700,
                  color: Themes.colors.primary,
                }}
              >
                Groceries
              </Text>
            </TouchableOpacity>
            <FlatList
              data={groceries}
              renderItem={({ item }) => {
                return (
                  <View>
                    <TouchableOpacity style={{ marginBottom: 15 }}>
                      <Text
                        style={{
                          fontFamily: Themes.fonts.text600,
                          color: "white",
                        }}
                      >
                        {item.products}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                setBeauty(beautyProducts);
                {
                  setAppliances("");
                  setFurnitures("");
                  setDevices("");
                  setFurnitures("");
                  setGroceries("");
                  setGameTech("");
                  setFashion("");
                  setPet("");
                  setKids("");
                }
              }}
              style={{ marginBottom: 10 }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Themes.fonts.text700,
                  color: Themes.colors.primary,
                }}
              >
                Beauty
              </Text>
            </TouchableOpacity>
            <FlatList
              data={beauty}
              renderItem={({ item }) => {
                return (
                  <View>
                    <TouchableOpacity style={{ marginBottom: 15 }}>
                      <Text
                        style={{
                          fontFamily: Themes.fonts.text600,
                          color: "white",
                        }}
                      >
                        {item.products}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                setGameTech(gameProducts);
                {
                  setAppliances("");
                  setFurnitures("");
                  setDevices("");
                  setFurnitures("");
                  setGroceries("");
                  setBeauty("");
                  setFashion("");
                  setPet("");
                  setKids("");
                }
              }}
              style={{ marginBottom: 10 }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Themes.fonts.text700,
                  color: Themes.colors.primary,
                }}
              >
                Game Tech
              </Text>
            </TouchableOpacity>
            <FlatList
              data={gameTech}
              renderItem={({ item }) => {
                return (
                  <View>
                    <TouchableOpacity style={{ marginBottom: 15 }}>
                      <Text
                        style={{
                          fontFamily: Themes.fonts.text600,
                          color: "white",
                        }}
                      >
                        {item.products}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <View style={{}}>
            <TouchableOpacity
              style={{ marginBottom: 5 }}
              onPress={() => {
                setFashion(productLists);
                {
                  setDevices("");
                  setGameTech("");
                  setBeauty("");
                  setGroceries("");
                  setVehicles("");
                  setFurnitures("");
                  setAppliances("");
                  setPet("");
                  setKids("");
                }
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Themes.fonts.text700,
                  color: Themes.colors.primary,
                }}
              >
                Fashion
              </Text>
            </TouchableOpacity>
            <FlatList
              data={fashion}
              renderItem={({ item }) => {
                return (
                  <View>
                    <TouchableOpacity style={{ marginBottom: 15 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: Themes.fonts.text600,
                          color: "white",
                        }}
                      >
                        {item.products}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <View style={{}}>
            <TouchableOpacity
              style={{ marginBottom: 5 }}
              onPress={() => {
                setPet(pets);
                {
                  setFashion("");
                  setDevices("");
                  setGameTech("");
                  setVehicles("");
                  setAppliances("");
                  setBeauty("");
                  setGroceries("");
                  setFurnitures("");
                  setKids("");
                }
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Themes.fonts.text700,
                  color: Themes.colors.primary,
                }}
              >
                Pets and Supplies
              </Text>
            </TouchableOpacity>
            <FlatList
              data={pet}
              renderItem={({ item }) => {
                return (
                  <View>
                    <TouchableOpacity style={{ marginBottom: 15 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: Themes.fonts.text600,
                          color: "white",
                        }}
                      >
                        {item.products}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <View style={{}}>
            <TouchableOpacity
              style={{ marginBottom: 5 }}
              onPress={() => {
                setKids(allKids);
                {
                  setFashion("");
                  setDevices("");
                  setAppliances("");
                  setFurnitures("");
                  setVehicles("");
                  setGroceries("");
                  setBeauty("");
                  setGameTech("");
                  setPet("");
                  setFashion("");
                }
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Themes.fonts.text700,
                  color: Themes.colors.primary,
                }}
              >
                Kids
              </Text>
            </TouchableOpacity>
            <FlatList
              data={kids}
              renderItem={({ item }) => {
                return (
                  <View>
                    <TouchableOpacity style={{ marginBottom: 15 }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: Themes.fonts.text600,
                          color: "white",
                        }}
                      >
                        {item.products}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={{
              //width: 1,
              backgroundColor: "white",
              padding: 5,
              width: 200,
              borderRadius: 40,
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontSize: 18,
                fontFamily: Themes.fonts.text600,
              }}
            >
              Become a Seller
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const Drawer = createDrawerNavigator();

export function Shop({ navigation }) {
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
        <Drawer.Screen
          name="Device"
          component={Device}

          //options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Appliance"
          component={Appliance}

          //options={{ headerShown: false }}
        />
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
  firstView: {
    //borderWidth: 1,
    //borderColor: "red",
    height: 160,
    width: 160,
    alignItems: "center",
    //justifyContent: "center",
    //borderRadius: 10,
  },
  imgDesign: {
    width: "90%",
    height: "90%",
    borderRadius: 15,
    borderWidth: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: Themes.fonts.text400,
    fontWeight: "600",
  },
  design: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
  },
  make: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : null,
    padding: 10,
  },
});
