import React from 'react';
import {Text, StyleSheet} from 'react-native';

function P({children, extraStyle}) {
  return <Text style={{...styles.paragraph, ...extraStyle}}>{children}</Text>;
}
const styles = StyleSheet.create({
  paragraph: {
    fontSize: 21,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 25,
    marginBottom: 16,
  },
});

export default P;
