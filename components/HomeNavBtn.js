import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

function HomeNavBtn({label, onPress}) {
  return (
    <TouchableOpacity
      style={{
        ...styles.optionButtonTouchableOp,
        borderRightWidth: label == 'STATS' ? 0 : 1,
      }}
      onPress={onPress}>
      {/* <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#6DABDF', '#5EA3DC', '#4F9BD8']}
        style={styles.optionBtn}> */}
      <Text style={styles.optionBtnText}>{label}</Text>
      {/* </LinearGradient> */}
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
  // optionBtn: {
  //   height: 45,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  optionBtnText: {
    color: '#D3E6F5',
    fontSize: 15,
  },
});

export default HomeNavBtn;
