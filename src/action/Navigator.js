import React from 'react';
import { Platform } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Dashboard from '../pages/Dashboard';
import ViewPDF from '../pages/ViewPDF';
import MonthlyReport from '../pages/MonthlyReport';
import YearlyReport from '../pages/YearlyReport';
import CreateTransaction from '../pages/CreateTransaction';
import EditTransaction from '../pages/EditTransaction';
import MonthlyViewRecord from '../pages/MonthlyViewRecord'
import BorrowMoney from '../pages/BorrowMoney'
import BorrowedMoney from '../pages/BorrowedMoney'
import Cashback from '../pages/Cashback';
import CreateCashBack from '../pages/CreateCashBack';
import CreateBorrowMoney from '../pages/CreateBorrowMoney';
import ContactUS from '../pages/ContactUS';
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
                    key="ContactUS"
                    component={ContactUS} hideNavBar={'true'}
                />

            </Scene>
        </Router>
    );
};


export default Navigator;
