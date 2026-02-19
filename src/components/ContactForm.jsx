
import React, { useEffect, useMemo, useState } from 'react'
import { buildVCard } from '../utils/vcard'

function normalizeUrlMaybe(url) {
  if (!url) return ''
  try {
    const withScheme = /:\/\//.test(url) ? url : `https://${url}`
    return new URL(withScheme).toString()
  } catch (e) {
    return url
  }
}

export default function ContactForm({ onChange }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [org, setOrg] = useState('')
  const [title, setTitle] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [url, setUrl] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [postal, setPostal] = useState('')
  const [country, setCountry] = useState('')

  const vcard = useMemo(() => {
    const normalizedUrl = normalizeUrlMaybe(url)
    return buildVCard({ firstName, lastName, org, title, phone, email, url: normalizedUrl, street, city, region, postal, country })
  }, [firstName, lastName, org, title, phone, email, url, street, city, region, postal, country])

  useEffect(() => { onChange(vcard) }, [vcard, onChange])

  return (
    <div className="panel">
      <div className="row">
        <div>
          <label>First name</label>
          <input value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="Ada" />
        </div>
        <div>
          <label>Last name</label>
          <input value={lastName} onChange={e=>setLastName(e.target.value)} placeholder="Lovelace" />
        </div>
      </div>
      <div className="row">
        <div>
          <label>Organization</label>
          <input value={org} onChange={e=>setOrg(e.target.value)} placeholder="Contoso" />
        </div>
        <div>
          <label>Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Engineer" />
        </div>
      </div>
      <div className="row">
        <div>
          <label>Phone (cell)</label>
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 123 4567" inputMode="tel" />
        </div>
        <div>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@example.com" inputMode="email" />
        </div>
      </div>
      <div>
        <label>Website</label>
        <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://example.com" inputMode="url" />
        {url && !/:\/\//.test(url) && (
          <div className="help">Tip: We'll encode this as an <code>https://</code> link to ensure scanners open it.</div>
        )}
      </div>

      <hr />
      <div className="row">
        <div>
          <label>Street</label>
          <input value={street} onChange={e=>setStreet(e.target.value)} placeholder="123 Main St" />
        </div>
        <div>
          <label>City</label>
          <input value={city} onChange={e=>setCity(e.target.value)} placeholder="New Orleans" />
        </div>
      </div>
      <div className="row">
        <div>
          <label>Region / State</label>
          <input value={region} onChange={e=>setRegion(e.target.value)} placeholder="LA" />
        </div>
        <div>
          <label>Postal code</label>
          <input value={postal} onChange={e=>setPostal(e.target.value)} placeholder="70112" />
        </div>
      </div>
      <div>
        <label>Country</label>
        <input value={country} onChange={e=>setCountry(e.target.value)} placeholder="USA" />
      </div>
    </div>
  )
}
