import React, { Component } from 'react';
import { Platform, View, Image, Text, Alert } from 'react-native';
import {
    Container, Header, Title,
    Drawer, Button, Fab, Body, Icon, Left, Right, CardItem, Content
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Parse from 'parse/react-native';
import { Spinner } from '../common/Spinner';
import { AppIcon } from '../helper/Constant';

import CardCashbackList from '../cards/CardCashbackList';
import SideBar from '../Drawer/SideBar';
class ContactUS extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            data: [],
            loading: false,
            Total: 0,
        };
        this._ViewPDF = this._ViewPDF.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);
    }

    componentDidMount() {
        this.GetTransaction();
    }

    GetTransaction() {
        this.setState({ loading: true });
        // let curruntDate = Moment(Date()).format('DD-MMM-YYYY')
        const NewsObject = Parse.Object.extend('Cashback');
        const query = new Parse.Query(NewsObject);
        query.addAscending('CashbackDate');
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

    deleteRecord(id) {
        Alert.alert(
            'Are you sure delete?',
            '',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this.actionSheet(id) },
            ],
            { cancelable: false }
        )
    }

    actionSheet(id) {
        this.setState({ loading: true });
        const MyObject = Parse.Object.extend('Cashback');
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

    renderCashbackList() {
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
                <CardCashbackList
                    key={`index-${index}`}
                    items={item}
                    index={index}
                    _ViewPDF={this._ViewPDF}
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
                            <Title>Contact US</Title>
                        </Body>
                        <Right />
                    </Header>

                    <Content style={{ marginTop: 150 }}>
                        <Body>
                            <Image source={AppIcon} style={{ height: 200, width: 200 }} />
                            <Text
                                style={{
                                    fontWeight: 'bold', fontSize: 20, width: '100%'
                                }}>
                                Daily Sheet
                           </Text>
                            <View style={{ height: 20 }}></View>
                            <Text
                                style={{
                                    fontWeight: 'normal', fontSize: 20, width: '100%'
                                }}>
                                vaghasiya907@gmail.com
                           </Text>
                            <Text
                                style={{
                                    fontWeight: 'normal', fontSize: 20, width: '100%'
                                }}>
                                Version 1.0
                           </Text>
                        </Body>
                    </Content>
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

export default ContactUS;