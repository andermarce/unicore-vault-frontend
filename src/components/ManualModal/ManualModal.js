import React from 'react'
import {
  Box,
  Button, 
  ButtonGroup, 
  Checkbox, 
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, 
  List, 
  Typography
} from '@material-ui/core'

export const ManualModal = ({ onDismiss }) => {
  return (
    <>
      <DialogTitle>UniCore Reactor Manual</DialogTitle>
      <DialogContent>
        <DialogContentText>
          UNICORE is a deflationary cryptocurrency with a limited supply. Inspired by CORE, 
          it's main design principle is that yield generated should not lead to inflation.
          Instead, the yield is derived from real activities that result in a positive reinforcement
          loop organically sustaining its ecosystem. Combined with an updated decentralized
          governance structure, refined tokenomics and other unique features explained below,
          we hope to set a new standard. But before we delve into UNICORE, let's briefly discuss CORE.
          <br /><br/>
          UNICORE improves upon CORE through a distinct set of changes. Its main goal is to better align
          the incentives of all stakeholders and create a more robust ecosystem, while staying faithful
          to the design principles of CORE and acknowledging their work.
          <br/><br/>
          The key features of UNICORE are as follows:
          <Box marginLeft={2}>
            - Fair Initial Liquidity Event with a hard cap of 500 ETH<br/>
            - Wrapped Liquidity Pool Tokens (REACTOR)<br/>
            - Deflationary supply (UNICORE)<br/>
            - Improved Governance<br/>
            - Audited contracts<br/>
            - Long-term vision<br/>
          </Box>
        </DialogContentText>
        <DialogActions>
          <Button>Read More</Button>
          <Button onClick={onDismiss}>Close</Button>
        </DialogActions>
      </DialogContent>
    </>
  )
}
