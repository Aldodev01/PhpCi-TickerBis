import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header/Header';

const Bantuan = ({navigation}) => {
  return (
    <View>
      <Header
        headerTitle="Tentang"
        withBack
        onPress={() => navigation.goBack()}
      />
      <Text>Bantuan</Text>
    </View>
  );
};

export default Bantuan;

const styles = StyleSheet.create({});
