import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Header} from '../../components';
const Home = ({navigation}) => {
  return (
    <View style={styles.splashWrap}>
      <Header headerTitle="Home" onPress={() => navigation.goBack()} />
      <Text>Home</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  splashWrap: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashTitle: {
    fontSize: 20,
    marginTop: 20,
    fontFamily: 'Roboto',
    color: 'cyan',
  },
});

export default Home;
