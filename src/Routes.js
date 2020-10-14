import React from 'react'
import { Box, Container } from '@material-ui/core'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Launch, Main, Vault } from './views'
import { BottomBar, DisplayBox, TabBar, TopBar } from 'components'
import { useWallet } from 'use-wallet'

export const Routes = () => {
  const { account } = useWallet()

  return (
    <DisplayBox>
      <TopBar />
      <Box display="flex" flexDirection="column" height="100%">
            
        {account && (<TabBar />)}
        <Router>
          <Switch>

            
            <Route path="/meltdown">
              <Launch />
            </Route>
            <Route path="/vault">
              <Vault />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </Router>
      </Box>
      <BottomBar />
    </DisplayBox>
  )
}
