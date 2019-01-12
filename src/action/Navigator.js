import React from 'react';
import { Platform } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import ViewPDF from '../pages/Dashboard/ViewPDF';
import MonthlyReport from '../pages/Report/MonthlyReport';
import YearlyReport from '../pages/Report/YearlyReport';
import CreateTransaction from '../pages/Dashboard/CreateTransaction';
import EditTransaction from '../pages/Dashboard/EditTransaction';
import MonthlyViewRecord from '../pages/Report/MonthlyViewRecord'
import BorrowMoney from '../pages/BorrowMoney/BorrowMoney'
import BorrowedMoney from '../pages/BorrowedMoney/BorrowedMoney'
import Cashback from '../pages/Cashback/Cashback';
import CreateCashBack from '../pages/Cashback/CreateCashBack';
import CreateBorrowMoney from '../pages/BorrowMoney/CreateBorrowMoney';
import CreateBorrowedMoney from '../pages/BorrowedMoney/CreateBorrowedMoney';

import ContactUS from '../pages/ContactUS/ContactUS';
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
                    key="Login"
                    component={Login} hideNavBar={'true'}
                    initial={!props.isLogin}
                />
                <Scene
                    type='reset'
                    key="dashboard"
                    component={Dashboard} hideNavBar={'true'}
                    initial={props.isLogin}
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

                <Scene
                    key="createcashback"
                    component={CreateCashBack} hideNavBar={'true'}
                />

                <Scene
                    key="monthlyviewrecord"
                    component={MonthlyViewRecord} hideNavBar={'true'}
                />

                <Scene
                    key="BorrowMoney"
                    component={BorrowMoney} hideNavBar={'true'}
                />
                <Scene
                    key="CreateBorrowMoney"
                    component={CreateBorrowMoney} hideNavBar={'true'}
                />
                <Scene
                    key="BorrowedMoney"
                    component={BorrowedMoney} hideNavBar={'true'}
                />
                <Scene
                    key="CreateBorrowedMoney"
                    component={CreateBorrowedMoney} hideNavBar={'true'}
                />

                <Scene
                    key="ContactUS"
                    component={ContactUS} hideNavBar={'true'}
                />

            </Scene>
        </Router>
    );
};


export default Navigator;
