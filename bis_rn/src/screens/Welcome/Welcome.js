import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from 'react-native';
import BackgroundImg from '../../assets/image/background.jpg';
import IcLogo from '../../assets/icons/logo.png';
import Gap from '../../components/gap/Gap';

const Welcome = ({navigation}) => {
  return (
    <ImageBackground source={BackgroundImg} style={styles.getStartedWrap}>
      <View>
        <Image source={IcLogo} style={{width: 70, height: 70}} />
        <Text style={styles.getStartedTitle}>
          Mudik mudah dengan Ticker Buss
        </Text>
      </View>

      <View>
        <Button
          title="Get Started"
          type="primary"
          onPress={() => navigation.replace('Login')}
        />
        <Gap Gap={16} />
      </View>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  getStartedWrap: {
    padding: 40,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flex: 1,
  },
  getStartedTitle: {
    fontSize: 28,
    color: 'white',
    marginTop: 41,
    fontFamily: 'Roboto',
  },
});
