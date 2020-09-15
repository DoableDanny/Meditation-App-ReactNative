import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Check the users completionTime for each meditation and award corresponding stars
const renderStars = (item) => {
  switch (item.completionTime) {
    case 15:
      return (
        <View style={{flexDirection: 'row'}}>
          <Icon name="star-outline" size={22} style={{color: 'gold'}} />
          <Icon name="star-outline" size={22} style={{color: 'gold'}} />
          <Icon name="star-outline" size={22} style={{color: 'gold'}} />
        </View>
      );
    case 30:
      return (
        <View style={{flexDirection: 'row'}}>
          <Icon name="star" size={22} style={{color: 'gold'}} />
          <Icon name="star-outline" size={22} style={{color: 'gold'}} />
          <Icon name="star-outline" size={22} style={{color: 'gold'}} />
        </View>
      );
    case 45:
      return (
        <View style={{flexDirection: 'row'}}>
          <Icon name="star" size={22} style={{color: 'gold'}} />
          <Icon name="star" size={22} style={{color: 'gold'}} />
          <Icon name="star-outline" size={22} style={{color: 'gold'}} />
        </View>
      );
    case 60:
    case 75:
    case 90:
    case 105:
    case 120:
      return (
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="star"
            size={22}
            style={{
              color: 'gold',
            }}
          />
          <Icon name="star" size={22} style={{color: 'gold'}} />
          <Icon name="star" size={22} style={{color: 'gold'}} />
        </View>
      );
  }
};

export default renderStars;
