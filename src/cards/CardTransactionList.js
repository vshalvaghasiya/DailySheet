import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Thumbnail, Button, Body, Icon, Left, Right } from 'native-base';
import { View, Text, Image } from 'react-native';
class CardTransactionList extends Component {

    render() {
        // const { handleCancel, handleAccept, handleAccept1, seconds, index } = this.props;
        // const { id, ref, date, depAddress, arrAddress, criteria, isActive, timer, createdAt } = this.props.items;
        // const { container, container1, txtdate, txtText, txtText1, txtRef, row,
        //    txtButton1, txtButton2, round } = styles;

        //    const date0 = new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris' });
        //    const newDate = moment(date0).format('YYYY-MM-DD hh:mm:ss')
        //    const newDate1 = moment(createdAt).format('YYYY-MM-DD hh:mm:ss')

        //    const startDate = moment(newDate1);
        //    const timeEnd = moment(newDate);
        //    const diff = timeEnd.diff(startDate, 'seconds');

        return (
            <Content>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{ uri: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png' }} />
                            <Body>
                                <Text>Title</Text>
                                <Text note>Description</Text>
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
