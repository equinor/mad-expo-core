/// <reference types="react" />
declare const IconButton: {
    (props: {
        onPress: CallableFunction;
        name;
        disabled?: boolean;
        size?: number;
        color?: string;
        style?: Object;
    }): JSX.Element;
    defaultProps: {
        checked: boolean;
        disabled: boolean;
        style: {};
        size: number;
        color: string;
    };
};
export default IconButton;
