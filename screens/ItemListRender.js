import React from 'react';
import { View, Text, Pressable } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet } from 'react-native';

const RenderListItem = ({ item, index, startEdit, deleteItem }) => (
  <View style={screenStyle.listContainer}>
    <View style={screenStyle.infoContainer}>
      <View style={screenStyle.listInfo}>
        <FontAwesome5Icon name="caret-right" size={20} color="#54A695" />
        <Text style={screenStyle.itemText}>Item: {item.name}</Text>
      </View>
      <View style={screenStyle.listInfo}>
        <FontAwesome5Icon name="caret-right" size={20} color="#54A695" />
        <Text style={screenStyle.itemText}>Quantity: {item.quantity}</Text>
      </View>
    </View>
    <Pressable
      onPress={() => startEdit(item)}
      style={screenStyle.iconContainer}
    >
      <FontAwesome5Icon name="edit" size={25} color="#54A695" />
    </Pressable>
    <Pressable
      onPress={() => deleteItem(item)}
      style={screenStyle.iconContainer}
    >
      <FontAwesome5Icon name="trash" size={25} color="#54A695" />
    </Pressable>
  </View>
);

const screenStyle = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F5F2',
    borderRadius: 8,
    padding: 20,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  infoContainer: {
    flexDirection: 'column',
    flex: 4,
  },
  listInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 2,
    padding: 5,
  },
  itemText: {
    fontWeight: '600',
    padding: 2,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export { RenderListItem };
