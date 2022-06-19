import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header/Header';

const Lokasi = ({navigation}) => {
  return (
    <View>
      <Header
        headerTitle="Lokasi"
        withBack
        onPress={() => navigation.goBack()}
      />
      <Text>Lokasi</Text>
    </View>
  );
};

export default Lokasi;

const styles = StyleSheet.create({});
