// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import Login from "./components/login";
import Attendance from "./components/Attendance";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();


export default function App() {

  return (
    // <View  style={styles.background}>
    //   <Login/>
    // </View>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Attendance" component={Attendance} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});