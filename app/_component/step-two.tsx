import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { parseEther } from 'viem'
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { InputGroup } from '@/components/input-group'

interface StepTwoInputs {
  recipient: string
  amount: string
}

const StepTwo = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<StepTwoInputs>()

  const onSubmit: SubmitHandler<StepTwoInputs> = () => sendTransaction?.()

  const { config } = usePrepareSendTransaction({
    to: getValues('recipient'),
    value: getValues('amount') ? parseEther(getValues('amount')) : undefined,
  })

  const { sendTransaction } = useSendTransaction(config)

  const { isLoading, isSuccess } = useWaitForTransaction()

  useEffect(() => {
    if (isSuccess) toast.success('transfer successfully')
  }, [isSuccess])

  return (
    <form
      className="flex w-full flex-col gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <InputGroup
          id="recipient"
          label="Recipient"
          error={errors.recipient?.message}
        >
          <Input
            placeholder="0xA0Cf…251e"
            {...register('recipient', {
              required: 'Please enter Ethereum address',
              pattern: {
                value: /^(0x)[0-9a-fA-F]{40}$/g,
                message:
                  'Please enter a valid Ethereum address in the format 0x1234...',
              },
            })}
          />
        </InputGroup>
        <InputGroup id="amount" label="Amount" error={errors.amount?.message}>
          <Input
            type="number"
            step="any"
            placeholder="0.5"
            {...register('amount', {
              required: 'Please enter amount',
              pattern: {
                value: /^[1-9]\d*(\.\d+)?$/g,
                message: 'Number Invalid (number greater than zero)',
              },
            })}
          />
        </InputGroup>
      </div>
      <Button isLoading={isLoading} type="submit">
        {isLoading ? 'Sending...' : 'Send'}
      </Button>
    </form>
  )
}

export default StepTwo
