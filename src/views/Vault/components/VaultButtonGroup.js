import React from 'react'
import { Box, Button, ButtonGroup } from '@material-ui/core'
// import { useConverter } from 'hooks/useConverter'

export const VaultButtonGroup = () => {
  // const { onButton, setMax } = useConverter() 

  return (
    <Box marginTop={1}>
      <ButtonGroup color="primary" fullWidth>
        <Button onClick={() => {}}>25%</Button>
        <Button onClick={() => {}}>50%</Button>
        <Button onClick={() => {}}>75%</Button>
        <Button onClick={() => {}}>MAX</Button>
      </ButtonGroup>
    </Box>
  )
}