import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import Header from '../../components/Header/Header';

const Print = () => {
  async function printHTML() {
    await RNPrint.print({
      html: '<div style="background-color: #00A3FF; border-radius: 30px; color: #FFFFFF;"><br/><br/><div style="width: 100%; background-color: #FFFFFF; color: #00A3FF; display: flex; justify-content: space-between; padding: 5px 20px"><h1>TickerBis</h1><div style="display: flex; align-items: center; justify-content: center;"><h1>VVIP</h1><h3>Kampung Rambutan</h3></div></div><br/><br/><div style="padding: 20px"><h3>KARTU INI HANYA BERLAKU UNTUK SATU KALI PERJALANAN</h3></div></div>',
    });
  }

  async function printPDF() {
    const results = await RNHTMLtoPDF.convert({
      html: '<h1>Custom converted PDF Document</h1>',
      fileName: 'test',
      base64: true,
    });

    await RNPrint.print({filePath: results.filePath});
  }

  async function printRemotePDF() {
    await RNPrint.print({
      filePath: 'https://graduateland.com/api/v2/users/jesper/cv',
    });
  }
  return (
    <View>
      <Header headerTitle="Print" />

      <Button onPress={printHTML} title="Print HTML" />
      <Button onPress={printPDF} title="Print PDF" />
      <Button onPress={printRemotePDF} title="Print Remote PDF" />
    </View>
  );
};

export default Print;

const styles = StyleSheet.create({});
