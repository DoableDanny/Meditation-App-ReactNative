import TrackPlayer from 'react-native-track-player';
import tracks from '../sounds/tracks';

// Function that sets up the track player when called (time up)
const trackPlayerInit = async () => {
  // Select a random track
  const randomNum = Math.floor(Math.random() * tracks.length);
  const track = tracks[randomNum];
  // Takes under 1 sec
  await TrackPlayer.setupPlayer();
  // Adding background controls. stopWithApp kills sound if app closes. These remote controls have eventListeners in service.js file.
  TrackPlayer.updateOptions({
    stopWithApp: false,
    capabilities: [
      // TrackPlayer.CAPABILITY_PLAY,
      // TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_STOP,
    ],
    compactCapabilities: [
      TrackPlayer.CAPABILITY_STOP,
      // TrackPlayer.CAPABILITY_PLAY,
      // TrackPlayer.CAPABILITY_PAUSE,
    ],
  });
  await TrackPlayer.add(track);
};

export default trackPlayerInit;
