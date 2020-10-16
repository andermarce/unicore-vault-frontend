import React from 'react'
import { BottomBarLink } from './BottomBarLink'
import { FlexCenter } from '../FlexCenter/FlexCenter'

export const BottomBar = () => {
  return (
    <FlexCenter
      flexDirection="column"
      
    >
      <img width="200px" src={require('assets/img/unicore-brand.png')} />
      <FlexCenter>
        <BottomBarLink url="https://github.com/unicore-vault">
          GitHub
        </BottomBarLink>
        <BottomBarLink url="https://medium.com/@unicore">
          Medium
        </BottomBarLink>
        <BottomBarLink url="https://discord.com">
          Discord
        </BottomBarLink>
        <BottomBarLink url="https://telegram.com">
          Telegram
        </BottomBarLink>
      </FlexCenter>
    </FlexCenter>
  )
}
