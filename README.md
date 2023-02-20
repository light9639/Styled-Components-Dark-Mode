# 💄 Styled-Theming을 이용하여 만든 DarkMode 예제 문서입니다.

:octocat: 바로 가기 : https://light9639.github.io/Styled-Components-Dark-Mode/
 
| <img src="https://user-images.githubusercontent.com/95972251/218106532-0128958e-edce-4056-8397-c29657555188.png" alt="Light" /> | <img src="https://user-images.githubusercontent.com/95972251/218107443-aa70e464-71b1-4e29-8881-a8029e9b668a.png" alt="Dark" /> |
| ------------- | ------------- |

:sparkles: 💄 Styled-Theming을 이용하여 만든 DarkMode 예제 문서입니다. :sparkles:
## :tada: React 프로젝트 생성
- React 생성
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- vite를 이용하여 프로젝트를 생성하려면
```bash
npm create vite@latest
# or
yarn create vite
```
- 터미널에서 실행 후 프로젝트 이름 만든 후 React 선택, Typescirpt-SWC 선택하면 생성 완료. 
## 🚛 styled-components, styled-theming 설치
- styled-components, styled-theming 설치하기
```bash
$ npm install styled-components styled-theming
# or
$ yarn add styled-components styled-theming
```
## ✒️ main.tsx, App.tsx 수정 및 작성
### ⚡ main.tsx
- `components` 파일에 있는 `ThemeContext`, `GlobalStyle` 컴포넌트를 가져온다.
- `MyThemeProvider`는 `App`을 감싸준다.
- `GlobalStyle`를 넣으면 전역변수로 활용이 가능하다.
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
### ⚡ App.tsx
- 버튼을 클릭하면 테마가 바뀌도록 설정함.
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
## 📝 components 파일 속 GlobalStyle.tsx, ThemeContext.tsx, theme.ts 수정 및 작성
### ⚡ GlobalStyle.tsx
- `createGlobalStyle`을 `import`한 후 `GlobalStyle` 변수에 저장한다.
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
### ⚡ ThemeContext.tsx
- `ThemeProvider` 안에 `children`을 만들어서 `props` 형식으로 텍스트를 입력할 수 있게끔 한다.
- `toggle` 함수를 만들어 `App.tsx`에 있는 버튼을 클릭할 시 테마가 바꾸는 것을 가능하게 만든다.
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
### ⚡ theme.ts
- 테마가 변경될 때 `backgroundColor`와 `textColor`, `buttonBackgroundColor`, `buttonTextColor`의 자료들을 입력한다.
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
