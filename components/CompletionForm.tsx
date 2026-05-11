'use client'

import { useState } from 'react'
import type { Challenge } from '@/lib/types'
import { downloadCertificate } from '@/lib/certificate'

interface Props {
  challenge: Challenge
  level: number
  discipline: string
  participantName: string
  onComplete: () => void
  onBack: () => void
}

export default function CompletionForm({
  challenge,
  level,
  discipline,
  participantName,
  onComplete,
  onBack,
}: Props) {
  const [buildUrl, setBuildUrl] = useState('')
  const [description, setDescription] = useState('')
  const [generating, setGenerating] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setGenerating(true)
    setError('')
    try {
      await downloadCertificate({
        name: participantName,
        challengeTitle: challenge.title,
        level,
        discipline,
      })
      onComplete()
      setDone(true)
    } catch {
      setError('Could not generate certificate. Try again.')
      setGenerating(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <div className="max-w-sm w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 border-2 border-[#187adc] flex items-center justify-center">
              <div className="w-5 h-5 bg-[#187adc]" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-[#151515] tracking-tight mb-2">
            Nicely done, {participantName}.
          </h2>
          <p className="text-sm text-[#838383]">
            Your certificate was downloaded. Check your downloads folder.
          </p>
        </div>
      </div>
    )
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
        <span className="text-lg font-semibold text-[#151515]">vana</span>
      </header>

      <main className="flex-1 px-6 py-10 max-w-2xl mx-auto w-full">
        <p className="text-xs font-medium text-[#838383] tracking-widest uppercase mb-2">
          Claim your certificate
        </p>
        <h2 className="text-2xl font-semibold text-[#151515] tracking-tight mb-1">
          Submit your build
        </h2>
        <p className="text-sm text-[#838383] mb-8">
          Hi {participantName}. Tell us what you built for{' '}
          <span className="text-[#151515]">{challenge.title}</span>.
        </p>

        <div className="p-4 bg-[#f5f4f0] border border-[#e8e8e8] rounded-[9px] mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-[#838383] border border-[#e8e8e8] bg-white px-2 py-0.5 rounded-[5px]">
              Level {level}
            </span>
            <span className="text-xs text-[#838383]">{discipline}</span>
          </div>
          <p className="text-sm font-semibold text-[#151515]">{challenge.title}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-medium text-[#151515] mb-1.5">
              Build URL{' '}
              <span className="text-[#838383] font-normal">(optional)</span>
            </label>
            <input
              type="url"
              value={buildUrl}
              onChange={(e) => setBuildUrl(e.target.value)}
              placeholder="https://your-build.vercel.app"
              className="w-full px-3 py-2.5 text-sm border border-[#e8e8e8] rounded-[5px] focus:outline-none focus:border-[#187adc] text-[#151515] placeholder-[#838383]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#151515] mb-1.5">
              What did you build?{' '}
              <span className="text-[#838383] font-normal">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you built and what you learned..."
              rows={4}
              className="w-full px-3 py-2.5 text-sm border border-[#e8e8e8] rounded-[5px] focus:outline-none focus:border-[#187adc] text-[#151515] placeholder-[#838383] resize-none"
            />
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={generating}
            className="w-full py-3 bg-[#151515] text-white text-sm font-medium rounded-[5px] hover:bg-[#187adc] transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {generating ? 'Generating certificate...' : 'Claim certificate'}
          </button>
        </form>
      </main>
    </div>
  )
}
