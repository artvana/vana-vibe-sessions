import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
      }}
    >
      <span
        style={{
          fontSize: 26,
          fontWeight: 900,
          color: '#187adc',
          lineHeight: 1,
          fontFamily: 'sans-serif',
        }}
      >
        V
      </span>
    </div>,
    { width: 32, height: 32 }
  )
}
