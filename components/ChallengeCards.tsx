'use client'

import type { Challenge } from '@/lib/types'

interface Props {
  challenges: Challenge[]
  level: number
  discipline: string
  onSelect: (challenge: Challenge) => void
  onBack: () => void
}

export default function ChallengeCards({ challenges, level, discipline, onSelect, onBack }: Props) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
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
          <span className="text-xs text-[#838383] border border-[#e8e8e8] px-2 py-0.5 rounded-[5px]">
            Level {level}
          </span>
          <span className="text-xs text-[#838383]">{discipline}</span>
        </div>
        <span className="text-lg font-semibold text-[#151515]">vana</span>
      </header>

      <main className="flex-1 px-6 py-10 max-w-5xl mx-auto w-full">
        <h2 className="text-2xl font-semibold text-[#151515] tracking-tight mb-1">
          Choose a challenge
        </h2>
        <p className="text-sm text-[#838383] mb-8">
          Pick the one that pushes you without breaking you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {challenges.map((challenge, i) => (
            <ChallengeCard
              key={i}
              challenge={challenge}
              index={i}
              onSelect={() => onSelect(challenge)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

function ChallengeCard({
  challenge,
  index,
  onSelect,
}: {
  challenge: Challenge
  index: number
  onSelect: () => void
}) {
  return (
    <div className="flex flex-col border border-[#e8e8e8] rounded-[9px] p-5 hover:border-[#187adc] transition-colors duration-150 group">
      <div className="mb-3">
        <span className="text-xs font-medium text-[#838383] tracking-widest uppercase">
          Option {index + 1}
        </span>
      </div>

      <h3 className="text-base font-semibold text-[#151515] leading-snug mb-2">
        {challenge.title}
      </h3>
      <p className="text-sm text-[#838383] leading-relaxed mb-4 flex-1">
        {challenge.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {challenge.suggestedTools.map((tool) => (
          <span
            key={tool}
            className="text-xs text-[#151515] bg-[#f5f4f0] px-2 py-0.5 rounded-[5px]"
          >
            {tool}
          </span>
        ))}
      </div>

      <button
        onClick={onSelect}
        className="w-full py-2.5 border border-[#151515] text-[#151515] text-sm font-medium rounded-[5px] group-hover:bg-[#151515] group-hover:text-white transition-all duration-150"
      >
        Select
      </button>
    </div>
  )
}
