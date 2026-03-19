# Dotzza Brand Hub v9

A live brand hub that syncs directly from your Figma design tokens.

## Files

| File | Description |
|---|---|
| `index.html` | Main Brand Hub app — open this in your browser |
| `styles.css` | Extracted stylesheet (reference only) |
| `app.js` | Extracted JavaScript (reference only) |
| `tokens.css` | All 233 design tokens as CSS custom properties |
| `tokens.json` | All 233 design tokens in W3C Design Token Format |
| `README.md` | This file |

## Quick Start

1. Open `index.html` in any browser — no server needed
2. Paste your Figma token (see CMS Sync below) to enable live sync
3. Click **Sync Figma** in the topbar after changing any token in Figma

---

## Figma CMS Sync

### How it works
When you change a variable in Figma → click "Sync Figma" in Brand Hub → the change appears instantly.

### Setup (one-time)
1. Go to [figma.com](https://figma.com) → **Settings** → **Security** → **Personal access tokens**
2. Click **Generate new token**, give it a name, copy it
3. Open `index.html`, find this line:
   ```js
   const FIGMA_TOKEN = ''; // ← paste your token here
   ```
4. Paste your token between the quotes
5. Save + reload the browser

### What syncs automatically
| Figma Variable | CSS Property | Effect in Brand Hub |
|---|---|---|
| `logo/color` | `--logo` | All purple — buttons, nav, tags, borders |
| `color/brand/primary` | `--logo` (fallback) | Same as above if logo/color not set |
| `color/background/default` | `--bg` | Page white background |
| `color/background/subtle` | `--bg2` | Page bg (light gray) |
| `color/text/default` | `--text` | All headings |
| `color/text/secondary` | `--text2` | Body text |
| `color/border/default` | `--bdr` | Card borders |
| `font/family/body` | `--font` | All UI text font |
| `spacing/1`–`spacing/12` | `--sp1`–`--sp12` | All padding and gaps |
| `radius/md` | `--r6` | Buttons, inputs |
| `radius/lg` | `--r8` | Cards |
| All 76 primitives | `--p50`–`--g950` | Ramp values |

### How to change Logo Purple in Figma
The logo purple (`#8B72D8`) is now a real Figma variable:

1. Open Figma file `uI8BNPQtMWPVzJNI61o386`
2. Right panel → **Variables** → `🎨 A. Color Primitives`
3. Find `logo/color` → click the color swatch → change to any color
4. Switch to Brand Hub → click **Sync Figma** → done!

---

## Navigation

### Sidebar Groups
| Group | Sections |
|---|---|
| **Assets** | Logo, Colors & Gradients, Typography, Screenshots, Artwork |
| **Sub Brands** | Dotzza Main, + Add sub brand |
| **Tools** | Email Signature, New Team Member |
| **Resources** | Templates, Brand Voice, Inspiration |
| **Engineering** | UI Style, Token Export |

### Mode Switcher (top-right)
- **Branding** — shows all branding sections
- **Engineering** — shows UI Style + Token Export + shared tokens

---

## Logo Structure

| Category | Variants |
|---|---|
| **Lockup** | Primary (light bg), Inverted (dark bg), Dark (monochrome) |
| **Logomark** | Primary (purple icon), Monochrome (black), Inverted (white on dark) |
| **Wordmark** | Primary (purple text), Light (white text), Dark (black text) |

Each card has: **SVG + PNG + PDF** download chips + **↑ Import** button

---

## Token Files

### `tokens.css`
Import in any project:
```css
@import 'tokens.css';

.button {
  background: var(--logo);
  border-radius: var(--r6);
  padding: var(--sp2) var(--sp4);
  font-family: var(--font);
}
```

### `tokens.json`
W3C Design Token Format — works with:
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [Token Studio](https://tokens.studio/)
- Any W3C-compatible tool

---

## Figma File

- **File:** Dotzza-UI files (Copy)
- **Key:** `uI8BNPQtMWPVzJNI61o386`
- **Brand Hub Page:** `❖ Brand Hub` (Page 36, node 2017:2)
- **Variables:** 233 tokens across 6 collections
  - 🎨 A. Color Primitives (76)
  - 🧩 B. Color Semantics (58)
  - ✏️ C. Typography (36)
  - 📐 D. Spacing (22)
  - ⬛ E. Radius (23)
  - 🌫️ F. Shadows (18)

---

*Built with Claude · Dotzza 2026*
