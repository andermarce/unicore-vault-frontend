import React from 'react'
import { Box, Button, ButtonGroup } from '@material-ui/core'
import { useConverter } from 'hooks/useConverter'

export const ConverterButtonGroup = () => {
  const { onButton, setMax } = useConverter() 

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