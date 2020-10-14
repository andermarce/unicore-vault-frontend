import React from 'react'
import { Box, Tabs, Tab } from '@material-ui/core'
import { FlexCenter } from 'components'
import { useHistory } from 'react-router-dom'


export const TabBar = () => {
  const history = useHistory();
  const [value, setValue] = React.useState(1);

  const handleChange = (index, route) => {
    setValue(index);
    history.push(route)
  };

  return (
    // <FlexCenter>
    <Box display="flex" flexDirection="column">
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Meltdown" id="meltdown" onClick={() => handleChange(0, '/meltdown')} />
        <Tab label="Overview" id="overview" onClick={() => handleChange(1, '/')} />
        <Tab label="Vault" id="vault" onClick={() => handleChange(2, '/vault')} />
      </Tabs>
    </Box>
    // </FlexCenter>
  )
}
