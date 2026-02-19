
import React, { useEffect, useMemo, useState } from 'react'

function normalizeUrl(input) {
  const raw = (input || '').trim()
  if (!raw) return ''
  try {
    // If user omitted scheme, default to https:// to encourage direct open on scanners
    const withScheme = /:\/\//.test(raw) ? raw : `https://${raw}`
    const u = new URL(withScheme)
    return u.toString()
  } catch (e) {
    // If URL constructor fails, return original to surface invalid input visibly
    return raw
  }
}

export default function UrlForm({ onChange }) {
  const [url, setUrl] = useState('')
  const normalized = useMemo(() => normalizeUrl(url), [url])

  useEffect(() => {
    onChange(normalized)
  }, [normalized, onChange])

  return (
    <div className="panel">
      <label>Website URL</label>
      <input
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="e.g. https://contoso.com or contoso.com"
        inputMode="url"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />
      <div className="help">Tip: If you type a domain without a scheme, we'll encode it as <code>https://</code> so cameras open it directly instead of searching.</div>
      {normalized && normalized !== url && (
        <div className="help">Normalized: <code>{normalized}</code></div>
      )}
    </div>
  )
}
