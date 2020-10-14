import React from 'react'
import { Button, ButtonGroup, FormControlLabel, FormGroup, DialogTitle, DialogContent } from '@material-ui/core'

export const PledgeModal = ({ onDismiss }) => {


  
  return (
    <>
      <DialogTitle>Reactor Deposit</DialogTitle>
      <DialogContent>
        <FormGroup>
          <TextField 
            variant="outlined" 
            label="Lock Liquidity" 
            margin="normal"
          />
          <ButtonGroup variant="contained" color="primary" fullWidth>
            <Button>1 ETH</Button>
            <Button>5 ETH</Button>
            <Button>10 ETH</Button>
            <Button>25 ETH</Button>
          </ButtonGroup>
          <FormControlLabel
            control={
              <Checkbox
                name=""
                color="secondary"
              />
            }
            label="I understand my tokens will become permanately locked in UniCore."
          />
          <Button variant="contained" color="secondary">
            Deposit Liquidity
          </Button>
        </FormGroup>
      </DialogContent>
    </>
  )
}
