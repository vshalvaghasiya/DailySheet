import React from 'react';
import { View, Text, Image } from 'react-native';
import { imageNOInternet } from './Constant';
import { Button } from '../common/Button';

const NoInternet = (props) => {
	const { checkConnection } = props;
	return (
		<View style={styles.container}>
			<Image source={imageNOInternet} resizeMode={Image.resizeMode.center} />
			<Text style={styles.textStyle}> { "No internet connection" } </Text>
			<Text style={styles.textStyle}> { "Please check the network and try again." } </Text>
			<Button text="Retry" onPress={checkConnection} />
		</View>
	);
};

const styles = {
  container: {
    flex: 1,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  textStyle: {
    fontSize: 16,

   }
};
export default NoInternet;
