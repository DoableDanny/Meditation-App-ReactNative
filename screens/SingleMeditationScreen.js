import React from 'react';
import {View, Text, Image, StyleSheet, FlatList, Button} from 'react-native';

function SingleMeditationScreen({selectedMeditation, navigation}) {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.imgContainer}>
        <Image source={selectedMeditation.image} style={styles.img} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{selectedMeditation.title}</Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam magna
          orci, pretium eget porta convallis, viverra in enim. Mauris id massa
          at magna fermentum luctus. Sed vehicula nisi vel dui tempor, nec
          pulvinar dui ultrices. Fusce velit nulla, scelerisque vitae urna sed,
          cursus finibus odio.
        </Text>
        <Text style={styles.paragraph}>
          Sed at tincidunt ligula. Aenean facilisis aliquam tortor, at pretium
          elit aliquet eget. Proin quam justo, viverra pretium tincidunt id,
          dignissim a velit.
        </Text>
      </View>
      <Button title="Begin" onPress={() => navigation.navigate('Timer')} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#14145a',
    flex: 1,
    flexDirection: 'column',
    borderWidth: 5,
  },
  imgContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  img: {
    flex: 1,
    height: 170,
  },
  contentContainer: {
    flex: 2,
    marginLeft: 7,
    marginRight: 7,
  },
  title: {
    fontSize: 30,
    color: 'white',
  },
  paragraph: {
    fontSize: 18,
    color: 'white',
    marginTop: 5,
  },
});

export default SingleMeditationScreen;
