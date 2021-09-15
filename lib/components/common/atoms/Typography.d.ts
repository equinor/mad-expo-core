/// <reference types="react" />
declare const Typography: (props: {
    variant?: TypographyVariants;
    color?: string;
    light?: boolean;
    medium?: boolean;
    bold?: boolean;
    italic?: boolean;
    size?: number;
    style?: any;
    children?: any;
}) => JSX.Element;
export default Typography;
export declare type TypographyVariants = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
