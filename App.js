import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import Login from "./components/login";



export default function App() {
  return (
    <View  style={styles.background}>
    
      <Login/>
    </View>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor:'#017f94',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


