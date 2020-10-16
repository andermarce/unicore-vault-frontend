import React from 'react'
import { Button } from '@material-ui/core'
import { useModal } from 'hooks/useModal'
import { ManualModal } from '../ManualModal'

export const ManualButton = () => {

  const [showManualModal] = useModal(<ManualModal />)

  return (
    <Button
      color="primary"
      onClick={showManualModal}
    >
      Reactor Manual
    </Button>
  )
}
