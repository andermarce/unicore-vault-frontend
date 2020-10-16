import React from 'react'
import { Box, Button, ButtonGroup } from '@material-ui/core'
import { useLocker } from 'hooks/useLocker'

export const LockButtonGroup = () => {
  const { setAmount, setMax } = useLocker() 

  return (
    <Box marginTop={1}>
      <ButtonGroup color="primary" fullWidth>
        <Button onClick={() => setAmount(1)}>1</Button>
        <Button onClick={() => setAmount(5)}>5</Button>
        <Button onClick={() => setAmount(10)}>10</Button>
        <Button onClick={setMax}>MAX</Button>
      </ButtonGroup>
    </Box>
  )
}
