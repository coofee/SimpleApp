import React, { Component } from 'react'

import { TabNavigator, NavigationActions } from 'react-navigation';
import Contacts from './Concats';
import Recents from './Recents';

const TabNav = TabNavigator({
    recents: {
        screen: Recents,
        navigationOptions: {
            title: '最近聊天'
        }
    },
    contacts: {
        screen: Contacts,
        navigationOptions: {
            title: '好友列表'
        }
    }
}, {
    // top: 顶部Bar;
    // bottom: 底部Bar;
    tabBarPosition: 'top'
});



export default class Tab extends Component {

    componentWillMount() {

    }

    render() {
        // const { user } = this.props.navigation.state.params;
        // console.log('Tab.render', user)

        return (
            // for nesting navigator;
            <TabNav navigation={this.props.navigation}/>
        );
    }
}

// for nesting navigator;
Tab.router = TabNav.router;