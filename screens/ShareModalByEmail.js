// ShareModal.js
import React from "react";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export default function ShareModalByEmail({
  modalVisible,
  setModalVisible,
  setEmail,
  setEmailMessage,
  handleShare,
  email,
  emailMessage,
}) {
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable
            style={{
              position: "absolute",
              right: 15,
              top: 15,
            }}
            onPress={() => {
              setModalVisible(!modalVisible);
              setEmail("");
              setEmailMessage("");
            }}
          >
            <FontAwesome5Icon
              size={20}
              color={"#508D69"}
              name="times"
              style={{
                marginLeft: 8,
              }}
            />
          </Pressable>
          <Text style={styles.modalText}>
            Share your List By Email Address{" "}
          </Text>
          <View style={{ marginBottom: 15 }}>
            <Pressable
              onPress={() => {
                console.log("preseed");
              }}
            >
              <Text style={styles.textLabel}>Email Address</Text>
              <TextInput
                value={email}
                style={styles.textInput}
                onChangeText={(text) => setEmail(text)}
              />
            </Pressable>
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.textLabel}>Message</Text>
            <TextInput
              style={styles.messageInput}
              multiline
              numberOfLines={8}
              placeholder="Type your Message here..."
              onChangeText={(value) => setEmailMessage(value)}
              value={emailMessage}
            />
          </View>
          <Pressable style={styles.doneBtnWrapper} onPress={handleShare}>
            <Text style={styles.doneText}>Send</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
  },
  doneBtnWrapper: {
    backgroundColor: "#508D69",
    borderRadius: 50,
    marginTop: 10,
  },
  doneText: {
    color: "white",
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    borderColor: "#ccc",
    paddingLeft: 5,
  },
  textLabel: {
    color: "grey",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },

  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    marginBottom: 80,
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  messageInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
  },
});
