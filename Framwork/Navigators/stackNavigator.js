import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IntroScreen } from "../Screens/Intro";
import { HomeScreen } from "../Screens/HomeScreen";
import { Login } from "../Screens/Login";
import { SignUp } from "../Screens/SignUp";
import { Appliances } from "../Screens/Appliances";
import { Furnitures } from "../Screens/Furnitures";
import { Fashion } from "../Screens/Fashion";
import { Groceries } from "../Screens/Groceries";
import { Beauty } from "../Screens/Beauty";
import { GameTech } from "../Screens/GameTech";
import { PetAndSupplies } from "../Screens/PetAndSupplies";
import { Donations } from "../Screens/Donations";
import { Shop } from "../Screens/Shop";
import { Devices } from "../Screens/Devices";
import { Help } from "../Screens/Help";
import { Sell } from "../Screens/Sell";
import { Profile } from "../Screens/Profile";
import { EditProfile } from "../Screens/EditProfile";

const Stack = createNativeStackNavigator();
//https://reactnavigation.org/docs/hello-react-navigation

export function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Devices" component={Devices} />
        <Stack.Screen name="Appliances" component={Appliances} />
        <Stack.Screen name="Furnitures" component={Furnitures} />
        <Stack.Screen name="Fashion" component={Fashion} />
        <Stack.Screen name="Groceries" component={Groceries} />
        <Stack.Screen name="Beauty" component={Beauty} />
        <Stack.Screen name="GameTech" component={GameTech} />
        <Stack.Screen name="PetAndSupplies" component={PetAndSupplies} />
        <Stack.Screen name="Donations" component={Donations} />
        <Stack.Screen name="Shop" component={Shop} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Sell" component={Sell} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
