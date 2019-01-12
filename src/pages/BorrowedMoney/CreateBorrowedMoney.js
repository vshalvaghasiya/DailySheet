
import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, ScrollView, View, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    Container, Header, Title, Button, Body, Icon, Left, Right,
    Form, Item, Input, Text, DatePicker, Textarea,
} from 'native-base';
import Parse from 'parse/react-native';

import { ALL_FIELDS_REQURED, TEXT_COLOR, BORDER_COLOR, ERROR_COLOR } from '../../helper/Constant';
import { Spinner } from '../../common/Spinner';

class CreateBorrowedMoney extends Component {

    constructor(props) {
        super(props);
        this.state = {
            UserID: '',
            message: '',
            loading: false,
            Title: '',
            inputTitleError: false,
            Money: '',
            inputMoneyError: false,
            chosenDate: '',
            inputDateError: false,
            Description: '',
            inputDescriptionError: false,
            ImageSource: null,
            image: null
        };
        this.setDate = this.setDate.bind(this);
        this.validation = this.validation.bind(this);
    }

    componentWillMount() {
        AsyncStorage.getItem('userID').then((value) => {
            this.setState({ UserID: value });
        }).done();
      }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    navigate() {
        Actions.pop();
    }

    transcationButtonClick() {
        this.validation();
    }

    validation() {
        if (this.state.Title !== '' && this.state.Money && this.state.Description !== '') {
            this.setState({
                inputTitleError: false,
                inputMoneyError: false,
                inputDateError: false,
                inputDescriptionError: false,
                message: ''
            });
            this.addTransaction();
        } else {
            if (this.state.Title === '') {
                this.setState({
                    inputTitleError: true,
                });
            } else {
                this.setState({
                    inputTitleError: false,
                });
            }
            if (this.state.Money === '') {
                this.setState({
                    inputMoneyError: true,
                });
            } else {
                this.setState({
                    inputMoneyError: false,
                });
            }
            if (this.state.chosenDate === '') {
                this.setState({
                    inputDateError: true,
                });
            } else {
                this.setState({
                    inputDateError: false,
                });
            }
            if (this.state.Description === '') {
                this.setState({
                    inputDescriptionError: true,
                });
            } else {
                this.setState({
                    inputDescriptionError: false,
                });
            }
            this.setState({
                message: ALL_FIELDS_REQURED
            });
        }
    }

    addTransaction() {
        this.setState({ loading: true });
        const object = Parse.Object.extend("BorrowedMoney");
        const objects = new object();

        objects.set("UserID", this.state.UserID);
        objects.set("Title", this.state.Title);
        objects.set("Money", this.state.Money);
        objects.set("Date", this.state.chosenDate.toString().substr(4, 12))
        objects.set("Description", this.state.Description)
        objects.save()
            .then((result) => {
                this.setState({ loading: false });
                Actions.BorrowedMoney();
            }, (error) => {
                this.setState({ loading: false });
                alert('Failed to create new object, with error code: ' + error.message);
            });
    }

    spinerRender() {
        if (this.state.loading) {
            return <Spinner size="large" />;
        }
        return (
            <TouchableOpacity onPress={this.transcationButtonClick.bind(this)}>
                <View style={styles.VIEW_Button}>
                    <Text style={styles.TXT_Button} > Create Money </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const { VIEW_Container, INPUT_Container, TXT_Message, VIEW_ROW } = styles;
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
                        <Title>Borrowed Money</Title>
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
                                    onSubmitEditing={() => { this.Money._root.focus(); }}
                                    onChangeText={(value) => this.setState({ Title: value })}
                                    blurOnSubmit={false} />
                            </Item>
                            <View style={{ height: 20 }} />
                            <Item
                                floatingLabel
                                error={this.state.inputMoneyError}
                                style={{ flexDirection: 'row-reverse' }} >
                                <Input
                                    placeholder='Money'
                                    autoCapitalize='none'
                                    returnKeyType='next'
                                    keyboardType={"numeric"}
                                    getRef={(input) => { this.Money = input; }}
                                    onSubmitEditing={() => { this.StoreName._root.focus(); }}
                                    onChangeText={(value) => this.setState({ Money: value })}
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

                            <View
                                style={this.state.inputDescriptionError ? { width: '100%', borderBottomWidth: 1, borderBottomColor: ERROR_COLOR } : { width: '100%', borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                            </View>

                        </Form>

                        <View style={{ height: 40 }} />

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
    VIEW_ROW: {
        flexDirection: 'row'
    },
});

export default CreateBorrowedMoney;