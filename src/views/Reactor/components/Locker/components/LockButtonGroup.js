import React from 'react'
import { Box, Button, ButtonGroup } from '@material-ui/core'
import { useLocker } from 'hooks/useLocker'

export const LockButtonGroup = () => {
  const { onButton, setMax } = useLocker() 

  return (
    <Box marginTop={1}>
      <ButtonGroup color="primary" fullWidth>
        <Button onClick={() => onButton('1')}>1</Button>
        <Button onClick={() => onButton('5')}>5</Button>
        <Button onClick={() => onButton('10')}>10</Button>
        <Button onClick={setMax}>MAX</Button>
      </ButtonGroup>
    </Box>
  )
}
