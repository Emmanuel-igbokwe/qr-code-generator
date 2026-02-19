
# QR Code Generator (React + Vite)

A lightweight React app to generate QR codes for **URLs**, **free text**, and **contact cards (vCard)**. 

- Generates high-quality QR codes on a `<canvas>` and as **SVG** for crisp printing.
- **Download** as PNG or SVG.
- **URL-safe**: If a user enters `example.com`, the app normalizes it to `https://example.com` so most phone scanners open the site directly instead of searching the text.
- **vCard 3.0** output for contact info to maximize compatibility across scanners.

## Quick start

```bash
# 1) Install
npm install

# 2) Run dev server
npm run dev

# 3) Build for production
npm run build
npm run preview
```

## Why some scanners "search" a URL instead of opening it
Scanners reliably open a link when the QR encodes a **fully-qualified URL** with a scheme (e.g., `https://`). If you encode plain text like `example.com` without a scheme, many scanners treat it as generic text and may search it. This app automatically normalizes URL inputs to include `https://` (unless you already provided a scheme), which helps cameras open the link directly.

## Features
- URL mode: normalizes input to `https://` (or preserves your scheme if given).
- Text mode: encode any text as-is.
- Contact mode: generates a **vCard 3.0** string with fields for name, phone, email, organization, title, website, and address.
- Controls for **error correction**, **size**, and **quiet zone** (margin).
- One-click **Download PNG** and **Download SVG**.

## Tech stack
- React 18
- Vite 5
- [`qrcode` npm package](https://www.npmjs.com/package/qrcode) to render canvas & SVG strings

## vCard fields supported
- **Name** (First, Last)
- **Organization**
- **Title**
- **Phone** (CELL)
- **Email**
- **Website**
- **Address** (Street, City, Region/State, Postal code, Country)

## Notes
- Error correction defaults to `M`. For logos or denser data, consider `Q` or `H`, but keep in mind that very long text/vCards may require a larger QR size.
- SVG downloads are perfect for high-resolution printing.

## License
MIT
