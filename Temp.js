/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Alert, View, AsyncStorage, StatusBar, NetInfo, AppState } from 'react-native';
import { Root } from 'native-base';
import Parse from 'parse/react-native';

import Navigator from './src/action/Navigator';
import { APPID, JavaScriptKey } from './src/helper/Constant';
import NoInternet from './src/helper/NoInternet';
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isConnected: true,
      appState: AppState.currentState,
      fromLink: false,
    };
  }

  componentWillMount(){
    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize(APPID, JavaScriptKey); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = 'https://parseapi.back4app.com/'

    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  
  _handleAppStateChange = (nextAppState) => {
      if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
      }
      this.setState({ appState: nextAppState });
    }
  
      handleConnectionChange = (isConnected) => {
        Alert.alert('Success', isConnected);
        this.setState({ isConnected });
        if (isConnected) {
          if (!this.state.fromLink) {
          }
        }
      };

  spinerRender() {
    if (this.state.isConnected) {
      return (
        <View style={{ flex: 1 }}>
          <Navigator />
        </View>
      );
    }
    // return (
    //   <NoInternet checkConnection={this.checkConnection} />
    // );
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
