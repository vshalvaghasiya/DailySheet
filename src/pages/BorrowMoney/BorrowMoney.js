import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, Alert } from 'react-native';
import {
    Container, Header, Title,
    Drawer, Button, Fab, Body, Icon, Left, Right, CardItem
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Parse from 'parse/react-native';
import { Spinner } from '../../common/Spinner';

import CardMoney from '../../cards/CardMoney';
import SideBar from '../../Drawer/SideBar';
class BorrowMoney extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            data: [],
            loading: false,
            Total: 0,
        };
        this.deleteRecord = this.deleteRecord.bind(this);
    }

    componentDidMount() {
        this.GetTransaction();
    }

    GetTransaction() {
        this.setState({ loading: true });
        // let curruntDate = Moment(Date()).format('DD-MMM-YYYY')
        const NewsObject = Parse.Object.extend('Borrowing');
        const query = new Parse.Query(NewsObject);
        query.descending('Date');
        query.limit = 1000;
        query.find().then((results) => {
            this.setState({ loading: false });
            this.setState({ data: results });
            var msgTotal = results.reduce(function (prev, cur) {
                return Number(prev) + Number(cur.get('Money'));
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
        const MyObject = Parse.Object.extend('Borrowing');
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

    renderMoneyList() {
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
                <CardMoney
                    key={`index-${index}`}
                    items={item}
                    index={index}
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
                            <Title>Borrow Money</Title>
                        </Body>
                        <Right />
                    </Header>

                    <CardItem>
                        <Left>
                            <Button transparent >
                                <Text style={{ fontWeight: 'bold', fontSize: 20 }}> Total Borrow</Text>
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
                        {this.renderMoneyList()}
                    </ScrollView>
                    <View style={{ width: 50, height: 50, position: 'absolute', right: 0, bottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Fab
                            active={this.state.active}
                            direction="up"
                            containerStyle={{}}
                            style={{ backgroundColor: '#5067FF' }}
                            position="bottomRight"
                            onPress={() => Actions.CreateBorrowMoney()}>
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

export default BorrowMoney;