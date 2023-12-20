import { cva, type VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

import { classNames } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex justify-center items-center group gap-2 focus:outline-none focus-visible:outline-0 ring-offset-1 focus:ring-2 focus-visible:ring-2 transition',
  {
    variants: {
      variant: {
        primary:
          'bg-slate-700 focus:ring-slate-700 focus-visible:ring-slate-700 text-slate-50',
        link: 'text-slate-700 outline-0 hover:underline font-medium ',
      },
      size: {
        default: 'py-[6px] px-3 rounded-md text-xs sm:text-sm',
        sm: 'py-2 px-4 rounded-md text-xs',
        lg: 'py-2 px-8 rounded-md text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  children: ReactNode
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, isLoading, ...props }, ref) => {
    return (
      <button
        className={classNames(buttonVariants({ variant, size, className }), {
          'animate-pulse': isLoading,
        })}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button }
