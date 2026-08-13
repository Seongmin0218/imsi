import { Copy, Download, Plus, Settings, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  SearchInput,
  SegmentedControl,
  Slider,
  StatusBadge,
  ToggleSwitch,
} from '../../components/ui'

export function CommonComponentTestPage() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedView, setSelectedView] = useState('list')
  const [isEnabled, setIsEnabled] = useState(true)
  const [summaryLevel, setSummaryLevel] = useState(60)

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header>
          <p className="text-sm font-black text-indigo-500">
            Common Components
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
            공통 컴포넌트 테스트 페이지
          </h1>
          <p className="mt-3 text-sm font-semibold text-slate-500">
            Studio 화면에서 사용할 공통 UI 컴포넌트를 한 페이지에서 간단히 확인합니다.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-black text-slate-900">SearchInput</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <SearchInput
                value={searchKeyword}
                onChange={setSearchKeyword}
                placeholder="블록 검색"
              />
              <SearchInput
                size="sm"
                value={searchKeyword}
                onChange={setSearchKeyword}
                placeholder="작은 검색창"
              />
              <p className="text-sm font-semibold text-slate-400">
                현재 검색어: {searchKeyword || '없음'}
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-black text-slate-900">StatusBadge</h2>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-2">
                <StatusBadge variant="success">완료</StatusBadge>
                <StatusBadge variant="warning">경고</StatusBadge>
                <StatusBadge variant="danger">미통과</StatusBadge>
                <StatusBadge variant="pending">대기</StatusBadge>
                <StatusBadge variant="info">안내</StatusBadge>
                <StatusBadge variant="required">필수</StatusBadge>
                <StatusBadge variant="optional">선택</StatusBadge>
                <StatusBadge variant="recommended">권장</StatusBadge>
                <StatusBadge variant="muted">준비중</StatusBadge>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-black text-slate-900">
                SegmentedControl
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <SegmentedControl
                value={selectedView}
                onChange={setSelectedView}
                options={[
                  { label: '목록', value: 'list' },
                  { label: '표', value: 'table' },
                  { label: '단락', value: 'paragraph' },
                ]}
              />
              <p className="text-sm font-semibold text-slate-400">
                선택된 값: {selectedView}
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-black text-slate-900">ToggleSwitch</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <ToggleSwitch
                checked={isEnabled}
                onChange={setIsEnabled}
                label="자동 검증 사용"
                description="블록 변경 시 검증 상태를 자동으로 갱신합니다."
              />
              <ToggleSwitch
                checked={false}
                onChange={() => {}}
                disabled
                label="비활성 토글"
                description="disabled 상태 확인용입니다."
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-black text-slate-900">Slider</h2>
            </CardHeader>
            <CardBody>
              <Slider
                label="요약 강도"
                value={summaryLevel}
                onChange={setSummaryLevel}
                min={0}
                max={100}
                step={5}
                valueLabel={`${summaryLevel}%`}
                helperText="값이 높을수록 더 강하게 요약합니다."
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-black text-slate-900">IconButton</h2>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-3">
                <IconButton aria-label="추가" icon={<Plus size={18} />} />
                <IconButton
                  aria-label="설정"
                  variant="outline"
                  icon={<Settings size={18} />}
                />
                <IconButton
                  aria-label="다운로드"
                  variant="solid"
                  icon={<Download size={18} />}
                />
                <IconButton
                  aria-label="복사"
                  selected
                  icon={<Copy size={18} />}
                />
                <IconButton
                  aria-label="삭제"
                  disabled
                  icon={<Trash2 size={18} />}
                />
              </div>
            </CardBody>
          </Card>
        </section>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-black text-slate-900">
              기존 공통 컴포넌트 확인
            </h2>
          </CardHeader>
          <CardBody className="space-y-5">
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="gray">기본</Badge>
              <Badge variant="green">입문</Badge>
              <Badge variant="blue">자료조사</Badge>
              <Badge variant="purple">튜토리얼</Badge>
              <Badge variant="pink">응용</Badge>
            </div>
          </CardBody>
          <CardFooter>
            <p className="text-sm font-semibold text-slate-400">
              공통 컴포넌트 확인용 더미 카드입니다.
            </p>
            <Button size="sm">확인</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}