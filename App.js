import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import useMeditations from './customHooks/useMeditations';
import useStars from './customHooks/useStars';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import analytics from '@react-native-firebase/analytics';

import HomeScreen from './screens/HomeScreen';
import GuideScreen from './screens/GuideScreen';
import SettingsScreen from './screens/SettingsScreen';
import StatsScreen from './screens/StatsScreen';
import SingleMeditationScreen from './screens/SingleMeditationScreen';
import TimerScreen from './screens/TimerScreen';
import {getData} from './functionsAndQuotes/asyncStorageFunctions';
import useInAppPurchase from './customHooks/useInAppPurchase';

const Stack = createStackNavigator();

const App = () => {
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  // const [totalStars, setTotalStars] = useState(0);

  const {
    meditations,
    unlockMeditation,
    updateMeditationStarValue,
    updateCompletionTime,
    resetCompletionTimes,
    resetFully,
  } = useMeditations();

  const {totalStars, setTotalStars} = useStars();

  const [selectedMeditation, setSelectedMeditation] = useState('');
  const [selectedTime, setSelectedTime] = useState(30);
  const [totalMeditationTime, setTotalMeditationTime] = useState(0);
  const [totalMeditationsCompleted, setTotalMeditationsCompleted] = useState(0);

  // Full app purchase receipt
  const {receipt, setReceipt} = useInAppPurchase();

  // Firebase session timeout is 1 hr, 15 mins
  analytics().setSessionTimeoutDuration(4500000);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#100B33',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="Home" options={{title: '60 Days of Meditation'}}>
          {(props) => (
            <HomeScreen
              {...props}
              meditations={meditations}
              setSelectedMeditation={setSelectedMeditation}
              receipt={receipt}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Guide" component={GuideScreen} />

        <Stack.Screen name="Settings" options={{title: 'Settings'}}>
          {(props) => (
            <SettingsScreen
              {...props}
              meditations={meditations}
              unlockMeditation={unlockMeditation}
              resetFully={resetFully}
              resetCompletionTimes={resetCompletionTimes}
              setStreak={setStreak}
              setLongestStreak={setLongestStreak}
              setTotalMeditationTime={setTotalMeditationTime}
              totalMeditationsCompleted={totalMeditationsCompleted}
              setTotalMeditationsCompleted={setTotalMeditationsCompleted}
              setTotalStars={setTotalStars}
              receipt={receipt}
              setReceipt={setReceipt}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Stats" options={{title: 'Stats'}}>
          {(props) => (
            <StatsScreen
              {...props}
              meditations={meditations}
              streak={streak}
              setStreak={setStreak}
              longestStreak={longestStreak}
              setLongestStreak={setLongestStreak}
              totalMeditationTime={totalMeditationTime}
              setTotalMeditationTime={setTotalMeditationTime}
              totalMeditationsCompleted={totalMeditationsCompleted}
              setTotalMeditationsCompleted={setTotalMeditationsCompleted}
              totalStars={totalStars}
              setTotalStars={setTotalStars}
              setSelectedMeditation={setSelectedMeditation}
              setSelectedTime={setSelectedTime}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Meditation">
          {(props) => (
            <SingleMeditationScreen
              {...props}
              selectedMeditation={selectedMeditation}
              setSelectedTime={setSelectedTime}
              selectedTime={selectedTime}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Timer" options={{title: 'Let it flow...'}}>
          {(props) => (
            <TimerScreen
              {...props}
              selectedMeditation={selectedMeditation}
              meditations={meditations}
              unlockMeditation={unlockMeditation}
              updateMeditationStarValue={updateMeditationStarValue}
              updateCompletionTime={updateCompletionTime}
              setStreak={setStreak}
              setLongestStreak={setLongestStreak}
              selectedTime={selectedTime}
              totalMeditationTime={totalMeditationTime}
              setTotalMeditationTime={setTotalMeditationTime}
              totalMeditationsCompleted={totalMeditationsCompleted}
              setTotalMeditationsCompleted={setTotalMeditationsCompleted}
              setTotalStars={setTotalStars}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
