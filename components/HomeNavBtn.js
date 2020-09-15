import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

function HomeNavBtn({label, onPress}) {
  return (
    <TouchableOpacity
      style={{
        ...styles.optionButtonTouchableOp,
        borderRightWidth: label == 'STATS' ? 0 : 1,
      }}
      onPress={onPress}>
      <Text style={styles.optionBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  optionButtonTouchableOp: {
    flex: 1,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18104D',
    borderColor: '#5F4CD9',
  },

  optionBtnText: {
    color: '#D3E6F5',
    fontSize: 15,
  },
});

export default HomeNavBtn;
