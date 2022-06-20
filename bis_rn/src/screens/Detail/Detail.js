import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import Header from '../../components/Header/Header';
import {TiketOrderContext} from '../../context/TiketOrderProvider';
import Imgs from '../../assets/image/background.jpg';
import Gap from '../../components/gap/Gap';
import {Button} from 'react-native-paper';

const Detail = ({navigation}) => {
  const [tiketOrder, setTiketOrder] = useContext(TiketOrderContext);
  console.log(tiketOrder, '(999999999999)');
  return (
    <View style={styles.splashWrap}>
      <Header
        headerTitle="Detail"
        withBack
        onPress={() => navigation.goBack()}
      />

      <Gap Gap={90} />

      <Text style={styles.judul}>
        <Gap Gop={20} />
        Detail Tiket :{' '}
      </Text>

      <ScrollView style={styles.container}>
        <Image source={Imgs} style={styles.image} />
        <Gap Gap={10} />
        <Text style={styles.judul}>
          {tiketOrder.asal} - {tiketOrder.lokasi}
        </Text>
        <Gap Gap={10} />
        <Text>
          {tiketOrder.tanggal} - {tiketOrder.jam}
        </Text>

        <Gap Gap={50} />
        <View
          style={{
            justifyContent: 'space-between',
            width: '100%',
            flexDirection: 'row',
          }}>
          <Text>Tiket Tersisa : {tiketOrder.stok}</Text>
          <Text
            style={{fontSize: 15, fontWeight: 'bold', fontFamily: 'Roboto'}}>
            Harga : {tiketOrder.harga}
          </Text>
        </View>
        <Gap Gap={40} />
        <Text>Deskripsi :</Text>
        <Gap Gap={10} />

        <Text>{tiketOrder.keterangan}</Text>
      </ScrollView>

      <Button
        icon={'wallet-giftcard'}
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Pembayaran')}>
        Pesan Sekarang
      </Button>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  splashWrap: {
    backgroundColor: '#fff',
    flex: 1,
    display: 'flex',
    position: 'relative',
  },
  container: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  judul: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
});
