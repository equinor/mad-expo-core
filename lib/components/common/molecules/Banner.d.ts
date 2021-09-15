/// <reference types="react" />
import PropTypes from 'prop-types';
declare const Banner: {
    (props: {
        text?: string;
        viewStyle?: Object;
        textStyle?: Object;
    }): JSX.Element;
    propTypes: {
        text: PropTypes.Requireable<string>;
        viewStyle: PropTypes.Requireable<number | object>;
        textStyle: PropTypes.Requireable<number | object>;
    };
    defaultProps: {
        text: string;
        viewStyle: {};
        textStyle: {};
    };
};
export default Banner;
