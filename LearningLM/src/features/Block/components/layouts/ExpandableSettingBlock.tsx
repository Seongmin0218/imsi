import { Check, ChevronDown } from 'lucide-react'
import { useId, useState, type ReactNode } from 'react'
import { StatusBadge, type StatusBadgeVariant } from '../../../../components/ui/StatusBadge'
import { Typography } from '../ui/Typography'
import {
  BlockTag,
  type SettingBlockTagCounts,
} from '../ui/BlockTag'

export interface SettingBlockTag {
  label: string
  count: number
  variant: StatusBadgeVariant
}

interface ExpandableSettingBlockProps {
  title: string // 블록 제목
  code: string // 블록 코드
  stage: string // 단계 정보
  description: string //블록 설명
  icon: ReactNode //아이콘 
  tags?: SettingBlockTag[] // 상태 태그 정보
  tagCounts?: SettingBlockTagCounts
  category?: string // Core / Recommended / Optional
  required?: boolean //필수 블록?
  validationMessage?: string // 유효성 검사 메시지
  defaultOpen?: boolean // 처음렌더링될때 기본적으로 열려 있을지 결정
  children: ReactNode // 펼쳐진 상태에서 보여질 내용
  footer?: ReactNode // 하단 영역
  className?: string //추가 스타일
}

export function ExpandableSettingBlock({
  title,
  code,
  stage,
  description,
  icon,
  tags = [],
  tagCounts,
  category = 'CORE',
  required = false,
  validationMessage,
  defaultOpen = false,
  children,
  footer,
  className = '',
}: ExpandableSettingBlockProps) {
  //블록 펼침/ 접힘 상태
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentId = useId()

  return (
    <section
      className={[
        'w-[550px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm',
        className,
      ].join(' ')}
    >
      {/*카드 헤더*/}
      <button
        type="button"
        className="block w-full px-6 py-8 text-left transition hover:bg-slate-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="flex flex-col gap-[17px]">
          {/* 제목 영역 */}
          <span className="flex items-start justify-between gap-4">
            <span className="flex min-w-0 items-center gap-2">
              {/* 아이콘 */}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-600 text-white">
                {icon}
              </span>

              {/* 제목 + 코드 + 단계 */}
              <span className="flex min-w-0 items-baseline gap-1">
                <Typography
                  as="span"
                  variant="title4"
                  className="truncate text-slate-950"
                >
                  {title}
                </Typography>

                <Typography
                  as="span"
                  variant="caption"
                  className="shrink-0 font-medium text-slate-400"
                >
                  {code} · {stage}
                </Typography>
              </span>
            </span>

            {/* 카테고리 배지 */}
            <span
              className={[
                'shrink-0 rounded-lg border-2 px-[10px] py-[5px] text-xs font-black leading-[15px]',
                category === 'RECOMMENDED'
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-500'
                  : 'border-[#6366F1] bg-[#6366F1] text-white',
              ].join(' ')}
            >
              {category}
            </span>
          </span>

          {/* 블록 설명 */}
          <Typography as="span" variant="body2" className="block text-slate-600">
            {description}
          </Typography>
          
          {/* 상태 태그 목록 */}
          {tags.length > 0 && (
            <span className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <StatusBadge
                  key={tag.label}
                  variant={tag.variant}
                >
                  {tag.label} {tag.count}
                </StatusBadge>
              ))}
            </span>
          )}

          {/* 블록 태그 개수 표시 */}
          {tagCounts && <BlockTag counts={tagCounts} />}
        </span>
      </button>
      
      {/* 펼쳐졌을 때만 내용 표시 */}
      {isOpen && (
        <div id={contentId} className="border-t border-slate-200">
          <div className="px-6 py-5">
            <div className="setting-block-fields mx-auto w-[450px] [&>div>:not(:last-child)]:!mb-[35px]">
              {/* 접기 버튼 */}
              <button
                type="button"
                className={[
                  'flex w-full items-center justify-between gap-3 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
                  validationMessage ? 'mb-[13px]' : 'mb-4',
                ].join(' ')}
                onClick={() => setIsOpen(false)}
                aria-label={`${title} 설정 접기`}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  {/* 완료 체크 아이콘 */}
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] bg-indigo-500 text-white">
                    <Check size={12} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {/* 제목 */}
                  <Typography
                    as="h2"
                    variant="body1"
                    weight="bold"
                    className="truncate text-slate-900"
                  >
                    {title}
                  </Typography>
                </div>
                {/* 필수/선택 표시 */}
                <span className="flex shrink-0 items-center gap-2 text-xs font-bold text-indigo-500">
                  {required ? '필수' : '선택'}
                  <ChevronDown size={13} className="text-slate-400" />
                </span>
              </button>
              {/* 유효성 검사 메시지 */}
              {validationMessage && (
                <Typography
                  variant="body3"
                  className="mb-4 text-rose-500"
                >
                  {validationMessage}
                </Typography>
              )}
              {/* 부모 컴포넌트에서 전달한 입력 요소 */}
              {children}
            </div>
          </div>
           {/* 하단 footer가 있는 경우 출력 */}
          {footer && <div className="border-t border-slate-200 px-6 py-3">{footer}</div>}
        </div>
      )}
    </section>
  )
}
