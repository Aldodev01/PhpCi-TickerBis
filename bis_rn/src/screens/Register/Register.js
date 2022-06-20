import {Image, StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import {Button, TextInput} from 'react-native-paper';
import IcLogo from '../../assets/icons/logo.png';
import Gap from '../../components/gap/Gap';
import {RadioButton, Text} from 'react-native-paper';

const Register = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <Gap Gap={60} />

      <Image source={IcLogo} style={{width: 70, height: 70, marginRight: 30}} />
      <Text style={styles.title}>
        Daftarkan Diri Anda dan Pesan tiketmu sekarang
      </Text>

      <Gap Gap={60} />
      <TextInput
        label="Nama"
        mode="outlined"
        //   value={text}
        //   onChangeText={text => setText(text)}
      />
      <Gap Gap={20} />
      <RadioButton.Group>
        <Text>Jenis Kelamin</Text>
        <Gap Gap={20} />

        <View style={{flexDirection: 'row'}}>
          <RadioButton value="Laki - Laki" />
          <Text style={{marginLeft: 20, marginTop: 10}}>Laki - Laki</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <RadioButton value="Perempuan" />
          <Text style={{marginLeft: 20, marginTop: 10}}>Perempuan</Text>
        </View>
      </RadioButton.Group>
      <Gap Gap={20} />
      <TextInput
        label="Alamat"
        mode="outlined"
        //   value={text}
        //   onChangeText={text => setText(text)}
      />
      <Gap Gap={20} />
      <TextInput
        label="No Telephone"
        mode="outlined"
        //   value={text}
        //   onChangeText={text => setText(text)}
      />
      <Gap Gap={20} />

      <TextInput
        label="Email"
        mode="outlined"
        //   value={text}
        //   onChangeText={text => setText(text)}
      />
      <Gap Gap={20} />

      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        //   value={text}
        //   onChangeText={text => setText(text)}
      />
      <Gap Gap={40} />
      <Button mode="contained" onPress={() => navigation.navigate('MainApp')}>
        Submit
      </Button>
      <Gap Gap={10} />

      <Button mode="outlined" onPress={() => navigation.navigate('Login')}>
        Masuk
      </Button>
      <Gap Gap={90} />
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 25,
    color: 'black',
    marginTop: 41,
    fontFamily: 'Roboto',
  },
});
