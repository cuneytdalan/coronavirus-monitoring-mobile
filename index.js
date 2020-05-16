/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/core/http/http.interceptor';

AppRegistry.registerComponent(appName, () => App);
