import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Paragraph, Dialog, Text, Portal} from 'react-native-paper';
import Gap from '../gap/Gap';
import dataTiket from '../../json/tiket.json';

const Informasi = ({visibleInfo, handleVisibleInfo}) => {
  return (
    <Portal>
      <Dialog visible={visibleInfo} onDismiss={handleVisibleInfo}>
        <Dialog.ScrollArea>
          <ScrollView style={{paddingHorizontal: 24, paddingVertical: 10}}>
            <Text
              variant="displayLarge"
              style={{fontSize: 15, fontWeight: 'bold'}}>
              Informasi Ticker Biss
            </Text>
            <Gap Gap={20} />
            <Text variant="displayLarge" style={{fontSize: 10}}>
              1. Jadwal tiket bis akan diperbarui setiap hari Senin - Jumat
            </Text>
            <Text variant="displayLarge" style={{fontSize: 10}}>
              2. Satu tiket bis hanya untuk 1 orang saja
            </Text>
            <Text variant="displayLarge" style={{fontSize: 10}}>
              3. Minimal Refund Tiket Bis 1 hari sebelum jadwal
            </Text>
            <Text variant="displayLarge" style={{fontSize: 10}}>
              4. Apabila terjadi kesalahan pada tiket bis yang anda pesan, maka
              Ticker Biss akan bertanggung jawab dan mengganti dengan yang baru
            </Text>
            <Text variant="displayLarge" style={{fontSize: 10}}>
              5. Tiket bis tidak bisa di Refund apabila sudah melewati tanggal
              Pemberangkatan
            </Text>
            <Gap Gap={50} />

            <Text
              variant="displayLarge"
              style={{fontSize: 15, fontWeight: 'bold'}}>
              Jadwal Tiket Bis
            </Text>
            <Gap Gap={20} />
            {dataTiket.tiket.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <Text variant="displayLarge" style={{fontSize: 10}}>
                    {item.asal} - {item.lokasi}
                  </Text>
                  <Text variant="displayLarge" style={{fontSize: 10}}>
                    {item.tanggal} - {item.jam}
                  </Text>
                </View>
              );
            })}
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
