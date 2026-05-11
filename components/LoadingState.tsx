'use client'

interface Props {
  level: number
  discipline: string
}

export default function LoadingState({ level, discipline }: Props) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-xs">
        <Spinner />
        <p className="text-sm font-medium text-[#151515] mt-6 mb-1">
          Generating your challenges
        </p>
        <p className="text-xs text-[#838383]">
          Level {level} &middot; {discipline}
        </p>
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-8 h-8">
        <div
          className="absolute inset-0 border-2 border-[#187adc] opacity-100"
          style={{ animation: 'pulse-border 1.8s ease-in-out infinite' }}
        />
        <div className="absolute inset-[6px] bg-[#187adc]" />
      </div>
      <div className="flex gap-1.5 mt-1">
        <span className="dot-1 inline-block w-1.5 h-1.5 bg-[#151515] rounded-full" />
        <span className="dot-2 inline-block w-1.5 h-1.5 bg-[#151515] rounded-full" />
        <span className="dot-3 inline-block w-1.5 h-1.5 bg-[#151515] rounded-full" />
      </div>
    </div>
  )
}
