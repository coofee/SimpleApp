import React, { Component } from 'react'
import { View, Text, Button, FlatList, StyleSheet, Platform, RefreshControl, ToastAndroid, processColor } from 'react-native'

import { action, computed, observable, runInAction, autorun } from 'mobx';
import { observer } from 'mobx-react/native';

import { rootStore } from './Store'
import colors from './utils/colors';
import FoldView from './component/foldview'
import views from './utils/views';

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
            refreshing: false,
            fold: {
                expand: true,
                top: -1,
            }
        };

        this.foldViewIndex = 2;
        this.stickyHeaderIndices = [0, this.foldViewIndex]
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
            <View style={{ backgroundColor: colors.mintcream }}>
                <Text index={index} style={[style, styleYahei]}>{stickyHeader} MicroSoft YaHei: 在pop之前用DeviceEventEmitter发出事件，首页监听事件。或者在redux框架下面也可以解决这种跨界面交互的问题。
                componentWillMount，componentDidMount只有在component被创建的时候才会调用，返回时component是已存在的，push的时候没有被销毁，不是新创建出来的。</Text>

                <Text index={index} style={[style, defaultStyle]}>{stickyHeader} System: 在pop之前用DeviceEventEmitter发出事件，首页监听事件。或者在redux框架下面也可以解决这种跨界面交互的问题。
                componentWillMount，componentDidMount只有在component被创建的时候才会调用，返回时component是已存在的，push的时候没有被销毁，不是新创建出来的。</Text>
            </View>
        )
    }

    _renderFoldView = (item, index) => {
        const handleView = () => (<Text style={{ backgroundColor: colors.lime, height: 30, textAlign: 'center' }} >Handle View</Text>)
        const contentView = () => (<Text style={{ backgroundColor: colors.bisque, height: 50, textAlign: 'center' }} >Content View</Text>)

        const foldHandle = (expand) => {
            if (expand) {
                console.log('onExpand...')
            } else {
                console.log('onClose...')
            }

            this.setState(prevState => {
                prevState.fold.expand = expand;
                console.log('foldHandle: expand=' + expand)

                return prevState;
            });
        };

        return (
            <FoldView
                ref={(ref) => { this.foldRef = ref }}
                onLayout={(e) => { console.log('FoldView.onLayout()=' + JSON.stringify(e.nativeEvent.layout)) }}
                style={{ backgroundColor: colors.tan, justifyContent: 'center', alignItems: 'center' }}
                HandleView={handleView}
                ContentView={contentView}
                expand={this.state.fold.expand}
                onExpand={(e) => { foldHandle(true) }}
                onClose={(e) => { foldHandle(false) }} />
        );
    }

    renderItem = ({ item, index }) => {
        console.log('renderItem; item=' + item + ', index=' + index);
        if (index + 1 == this.foldViewIndex) {
            // 因为有一个header;
            return this._renderFoldView(item, index);
        }

        if (index % 5 === 0) {
            return this._renderMultilineText(item, index);
        } else {
            return this._renderMessage(item, index);
        }
    }

    renderHeader = () => {
        let stickyHeader = this.isStickyHeader(0) ? 'Sticky Header' : 'Header';

        return (
            <View ref={(ref) => { this.headerRef = ref }} style={{ height: 100, backgroundColor: colors.pink, alignItems: 'center', justifyContent: 'center' }}>
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

    _onScroll = (e) => {
        console.log('onScroll; contentOffset=' + JSON.stringify(e.nativeEvent.contentOffset))
        // console.log('onScorll; foldRef=' + this.foldRef);
        // console.dir(this.foldRef)
        // console.log('onScroll; this.refs.headerRef=' + this.headerRef)
        // console.dir(this.headerRef)

        // views.layout(this.listRef).then(data => console.log('listRef.location=' + JSON.stringify(data)))
        // views.layout(this.headerRef).then(data => console.log('headerRef.location=' + JSON.stringify(data)))
        // views.layout(this.foldRef).then(data => console.log('foldRef.location=' + JSON.stringify(data)));
        // views.layoutRelativeTo(this.headerRef, this.listRef).then(data => console.log('headerRef.location.relative=' + JSON.stringify(data)));
        // views.layoutRelativeTo(this.foldRef, this.listRef).then(data => console.log('foldRef.location.relative=' + JSON.stringify(data)));

        let contentOffset = e.nativeEvent.contentOffset.y;
        let foldTop = this.state.fold.top;
        console.log('contentOffset=' + JSON.stringify(contentOffset) + ', foldTop=' + foldTop);

        if (foldTop === -1) {
            views
                .layoutRelativeTo(this.foldRef, this.listRef)
                .then(data => {
                    this.setState(prevState => {
                        if (prevState.fold.top !== -1) {
                            return
                        }
                        console.log('try set foldTop=' + foldTop)
                        return {
                            fold: {
                                expand: data.top > contentOffset,
                                top: data.top,
                            }
                        };
                    });

                    this.setState();
                });
        } else {
            this.setState({
                fold: {
                    expand: foldTop > contentOffset,
                    top: foldTop,
                }
            })
        }
    }

    render() {
        const { store } = this.props;
        return (
            <FlatList
                ref={(ref) => { this.listRef = ref }}
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
                onScroll={this._onScroll}
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