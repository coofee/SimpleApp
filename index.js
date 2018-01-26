import { AppRegistry } from 'react-native';
import App from './src/App';

import { useStrict } from 'mobx'
useStrict(true)

AppRegistry.registerComponent('SimpleApp', () => App);