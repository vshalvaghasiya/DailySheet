import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = (props) => {
	return (
		<View style={styles.spinnerStyle}>
			<ActivityIndicator
				color={props.color}
			 	size={props.size || 'small'}
			/>
		</View>
	);
};

const styles = {
	spinnerStyle: {
		justifyContent: 'center',
		alignItems: 'center'
	}
};
export { Spinner };
