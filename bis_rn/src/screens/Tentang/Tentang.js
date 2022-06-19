import {StyleSheet, Text, View, BackHandler, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
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
