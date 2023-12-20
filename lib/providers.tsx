'use client'

import { Toaster } from 'react-hot-toast'
import { WagmiConfig } from 'wagmi'

import { config } from './config'

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <WagmiConfig config={config}>
      {props.children} <Toaster position="top-center" />
    </WagmiConfig>
  )
}
