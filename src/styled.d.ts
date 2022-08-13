import "styled-components";

// and extend them!
declare module "styled-components" {
    export interface DefaultTheme {
        textColor: string;
        bgColor: string;
        accentColor: string;
        boxDiv: string;
        cardColor?: string;
        boardColor?: string;
    }
}
declare module "react-query/types/react/QueryClientProvider" {
    interface QueryClientProviderProps {
        children?: ReactNode;
    }
}
