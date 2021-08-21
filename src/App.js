/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, Text, Alert } from 'react-native';
import Login from './components/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App: () => React$Node = () => {
  const [token, setToken] = useState('');

  const doLogin = (email, password) => {
    // fetch('http://localhost:3010/login', {
    fetch('https://f0cf-80-217-151-211.ngrok.io/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          // Alert.alert(json.token)
          setToken(json.token);
          storeData(json.token);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@jwt', value)
    } catch (e) {
      Alert.alert('Error while storing data!')
    }
  }

  return (
    <>
      <SafeAreaView>
        <Login doLogin={doLogin} />
      </SafeAreaView>
    </>
  );
};

export default App;
