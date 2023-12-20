import { classNames } from '@/lib/utils'

const loadingSizeOptions = ['xs', 'sm', 'lg'] as const
type LoadingSize = (typeof loadingSizeOptions)[number]
const loadingSize = {
  xs: 'h-4 w-4',
  sm: 'h-10 w-10',
  lg: 'h-16 w-16',
}

interface LoadingProps {
  size?: LoadingSize
  center?: boolean
  className?: string
}
const Loading = ({ size = 'sm', center = true, className }: LoadingProps) => {
  return (
    <div
      className={classNames(
        'flex h-full w-full',
        center ? 'items-center justify-center' : 'items-start justify-start',
      )}
    >
      <div
        className={classNames(
          'text-primary inline-block animate-spin self-center rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
          loadingSize[size],
          className,
        )}
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  )
}

export default Loading
