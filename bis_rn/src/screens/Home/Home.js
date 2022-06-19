import {StyleSheet, Text, View, BackHandler, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {UserGet} from '../../api/UserApi';
import {Avatar, Button} from 'react-native-paper';
import Header from '../../components/Header/Header';
import Informasi from '../../components/Informasi/Informasi';
const Home = ({navigation}) => {
  const [dataUser, setDataUser] = useState(null);
  const [visible, setVisible] = useState({
    visibleInfo: false,
  });

  const handleVisibleInfo = () => {
    setVisible({
      ...visible,
      visibleInfo: !visible.visibleInfo,
    });
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Apakah Kamu Yakin ingin Keluar ?', [
        {
          text: 'Batalkan',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Keluar', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    UserGet()
      .then(res => res.data)
      .then(json => setDataUser(json))
      .catch(error => {
        console.log(error);
      });
  }, [dataUser]);

  return (
    <View style={styles.splashWrap}>
      <Header headerTitle="Home" />

      <View style={styles.menu}>
        <Button
          style={{margin: 20}}
          mode="contained"
          onPress={handleVisibleInfo}>
          Informasi
        </Button>
        <Button
          style={{margin: 20}}
          mode="contained"
          onPress={() => navigation.navigate('Tentang')}>
          Tentang
        </Button>
        <Button
          style={{margin: 20}}
          mode="contained"
          onPress={() => navigation.navigate('Bantuan')}>
          Bantuan
        </Button>
        <Button
          style={{margin: 20}}
          mode="contained"
          onPress={() => navigation.navigate('Lokasi')}>
          Lokasi
        </Button>
        <Button
          style={{margin: 20}}
          mode="contained"
          onPress={() => navigation.navigate('Pesan')}>
          Pesan Tiket
        </Button>
        <Button
          style={{margin: 20}}
          mode="elevated"
          onPress={() => BackHandler.exitApp()}>
          Keluar
        </Button>
      </View>
      <Informasi
        visibleInfo={visible.visibleInfo}
        handleVisibleInfo={handleVisibleInfo}
      />
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
  menu: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Home;
