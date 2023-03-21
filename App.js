import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import Login from "./components/login";
import Attendance from "./components/Attendance";
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


const Stack = createStackNavigator();


export default function App() {

  // const [loggedIn, setLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   setLoggedIn(true);
  // };

  // const handleLogout = () => {
  //   setLoggedIn(false);
  // };
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
  //   <NavigationContainer>
  //   <Stack.Navigator>
  //     {!loggedIn ? (
  //       <Stack.Screen name="Login">
  //         {(props) => <Login {...props} onLogin={handleLogin} />}
  //       </Stack.Screen>
  //     ) : (
  //       <Stack.Screen name="Attendance">
  //         {(props) => <Attendance {...props} onLogout={handleLogout} />}
  //       </Stack.Screen>
  //     )}
  //   </Stack.Navigator>
  // </NavigationContainer>
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


