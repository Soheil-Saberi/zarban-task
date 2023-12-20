import { Connector } from 'wagmi'
import { ConnectArgs } from 'wagmi/actions'

import { Button } from '@/components/button'

interface ConnectWalletProps {
  connect: (args?: Partial<ConnectArgs> | undefined) => void
  connectors: Connector<any, any>[]
  isLoading: boolean
  pendingConnector: Connector<any, any> | undefined
  error: Error | null
}

const ConnectWalletSection = ({
  connect,
  connectors,
  isLoading,
  pendingConnector,
  error,
}: ConnectWalletProps) => {
  return (
    <section className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">Connect to wallet</h2>
      {connectors.map((connector) => (
        <Button
          size="lg"
          className="w-[250px]"
          disabled={!connector.ready}
          key={connector.id}
          isLoading={isLoading && connector.id === pendingConnector?.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
        </Button>
      ))}

      {error && <p className="text-xl text-red-500">{error.message}</p>}
    </section>
  )
}

export default ConnectWalletSection
