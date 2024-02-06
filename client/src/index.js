import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {extendTheme, ChakraProvider } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: 'dark', // This sets the initial color mode to dark
    useSystemColorMode: false, // This is set to false to disable using the system color mode
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

