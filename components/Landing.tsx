'use client'

interface Props {
  onStart: () => void
  onResume: () => void
  hasSession: boolean
  sessionName?: string | null
}

export default function Landing({ onStart, onResume, hasSession, sessionName }: Props) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="px-6 py-5 border-b border-[#e8e8e8] flex items-center justify-between">
        <VanaWordmark />
        <span className="text-xs text-[#838383] tracking-widest uppercase">
          Vibe Sessions
        </span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-sm w-full">
          <div className="mb-2">
            <GeometricAccent />
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-[#151515] tracking-tight leading-tight mb-4">
            Challenge Matrix
          </h1>
          <p className="text-sm text-[#838383] leading-relaxed mb-10">
            Pick your level. Pick your discipline. Build something real.
          </p>

          <div className="flex flex-col items-center gap-3">
            <button
              onClick={onStart}
              className="w-full py-3 bg-[#151515] text-white text-sm font-medium tracking-wide hover:bg-[#187adc] transition-colors duration-150 rounded-[5px]"
            >
              Start
            </button>

            {hasSession && (
              <button
                onClick={onResume}
                className="text-sm text-[#838383] hover:text-[#151515] transition-colors duration-150 underline underline-offset-2"
              >
                Continue{sessionName ? ` (${sessionName})` : ' your challenge'}
              </button>
            )}
          </div>
        </div>
      </main>

      <footer className="px-6 py-4 border-t border-[#e8e8e8]">
        <p className="text-xs text-[#838383] text-center">
          Open Data Labs &times; Vana
        </p>
      </footer>
    </div>
  )
}

function VanaWordmark() {
  return (
    <span className="text-lg font-semibold text-[#151515] tracking-tight">
      vana
    </span>
  )
}

function GeometricAccent() {
  return (
    <div className="flex items-center justify-center gap-1.5 mb-6">
      <div className="w-2 h-2 bg-[#187adc]" />
      <div className="w-2 h-2 border border-[#e8e8e8]" />
      <div className="w-2 h-2 border border-[#e8e8e8]" />
    </div>
  )
}
