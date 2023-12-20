import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { InputGroup } from '@/components/input-group'

interface StepOneInputs {
  tokenId: number
}

const StepOne = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<StepOneInputs>()

  const onSubmit: SubmitHandler<StepOneInputs> = (data) => {
    if (data.tokenId && write) write()
  }

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: '0x65a5ba240CBd7fD75700836b683ba95EBb2F32bd',
    abi: [
      {
        name: 'mint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [{ internalType: 'uint32', name: 'tokenId', type: 'uint32' }],
        outputs: [],
      },
    ],
    functionName: 'mint',
    args: [getValues('tokenId')],
    enabled: Boolean(getValues('tokenId')),
  })

  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  useEffect(() => {
    if (isPrepareError || isError)
      toast.error((prepareError || error)?.message || 'Error')
    if (isSuccess) toast.success('minted successfully')
  }, [error, isError, isPrepareError, isSuccess, prepareError])

  return (
    <form
      className="flex w-full flex-col gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputGroup
        id="amount"
        label="Enter Token Amount"
        error={errors.tokenId?.message}
      >
        <Input
          type="number"
          step="any"
          placeholder="Token Amount"
          {...register('tokenId', {
            required: 'Please enter token id',
            pattern: {
              value: /^[1-9]\d*(\.\d+)?$/g,
              message: 'Number Invalid (number greater than zero)',
            },
          })}
        />
      </InputGroup>
      <Button isLoading={isLoading} type="submit" className="w-fit self-center">
        {isLoading ? 'Minting...' : 'Mint Token'}
      </Button>
    </form>
  )
}

export default StepOne
