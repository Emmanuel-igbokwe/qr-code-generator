
import React from 'react'

export default function TextForm({ text, setText }) {
  return (
    <div className="panel">
      <label>Text to encode</label>
      <textarea
        rows={6}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type any text..."
      />
      <div className="help">This will be encoded exactly as entered.</div>
    </div>
  )
}
