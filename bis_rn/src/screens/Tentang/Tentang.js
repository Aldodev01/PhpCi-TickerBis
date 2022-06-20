import {StyleSheet, BackHandler, Alert, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import {Text} from 'react-native-paper';
import IcLogo from '../../assets/icons/logo.png';

const Tentang = ({navigation}) => {
  const [visible, setVisible] = useState({
    visibleInfo: false,
  });

  return (
    <View style={styles.splashWrap}>
      <Header
        headerTitle="Tentang"
        withBack
        onPress={() => navigation.goBack()}
      />
      <Image source={IcLogo} style={{width: 100, height: 100}} />
      <Text>Tentang Kami</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  splashWrap: {
    backgroundColor: '#fff',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});

export default Tentang;
