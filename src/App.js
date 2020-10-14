import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { UseWalletProvider } from 'use-wallet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import NetworkProvider from 'contexts/Network';
import ModalsProvider from 'contexts/Modals';
import { useNetwork } from 'hooks/useNetwork'
import { Routes } from './Routes'

// only load necessary font weights
// https://material-ui.com/components/typography/#general

// import "fontsource-roboto/400.css";
// import "fontsource-roboto/500.css";
// import "fontsource-roboto/600.css";
// import "fontsource-roboto/800.css";

import "fontsource-orbitron/400.css";
import "fontsource-orbitron/500.css";
import "fontsource-orbitron/600.css";
import "fontsource-orbitron/800.css";
import "assets/styles/styles.css"
import { ReactorCore } from 'components/ReactorCore/ReactorCore';

const WalletApp = () => {
  const { network } = useNetwork();
  console.log(network)

  return (
    <UseWalletProvider
      chainId={network}
      connectors={ network === 1 
        ? { walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' } } 
        : undefined
      }
    >
      <ReactorCore>
        <ModalsProvider>
          <Routes />
        </ModalsProvider>
      </ReactorCore>
    </UseWalletProvider>
  )
}


export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/rinkeby">
            <NetworkProvider network={4}>
              <WalletApp />
            </NetworkProvider>
          </Route>
          <Route path="/">
            <NetworkProvider network={1}>
              <WalletApp />
            </NetworkProvider>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}


