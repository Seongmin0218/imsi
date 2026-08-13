import type {
  BadgeVariant,
} from '../../../components/ui/Badge'

import type {
  TutorialLevel,
} from '../data/tutorials'

export const tutorialLevelBadgeVariantMap: Record<
  TutorialLevel,
  BadgeVariant
> = {
  입문: 'levelBeginner',
  기초: 'levelBasic',
  응용: 'levelAdvanced',
}

export function getTutorialLevelBadgeVariant(
  level: string,
): BadgeVariant {
  if (level === '입문') {
    return 'levelBeginner'
  }

  if (level === '기초') {
    return 'levelBasic'
  }

  if (level === '응용') {
    return 'levelAdvanced'
  }

  return 'gray'
}

export function isTutorialLevel(
  value: string,
): value is TutorialLevel {
  return (
    value === '입문' ||
    value === '기초' ||
    value === '응용'
  )
}