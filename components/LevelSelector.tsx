'use client'

import { LEVEL_DEFS } from '@/lib/types'

interface Props {
  onSelect: (level: number) => void
  onBack: () => void
}

export default function LevelSelector({ onSelect, onBack }: Props) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenHeader step={1} onBack={onBack} />

      <main className="flex-1 px-6 py-10 max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-semibold text-[#151515] tracking-tight mb-1">
          Select your level
        </h2>
        <p className="text-sm text-[#838383] mb-8">
          Be honest — the right challenge is the one you can actually finish today.
        </p>

        <div className="flex flex-col gap-3">
          {LEVEL_DEFS.map(({ level, name, description }) => (
            <button
              key={level}
              onClick={() => onSelect(level)}
              className="group text-left w-full px-5 py-4 border border-[#e8e8e8] rounded-[9px] hover:border-[#187adc] hover:bg-[#f0f7ff] transition-all duration-150"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl font-semibold text-[#e8e8e8] group-hover:text-[#187adc] transition-colors duration-150 leading-none mt-0.5 tabular-nums">
                  0{level}
                </span>
                <div>
                  <div className="text-sm font-semibold text-[#151515] mb-0.5">{name}</div>
                  <div className="text-sm text-[#838383]">{description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
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
