import {
    findNodeHandle,
    UIManager
} from 'react-native';

const layout = (ref) => {
    const handle = findNodeHandle(ref);

    return new Promise((resolve) => {
        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
            resolve({
                x,
                y,
                width,
                height,
                pageX,
                pageY
            });
        });

    });
}

const layoutRelativeTo = (ref, relativeToRef) => {
    const handle = findNodeHandle(ref);
    const relativeHandle = findNodeHandle(relativeToRef)

    return new Promise((resolve) => {
        UIManager.measureLayout(handle, relativeHandle, () => { }, (left, top, width, height) => {
            resolve({ left, top, width, height });
        })
    });
}

const layoutInWindow = (ref) => {
    const handle = findNodeHandle(ref);
    return new Promise((resolve) => {
        UIManager.measureInWindow(handle, (x, y, width, height) => {
            resolve({ x, y, width, height });
        })
    })
}

export default views = {
    layout,
    layoutRelativeTo,
    layoutInWindow
}