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
