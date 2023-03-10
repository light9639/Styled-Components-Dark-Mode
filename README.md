# ๐ Styled-Theming์ ์ด์ฉํ์ฌ ๋ง๋  DarkMode ์์  ๋ฌธ์์๋๋ค.

:octocat: ๋ฐ๋ก ๊ฐ๊ธฐ : https://light9639.github.io/Styled-Components-Dark-Mode/
 
| <img src="https://user-images.githubusercontent.com/95972251/218106532-0128958e-edce-4056-8397-c29657555188.png" alt="Light" /> | <img src="https://user-images.githubusercontent.com/95972251/218107443-aa70e464-71b1-4e29-8881-a8029e9b668a.png" alt="Dark" /> |
| ------------- | ------------- |

:sparkles: ๐ Styled-Theming์ ์ด์ฉํ์ฌ ๋ง๋  DarkMode ์์  ๋ฌธ์์๋๋ค. :sparkles:
## :tada: React ํ๋ก์ ํธ ์์ฑ
- React ์์ฑ
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- vite๋ฅผ ์ด์ฉํ์ฌ ํ๋ก์ ํธ๋ฅผ ์์ฑํ๋ ค๋ฉด
```bash
npm create vite@latest
# or
yarn create vite
```
- ํฐ๋ฏธ๋์์ ์คํ ํ ํ๋ก์ ํธ ์ด๋ฆ ๋ง๋  ํ React ์ ํ, Typescirpt-SWC ์ ํํ๋ฉด ์์ฑ ์๋ฃ. 
## ๐ styled-components, styled-theming ์ค์น
- styled-components, styled-theming ์ค์นํ๊ธฐ
```bash
$ npm install styled-components styled-theming
# or
$ yarn add styled-components styled-theming
```
## โ๏ธ main.tsx, App.tsx ์์  ๋ฐ ์์ฑ
### โก main.tsx
- `components` ํ์ผ์ ์๋ `ThemeContext`, `GlobalStyle` ์ปดํฌ๋ํธ๋ฅผ ๊ฐ์ ธ์จ๋ค.
- `MyThemeProvider`๋ `App`์ ๊ฐ์ธ์ค๋ค.
- `GlobalStyle`๋ฅผ ๋ฃ์ผ๋ฉด ์ ์ญ๋ณ์๋ก ํ์ฉ์ด ๊ฐ๋ฅํ๋ค.
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MyThemeProvider } from "@components/ThemeContext";
import GlobalStyle from '@components/GlobalStyle'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <MyThemeProvider>
      <App />
    </MyThemeProvider>
  </React.StrictMode>,
)
```
### โก App.tsx
- ๋ฒํผ์ ํด๋ฆญํ๋ฉด ํ๋ง๊ฐ ๋ฐ๋๋๋ก ์ค์ ํจ.
```typescript
import * as React from "react";
import { useTheme } from "@components/ThemeContext";
import styled, { withTheme } from "styled-components";
import { buttonBackgroundColor, buttonTextColor } from "@components/theme";
import reactLogo from "./assets/react.svg";

interface PropsType {
  theme: {
    mode: string;
  }
}

function App(props: PropsType) {
  const themeToggle: any = useTheme();

  const Button = styled.button`
    background: ${buttonBackgroundColor};
    border: none;
    border-radius: 0.35rem;
    box-shadow: none;
    color: ${buttonTextColor};
    cursor: pointer;
    font-size: 1.25rem;
    padding: 1rem 2rem;
  `;

  return (
    <header className="App-header">
      <img
        src={reactLogo}
        className="App-logo"
        alt="logo"
      />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <p>
        <Button onClick={() => themeToggle.toggle()}>
          {props.theme.mode === "dark"
            ? "Switch to Light Mode"
            : "Switch to Dark Mode"}
        </Button>
      </p>
    </header>
  );
}

export default withTheme(App);
```
## ๐ components ํ์ผ ์ GlobalStyle.tsx, ThemeContext.tsx, theme.ts ์์  ๋ฐ ์์ฑ
### โก GlobalStyle.tsx
- `createGlobalStyle`์ `import`ํ ํ `GlobalStyle` ๋ณ์์ ์ ์ฅํ๋ค.
```typescript
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    .App {
        font-family: sans-serif;
        text-align: center;
    }

    body {
        margin: 0;
        padding: 0;
    }

    .App-logo {
        animation: App-logo-spin infinite 20s linear;
        height: 25vmin;
        pointer-events: none;
    }

    .App-header {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
    }

    .App-link {
        color: #61dafb;
    }

    img {
        width: 250px;
        height: 250px;
    }
`;

export default GlobalStyle;
```
### โก ThemeContext.tsx
- `ThemeProvider` ์์ `children`์ ๋ง๋ค์ด์ `props` ํ์์ผ๋ก ํ์คํธ๋ฅผ ์๋ ฅํ  ์ ์๊ฒ๋ ํ๋ค.
- `toggle` ํจ์๋ฅผ ๋ง๋ค์ด `App.tsx`์ ์๋ ๋ฒํผ์ ํด๋ฆญํ  ์ ํ๋ง๊ฐ ๋ฐ๊พธ๋ ๊ฒ์ ๊ฐ๋ฅํ๊ฒ ๋ง๋ ๋ค.
```typescript
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
```
### โก theme.ts
- ํ๋ง๊ฐ ๋ณ๊ฒฝ๋  ๋ `backgroundColor`์ `textColor`, `buttonBackgroundColor`, `buttonTextColor`์ ์๋ฃ๋ค์ ์๋ ฅํ๋ค.
```typescript
import theme from "styled-theming";

export const backgroundColor = theme("mode", {
    light: "#fafafa",
    dark: "#222"
});

export const textColor = theme("mode", {
    light: "#000",
    dark: "#fff"
});

export const buttonBackgroundColor = theme("mode", {
    light: "#222",
    dark: "#eee"
});

export const buttonTextColor = theme("mode", {
    light: "#eee",
    dark: "#222"
});
```
