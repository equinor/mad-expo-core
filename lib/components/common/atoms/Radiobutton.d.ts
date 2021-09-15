/// <reference types="react" />
declare const Radiobutton: {
    (props: {
        onValueChange: CallableFunction;
        checked?: boolean;
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
export default Radiobutton;
