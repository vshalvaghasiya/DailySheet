import React, { Component } from 'react';
import { Platform, View, ScrollView } from 'react-native';
import { Container, Header, Title, Tab, Drawer, Button, Fab, Body, Icon, Left, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';

import CardTransaction from '../cards/CardTransactionList';
import SideBar from '../Drawer/SideBar';
class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            data: ["1", "2", "3"]
        };
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    renderTransactionList() {
        if (this.state.data && this.state.data.length > 0) {
            return this.state.data.map((item, index) =>
                <CardTransaction
                    key={`index-${index}`}
                    items={item}
                    index={index}
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
                content={<SideBar navigator={this.navigator} />}
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
                            <Title>Dashboard</Title>
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
                            onPress={() => this.setState({ active: !this.state.active })}>
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

export default Dashboard;