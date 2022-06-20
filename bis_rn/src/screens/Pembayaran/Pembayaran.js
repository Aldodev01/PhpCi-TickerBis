import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useContext, useState} from 'react';
import Header from '../../components/Header/Header';
import {TiketOrderContext} from '../../context/TiketOrderProvider';
import Imgs from '../../assets/image/background.jpg';
import Gap from '../../components/gap/Gap';
import {Button, Snackbar, ToggleButton, Text} from 'react-native-paper';
import LottieView from 'lottie-react-native';

const Pembayaran = ({navigation}) => {
  const [tiketOrder, setTiketOrder, ordered, setOrdered] =
    useContext(TiketOrderContext);
  const [count, setCount] = useState(0);
  const [state, setState] = useState({
    success: false,
    loading: false,
  });

  const handleOrder = () => {
    setState({
      ...state,
      loading: true,
    });

    setOrdered([
      ...ordered,
      {...tiketOrder, terbeli: count, harga: tiketOrder.harga * count},
    ]);
    setTimeout(() => {
      setState({
        ...state,
        success: true,
        loading: false,
      });
    }, 2000);
  };

  console.log(ordered, '(888888888888)');
  return (
    <View style={styles.splashWrap}>
      <Header
        headerTitle="Pembayaran"
        withBack
        onPress={() => navigation.goBack()}
      />

      <Gap Gap={90} />
      {state.success ? (
        <View style={styles.filterWrap}>
          <LottieView
            source={require('../../assets/lottie/success.json')}
            autoPlay
            loop
            style={{width: 200, height: 200}}
          />
          <Text style={{marginTop: 50}}>
            Anda berhasil melakukan pembayaran
          </Text>
          <Snackbar
            visible={state.success}
            onDismiss={() => {
              setState({...state, success: false});
            }}
            action={{
              label: 'Oke',
              onPress: () => {
                setState({...state, success: false});
                navigation.navigate('Tiket Saya');
              },
            }}>
            <Text style={{color: 'white'}}>
              Pembayaran Berhasil, Lanjutkan Melihat Tiket
            </Text>
          </Snackbar>
        </View>
      ) : (
        <>
          <Text style={styles.judul}>
            <Gap Gop={20} />
            Pembayaran Tiket :
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

            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                flexDirection: 'row',
              }}>
              <View>
                <Text>Berapa Tiket :</Text>
                <Gap Gap={10} />
                <ToggleButton.Row
                  onValueChange={value => setCount(value)}
                  value={count}>
                  <ToggleButton
                    icon="minus"
                    value={count <= 1 ? 1 : count - 1}
                  />
                  <Button>{count}</Button>
                  <ToggleButton
                    icon="plus"
                    value={
                      count >= tiketOrder.stok ? tiketOrder.stok : count + 1
                    }
                  />
                </ToggleButton.Row>
              </View>
              <Text
                style={{
                  marginTop: 30,
                  fontSize: 15,
                  fontWeight: 'bold',
                  fontFamily: 'Roboto',
                }}>
                Harga : Rp. {tiketOrder.harga * count}
              </Text>
            </View>
          </ScrollView>
          <Button
            icon={'wallet-giftcard'}
            mode="contained"
            style={styles.button}
            loading={state.loading}
            onPress={handleOrder}>
            Pesan Sekarang
          </Button>
        </>
      )}
    </View>
  );
};

export default Pembayaran;

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
  filterWrap: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
});
