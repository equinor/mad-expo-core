/// <reference types="react" />
declare const NavigationList: (props: {
    items: Array<{
        key: string;
        label: string;
        route: string;
        params: Object;
    }>;
    fetching: boolean;
    navigation?: {
        navigate: (route: string, params: Object) => void;
    };
    onRefresh?: () => void;
}) => JSX.Element;
export default NavigationList;
