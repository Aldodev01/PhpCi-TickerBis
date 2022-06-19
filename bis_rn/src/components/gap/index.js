import React from 'react';
import {StyleSheet, View} from 'react-native';

const Gap = ({Gap, Gop}) => {
  return <View style={styles.gap(Gap, Gop)}></View>;
};

export default Gap;

const styles = StyleSheet.create({
  gap: (Gap, Gop) => ({
    height: Gap,
    width: Gop,
  }),
});
