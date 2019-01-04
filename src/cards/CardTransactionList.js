import React, { Component } from 'react';
import { Content, Card, CardItem, Button, Body, Icon, Left, Right } from 'native-base';
import { View, Text } from 'react-native';
class CardTransactionList extends Component {

    render() {
        return (
            <Content>
                <Card>
                    <CardItem>
                        <View style={{ width: 20 }} />
                        <Body>
                            <Text style={{ fontWeight: 'bold' }}>{this.props.items.get('Title')}</Text>
                            <Text note>{this.props.items.get('Description')}</Text>
                        </Body>
                        <Button transparent >
                            <Icon active
                                type='MaterialIcons'
                                name="delete-forever"
                                style={{ color: 'black' }} />
                        </Button>
                    </CardItem>

                    <CardItem>
                        <Left>
                            <Button transparent>
                                <Icon active
                                    type='MaterialCommunityIcons'
                                    name="currency-inr"
                                    style={{ color: 'black' }} />
                                <Text>{this.props.items.get('Price')}</Text>
                            </Button>
                        </Left>
                        <Body>
                            <Button transparent>
                                <Text>{this.props.items.get('BillDate')}</Text>
                            </Button>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.props._ViewPDF(this.props.items.get('BILL'))} >
                                <Icon active
                                    type='FontAwesome5'
                                    name="file-pdf"
                                    style={{ color: 'black' }} />
                                <Text>  View BILL</Text>
                            </Button>
                        </Right>
                    </CardItem>
                </Card>
            </Content>
        );
    }
}

export default CardTransactionList;
