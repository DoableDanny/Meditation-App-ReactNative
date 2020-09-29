import React, {useState, useEffect} from 'react';
import {Alert, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getData, storeData} from '../functionsAndQuotes/asyncStorageFunctions';

export default function useStars() {
  const [totalStars, setTotalStars] = useState(0);
  const STAR_STORAGE_KEY = `@total_stars`;

  // Convert new time to stars
  function convertCompletionTimeToStars(time) {
    let newStarValue;
    if (time < 30) {
      newStarValue = 0;
    } else if (time >= 30 && time < 45) {
      newStarValue = 1;
    } else if (time >= 45 && time < 60) {
      newStarValue = 2;
    } else if (time >= 60) {
      newStarValue = 3;
    }

    return newStarValue;
  }

  async function calculateNewStarTotal(starImprovement) {
    let data = await getData(STAR_STORAGE_KEY);

    let totalStars = data == null ? 0 : parseInt(data);
    console.log('PREV_STAR_TOTAL: ', totalStars);

    let newTotalStars = totalStars + starImprovement;
    console.log('NEW_STAR_TOTAL', newTotalStars);

    setAndStoreTotalStars(newTotalStars);

    return newTotalStars;
  }

  function setAndStoreTotalStars(newTotalStars) {
    storeData(STAR_STORAGE_KEY, newTotalStars);
    setTotalStars(newTotalStars);
    console.log('STARS_SET_AND_STORED');
  }

  async function awardBonusTaoMedForStars(num) {
    const TAO_SERIES_KEY = `@tao_series`;
    let data = await getData(TAO_SERIES_KEY);

    if (data == null) {
      Alert.alert(
        `CONGRATULATIONS!`,
        `Your outstanding efforts deserve a reward: The fourth Tao Bonus Meditation!`,
      );
      storeData(TAO_SERIES_KEY, 100);
    } else if (data == 100 && num == 180) {
      Alert.alert(
        `CONGRATULATIONS!`,
        `Your outstanding efforts deserve a reward: The final Tao Bonus Meditation!`,
      );
      storeData(`@tao_series`, 180);
    }
  }

  // Render stars for each med on homeScreen
  function renderStars(time) {
    let stars = convertCompletionTimeToStars(time);

    switch (stars) {
      case 0:
        return (
          <View style={{flexDirection: 'row'}}>
            <Icon name="star-outline" size={22} style={{color: 'gold'}} />
            <Icon name="star-outline" size={22} style={{color: 'gold'}} />
            <Icon name="star-outline" size={22} style={{color: 'gold'}} />
          </View>
        );
      case 1:
        return (
          <View style={{flexDirection: 'row'}}>
            <Icon name="star" size={22} style={{color: 'gold'}} />
            <Icon name="star-outline" size={22} style={{color: 'gold'}} />
            <Icon name="star-outline" size={22} style={{color: 'gold'}} />
          </View>
        );
      case 2:
        return (
          <View style={{flexDirection: 'row'}}>
            <Icon name="star" size={22} style={{color: 'gold'}} />
            <Icon name="star" size={22} style={{color: 'gold'}} />
            <Icon name="star-outline" size={22} style={{color: 'gold'}} />
          </View>
        );
      case 3:
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
  }

  return {
    convertCompletionTimeToStars,
    // checkForStarImprovement,
    calculateNewStarTotal,
    setAndStoreTotalStars,
    totalStars,
    setTotalStars,
    awardBonusTaoMedForStars,
    renderStars,
  };
}
