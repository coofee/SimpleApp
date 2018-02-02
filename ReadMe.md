# Create a new React Native App
react-native init SimpleApp
cd SimpleApp

# Install the latest version of react-navigation from npm
npm install --save react-navigation

# Run the new app
react-native run-android
# or:
react-native run-ios



## cannot npm install react-devtools #741

[cannot npm install react-devtools #741](https://github.com/facebook/react-devtools/issues/741)

```
npm install -g --verbose react-devtools

```

## React Native Debugger

[react native debugger](https://github.com/jhen0409/react-native-debugger)

```
$ brew update && brew cask install react-native-debugger

```

## charles rewrite with host and port


| source | dest |
|:---:|:---:|
| https://xxx.com/job/* | http://10.252.11.11:8081/job/* |


1. rewrite settings 添加地址 `https://xxx.com/job/*`

2. rewrite rules 选择`URL` 类型，然后使用`http://host:8081`替换`https://xxx.com`.

3. 保存即可。

## TypeError: transform.forEach is not a function

```
TypeError: transform.forEach is not a function     
 at _validateTransforms
```

```
# Fix Part 1
rm -rf node_modules/react-native/node_modules/merge
npm install merge # install it adjacent to react-native for those who still need it
# Fix Part 2
react-native start --reset-cache
```
  
 [链接：https://github.com/facebook/react-native/issues/13765](https://github.com/facebook/react-native/issues/13765)

 [java bridge to c++ bridge commit](https://github.com/facebook/react-native/commit/1a690d56748eb4b6bf3a8c525ea761d3e3c9aea6)