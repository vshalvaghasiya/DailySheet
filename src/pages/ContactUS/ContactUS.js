import React, { Component } from 'react';
import { Platform, View, Image, Text, Alert, AsyncStorage } from 'react-native';
import {
    Container, Header, Title,
    Drawer, Button, Body, Icon, Left, Right, Content
} from 'native-base';
import { AppIcon } from '../../helper/Constant';

import SideBar from '../../Drawer/SideBar';
class ContactUS extends Component {

    constructor(props) {
        super(props);
        this.state = {
            UserID: ''
        };
    }

    render() {
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

export default ContactUS;