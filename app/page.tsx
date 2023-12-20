'use client'

import dynamic from 'next/dynamic'
import { useAccount, useConnect } from 'wagmi'

import Loading from '@/components/loading'

const ConnectWalletSection = dynamic(
  () => import('./_component/connect-wallet-section'),
  { loading: () => <Loading /> },
)
const StepperSection = dynamic(() => import('./_component/stepper-section'), {
  loading: () => <Loading />,
})

export default function Home() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { isConnected } = useAccount()

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-2">
      {isConnected ? (
        <StepperSection />
      ) : (
        <ConnectWalletSection
          connect={connect}
          connectors={connectors}
          error={error}
          isLoading={isLoading}
          pendingConnector={pendingConnector}
        />
      )}
    </main>
  )
}
