import { ActivityIndicator, Modal, Text, View } from "react-native";
import { AppContext } from "./globalVariables";
import { useContext } from "react";
import { Themes } from "./Themes";

export function Preloader() {
  const { preloader } = useContext(AppContext);
  return (
    <>
      <Modal visible={preloader} transparent={true}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            backgroundColor: "#ffffffcd",
          }}
        >
          <ActivityIndicator size="large" color={Themes.colors.primary} />
        </View>
      </Modal>
    </>
  );
}
