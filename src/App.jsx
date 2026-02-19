
import React, { useMemo, useState } from 'react'
import UrlForm from './components/UrlForm'
import TextForm from './components/TextForm'
import ContactForm from './components/ContactForm'
import QRCodeCanvas from './components/QRCodeCanvas'

const MODES = [{key:'url', label:'URL'}, {key:'text', label:'Text'}, {key:'contact', label:'Contact (vCard)'}]

export default function App() {
  const [mode, setMode] = useState('url')
  const [qrValue, setQrValue] = useState('')

  const [text, setText] = useState('')
  const [size, setSize] = useState(320)
  const [margin, setMargin] = useState(4)
  const [ecLevel, setEcLevel] = useState('M')

  const contentPanel = useMemo(() => {
    if (mode === 'url') return <UrlForm onChange={setQrValue} />
    if (mode === 'text') return <TextForm text={text} setText={(t)=>{ setText(t); setQrValue(t) }} />
    if (mode === 'contact') return <ContactForm onChange={setQrValue} />
    return null
  }, [mode, text])

  return (
    <div className="container">
      <div className="header">
        <div>
          <div className="title">QR Code Generator</div>
          <div className="subtitle">Create QR codes for URLs, free text, and contact cards (vCard). Download as PNG or SVG.</div>
        </div>
        <div className="tabs" role="tablist">
          {MODES.map(m => (
            <button key={m.key} className={`tab ${mode===m.key?'active':''}`} onClick={()=>setMode(m.key)} role="tab" aria-selected={mode===m.key}>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="row" style={{marginTop: 16}}>
        <div>
          {contentPanel}
          <div className="panel" style={{marginTop: 16}}>
            <div className="controls">
              <div>
                <label>Size (px)</label>
                <input type="range" min="192" max="640" step="16" value={size} onChange={e=>setSize(parseInt(e.target.value))} />
                <div className="help">{size}px</div>
              </div>
              <div>
                <label>Quiet zone (margin)</label>
                <input type="range" min="0" max="16" step="1" value={margin} onChange={e=>setMargin(parseInt(e.target.value))} />
                <div className="help">{margin}px</div>
              </div>
              <div>
                <label>Error correction</label>
                <select value={ecLevel} onChange={e=>setEcLevel(e.target.value)}>
                  <option value="L">L (7%)</option>
                  <option value="M">M (15%)</option>
                  <option value="Q">Q (25%)</option>
                  <option value="H">H (30%)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div>
          <QRCodeCanvas value={qrValue} size={size} margin={margin} ecLevel={ecLevel} />
        </div>
      </div>

      <div className="footer">Pro tip: Use fully-qualified links (e.g., https://example.com). This helps cameras open the page directly rather than searching the text.</div>
    </div>
  )
}
