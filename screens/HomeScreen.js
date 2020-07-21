import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';

function HomeScreen({
  navigation,
  meditations,
  selectedMeditation,
  updateSelectedMeditation,
}) {
  const selectMeditationAndNavigate = () => {};

  let index = 0;
  return (
    <View style={styles.screenContainer}>
      <Button title="Guide" onPress={() => navigation.navigate('Guide')} />
      <FlatList
        data={meditations}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              updateSelectedMeditation(item);
              navigation.navigate('Meditation');
            }}
            style={{
              ...styles.listItem,
              borderBottomWidth: index === meditations.length - 1 ? 0 : 1,
            }}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title} </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingBottom: 50,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 15,
  },
  image: {
    width: 140,
    height: 60,
    marginRight: 10,
  },
});

export default HomeScreen;
