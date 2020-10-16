import React from 'react'
import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core'
import { useLocker } from 'hooks/useLocker'

const useStyles = makeStyles(() => ({
  label: {
    fontSize: 10
  },
}));

export const LockAcceptance = () => {
  const classes = useStyles()
  const { formState, setChecked } = useLocker() 

  return (
    <FormControlLabel
      classes={classes}
      control={
        <Checkbox
          checked={formState.checked}
          onChange={setChecked}
          color="secondary"
        />
      }
      label="I understand my tokens will become permanately locked in UniCore."
    />
  )
}
