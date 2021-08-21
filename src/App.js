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
import Detail from './components/Detail';
import New from './components/New';

const App: () => React$Node = () => {
  const [token, setToken] = useState('');

  const [view, setView] = useState('main'); //views: main, new, detail
  const [item, setItem] = useState({});

  <List items={items} setView={setView} setItem={setItem} />;

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

  const addItem = (title, price, description) => {
    fetch('https://f0cf-80-217-151-211.ngrok.io/new', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        price,
        description,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          setItems(json.items);
          setView('list');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <SafeAreaView>
        {view === 'new' ? (
          <New addItem={addItem} setView={setView} />
        ) : view === 'detail' ? (
          <Detail item={item} setView={setView} />
        ) : token ? (
          <List items={items} setView={setView} setItem={setItem} />
        ) : (
          <Login doLogin={doLogin} />
        )}
      </SafeAreaView>
    </>
  );
};

export default App;
