export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-xs font-medium text-[#838383] tracking-widest uppercase mb-3">404</p>
        <h1 className="text-2xl font-semibold text-[#151515] tracking-tight mb-2">Page not found</h1>
        <a href="/" className="text-sm text-[#838383] hover:text-[#151515] underline underline-offset-2 transition-colors">
          Back to home
        </a>
      </div>
    </div>
  )
}
