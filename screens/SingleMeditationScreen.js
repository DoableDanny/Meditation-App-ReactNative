import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

function SingleMeditationScreen({selectedMeditation, navigation}) {
  return (
    <ScrollView style={styles.pageContainer}>
      <View style={styles.imgContainer}>
        <Image source={selectedMeditation.image} style={styles.img} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{selectedMeditation.title}</Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam magna
          orci, pretium eget porta convallis, viverra in enim.
        </Text>
        <Text style={styles.paragraph}>
          Mauris id massa at magna fermentum luctus. Sed vehicula nisi vel dui
          tempor, nec pulvinar dui ultrices. Fusce velit nulla, scelerisque
          vitae urna sed, cursus finibus odio.
        </Text>
        <Text style={styles.paragraph}>
          Sed at tincidunt ligula. Aenean facilisis aliquam tortor, at pretium
          elit aliquet eget. Proin quam justo, viverra pretium tincidunt id,
          dignissim a velit.
        </Text>
        <Text style={styles.paragraph}>
          Sed at tincidunt ligula. Aenean facilisis aliquam tortor, at pretium
          elit aliquet eget. Proin quam justo, viverra pretium tincidunt id,
          dignissim a velit.
        </Text>
        <Text style={styles.paragraph}>
          Sed at tincidunt ligula. Aenean facilisis aliquam tortor, at pretium
          elit aliquet eget. Proin quam justo, viverra pretium tincidunt id,
          dignissim a velit.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.beginBtn}
        onPress={() => navigation.navigate('Timer')}>
        <Text style={styles.begin}>BEGIN</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#0e0a2e',
    flexDirection: 'column',
  },
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    height: 200,
    position: 'relative',
  },
  img: {
    height: 200,
    width: Dimensions.get('window').width,
  },
  contentContainer: {
    marginLeft: 12,
    marginRight: 12,
  },
  title: {
    fontSize: 30,
    color: 'white',
  },
  paragraph: {
    fontSize: 19,
    color: 'white',
    marginTop: 9,
    lineHeight: 24,
  },
  beginBtn: {
    backgroundColor: '#5376cf',
    height: 55,
    margin: 10,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  begin: {
    color: 'white',
    fontSize: 25,
  },
});

export default SingleMeditationScreen;
