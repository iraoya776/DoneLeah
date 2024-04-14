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
  Dimensions,
  Share,
  FlatList,
  Modal,
} from "react-native";
import { Themes } from "../Components/Themes";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  faArrowLeft,
  faCartPlus,
  faCartShopping,
  faComment,
  faHeart,
  faHome,
  faPeopleGroup,
  faPhone,
  faPlus,
  faPlusSquare,
  faShare,
  faTrashCan,
  faUserClock,
  faUserGroup,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Components/globalVariables";
import {
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { authentication, db, myDb } from "../../Firebase/Settings";
import { formatMoney } from "../Components/FormatMoney";
import { errorMessage } from "../Components/formatErrorMessage";
import { getAdditionalUserInfo } from "firebase/auth";
import Carousel from "react-native-reanimated-carousel";
import { ScrollView } from "react-native-virtualized-view";
import { Rating, AirbnbRating } from "react-native-ratings";

export function TargetDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    userUID,
    setUserInfo,
    userInfo,
    setPreloader,
    setAllTargets,
    allTargets,
    setAllCategory,
    allCategory,
    wishlistColour,
    setWishlistColour,
    groupInfo,
  } = useContext(AppContext);

  const {
    category,
    product,
    price,
    image,
    description,
    image2,
    image3,
    targetID,
    brand,
    seller,
  } = route.params;
  const pics = [image, image2, image3];
  const getHeight = Dimensions.get("screen").height;
  const picHeight = 0.65 * getHeight;
  const [newTargets, setNewTargets] = useState([]);
  const [newData, setNewData] = useState([]);
  const [count, setCount] = useState(0);
  const [useID, setUseID] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);

  async function handleCart() {
    const q = query(
      collection(db, "cart"),
      where("userUID", "==", userUID),
      where("targetID", "==", targetID)
    );
    const q3 = query(
      collection(db, "setActiveTargets"),
      where("userUID", "==", userUID)
    );

    const filt = query(
      collection(db, "groupForTargets"),
      where("userUID", "==", userUID)
    );
    const filt2 = query(
      collection(db, "groupForTargets"),
      where("userUID2", "==", userUID)
    );
    const filt3 = query(
      collection(db, "groupForTargets"),
      where("userUID3", "==", userUID)
    );
    const filt4 = query(
      collection(db, "groupForTargets"),
      where("userUID4", "==", userUID)
    );
    const filt5 = query(
      collection(db, "groupForTargets"),
      where("userUID5", "==", userUID)
    );

    const q2 = query(collection(db, "cart"), where("userUID", "==", userUID));
    const querySnapshot = await getDocs(q);
    const querySnapshot2Doc = await getDocs(q2);
    const querySnapshot4 = await getDocs(q3);
    const checkFilt = await getDocs(filt);
    const checkFilt2 = await getDocs(filt2);
    const checkFilt3 = await getDocs(filt3);
    const checkFilt4 = await getDocs(filt4);
    const checkFilt5 = await getDocs(filt5);
    const allData = [];
    querySnapshot.forEach((doc) => {
      allData.push({ ...doc.data(), cartID: doc.id });
    });
    const allDocs = [];
    querySnapshot2Doc.forEach((all) => {
      allDocs.push(all.data());
    });
    setPreloader(true);
    if (querySnapshot4.empty === false) {
      setPreloader(false);
      Alert.alert(
        "Message!",
        "cart products are already set as target, and products cannot be added until target is over",
        [{ text: "Ok" }]
      );
    } else if (allDocs.length === 3) {
      setPreloader(false);
      Alert.alert(
        "Message!",
        "You cannot add more than 3 products to your cart",
        [{ text: "Ok" }]
      );
    } else if (querySnapshot.empty === false) {
      setPreloader(false);
      Alert.alert("Message!", "product already exists in cart");
    } else if (querySnapshot.empty === true) {
      //console.log("Document is available");
      const groupCollection = collection(db, "cart");
      const data = {
        product,
        price: Number(price),
        stock: Number(1),
        category,
        userUID: userUID,
        image,
        seller,
        targetID,
        cartGroupPrice: Number(price),
        brand,
        description,
        image2,
        image3,
        createdAt: new Date().getTime(),
      };
      setPreloader(true);
      addDoc(groupCollection, data)
        .then(() => {
          setPreloader(false);
          Alert.alert("Message!", `${product} added successfully`, [
            { text: "Ok" },
          ]);
        })
        .catch(() => {
          setPreloader(false);
          Alert.alert("Unsuccessful", `${product} was not addedd`, [
            { text: "Ok" },
          ]);
        });
    }
  }

  const screenWidth = Dimensions.get("screen").width;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: product,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          //shared with activity type of result.activityType
        } else {
          //shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const [commentColours, setCommentColours] = useState("black");
  const [message, setmessage] = useState("");
  const [productComments, setProductComments] = useState([]);

  useEffect(() => {
    async function checkWishlist() {
      const q = query(
        collection(db, "wishlist"),
        where("userUID", "==", userUID),
        where("targetID", "==", targetID)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty === false) {
        setWishlistColour(Themes.colors.red);
      } else if (querySnapshot.empty === true) {
        setWishlistColour("black");
      }
    }
    checkWishlist();

    async function checkQ() {
      const q = collection(db, "comments");
      const filter = query(q, where("targetID", "==", targetID));
      const querySnapshot = await getDocs(filter);
      const allData = [];
      querySnapshot.forEach((all) => {
        allData.push({ ...all.data(), commentID: all.id });
      });
      allData.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
      setProductComments(allData);
    }
    checkQ();
  }, []);

  const [rated, setRated] = useState(0);

  async function ratingCompleted(rating) {
    setRated(rating);
    console.log(rating);
    const q = collection(db, "comments");
    const filter = query(
      q,
      where("targetID", "==", targetID),
      where("userUID", "==", userUID)
    );
    const querySnapshot = await getDocs(filter);
    const allData = [];
    querySnapshot.forEach((all) => {
      allData.push(all.data());
    });

    const reviews = [
      " ❤ " + " (terrible)",
      " ❤ ❤ " + " (bad)",
      "❤ ❤ ❤ " + " (Ok)",
      "❤ ❤ ❤ ❤ " + " (good)",
      "❤ ❤ ❤ ❤ ❤ " + "(very good)",
      "❤ ❤ ❤ ❤ ❤ ❤ " + " (amazing)",
      "❤ ❤ ❤ ❤ ❤ ❤ ❤ " + "(awesome)",
    ];
    if (allData.length === 3) {
      Alert.alert(
        "Unsuccesful",
        "You cannot have more than 3 reviews for an item",
        [{ text: "Ok" }]
      );
    } else if (allData.length < 4) {
      const myDocumentData = {
        targetID,
        userUID,
        image: userInfo.image,
        name: userInfo.firstName + " " + userInfo.lastName,
        rated: reviews[rating],
        createdAt: new Date().getTime(),
      };
      const myDocRef = collection(db, "comments");
      addDoc(myDocRef, myDocumentData)
        .then(() => {
          Alert.alert("Succesful", "comment has been added successfully");
        })
        .catch(() => {
          //console.log("unsuccessful");
        });
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 20,
              //justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesomeIcon icon={faArrowLeft} size={22} />
            </TouchableOpacity>
            <Text style={{ fontFamily: Themes.fonts.text800, fontSize: 18 }}>
              Target Details
            </Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Carousel
              loop
              width={screenWidth}
              height={picHeight}
              autoPlay={true}
              data={pics}
              scrollAnimationDuration={3000}
              //onSnapToItem={(index) => {console.log("2");}}
              renderItem={({ index }) => (
                <View
                  style={{
                    height: picHeight,
                    width: "100%",
                    // flex: 1,
                    // borderWidth: 1,
                    // justifyContent: 'center',
                    margin: 10,
                  }}
                >
                  <Image
                    style={{
                      width: "100%",
                      height: picHeight,
                      borderRadius: 10,
                      //justifyContent: "flex-end",
                    }}
                    source={{ uri: pics[index] }}
                  />
                </View>
              )}
            />
            <View style={{}}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "flex-end",
                  //borderWidth: 1,
                  width: 90,
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    async function colourSet() {
                      const q = query(
                        collection(db, "wishlist"),
                        where("userUID", "==", userUID),
                        where("targetID", "==", targetID)
                      );
                      const querySnapshot = await getDocs(q);
                      const allData = [];
                      querySnapshot.forEach((all) => {
                        allData.push({ ...all.data(), wishListID: all.id });
                      });
                      if (querySnapshot.empty === false) {
                        setWishlistColour("black");
                        const findID = allData[0].wishListID;
                        setPreloader(true);
                        deleteDoc(doc(db, "wishlist", findID))
                          .then(() => {
                            setPreloader(false);
                            Alert.alert("successful", `${product} deleted`);
                          })
                          .catch(() => {
                            setPreloader(false);
                            Alert.alert(`Unsuccesful`, "something went wrong");
                          });
                      } else if (querySnapshot.empty === true) {
                        setWishlistColour(Themes.colors.red);
                        const wishlist = collection(db, "wishlist");
                        const data = {
                          product,
                          price: Number(price),
                          stock: Number(1),
                          category,
                          userUID,
                          image,
                          seller,
                          targetID,
                          cartGroupPrice: Number(price),
                          brand,
                          description,
                          image2,
                          image3,
                          createdAt: new Date().getTime(),
                        };
                        setPreloader(true);
                        addDoc(wishlist, data)
                          .then(() => {
                            setPreloader(false);
                            console.log("wishlist item added successfully");
                          })
                          .catch(() => {
                            setPreloader(false);
                            console.log("Unsuccessful");
                          });
                      }
                    }
                    colourSet();
                  }}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    size={22}
                    color={wishlistColour}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onShare()}
                  style={{
                    //borderWidth: 1,
                    width: "15%",
                    //flexDirection: "row",
                    padding: 8,
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faShare}
                    size={22}
                    color={Themes.colors.greenMedium}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text
              style={{
                fontFamily: Themes.fonts.text400,
                //marginTop: 5,
                fontSize: 15,
                //letterSpacing: 2,
              }}
            >
              {product}
            </Text>
            {/* use format money here */}
            <Text
              style={{
                marginTop: 15,
                fontFamily: Themes.fonts.text800,
                fontSize: 18,
              }}
            >
              ₦ {formatMoney(price)}
            </Text>
            <View
              style={{
                //borderWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                columnGap: 20,
                marginTop: 5,
              }}
            >
              <Image
                source={{
                  uri: "https://img.freepik.com/premium-psd/leah-typography-text-silver-black-psd-transparent_1161162-30781.jpg?w=740",
                }}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
              {/* <View>
                <Text
                  style={{ fontSize: 16, fontFamily: Themes.fonts.text700 }}
                >
                  {seller}
                </Text>
              </View> */}
            </View>
            <Text
              style={{
                fontFamily: Themes.fonts.text500,
                fontSize: 15,
                marginTop: 10,
              }}
            >
              Description:
            </Text>
            <Text
              style={{
                //fontSize: 16,
                marginTop: 3,
                fontFamily: Themes.fonts.text300,
              }}
            >
              {description}
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <AirbnbRating
              count={6}
              reviews={[
                "Terrible",
                "Bad",
                "OK",
                "Good",
                "Very Good",
                "Amazing",
                "Awesome",
              ]}
              defaultRating={rated + 1}
              size={20}
              reviewColor={Themes.colors.primary}
              onFinishRating={ratingCompleted}
            />
            <View>
              <FlatList
                data={productComments}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        marginVertical: 10,
                        flexDirection: "row",
                        columnGap: 10,
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={{ width: 30, height: 30, borderRadius: 40 }}
                      />
                      <View>
                        <Text style={{ fontFamily: Themes.fonts.text200 }}>
                          {item.name}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "flex-end",
                            justifyContent: "space-between",
                            //borderWidth: 1,
                            width: "93%",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: Themes.fonts.text400,
                              //fontSize: 16,
                            }}
                          >
                            {item.rated}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              function deleteComment(id) {
                                if (item.userUID === userUID) {
                                  //console.log("comment owner");
                                  setPreloader(true);
                                  deleteDoc(doc(db, "comments", id))
                                    .then(() => {
                                      setPreloader(false);
                                      Alert.alert(
                                        "successful",
                                        "comment has been deleted"
                                      );
                                    })
                                    .catch(() => {
                                      setPreloader(false);
                                      //console.log("something went wrong");
                                      Alert.alert(
                                        "unsuccesful",
                                        "comment could not be deleted"
                                      );
                                    });
                                } else {
                                  setPreloader(false);
                                  Alert.alert(
                                    "Unsuccesful",
                                    "comment can only be deleted by owner"
                                  );
                                }
                              }
                              deleteComment(item.commentID);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrashCan} size={13} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View style={{ width: "100%" }}>
          <TouchableOpacity
            onPress={() => handleCart()}
            style={{
              //borderWidth: 1,
              width: "100%",
              flexDirection: "row",
              padding: 8,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Themes.colors.primary,
            }}
          >
            <Text
              style={{
                letterSpacing: 0.5,
                fontFamily: Themes.fonts.text800,
                fontSize: 18,
                color: "white",
              }}
            >
              Add{" "}
            </Text>
            <FontAwesomeIcon icon={faCartPlus} size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : null,
    padding: 10,
  },
});
