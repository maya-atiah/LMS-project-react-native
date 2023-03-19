import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import Login from "./components/login";



export default function App() {
  return (
    <View >
      {/* <Text>Hi, I am Assala  </Text>
      <StatusBar style="auto" /> */}
      <Login/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


