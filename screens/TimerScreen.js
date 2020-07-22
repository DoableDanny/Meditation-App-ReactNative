import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

function TimerScreen({selectedMeditation, meditations, unlockMeditation}) {
  //   console.log(selectedMeditation);
  const [seconds, setSeconds] = useState(55);
  const [minutes, setMinutes] = useState(59);
  const [hours, setHours] = useState(0);
  const [timerOn, setTimerOn] = useState(true);
  const [completionText, setCompletionText] = useState('');

  let nextMeditationId = selectedMeditation.id + 1;
  var navalQuotes = [
    'Impatience with action, patience with results',
    'A busy calendar and a busy mind will destroy your ability to create anything great.',
    'You have one life. You’re dead for tens of billions of years, and you’re going to be dead for tens of billions of years.',
    'Happiness is a state where nothing is missing.',
    'Guard your time. It’s all you have.',
    'The greatest superpower is the ability to change yourself.',
    'People spend too much time doing and not enough time thinking about what they should be doing.',
    'Most of modern life, all our diseases, are diseases of abundance, not diseases of scarcity.',
    'That’s the fundamental delusion – that there is something out there that will make you happy forever.',
    'As long as you can keep taking shots on goal, and you keep getting back up, eventually you’ll get through. Just stick at it.',
    'True happiness comes out of peace. Peace comes out of many things, but it comes from fundamentally understanding yourself.',
    'Nothing you do is going to matter that much in the long run. Don’t take yourself so seriously.',
    'The modern mind is overstimulated and the modern body is understimulated and overfed. Meditation, exercise, and fasting restore an ancient balance.',
    'If you could literally just sit for 30 minutes and be happy, you are successful. ',
    'Most of our suffering comes from avoidance.',
  ];

  // Takes f(n) as arg - runs like componentDidMount
  useEffect(() => {
    let interval = setInterval(() => {
      if (!timerOn) {
        clearInterval(interval);
      }
      if (timerOn) {
        setSeconds(seconds + 1);

        if (seconds === 59) {
          setMinutes(minutes + 1);
          setSeconds(0);
        }
        // When full hour done, stop timer and unlock the next meditation
        if (minutes === 59 && seconds === 59) {
          setHours(hours + 1);
          setMinutes(0);
          setSeconds(0);
          setTimerOn(false);

          setCompletionText(
            navalQuotes[Math.floor(Math.random() * navalQuotes.length)],
          );

          // Make copy of meditations and mutate it
          let meditationsCopy = meditations;
          if (meditations[nextMeditationId]) {
            meditationsCopy[nextMeditationId].locked = false;
            unlockMeditation(meditationsCopy);
          } else {
            setCompletionText(
              'You completed all 60 days, hopefully you gained self-understanding and peace.',
            );
          }
        }
      }
    }, 1000);
    // Return a function in useEffect - same as componentWillUnmount
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <View style={styles.timerContainer}>
      <StatusBar hidden={true} />
      <Text style={styles.time}>
        {hours}:{minutes}:{seconds}
      </Text>
      <Text style={styles.completionText}>{completionText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#14145a',
  },
  time: {
    fontSize: 40,
    color: 'white',
  },
  completionText: {
    fontSize: 20,
    color: '#3CB371',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default TimerScreen;
