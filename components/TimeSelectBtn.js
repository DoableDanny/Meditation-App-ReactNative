import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

function TimeSelectBtn({title, onPress, selectedTime, extraStyles}) {
  console.log(selectedTime);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.timeBtn,
        backgroundColor: selectedTime == title ? '#92C1E7' : '#4192D5',
        ...extraStyles,
      }}>
      <Text style={styles.timeText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  timeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 5,
    borderRightWidth: 0.6,
  },
  timeText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Merienda-Regular',
  },
});

export default TimeSelectBtn;
