import React from 'react'
import { Box, Button, Container, Fade, Typography } from '@material-ui/core'
import { useWallet } from 'use-wallet'
import { ConnectButton } from './ConnectButton'
import { DisplayBox } from 'components'

export const Main = () => {
  const { account } = useWallet();
  

  return (
    <DisplayBox>
      <Box
        position="absolute"
        alignSelf="flex-start"
        justifySelf="flex-end"
      >
        <ConnectButton />
      </Box>
      <Container>
        {!!account ? (
          <Fade in={!!account}>
            <p style={{
              fontSize: 32
            }}>
              SUCCESS
            </p>
          </Fade>
        ) : (
          <Fade in={!account}>
            <p style={{
              fontSize: 32
            }}>
            AWAITING LAUNCH INSTRUCTIONS
          </p>
          </Fade>
        )}
        
      </Container>
      <Box
        position="absolute"
        alignSelf="flex-end"
      >
        <img width="200px" src={require('assets/img/unicore-logo.png')} />
      </Box>
    </DisplayBox>
  )
}