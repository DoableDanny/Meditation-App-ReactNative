import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import renderStars from '../functionsAndQuotes/renderStars';

function TaoBonusBtn({title, onPress, taoMeditation}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnStyle}>
      <Text style={styles.titleStyle}>{title}</Text>
      {renderStars(taoMeditation)}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    // backgroundColor: '#6F60DC',
    borderRadius: 8,
    padding: 32,
    borderBottomWidth: 1,
    borderColor: '#6F60DC',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 20,
    fontFamily: 'Merienda-Regular',
  },
});

export default TaoBonusBtn;
