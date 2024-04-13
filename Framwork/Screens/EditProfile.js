import { useContext, useState } from "react";
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
  Modal,
  Dimensions,
} from "react-native";
import { AppContext } from "../Components/globalVariables";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faArrowLeftLong,
  faCamera,
  faCameraRetro,
  faChevronLeft,
  faImage,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Themes } from "../Components/Themes";
import { db } from "../../Firebase/Settings";
import { doc, updateDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { verifyBeforeUpdateEmail } from "firebase/auth";
import { Picker } from "@react-native-picker/picker";

export function EditProfile({ navigation }) {
  const {
    userUID,
    setUserInfo,
    userInfo,
    setPreloader,
    setAllTargets,
    setDocID,
  } = useContext(AppContext);
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [gender, setGender] = useState(userInfo.gender);
  //const [address, setAddress] = useState(userInfo.address);
  //const [mobile, setMobile] = useState(userInfo.phone);
  const [email, setEmail] = useState(userInfo.email);
  //const [userName, setUserName] = useState(userInfo.userName);
  const [image, setImage] = useState(userInfo.image);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [preVisibility, setpreVisibility] = useState(false);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      const { uri } = result.assets[0];
      setImage(uri);
    }
  };

  const selectCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      const { uri } = result.assets[0];
      setImage(uri);
    }
  };

  function editProfile() {
    setPreloader(true);
    updateDoc(doc(db, "users", userUID), {
      firstName,
      lastName,
      //phone: mobile,
      //userName,
      gender,
      //address,
      image: image,
      email,
    })
      .then(() => {
        setPreloader(false);
        Alert.alert("Edit Profile", "Profile has been updated successfully");
      })
      .catch((error) => {
        setPreloader(false);
        Alert.alert("Message!", "something went wrong", [
          { text: "Try Again" },
        ]);
      });
  }

  const setModal = () => {
    const changeFactor = !modalVisibility;
    setModalVisibility(changeFactor);
  };

  const previewModal = () => {
    setpreVisibility(!preVisibility);
  };
  const closeModal = () => {
    const changeFactor = !modalVisibility;
    setModalVisibility(changeFactor);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={
              Platform.OS === "ios"
                ? "padding"
                : "height" && Platform.OS === "android"
                ? "padding"
                : "height"
            }
          >
            <View style={styles.firstView}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <FontAwesomeIcon icon={faArrowLeftLong} size={22} />
              </TouchableOpacity>
              <Text style={{ fontSize: 18, fontFamily: Themes.fonts.text800 }}>
                {" "}
                {} Profile
              </Text>
            </View>

            <View style={{ alignItems: "center" }}>
              <Image
                source={{
                  uri:
                    image ||
                    "https://img.freepik.com/free-vector/gradient-l-logo-template_23-2149372723.jpg?w=740&t=st=1707945826~exp=1707946426~hmac=52255321e83d06c488a7391b9f4f0917842b7126f6a4bc83979216262905fc6d",
                }}
                style={styles.img}
              />
              <TouchableOpacity
                onPress={() => setModal()}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 180,
                }}
              >
                <FontAwesomeIcon
                  icon={faCamera}
                  size={30}
                  style={{ color: Themes.colors.primary }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginVertical: 5,
                //borderWidth: 1,
                height: Dimensions.get("screen").height * 0.6,
              }}
            >
              <Text style={styles.txt}>First Name</Text>
              <TextInput
                keyboardType="default"
                placeholder={userInfo.firstName}
                autoCapitalize="words"
                onChangeText={(text) => setFirstName(text.trim())}
                value={firstName}
                style={styles.input}
              />
              <Text style={styles.txt}>Last Name</Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder={userInfo.lastName}
                autoCapitalize="words"
                onChangeText={(text) => setLastName(text.trim())}
                value={lastName}
              />
              {/* <Text style={styles.txt}>Mobile Number</Text>
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                placeholder={userInfo.phone}
                onChangeText={(text) => setMobile(text.trim())}
                value={mobile}
              /> */}
              {/* <Text style={styles.txt}>userName</Text>
              <TextInput
                style={styles.input}
                placeholder={userInfo.userName}
                autoCapitalize="none"
                onChangeText={(text) => setUserName(text.trim())}
                value={userName}
              /> */}
              {/* <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder={userInfo.gender}
                onChangeText={(text) => setGender(text.trim())}
                value={gender}
              /> */}
              <View style={{ borderWidth: 1, borderRadius: 10 }}>
                <Text style={{ fontFamily: Themes.fonts.text400 }}>Gender</Text>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                >
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                </Picker>
              </View>
              <Text style={styles.txt}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setEmail(text.trim())}
                value={email}
                keyboardType="email-address"
                placeholder={userInfo.email}
              />

              {/* <Text style={styles.txt}>Address</Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder={userInfo.address}
                onChangeText={(text) => setAddress(text.trim())}
                value={address}
              /> */}
            </View>

            <TouchableOpacity style={styles.lastBtn} onPress={editProfile}>
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontFamily: Themes.fonts.text800,
                  fontSize: 18,
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
      <Modal visible={modalVisibility} animationType="slide" transparent={true}>
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            flex: 1,
            justifyContent: "flex-end",
            padding: 2,
          }}
        >
          <View
            style={{
              backgroundColor: Themes.colors.primary1,
              height: 170,
              //borderWidth: 1,
              //borderRadius: 30,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}
          >
            <View style={{ alignItems: "flex-end", margin: 10 }}>
              <TouchableOpacity onPress={closeModal}>
                <FontAwesomeIcon
                  icon={faXmark}
                  size={24}
                  style={{ color: Themes.colors.primary }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                selectImage();
                closeModal();
              }}
            >
              <View
                style={{
                  marginLeft: 10,

                  //padding: 5,
                  flexDirection: "row",
                  //borderBottomWidth: 1,
                  borderColor: Themes.colors.primary,
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faImage}
                  size={25}
                  style={{ color: Themes.colors.primary }}
                />
                <Text style={{ fontSize: 15, color: "white" }}>
                  {" "}
                  {} Gallery
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: Themes.colors.primary,
                marginVertical: 10,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                selectCamera();
                closeModal();
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 10,
                  //padding: 5,
                }}
              >
                <FontAwesomeIcon
                  icon={faCamera}
                  size={25}
                  style={{ color: Themes.colors.primary }}
                />
                <Text style={{ fontSize: 15, color: "white" }}> {} Camera</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : null,
    padding: 10,
    justifyContent: "center",
  },
  firstView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    columnGap: 20,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 80,
    //borderWidth: 1,
    //borderColor: "black",
  },
  lastBtn: {
    //borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    //borderColor: Themes.colors.primary,
    backgroundColor: Themes.colors.primary,
    marginTop: 15,
  },
  txt: {
    //fontSize: 17,
    fontFamily: Themes.fonts.text400,
  },
  input: {
    borderWidth: 1,
    padding: 3,
    //borderColor: Themes.colors.primary,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 5,
  },
});
