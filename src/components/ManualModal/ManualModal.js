import React from 'react'
import { 
  Button, 
  ButtonGroup, 
  Checkbox, 
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, 
  Typography
} from '@material-ui/core'

export const ManualModal = ({ onDismiss }) => {
  return (
    <>
      <DialogTitle>UniCore Reactor Manual</DialogTitle>
      <DialogContent>
        <DialogContentText>
          UniCore is a Constant Liquidity Provider Protocol for UniSwap on the Ethereum blockchain.
          UniCore offers its users a fully-automated, non-deflationary yield farming solution.
          Users deposit tokens into the UniCore Reactor, where it will be converted into UniSwap
          Liquidity tokens and locked FOREVER. In return, users receive a wrapped token from the Reactor.
          These wrapped tokens entitle users to receive fees generated from every UNICORE transaction.
        </DialogContentText>
        <DialogActions>
          <Button>Read More</Button>
          <Button onClick={onDismiss}>Close</Button>
        </DialogActions>
      </DialogContent>
    </>
  )
}
