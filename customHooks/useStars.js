import {useState, useEffect} from 'react';
import {getData, storeData} from '../functionsAndQuotes/asyncStorageFunctions';

export default function useStars() {
  const [totalStars, setTotalStars] = useState(0);
  const STAR_STORAGE_KEY = `@total_stars`;

  // Convert new time to stars
  function convertNewTimeToStars(newTime) {
    let newStarValue;
    if (newTime >= 30 && newTime < 45) {
      newStarValue = 1;
      //   setNewStars(newStarValue);
    } else if (newTime >= 45 && newTime < 60) {
      newStarValue = 2;
      //   setNewStars(newStarValue);
    } else if (newTime >= 60) {
      newStarValue = 3;
      //   setNewStars(newStarValue);
    }

    return newStarValue;

    // checkForStarImprovement(prevStarValue, newStarValue);
  }

  function checkForStarImprovement(newStarValue, prevStarValue) {
    console.log('PREV_STAR_VAL: ', prevStarValue);

    if (prevStarValue < newStarValue) {
      let starImprovement = newStarValue - prevStarValue;
      calculateNewStarTotal(starImprovement);
    } else console.log('NO_NEED_TO_UPDATE_STARS');
  }

  async function calculateNewStarTotal(starImprovement) {
    let data = await getData(STAR_STORAGE_KEY);

    let totalStars = data == null ? 0 : parseInt(data);
    console.log('Stars (custom hook): ', totalStars);

    let newTotalStars = totalStars + starImprovement;
    console.log('newTotalStars: (custom hook)', newTotalStars);

    setAndStoreTotalStars(newTotalStars);
  }

  function setAndStoreTotalStars(newTotalStars) {
    storeData(STAR_STORAGE_KEY, newTotalStars);
    setTotalStars(newTotalStars);
    console.log('STARS_SET_AND_STORED');
  }

  return {
    convertNewTimeToStars,
    checkForStarImprovement,
    calculateNewStarTotal,
    setAndStoreTotalStars,
    totalStars,
    setTotalStars,
  };
}
