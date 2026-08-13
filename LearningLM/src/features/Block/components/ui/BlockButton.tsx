export interface BlockButtonOption {
  label: string
  value: string
  disabled?: boolean
}

type BlockButtonSize = 'sm' | 'md'
type BlockButtonVariant = 'track' | 'bare'

interface BlockButtonCommonProps {
  options: BlockButtonOption[]
  size?: BlockButtonSize
  variant?: BlockButtonVariant
  disabled?: boolean
  className?: string
}

type BlockButtonProps = BlockButtonCommonProps & (
  | {
      multiple?: false
      value: string
      onChange: (value: string) => void
    }
  | {
      multiple: true
      value: string[]
      onChange: (value: string[]) => void
    }
)

const sizeClassMap: Record<BlockButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
}

export function BlockButton(props: BlockButtonProps) {
  const {
    options,
    size = 'md',
    variant = 'bare',
    disabled = false,
    className = '',
  } = props

  return (
    <div
      className={[
        'inline-flex',
        variant === 'track'
          ? 'rounded-xl border-2 border-slate-200 bg-slate-50 p-1'
          : 'gap-2 bg-transparent',
        disabled ? 'opacity-60' : '',
        className,
      ].join(' ')}
      role="tablist"
      aria-multiselectable={props.multiple || undefined}
    >
      {options.map((option) => {
        const isSelected = props.multiple
          ? props.value.includes(option.value)
          : option.value === props.value
        const isDisabled = disabled || option.disabled

        const handleChange = () => {
          if (props.multiple) {
            props.onChange(
              isSelected
                ? props.value.filter((value) => value !== option.value)
                : [...props.value, option.value],
            )
          } else {
            props.onChange(option.value)
          }
        }

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            disabled={isDisabled}
            onClick={handleChange}
            className={[
              'rounded-lg border-2 font-black transition',
              variant === 'track' ? 'border-transparent' : '',
              sizeClassMap[size],
              isSelected
                ? 'border-indigo-500 bg-indigo-500 text-white shadow-sm'
                : variant === 'track'
                  ? 'text-slate-500 hover:bg-white hover:text-slate-800'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-800',
              isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            ].join(' ')}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
