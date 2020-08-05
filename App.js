import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import GuideScreen from './screens/GuideScreen';
import SettingsScreen from './screens/SettingsScreen';
import SingleMeditationScreen from './screens/SingleMeditationScreen';
import TimerScreen from './screens/TimerScreen';

const Stack = createStackNavigator();

const App = () => {
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [meditations, unlockMeditation] = useState([
    {
      id: 0,
      title: 'Meditation',
      image: require('./images/sage-friedman-HS5CLnQbCOc-unsplash.jpg'),
      locked: false,
    },
    {
      id: 1,
      title: 'Understanding Oneself',
      image: require('./images/dorota-dylka-Y6nFvt1ebyw-unsplash.jpg'),
      locked: true,
    },
    {id: 2, title: 'Muscles', image: require('./images/3.png'), locked: true},
    {
      id: 3,
      title: 'Perception',
      image: require('./images/daria-rom-fT4BRGAK5aQ-unsplash.jpg'),
      locked: true,
    },
    {
      id: 4,
      title: 'Truth',
      image: require('./images/elijah-hiett-wW0BUXTTUmU-unsplash.jpg'),
      locked: true,
    },
    {id: 5, title: 'Noise', image: require('./images/6.png'), locked: true},
    {
      id: 6,
      title: 'Habits',
      image: require('./images/7.png'),
      locked: true,
    },
    {id: 7, title: 'Death', image: require('./images/8.png'), locked: true},
    {
      id: 8,
      title: 'Respectability',
      image: require('./images/9.png'),
      locked: true,
    },
    {id: 9, title: 'Desire', image: require('./images/10.png'), locked: true},
    {
      id: 10,
      title: 'Conditioning',
      image: require('./images/11.png'),
      locked: true,
    },
    {id: 11, title: 'Memory', image: require('./images/12.png'), locked: true},
    {
      id: 12,
      title: 'Living as We Are',
      image: require('./images/13.png'),
      locked: true,
    },
  ]);

  const [selectedMeditation, updateSelectedMeditation] = useState('');
  const [selectedTime, setSelectedTime] = useState(60);
  const [totalMeditationTime, setTotalMeditationTime] = useState(0);
  const [totalMeditationsCompleted, setTotalMeditationsCompleted] = useState(0);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#002',
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

        <Stack.Screen name="Settings" options={{title: 'Stats'}}>
          {(props) => (
            <SettingsScreen
              {...props}
              meditations={meditations}
              unlockMeditation={unlockMeditation}
              streak={streak}
              setStreak={setStreak}
              longestStreak={longestStreak}
              setLongestStreak={setLongestStreak}
              totalMeditationTime={totalMeditationTime}
              setTotalMeditationTime={setTotalMeditationTime}
              totalMeditationsCompleted={totalMeditationsCompleted}
              setTotalMeditationsCompleted={setTotalMeditationsCompleted}
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
              streak={streak}
              setStreak={setStreak}
              setLongestStreak={setLongestStreak}
              selectedTime={selectedTime}
              setTotalMeditationTime={setTotalMeditationTime}
              setTotalMeditationsCompleted={setTotalMeditationsCompleted}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
