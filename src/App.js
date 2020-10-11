import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { UseWalletProvider } from 'use-wallet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import customTheme from './theme/custom';
import { Main } from 'views/Main';


// only load necessary font weights
// https://material-ui.com/components/typography/#general
import "fontsource-roboto/300.css";
import "fontsource-roboto/400.css";
import "fontsource-roboto/500.css";
import "fontsource-roboto/700.css";

import "fontsource-orbitron/400.css";
import "fontsource-orbitron/500.css";
import "fontsource-orbitron/700.css";

console.log(customTheme)

export const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <UseWalletProvider
        chainId={1}
        connectors={{
          walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
        }}
      >
        <CssBaseline />
        <Router basename="/">
          <Main />
        </Router>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

