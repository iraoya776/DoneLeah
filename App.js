import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { IntroScreen } from "./Framwork/Screens/Intro";
import { useCallback, useEffect, useState } from "react";
import * as Font from "expo-font";
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import * as SplashScreen from "expo-splash-screen";
import {
  Raleway_100Thin,
  Raleway_200ExtraLight,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
  Raleway_800ExtraBold,
  Raleway_900Black,
} from "@expo-google-fonts/raleway";
import { Login } from "./Framwork/Screens/Login";
import { SignUp } from "./Framwork/Screens/SignUp";
import { StackNavigator } from "./Framwork/Navigators/stackNavigator";
import { AppProvider } from "./Framwork/Components/globalVariables";
import { Preloader } from "./Framwork/Components/Prelaoder";
import { Themes } from "./Framwork/Components/Themes";

//react-native-gesture-handler

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({ Pacifico_400Regular });
        await Font.loadAsync({ Raleway_500Medium });
        await Font.loadAsync({ Raleway_200ExtraLight });
        await Font.loadAsync({ Raleway_300Light });
        await Font.loadAsync({ Raleway_100Thin });
        await Font.loadAsync({ Raleway_400Regular });
        await Font.loadAsync({ Raleway_600SemiBold });
        await Font.loadAsync({ Raleway_700Bold });
        await Font.loadAsync({ Raleway_800ExtraBold });
        await Font.loadAsync({ Raleway_900Black });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      {/* <IntroScreen /> */}
      {/* <Login /> */}
      {/* <SignUp /> */}
      <AppProvider>
        <Preloader />
        <StackNavigator />
      </AppProvider>
    </View>
  );
}
