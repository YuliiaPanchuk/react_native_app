import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

const List = props => {
  return (
    <View>
      <FlatList
        data={props.items}
        renderItem={({item}) => (
          <TouchableHighlight>
            <View style={styles.itemWrapper}>
              <Text style={styles.item}>{item.title}</Text>
              <Text style={styles.item}>${item.price}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'lightgray',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});

export default List;
