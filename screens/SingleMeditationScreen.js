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
          style={{
            ...styles.timeBtn,
            backgroundColor: selectedTime == 15 ? '#d5e4f0' : '#84afd1',
          }}
          onPress={() => setSelectedTime(15)}>
          <Text style={styles.timeText}>15</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.timeBtn,
            backgroundColor: selectedTime == 30 ? '#d5e4f0' : '#84afd1',
          }}>
          <Text style={styles.timeText} onPress={() => setSelectedTime(30)}>
            30
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.timeBtn,
            backgroundColor: selectedTime == 45 ? '#d5e4f0' : '#84afd1',
          }}>
          <Text style={styles.timeText} onPress={() => setSelectedTime(45)}>
            45
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.timeBtn,
            backgroundColor: selectedTime == 60 ? '#d5e4f0' : '#84afd1',
          }}>
          <Text style={styles.timeText} onPress={() => setSelectedTime(60)}>
            60
          </Text>
        </TouchableOpacity>
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
    fontSize: 35,
    color: 'white',
  },
  paragraph: {
    fontSize: 20,
    color: 'white',
    marginTop: 9,
    lineHeight: 25,
  },
  timeBtnsContainer: {
    flexDirection: 'row',
  },
  timeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 15,
    borderWidth: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  timeText: {
    color: '#fff',
    fontSize: 19,
  },
  beginBtn: {
    backgroundColor: '#5376cf',
    height: 55,
    margin: 10,
    marginTop: 20,
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
