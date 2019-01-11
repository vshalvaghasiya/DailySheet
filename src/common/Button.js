import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
	return (
		<TouchableOpacity onPress={props.onPress} style={styles.buttonStyle}>
			<Text style={styles.textStyle}> {props.text}</Text>
		</TouchableOpacity>
	);
};

const styles = {
	buttonStyle: {
		marginTop: 10,
		alignSelf: 'stretch',
		marginLeft: 5,
		marginRight: 5,
		borderColor: '#007aff',
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		borderRadius: 5
	},

	textStyle: {
		paddingTop: 10,
		paddingBottom: 10,
		fontSize: 16,
		alignSelf: 'center',
		color: '#007aff',
	}
};

export { Button };
