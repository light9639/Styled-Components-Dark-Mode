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
