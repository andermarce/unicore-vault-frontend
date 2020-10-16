import React from 'react'
import { ClaimButton } from '../ClaimButton'
import { IndividualLock } from '../IndividualLock'
import { StakingCountdown } from './components/StakingCountdown'

export const Claimer = () => {
  return (
    <>
      <StakingCountdown />
      <IndividualLock />
      <ClaimButton />
    </>
  )
}
