import React, {useEffect} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import VerticalPurpleGradBackground from '../components/VerticalPurpleGradBackground';
import H from '../components/H';
import P from '../components/P';

import crashlytics from '@react-native-firebase/crashlytics';

function GuideScreen() {
  useEffect(() => {
    crashlytics().log('GuideScreen mounted');
  }, []);

  return (
    <ScrollView>
      <VerticalPurpleGradBackground style={{flex: 1}}>
        <View style={styles.contentContainer}>
          <H extraStyle={{textAlign: 'center'}}>
            A Quest for Self-Understanding
          </H>

          <P>
            The aim of this app is to guide you towards self understanding. To
            show you that meditation can be a useful tool for dealing with
            stress and anxiety. And that daily meditations can help to give you
            peace and focus throughout each day.
          </P>
          <P>
            This app does not do the meditating for you, there are no voiceovers
            or sounds to listen to. No distractions from your own thoughts.
          </P>
          <P>
            The full benefits of meditation lie in sitting in silence, with just
            your thoughts and emotions for company.
          </P>
          <P>
            There are 60 meditations in total, 1 per day. The following day is
            unlocked after completing at least a 15 minute session of the
            current day's meditation.
          </P>
          <P>
            Throughout your meditation journey, you will be collecting stars. 30
            mins gets you 1 star, 45 mins = 2 stars and 60 mins for a glorious 3
            stars!
          </P>
          <P>Unlock bonus Tao meditations with day streaks and stars!</P>
          <H extraStyle={{textAlign: 'center'}}>The Inspirations</H>
          <P>
            <Text style={styles.influences}>Naval Ravikant</Text> and his life
            changing wisdom. The man who got me meditating - a habit that has
            changed my life. He recommends 60 days of 1 hour meditations to
            truly feel the benefits. I have found this to be true.
          </P>
          <P>
            <Text style={styles.influences}>Jiddu Krishnamurti</Text>'s books:
            Freedom from the Known, Think on These Things and Total Freedom. A
            man that introduced me to a new defintion of freedom. Freedom from
            ourselves.
          </P>
          <P>
            <Text style={styles.influences}>The Stoics</Text>: Seneca's letters
            from a Stoic, Marcus Aurelius's Meditations and Epictetus's Letters
            and Discourses. You are responsible for yourself and your thoughts,
            let go of everything else - you have no control over it.
          </P>
          <P>
            <Text style={styles.influences}>
              The Power of Now by Eckhart Tolle
            </Text>
            . A great book for mindfulness beginners. Explains topics such as
            the ego, enlightenment, mindfulness, and the problems that thinking
            of the past and future cause.
          </P>
          <P extraStyle={{marginBottom: 25}}>
            <Text style={styles.influences}>Philisophical fiction</Text>:
            Siddhartha by Herman Hesse. A beautiful story showing us that there
            is no right path. Nobody can give us the answers. Follow your own
            path. Illusions by Richard Bach and The Alchemist by Paulo Cohelo
            are also great teachers.
          </P>
        </View>
      </VerticalPurpleGradBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    marginLeft: 16,
    marginRight: 16,
  },
  influences: {
    fontWeight: 'bold',
  },
});

export default GuideScreen;
