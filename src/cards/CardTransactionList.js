import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Thumbnail, Button, Body, Icon, Left, Right } from 'native-base';
import { View, Text, Image } from 'react-native';
class CardTransactionList extends Component {

    render() {
        // const { handleCancel, handleAccept, handleAccept1, seconds, index } = this.props;
        return (
            <Content>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{ uri: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png' }} />
                            <Body>
                                <Text>{this.props.items.get('Title')}</Text>
                                <Text note>{this.props.items.get('Description')}</Text>
                            </Body>
                        </Left>
                        <Right>
                            <Button transparent>
                                <Icon active
                                    type='FontAwesome'
                                    name="edit"
                                    style={{ color: 'black' }} />
                            </Button>
                        </Right>
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
                            <Button transparent>
                                <Icon active
                                    type='FontAwesome5'
                                    name="file-pdf"
                                    style={{ color: 'black' }} />
                                <Text>View PDF</Text>
                            </Button>
                        </Right>
                    </CardItem>
                </Card>
            </Content>
        );
    }
}

export default CardTransactionList;
