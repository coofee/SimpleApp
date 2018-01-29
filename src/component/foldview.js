import React, {
    // PropTypes, 
    Component
} from "react";
import { View, TouchableOpacity } from "react-native"

export default class FoldView extends Component {

    // static propTypes = {
    //     expand: PropTypes.object,
    //     onExpand: PropTypes.func,
    //     onClose: PropTypes.func,
    //     HandleView: PropTypes.func,
    //     ContentView: PropTypes.func,
    // };

    static defaultProps = {
        expand: true,
        onExpand: null,
        onClose: null,
        HandleView: null,
        ContentView: null,
    };


    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={1.0} {...this.props} onPress={(e) => this._onChange(e)}>
                {this._renderHandleView()}
                {this._renderContentView()}
            </TouchableOpacity>
        );
    }

    _onChange = (e) => {
        const { expand, onExpand, onClose } = this.props;
        if (expand) {
            onClose(e)
        } else {
            onExpand(e);
        }
    }

    _renderHandleView = () => {
        const { expand } = this.props;
        if (expand) {
            return null;
        }

        const { HandleView } = this.props;
        return <HandleView />
    }

    _renderContentView = () => {
        const { expand } = this.props;
        if (expand) {
            const { ContentView } = this.props;
            return <ContentView />
        }

        return null;
    }
}