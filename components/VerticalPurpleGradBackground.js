import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function PurpleGradientBackground({children, style}) {
  const purpleGrad = ['#2F2198', '#271C7E', '#1F1663'];

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={purpleGrad}
      style={style}>
      {children}
    </LinearGradient>
  );
}

// const styles = StyleSheet.create({
//   pageContainer: {
//     flex: 1,
//   },
// });
export default PurpleGradientBackground;
