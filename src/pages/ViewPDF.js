import React, { Component } from 'react';
import { Platform, StyleSheet, Image, Dimensions, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Button, Body, Icon, Left, Right } from 'native-base';
import ImageZoom from 'react-native-image-pan-zoom';

import { APPID, BASE_URL } from '../helper/Constant';
class ViewPDF extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    navigate() {
        Actions.pop();
    }
    render() {
        let URL = this.props.PDF;
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
                        <Title>{this.props.NewsCity}</Title>
                    </Body>
                    <Right />
                </Header>

                <View style={styles.container}>
                    <ImageZoom cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height}
                        imageWidth={200}
                        imageHeight={200}>
                        <Image style={{ width: 200, height: 200 }}
                            source={{ uri: URL }} />
                    </ImageZoom>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
    }
});

export default ViewPDF;