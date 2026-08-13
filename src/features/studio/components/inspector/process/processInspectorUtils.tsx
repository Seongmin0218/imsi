import type {
  StudioBlockConfig,
  StudioBlockConfigValue,
  StudioSlotState,
} from '../../../types/studioNode'

export const studioInspectorClassName =
  '!w-full !rounded-[12px] !border-[#E4E4E7] !shadow-none [&_.setting-block-fields]:!w-full [&_.setting-block-fields]:max-w-full'

export function resolveState(
  complete: boolean,
): StudioSlotState {
  return complete
    ? 'filled'
    : 'empty'
}

export function getString(
  config: StudioBlockConfig | undefined,
  key: string,
  fallback = '',
): string {
  const value =
    config?.[key]

  return typeof value === 'string'
    ? value
    : fallback
}

export function getBoolean(
  config: StudioBlockConfig | undefined,
  key: string,
  fallback = false,
): boolean {
  const value =
    config?.[key]

  return typeof value === 'boolean'
    ? value
    : fallback
}

export function getStringArray(
  config: StudioBlockConfig | undefined,
  key: string,
  fallback: string[] = [],
): string[] {
  const value =
    config?.[key]

  if (!Array.isArray(value)) {
    return fallback
  }

  return value.filter(
    (
      item,
    ): item is string =>
      typeof item === 'string',
  )
}

export function getNumberArray(
  config: StudioBlockConfig | undefined,
  key: string,
  fallback: number[] = [],
): number[] {
  const value =
    config?.[key]

  if (!Array.isArray(value)) {
    return fallback
  }

  return value.filter(
    (
      item,
    ): item is number =>
      typeof item === 'number',
  )
}

export function readStringArray(
  value:
    | StudioBlockConfigValue
    | undefined,
  fallback: string[],
): string[] {
  if (!Array.isArray(value)) {
    return fallback
  }

  return value.filter(
    (
      item,
    ): item is string =>
      typeof item === 'string',
  )
}

export function readNumberArray(
  value:
    | StudioBlockConfigValue
    | undefined,
  fallback: number[],
): number[] {
  if (!Array.isArray(value)) {
    return fallback
  }

  return value.filter(
    (
      item,
    ): item is number =>
      typeof item === 'number',
  )
}

interface ToggleRowProps {
  label: string
  checked: boolean
  onChange: () => void
}

export function ToggleRow({
  label,
  checked,
  onChange,
}: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-bold text-slate-600">
        {label}
      </span>

      <button
        type="button"
        onClick={
          onChange
        }
        aria-pressed={
          checked
        }
        className={[
          'relative h-[26px] w-[48px] shrink-0 rounded-full transition-colors',
          checked
            ? 'bg-indigo-500'
            : 'bg-slate-200',
        ].join(
          ' ',
        )}
      >
        <span
          className={[
            'absolute top-[3px] h-5 w-5 rounded-full bg-white transition-all',
            checked
              ? 'left-[25px]'
              : 'left-[3px]',
          ].join(
            ' ',
          )}
        />
      </button>
    </div>
  )
}
