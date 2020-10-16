import React from 'react'
import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core'
import { useConverter } from 'hooks/useConverter'

const useStyles = makeStyles(() => ({
  label: {
    fontSize: 10
  },
}));

export const ConverterAcceptance = () => {
  const classes = useStyles()
  const { checked, setChecked } = useConverter() 

  return (
    <FormControlLabel
      classes={classes}
      control={
        <Checkbox
          checked={checked}
          onClick={() => setChecked()}
          color="secondary"
        />
      }
      label="I understand my tokens will become permanately locked in UniCore."
    />
  )
}