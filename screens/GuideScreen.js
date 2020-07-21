import React from 'react';
import {View, Text} from 'react-native';

function GuideScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Guide</Text>
      <Text>
        This is not a meditation app. The aim of this is to teach you what
        meditation is, keep you committed to 1 hour per day, and to find some
        inner peace.
      </Text>
    </View>
  );
}

export default GuideScreen;
