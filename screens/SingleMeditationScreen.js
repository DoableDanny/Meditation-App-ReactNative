import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {imageArray} from '../imageArray';
import LinearGradient from 'react-native-linear-gradient';

function SingleMeditationScreen({
  selectedMeditation,
  navigation,
  selectedTime,
  setSelectedTime,
}) {
  return (
    <ScrollView style={styles.pageContainer}>
      <View style={styles.imgContainer}>
        <Image
          source={imageArray[selectedMeditation.id].image}
          style={styles.img}
        />
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

      <View style={styles.timeBtnsContainer}>
        <TouchableOpacity
          onPress={() => setSelectedTime(15)}
          style={{
            ...styles.timeBtn,
            backgroundColor: selectedTime == 15 ? '#66A8DD' : '#2775B4',
            borderTopLeftRadius: 7,
            borderBottomLeftRadius: 7,
          }}>
          <Text style={styles.timeText}>15</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTime(30)}
          style={{
            ...styles.timeBtn,
            backgroundColor: selectedTime == 30 ? '#66A8DD' : '#2775B4',
          }}>
          <Text style={styles.timeText}>30</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTime(45)}
          style={{
            ...styles.timeBtn,
            backgroundColor: selectedTime == 45 ? '#66A8DD' : '#2775B4',
          }}>
          <Text style={styles.timeText}>45</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTime(60)}
          style={{
            ...styles.timeBtn,
            backgroundColor: selectedTime == 60 ? '#66A8DD' : '#2775B4',
            borderTopRightRadius: 7,
            borderBottomRightRadius: 7,
          }}>
          <Text style={styles.timeText}>60</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Timer')}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#338AD2', '#2775B4', '#256CA7']}
          style={styles.beginBtn}>
          <Text style={styles.begin}>BEGIN</Text>
        </LinearGradient>
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
    height: 210,
    width: Dimensions.get('window').width,
  },
  contentContainer: {
    marginLeft: 12,
    marginRight: 12,
  },
  title: {
    fontSize: 35,
    color: '#66A8DD',
    margin: 10,
    marginTop: 16,
  },
  paragraph: {
    fontSize: 20,
    color: 'white',
    margin: 8,
    lineHeight: 25,
  },
  timeBtnsContainer: {
    flexDirection: 'row',
    margin: 16,
  },
  timeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 10,
    borderRightWidth: 0.6,
  },
  timeText: {
    color: '#fff',
    fontSize: 20,
  },
  beginBtn: {
    height: 55,
    margin: 8,
    marginBottom: 20,
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
