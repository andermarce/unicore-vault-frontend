import React from 'react'
import { Fade } from '@material-ui/core'
import { useWallet } from 'use-wallet'
import { Column } from '../Column'
import { FlexCenter } from '../FlexCenter'

export const ViewWrapper = ({ children, connected=true }) => {
  const { account } = useWallet()

  return (
    <Column>
      <Fade in={!!account === connected} timeout={1500}>
        <FlexCenter flexDirection="column" height="100%">
          {children}
        </FlexCenter>
      </Fade>
    </Column>
  )
}
