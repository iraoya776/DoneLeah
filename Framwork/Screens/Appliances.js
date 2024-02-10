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
import { Themes } from "../Components/Themes";

export function Appliances({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: Themes.colors.primary,
              marginBottom: 5,
            }}
          >
            Appliances
          </Text>
          <TouchableOpacity>
            <View style={styles.viewDesign}>
              <Image
                source={{
                  uri: "https://img.freepik.com/free-vector/household-appliances-realistic-composition_1284-65307.jpg?w=826&t=st=1707498662~exp=1707499262~hmac=df7fd57a0a5c249793ca5c599b035942d8a5ada85b1ccbe049429b176dc0d25f",
                }}
                style={styles.imgDesign}
              />
              <Text style={styles.txt}>Home</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.viewDesign}>
              <Image
                source={{
                  uri: "https://img.freepik.com/free-photo/side-view-woman-working-with-printer_23-2149713678.jpg?w=740&t=st=1707496714~exp=1707497314~hmac=462c59ad60585bee5003ab3b3f7dea50f05ca14ae9401b5e14772497bee6360c",
                }}
                style={styles.imgDesign}
              />
              <Text style={styles.txt}>Office</Text>
            </View>
          </TouchableOpacity>
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
  viewDesign: {
    width: "100%",
    height: 200,
    //borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  imgDesign: {
    width: 160,
    height: 160,
    borderRadius: 20,
  },
  txt: {
    fontSize: 18,
    marginRight: 40,
    fontFamily: Themes.fonts.text400,
  },
});
