import React from 'react';
import {StyleSheet, Text, TouchableOpacityBase, View} from 'react-native';
import IcBack from '../../assets/icons/chevron-left.svg';
import Gap from '../gap';

const Header = () => {
  return (
    <View style={styles.header}>
      {/* <TouchableOpacityBase onPress={onPress}> */}
      <IcBack />
      {/* </TouchableOpacityBase> */}
      <Text style={styles.headerText}>asds</Text>
      <Gap Gop={24} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#00A3FF',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'absolute',
  },

  headerText: {
    textAlign: 'center',
    flex: 1,
    fontSize: 20,
    fontFamily: 'Roboto',
    color: '#fff',
  },
});

export default Header;
