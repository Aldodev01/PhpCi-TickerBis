import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header/Header';
import MapView from 'react-native-maps';

const Lokasi = ({navigation}) => {
  return (
    <View style={styles.wrap}>
      <Header
        headerTitle="Lokasi"
        withBack
        onPress={() => navigation.goBack()}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

export default Lokasi;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
});
