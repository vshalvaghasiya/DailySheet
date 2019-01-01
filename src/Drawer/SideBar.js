import React, { Component } from 'react';
import { Platform, View, AsyncStorage } from 'react-native';
import { Container, Header, Title, Tab, Tabs, Button, Fab, Body, Icon, Left, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';

class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }

    render() {
        return (
            <Container>
                <Header hasTabs>
                    <Left>

                    </Left>
                    <Body>
                        <Title>SideBar</Title>
                    </Body>
                    <Right />
                </Header>


            </Container>
        );
    }
}

export default SideBar;