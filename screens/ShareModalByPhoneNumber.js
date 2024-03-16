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

export default function ShareModalByPhoneNumber({
  modalVisible,
  setModalVisible,
  setPhoneNumber,
  setShareMessage,
  handleShare,
  phoneNumber,
  shareMessage,
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
              setPhoneNumber("");
              setShareMessage("");
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
          <Text style={styles.modalText}>Share your List By Phone Number </Text>
          <View style={{ marginBottom: 15 }}>
            <Pressable
              onPress={() => {
                console.log("preseed");
              }}
            >
              <Text style={styles.textLabel}>Phone Number:</Text>
              <TextInput
                value={phoneNumber}
                editable={true}
                style={styles.textInput}
                keyboardType="numeric"
                onChangeText={(text) => setPhoneNumber(text)}
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
              onChangeText={(value) => setShareMessage(value)}
              value={shareMessage}
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
