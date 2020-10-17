import React from 'react'
import { Box, Button, ButtonGroup } from '@material-ui/core'
import { useVault } from 'hooks/useVault'

export const VaultButtonGroup = () => {
  const { onButton, setMax } = useVault() 

  return (
    <Box marginTop={1}>
      <ButtonGroup color="primary" fullWidth>
        <Button onClick={() => onButton(25)}>25%</Button>
        <Button onClick={() => onButton(50)}>50%</Button>
        <Button onClick={() => onButton(75)}>75%</Button>
        <Button onClick={setMax}>MAX</Button>
      </ButtonGroup>
    </Box>
  )
}