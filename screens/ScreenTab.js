import React, { useState } from "react";
import { RenderListItem } from "../screens/ItemListRender";
import ItemModal from "../screens/ItemModal";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ImageBackground,
  Alert,
  Image,
} from "react-native";
import { screenStyle } from "../Ultis/Styles";
import { showToast } from "../Ultis/utilities";
const ScreenTab = ({ items, setItems,allIems,category }) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editItemIndex, setEditItemIndex] = useState(null);
  const [editItemName, setEditItemName] = useState("");
  const [editQuantity, setEditQuantity] = useState("");

  const clearFields = () => {
    setModalVisible(!modalVisible);
    setItemName("");
    setQuantity("");
    setEditItemIndex(null);
    setEditItemName("");
    setEditQuantity("");
  };

  const addItem = () => {
    if ((itemName || editItemName) && (quantity || editQuantity)) {
      const newItem = {
        name: itemName || editItemName,
        quantity: quantity || editQuantity,
        category: category
      };
      const itemExists = allIems.some((item) => item.name === newItem.name);
      if (itemExists && editItemIndex == null) {
        Alert.alert(
          "Item existed",
          `Item ${newItem.name} already exists in the list`
        );
      } else {
        if (editItemIndex !== null) {
          const updatedData = allIems.map((item) =>
          item.name === editItemIndex.name ? newItem : item
          );
          showToast(
            'success',
            `Your item ${editItemIndex.name} has been successfully updated!`
          );
          setItems(updatedData);
        } else {
            showToast(
                'success',
                `The Item ${newItem.name} has been added`
              );
          setItems([...allIems, newItem]);

        }
        clearFields();
      }
    }
  };

  const startEdit = (item) => {
    setEditItemIndex(item);
    setEditItemName(item.name);
    setEditQuantity(item.quantity);
    setModalVisible(true);
  };
  const renderItem = ({ item, index }) => (
    <RenderListItem
      item={item}
      index={index}
      startEdit={startEdit}
      deleteItem={deleteItem}
    />
  );

  const deleteItem = (deletedItem) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            const updatedItems = allIems?.filter((item) => item.name !== deletedItem.name);
            showToast( "success",
            `Your item ${deletedItem.name} has been successfully removed`
            )
            setItems(updatedItems);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ImageBackground
      source={require("../assets/BG.png")}
      style={{
        flex: 1,
      }}
    >
      <View style={screenStyle.container}>
        {items.length === 0 ? (
          <Image
            source={require("../assets/emptyCart.png")}
            style={{ width: 300, height: 300 }}
          />
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        )}

        <ItemModal
          modalVisible={modalVisible}
          editItemIndex={editItemIndex}
          editItemName={editItemName}
          editQuantity={editQuantity}
          setEditItemName={setEditItemName}
          setEditQuantity={setEditQuantity}
          setItemName={setItemName}
          setQuantity={setQuantity}
          itemName={itemName}
          quantity={quantity}
          addItem={addItem}
          clearFields={clearFields}
        />

        <Pressable
          style={screenStyle.createBtnWrapper}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text style={screenStyle.createBtn}>Add New Item</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default ScreenTab;
