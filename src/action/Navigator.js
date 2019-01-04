import React from 'react';
import { Platform } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Dashboard from '../pages/Dashboard';
import ViewPDF from '../pages/ViewPDF';
import Cashback from '../pages/Cashback';
import MonthlyReport from '../pages/MonthlyReport';
import YearlyReport from '../pages/YearlyReport';
import CreateTransaction from '../pages/CreateTransaction';
import EditTransaction from '../pages/EditTransaction';

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
                    key="dashboard"
                    component={Dashboard} hideNavBar={'true'}
                />
                <Scene
                    key="cashback"
                    component={Cashback} hideNavBar={'true'}
                />
                <Scene
                    key="monthlyreport"
                    component={MonthlyReport} hideNavBar={'true'}
                />
                <Scene
                    key="yearlyreport"
                    component={YearlyReport} hideNavBar={'true'}
                />
                <Scene
                    key="viewPDF"
                    component={ViewPDF} hideNavBar={'true'}
                />
                <Scene
                    key="createTransaction"
                    component={CreateTransaction} hideNavBar={'true'}
                />
                <Scene
                    key="editTransaction"
                    component={EditTransaction} hideNavBar={'true'}
                />

            </Scene>
        </Router>
    );
};


export default Navigator;
