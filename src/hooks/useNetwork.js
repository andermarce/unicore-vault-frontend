import { useContext, useEffect, useState } from 'react'
import { NetworkContext } from '../contexts/Network';

export const useNetwork = () => {
  const { network } = useContext(NetworkContext);

  return {
    network
  }
}
