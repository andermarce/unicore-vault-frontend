import React from 'react'
import { Box, Container, Fade, Paper, Tab, Tabs, Card, CardHeader, CardContent, TextField, FormGroup,Button,ButtonGroup, FormControlLabel, Checkbox, Typography } from '@material-ui/core'
import { useWallet } from 'use-wallet'
import { FlexCenter } from 'components';
import { CheckBox } from '@material-ui/icons';
import { TabBar } from 'components/TabBar';

export const Main = () => {
  const { account } = useWallet();
  
  return (
    <FlexCenter height="100%" width="100%">
      <Box position="absolute">
        <Fade in={!account}
          timeout={{
            appear: 5000,
            enter: 5000,
            exit: 1000
          }}
        >
          <p style={{
            fontSize: 32
          }}>
            AWAITING LAUNCH INSTRUCTIONS
          </p>
        </Fade>
      </Box>
      <Box>
        <Fade in={!!account} timeout={3000}>
          <Box flexDirection="column">
            <FlexCenter flexDirection="column">
              <img src={require('assets/img/unicore-icon.png')} height="100px" />
              <Typography variant="h4">Welcome to UniCore</Typography>
              <Typography variant="subtitle1">Constant Liquidity Provider Protocol</Typography>
            </FlexCenter>
          </Box>
        </Fade>
      </Box>
    </FlexCenter>
  )
}