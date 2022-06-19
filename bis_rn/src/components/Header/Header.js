import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IcBack from '../../assets/icons/chevron-left.svg';

const Header = ({withBack, onPress, headerTitle}) => {
  return (
    <View style={styles.header}>
      {withBack && (
        <TouchableOpacity accessibilityRole="button" onPress={onPress}>
          <IcBack />
        </TouchableOpacity>
      )}
      <Text style={styles.headerText}>{headerTitle}</Text>
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
    top: 0,
    left: 0,
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
