import React from 'react'
import { Box, Button, Divider, Typography } from '@material-ui/core'
import { ClaimSection } from './components/ClaimSection'
import { useAddressLocked } from 'hooks/useAddressLocked'
import { ConverterForm } from './components/ConverterForm'
import { ViewWrapper } from 'components'

export const Converter = () => {
  const addressLocked = useAddressLocked()

  return (
    <ViewWrapper>
      <Typography variant="h5">UniCore Reactor</Typography>
      <Typography variant="subtitle2" color="textSecondary">Constant Liquidity Wrapper</Typography>
      {/* <Typography variant="h5">In Progress</Typography> */}
      {/* <Typography variant="h3">12:00:00</Typography>
      <Typography variant="subtitle2">Until Liquidity Generation</Typography> */}
      <ConverterForm />
      {+addressLocked > 0 && <ClaimSection />} 
    </ViewWrapper>
  )
}
