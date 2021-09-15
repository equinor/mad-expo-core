/// <reference types="react" />
declare const TextLink: {
    (props: {
        data: {
            name: string;
            route: string;
        };
        textStyle?: Object;
        nav: {
            state: Object;
            navigate: Function;
        };
    }): JSX.Element;
    defaultProps: {
        textStyle: {};
    };
};
export default TextLink;
