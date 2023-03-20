import React from 'react';
import { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';


const Login = () => {
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const[errorMessage, setErrorMessage]=useState("");

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleSubmit = async () => {
        try{
            const response = await fetch(`http://192.168.43.98:8000/api/user/login`, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const data = await response.json();
            {console.log(data)}
            if(response){
                console.log("meshyeeee")
                Alert.alert("Login successful", "", [{
                    text: "ok",
                    onPress: () => {
                        window.localStorage.setItem("token", data.token);
                    }
                },
            ]);
            }else{
                Alert.alert("login failed", data.message);
            }
        } catch (error){
            console.error(error);
            Alert.alert("errorrrr")
        }
    };

    useEffect(() => {
        if(errorMessage){
            const timeoutId = setTimeout(() =>{
                setErrorMessage("");
            }, 2000);
            return () => clearTimeout(timeoutId);
        }
    },[errorMessage]);
  return (
   


    <View style={styles.containerrr}>
      
<Image
       source={require('../assets/logo.png')}
    //    style={{width: 360, height: 200}}
    style={styles.imagelogin}
  
/>

     <Text style={styles.title}>Login</Text>
    <TextInput style={styles.input} placeholder="Enter your Email" onChangeText={handleEmailChange}></TextInput>
    <TextInput style={styles.input} placeholder="Enter your Password" onChangeText={handlePasswordChange}></TextInput>
    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
    <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
    </View>
       
  );
};

const styles = StyleSheet.create({
    containerrr: {
      flex: 1,
      backgroundColor:'#017f94',
      alignItems: 'center',
      marginTop: 150,
    },

    title: {
        color:'#EE8B3A',
        fontSize: 35,
        marginBottom: 40,
        height:50,
    },
    
    imagelogin:{
       backgroundColor:'#017f94',
       width: 360, 
       height: 200
    },
    
    input:{
        marginTop: 0,
        width: 300,
        height: 45,
        margin: 10,
        padding: 10,
        borderColor: '#EE8B3A',
        borderRadius: 5,
        borderWidth: 2,
        color: '#EE8B3A',
    },


    button:{
        width: 150,
        height: 50,
        marginTop: 10,
        backgroundColor: '#EE8B3A',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    buttonText:{
        color: '#fff',
        fontSize: 25,

    }

  })

export default Login;
