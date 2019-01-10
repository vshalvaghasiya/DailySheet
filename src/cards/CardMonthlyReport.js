import React, { Component } from 'react';
import { Content, Card, CardItem, Body, Icon } from 'native-base';
import { View, Text, TouchableOpacity } from 'react-native';
class CardMonthlyReport extends Component {

    render() {
        return (
            <Content>
                <Card>
                <TouchableOpacity onPress={() => this.props.viewRecord(this.props.items.id)}>
                    <CardItem>
                        <View style={{ width: 20 }} />
                            <Body>
                                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{this.props.items.get('Title')}</Text>
                            </Body>
                            <Body>
                            </Body>
                            <Icon active
                                type='MaterialCommunityIcons'
                                name="currency-inr"
                            />
                            <Text note style={{ fontWeight: 'bold', fontSize: 20 }}>{this.props.items.get('Total')}</Text>
                    </CardItem>
                    </TouchableOpacity>
                </Card>
            </Content>
        );
    }
}

export default CardMonthlyReport;
