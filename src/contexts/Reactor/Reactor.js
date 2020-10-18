import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useUniCore } from 'hooks/useUniCore'
import { useWallet } from 'use-wallet'
import { getUniCoreContract } from 'UniCore'
import { 
  getIndividualCap,
  getTotalCap,
  getContractStart,
  getContractComplete,
  getContributionPhase,
  getStakingPhase,
  getLpUnits
 } from 'UniCore/utils'
 import { useBlock } from 'hooks/useBlock'

export const ReactorContext = createContext({
  phase: 0,
  maxIndividualCap: new BigNumber(0),
  maxTotalCap: new BigNumber(0),
  contractStart: 0,
  contractEnd: 0,
  contributionPhase: 0,
  stakingPhase: 0,
  lpUnits: new BigNumber(0)
})

const ReactorProvider = ({ children }) => {
  const [reactorState, setReactor] = useState({
    phase: 0,
    maxIndividualCap: new BigNumber(0),
    maxTotalCap: new BigNumber(0),
    contractStart: 0,
    contractEnd: 0,
    contributionPhase: 0,
    stakingPhase: 0,
    lpUnits: new BigNumber(0)
  })
  const { ethereum } = useWallet()
  const uniCore = useUniCore()
  const block = useBlock()

  const uniCoreContract = useMemo(() => {
    return getUniCoreContract(uniCore)
  }, [uniCore])

  const getPhase = (contractEnd, stakingPhase) => {
    const now = Date.now()
    if (contractEnd === 0) {
      return 0
    } else if (contractEnd + stakingPhase > now) {
      return 1
    } else {
      return 2
    }
  }

  const fetchData = useCallback(async () => {
    const [
      maxIndividualCap,
      maxTotalCap,
      contractStart,
      contractEnd,
      contributionPhase,
      stakingPhase,
      lpUnits
    ] = await Promise.all([
      getIndividualCap(uniCoreContract),
      getTotalCap(uniCoreContract),
      getContractStart(uniCoreContract),
      getContractComplete(uniCoreContract),
      getContributionPhase(uniCoreContract),
      getStakingPhase(uniCoreContract),
      getLpUnits(uniCoreContract)
    ])

    setReactor({
      phase: getPhase(contractEnd, stakingPhase),
      maxIndividualCap: new BigNumber(maxIndividualCap),
      maxTotalCap: new BigNumber(maxTotalCap),
      contractStart,
      contractEnd,
      contributionPhase,
      stakingPhase,
      lpUnits
    })
  }, [uniCoreContract])

  useEffect(() => {
    if (ethereum && uniCore) {
      fetchData()
    }
  }, [block, ethereum, uniCore, fetchData])

  return (
    <ReactorContext.Provider value={reactorState}>
      {children}
    </ReactorContext.Provider>
  )
}

export default ReactorProvider