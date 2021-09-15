/// <reference types="react" />
import { GestureResponderEvent } from 'react-native';
declare const Button: {
    (props: {
        title: string | JSX.Element;
        onPress: (event: GestureResponderEvent) => void;
        textStyle: Object;
        viewStyle: Object;
        disabled: boolean;
        busy: boolean;
    }): JSX.Element;
    defaultProps: {
        textStyle: {};
        viewStyle: {};
        disabled: boolean;
        busy: boolean;
    };
};
export default Button;
