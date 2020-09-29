import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import useStars from '../customHooks/useStars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function TaoBonusBtn({title, onPress, taoMeditation, icon, num}) {
  const {renderStars} = useStars();
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnStyle}>
      <Text style={styles.titleStyle}>{taoMeditation.title}</Text>
      {renderStars(taoMeditation.completionTime)}
      <Text style={styles.lockedRequirement}>
        <Icon name={icon} size={30} style={styles.requirmentIcon} /> x {num}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    // backgroundColor: '#6F60DC',
    borderRadius: 8,
    padding: 24,
    minHeight: 100,
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
  requirmentIcon: {
    color: 'rgba(255,255,255,0.4)',
  },
  lockedRequirement: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 20,
    position: 'absolute',
    right: 10,
  },
});

export default TaoBonusBtn;
