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
  const [meditations, unlockMeditation] = useState([
    {
      id: 0,
      title: 'Meditation',
      image: require('./images/1.png'),
      locked: false,
    },
    {
      id: 1,
      title: 'Understanding Oneself',
      image: require('./images/2.png'),
      locked: true,
    },
    {id: 2, title: 'Muscles', image: require('./images/3.png'), locked: true},
    {
      id: 3,
      title: 'Perception',
      image: require('./images/4.png'),
      locked: true,
    },
    {id: 4, title: 'Truth', image: require('./images/5.png'), locked: true},
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

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'rgb(104,186,223)',
          },
          headerTintColor: 'rgb(37, 27, 113)',
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
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Meditation">
          {(props) => (
            <SingleMeditationScreen
              {...props}
              selectedMeditation={selectedMeditation}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Timer" options={{title: 'Let it go...'}}>
          {(props) => (
            <TimerScreen
              {...props}
              selectedMeditation={selectedMeditation}
              meditations={meditations}
              unlockMeditation={unlockMeditation}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
