import {StyleSheet, Text, View, BackHandler, Alert, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {UserGet} from '../../api/UserApi';
import {Avatar, Button} from 'react-native-paper';
import Header from '../../components/Header/Header';
import Informasi from '../../components/Informasi/Informasi';
import BgL from '../../assets/image/BgL.png';

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
      Alert.alert('Ticket Biss Log out !', 'Apakah Anda yakin ingin keluar ?', [
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
      <Image style={styles.imageBgL} source={BgL} />
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
  imageBgL: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    width: 250,
    height: 250,
  },
});

export default Home;
