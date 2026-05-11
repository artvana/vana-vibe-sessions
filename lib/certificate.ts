import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export async function downloadCertificate(opts: {
  name: string
  challengeTitle: string
  level: number
  discipline: string
}) {
  const { name, challengeTitle, level, discipline } = opts
  const completedAt = new Date()

  const doc = await PDFDocument.create()
  const page = doc.addPage([841, 595])
  const { width, height } = page.getSize()

  const regular = await doc.embedFont(StandardFonts.Helvetica)
  const bold = await doc.embedFont(StandardFonts.HelveticaBold)

  const fg = rgb(0.082, 0.082, 0.082)
  const muted = rgb(0.514, 0.514, 0.514)
  const accent = rgb(0.094, 0.478, 0.863)
  const white = rgb(1, 1, 1)
  const border = rgb(0.91, 0.91, 0.91)

  page.drawRectangle({ x: 0, y: 0, width, height, color: white })
  page.drawRectangle({ x: 0, y: 0, width: 6, height, color: accent })
  page.drawRectangle({ x: 6, y: height - 3, width: width - 6, height: 3, color: fg })

  page.drawText('vana', { x: 48, y: height - 56, font: bold, size: 22, color: fg })
  page.drawText('VIBE SESSIONS  CERTIFICATE OF COMPLETION', {
    x: 48, y: height - 78, font: regular, size: 9, color: muted,
  })

  page.drawLine({ start: { x: 48, y: height - 100 }, end: { x: width - 48, y: height - 100 }, thickness: 1, color: border })

  page.drawText('Awarded to', { x: 48, y: height - 135, font: regular, size: 12, color: muted })

  const nameFontSize = name.length > 24 ? 38 : 46
  page.drawText(name, { x: 48, y: height - 185, font: bold, size: nameFontSize, color: fg })

  page.drawText('for completing', { x: 48, y: height - 230, font: regular, size: 13, color: muted })

  const titleFontSize = challengeTitle.length > 40 ? 18 : 22
  page.drawText(challengeTitle, {
    x: 48, y: height - 265, font: bold, size: titleFontSize, color: fg,
    maxWidth: width - 96, wordBreaks: [' '],
  })

  const pillLabel = `Level ${level}  ·  ${discipline}`
  const pillWidth = regular.widthOfTextAtSize(pillLabel, 11) + 24
  page.drawRectangle({
    x: 48, y: height - 320, width: pillWidth, height: 26,
    color: rgb(0.965, 0.957, 0.941), borderColor: border, borderWidth: 1,
  })
  page.drawText(pillLabel, { x: 60, y: height - 311, font: regular, size: 11, color: fg })

  const dateStr = completedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  page.drawText(`Completed ${dateStr}`, { x: 48, y: height - 365, font: regular, size: 11, color: muted })

  page.drawLine({ start: { x: 48, y: 72 }, end: { x: width - 48, y: 72 }, thickness: 1, color: border })
  page.drawText('Open Data Labs', { x: 48, y: 50, font: bold, size: 12, color: fg })
  page.drawText('Vana Vibe Sessions', { x: 48, y: 34, font: regular, size: 11, color: muted })
  page.drawRectangle({ x: width - 80, y: 34, width: 12, height: 12, color: accent })

  const bytes = await doc.save()
  const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'vana-vibe-certificate.pdf'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
