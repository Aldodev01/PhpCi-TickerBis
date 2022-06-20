import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import Header from '../../components/Header/Header';
import Gap from '../../components/gap/Gap';
import {
  Button,
  Card,
  IconButton,
  Modal,
  Searchbar,
  TextInput,
} from 'react-native-paper';
import dataTiket from '../../json/tiket.json';
import LottieView from 'lottie-react-native';
import {TiketOrderContext} from '../../context/TiketOrderProvider';

const Pesan = ({navigation}) => {
  const [tiketOrder, setTiketOrder] = useContext(TiketOrderContext);
  const [visible, setVisible] = useState({
    dialogSearch: false,
    loading: false,
  });

  const [filterData, setFilterData] = useState({
    asal: '',
    tujuan: '',
    all: '',
  });

  const [resultFilter, setResultFilter] = useState(null);

  const handleDialogSearch = () => {
    setVisible({
      ...visible,
      dialogSearch: !visible.dialogSearch,
    });
  };

  const handleTiketJadwalSearch = async () => {
    setVisible({
      ...visible,
      loading: true,
    });
    const filtering = await dataTiket?.tiket?.filter(e => {
      return e?.asal === filterData.asal && e?.lokasi === filterData.tujuan;
    });
    await setResultFilter(filtering);
    setTimeout(() => {
      setVisible({
        ...visible,
        loading: false,
        dialogSearch: false,
      });
    }, 2000);
  };

  return (
    <View style={styles.wrap}>
      <Header
        headerTitle="Pemesanan Tiket"
        withBack
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <Gap Gap={55} />
        <View style={styles.container}>
          <Searchbar
            placeholder="Cari Tujuan Dan Pesan Tiket"
            onChangeText={text => {
              if (text.length > 3) {
                const filter = dataTiket?.tiket?.filter(e => {
                  return e?.lokasi === text;
                });
                setResultFilter(filter);
              }
            }}
          />
          <Gap Gap={15} />

          <Card.Title
            title="Pencarian Jadwal"
            subtitle="Mencari Tiket Dengan Jadwal"
            right={props => (
              <IconButton
                {...props}
                icon="airplane-search"
                onPress={handleDialogSearch}
              />
            )}
          />
        </View>
        <Gap Gap={25} />

        {resultFilter === null ? (
          <Text>Cari Tiket Anda Diatas</Text>
        ) : resultFilter.length <= 0 ? (
          <View style={styles.filterWrap}>
            <LottieView
              source={require('../../assets/lottie/notFound.json')}
              autoPlay
              loop
              style={{width: 200, height: 200}}
            />
            <Text style={styles.splashTitle}>
              Maaf!, Tiket yang Anda cari tidak ditemukan
            </Text>
          </View>
        ) : (
          <View style={styles.filterWrap}>
            <Text>Hasil Pencarian</Text>
            {resultFilter?.map((e, i) => {
              return (
                <Card
                  key={i}
                  style={{width: '100%', marginTop: 20, marginBottom: 20}}>
                  <Card.Cover
                    source={{
                      uri: 'https://images.unsplash.com/photo-1632276536839-84cad7fd03b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
                    }}
                  />
                  <Card.Title
                    title={e?.asal + ' - ' + e?.lokasi}
                    subtitle={`${e?.tanggal} ~ ${e?.jam}`}
                    right={props => (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Button
                          onPress={() => {
                            setTiketOrder({
                              ...tiketOrder,
                              id: e.id,
                              lokasi: e.lokasi,
                              asal: e.asal,
                              tanggal: e.tanggal,
                              jam: e.jam,
                              harga: e.harga,
                              keterangan: e.keterangan,
                              stok: e.stok,
                            });
                            navigation.navigate('Detail');
                          }}>
                          Detail
                        </Button>
                        <IconButton
                          {...props}
                          icon="arrow-right"
                          onPress={() => {
                            setTiketOrder({
                              ...tiketOrder,
                              id: e.id,
                              lokasi: e.lokasi,
                              asal: e.asal,
                              tanggal: e.tanggal,
                              jam: e.jam,
                              harga: e.harga,
                              keterangan: e.keterangan,
                              stok: e.stok,
                            });
                            navigation.navigate('Pembayaran');
                          }}
                        />
                      </View>
                    )}
                  />
                </Card>
              );
            })}
          </View>
        )}
      </ScrollView>

      <Modal
        visible={visible.dialogSearch}
        onDismiss={handleDialogSearch}
        contentContainerStyle={{padding: 20}}>
        <View style={styles.modal}>
          <Gap Gap={20} />
          <Text>Cari Jadwal Tiket Perjalanan mu Disini !</Text>
          <Gap Gap={20} />

          <TextInput
            label="Kota Asal"
            mode="outlined"
            left={<TextInput.Icon name="arrow-bottom-left-bold-box-outline" />}
            //   value={text}
            onChangeText={text => setFilterData({...filterData, asal: text})}
          />
          <Gap Gap={20} />

          <TextInput
            label="Kota Tujuan"
            mode="outlined"
            left={<TextInput.Icon name="arrow-bottom-right-bold-box-outline" />}
            //   value={text}
            onChangeText={text => setFilterData({...filterData, tujuan: text})}
          />
          <Gap Gap={40} />
          <Button
            mode="contained"
            icon={'briefcase-search-outline'}
            onPress={handleTiketJadwalSearch}
            loading={visible.loading}>
            Cari Tiket
          </Button>
          <Gap Gap={60} />
          <IconButton
            style={{position: 'absolute', bottom: 0, right: 0}}
            icon={'close'}
            onPress={handleDialogSearch}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Pesan;

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    padding: 20,
  },
  modal: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    height: '100%',
    maxHeight: 500,
    position: 'relative',
  },
  filterWrap: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  splashTitle: {
    fontSize: 15,
    marginTop: 20,
    color: 'black',
  },
});
