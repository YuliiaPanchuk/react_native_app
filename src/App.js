/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, Alert} from 'react-native';
import Login from './components/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import List from './components/List';

const App: () => React$Node = () => {
  const [token, setToken] = useState('');

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@jwt', value);
    } catch (e) {
      Alert.alert('Error while storing data!');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [items, setItems] = useState([]);

  const getData = async () => {
    try {
      const _token = await AsyncStorage.getItem('@jwt');
      setToken(_token);
      console.log(token);
      if (_token !== null) {
        fetch('https://f0cf-80-217-151-211.ngrok.io/items', {
          method: 'GET',
          headers: {
            authorization: `Bearer ${_token}`,
          },
        })
          .then(response => response.json())
          .then(json => {
            if (json.success) {
              json.items.map(item => (item.key = item.id + ''));
              setItems(json.items);
            } else {
              setToken(null);
            }
          })
          .catch(error => {
            setToken(null);
          });
      }
    } catch (e) {
      // error reading value
    }
  };

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
          setToken(json.token);
          storeData(json.token);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <SafeAreaView>
        {token === null ? <Login doLogin={doLogin} /> : <List items={items} />}
      </SafeAreaView>
    </>
  );
};

export default App;
