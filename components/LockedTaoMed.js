import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function LockedTaoMed({icon, num}) {
  return (
    <TouchableOpacity style={styles.lockedTaoWrapper}>
      <Icon name="lock" size={42} style={styles.lockIcon} />
      <Text style={styles.lockedRequirement}>
        <Icon name={icon} size={30} style={styles.requirmentIcon} /> x {num}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  lockedTaoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 24,
    minHeight: 100,
    position: 'relative',
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  lockIcon: {
    color: 'rgba(0,0,0,0.6)',
  },
  requirmentIcon: {
    color: 'rgba(255,255,255,0.4)',
  },
  lockedRequirement: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 20,
    position: 'absolute',
    right: 15,
  },
});

export default LockedTaoMed;
