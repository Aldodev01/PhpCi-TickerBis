import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IcHome from './assets/icons/home.svg';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import IcPrinter from './assets/icons/printer.svg';
import Home from './screens/Home/Home';
import Print from './screens/Print/Print';
import Splash from './screens/Splash/Splash';
import Welcome from './screens/Welcome/Welcome';
import Login from './screens/Login/Login';
import Tentang from './screens/Tentang/Tentang';
import Bantuan from './screens/Bantuan/Bantuan';
import Register from './screens/Register/Register';
import Lokasi from './screens/Lokasi/Lokasi';
import Pesan from './screens/Pesan/Pesan';
import Pembayaran from './screens/Pembayaran/Pembayaran';
import Detail from './screens/Detail/Detail';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#00A3FF',
      accent: '#FF00A8',
    },
  };
  function MyTabBar({state, descriptors, navigation}) {
    const BotIcon = ({title, actived}) => {
      if (title === 'Home') {
        return actived ? <IcHome /> : <IcHome />;
      }
      if (title === 'Tiket Saya') {
        return actived ? <IcPrinter /> : <IcPrinter />;
      }

      return <IcHome />;
    };
    return (
      <View style={styles.bottomTabs}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={
                isFocused ? {selected: true} : {selected: false}
              }
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={index}>
              <BotIcon title={label} actived={isFocused} />
              <Text
                style={{
                  color: '#FFF',
                  fontWeight: '600',
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  const MainApp = () => {
    return (
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Tiket Saya"
          component={Print}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    );
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MainApp"
            component={MainApp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Tentang"
            component={Tentang}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Bantuan"
            component={Bantuan}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Lokasi"
            component={Lokasi}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Pesan"
            component={Pesan}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Pembayaran"
            component={Pembayaran}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  bottomTabs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#00A3FF',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
});

export default App;
