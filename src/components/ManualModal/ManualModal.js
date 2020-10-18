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
  Typography,
  Link
} from '@material-ui/core'
import Addresses from 'UniCore/lib/addresses'

export const ManualModal = ({ onDismiss }) => {
  return (
    <>
      <DialogTitle>UniCore Reactor Manual</DialogTitle>
      <DialogContent>
        <Box>
        <Typography>
          UNICORE is a deflationary cryptocurrency with a limited supply. Inspired by CORE, 
          it's main design principle is that yield generated should not lead to inflation.
          Instead, the yield is derived from real activities that result in a positive reinforcement
          loop organically sustaining its ecosystem. Combined with an updated decentralized
          governance structure, refined tokenomics and other unique features explained below,
          we hope to set a new standard. But before we delve into UNICORE, let's briefly discuss CORE.
        </Typography>
        </Box>
        <Box marginTop={2}>
        <Typography>
          UNICORE improves upon CORE through a distinct set of changes. Its main goal is to better align
          the incentives of all stakeholders and create a more robust ecosystem, while staying faithful
          to the design principles of CORE and acknowledging their work.
        </Typography>
        </Box>
        <Box marginY={2}>
          <Typography>
            The key features of UNICORE are as follows:
          </Typography>
        </Box>
        <Box marginLeft={2}>
          <Typography>
            - Fair Initial Liquidity Event with a hard cap of 500 ETH<br/>
            - Wrapped Liquidity Pool Tokens (REACTOR)<br/>
            - Deflationary supply (UNICORE)<br/>
            - Improved Governance<br/>
            - Audited contracts<br/>
          </Typography>
        </Box>
        <Box marginY={2}>
          <Typography>
            Social Media
          </Typography>
        </Box>
          <Box marginLeft={2}>
            <Typography>
              - Telegram: <Link target="blank" rel="noopener" href="https://t.me/uvaultfinance">Telegram</Link><br/>
              - Discord: <Link target="blank" rel="noopener" href="https://discord.gg/NCYueeS">Discord</Link><br/>
              - Twitter: <Link target="blank" rel="noopener" href="https://twitter.com/uvault_finance">Twitter</Link><br/>
              - Medium: <Link target="blank" rel="noopener" href="https://medium.com/@unicore">Medium</Link><br/>
              - GitHub: <Link target="blank" rel="noopener" href="https://github.com/unicore-vault">GitHub</Link><br/>
            </Typography>
          </Box>
          <Box marginY={2}>
            <Typography>
              Contracts & Links
            </Typography>
          </Box>
          <Box marginLeft={2}>
            <Typography>
              - UniCore (UNICORE):&nbsp;
              <Link target="blank" rel="noopener" href={`https://etherscan.io/address/${Addresses[1].uniCore}`}>Contract</Link>&nbsp;
              <Link target="blank" rel="noopener" href={`https://info.uniswap.org/token/${Addresses[1].uniCore}`}>Uniswap</Link><br/> 
              - Wrapped UniCore LP (REACTOR):&nbsp;
              <Link target="blank" rel="noopener" href={`https://etherscan.io/address/${Addresses[1].uniCoreWrapped}`}>Contract</Link>&nbsp;
              <Link target="blank" rel="noopener" href={`https://info.uniswap.org/token/${Addresses[1].uniCoreWrapped}`}>Uniswap</Link><br/>
              - UniCore LP (UNI-V2):&nbsp;
              <Link target="blank" rel="noopener" href={`https://etherscan.io/address/${Addresses[1].uniCoreLp}`}>Contract</Link><br/>
              - UniCore Vault:&nbsp;
              <Link target="blank" rel="noopener" href={`https://etherscan.io/address/${Addresses[1].uniCoreVault}`}>Contract</Link><br/>
            </Typography>
          </Box>
        
        <DialogActions>
          <Button href="https://medium.com/@unicore/meet-unicore-uvault-finance-a6e73d51e989" target="blank" rel="noopener">Read More</Button>
          <Button onClick={onDismiss}>Close</Button>
        </DialogActions>
      </DialogContent>
    </>
  )
}
