import type { ElementType, HTMLAttributes, ReactNode } from 'react'

export type TypographyVariant =
  | 'display1'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'title4'
  | 'body1'
  | 'body1-long'
  | 'body2'
  | 'body2-long'
  | 'body3'
  | 'body3-long'
  | 'caption'

export type TypographyWeight = 'regular' | 'bold'

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  variant: TypographyVariant
  weight?: TypographyWeight
  children: ReactNode
}

const variantClassMap: Record<TypographyVariant, string> = {
  display1: 'text-[52px] leading-[72px] tracking-[-1.3px]',
  title1: 'text-[36px] leading-[48px] tracking-[-0.9px]',
  title2: 'text-[32px] leading-[42px] tracking-[-0.7px]',
  title3: 'text-[28px] leading-[38px] tracking-[-0.6px]',
  title4: 'text-[24px] leading-[32px] tracking-[-0.6px]',
  body1: 'text-[20px] leading-[28px] tracking-[-0.4px]',
  'body1-long': 'text-[20px] leading-[30px] tracking-[-0.4px]',
  body2: 'text-[18px] leading-[26px] tracking-[-0.03em]',
  'body2-long': 'text-[18px] leading-[28px] tracking-[-0.03em]',
  body3: 'text-[16px] leading-[24px] tracking-[-0.03em]',
  'body3-long': 'text-[16px] leading-[26px] tracking-[-0.03em]',
  caption: 'text-[12px] leading-[16px] tracking-[-0.3px]',
}

const defaultElementMap: Record<TypographyVariant, ElementType> = {
  display1: 'h1',
  title1: 'h1',
  title2: 'h2',
  title3: 'h3',
  title4: 'h4',
  body1: 'p',
  'body1-long': 'p',
  body2: 'p',
  'body2-long': 'p',
  body3: 'p',
  'body3-long': 'p',
  caption: 'span',
}

const defaultWeightMap: Record<TypographyVariant, TypographyWeight> = {
  display1: 'bold',
  title1: 'bold',
  title2: 'bold',
  title3: 'bold',
  title4: 'bold',
  body1: 'regular',
  'body1-long': 'regular',
  body2: 'regular',
  'body2-long': 'regular',
  body3: 'regular',
  'body3-long': 'regular',
  caption: 'regular',
}

const titleVariants = new Set<TypographyVariant>([
  'display1',
  'title1',
  'title2',
  'title3',
  'title4',
])

function getWeightClass(variant: TypographyVariant, weight: TypographyWeight) {
  if (weight === 'bold') return 'font-bold'
  return titleVariants.has(variant) ? 'font-medium' : 'font-normal'
}

export function Typography({
  as,
  variant,
  weight = defaultWeightMap[variant],
  className = '',
  children,
  ...props
}: TypographyProps) {
  const Component = as ?? defaultElementMap[variant]

  return (
    <Component
      className={[variantClassMap[variant], getWeightClass(variant, weight), className].join(' ')}
      {...props}
    >
      {children}
    </Component>
  )
}
