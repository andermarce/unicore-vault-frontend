import React, { createContext, useEffect, useState } from 'react'

export const NetworkContext = createContext({
  network: 1
})

const NetworkProvider = ({ network=1, children }) => {
  return <NetworkContext.Provider value={{ network }}>{children}</NetworkContext.Provider>
}

export default NetworkProvider;
