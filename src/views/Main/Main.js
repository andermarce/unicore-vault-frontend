import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';

export const Main = () => {

  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Container>
        <p style={{
          fontFamily:"Orbitron",
          fontSize: 32
        }}>
          AWAITING LAUNCH INSTRUCTIONS
        </p>
          
       
      </Container>
      <Box
        position="absolute"
        alignSelf="flex-end"
        display="contain"
      >
        <img width="200px" src={require('assets/img/unicore-logo.png')} />
      </Box>
    </Box>
  )
}