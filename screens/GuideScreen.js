import React, {useEffect} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import crashlytics from '@react-native-firebase/crashlytics';

function GuideScreen() {
  useEffect(() => {
    crashlytics().log('GuideScreen mounted');
  }, []);

  return (
    <ScrollView>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={purpleGrad}>
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>A Quest for Self-Understanding</Text>

          <Text style={styles.text}>
            The aim of this app is to guide you towards self understanding. To
            show you that meditation can be a useful tool for dealing with
            stress and anxiety. And that daily meditations can help to give you
            peace and focus throughout each day.
          </Text>
          <Text style={styles.text}>
            This app does not do the meditating for you, there are no voiceovers
            or sounds to listen to. No distractions from your own thoughts.
          </Text>
          <Text style={styles.text}>
            Most meditation apps seem to involve breathy relaxing voices and
            sounds of rainfall. Whilst this may be relaxing, you may not be
            getting the full benefits that you get from sitting in silence, with
            just your thoughts and emotions for company.
          </Text>
          <Text style={styles.text}>
            There are 60 meditations in total, 1 per day. You can choose to do
            15, 30, 45, or 60 mins. The following day is unlocked after
            completing the current day's meditation.
          </Text>
          <Text style={styles.text}>
            Throughout your meditation journey, you will be collecting stars. 30
            mins gets you 1 star, 45 mins = 2 stars and 60 mins for a glorious 3
            stars!
          </Text>
          <Text style={{...styles.text, marginBottom: 25}}>
            Complete all 60 days with 3 stars to unlock a bonus meditation
            series.
          </Text>
          <Text style={styles.heading}>The Inspirations</Text>
          <Text style={styles.text}>
            <Text style={styles.influences}>Naval Ravikant</Text> and his life
            changing wisdom. The man who got me meditating - a habit that has
            changed my life. He recommends 60 days of 1 hour meditations to
            truly feel the benefits. I have found this to be true.
          </Text>
          <Text style={styles.text}>
            <Text style={styles.influences}>Jiddu Krishnamurti</Text>'s books:
            Freedom from the Known, Think on These Things and Total Freedom. A
            man that introduced me to a new defintion of freedom. Freedom from
            ourselves.
          </Text>
          <Text style={styles.text}>
            <Text style={styles.influences}>The Stoics</Text>: Seneca's letters
            from a Stoic, Marcus Aurelius's Meditations and Epictetus's Letters
            and Discourses. You are responsible for yourself and your thoughts,
            let go of everything else - you have no control over it.
          </Text>
          <Text style={styles.text}>
            <Text style={styles.influences}>
              The Power of Now by Eckhart Tolle
            </Text>
            . A great book for mindfulness beginners. Explains topics such as
            the ego, enlightenment, mindfulness, and the problems that thinking
            of the past and future cause.
          </Text>
          <Text style={{...styles.text, marginBottom: 25}}>
            <Text style={styles.influences}>Philisophical fiction</Text>:
            Siddhartha by Herman Hesse. A beautiful story showing us that there
            is no right path. Nobody can give us the answers. Follow your own
            path. Illusions by Richard Bach and The Alchemist by Paulo Cohelo
            are also great teachers.
          </Text>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const purpleGrad = ['#2F2198', '#271C7E', '#1F1663'];

const styles = StyleSheet.create({
  contentContainer: {
    marginLeft: 12,
    marginRight: 12,
  },
  heading: {
    color: '#8ABCE5',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
    fontFamily: 'Merienda-Bold',
  },
  text: {
    color: '#F0F7FC',
    fontSize: 21,
    marginBottom: 16,
  },
  influences: {
    fontWeight: 'bold',
  },
});

export default GuideScreen;
