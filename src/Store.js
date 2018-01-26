import { action, computed, observable, runInAction } from 'mobx';

class Store {
    constructor(parent) {
        this.parent = parent;
    }
}

class RootStore extends Store {
    constructor() {
        super(null)
        this.recentsStore = new RecentsStore(this);

        let limit = 10;
        // for (let i = 0; i < limit; i++) {
        //     this.recentsStore.add({
        //         name: 'name_' + i,
        //         age: i
        //     }, `xxx给你发了${i}条消息`);
        // }

        this.userStore = new UserStore(this);
        for (let i = 0; i < limit; i++) {
            this.userStore.add({
                name: 'Name_' + i,
                age: i
            });
        }
    }
}

class UserStore extends Store {
    constructor(parent) {
        super(parent)
    }

    @observable userList = [];

    @action add = (user) => {
        this.userList.push(user);
    }

    @computed get dataSource() {
        // http://cn.mobx.js.org/best/pitfalls.html
        // slice() for FlatList observe dataSource have changed
        return this.userList.slice();
    }
}

class RecentsStore extends Store {
    constructor(parent) {
        super(parent);
    }

    @observable messageList = [];

    @action add = (user, message) => {
        this.messageList.unshift({
            user: { ...user },
            message: message
        });
    }

    @computed get dataSource() {
        // http://cn.mobx.js.org/best/pitfalls.html
        // slice() for FlatList observe dataSource have changed
        return this.messageList.slice();
    }
}

const rootStore = new RootStore();
exports.rootStore = rootStore;