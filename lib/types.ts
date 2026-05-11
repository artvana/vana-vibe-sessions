export type Screen =
  | 'landing'
  | 'level'
  | 'discipline'
  | 'loading'
  | 'challenges'
  | 'brief'
  | 'start-form'
  | 'building'
  | 'completion'

export interface Challenge {
  title: string
  description: string
  estimatedTime: string
  suggestedTools: string[]
  successCriteria: string[]
  vanaHook: string | null
}

export interface Session {
  participantId: string
  name: string
  level: number
  discipline: string
  challengeData: Challenge
}

export const LEVEL_DEFS = [
  {
    level: 1,
    name: 'Beginner',
    description: 'No coding. Single AI tool.',
  },
  {
    level: 2,
    name: 'Confident User',
    description: 'Multi-step prompting. Combining tools.',
  },
  {
    level: 3,
    name: 'Builder',
    description: 'First coding via vibe coding tools (Cursor, Lovable, Bolt).',
  },
  {
    level: 4,
    name: 'Advanced',
    description: 'Real engineering. APIs, databases, deployment.',
  },
  {
    level: 5,
    name: 'Expert',
    description: 'Production-ready multi-component systems.',
  },
] as const

export const DISCIPLINES = [
  'Marketing',
  'Engineering',
  'Policy',
  'Government Services',
  'Environment',
  'Communications',
  'Finance',
  'Operations',
  'Legal',
  'Healthcare',
  'Education',
  'Research',
  'Product / Design',
  'HR / People Ops',
] as const

export type Discipline = (typeof DISCIPLINES)[number]
