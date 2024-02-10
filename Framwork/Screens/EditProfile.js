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
} from "react-native";
import { AppContext } from "../Components/globalVariables";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
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
  const [address, setAddress] = useState(userInfo.address);
  const [mobile, setMobile] = useState(userInfo.phone);
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState(userInfo.userName);
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
      phone: mobile,
      userName,
      gender,
      address,
      image,
      //email,
    })
      .then(() => {
        setPreloader(false);
        Alert.alert("Edit Profile", "Profile has been updated successfully");
      })
      .catch((error) => {
        // console.log(typeof error.code)
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
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            {/* <Text style={{ textAlign: "center", fontSize: 20 }}>
              Leah Cares For You...
            </Text> */}
            <View style={styles.firstView}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack({
                    userInfo,
                  });
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} size={20} />
              </TouchableOpacity>
              <Text style={{ fontSize: 18 }}> {} Profile</Text>
            </View>
            <View style={{ alignSelf: "center" }}>
              <Image
                source={{
                  uri: image,
                }}
                style={styles.img}
              />
              <TouchableOpacity
                onPress={() => setModal()}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 95,
                }}
              >
                <FontAwesomeIcon icon={faCamera} size={25} />
              </TouchableOpacity>
            </View>

            <View style={{ marginVertical: 5 }}>
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
              <Text style={styles.txt}>Mobile Number</Text>
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                placeholder={userInfo.phone}
                onChangeText={(text) => setMobile(text.trim())}
                value={mobile}
              />
              <Text style={styles.txt}>userName</Text>
              <TextInput
                style={styles.input}
                placeholder={userInfo.userName}
                autoCapitalize="none"
                onChangeText={(text) => setUserName(text.trim())}
                value={userName}
              />
              <Text style={styles.txt}>Gender</Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder={userInfo.gender}
                onChangeText={(text) => setGender(text.trim())}
                value={gender}
              />
              <Text style={styles.txt}>Email</Text>
              <TextInput style={styles.input} value={userInfo.email} />
              <Text style={{ color: Themes.colors.primary }}>
                email cannot be changed
              </Text>
              <Text style={styles.txt}>Address</Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder={userInfo.address}
                onChangeText={(text) => setAddress(text.trim())}
                value={address}
              />
            </View>

            <TouchableOpacity style={styles.lastBtn} onPress={editProfile}>
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontFamily: Themes.fonts.text700,
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
                  style={{ color: Themes.colors.redMedium }}
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
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: "black",
  },
  lastBtn: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 40,
    borderColor: Themes.colors.primary,
    backgroundColor: Themes.colors.primary,
    marginTop: 15,
  },
  txt: {
    fontSize: 17,
    fontFamily: Themes.fonts.text400,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderColor: Themes.colors.primary,
    borderRadius: 10,
    fontSize: 18,
  },
});
