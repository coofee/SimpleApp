import React, { Component } from 'react'

import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'

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

    render() {
        let testView = this.test();

        return (
            // 横向分页 pagingEnabled={true} horizontal
            <ScrollView>
                <View>
                    <Text> 主页 </Text>
                    <Button title="聊天" onPress={this.navigateChat} />

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