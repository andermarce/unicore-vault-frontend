import React from 'react'
import { ViewWrapper } from 'components'
import { ClaimButton } from '../ClaimButton'
import { IndividualLock } from '../IndividualLock'
import { StakingCountdown } from './components/StakingCountdown'

export const Claimer = () => {
  return (
    <ViewWrapper>
      <StakingCountdown />
      <IndividualLock />
      <ClaimButton />
    </ViewWrapper>
  )
}
