import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import useMeditations from './customHooks/useMeditations';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import analytics from '@react-native-firebase/analytics';
import {
  InAppPurchase,
  PurchaseError,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';

import HomeScreen from './screens/HomeScreen';
import GuideScreen from './screens/GuideScreen';
import SettingsScreen from './screens/SettingsScreen';
import StatsScreen from './screens/StatsScreen';
import SingleMeditationScreen from './screens/SingleMeditationScreen';
import TimerScreen from './screens/TimerScreen';
import {getData, storeData} from './functionsAndQuotes/asyncStorageFunctions';
import useInAppPurchase from './customHooks/useInAppPurchase';

const Stack = createStackNavigator();

const App = () => {
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [totalStars, setTotalStars] = useState(0);

  const {
    meditations,
    unlockMeditation,
    updateCompletionTime,
    resetCompletionTimes,
    resetFully,
  } = useMeditations();

  const [selectedMeditation, setSelectedMeditation] = useState('');
  const [selectedTime, setSelectedTime] = useState(60);
  const [totalMeditationTime, setTotalMeditationTime] = useState(0);
  const [totalMeditationsCompleted, setTotalMeditationsCompleted] = useState(0);

  // For the in app purchase
  // const [receipt, setReceipt] = useState();
  const receiptStorageKey = '@full_app_purchase_receipt';
  // // Variables to check if item purchased or not
  // let purchaseUpdateItem;
  const {receipt, setReceipt} = useInAppPurchase();

  // // Listens for purchases and perform call back when action taken (purchase always = InAppPurchase for this app). Called early in App.js as can pend on play store.
  // purchaseUpdateItem = purchaseUpdatedListener(async (purchase) => {
  //   const receipt = purchase.transactionReceipt;
  //   if (receipt) {
  //     try {
  //       // Purchase must be acknowledged or user gets refunded in few days
  //       const ackResult = await finishTransaction(purchase);
  //       console.log('ackResult: ', ackResult);
  //     } catch (ackErr) {
  //       console.log('ackErr: ', ackErr);
  //     }

  //     setReceipt(receipt);
  //     let receiptObj = JSON.parse(receipt);
  //     storeData(receiptStorageKey, receiptObj);
  //     console.log('APP.JS, the listener is working', receiptObj);
  //   }
  // });

  useEffect(() => {
    getData(receiptStorageKey).then((data) => {
      if (data) setReceipt(data);
    });

    // return () => {
    //   if (purchaseUpdateItem) {
    //     purchaseUpdateItem.remove();
    //     purchaseUpdateItem = null;
    //   }
    // };
  }, []);

  // Firebase session timeout is 1 hr, 15 mins
  analytics().setSessionTimeoutDuration(4500000);

  // Variables for firebase navigation stuff (see NavigationContainer props)
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          // Send of to firebase analytics
          analytics().setCurrentScreen(currentRouteName, currentRouteName);
        }

        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName;
      }}>
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
              updateCompletionTime={updateCompletionTime}
              setStreak={setStreak}
              setLongestStreak={setLongestStreak}
              selectedTime={selectedTime}
              totalMeditationTime={totalMeditationTime}
              setTotalMeditationTime={setTotalMeditationTime}
              totalMeditationsCompleted={totalMeditationsCompleted}
              setTotalMeditationsCompleted={setTotalMeditationsCompleted}
              setTotalStars={setTotalStars}
              // receipt={receipt}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
