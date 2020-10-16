import React from 'react'
import { TotalLocked } from './components/TotalLocked'
import { LockButton } from './components/LockButton'
import { ClaimButton } from '../ClaimButton'
import { LockCountdown } from './components/LockCountdown'
import { IndividualLock } from '../IndividualLock'

export const Locker = () => {
  return (
    <>
      <LockCountdown />
      <TotalLocked />
      <IndividualLock showLimit />
      <LockButton />
      <ClaimButton />
    </>
  )
}
