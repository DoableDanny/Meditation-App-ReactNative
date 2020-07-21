import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, FlatList, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import GuideScreen from './screens/GuideScreen';
import SingleMeditationScreen from './screens/SingleMeditationScreen';

const Stack = createStackNavigator();

const App = () => {
  const [meditations, unlockMeditation] = useState([
    {title: 'Meditation', image: require('./images/1.png'), locked: false},
    {title: 'Habits', image: require('./images/2.png'), locked: false},
    {title: 'Muscles', image: require('./images/3.png'), locked: true},
    {title: 'Perception', image: require('./images/4.png'), locked: true},
    {title: 'Truth', image: require('./images/5.png'), locked: true},
    {title: 'Noise', image: require('./images/6.png'), locked: true},
    {
      title: 'Understanding oneself',
      image: require('./images/7.png'),
      locked: true,
    },
    {title: 'Death', image: require('./images/8.png'), locked: true},
    {title: 'Respectability', image: require('./images/9.png'), locked: true},
    {title: 'Desire', image: require('./images/10.png'), locked: true},
    {title: 'Conditioning', image: require('./images/11.png'), locked: true},
    {title: 'Memory', image: require('./images/12.png'), locked: true},
  ]);

  const [selectedMeditation, updateSelectedMeditation] = useState('');

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{title: 'Meditations'}}>
          {(props) => (
            <HomeScreen
              {...props}
              meditations={meditations}
              selectedMeditation={selectedMeditation}
              updateSelectedMeditation={updateSelectedMeditation}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Guide" component={GuideScreen} />
        <Stack.Screen name="Meditation">
          {(props) => (
            <SingleMeditationScreen
              {...props}
              selectedMeditation={selectedMeditation}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
