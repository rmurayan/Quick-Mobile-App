// ItemModal.js
import { Modal, View, Text, TextInput, Pressable } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet } from 'react-native';
const ItemModal = ({
  modalVisible,
  editItemIndex,
  editItemName,
  editQuantity,
  setEditItemName,
  setEditQuantity,
  setItemName,
  itemName,
  quantity,
  setQuantity,
  addItem,
  clearFields,
}) => {
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={modelStyle.centeredView}>
        <View style={modelStyle.modalView}>
          <Pressable
            style={{
              position: 'absolute',
              right: 15,
              top: 15,
            }}
            onPress={clearFields}
          >
            <FontAwesome5Icon
              size={20}
              color={'#54A695'}
              name="times"
              style={{
                marginLeft: 8,
              }}
            />
          </Pressable>
          <Text style={modelStyle.modalText}>
            {editItemIndex !== null ? 'Edit Item' : 'Add New Item'}
          </Text>
          <View style={{ marginBottom: 15 }}>
            <Text style={modelStyle.textLabel}>Item Name</Text>
            <TextInput
              value={editItemIndex !== null ? editItemName : itemName}
              style={modelStyle.textInput}
              onChangeText={(text) =>
                editItemIndex !== null
                  ? setEditItemName(text.toLowerCase())
                  : setItemName(text.toLowerCase())
              }
            />
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text style={modelStyle.textLabel}>Quantity:</Text>
            <TextInput
              value={editItemIndex !== null ? editQuantity : quantity}
              style={modelStyle.textInput}
              keyboardType="numeric"
              onChangeText={(text) =>
                editItemIndex !== null
                  ? setEditQuantity(text)
                  : setQuantity(text)
              }
            />
          </View>
          <Pressable style={modelStyle.doneBtnWrapper} onPress={addItem}>
            <Text style={modelStyle.doneText}>
              {editItemIndex !== null ? 'Update' : 'Add'}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
const modelStyle = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    marginBottom: 80,
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  textLabel: {
    color: 'grey',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    borderColor: '#ccc',
    paddingLeft: 5,
  },
  doneBtnWrapper: {
    backgroundColor: '#54A695',
    borderRadius: 50,
    marginTop: 10,
  },
  doneText: {
    color: 'white',
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ItemModal;
