import React, { Component } from 'react';
import { Platform, View, AsyncStorage } from 'react-native';
import { Container, Header, Title, Tab, Tabs, Button, Fab, Body, Icon, Left, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }

    navigate() {
        Actions.pop();
    }

    render() {
        return (
            <Container>
                <Header hasTabs>
                    <Left>
                        <Button transparent>
                            <Icon name='chevron-left' type='Entypo' style={[Platform.OS === 'ios' ?
                                { color: '#000000' } : { color: '#FFFFFF' }]} onPress={this.navigate} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                    <Right />
                </Header>

                <Tabs>
                    <Tab heading="Tab1">
                        
                    </Tab>
                    <Tab heading="Tab2">
                        
                    </Tab>
                </Tabs>

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
                            name="share" />
                        <Button style={{ backgroundColor: '#34A34F' }}>
                            <Icon name="logo-whatsapp" />
                        </Button>
                        <Button style={{ backgroundColor: '#3B5998' }}>
                            <Icon name="logo-facebook" />
                        </Button>
                        <Button disabled style={{ backgroundColor: '#DD5144' }}>
                            <Icon name="mail" />
                        </Button>
                    </Fab>
                </View>

            </Container>
        );
    }
}

export default Dashboard;