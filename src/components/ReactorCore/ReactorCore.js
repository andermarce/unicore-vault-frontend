import React from 'react'
import { Box, Fade } from '@material-ui/core'
import { useWallet } from 'use-wallet'

export const ReactorCore = ({ children }) => {
  const { account } = useWallet()

  return (
    <>
    <div className="reactor-bg">
      <div className="reactor-holder">
        <img 
          src={require("assets/img/reactor-ring-sm-outer.png")}
          className="reactor-ring-sm"
          alt="..."
        />
      </div>
      <div className="reactor-holder">
        <img 
          src={require("assets/img/reactor-ring-sm-inner.png")}
          className="reactor-ring-sm"
          alt="..."
        />
      </div>
      <div className="reactor-holder">
        <img 
          src={require("assets/img/reactor-ring-md.png")}
          className="reactor-ring-md"
          alt="..."
        />
      </div>
      <div className="reactor-holder">
        <img 
          src={require("assets/img/reactor-ring-lg.png")}
          className="reactor-ring-lg"
          alt="..."
        />
      </div>
      <div className="reactor-holder">
        <Fade in={!account} timeout={1500}>
          <img 
            src={require("assets/img/reactor-core.png")}
            className="reactor-core"
            alt="..."
          />
        </Fade>
        
      </div>

      <Box
        height="100%"
        width="100%"
        zIndex={10}
        position="absolute"
      >
        {children}
      </Box>
    </div>
    </>
  )
}
