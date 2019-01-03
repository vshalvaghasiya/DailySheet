import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    Container, Header, Title, Button, Body, Icon, Left, Right,
    Form, Item, Input, Text, DatePicker, Textarea
} from 'native-base';
import ImageZoom from 'react-native-image-pan-zoom';

import { ALL_FIELDS_REQURED, BACKGROUND_COLOR, TEXT_COLOR, BORDER_COLOR, ERROR_COLOR } from '../helper/Constant';
class CreateTransaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            loading: false,
            Title: '',
            inputTitleError: false,
            Price: '',
            inputPriceError: false,
            StoreName: '',
            inputStoreNameError: false,
            chosenDate: new Date(),
            inputDateError: false,
            Description: '',

        };
        this.setDate = this.setDate.bind(this);
    }

    componentDidMount() {
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    navigate() {
        Actions.pop();
    }

    spinerRender() {
        if (this.state.loading) {
            return <Spinner size="large" />;
        }
        return (
            <TouchableOpacity onPress={this.navigate.bind(this)}>
                <View style={styles.VIEW_Button}>
                    <Text style={styles.TXT_Button} > ENREGISTRER </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const { VIEW_Container, INPUT_Container, TXT_Message} = styles;
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
                        <Title></Title>
                    </Body>
                    <Right />
                </Header>

                <ScrollView>
                    <View style={VIEW_Container}>
                        <Form style={INPUT_Container}>
                            <Item
                                floatingLabel
                                error={this.state.inputTitleError}
                                style={{ flexDirection: 'row-reverse' }} >
                                <Input
                                    placeholder='Title'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    returnKeyType='next'
                                    onSubmitEditing={() => { this.Price._root.focus(); }}
                                    onChangeText={(value) => this.setState({ Title: value })}
                                    blurOnSubmit={false} />
                            </Item>
                            <View style={{ height: 20 }} />
                            <Item
                                floatingLabel
                                error={this.state.inputPriceError}
                                style={{ flexDirection: 'row-reverse' }} >
                                <Input
                                    placeholder='Price'
                                    autoCapitalize='none'
                                    returnKeyType='next'
                                    keyboardType={"numeric"}
                                    getRef={(input) => { this.Price = input; }}
                                    onSubmitEditing={() => { this.StoreName._root.focus(); }}
                                    onChangeText={(value) => this.setState({ Price: value })}
                                    blurOnSubmit={false} />
                            </Item>
                            <View style={{ height: 20 }} />
                            <Item
                                floatingLabel
                                error={this.state.inputStoreNameError}
                                style={{ flexDirection: 'row-reverse' }} >
                                <Input
                                    placeholder='StoreName'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    returnKeyType='next'
                                    getRef={(input) => { this.StoreName = input; }}
                                    onSubmitEditing={() => { this.firstname._root.focus(); }}
                                    onChangeText={(value) => this.setState({ StoreName: value })}
                                    blurOnSubmit={false} />
                            </Item>
                            <View style={{ height: 40 }} />

                            <DatePicker
                                defaultDate={new Date()}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText='Select date'
                                textStyle={{ color: "#232323" }}
                                onChangeText={this.state.chosenDate.toString().substr(4, 12)}
                                placeHolderTextStyle={{ color: "#232323" }}
                                onDateChange={this.setDate}
                            />
                            <View
                                style={this.state.inputDateError ? { width: '100%', borderBottomWidth: 1, borderBottomColor: ERROR_COLOR } : { width: '100%', borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}></View>

                            <View style={{ height: 40 }} />
                            <Textarea rowSpan={5} bordered placeholder="Description"
                                onChangeText={(value) => this.setState({ Description: value })} />

                        </Form>

                        <View style={{ height: 20 }} />
                        <Text style={TXT_Message}>
                            {this.state.message}
                        </Text>
                        <View style={{ height: 20 }} />
                        {this.spinerRender()}
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    VIEW_Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 40,
        paddingRight: 30,
        paddingBottom: 20,
        paddingTop: 20,
    },
    TXT_Message: {
        color: ERROR_COLOR,
        fontSize: 16,
        marginTop: 10,
    },
    INPUT_Container: {
        padding: 0,
        alignSelf: 'stretch',
    },
    VIEW_Button: {
        borderRadius: 8,
        height: 40,
        justifyContent: 'center',
        borderColor: BORDER_COLOR,
        borderWidth: 0.5,
    },
    TXT_Button: {
        alignSelf: 'center',
        color: TEXT_COLOR,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 20,
    },
});

export default CreateTransaction;