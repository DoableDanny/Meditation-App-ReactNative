import React from 'react';
import {View, Text, Image, StyleSheet, FlatList, Button} from 'react-native';

function SingleMeditationScreen({selectedMeditation}) {
  return (
    <View>
      <Image source={selectedMeditation.image} />
      <Text>{selectedMeditation.title}</Text>
    </View>
  );
}

export default SingleMeditationScreen;
