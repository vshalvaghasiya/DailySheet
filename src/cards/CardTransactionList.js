import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Thumbnail, Button, Body, Icon, Left, Right } from 'native-base';
import { View, Text, Image } from 'react-native';
class CardTransactionList extends Component {

    render() {
        // const { handleCancel, handleAccept, handleAccept1, seconds, index } = this.props;
        const { Title, Description, Price, BILL, StoreName, BillDate } = this.props.items;
        console.log('Success',this.props.index );

        return (
            <Content>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{ uri: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png' }} />
                            <Body>
                                <Text>{this.props.index}</Text>
                                <Text note>{Description}</Text>
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
                                <Text>10.0</Text>
                            </Button>
                        </Left>
                        <Body>
                            <Button transparent>
                                <Text>1 Jan, 2019</Text>
                            </Button>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Icon active
                                    type='FontAwesome5'
                                    name="file-pdf"
                                    style={{ color: 'black' }} />
                                <Text>  View PDF</Text>
                            </Button>
                        </Right>
                    </CardItem>
                </Card>
            </Content>
        );
    }
}

export default CardTransactionList;
