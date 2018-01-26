import React, { Component } from 'react'
import { View, Text, Button, TouchableWithoutFeedback, Keyboard, TextInput, StyleSheet, TouchableHighlight, PixelRatio, Dimensions } from 'react-native'

export default class Chat extends Component {

    constructor(props) {
        super(props)
        this.state = { input: "", isAbsolute: false };
    }

    onChangeText = (text) => {
        this.setState({ input: text })
    }

    onFocus = () => {
        let messageInputRef = this.refs.messageInput;
        console.log('invoke onFocus(); messageInput.isFocused()=' + messageInputRef.isFocused())
    }

    changePosition = () => {
        this.setState((prev, props) => {
            return { isAbsolute: !prev.isAbsolute }
        });
    }

    render() {
        const { params } = this.props.navigation.state;
        const horizontalAverageView = this.renderHorizontalAverage();

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
                <View style={{ flex: 1 }}>
                    <Text> Chat with {params.user.name}</Text>
                    <Button title="Tab列表" onPress={this.navigateTab} />

                    {horizontalAverageView}

                    {this.renderInput()}

                    <TouchableHighlight onPress={this.changePosition}>
                        <Text style={{ height: 50, textAlign: 'center', fontSize: 21 }}> {this.state.isAbsolute ? 'position: "absolute"' : 'NOT absolute'} </Text>
                    </TouchableHighlight>

                    {this.renderMultilineText()}

                    {this.renderBottomBar()}

                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderMultilineText = () => {
        return (<Text> 在pop之前用DeviceEventEmitter发出事件，首页监听事件。或者在redux框架下面也可以解决这种跨界面交互的问题。
            componentWillMount，componentDidMount只有在component被创建的时候才会调用，返回时component是已存在的，push的时候没有被销毁，不是新创建出来的。</Text>);
    }

    renderBottomBar = () => {
        return (
            <View style={styles.bottomBar}>
                <Text> bottom bar</Text>
                {this.renderHorizontalAverage2()}
            </View>
        );
    }


    renderInput = () => {
        return (
            <TextInput
                ref="messageInput"
                style={styles.input}
                value={this.state.input}
                placeholder="请输入消息"
                underlineColorAndroid="transparent"
                onChangeText={this.onChangeText}
                multiline={false}
                numberOfLines={1}
                maxLength={8}
                placeholderTextColor="#999999"
                selectionColor="#999999"
                onFocus={this.onFocus}
                tintColor="#999999"
                returnKeyType="send" />
        );
    }

    renderHorizontalAverage = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                {
                    [1, 2, 3].map((item) => {
                        return (
                            <View key={item} style={{ flex: 1, height: 50, justifyContent: 'center', backgroundColor: '#aaaaaa' }}>
                                <Text style={{ textAlign: 'center', fontSize: 20, backgroundColor: 'orange' }}> Cell {item} </Text>
                            </View>
                        );
                    })
                }
            </View>
        );
    }

    renderHorizontalAverage2 = () => {
        return (
            <View style={{ flexDirection: 'row', height: 50, backgroundColor: 'steelblue', alignItems: 'center', justifyContent: 'center' }}>
                {
                    [1, 2, 3].map((item) => {
                        return (
                            <Text key={item} style={{ flex: 1, textAlign: 'center', fontSize: 20, backgroundColor: 'orange' }}> Cell {item} </Text>
                        );
                    })
                }
            </View>
        );
    }

    navigateTab = () => {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        navigate('tab', {
            user: { ...params.user }
        })
    }
}

const styles = StyleSheet.create({
    input: {
        fontSize: 24,
        textAlign: 'left',
        justifyContent: 'center',
        color: 'black',
        textAlign: 'center',
    },
    bottomBar: {
        position: "absolute",
        bottom: 0,
        width: Dimensions.get('window').width,
        // height: 50,
        backgroundColor: 'powderblue'
    },
});