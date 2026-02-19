
import React, { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'

export default function QRCodeCanvas({ value, size = 320, margin = 4, ecLevel = 'M' }) {
  const canvasRef = useRef(null)
  const [svgText, setSvgText] = useState('')

  useEffect(() => {
    if (!value) return
    const canvas = canvasRef.current
    const opts = { width: size, margin, errorCorrectionLevel: ecLevel }
    QRCode.toCanvas(canvas, value, opts, (err) => {
      if (err) console.error(err)
    })
    QRCode.toString(value, { type: 'svg', errorCorrectionLevel: ecLevel, margin }, (err, svg) => {
      if (!err) setSvgText(svg)
    })
  }, [value, size, margin, ecLevel])

  const downloadPNG = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const href = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = href
    a.download = 'qr-code.png'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const downloadSVG = () => {
    if (!svgText) return
    const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'qr-code.svg'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  if (!value) return (
    <div className="qr-wrap">
      <div className="qr-note">Enter content to generate a QR code.</div>
    </div>
  )

  return (
    <div className="panel">
      <div className="qr-wrap">
        <canvas ref={canvasRef} width={size} height={size} />
      </div>
      <div className="button-row" style={{justifyContent:'center'}}>
        <button onClick={downloadPNG}>Download PNG</button>
        <button className="secondary" onClick={downloadSVG}>Download SVG</button>
      </div>
    </div>
  )
}
