'use client'

import { useState } from 'react'
import type { Challenge } from '@/lib/types'

interface Props {
  challenge: Challenge
  level: number
  discipline: string
  alreadyStarted: boolean
  onStartBuilding: (name: string) => void
  onComplete: () => void
  onBack: () => void
}

export default function ChallengeBrief({
  challenge,
  level,
  discipline,
  alreadyStarted,
  onStartBuilding,
  onComplete,
  onBack,
}: Props) {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    onStartBuilding(name.trim())
  }

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
          <span className="text-xs text-[#838383] border border-[#e8e8e8] px-2 py-0.5 rounded-[5px]">Level {level}</span>
          <span className="text-xs text-[#838383]">{discipline}</span>
        </div>
        <span className="text-lg font-semibold text-[#151515]">vana</span>
      </header>

      <main className="flex-1 px-6 py-10 max-w-2xl mx-auto w-full">
        <div className="mb-8">
          <div className="mb-3">
            <span className="text-xs font-medium text-[#838383] tracking-widest uppercase">
              Your Challenge
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#151515] tracking-tight leading-tight mb-3">
            {challenge.title}
          </h1>
          <p className="text-sm text-[#838383] leading-relaxed">
            {challenge.description}
          </p>
        </div>

        <hr className="border-[#e8e8e8] mb-8" />

        <Section title="Success Criteria">
          <ul className="flex flex-col gap-2">
            {challenge.successCriteria.map((c, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#151515]">
                <span className="mt-0.5 flex-shrink-0 w-4 h-4 border border-[#e8e8e8] rounded-[3px]" />
                {c}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Suggested Tools">
          <div className="flex flex-wrap gap-2">
            {challenge.suggestedTools.map((tool) => (
              <span key={tool} className="text-sm text-[#151515] bg-[#f5f4f0] border border-[#e8e8e8] px-3 py-1 rounded-[5px]">
                {tool}
              </span>
            ))}
          </div>
        </Section>

        {challenge.vanaHook && (
          <Section title="Vana Integration">
            <div className="flex items-start gap-3 p-4 bg-[#f0f7ff] border border-[#c5ddf8] rounded-[9px]">
              <div className="flex-shrink-0 w-2 h-2 bg-[#187adc] mt-1.5" />
              <p className="text-sm text-[#151515] leading-relaxed">{challenge.vanaHook}</p>
            </div>
          </Section>
        )}

        <hr className="border-[#e8e8e8] mb-8" />

        {alreadyStarted ? (
          <button
            onClick={onComplete}
            className="w-full py-3 bg-[#151515] text-white text-sm font-medium rounded-[5px] hover:bg-[#187adc] transition-colors duration-150"
          >
            Submit my build
          </button>
        ) : showForm ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-[#151515] mb-1.5">
                Your name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                autoFocus
                required
                className="w-full px-3 py-2.5 text-sm border border-[#e8e8e8] rounded-[5px] focus:outline-none focus:border-[#187adc] text-[#151515] placeholder-[#838383]"
              />
            </div>
            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full py-3 bg-[#151515] text-white text-sm font-medium rounded-[5px] hover:bg-[#187adc] transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              I'm building this
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-xs text-[#838383] hover:text-[#151515] transition-colors text-center"
            >
              Cancel
            </button>
          </form>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="w-full py-3 bg-[#151515] text-white text-sm font-medium rounded-[5px] hover:bg-[#187adc] transition-colors duration-150"
          >
            I'm building this
          </button>
        )}
      </main>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xs font-medium text-[#838383] tracking-widest uppercase mb-3">{title}</h2>
      {children}
    </div>
  )
}
