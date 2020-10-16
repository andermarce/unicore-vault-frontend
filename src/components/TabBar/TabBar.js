import React, { useEffect, useState } from 'react'
import { Box, Tabs, Tab, Fade } from '@material-ui/core'
import { Flex } from 'components'
import { useHistory, useLocation } from 'react-router-dom'
import { useWallet } from 'use-wallet'


export const TabBar = () => {
  const { account } = useWallet()
  const location = useLocation()
  const history = useHistory()
  const [value, setValue] = React.useState(1)

  useEffect(() => {
    switch (location.pathname) {
      case "/reactor": 
        setValue(0);
        break
      case "/overview": 
        setValue(1)
        break
      case "/vault": 
        setValue(2)
        break
      default: setValue(1)
    }
  }, [location])

  const handleChange = (index, route) => {
    setValue(index)
    history.push(route)
  };

  return (
    <Flex flexDirection="column">
      <Fade in={!!account} timeout={1500}>
      <Tabs 
        value={value} 
        onChange={handleChange} 
        indicatorColor="primary"
        centered
      >
        <Tab 
          className={value === 0 ? 'active' : undefined}
          label="Reactor" 
          onClick={() => handleChange(0, '/reactor')} 
        />
        <Tab
          className={value === 1 ? 'active' : undefined} 
          label="Overview" 
          onClick={() => handleChange(1, '/overview')}
        />
        <Tab
          className={value === 2 ? 'active' : undefined}
          label="Vault" 
          onClick={() => handleChange(2, '/vault')} 
        />
      </Tabs>
      </Fade>
    </Flex>
  )
}
