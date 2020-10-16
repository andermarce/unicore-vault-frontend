import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useUniCore } from 'hooks/useUniCore'
import { useWallet } from 'use-wallet'
import { getUniCoreContract } from 'UniCore'
import { getDisplayBalance } from 'utils'
import { 
  getIndividualCap,
  getTotalCap,
  getContractStart,
  getContractComplete,
  getContributionPhase,
  getStakingPhase
 } from 'UniCore/utils'

export const ReactorContext = createContext({
  phase: 0,
  maxIndividualCap: '0',
  maxTotalCap: '0',
  contractStart: 0,
  contractEnd: 0,
  contributionPhase: 0,
  stakingPhase: 0
})

const ReactorProvider = ({ children }) => {
  const [reactorState, setReactor] = useState({
    maxIndividualCap: '0',
    maxTotalCap: '0',
    contractStart: 0,
    contractEnd: 0,
    contributionPhase: 0,
    stakingPhase: 0
  })
  const { ethereum } = useWallet()
  const uniCore = useUniCore()

  const uniCoreContract = useMemo(() => {
    return getUniCoreContract(uniCore)
  }, [ethereum, uniCore])

  const getPhase = useCallback((contractEnd, stakingPhase) => {
    const now = Date.now()
    if (contractEnd === 0) {
      return 0
    } else if (contractEnd + stakingPhase < now) {
      return 1
    } else {
      return 2
    }
  }, [])

  const fetchData = useCallback(async () => {
    const [
      maxIndividualCap,
      maxTotalCap,
      contractStart,
      contractEnd,
      contributionPhase,
      stakingPhase
    ] = await Promise.all([
      getIndividualCap(uniCoreContract),
      getTotalCap(uniCoreContract),
      getContractStart(uniCoreContract),
      getContractComplete(uniCoreContract),
      getContributionPhase(uniCoreContract),
      getStakingPhase(uniCoreContract)
    ])

    setReactor({
      phase: getPhase(contractEnd, stakingPhase),
      maxIndividualCap: getDisplayBalance(new BigNumber(maxIndividualCap)),
      maxTotalCap: getDisplayBalance(new BigNumber(maxTotalCap)),
      contractStart,
      contractEnd,
      contributionPhase,
      stakingPhase
    })
  }, [ethereum, uniCore, uniCoreContract])

  useEffect(() => {
    if (ethereum) {
      fetchData()
    }
  }, [ethereum, uniCore])

  return (
    <ReactorContext.Provider value={reactorState}>
      {children}
    </ReactorContext.Provider>
  )
}

export default ReactorProvider