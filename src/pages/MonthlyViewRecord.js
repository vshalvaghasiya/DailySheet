import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, Alert } from 'react-native';
import {
    Container, Header, Title,
    Drawer, Button, Fab, Body, Icon, Left, Right,
    CardItem
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Parse from 'parse/react-native';
import Moment from 'moment';
import { Spinner } from '../common/Spinner';

import CardTransaction from '../cards/CardTransactionList';
import SideBar from '../Drawer/SideBar';
class MonthlyViewRecord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            data: [],
            loading: false,
            Total: 0,
        };
        this._ViewPDF = this._ViewPDF.bind(this);
        this.editRecord = this.editRecord.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);
    }

    componentDidMount() {
        this.GetTransaction();
    }

    getLstDayOfMonFnc(date) {
        return new Date(date.getDate(), date.getMonth(), 0).getDate()
    }

    GetTransaction() {
        this.setState({ loading: true });
        const MyObject = Parse.Object.extend('DailyReport');
        const query = new Parse.Query(MyObject);
        query.descending('BillDate');
        query.greaterThanOrEqualTo('BillDate','Jan 1 2019 ');
        query.lessThanOrEqualTo('BillDate','Jan 31 2019 ');
        
        query.limit = 1000;
        query.find().then((results) => {
            this.setState({ loading: false });
            this.setState({ data: results });
            var msgTotal = results.reduce(function (prev, cur) {
                return Number(prev) + Number(cur.get('Price'));
            }, 0);
            this.setState({ Total: msgTotal });
        }, (error) => {
            this.setState({ loading: false });
            console.error(error);
        });
    }

    _ViewPDF(PDF) {
        if (!!PDF) {
            Actions.viewPDF({ PDF: PDF._url });
        } else {
            Alert.alert('Message..!', 'Bill not found');
        }
    }

    deleteRecord(id) {
        this.setState({ loading: true });
        const MyObject = Parse.Object.extend('DailyReport');
        const query = new Parse.Query(MyObject);
        query.get(id).then((object) => {
            object.destroy().then((response) => {
                this.setState({ loading: false });
                this.GetTransaction();
            }, (error) => {
                this.setState({ loading: false });
            });
        });
    }

    editRecord(data) {
        if (!!data) {
            Actions.editTransaction({ data: data });
        } else {
            Alert.alert('Message..!', 'Data not found');
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
                    editRecord={this.editRecord}
                    deleteRecord={this.deleteRecord}
                />
            );
        }
        return (
            <View style={styles.center3}>
                <Text style={{ padding: 20, fontSize: 18 }}>{this.state.message}</Text>
            </View>
        );
    }

    navigate() {
        Actions.pop();
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
                            <Icon name='chevron-left' type='Entypo' style={[Platform.OS === 'ios' ?
                                { color: '#000000' } : { color: '#FFFFFF' }]} onPress={this.navigate} />
                        </Button>
                    </Left>
                        <Body>
                            <Title>Daily Sheet</Title>
                        </Body>
                        <Right />
                    </Header>

                    <CardItem>
                        <Left>
                            <Button transparent >
                                <Text style={{ fontWeight: 'bold', fontSize: 20 }}> Total Transcation</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button transparent>
                                <Icon active
                                    type='MaterialCommunityIcons'
                                    name="currency-inr"
                                    style={{ color: 'black' }} />
                                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{this.state.Total}</Text>
                            </Button>
                        </Right>
                    </CardItem>

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

export default MonthlyViewRecord;