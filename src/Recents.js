import React, { Component } from 'react'
import { View, Text, Button, FlatList, StyleSheet, Platform, RefreshControl, ToastAndroid, processColor } from 'react-native'

import { action, computed, observable, runInAction, autorun } from 'mobx';
import { observer } from 'mobx-react/native';

import { rootStore } from './Store'
import colors from './utils/colors';

@observer
export default class Recents extends Component {

    constructor(props) {
        super(props)

        this.dispose = autorun(() => {
            let messageLen = rootStore.recentsStore.messageList.length;
            console.log('autorun, messageLen=' + messageLen);
            if (messageLen > 10) {
                this.dispose();
            }
        })
    }


    componentWillUnmount() {
        this.dispose();
    }

    render() {
        const { user } = this.props.navigation.state.params;
        // console.log('Tab.Recents.render', user)
        const recentsStore = rootStore.recentsStore;


        return (
            <View >
                <Text>Chat Recents List of {user.name} {recentsStore.dataSource.length}</Text>
                <RecentMessageListView style={{ alignSelf: 'stretch' }} store={recentsStore} />
            </View>
        );
    }

    // changeBottom = () => {
    //     const { setParams } = this.props.navigation;
    //     let bottomBar = {
    //         tabBarPosition: 'bottom'
    //     };
    //     setParams(bottomBar)

    //     console.log('Tab.changeBottom', bottomBar)
    // }
}


@observer
class RecentMessageListView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            refreshing: false
        };

        this.stickyHeaderIndices = [1, 5]
    }

    componentWillUnmount() {
        this.timeoutHandler && clearTimeout(this.timeoutHandler)
    }

    isStickyHeader = (index) => {
        // if (hasHeader) { index++};

        return this.stickyHeaderIndices.indexOf(index) > -1;
    }

    _renderMessage(item, index) {
        return <RecentMessageItem user={item.user} message={this.isStickyHeader(index) ? 'STICKY HEADER' + item.message : item.message} index={index} />;
    }

    _renderMultilineText = (item, index) => {
        let styleYahei = { fontFamily: 'MicroSoft YaHei' };
        let defaultStyle = Platform.select({ 'android': { fontFamily: 'System' } });
        let style = { includeFontPadding: false, fontSize: 15, color: '#666666', marginVertical: 10, marginHorizontal: 10 };
        let stickyHeader = this.isStickyHeader(index) ? 'STICKY HEADER' : '';

        return (
            <View style={{ backgroundColor: colors.mintcream}}>
                <Text index={index} style={[style, styleYahei]}>{stickyHeader} MicroSoft YaHei: 在pop之前用DeviceEventEmitter发出事件，首页监听事件。或者在redux框架下面也可以解决这种跨界面交互的问题。
                componentWillMount，componentDidMount只有在component被创建的时候才会调用，返回时component是已存在的，push的时候没有被销毁，不是新创建出来的。</Text>

                <Text index={index} style={[style, defaultStyle]}>{stickyHeader} System: 在pop之前用DeviceEventEmitter发出事件，首页监听事件。或者在redux框架下面也可以解决这种跨界面交互的问题。
                componentWillMount，componentDidMount只有在component被创建的时候才会调用，返回时component是已存在的，push的时候没有被销毁，不是新创建出来的。</Text>
            </View>
        )
    }

    renderItem = ({ item, index }) => {
        console.log('renderItem; item=' + item + ', index=' + index);

        if (index % 5 === 0) {
            return this._renderMultilineText(item, index);
        } else {
            return this._renderMessage(item, index);
        }
    }

    renderHeader = () => {
        let stickyHeader = this.isStickyHeader(0) ? 'Sticky Header' : 'Header';

        return (
            <View style={{ height: 100, backgroundColor: colors.pink, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30 }}>{stickyHeader}</Text>
            </View>
        );
    }

    renderFooter = () => {
        return (
            <View style={{ height: 100, backgroundColor: colors.fuchsia, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30 }}>Footer</Text>
            </View>
        );
    }

    renderEmpty = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.cadetblue }}>
                <Text style={{ textAlign: 'center' }}>Empty</Text>
            </View>
        );
    }

    onEndReached = () => {
        console.log('reach end.')
        ToastAndroid.show('onEndReached...', ToastAndroid.SHORT)
    }

    onRefresh = () => {
        console.log('onRefresh.')
        ToastAndroid.show('onRefresh...', ToastAndroid.SHORT)

        this.setState({ refreshing: true })

        this.timeoutHandler = setTimeout(() => {
            this.setState({ refreshing: false })
            ToastAndroid.show('onRefresh.end', ToastAndroid.SHORT)
        }, 5000);
    }

    refreshControl = () => {
        return (
            <RefreshControl onRefresh={this.onRefresh} refreshing={this.state.refreshing} title="下拉刷新"></RefreshControl>
        );
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
                renderItem={this.renderItem}
                enableEmptySections={false}
                keyExtractor={this._keyExtractor}
                onEndReached={this.onEndReached}
                initialNumToRender={2}
                refreshControl={this.refreshControl()}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
                ListEmptyComponent={this.renderEmpty}
                ItemSeparatorComponent={() => (<View style={{ height: 10, backgroundColor: 'blanchedalmond' }} />)}
                onEndReachedThreshold={0.3}
                stickyHeaderIndices={this.stickyHeaderIndices}
                stickySectionHeadersEnabled={true}
            />
        );
    }
}

@observer
class RecentMessageItem extends Component {

    constructor(props) {
        super(props)

        this.messageStyles = [
            {
                itemStyle: styles.itemRow,
                msgStyle: styles.messageDefault,
                msg: "flexDirection: 'row', messageDefault"
            },
            {
                itemStyle: styles.itemRowReverse,
                msgStyle: styles.messageDefault,
                msg: "flexDirection: 'row-reverse', messageDefault"
            },
            {
                itemStyle: styles.itemRow,
                msgStyle: styles.messageStreth,
                msg: "flexDirection: 'row', alignSelf: 'stretch'"
            },
            {
                itemStyle: styles.itemRowReverse,
                msgStyle: styles.messageStreth,
                msg: "flexDirection: 'row', alignSelf: 'stretch'"
            },
            {
                itemStyle: styles.itemRow,
                msgStyle: styles.messageBasis,
                msg: "flexDirection: 'row', flex: 1, flexBasis: 0"
            },
            {
                itemStyle: styles.itemRowReverse,
                msgStyle: styles.messageBasis,
                msg: "flexDirection: 'row-reverse', flex: 1, flexBasis: 0"
            }
        ];
    }



    render() {
        const { user, message, index } = this.props;
        let messageStyle = this.messageStyles[index % this.messageStyles.length]
        return (
            <View style={[messageStyle.itemStyle]}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={[messageStyle.msgStyle]}>: {messageStyle.msg} '; ' {message}</Text>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    itemRow: {
        flex: 1,
        flexDirection: 'row', // row-reverse
        backgroundColor: 'powderblue',
        paddingBottom: 10,
        padding: 5,
        alignItems: 'baseline'
    },
    itemRowReverse: {
        flex: 1,
        flexDirection: 'row-reverse', // row-reverse
        backgroundColor: 'powderblue',
        paddingBottom: 10,
        padding: 5,
        alignItems: 'baseline'
    },
    name: {
        fontSize: 20,
        color: '#999999'
    },

    messageDefault: {
        fontSize: 14,
        color: '#333333'
    },

    messageStreth: {
        alignSelf: 'stretch',
        fontSize: 14,
        color: '#333333'
    },

    messageBasis: {
        // flex, flexBasis 防止message把位置全部占满，name不显示.
        flex: 1,
        flexBasis: 0,

        fontSize: 14,
        color: '#333333'
    }
});