import { Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { InputGroup } from '@/components/input-group'

interface StepOneProps {
  setStep: Dispatch<SetStateAction<0 | 1>>
}

interface StepOneInputs {
  amount: number
}

const StepOne = ({ setStep }: StepOneProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepOneInputs>()

  const onSubmit: SubmitHandler<StepOneInputs> = (data) => {
    console.log(data)
  }

  return (
    <form
      className="flex w-full flex-col gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputGroup
        id="amount"
        label="Enter Token Amount"
        error={errors.amount?.message}
      >
        <Input
          type="number"
          step="any"
          placeholder="Token Amount"
          {...register('amount', {
            required: 'Please enter token amount',
            pattern: {
              value: /^[1-9]\d*(\.\d+)?$/g,
              message: 'Number Invalid (number greater than zero)',
            },
          })}
        />
      </InputGroup>
      <Button type="submit" className="w-fit self-center">
        Mint Tokens
      </Button>
    </form>
  )
}

export default StepOne
