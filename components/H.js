import React from 'react';
import {Text, StyleSheet} from 'react-native';

function H({children, extraStyle}) {
  return <Text style={{...styles.heading, ...extraStyle}}>{children}</Text>;
}
const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    color: '#8ABCE5',
    marginTop: 24,
    marginBottom: 24,
    fontFamily: 'Merienda-Bold',
  },
});

export default H;
