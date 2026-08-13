import type { ComponentProps } from 'react'
import { Select } from '../../../../components/ui/Select'

export type SelectDropdownProps = ComponentProps<typeof Select>

export function SelectDropdown(props: SelectDropdownProps) {
  return <Select {...props} />
}
