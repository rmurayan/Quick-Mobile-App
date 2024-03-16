import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Register from "./screens/Register";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import ShareModalByPhoneNumber from "./screens/ShareModalByPhoneNumber";
import ShareModalByEmail from "./screens/ShareModalByEmail";
import { isValidPhoneNumber, isEmailValid } from "./Ultis/utilities";
import * as MailComposer from "expo-mail-composer";
import { Alert, View, Image } from "react-native";
import { useState } from "react";
import * as SMS from "expo-sms";
import { showToast } from "./Ultis/utilities";
import { getUserId, handleLogout } from "./Ultis/DB";
import { getCurrentUserInfo, firestore } from "./Ultis/DB";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import FoodItemsContext from "./FoodItemsContext";

export default function Navigator() {
  const navigation = useNavigation();
  const { foodItems } = useContext(FoodItemsContext);

  const Stack = createStackNavigator();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberMessage, setPhoneNumberMessage] = useState("");
  const [phoneNumberModalVisible, setPhoneNumberModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const handelSyncList = async () => {
    try {
      const foodItemsCollection = collection(
        firestore,
        "users",
        getUserId(),
        "foodItems"
      );
      const querySnapshot = await getDocs(foodItemsCollection);

      // Check if food items data already exists in Firebase
      if (querySnapshot.empty) {
        // If data doesn't exist, add a new document
        const itemsJSON = JSON.stringify(foodItems);
        await addDoc(foodItemsCollection, { items: itemsJSON });
      } else {
        // If data exists, update the existing document
        const docId = querySnapshot.docs[0].id; // Assuming there's only one document
        const itemsJSON = JSON.stringify(foodItems);
        await setDoc(doc(foodItemsCollection, docId), { items: itemsJSON });
      }
      Alert.alert(
        "Your grocery list items are now available on Website application after being synced to the cloud."
      );
    } catch (error) {
      Alert.alert("Error saving food items to Firestore");
    }
  };
  const shareByEmail = () => {
    setEmailModalVisible(!emailModalVisible);
  };
  const shareByPhoneNumber = () => {
    setPhoneNumberModalVisible(!phoneNumberModalVisible);
  };

  const emailHandleShare = async () => {
    if (email === "" && emailMessage === "") {
      Alert.alert(
        "Missing Fields",
        "Please ensure that both the Email and message fields are not left empty."
      );
      return;
    }
    if (!isEmailValid(email)) {
      Alert.alert("Invalid Email", "The email address is not valid.");
      return;
    }
    try {
      const { status } = await MailComposer.composeAsync({
        recipients: [email],
        subject: "Quick List App",
        body:  getShareMessageContent(emailMessage),
        isHtml: false,
      });

      if (status === "sent") {
        setEmailModalVisible(!emailModalVisible);
        setEmail("");
        setEmailMessage("");
        showToast("success", "Your email has been sent successfully!");
      } else {
        showToast("error", "Unfortunately, the email was not sent");
      }
    } catch (error) {
      showToast("error", "Error composing email");
    }
  };
  const getShareMessageContent = (userMessage) => {
  const items = foodItems.map(item => item.name).join(", "); // Assuming foodItems is an array of objects with a 'name' property
  const messageContent = `${userMessage} \n \n My grocery list:\n${items}`;
  return messageContent;
  };

  const phoneNumberHandleShare = async () => {
    if (phoneNumber === "" && phoneNumberMessage === "") {
      Alert.alert(
        "Missing Fields",
        "Please ensure that both the phone number and message fields are not left empty."
      );
      return;
    }
    if (!isValidPhoneNumber(phoneNumber)) {
      Alert.alert(
        "Invalid format",
        "The phone number you provided is not valid."
      );
      return;
    }
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        phoneNumber,
        getShareMessageContent(phoneNumberMessage)
      );
      switch (result) {
        case "sent":
          Alert.alert("Message has been send");
          showToast("success", "Your SMS Message has been sent successfully!");
          setPhoneNumber("");
          setPhoneNumberMessage("");
          setPhoneNumberModalVisible(!phoneNumberModalVisible);
          break;
        case "cancelled":
          showToast("error", "Unfortunately, the SMS Message was not sent");
          break;
        default:
          Alert.alert("Unkown error");
      }
    } else {
      Alert.alert(
        "Error",
        "Unfortunately, SMS service is not currently available for you."
      );
    }
  };

  return (
    <>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: () => (
              <Image
                style={{ width: 150, height: 180, resizeMode: "contain" }}
                source={require("./assets/logo.png")}
              />
            ),
            headerTitleAlign: "left",
            headerLeft: () => null,
            headerRight: () => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  padding: 5,
                }}
              >
                <FontAwesome5Icon
                  size={25}
                  color={"#54A695"}
                  name="user-alt"
                  style={{ marginHorizontal: 15 }}
                  onPress={() => {
                    Alert.alert(
                      "User Profile Information",
                      `The email address you have signed is ${
                        getCurrentUserInfo().email
                      }`
                    );
                  }}
                />
                <FontAwesome5Icon
                  size={25}
                  color={"#54A695"}
                  name="share-alt"
                  style={{ marginHorizontal: 15 }}
                  onPress={() => {
                    Alert.alert(
                      "Choose an option",
                      "How would you like to share?",
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                        {
                          text: "Share by Email",
                          onPress: () => shareByEmail(),
                        },
                        {
                          text: "Share by Phone Number",
                          onPress: () => shareByPhoneNumber(),
                        },
                      ],
                      { cancelable: true }
                    );
                  }}
                />
                <FontAwesome5Icon
                  size={25}
                  color={"#54A695"}
                  name="sync-alt"
                  style={{
                    marginLeft: 10,
                  }}
                  onPress={async () => {
                    await handelSyncList()
                  }}
                />
                <FontAwesome5Icon
                  size={25}
                  color={"#54A695"}
                  name="sign-out-alt"
                  style={{
                    marginLeft: 10,
                  }}
                  onPress={async () => {
                    try {
                      await handelSyncList();
                      handleLogout();
                      setTimeout(() => {
                        // navigate to login page
                        navigation.navigate("Login");
                      }, 2000);
                    } catch (error) {
                      console.error("Error during logout:", error);
                    }
                  }}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>

      <ShareModalByPhoneNumber
        modalVisible={phoneNumberModalVisible}
        setModalVisible={setPhoneNumberModalVisible}
        setPhoneNumber={setPhoneNumber}
        setShareMessage={setPhoneNumberMessage}
        handleShare={phoneNumberHandleShare}
        phoneNumber={phoneNumber}
        shareMessage={phoneNumberMessage}
      />
      <ShareModalByEmail
        modalVisible={emailModalVisible}
        setModalVisible={setEmailModalVisible}
        setEmail={setEmail}
        setEmailMessage={setEmailMessage}
        handleShare={emailHandleShare}
        email={email}
        emailMessage={emailMessage}
      />
    </>
  );
}
