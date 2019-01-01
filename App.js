/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Parse from 'parse/react-native';

export default class App extends Component{
  
  componentDidMount() {
    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize("WAKZzbKAkOgVdO86ttzuoi549JlJXC87ZOhhEtmH", "3g17iy7ZNwkpxsmQVauPDrKjby5RoIzam2FH3H3u"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = 'https://parseapi.back4app.com/'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
      </View>
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

});
