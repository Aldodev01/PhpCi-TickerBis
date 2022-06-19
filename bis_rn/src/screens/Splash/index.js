import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      //replace can't be back, isn't save hostory
      // navigate can back, is save history
      navigation.replace('Welcome');
    }, 5000);
  }, []);

  return (
    <View style={styles.splashWrap}>
      <LottieView
        source={require('../../assets/lottie/splash.json')}
        autoPlay
        loop
        style={styles.container}
      />
      <Text style={styles.splashTitle}>Ticker Bis</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  splashWrap: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashTitle: {
    fontSize: 20,
    marginTop: 500,
    color: 'cyan',
  },
});
