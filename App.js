import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import useMeditations from './customHooks/useMeditations';
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

const Stack = createStackNavigator();

const App = () => {
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [totalStars, setTotalStars] = useState(0);

  const [meditations, unlockMeditation] = useState([
    {
      id: 0,
      title: 'Conclusions',
      locked: false,
      completionTime: 0,
    },
    {
      id: 1,
      title: 'The Guru',
      locked: true,
      completionTime: 0,
    },
    {
      id: 2,
      title: 'The Past',
      locked: true,
      completionTime: 0,
    },
    {
      id: 3,
      title: 'The Future',
      locked: true,
      completionTime: 0,
    },
    {
      id: 4,
      title: 'The Present',
      locked: true,
      completionTime: 0,
    },
    {id: 5, title: 'Overload', locked: true, completionTime: 0},
    {
      id: 6,
      title: 'Nervousness',
      locked: true,
      completionTime: 0,
    },
    {id: 7, title: 'Seeing', locked: true, completionTime: 0},
    {
      id: 8,
      title: 'Avoidance',
      locked: true,
      completionTime: 0,
    },
    {id: 9, title: 'Desire', locked: true, completionTime: 0},
    {
      id: 10,
      title: 'Conditioning',
      locked: true,
      completionTime: 0,
    },
    {id: 11, title: 'Memory', locked: true, completionTime: 0},
    {
      id: 12,
      title: 'Living as We Are',
      locked: true,
      completionTime: 0,
    },
    {
      id: 13,
      title: 'Meditation',
      locked: true,
      completionTime: 0,
    },
    {
      id: 14,
      title: 'Understanding Oneself',
      locked: true,
      completionTime: 0,
    },
    {id: 15, title: 'Muscles', locked: true, completionTime: 0},
    {
      id: 16,
      title: 'Perception',
      locked: true,
      completionTime: 0,
    },
    {
      id: 17,
      title: 'Truth',
      locked: true,
      completionTime: 0,
    },
    {id: 18, title: 'Noise', locked: true, completionTime: 0},
    {
      id: 19,
      title: 'Habits',
      locked: true,
      completionTime: 0,
    },
    {id: 20, title: 'Death', locked: true, completionTime: 0},
    {
      id: 21,
      title: 'Respectability',
      image: require('./images/9.png'),
      locked: true,
      completionTime: 0,
    },
    {id: 22, title: 'Desire', completionTime: 0, locked: true},
    {
      id: 23,
      title: 'Conditioning',
      completionTime: 0,
      locked: true,
    },
    {id: 24, title: 'Memory', completionTime: 0, locked: true},
    {
      id: 25,
      title: 'Living as We Are',
      completionTime: 0,
      locked: true,
    },
    {
      id: 26,
      title: 'Meditation',
      completionTime: 0,
      locked: true,
    },
    {
      id: 27,
      title: 'Understanding Oneself',
      completionTime: 0,
      locked: true,
    },
    {id: 28, title: 'Muscles', completionTime: 0, locked: true},
    {
      id: 29,
      title: 'Perception',
      completionTime: 0,
      locked: true,
    },
    {
      id: 30,
      title: 'Truth',
      completionTime: 0,
      locked: true,
    },
    {id: 31, title: 'Noise', completionTime: 0, locked: true},
    {
      id: 32,
      title: 'Habits',
      completionTime: 0,
      locked: true,
    },
    {id: 33, title: 'Death', completionTime: 0, locked: true},
    {
      id: 34,
      title: 'Respectability',
      completionTime: 0,
      locked: true,
    },
    {id: 35, title: 'Desire', completionTime: 0, locked: true},
    {
      id: 36,
      title: 'Conditioning',
      completionTime: 0,
      locked: true,
    },
    {id: 37, title: 'Memory', image: require('./images/12.png'), locked: true},
    {
      id: 38,
      title: 'Living as We Are',
      completionTime: 0,
      locked: true,
    },
    {
      id: 39,
      title: 'Meditation',
      completionTime: 0,
      locked: true,
    },
    {
      id: 40,
      title: 'Understanding Oneself',
      completionTime: 0,
      locked: true,
    },
    {id: 41, title: 'Muscles', completionTime: 0, locked: true},
    {
      id: 42,
      title: 'Perception',
      completionTime: 0,
      locked: true,
    },
    {
      id: 43,
      title: 'Truth',
      completionTime: 0,
      locked: true,
    },
    {id: 44, title: 'Noise', completionTime: 0, locked: true},
    {
      id: 45,
      title: 'Habits',
      completionTime: 0,
      locked: true,
    },
    {id: 46, title: 'Death', completionTime: 0, locked: true},
    {
      id: 47,
      title: 'Respectability',
      completionTime: 0,
      locked: true,
    },
    {id: 48, title: 'Desire', completionTime: 0, locked: true},
    {
      id: 49,
      title: 'Conditioning',
      completionTime: 0,
      locked: true,
    },
    {id: 50, title: 'Memory', completionTime: 0, locked: true},
    {
      id: 51,
      title: 'Living as We Are',
      completionTime: 0,
      locked: true,
    },
    {
      id: 52,
      title: 'Meditation',
      completionTime: 0,
      locked: true,
    },
    {
      id: 53,
      title: 'Understanding Oneself',
      completionTime: 0,
      locked: true,
    },
    {id: 54, title: 'Muscles', completionTime: 0, locked: true},
    {
      id: 55,
      title: 'Perception',
      completionTime: 0,
      locked: true,
    },
    {
      id: 56,
      title: 'Truth',
      completionTime: 0,
      locked: true,
    },
    {id: 57, title: 'Noise', completionTime: 0, locked: true},
    {
      id: 58,
      title: 'Habits',
      completionTime: 0,
      locked: true,
    },
    {id: 59, title: 'Death', completionTime: 0, locked: true},
    {
      id: 60,
      title: 'Respectability',
      completionTime: 0,
      locked: true,
    },
    {id: 61, title: 'Desire', completionTime: 0, locked: true},
    {
      id: 62,
      title: 'Conditioning',
      completionTime: 0,
      locked: true,
    },
    {id: 63, title: 'Memory', completionTime: 0, locked: true},
    {
      id: 64,
      title: 'Living as We Are',
      completionTime: 0,
      locked: true,
    },
  ]);

  useEffect(() => {
    getData('@meditations_completed').then((data) =>
      data != null ? unlockMeditation(JSON.parse(data)) : null,
    );
  }, []);

  const [selectedMeditation, updateSelectedMeditation] = useState('');
  const [selectedTime, setSelectedTime] = useState(60);
  const [totalMeditationTime, setTotalMeditationTime] = useState(0);
  const [totalMeditationsCompleted, setTotalMeditationsCompleted] = useState(0);

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
              unlockMeditation={unlockMeditation}
              selectedMeditation={selectedMeditation}
              updateSelectedMeditation={updateSelectedMeditation}
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
              setStreak={setStreak}
              setLongestStreak={setLongestStreak}
              setTotalMeditationTime={setTotalMeditationTime}
              totalMeditationsCompleted={totalMeditationsCompleted}
              setTotalMeditationsCompleted={setTotalMeditationsCompleted}
              setTotalStars={setTotalStars}
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
