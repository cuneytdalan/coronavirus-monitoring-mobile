/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSkullCrossbones,
  faHeartbeat,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import Home from './src/Home';

const App: () => React$Node = () => {
  return <Home></Home>;
};
export default App;
