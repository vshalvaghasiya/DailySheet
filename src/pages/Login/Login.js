
import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, ScrollView, View, Image, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    Container, Form, Item, Input, Text,
} from 'native-base';
import Parse from 'parse/react-native';

import { AppIcon, TEXT_COLOR, BORDER_COLOR, ERROR_COLOR, IS_LOGIN } from '../../helper/Constant';
import { Spinner } from '../../common/Spinner';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            loading: false,
            username: '',
            password: ''
        };
    }

    loginApiCall() {
        this.setState({ loading: true });
        Parse.User.logIn(this.state.username, this.state.password).then((user) => {
            this.setState({ loading: false });
            AsyncStorage.setItem(IS_LOGIN, JSON.stringify(true));
            AsyncStorage.setItem('userID', user.id);
            Actions.dashboard();
        }).catch(error => {
            this.setState({ loading: false });
            alert(error.message);
        })
    }

    spinerRender() {
        if (this.state.loading) {
            return <Spinner size="large" />;
        }
        return (
            <TouchableOpacity onPress={this.loginApiCall.bind(this)}>
                <View style={styles.VIEW_Button}>
                    <Text style={styles.TXT_Button} > Login </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const { VIEW_Container, INPUT_Container, TXT_Message, VIEW_ROW } = styles;
        return (
            <Container>
                <ScrollView>
                    <View style={VIEW_Container}>
                        <Image source={AppIcon} style={{ height: 200, width: 200 }} />
                        <Form style={INPUT_Container}>
                            <Item
                                floatingLabel
                                error={this.state.inputTitleError}
                                style={{ flexDirection: 'row-reverse' }} >
                                <Input
                                    placeholder='Username'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    returnKeyType='next'
                                    onSubmitEditing={() => { this.password._root.focus(); }}
                                    onChangeText={(value) => this.setState({ username: value })}
                                    blurOnSubmit={false} />
                            </Item>
                            <View style={{ height: 20 }} />
                            <Item
                                floatingLabel
                                error={this.state.inputMoneyError}
                                style={{ flexDirection: 'row-reverse' }} >
                                <Input
                                    placeholder='Password'
                                    autoCapitalize='none'
                                    returnKeyType='done'
                                    getRef={(input) => { this.password = input; }}
                                    onChangeText={(value) => this.setState({ password: value })}
                                    blurOnSubmit={true}
                                    secureTextEntry={true}
                                />
                            </Item>
                        </Form>
                        <View style={{ height: 40 }} />
                        <Text style={TXT_Message}>
                            {this.state.message}
                        </Text>
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

export default Login;