import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IntroScreen } from "../Screens/Intro";
import { HomeScreen } from "../Screens/HomeScreen";
import { Login } from "../Screens/Login";
import { SignUp } from "../Screens/SignUp";
import { Profile } from "../Screens/Profile";
import { EditProfile } from "../Screens/EditProfile";
import { SearchScreen } from "../Screens/SearchScreen";
import { Category } from "../Screens/Categories";
import { TargetDetails } from "../Screens/TargetDetails";
import { Cart } from "../Screens/Cart";
import { TargetForm } from "../Screens/TargetForm";
import { CartTargetForm } from "../Screens/CartTargetForm";
import { Wishlist } from "../Screens/WishList";
import { SetTargetDetails } from "../Screens/SetTargetDetails";
import { CreateTarget } from "../Screens/CreateTarget";
import { ActiveTargets } from "../Screens/ActiveTargets";
import { TargetCheckout } from "../Screens/TargetCheckout";
import { ChangePassword } from "../Screens/ChangePassword";
import { Pay2 } from "../Screens/Pay2";
import { History } from "../Screens/History";
import { Orders } from "../Screens/Orders";
import { DeleteAccount } from "../Screens/DeleteAccount";
import { Deleted } from "../Screens/DeletedPage";
import { LeahInfo } from "../Screens/LeahInfo";

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
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="TargetDetails" component={TargetDetails} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="TargetForm" component={TargetForm} />
        <Stack.Screen name="CartTargetForm" component={CartTargetForm} />
        <Stack.Screen name="Wishlist" component={Wishlist} />
        <Stack.Screen name="SetTargetDetails" component={SetTargetDetails} />
        <Stack.Screen name="CreateTarget" component={CreateTarget} />
        <Stack.Screen name="ActiveTargets" component={ActiveTargets} />
        <Stack.Screen name="TargetCheckout" component={TargetCheckout} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Pay2" component={Pay2} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
        <Stack.Screen name="Deleted" component={Deleted} />
        <Stack.Screen name="LeahInfo" component={LeahInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
