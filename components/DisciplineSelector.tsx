'use client'

import { DISCIPLINES } from '@/lib/types'

interface Props {
  level: number
  onSelect: (discipline: string) => void
  onBack: () => void
}

export default function DisciplineSelector({ level, onSelect, onBack }: Props) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenHeader step={2} onBack={onBack} />

      <main className="flex-1 px-6 py-10 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-2xl font-semibold text-[#151515] tracking-tight">
            Select your discipline
          </h2>
          <span className="text-xs text-[#838383] border border-[#e8e8e8] px-2 py-1 rounded-[5px]">
            Level {level}
          </span>
        </div>
        <p className="text-sm text-[#838383] mb-8">
          Challenges are grounded in real problems from your field.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {DISCIPLINES.map((discipline) => (
            <button
              key={discipline}
              onClick={() => onSelect(discipline)}
              className="group text-left px-4 py-5 border border-[#e8e8e8] rounded-[9px] hover:border-[#187adc] hover:bg-[#f0f7ff] transition-all duration-150"
            >
              <DisciplineIcon discipline={discipline} />
              <span className="text-sm font-medium text-[#151515] block mt-2.5">
                {discipline}
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}

function DisciplineIcon({ discipline }: { discipline: string }) {
  const icons: Record<string, React.ReactNode> = {
    Marketing: <Square className="text-[#187adc]" />,
    Engineering: <Square className="text-[#151515]" />,
    Policy: <Square className="text-[#838383]" />,
    'Government Services': <Square className="text-[#151515]" />,
    Environment: <Square className="text-[#187adc]" />,
    Communications: <Square className="text-[#838383]" />,
    Finance: <Square className="text-[#151515]" />,
    Operations: <Square className="text-[#187adc]" />,
  }
  return icons[discipline] ?? <Square className="text-[#838383]" />
}

function Square({ className }: { className?: string }) {
  return <div className={`w-4 h-4 border-2 border-current ${className}`} />
}

function ScreenHeader({ step, onBack }: { step: number; onBack: () => void }) {
  const steps = ['Level', 'Discipline', 'Generate']
  return (
    <header className="px-6 py-4 border-b border-[#e8e8e8] flex items-center justify-between">
      <button
        onClick={onBack}
        className="text-sm text-[#838383] hover:text-[#151515] transition-colors flex items-center gap-1.5"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </button>
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span className={`text-xs font-medium ${i + 1 === step ? 'text-[#151515]' : 'text-[#e8e8e8]'}`}>
              {s}
            </span>
            {i < steps.length - 1 && (
              <span className="text-xs text-[#e8e8e8]">&rarr;</span>
            )}
          </div>
        ))}
      </div>
      <span className="text-lg font-semibold text-[#151515] w-8 text-right">vana</span>
    </header>
  )
}
