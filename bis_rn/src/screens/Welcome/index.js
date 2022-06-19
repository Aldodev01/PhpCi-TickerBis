import React from 'react';
import {ImageBackground, StyleSheet, Text, View, Button} from 'react-native';
import BackgroundImg from '../../assets/image/background.jpg';
import {Gap} from '../../components';

const Welcome = ({navigation}) => {
  return (
    <ImageBackground source={BackgroundImg} style={styles.getStartedWrap}>
      <View>
        {/* <ILLogo /> */}
        <Text style={styles.getStartedTitle}>
          Konsultasi dengan dokter jadi lebih engas & mengsedih
        </Text>
      </View>

      <View>
        <Button
          title="Get Started"
          type="primary"
          onPress={() => navigation.replace('MainApp')}
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
    marginTop: 91,
    fontFamily: 'Roboto',
  },
});
