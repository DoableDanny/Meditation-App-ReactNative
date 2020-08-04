// This file is required for react-native-track-player to work. The event listeners are for the background controls.

import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => {
    console.log('play');
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    console.log('pause');
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());
};
