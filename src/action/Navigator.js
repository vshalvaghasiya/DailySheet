import React from 'react';
import { Platform } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Dashboard from '../pages/Dashboard';
import ViewPDF from '../pages/ViewPDF';
import CreateTransaction from '../pages/CreateTransaction';
const Navigator = (props) => {
    return (
        <Router
            barButtonIconStyle={{ tintColor: '#000' }}
            navBarButtonColor='#000'
            navigationBarStyle={{
                ...Platform.select({
                    android: {
                        //  marginTop: StatusBar.currentHeight
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    }
                })
            }}
        >
            <Scene key="root">
                <Scene
                    type='reset'
                    key="createTransaction"
                    component={CreateTransaction} hideNavBar={'true'}
                />
                <Scene

                    key="dashboard"
                    component={Dashboard} hideNavBar={'true'}
                />
                <Scene
                    key="viewPDF"
                    component={ViewPDF} hideNavBar={'true'}
                />

            </Scene>
        </Router>
    );
};


export default Navigator;
