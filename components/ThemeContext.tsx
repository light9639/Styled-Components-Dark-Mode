import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { backgroundColor, textColor } from "./theme";

const ThemeToggleContext: any = React.createContext(null);

export const useTheme = () => React.useContext(ThemeToggleContext);

interface Type {
    children: JSX.Element
}

export const MyThemeProvider = ({ children }: Type) => {
    const [themeState, setThemeState] = React.useState({
        mode: "light"
    });

    const Wrapper = styled.div`
        background-color: ${backgroundColor};
        color: ${textColor};
    `;

    const toggle = () => {
        const mode = themeState.mode === "light" ? `dark` : `light`;
        setThemeState({ mode: mode });
    };

    return (
        <ThemeToggleContext.Provider value={{ toggle: toggle }}>
            <ThemeProvider theme={{ mode: themeState.mode }}>
                <Wrapper>{children}</Wrapper>
            </ThemeProvider>
        </ThemeToggleContext.Provider>
    );
};

export default ThemeProvider;
