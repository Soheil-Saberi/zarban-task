import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

import { classNames } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  parentClass?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, parentClass, ...props }, ref) => {
    return (
      <div
        className={classNames(
          'flex w-full flex-row items-center justify-between gap-2',
          'border border-slate-200 bg-neutral-50',
          'focus-within:border-slate-700',
          'rounded px-2 py-2',
          'transition-all duration-300',
          parentClass,
        )}
      >
        <input
          ref={ref}
          type={type}
          className={classNames(
            'w-full bg-transparent',
            'm-0 p-0 outline-0',
            'placeholder:text-gray-40 text-xs read-only:text-gray-400 sm:text-sm',
            className,
          )}
          {...props}
        />
        {props.icon}
      </div>
    )
  },
)

Input.displayName = 'Input'
