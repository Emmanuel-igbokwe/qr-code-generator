// src/utils/vcard.js
function esc(value = '') {
  // Escape backslashes, commas, and semicolons per vCard specs
  return String(value)
    .replace(/\\/g, "\\\\")  // \  -> \\
    .replace(/,/g, "\\,")    // ,  -> \,
    .replace(/;/g, "\\;")    // ;  -> \;
}

export function buildVCard({
  firstName = '',
  lastName = '',
  org = '',
  title = '',
  phone = '',
  email = '',
  url = '',
  street = '',
  city = '',
  region = '',
  postal = '',
  country = ''
} = {}) {
  const N = `${esc(lastName)};${esc(firstName)};;;`
  const FN = [firstName, lastName].filter(Boolean).join(' ')
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${N}`,
    `FN:${esc(FN)}`
  ]

  if (org) lines.push(`ORG:${esc(org)}`)
  if (title) lines.push(`TITLE:${esc(title)}`)
  if (phone) lines.push(`TEL;TYPE=CELL:${esc(phone)}`)
  if (email) lines.push(`EMAIL;TYPE=INTERNET:${esc(email)}`)
  if (url) lines.push(`URL:${esc(url)}`)

  const hasAddress = street || city || region || postal || country
  if (hasAddress) {
    // ADR;TYPE=WORK:PO-Box;Extended;Street;City;Region;Postal;Country
    const adr = ['', '', esc(street), esc(city), esc(region), esc(postal), esc(country)].join(';')
    lines.push(`ADR;TYPE=WORK:${adr}`)
  }

  lines.push('END:VCARD')
  return lines.join('\n')
}