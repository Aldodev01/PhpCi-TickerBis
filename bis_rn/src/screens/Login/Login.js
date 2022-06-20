import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, TextInput} from 'react-native-paper';
import IcLogo from '../../assets/icons/logo.png';
import Gap from '../../components/gap/Gap';

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Gap Gap={60} />

      <Image source={IcLogo} style={{width: 70, height: 70, marginRight: 30}} />
      <Text style={styles.title}>Masuk dan Pesan Tiket Anda</Text>

      <Gap Gap={60} />

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

      <Button mode="outlined" onPress={() => navigation.navigate('Register')}>
        Daftar
      </Button>
    </View>
  );
};

export default Login;

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
