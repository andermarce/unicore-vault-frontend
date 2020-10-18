import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import { UseWalletProvider } from 'use-wallet'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme';
import ConverterProvider from 'contexts/Converter'
import LockerProvider from 'contexts/Locker'
import NetworkProvider from 'contexts/Network'
import ModalsProvider from 'contexts/Modals'
import ReactorProvider  from 'contexts/Reactor'
import VaultProvider from 'contexts/Vault'
import UniCoreProvider from 'contexts/UniCore'
import { useNetwork } from 'hooks/useNetwork'
import { Routes } from './Routes'

// only load necessary font weights
// https://material-ui.com/components/typography/#general
import "fontsource-montserrat/400.css"
import "fontsource-montserrat/500.css"
import "fontsource-montserrat/600.css"
import "fontsource-montserrat/800.css"
import "assets/styles/styles.css"


const WalletApp = () => {
  const { network } = useNetwork()

  return (
    <UseWalletProvider
      chainId={network}
      connectors={ network === 1 
        ? { walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' } } 
        : undefined
      }
    >
      <UniCoreProvider>
        <ReactorProvider>
          <LockerProvider>
            <ConverterProvider>
              <VaultProvider>
                <ModalsProvider>
                  <Routes />
                </ModalsProvider>
              </VaultProvider>
            </ConverterProvider>
          </LockerProvider>
        </ReactorProvider>
      </UniCoreProvider>
    </UseWalletProvider>
  )
}


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NetworkProvider network={1}>
        <WalletApp />
      </NetworkProvider>
    </ThemeProvider>
  )
}

export default App


