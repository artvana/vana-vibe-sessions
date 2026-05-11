'use client'

import { useState, useEffect } from 'react'
import Landing from '@/components/Landing'
import LevelSelector from '@/components/LevelSelector'
import DisciplineSelector from '@/components/DisciplineSelector'
import LoadingState from '@/components/LoadingState'
import ChallengeCards from '@/components/ChallengeCards'
import ChallengeBrief from '@/components/ChallengeBrief'
import CompletionForm from '@/components/CompletionForm'
import type { Screen, Challenge, Session } from '@/lib/types'

const SESSION_KEY = 'vana-vibe-session'

interface AppState {
  screen: Screen
  level: number | null
  discipline: string | null
  challenges: Challenge[]
  selectedChallenge: Challenge | null
  participantId: string | null
  participantName: string | null
  savedSession: Session | null
  error: string | null
}

const initial: AppState = {
  screen: 'landing',
  level: null,
  discipline: null,
  challenges: [],
  selectedChallenge: null,
  participantId: null,
  participantName: null,
  savedSession: null,
  error: null,
}

export default function Home() {
  const [state, setState] = useState<AppState>(initial)

  function patch(partial: Partial<AppState>) {
    setState((prev) => ({ ...prev, ...partial }))
  }

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY)
      if (raw) {
        const session: Session = JSON.parse(raw)
        patch({ savedSession: session })
      }
    } catch {
      // ignore corrupt storage
    }
  }, [])

  function saveSession(session: Session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    patch({ savedSession: session })
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY)
    patch({ savedSession: null })
  }

  // ── Handlers ──────────────────────────────────────────────

  function handleStart() {
    patch({ screen: 'level', error: null })
  }

  function handleResume() {
    const s = state.savedSession
    if (!s) return
    patch({
      screen: 'completion',
      participantId: s.participantId,
      participantName: s.name,
      selectedChallenge: s.challengeData,
      level: s.level,
      discipline: s.discipline,
    })
  }

  function handleLevelSelect(level: number) {
    patch({ level, screen: 'discipline' })
  }

  async function handleDisciplineSelect(discipline: string) {
    const { level } = state
    if (!level) return
    patch({ discipline, screen: 'loading', error: null })

    try {
      const res = await fetch('/api/challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level, discipline }),
      })

      if (!res.ok) throw new Error('API error')
      const { challenges } = await res.json()
      patch({ challenges, screen: 'challenges' })
    } catch {
      patch({
        screen: 'discipline',
        error: 'Failed to generate challenges. Please try again.',
      })
    }
  }

  function handleChallengeSelect(challenge: Challenge) {
    patch({ selectedChallenge: challenge, screen: 'brief' })
  }

  function handleStartBuilding(name: string) {
    const { level, discipline, selectedChallenge } = state
    if (!level || !discipline || !selectedChallenge) return

    const session: Session = {
      participantId: crypto.randomUUID(),
      name,
      level,
      discipline,
      challengeData: selectedChallenge,
    }
    saveSession(session)
    patch({ participantId: session.participantId, participantName: name, screen: 'building' })
  }

  function handleComplete() {
    clearSession()
  }

  // ── Screen routing ─────────────────────────────────────────

  const { screen, level, discipline, challenges, selectedChallenge } = state

  if (screen === 'landing') {
    return (
      <Landing
        onStart={handleStart}
        onResume={handleResume}
        hasSession={!!state.savedSession}
        sessionName={state.savedSession?.name}
      />
    )
  }

  if (screen === 'level') {
    return <LevelSelector onSelect={handleLevelSelect} onBack={() => patch({ screen: 'landing' })} />
  }

  if (screen === 'discipline') {
    return (
      <>
        <DisciplineSelector
          level={level!}
          onSelect={handleDisciplineSelect}
          onBack={() => patch({ screen: 'level' })}
        />
        {state.error && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#151515] text-white text-xs px-4 py-2 rounded-[5px]">
            {state.error}
          </div>
        )}
      </>
    )
  }

  if (screen === 'loading') {
    return <LoadingState level={level!} discipline={discipline!} />
  }

  if (screen === 'challenges') {
    return (
      <ChallengeCards
        challenges={challenges}
        level={level!}
        discipline={discipline!}
        onSelect={handleChallengeSelect}
        onBack={() => patch({ screen: 'discipline' })}
      />
    )
  }

  if (screen === 'brief') {
    return (
      <ChallengeBrief
        challenge={selectedChallenge!}
        level={level!}
        discipline={discipline!}
        alreadyStarted={!!state.participantId}
        onStartBuilding={handleStartBuilding}
        onComplete={() => patch({ screen: 'completion' })}
        onBack={() => patch({ screen: 'challenges' })}
      />
    )
  }

  if (screen === 'building') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <div className="max-w-sm w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 bg-[#187adc]" />
              <div className="w-3 h-3 bg-[#e8e8e8]" />
              <div className="w-3 h-3 bg-[#e8e8e8]" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-[#151515] tracking-tight mb-2">
            You're in.
          </h2>
          <p className="text-sm text-[#838383] mb-2">
            Go build{state.participantName ? `, ${state.participantName}` : ''}.
          </p>
          <p className="text-xs text-[#838383] mb-8 border border-[#e8e8e8] rounded-[9px] px-4 py-3 bg-[#f5f4f0]">
            {selectedChallenge?.title}
          </p>
          <p className="text-xs text-[#838383] mb-8">
            Come back here when you're done to claim your certificate.
          </p>
          <button
            onClick={() => patch({ screen: 'completion' })}
            className="text-sm text-[#838383] hover:text-[#151515] transition-colors underline underline-offset-2"
          >
            Submit my build now
          </button>
        </div>
      </div>
    )
  }

  if (screen === 'completion') {
    const challenge = selectedChallenge ?? state.savedSession!.challengeData
    const lvl = level ?? state.savedSession!.level
    const disc = discipline ?? state.savedSession!.discipline
    const name = state.participantName ?? state.savedSession!.name

    return (
      <CompletionForm
        challenge={challenge}
        level={lvl}
        discipline={disc}
        participantName={name}
        onComplete={handleComplete}
        onBack={() => patch({ screen: 'brief' })}
      />
    )
  }

  return null
}
