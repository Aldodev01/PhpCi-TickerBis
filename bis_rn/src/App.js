import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Home, Print, Splash, Welcome} from './screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IcHome from './assets/icons/home.svg';
import IcPrinter from './assets/icons/printer.svg';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  function MyTabBar({state, descriptors, navigation}) {
    const BotIcon = ({title, actived}) => {
      if (title === 'Home') {
        return actived ? <IcHome /> : <IcHome />;
      }
      if (title === 'Print') {
        return actived ? <IcPrinter /> : <IcPrinter />;
      }
      // if (title === 'Hospitals') {
      //   return actived ? <IconHospitalsActive /> : <IconHospitals />;
      // }

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
          name="Print"
          component={Print}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    );
  };

  return (
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
          name="MainApp"
          component={MainApp}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
  },
});

export default App;
