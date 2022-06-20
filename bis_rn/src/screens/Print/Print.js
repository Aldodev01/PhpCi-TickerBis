import {Image, StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import Header from '../../components/Header/Header';
import {TiketOrderContext} from '../../context/TiketOrderProvider';
import {Card, IconButton, Text, Button} from 'react-native-paper';
import Gap from '../../components/gap/Gap';
import IcLogo from '../../assets/icons/logo.png';
import LottieView from 'lottie-react-native';

const Print = ({navigation}) => {
  const urler =
    'https://res.cloudinary.com/aldodevv/image/upload/v1655714844/logo_v5nabx.svg';
  const [tiketOrder, setTiketOrder, ordered, setOrdered] =
    useContext(TiketOrderContext);
  async function printHTML() {
    await RNPrint.print({
      html: '<div style="background-color: #00A3FF; border-radius: 30px; color: #FFFFFF;"><br/><br/><div style="width: 100%; background-color: #FFFFFF; color: #00A3FF; display: flex; justify-content: space-between; padding: 5px 20px"><h1>TickerBis</h1><div style="display: flex; align-items: center; justify-content: center;"><h1>VVIP</h1><h3>Kampung Rambutan</h3></div></div><br/><br/><div style="padding: 20px"><h3>KARTU INI HANYA BERLAKU UNTUK SATU KALI PERJALANAN</h3></div></div>',
    });
  }

  async function printPDF() {
    const results = await RNHTMLtoPDF.convert({
      html: '<h1>Custom converted PDF Document</h1>',
      fileName: 'test',
      base64: true,
    });

    await RNPrint.print({filePath: results.filePath});
  }

  async function printRemotePDF() {
    await RNPrint.print({
      filePath: 'https://graduateland.com/api/v2/users/jesper/cv',
    });
  }
  return (
    <View style={{flex: 1}}>
      <Header headerTitle="Print" />
      <Gap Gap={70} />

      {ordered.length === 0 ? (
        <View style={styles.filterWrap}>
          <Gap Gop={200} />

          <LottieView
            source={require('../../assets/lottie/notFound.json')}
            autoPlay
            loop
            style={{width: 200, height: 200}}
          />
          <View style={{marginTop: 40}}>
            <Text>Maaf!, Anda Belum Memiliki Tiket</Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Home')}>
              Pesan Tiketmu
            </Button>
          </View>
        </View>
      ) : (
        <>
          <Text style={styles.judul}>
            <Gap Gop={20} />
            Daftar Tiket Anda :
          </Text>
          <Gap Gap={20} />
          {ordered.map((e, i) => {
            return (
              <Card key={i}>
                <Card.Title
                  title={`${e.asal} - ${e.lokasi}`}
                  subtitle={`${e.tanggal} - ${e.jam}`}
                  left={props => (
                    <Image source={IcLogo} style={{width: 30, height: 30}} />
                  )}
                  right={props => (
                    <View style={{flexDirection: 'row'}}>
                      <IconButton
                        {...props}
                        icon="printer"
                        onPress={async () => {
                          await RNPrint.print({
                            html: `<div style="background-color: #00A3FF; border-radius: 30px; color: #FFFFFF;"><br/><br/><div style="width: 100%; background-color: #FFFFFF; color: #00A3FF; display: flex; justify-content: space-between; padding: 5px 20px;"><h1><img src="${urler}" style="width: 30px; height: 30px;"/>&nbspTickerBis</h1><div style="padding: 0px 40px; display: flex; flex: 1; align-items: flex-end; justify-content: flex-end;"><h3>VVIP</h3></div></div><br/><br/><div style="padding: 20px"><h3>KARTU INI HANYA BERLAKU UNTUK SATU KALI PERJALANAN</h3> <div><h3>Waktu Pemberangkatan : </h3><h3> ${e.tanggal} - ${e.jam}</h3> </div><div style="width: 100%; display: flex; justify-content: space-between; align-items: center;"><div><h3>Harga Tiket : </h3><h3>${e.harga}</h3> </div> <div><h3>Berlaku Untuk : </h3><h3> ${e.terbeli} Orang</h3> </div></div></div></div>`,
                          });
                        }}
                      />
                      <IconButton
                        {...props}
                        icon="printer-outline"
                        onPress={async () => {
                          const results = await RNHTMLtoPDF.convert({
                            html: `<div style="display: flex; justify-content: space-between; align-items: center; width: 100%; border-bottom: 2px solid black"><h1><img src="${urler}" style="width: 30px; height: 30px;"/>&nbsp Bukti Pembayaran TickerBiss</h1><h3>Tanggal : ${e.tanggal}</h3></div> <br/><br/> <div><p>Status : <b style="color: green;">Sukses</b></p> <p>Harga : <b>Rp. ${e.harga}</b></p><p>Jumlah Tiket: <b>${e.terbeli}</b></p></div><br/><br/> <div><p>Keterangan : </p> <p>${e.keterangan}</p></div> `,
                            fileName: `struktiket${e.asal}-${e.lokasi}`,
                            base64: true,
                          });

                          await RNPrint.print({filePath: results.filePath});
                        }}
                      />
                      <IconButton {...props} icon="close" onPress={() => {}} />
                    </View>
                  )}
                />
              </Card>
            );
          })}
        </>
      )}
    </View>
  );
};

export default Print;

const styles = StyleSheet.create({
  filterWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  judul: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
