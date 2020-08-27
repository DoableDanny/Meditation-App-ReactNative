import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function HomeNavBtn({label, onPress}) {
  return (
    <TouchableOpacity style={styles.optionButtonTouchableOp} onPress={onPress}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#6DABDF', '#5EA3DC', '#4F9BD8']}
        style={styles.optionBtn}>
        <Text style={styles.optionBtnText}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  optionButtonTouchableOp: {
    flex: 1,
  },
  optionBtn: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionBtnText: {
    color: 'white',
    fontSize: 15,
  },
});

export default HomeNavBtn;
