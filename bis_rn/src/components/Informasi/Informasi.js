import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {Paragraph, Dialog, Portal} from 'react-native-paper';

const Informasi = ({visibleInfo, handleVisibleInfo}) => {
  return (
    <Portal>
      <Dialog visible={visibleInfo} onDismiss={handleVisibleInfo}>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </ScrollView>
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
});

export default Informasi;
