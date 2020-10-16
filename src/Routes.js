import React from 'react'
import { Box } from '@material-ui/core'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Main, Overview, Reactor, Vault } from './views'
import { BottomBar, DisplayBox, ReactorCore, TabBar, TopBar } from 'components'
import { useWallet } from 'use-wallet'

export const Routes = () => {
  const { account } = useWallet()

  return (
    <Router>
      <ReactorCore>
        <DisplayBox>
          <TopBar />
          <Box display="flex" flexDirection="column" height="100%">
            {account && (<TabBar />)}
            <Switch>
              <Route path="/reactor">
                <Reactor />
              </Route>
              <Route path="/vault">
                <Vault />
              </Route>
              <Route path="/overview">
                <Overview />
              </Route>
              <Route exact path="/">
                <Main />
              </Route>
            </Switch>
          </Box>
          <BottomBar />
        </DisplayBox>
      </ReactorCore>
    </Router>
  )
}
