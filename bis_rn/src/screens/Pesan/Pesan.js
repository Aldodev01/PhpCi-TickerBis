import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header/Header';

const Pesan = ({navigation}) => {
  return (
    <View>
      <Header
        headerTitle="Pemesanan Tiket"
        withBack
        onPress={() => navigation.goBack()}
      />
      <Text>Pesan</Text>
    </View>
  );
};

export default Pesan;

const styles = StyleSheet.create({});
