/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, AsyncStorage, StatusBar } from 'react-native';
import { Root } from 'native-base';
import Parse from 'parse/react-native';

import Navigator from './src/action/Navigator';
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isConnected: true,
    };
  }

  componentDidMount() {
    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize("eOiFaquGETkC2WWkhxnhTqIS1xSZo75ckAJcVnFj", "4ZhGqJkHYCOgWAZDESEgrrdskGkR9Gque7PFXrnC"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = 'https://parseapi.back4app.com/'
  }

  spinerRender() {
    if (this.state.isConnected) {
      return (
        <View style={{ flex: 1 }}>
          <Navigator />
        </View>
      );
    }
    return (
      <NoInternet checkConnection={this.checkConnection} />
    );
  }

  render() {
    return (
      <Root style={styles.container}>
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
        />
        {this.spinerRender()}
      </Root>
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
});
