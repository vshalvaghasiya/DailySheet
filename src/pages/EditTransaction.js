import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    Container, Header, Title, Button, Body, Icon, Left, Right,
    Form, Item, Input, Text, DatePicker, Textarea, ActionSheet
} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import Parse from 'parse/react-native';

import { TEXT_COLOR, BORDER_COLOR, ERROR_COLOR } from '../helper/Constant';
import { Spinner } from '../common/Spinner';

const Options = [
    { text: 'Camera' },
    { text: 'Galary' },
    { text: 'Cancel' }
];
class EditTransaction extends Component {

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
            chosenDate: '',
            selectedMonth: '',
            inputDateError: false,
            Description: '',
            inputDescriptionError: false,
            ImageSource: null,
            image: null
        };
        this.setDate = this.setDate.bind(this);
    }

    componentDidMount() {
        let data = this.props.data;
        var date = new Date(data.get('BillDate'));
        this.setState({
            Title: data.get('Title'),
            Price: data.get('Price'),
            StoreName: data.get('StoreName'),
            Description: data.get('Description'),
            chosenDate: data.get('BillDate'),
            image: data.get('BILL'),
            selectedMonth: date.getMonth() + 1 
        });
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate.toString().substr(4, 12), selectedMonth: newDate.getMonth() + 1 });
    }

    navigate() {
        Actions.pop();
    }

    transcationButtonClick() {
        this.updateTransaction();
    }

    updateTransaction() {
        this.setState({ loading: true });
        let data = this.props.data;
        const MyObject = Parse.Object.extend('DailyReport');
        const query = new Parse.Query(MyObject);
        query.get(data.id).then((object) => {
            object.set("UserID", '1');
            object.set("Title", this.state.Title);
            object.set("Price", this.state.Price);
            object.set("StoreName", this.state.StoreName)
            object.set("BillDate", this.state.chosenDate.toString())
            object.set("Description", this.state.Description)
            object.save().then((response) => {
                const obj = Parse.Object.extend('Monthly');
                const query1 = new Parse.Query(obj);
                query1.equalTo("ID", this.state.selectedMonth.toString());
                query1.find().then((results) => {
                    let total = Number(results[0].get('Total')) + Number(this.state.Price)
                    const MyObject = Parse.Object.extend('Monthly');
                    const query2 = new Parse.Query(MyObject);
                    query2.get(results[0].id).then((object) => {
                        object.set("Total", total.toString());
                        object.save().then((response) => {
                            this.setState({ loading: false });
                            Actions.dashboard();
                        }, (error) => {
                            this.setState({ loading: false });
                            Alert.alert('Failed!' + error.message);
                        });
                    });
                }, (error) => {
                    this.setState({ loading: false });
                    Alert.alert('Failed!' + error.message);
                });
            }, (error) => {
                this.setState({ loading: false });
                alert('Failed!' + error.message);
            });
        });
    }

    spinerRender() {
        if (this.state.loading) {
            return <Spinner size="large" />;
        }
        return (
            <TouchableOpacity onPress={this.transcationButtonClick.bind(this)}>
                <View style={styles.VIEW_Button}>
                    <Text style={styles.TXT_Button} > UPDATE TRANSCATION </Text>
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
                        <Title>Update Transcation</Title>
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
                                    value={this.state.Title}
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
                                    value={this.state.Price}
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
                                    value={this.state.StoreName}
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
                                placeHolderText={this.state.chosenDate.toString().substr(4, 12)}
                                textStyle={{ color: "#232323" }}
                                onChangeText={this.state.chosenDate.toString().substr(4, 12)}
                                placeHolderTextStyle={{ color: "#232323" }}
                                onDateChange={this.setDate}
                            />
                            <View
                                style={this.state.inputDateError ? { width: '100%', borderBottomWidth: 1, borderBottomColor: ERROR_COLOR } : { width: '100%', borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}></View>

                            <View style={{ height: 40 }} />
                            <Textarea rowSpan={5} bordered placeholder="Description"
                                onChangeText={(value) => this.setState({ Description: value })}
                                value={this.state.Description}
                            />

                            <View
                                style={this.state.inputDescriptionError ? { width: '100%', borderBottomWidth: 1, borderBottomColor: ERROR_COLOR } : { width: '100%', borderBottomWidth: 1, borderBottomColor: 'lightgrey' }}>
                            </View>
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
    VIEW_ROW: {
        flexDirection: 'row'
    },
});

export default EditTransaction;