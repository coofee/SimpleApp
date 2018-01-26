/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { StackNavigator, NavigationActions } from 'react-navigation';
import Home from './Home';
import Chat from './Chat';
import Tab from './Tab';

import Config from "./config"

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const Router = StackNavigator({
  home: {
    screen: Home,
    navigationOptions: {
      title: '例子'
      // header: null, // hide header
    }
  },
  chat: {
    screen: Chat,
    navigationOptions: ({ navigation }) => {
      console.log('navigationOptions', navigation.state.params);
      return {
        // 使用函数生成title
        title: `Chat with ${navigation.state.params.user.name}`,
      }
    }
  },
  tab: {
    screen: Tab,
    navigationOptions: {
      header: null
    }
  }
});

const defaultGetStateForAction = Router.router.getStateForAction;

Router.router.getStateForAction = (action, state) => {

  console.log("action=", action, ", state=", state)
  return defaultGetStateForAction(action, state);
}

export default class App extends Component {

  _onNavigationStateChange = (prevState, newState, action) => {
    console.log("prevState=", prevState, ", newState=", newState, ", action=", action)
  }

  render() {
    return (
      <Router onNavigationStateChange={this._onNavigationStateChange} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
