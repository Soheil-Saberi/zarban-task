import { ReactNode } from 'react'

import { classNames } from '@/lib/utils'

interface InputGroupProps {
  id: string
  label: string
  children: ReactNode
  className?: string
  error?: string
}

export function InputGroup({
  id,
  label,
  children,
  className,
  error,
}: InputGroupProps) {
  return (
    <div className={classNames('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-xs text-gray-800 sm:text-sm">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
