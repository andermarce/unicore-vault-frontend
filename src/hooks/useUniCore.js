import { useContext, useEffect } from 'react'
import { UniCoreContext } from '../contexts/UniCore'

export const useUniCore = () => {
  const { uniCore } = useContext(UniCoreContext);

  return uniCore
}