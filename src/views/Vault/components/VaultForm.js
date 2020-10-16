import React from 'react'
import { FormGroup } from '@material-ui/core'
import { VaultButtonRow } from './VaultButtonRow'
import { VaultButtonGroup } from './VaultButtonGroup'
import { VaultInput } from './VaultInput'

export const VaultForm = () => {
  return (
    <FormGroup>
      <VaultInput />
      <VaultButtonGroup />
      <VaultButtonRow />
    </FormGroup>
  )
}
