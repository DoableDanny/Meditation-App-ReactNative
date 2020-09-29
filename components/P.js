import React from 'react';
import {Text, StyleSheet} from 'react-native';

function P({children, extraStyle}) {
  return <Text style={{...styles.paragraph, ...extraStyle}}>{children}</Text>;
}
const styles = StyleSheet.create({
  paragraph: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 28,
    marginBottom: 20,
  },
});

export default P;
