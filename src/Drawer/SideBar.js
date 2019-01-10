import React, { Component } from 'react';
import { Platform, View, ImageBackground, Image } from 'react-native';
import { Container, Header, Content, Text, List, Button, Body, Title, Left, Right, ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
const routes = ['Dashboard', 'Cashback', 'Monthly Report', 'Yearly Report', 'Contact Us'];
class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }

    navButtonClick = (data) => {
        switch (data) {
            case 'Dashboard':
                Actions.dashboard();
                break;
            case 'Cashback':
                Actions.cashback();
                break;
            case 'Monthly Report':
                Actions.monthlyreport();
                break;
            case 'Yearly Report':
                Actions.yearlyreport();
                break;
            case 'Contact Us':
                alert(data);
                break;
            default:
                break;
        }
        // Actions.createTransaction();
    }

    render() {
        return (
            <Container>
                <Header hasTabs>
                    <Left>

                    </Left>
                    <Body>
                    <Title>Daaily Sheet</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <List
                        dataArray={routes}
                        renderRow={data => {
                            return (
                                <ListItem
                                    button
                                    onPress={() => this.navButtonClick(data)}>
                                    <Text>{data}</Text>
                                </ListItem>
                            );
                        }}
                    />

                </Content>
            </Container>
        );
    }
}

export default SideBar;