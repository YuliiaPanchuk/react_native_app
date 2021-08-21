/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import Login from './components/Login';

const doLogin = (email, password) => {
  console.log(email, password);
};

const App: () => React$Node = () => {
  return (
    <>
      <SafeAreaView>
        <Login doLogin={doLogin} />
      </SafeAreaView>
    </>
  );
};

export default App;
