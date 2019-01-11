import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, Alert } from 'react-native';
import {
    Container, Header, Title,
    Drawer, Button, Fab, Body, Icon, Left, Right
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Parse from 'parse/react-native';
import Moment from 'moment';
import { Spinner } from '../../common/Spinner';

import CardTransaction from '../../cards/CardTransactionList';
import SideBar from '../../Drawer/SideBar';
class YearlyReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            data: [],
            loading: false
        };
        this._ViewPDF = this._ViewPDF.bind(this);
    }

    componentDidMount() {
        this.GetTransaction();
    }

    GetTransaction() {
        this.setState({ loading: true });
        // let curruntDate = Moment(Date()).format('DD-MMM-YYYY')
        const NewsObject = Parse.Object.extend('DailyReport');
        const query = new Parse.Query(NewsObject);
        query.descending('BillDate');
        query.limit = 1000;
        query.find().then((results) => {
            this.setState({ loading: false });
            this.setState({ data: results });
        }, (error) => {
            this.setState({ loading: false });
            console.error(error);
        });
    }

    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    _ViewPDF(PDF) {
        if (!!PDF) {
            Actions.viewPDF({ PDF: PDF._url });
        } else {
            Alert.alert('Message..!', 'Bill not found');

        }
    }

    renderTransactionList() {
        if (this.state.loading) {
            return (
                <View style={styles.center3}>
                    <Text style={{ padding: 20, fontSize: 18 }}>{this.state.message}</Text>
                    <Spinner size="large" />
                </View>
            );
        }
        if (this.state.data && this.state.data.length > 0) {
            console.log(this.state.data);
            return this.state.data.map((item, index) =>
                <CardTransaction
                    key={`index-${index}`}
                    items={item}
                    index={index}
                    _ViewPDF={this._ViewPDF}
                />
            );
        }
        return (
            <View style={styles.center3}>
                <Text style={{ padding: 20, fontSize: 18 }}>{this.state.message}</Text>
            </View>
        );
    }

    render() {
        const { margin } = styles;
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={
                    <SideBar
                        navigator={this.navigator} />
                }
                onClose={() => this.closeDrawer()} >
                <Container>
                    <Header hasTabs>
                        <Left>
                            <Button transparent>
                                <Icon name='menu' type='Entypo' style={[Platform.OS === 'ios' ?
                                    { color: '#000000' } : { color: '#FFFFFF' }]} onPress={this.openDrawer} />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Yearly Report</Title>
                        </Body>
                        <Right />
                    </Header>

                    <ScrollView style={margin}>
                        {this.renderTransactionList()}
                    </ScrollView>
                    <View style={{ width: 50, height: 50, position: 'absolute', right: 0, bottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Fab
                            active={this.state.active}
                            direction="up"
                            containerStyle={{}}
                            style={{ backgroundColor: '#5067FF' }}
                            position="bottomRight"
                            onPress={() => Actions.createTransaction()}>
                            <Icon
                                type='Entypo'
                                name="plus" />
                        </Fab>
                    </View>

                </Container>
            </Drawer>
        );
    }
}

const styles = {
    margin: {
        margin: 20,
    }
};

export default YearlyReport;