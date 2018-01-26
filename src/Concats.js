import React, { Component } from 'react'

import { View, Text, StyleSheet, FlatList } from 'react-native'
import { observer } from 'mobx-react';

import { rootStore } from './Store'
import { NavigationActions } from 'react-navigation';

@observer
export default class Contacts extends Component {
    render() {
        const userStore = rootStore.userStore;
        console.log('Contacts.userStore=', userStore);

        const {navigation} = this.props
        console.log('Contacts.navigation=', navigation);

        return (
            <View>
                <Text>All Contacts List {userStore.dataSource.length}</Text>
                <ContactsView store={userStore} navigation={navigation}/>
            </View>
        );
    }
}


@observer
class ContactsView extends Component {

    _renderItem = ({ item, index }) => {
        return <ContactItem user={item} navigation={this.props.navigation}/>
    }

    _keyExtractor = (item, index) => {
        // TODO provide key; do not use index;
        return index;
    }

    render() {
        const { store } = this.props;
        return (
            <FlatList
                data={store.dataSource}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                enableEmptySections={false}
                onEndReached={() => { console.log('reach end.') }}
                initialNumToRender={2}
                onEndReachedThreshold={0.3}
                stickySectionHeadersEnabled={false}
            />
        );
    }
}


@observer
class ContactItem extends Component {

    addNewMessage = (user) => {
        // const { user } = this.props;
        console.log('ContactItem.addNewMessage', user);
        rootStore.recentsStore.add(user, `ADD: ${user.name} 发送了一条消息`)

        // why cannot navigate screen?
        // NavigationActions.navigate({routeName: 'recents'})

        const { navigate } = this.props.navigation;
        navigate("recents");
    }

    render() {
        const { user } = this.props;
        return (
            <Text style={styles.user} onPress={() => this.addNewMessage(user)}> {user.name}</Text>
        );
    }
}

const styles = StyleSheet.create({
    user: {
        fontSize: 24,
        textAlign: 'center',
        backgroundColor: '#333333',
        marginBottom: 10,
        color: '#ffffff'
    }
});