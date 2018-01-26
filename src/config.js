import { Dimensions, PixelRatio } from "react-native";

let window = Dimensions.get('window')
console.log('window(' + window.width + ', ' + window.height + ')')

let screen = Dimensions.get('screen')
console.log('screen(' + screen.width + ', ' + screen.height + ')')

const PT = PixelRatio.get();
console.log('PixelRatio=' + PT + 'x');