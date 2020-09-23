import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

function DeleteBtn({onPress, title}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.deleteButton,
        backgroundColor: `${title == 'Full App Access' ? 'green' : '#ff5353'}`,
      }}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FF5353',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default DeleteBtn;
