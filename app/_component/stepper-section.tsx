import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useDisconnect } from 'wagmi'

import { Button } from '@/components/button'
import { Card, CardBody, CardHeader } from '@/components/card'
import Loading from '@/components/loading'

const StepOne = dynamic(() => import('./step-one'), {
  loading: () => <Loading />,
})
const StepTwo = dynamic(() => import('./step-two'), {
  loading: () => <Loading />,
})

enum Steps {
  MINTING = 0,
  TRANSFER = 1,
}

interface StepType {
  label: string
  description: string
}

const StepItem: StepType[] = [
  {
    label: 'Token Minting',
    description:
      'Mint tokens for your wallet address with specified amounts through a user-friendly form.',
  },
  {
    label: 'Token Transfer',
    description:
      'Transfer minted tokens securely to any Ethereum address using a simple form interface.',
  },
]

const StepperSection = () => {
  const [step, setStep] = useState<Steps>(Steps.MINTING)
  const { disconnect } = useDisconnect()

  return (
    <section className="flex flex-col gap-2">
      <Card className="max-w-[500px]">
        <CardHeader className="flex-col gap-2">
          <h2 className="text-xl font-bold">{StepItem[step].label}</h2>
          <p className="text-sm">{StepItem[step].description}</p>
        </CardHeader>
        <CardBody className="flex flex-col gap-8">
          {step === Steps.MINTING ? <StepOne /> : <StepTwo />}
        </CardBody>
      </Card>
      <div className="flex w-full items-center justify-between">
        <Button variant="link" onClick={disconnect as any}>
          Disconnect
        </Button>
        <Button
          variant="link"
          onClick={() =>
            setStep(step === Steps.MINTING ? Steps.TRANSFER : Steps.MINTING)
          }
        >
          {step === 0
            ? 'Next Step : Token Transfer'
            : 'Prev Step : Token Transfer'}
        </Button>
      </div>
    </section>
  )
}

export default StepperSection
