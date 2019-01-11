import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, Alert } from 'react-native';
import {
    Container, Header, Title,
    Drawer, Button, Body, Icon, Left, Right
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Parse from 'parse/react-native';
import { Spinner } from '../common/Spinner';

import CardMonthlyReport from '../cards/CardMonthlyReport';
import SideBar from '../Drawer/SideBar';
class MonthlyReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            data: [],
            loading: false
        };
        this.viewRecord = this.viewRecord.bind(this);
    }

    componentDidMount() {
        this.GetTransaction();
    }

    GetTransaction() {
        this.setState({ loading: true });
        const NewsObject = Parse.Object.extend('Monthly');
        const query = new Parse.Query(NewsObject);
        query.limit = 1000;
        query.find().then((results) => {
            this.setState({ loading: false });
            this.setState({ data: results });
        }, (error) => {
            this.setState({ loading: false });
            console.error(error);
        });
    }

    viewRecord(data){
        Actions.monthlyviewrecord({StartDate: data.get('MonthStart'), EndDate:data.get('MonthEND')});
    }

    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

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
                <CardMonthlyReport
                    key={`index-${index}`}
                    items={item}
                    index={index}
                    viewRecord={this.viewRecord}
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
                            <Title>Monthly Reports</Title>
                        </Body>
                        <Right />
                    </Header>

                    <ScrollView style={margin}>
                        {this.renderTransactionList()}
                    </ScrollView>

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

export default MonthlyReport;