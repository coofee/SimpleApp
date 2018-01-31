import React, { Component } from 'react'

import { View, Text, Button, StyleSheet, ScrollView, Image, Platform } from 'react-native'

import { NavigationActions } from 'react-navigation'

export default class Home extends Component {
    // set StackNavigator options; 
    // static navigationOptions = {
    //     title: 'Home'
    // }

    constructor(props) {
        super(props)

        // this.navigateChat = () => {
        //     const { navigate } = this.props.navigation;
        //     navigate('chat')
        // };
    }

    renderImages() {
        const imageWidth = 40;
        const borderWidth = 2;


        const views = [];

        let nested = [1, 2, 3].map((item, index) => {

            return (
                // 使用原生image的实现圆形带边框的图片时，会出现毛边，所以我们这里使用嵌套view的方式实现;
                <View style={{
                    zIndex: 50 - index,
                    width: imageWidth + borderWidth * 2,
                    height: imageWidth + borderWidth * 2,
                    ...Platform.select({ android: { borderRadius: imageWidth + borderWidth * 2 }, ios: { borderRadius: imageWidth / 2 + borderWidth } }),
                    marginLeft: index === 0 ? 0 :  -7,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image
                        key={index}
                        source={require('./images/pic.png')}
                        // source={{uri: 'http://www.baidu.com/img/bd_logo1.png'}}
                        style={{
                            width: imageWidth,
                            height: imageWidth,
                            ...Platform.select({ android: { borderRadius: imageWidth }, ios: { borderRadius: imageWidth / 2 } }),
                        }}
                    />
                </View>
            );
        })

        views.push(nested)


        let origins = [1, 2, 3].map((item, index) => {
            return (
                <Image
                    key={index}
                    source={require('./images/pic.png')}
                    // source={{uri: 'http://www.baidu.com/img/bd_logo1.png'}}
                    style={{
                        zIndex: 50 - index,
                        width: imageWidth,
                        height: imageWidth,
                        marginLeft: index === 0 ? 0 : -7,
                        borderWidth: 3,
                        borderColor: '#fff',
                        ...Platform.select({ android: { borderRadius: imageWidth }, ios: { borderRadius: imageWidth / 2 } }),
                    }}
                />
            );
        });

        views.push(origins)
        return views;
    }

    render() {
        let testView = this.test();

        return (
            // 横向分页 pagingEnabled={true} horizontal
            <ScrollView>
                <View>
                    <Text> 主页 </Text>
                    <Button title="聊天" onPress={this.navigateChat} />

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 400, height: 50 }}>
                        {this.renderImages()}
                    </View>

                    {testView}
                </View>
            </ScrollView>
        );
    }

    navigateChat = () => {
        console.log("Home.props=", this.props);

        // use function navigate for navigate new page;
        const { navigate } = this.props.navigation;
        navigate('chat', {
            user: {
                name: '张三', age: 20
            }
        })


        // demo dispatch action;
        // let action = NavigationActions.navigate({
        //     routeName: 'recents',
        //     params: {
        //         user: {
        //             name: '张三', age: 20
        //         }
        //     }
        // })
        // this.props.navigation.dispatch(action)
    };

    test() {
        let testData = [];
        for (let i = 0; i < 100; i++) {
            testData.push(i)
        }

        return (

            <View style={styles.test}>
                {
                    testData.map(item => {
                        return (
                            // nested dumpItem for center item;
                            <View style={styles.dumpItem} key={item}>
                                <Text style={styles.item}> {item} </Text>
                            </View>
                        );
                    })
                }
            </View>

        );
    }
}


const styles = StyleSheet.create({
    test: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        // justifyContent: 'flex-start',
        // alignItems: 'center'
        alignItems: 'flex-start',
        backgroundColor: 'orange',
    },
    dumpItem: {
        // 嵌套一层，用于居中子元素;
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'powderblue',
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'steelblue',
        textAlign: 'center'
    }
});