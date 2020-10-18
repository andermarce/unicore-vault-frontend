import React from 'react'
import { Button } from '@material-ui/core'
import { useModal } from 'hooks/useModal'
import { ManualModal } from '../ManualModal'

export const ManualButton = () => {

  const [showManualModal] = useModal(<ManualModal />)

  return (
    <Button
      size="large"
      color="primary"
      //variant="outlined"
      onClick={showManualModal}
    >
      Reactor Manual
    </Button>
  )
}
