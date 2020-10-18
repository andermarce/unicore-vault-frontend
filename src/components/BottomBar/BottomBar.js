import React from 'react'
import { BottomBarLink } from './BottomBarLink'
import { FlexCenter } from '../FlexCenter/FlexCenter'

export const BottomBar = () => {
  return (
    <FlexCenter flexDirection="column">
      <img width="200px" src={require('assets/img/unicore-brand.png')} alt="unicore-brand" />
      <FlexCenter>
        <BottomBarLink url="https://github.com/unicore-vault">
          GitHub
        </BottomBarLink>
        <BottomBarLink url="https://t.me/uvaultfinance">
          Telegram
        </BottomBarLink>
        <BottomBarLink url="https://medium.com/@unicore">
          Medium
        </BottomBarLink>
        <BottomBarLink url="https://discord.gg/NCYueeS">
          Discord
        </BottomBarLink>
      </FlexCenter>
    </FlexCenter>
  )
}
