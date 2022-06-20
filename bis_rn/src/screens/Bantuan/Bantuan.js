import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header/Header';
import Gap from '../../components/gap/Gap';
import {Avatar, Button, Card, IconButton, Snackbar} from 'react-native-paper';

const Bantuan = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('Memanggil Costumer Service');

  const handleVisible = text => {
    setTitle(text);
    setVisible(!visible);
  };

  return (
    <View style={styles.splashWrap}>
      <Header
        headerTitle="Ada yang bisa Kami bantu?"
        withBack
        onPress={() => navigation.goBack()}
      />
      <Gap Gap={55} />
      <Text>Beberapa Pilihan Untuk Menyelesaikan Masalah Anda</Text>
      <Gap Gap={20} />
      <Snackbar
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
        action={{
          label: 'Oke',
          onPress: () => {
            // Do something
          },
        }}>
        {title}
      </Snackbar>

      <Card.Title
        title="Costumer Service"
        subtitle="Kami siap melayani Anda 24/7"
        right={props => (
          <IconButton
            {...props}
            icon="arrow-left"
            onPress={() => {
              handleVisible('Memanggil Costumer Service');
            }}
          />
        )}
      />
      <Card.Title
        title="Tiket Problem"
        subtitle="Tiket Saya Bermasalah"
        right={props => (
          <IconButton
            {...props}
            icon="arrow-left"
            onPress={() => {
              handleVisible('Tiket Akan Kami Periksa');
            }}
          />
        )}
      />
      <Card.Title
        title="Tidak Bisa Memesan"
        subtitle="Saya tidak bisa memesan tiket"
        right={props => (
          <IconButton
            {...props}
            icon="arrow-left"
            onPress={() => {
              handleVisible('Coba pesan dilain waktu');
            }}
          />
        )}
      />
      <Card.Title
        title="Tiket Tidak Bisa Diprint"
        subtitle="Saya tidak bisa memprint tiket"
        right={props => (
          <IconButton
            {...props}
            icon="arrow-left"
            onPress={() => {
              handleVisible('Akan Kami periksa tiket Anda !');
            }}
          />
        )}
      />
    </View>
  );
};

export default Bantuan;

const styles = StyleSheet.create({
  splashWrap: {
    backgroundColor: '#fff',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
});
