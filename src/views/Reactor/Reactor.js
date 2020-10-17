import React from 'react'
import { ViewWrapper } from 'components'
import { Locker } from './components/Locker'
import { Claimer } from './components/Claimer'
import { Converter } from './components/Converter'
import { useReactor } from 'hooks/useReactor'

export const Reactor = () => {
  const { phase } = useReactor()

  return (
    <>
      {/* <Locker /> */}
      {/* <Converter/> */}
      {phase === 0 && <Locker />}
      {phase === 1 && <Claimer />}
      {phase === 2 && <Converter />}
    </>  
  )
}
