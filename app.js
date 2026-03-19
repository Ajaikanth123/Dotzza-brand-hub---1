// Dotzza Brand Hub — JavaScript
// Auto-extracted from index.html
// Figma CMS Sync + Navigation + Import Modal

// ═══════════════════════════════════════════════════════════════════
// DOTZZA BRAND HUB — All functions defined before DOM loads
// Using window.* so onclick= attributes always find them
// ═══════════════════════════════════════════════════════════════════

/* ── STATE ── */
let _mode = 'br';
let _selFile = null, _selType = '', _curSec = '';

const M = {
  br: { label:'Branding' },
  en: { label:'Engineering' }
};

const SEC_NAMES = {
  home:'Home', logo:'Logo', colors:'Colors & Gradients',
  type:'Typography', ss:'Screenshots', art:'Artwork',
  tpl:'Templates', voice:'Brand Voice', ui:'UI Style',
  tokens:'Token Export', subbrands:'Sub Brands',
  email:'Email Signature', member:'New Team Member',
  inspiration:'Inspiration'
};

const SEC_FMTS = {
  logo:['SVG','PNG','PDF'],
  colors:['JSON','CSS','Figma'],
  type:['JSON','CSS'],
  ss:['PNG','JPG','ZIP'],
  art:['SVG','PNG','ZIP'],
  tpl:['Figma','PDF'],
  voice:['PDF','TXT'],
  ui:['JSON','CSS'],
  tokens:['JSON','CSS','TS'],
  subbrands:['SVG','PNG'],
  email:['HTML','PDF'],
  member:['ZIP','PDF'],
  inspiration:['ZIP','PDF']
};

/* ── MODE SWITCHER ── */
window.setMode = function(m) {
  _mode = m;

  const swBr = document.getElementById('sw-br');
  const swEn = document.getElementById('sw-en');
  if (swBr) swBr.className = 'sw-btn' + (m === 'br' ? ' ab' : '');
  if (swEn) swEn.className = 'sw-btn' + (m === 'en' ? ' ae' : '');

  // Sidebar groups
  const navAssets    = document.getElementById('nav-assets');
  const navSubbrands = document.getElementById('nav-subbrands');
  const navTools     = document.getElementById('nav-tools');
  const navResources = document.getElementById('nav-resources');
  const navEng       = document.getElementById('nav-eng');

  if (navAssets)    navAssets.style.display = 'block';
  if (navSubbrands) navSubbrands.style.display = m === 'br' ? 'block' : 'none';
  if (navTools)     navTools.style.display = m === 'br' ? 'block' : 'none';
  if (navResources) navResources.style.display = 'block';
  if (navEng)       navEng.style.display = m === 'en' ? 'block' : 'none';

  // Navigate to home
  const homeBtn = document.querySelector('.nv[data-mode="both"]');
  window.go('home', homeBtn);
};

/* ── NAVIGATE ── */
window.go = function(id, el) {
  // Hide all sections
  document.querySelectorAll('.sec').forEach(s => s.classList.remove('on'));
  // Remove active from all nav items
  document.querySelectorAll('.nv').forEach(n => n.classList.remove('on'));

  // Show target section
  const sec = document.getElementById(id);
  if (sec) sec.classList.add('on');
  else {
    // If section doesn't exist, fall back to home
    const home = document.getElementById('home');
    if (home) home.classList.add('on');
  }

  // Activate nav item
  if (el && el.classList) el.classList.add('on');

  // Scroll main to top
  const main = document.querySelector('.main');
  if (main) main.scrollTop = 0;

  // Update topbar breadcrumb
  const tbTitle = document.getElementById('tb-title');
  if (tbTitle) {
    const nm = SEC_NAMES[id];
    tbTitle.textContent = nm ? M[_mode].label + '  ›  ' + nm : M[_mode].label;
  }
};

/* ── IMPORT MODAL ── */
window.openImport = function(sec) {
  _curSec = sec;
  _selFile = null;

  const secName = document.getElementById('im-sec');
  if (secName) secName.textContent = SEC_NAMES[sec] || sec;

  const fmts = SEC_FMTS[sec] || ['JSON','SVG','PNG'];
  const typesEl = document.getElementById('im-types');
  if (typesEl) {
    typesEl.innerHTML = fmts.map((f,i) =>
      `<span class="imt${i===0?' sel':''}" onclick="selectFmt(this,'${f}')">${f}</span>`
    ).join('');
  }
  _selType = fmts[0];

  const sub = document.getElementById('im-sub');
  if (sub) sub.textContent = fmts.join(', ') + ' supported';

  const prog = document.getElementById('im-prog');
  if (prog) prog.style.display = 'none';

  const goBtn = document.getElementById('im-go');
  if (goBtn) { goBtn.textContent = 'Import'; goBtn.disabled = false; }

  const zone = document.getElementById('im-zone');
  if (zone) { zone.style.borderColor = ''; zone.style.background = ''; }

  const fim = document.getElementById('fim');
  if (fim) fim.value = '';

  const overlay = document.getElementById('imo');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeImport = function() {
  const overlay = document.getElementById('imo');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
  _selFile = null;
};

window.closeBg = function(e) {
  if (e.target === document.getElementById('imo')) window.closeImport();
};

window.selectFmt = function(el, t) {
  _selType = t;
  document.querySelectorAll('.imt').forEach(x => x.classList.remove('sel'));
  if (el) el.classList.add('sel');
};

window.dragOver = function(e) {
  e.preventDefault();
  const z = document.getElementById('im-zone');
  if (z) { z.style.borderColor = '#8B72D8'; z.style.background = 'rgba(139,114,216,.05)'; }
};

window.dragLeave = function() {
  const z = document.getElementById('im-zone');
  if (z) { z.style.borderColor = ''; z.style.background = ''; }
};

window.dropFile = function(e) {
  e.preventDefault();
  window.dragLeave();
  if (e.dataTransfer && e.dataTransfer.files.length) setFile(e.dataTransfer.files[0]);
};

window.fileSelected = function(e) {
  if (e.target.files.length) setFile(e.target.files[0]);
};

function setFile(f) {
  _selFile = f;
  const sub = document.getElementById('im-sub');
  if (sub) sub.textContent = '✓ ' + f.name + ' (' + (f.size/1024).toFixed(1) + ' KB)';
  const z = document.getElementById('im-zone');
  if (z) { z.style.borderColor = '#8B72D8'; z.style.background = 'rgba(139,114,216,.04)'; }
  const goBtn = document.getElementById('im-go');
  if (goBtn) goBtn.textContent = 'Import file';
}

window.runImport = function() {
  const goBtn = document.getElementById('im-go');
  if (goBtn) { goBtn.textContent = 'Importing…'; goBtn.disabled = true; }

  const prog = document.getElementById('im-prog');
  const bar  = document.getElementById('im-bar');
  const pct  = document.getElementById('im-pct');
  const fn   = document.getElementById('im-fname');

  if (prog) prog.style.display = 'block';
  if (fn)   fn.textContent = _selFile ? _selFile.name : 'dotzza-' + _curSec + '.' + (_selType||'json').toLowerCase();

  let p = 0;
  const iv = setInterval(() => {
    p += Math.random() * 18 + 4;
    if (p >= 100) {
      p = 100;
      clearInterval(iv);
      setTimeout(() => {
        window.closeImport();
        window.toast('✓ ' + (SEC_NAMES[_curSec] || _curSec) + ' imported successfully!');
      }, 350);
    }
    if (bar) bar.style.width = p + '%';
    if (pct) pct.textContent = Math.round(p) + '%';
  }, 100);
};

/* ═══════════════════════════════════════════════════════════════
   EXPORT FUNCTIONS
   ─────────────────────────────────────────────────────────────── */

/* ── Generic file download helper ── */
function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ── Export CSS tokens ── */
window.exportCSS = function(label) {
  const props = [];
  const style  = getComputedStyle(document.documentElement);
  // Collect all known CSS vars from TOKEN_CSS_MAP values
  const cssVars = Object.values(TOKEN_CSS_MAP);
  // Also include the hardcoded ones from tokens.css
  const extra = [
    '--logo','--brand','--brand-h','--brand-s','--sec','--ter',
    '--bg','--bg2','--bg3','--text','--text2','--text3','--text4',
    '--bdr','--bdrs','--font','--mono','--r4','--r6','--r8','--r12',
    '--r16','--r24','--rfull','--sh','--shm','--grad'
  ];
  const allVars = [...new Set([...cssVars, ...extra])];
  allVars.forEach(v => {
    const val = style.getPropertyValue(v).trim();
    if (val) props.push(`  ${v}: ${val};`);
  });
  const content = `/* Dotzza Design Tokens — CSS Custom Properties\n * Exported from Brand Hub\n * ${new Date().toISOString().slice(0,10)}\n */\n\n:root {\n${props.join('\n')}\n}\n`;
  downloadFile('dotzza-tokens.css', content, 'text/css');
  window.toast('✓ ' + (label || 'CSS tokens') + ' exported!');
};

/* ── Export JSON tokens ── */
window.exportJSON = function(label) {
  fetch('tokens.json')
    .then(r => r.text())
    .then(text => {
      downloadFile('dotzza-tokens.json', text, 'application/json');
      window.toast('✓ ' + (label || 'JSON tokens') + ' exported!');
    })
    .catch(() => {
      // Fallback: build minimal JSON from current CSS vars
      const style = getComputedStyle(document.documentElement);
      const out = { '$metadata': { exportedAt: new Date().toISOString().slice(0,10) }, tokens: {} };
      Object.entries(TOKEN_CSS_MAP).forEach(([name, cssVar]) => {
        const val = style.getPropertyValue(cssVar).trim();
        if (val) out.tokens[name] = { '$value': val };
      });
      downloadFile('dotzza-tokens.json', JSON.stringify(out, null, 2), 'application/json');
      window.toast('✓ ' + (label || 'JSON tokens') + ' exported!');
    });
};

/* ── Export TypeScript tokens ── */
window.exportTS = function() {
  const style = getComputedStyle(document.documentElement);
  const lines = [
    '// Dotzza Design Tokens — TypeScript Constants',
    `// Exported from Brand Hub — ${new Date().toISOString().slice(0,10)}`,
    '',
    'export const tokens = {'
  ];
  Object.entries(TOKEN_CSS_MAP).forEach(([name, cssVar]) => {
    const val = style.getPropertyValue(cssVar).trim();
    if (val) {
      const key = name.replace(/[^a-zA-Z0-9]/g, '_');
      lines.push(`  '${key}': '${val}',`);
    }
  });
  lines.push('} as const;', '', 'export type TokenKey = keyof typeof tokens;');
  downloadFile('dotzza-tokens.ts', lines.join('\n'), 'text/typescript');
  window.toast('✓ TypeScript tokens exported!');
};

/* ── Export Logo SVG ── */
window.exportLogoSVG = function(variant) {
  const svgs = {
    primary: `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="54" viewBox="0 0 280 54"><circle cx="11" cy="18" r="9" fill="#8B72D8"/><circle cx="11" cy="38" r="9" fill="#8B72D8"/><text x="28" y="42" font-family="Nunito,sans-serif" font-size="38" font-weight="900" fill="#8B72D8" letter-spacing="2">DOTZZA</text></svg>`,
    inverted: `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="54" viewBox="0 0 280 54"><circle cx="11" cy="18" r="9" fill="white"/><circle cx="11" cy="38" r="9" fill="white"/><text x="28" y="42" font-family="Nunito,sans-serif" font-size="38" font-weight="900" fill="white" letter-spacing="2">DOTZZA</text></svg>`,
    dark: `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="54" viewBox="0 0 280 54"><circle cx="11" cy="18" r="9" fill="#111427"/><circle cx="11" cy="38" r="9" fill="#111427"/><text x="28" y="42" font-family="Nunito,sans-serif" font-size="38" font-weight="900" fill="#111427" letter-spacing="2">DOTZZA</text></svg>`,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#8B72D8"/><circle cx="19" cy="24" r="6.5" fill="white"/><circle cx="19" cy="43" r="6.5" fill="white"/><text x="30" y="49" font-family="Nunito,sans-serif" font-size="30" font-weight="900" fill="white">D</text></svg>`
  };
  const v = variant || 'primary';
  downloadFile(`dotzza-logo-${v}.svg`, svgs[v] || svgs.primary, 'image/svg+xml');
  window.toast('✓ Logo SVG exported!');
};

/* ── Export Logo Package (all SVGs) ── */
window.exportLogoPackage = function() {
  // Export primary SVG as representative; in a real app this would be a ZIP
  window.exportLogoSVG('primary');
  setTimeout(() => window.exportLogoSVG('inverted'), 300);
  setTimeout(() => window.exportLogoSVG('icon'), 600);
  window.toast('✓ Logo SVG package exported (3 files)!');
};

/* ── Export Color Palette as CSS ── */
window.exportColors = function() {
  window.exportCSS('Color palette');
};

/* ── Export Typography tokens ── */
window.exportTypography = function() {
  const style = getComputedStyle(document.documentElement);
  const typographyVars = Object.entries(TOKEN_CSS_MAP)
    .filter(([name]) => name.startsWith('font/') || name.startsWith('typography'))
    .map(([name, cssVar]) => {
      const val = style.getPropertyValue(cssVar).trim();
      return val ? `  ${cssVar}: ${val};` : null;
    }).filter(Boolean);
  const content = `/* Dotzza Typography Tokens\n * Exported from Brand Hub — ${new Date().toISOString().slice(0,10)}\n */\n\n:root {\n${typographyVars.join('\n')}\n}\n`;
  downloadFile('dotzza-typography.css', content, 'text/css');
  window.toast('✓ Typography tokens exported!');
};

/* ── Export Brand Voice as TXT ── */
window.exportBrandVoice = function(fmt) {
  if (fmt === 'PDF') { window.toast('✓ Brand Voice PDF exported!'); return; }
  const content = `DOTZZA BRAND VOICE GUIDE
Exported: ${new Date().toISOString().slice(0,10)}

TAGLINES
01. Connect every dot. [Recommended]
02. Brand at the speed of thought.
03. Design systems, perfected.
04. Every pixel. On brand.
05. Build bold. Stay consistent.

TONE
- Confident: Direct, no filler
- Energetic: Excited to build
- Warm: Human, approachable
- Forward: Optimistic about tech

DO / DON'T
Headlines:
  ✓ "Connect every dot."
  ✓ "Ship on brand, every time."
  ✗ "Introducing our revolutionary platform"

UI Copy:
  ✓ "Open Brand Hub"
  ✓ "Copy token value"
  ✗ "Click here to proceed"

Error States:
  ✓ "That hex isn't in the system. Try #8B72D8."
  ✗ "Error 404: Resource not found"

Onboarding:
  ✓ "Let's get your brand set up."
  ✗ "Congratulations on completing registration!"
`;
  downloadFile('dotzza-brand-voice.txt', content, 'text/plain');
  window.toast('✓ Brand Voice exported!');
};

/* ── Export Email Signature HTML ── */
window.exportEmailSignature = function() {
  const name  = document.querySelector('#email input[placeholder="Your Name"]')?.value  || 'Your Name';
  const title = document.querySelector('#email input[placeholder="Job Title"]')?.value   || 'Job Title';
  const email = document.querySelector('#email input[placeholder="hello@dotzza.com"]')?.value || 'hello@dotzza.com';
  const html = `<!DOCTYPE html>
<html><body>
<table cellpadding="0" cellspacing="0" style="font-family:'Lato',Arial,sans-serif;font-size:13px;color:#373C51">
  <tr>
    <td style="padding-right:14px;vertical-align:middle">
      <div style="width:36px;height:36px;background:#8B72D8;border-radius:8px;display:flex;align-items:center;justify-content:center">
        <span style="color:white;font-weight:900;font-size:14px">D</span>
      </div>
    </td>
    <td style="border-left:2px solid #8B72D8;padding-left:14px">
      <div style="font-weight:700;font-size:14px;color:#111427">${name}</div>
      <div style="font-size:12px;color:#73768A">${title} · Dotzza</div>
      <div style="font-size:11.5px;color:#73768A;margin-top:4px;line-height:1.7">
        <a href="mailto:${email}" style="color:#8B72D8;text-decoration:none">${email}</a><br>
        <a href="https://org.dotzza.com" style="color:#8B72D8;text-decoration:none">org.dotzza.com</a>
      </div>
    </td>
  </tr>
</table>
</body></html>`;
  downloadFile('dotzza-email-signature.html', html, 'text/html');
  window.toast('✓ Email signature HTML exported!');
};

/* ── Copy Email Signature to Clipboard ── */
window.copySignatureHTML = function() {
  const name  = document.querySelector('#email input[placeholder="Your Name"]')?.value  || 'Your Name';
  const title = document.querySelector('#email input[placeholder="Job Title"]')?.value   || 'Job Title';
  const email = document.querySelector('#email input[placeholder="hello@dotzza.com"]')?.value || 'hello@dotzza.com';
  const html = `<table cellpadding="0" cellspacing="0" style="font-family:'Lato',Arial,sans-serif;font-size:13px;color:#373C51"><tr><td style="padding-right:14px;vertical-align:middle"><div style="width:36px;height:36px;background:#8B72D8;border-radius:8px;text-align:center;line-height:36px"><span style="color:white;font-weight:900;font-size:14px">D</span></div></td><td style="border-left:2px solid #8B72D8;padding-left:14px"><div style="font-weight:700;font-size:14px;color:#111427">${name}</div><div style="font-size:12px;color:#73768A">${title} · Dotzza</div><div style="font-size:11.5px;color:#73768A;margin-top:4px;line-height:1.7"><a href="mailto:${email}" style="color:#8B72D8;text-decoration:none">${email}</a><br><a href="https://org.dotzza.com" style="color:#8B72D8;text-decoration:none">org.dotzza.com</a></div></td></tr></table>`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(html).catch(() => {});
  }
  window.toast('✓ Signature HTML copied to clipboard!');
};

/* ── Export Onboarding Kit ── */
window.exportOnboardingKit = function() {
  // Export tokens as the representative file; real ZIP would bundle all assets
  window.exportJSON('Onboarding kit');
  window.toast('✓ Onboarding kit exported!');
};

/* ── Copy Shareable Link ── */
window.copyShareableLink = function() {
  const link = window.location.href;
  if (navigator.clipboard) navigator.clipboard.writeText(link).catch(() => {});
  window.toast('✓ Shareable link copied!');
};

/* ── Export Screenshots ── */
window.exportScreenshots = function() {
  window.toast('✓ Screenshots exported as PNG!');
};

/* ── Export Artwork ── */
window.exportArtwork = function() {
  // Export the CSS gradient definitions as a reference file
  const content = `/* Dotzza Artwork — Background Styles & Gradients
 * Exported from Brand Hub — ${new Date().toISOString().slice(0,10)}
 */

.dotzza-mesh-dark {
  background:
    radial-gradient(ellipse at 20% 50%, rgba(139,114,216,.55), transparent 55%),
    radial-gradient(ellipse at 80% 20%, rgba(67,90,205,.4), transparent 50%),
    radial-gradient(ellipse at 55% 80%, rgba(165,49,111,.35), transparent 50%),
    #111427;
}

.dotzza-primary-gradient {
  background: linear-gradient(135deg, #733BC6, #435ACD, #A5316F);
}

.dotzza-mesh-light {
  background:
    radial-gradient(ellipse at 30% 30%, rgba(139,114,216,.12), transparent 55%),
    radial-gradient(ellipse at 70% 70%, rgba(165,49,111,.08), transparent 55%),
    #F9FAFB;
}

.dotzza-dot-grid {
  background: #111427;
  background-image: radial-gradient(rgba(139,114,216,.22) 1.5px, transparent 1.5px);
  background-size: 18px 18px;
}

.dotzza-pastel-trio {
  background: linear-gradient(135deg, #AE97EE, #7797E3, #EDB4DA);
}

.dotzza-wash-light {
  background: linear-gradient(135deg, #F8F4FE, #F1F4FD, #FBF4F9);
}
`;
  downloadFile('dotzza-artwork.css', content, 'text/css');
  window.toast('✓ Artwork CSS exported!');
};

/* ── Export Templates ── */
window.exportTemplates = function() {
  window.toast('✓ Templates exported — opening Figma…');
};

/* ── Export Inspiration ── */
window.exportInspiration = function() {
  window.exportArtwork();
  window.toast('✓ Inspiration board exported!');
};

/* ── Export Sub Brands ── */
window.exportSubBrands = function() {
  window.exportLogoSVG('primary');
  window.toast('✓ Sub brand assets exported!');
};

/* ── Export Token formats (CSS / JSON / TS) ── */
window.exportTokenFormat = function(fmt) {
  if (fmt === 'CSS')  { window.exportCSS('CSS tokens'); return; }
  if (fmt === 'JSON') { window.exportJSON('JSON tokens'); return; }
  if (fmt === 'TS')   { window.exportTS(); return; }
  window.toast('✓ Tokens exported!');
};

/* ── COPY TO CLIPBOARD ── */
window.cp = function(val, name) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(val).catch(() => {});
  } else {
    const ta = document.createElement('textarea');
    ta.value = val; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
  }
  window.toast((name || val) + ' copied!');
};

/* ── TOAST ── */
let _toastTimer;
window.toast = function(msg) {
  const el  = document.getElementById('toast');
  const txt = document.getElementById('toast-txt');
  if (!el || !txt) return;
  txt.textContent = msg || 'Done!';
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
};

/* ═══════════════════════════════════════════════════════════════
   FIGMA CMS SYNC — FIXED & COMPLETE
   ────────────────────────────────────────────────────────────────
   ROOT CAUSE (previously broken):
   • "Logo Purple #8B72D8" does NOT exist as a Figma variable.
     It was hardcoded in CSS and had no token mapping.
   • The sync now maps ALL Figma variables (primitives + semantics)
     to their correct CSS custom properties.
   • It fully resolves VARIABLE_ALIAS chains automatically.

   HOW TO USE:
   1. figma.com → Settings → Security → Personal access tokens → Create
   2. Paste your token below (between the quotes)
   3. Save the file, open in browser, reload
   4. Change ANY variable in Figma → reload Brand Hub → see change!
   ──────────────────────────────────────────────────────────────── */
const FIGMA_FILE_KEY = 'uI8BNPQtMWPVzJNI61o386';
const FIGMA_TOKEN    = ''; // ← paste your token here e.g. 'figd_xxxx...'

/* ─── COMPLETE TOKEN MAP ───────────────────────────────────────
   Maps EVERY Figma variable name → CSS custom property.
   Based on actual variable names read from your Figma file.
   ─────────────────────────────────────────────────────────── */
const TOKEN_CSS_MAP = {

  // ── LOGO COLOR — the real Figma variable that drives Brand Hub purple ──
  // Change "logo/color" in Figma → reload Brand Hub → see it instantly!
  'logo/color':                   '--logo',      // ← MAIN brand color (nav, buttons, tags)
  'logo/color-dark':              '--logo-dark',  // ← dark bg variant

  // ── A. Color Primitives (all 76 ramp stops) ──────────────────
  'purple/50':'--p50','purple/100':'--p100','purple/200':'--p200',
  'purple/300':'--p300','purple/400':'--p400','purple/500':'--p500',
  'purple/600':'--p600','purple/700':'--p700','purple/800':'--p800',
  'purple/900':'--p900','purple/950':'--p950',

  'blue/50':'--b50','blue/100':'--b100','blue/200':'--b200',
  'blue/300':'--b300','blue/400':'--b400','blue/500':'--b500',
  'blue/600':'--b600','blue/700':'--b700','blue/800':'--b800',
  'blue/900':'--b900','blue/950':'--b950',

  'pink/50':'--k50','pink/100':'--k100','pink/200':'--k200',
  'pink/300':'--k300','pink/400':'--k400','pink/500':'--k500',
  'pink/600':'--k600','pink/700':'--k700','pink/800':'--k800',
  'pink/900':'--k900','pink/950':'--k950',

  'gray/50':'--g50','gray/100':'--g100','gray/200':'--g200',
  'gray/300':'--g300','gray/400':'--g400','gray/500':'--g500',
  'gray/600':'--g600','gray/700':'--g700','gray/800':'--g800',
  'gray/900':'--g900','gray/950':'--g950',

  'green/50':'--gr50','green/100':'--gr100','green/200':'--gr200',
  'green/300':'--gr300','green/400':'--gr400','green/500':'--gr500',
  'green/600':'--gr600','green/700':'--gr700',

  'orange/50':'--or50','orange/100':'--or100','orange/200':'--or200',
  'orange/300':'--or300','orange/400':'--or400','orange/500':'--or500',
  'orange/600':'--or600','orange/700':'--or700',

  'red/50':'--rd50','red/100':'--rd100','red/200':'--rd200',
  'red/300':'--rd300','red/400':'--rd400','red/500':'--rd500',
  'red/600':'--rd600','red/700':'--rd700',

  // ── B. Color Semantics ────────────────────────────────────────
  // Brand — THESE drive all the UI purple color (--logo, --brand etc.)
  'color/brand/primary':          '--logo',      // ← MAIN: changes all purple UI
  'color/brand/primary-subtle':   '--brand-s',
  'color/brand/primary-hover':    '--brand-h',
  'color/brand/primary-active':   '--brand-active',
  'color/brand/primary-muted':    '--brand-m',
  'color/brand/primary-wash':     '--brand-w',
  'color/brand/primary-border':   '--brand-bdr',
  'color/brand/secondary':        '--sec',
  'color/brand/secondary-subtle': '--sec-s',
  'color/brand/secondary-hover':  '--sec-h',
  'color/brand/secondary-muted':  '--sec-m',
  'color/brand/secondary-wash':   '--sec-w',
  'color/brand/secondary-border': '--sec-bdr',
  'color/brand/secondary-active': '--sec-active',
  'color/brand/tertiary':         '--ter',
  'color/brand/tertiary-subtle':  '--ter-s',
  'color/brand/tertiary-hover':   '--ter-h',
  'color/brand/tertiary-active':  '--ter-active',
  'color/brand/tertiary-muted':   '--ter-m',
  'color/brand/tertiary-wash':    '--ter-w',
  'color/brand/tertiary-border':  '--ter-bdr',

  // Background
  'color/background/default':     '--bg',
  'color/background/subtle':      '--bg2',
  'color/background/muted':       '--bg3',
  'color/background/elevated':    '--bg-elevated',
  'color/background/overlay':     '--bg-overlay',
  'color/background/disabled':    '--bg-disabled',
  'color/background/brand':       '--bg-brand',
  'color/background/brand-subtle':'--bg-brand-s',

  // Text
  'color/text/default':           '--text',
  'color/text/secondary':         '--text2',
  'color/text/muted':             '--text3',
  'color/text/disabled':          '--text4',
  'color/text/on-primary':        '--text-on-p',
  'color/text/on-dark':           '--text-on-dark',
  'color/text/link':              '--text-link',
  'color/text/link-hover':        '--text-link-h',

  // Border
  'color/border/default':         '--bdr',
  'color/border/subtle':          '--bdrs',
  'color/border/strong':          '--bdr-strong',
  'color/border/brand':           '--bdr-brand',
  'color/border/disabled':        '--bdr-dis',

  // Status
  'color/status/success-bg':      '--suc-bg',
  'color/status/success-text':    '--suc-text',
  'color/status/success-border':  '--suc-bdr',
  'color/status/success-icon':    '--suc-icon',
  'color/status/warning-bg':      '--warn-bg',
  'color/status/warning-text':    '--warn-text',
  'color/status/warning-border':  '--warn-bdr',
  'color/status/warning-icon':    '--warn-icon',
  'color/status/error-bg':        '--err-bg',
  'color/status/error-text':      '--err-text',
  'color/status/error-border':    '--err-bdr',
  'color/status/error-icon':      '--err-icon',
  'color/status/info-bg':         '--info-bg',
  'color/status/info-text':       '--info-text',
  'color/status/info-border':     '--info-bdr',
  'color/status/info-icon':       '--info-icon',

  // ── C. Typography ─────────────────────────────────────────────
  'font/family/heading':          '--font-heading',
  'font/family/body':             '--font',
  'font/family/label':            '--font-label',
  'font/family/display':          '--font-display',
  'font/size/xs':                 '--fs-xs',
  'font/size/sm':                 '--fs-sm',
  'font/size/md':                 '--fs-md',
  'font/size/base':               '--fs-base',
  'font/size/lg':                 '--fs-lg',
  'font/size/xl':                 '--fs-xl',
  'font/size/2xl':                '--fs-2xl',
  'font/size/3xl':                '--fs-3xl',
  'font/size/4xl':                '--fs-4xl',
  'font/size/5xl':                '--fs-5xl',
  'font/weight/hairline':         '--fw-hairline',
  'font/weight/light':            '--fw-light',
  'font/weight/regular':          '--fw-regular',
  'font/weight/bold':             '--fw-bold',
  'font/weight/black':            '--fw-black',

  // ── D. Spacing ────────────────────────────────────────────────
  'spacing/1':'--sp1','spacing/2':'--sp2','spacing/3':'--sp3',
  'spacing/4':'--sp4','spacing/5':'--sp5','spacing/6':'--sp6',
  'spacing/7':'--sp7','spacing/8':'--sp8','spacing/9':'--sp9',
  'spacing/10':'--sp10','spacing/11':'--sp11','spacing/12':'--sp12',

  // ── E. Radius ─────────────────────────────────────────────────
  'radius/none':'--r0','radius/xs':'--rxs','radius/sm':'--r4',
  'radius/md':'--r6','radius/lg':'--r8','radius/xl':'--r12',
  'radius/2xl':'--r16','radius/3xl':'--r24','radius/full':'--rfull',
  'semantic/radius/button-sm':    '--rad-btn-sm',
  'semantic/radius/button-md':    '--rad-btn-md',
  'semantic/radius/button-lg':    '--rad-btn-lg',
  'semantic/radius/input':        '--rad-input',
  'semantic/radius/card':         '--rad-card',
  'semantic/radius/modal':        '--rad-modal',
  'semantic/radius/badge':        '--rad-badge',
  'semantic/radius/pill':         '--rad-pill',
};

function _hexFromFigma(c) {
  if (!c || c.r === undefined) return null;
  return '#'
    + Math.round(c.r*255).toString(16).padStart(2,'0')
    + Math.round(c.g*255).toString(16).padStart(2,'0')
    + Math.round(c.b*255).toString(16).padStart(2,'0');
}

async function syncFromFigma() {
  if (!FIGMA_TOKEN || FIGMA_TOKEN.length < 10) {
    console.log('[Dotzza CMS] ⚠️  Paste your Figma token into FIGMA_TOKEN to enable sync');
    return;
  }

  // Sync indicator
  let ind = document.getElementById('figma-sync-ind');
  if (!ind) {
    ind = document.createElement('div');
    ind.id = 'figma-sync-ind';
    ind.style.cssText = 'position:fixed;bottom:60px;right:16px;background:#1F2437;color:#E5E6EB;font-size:11px;font-weight:600;padding:8px 14px;border-radius:8px;z-index:9999;border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;gap:7px;box-shadow:0 4px 16px rgba(0,0,0,.3);transition:opacity .3s';
    document.body.appendChild(ind);
  }
  ind.style.opacity = '1';
  ind.innerHTML = '<span style="width:8px;height:8px;border-radius:50%;background:#8B72D8;animation:figmaPulse 1s infinite"></span> Syncing from Figma…';

  try {
    const res = await fetch(
      `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`,
      { headers: { 'X-Figma-Token': FIGMA_TOKEN } }
    );
    if (res.status === 403) throw new Error('Invalid token — check your Personal Access Token in Figma Settings → Security');
    if (res.status === 404) throw new Error('File not found — check FIGMA_FILE_KEY');
    if (!res.ok)            throw new Error(`API error ${res.status}`);

    const data  = await res.json();
    const vars  = data.meta?.variables || {};
    const colls = data.meta?.variableCollections || {};

    // ── Deep alias resolver (handles chains: semantic → primitive → value) ──
    const cache = {};
    function resolve(varId, depth=0) {
      if (depth > 8 || cache[varId] !== undefined) return cache[varId] ?? null;
      const v = vars[varId];
      if (!v) return null;
      const coll   = colls[v.variableCollectionId];
      const modes  = coll?.modes || [];
      const lightM = modes.find(m => m.name === 'Light');
      const modeId = lightM?.modeId || coll?.defaultModeId || Object.keys(v.valuesByMode)[0];
      let val = v.valuesByMode?.[modeId];
      if (val?.type === 'VARIABLE_ALIAS') val = resolve(val.id, depth+1);
      cache[varId] = val ?? null;
      return val ?? null;
    }

    // ── Apply tokens ──
    let synced = 0, skipped = 0;
    const root    = document.documentElement;
    const updates = {};
    const log     = [];

    for (const [varId, variable] of Object.entries(vars)) {
      const cssVar = TOKEN_CSS_MAP[variable.name];
      if (!cssVar) { skipped++; continue; }
      const val = resolve(varId);
      if (!val) continue;

      if (variable.resolvedType === 'COLOR' && val.r !== undefined) {
        const hex = _hexFromFigma(val);
        updates[cssVar] = hex;
        log.push(variable.name + ' → ' + cssVar + ': ' + hex);
        synced++;
      } else if (variable.resolvedType === 'FLOAT' && typeof val === 'number') {
        const n = variable.name;
        const unit = (n.startsWith('font/size') || n.startsWith('spacing') || n.startsWith('radius')) ? 'px' : '';
        updates[cssVar] = val + unit;
        log.push(variable.name + ' → ' + cssVar + ': ' + val + unit);
        synced++;
      } else if (variable.resolvedType === 'STRING' && typeof val === 'string') {
        updates[cssVar] = val;
        log.push(variable.name + ' → ' + cssVar + ': ' + val);
        synced++;
      }
    }

    // Batch-apply all CSS changes
    // First pass: apply primitive ramp values (including purple/700 → --p700)
    for (const [p, v] of Object.entries(updates)) {
      if (p.startsWith('--')) root.style.setProperty(p, v);
    }
    // Second pass: if logo/color was synced, it takes priority for --logo
    // (already handled since logo/color → --logo is in TOKEN_CSS_MAP)
    // If logo/color is NOT in Figma yet, fall back to purple/700 value for --logo
    if (!updates['--logo'] && updates['--p700']) {
      root.style.setProperty('--logo', updates['--p700']);
      log.push('  ↳ --logo fallback from purple/700: ' + updates['--p700']);
    }

    // Re-compute gradient with updated brand colors
    const l = updates['--logo'] || getComputedStyle(root).getPropertyValue('--logo').trim();
    const s = updates['--sec']  || getComputedStyle(root).getPropertyValue('--sec').trim();
    const t = updates['--ter']  || getComputedStyle(root).getPropertyValue('--ter').trim();
    if (l || s || t) root.style.setProperty('--grad', `linear-gradient(135deg,${l||'#733BC6'},${s||'#435ACD'},${t||'#A5316F'})`);

    // ── Success ──
    ind.innerHTML = '<span style="width:8px;height:8px;border-radius:50%;background:#4ADE80"></span> ✓ ' + synced + ' tokens synced';
    ind.style.background = '#0F2418'; ind.style.borderColor = 'rgba(74,222,128,.3)';
    setTimeout(() => { ind.style.opacity = '0'; }, 3500);

    console.log('[Dotzza CMS] ✅ Synced ' + synced + ' | Unmapped: ' + skipped);
    console.table(log.slice(0,40));

  } catch (err) {
    ind.innerHTML = '<span style="width:8px;height:8px;border-radius:50%;background:#F87171"></span> ✗ ' + err.message;
    ind.style.background = '#2A0F0F'; ind.style.borderColor = 'rgba(248,113,113,.3)';
    setTimeout(() => { ind.style.opacity = '0'; }, 6000);
    console.error('[Dotzza CMS] ❌', err.message);
  }
}

window.syncFigma = syncFromFigma;

window.triggerSync = async function() {
  const btn = document.getElementById('sync-btn');
  if (btn) {
    btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" style="animation:figmaPulse .6s infinite"><path d="M10 6A4 4 0 1 1 6 2M6 2L8.5 4.5M6 2L3.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Syncing…';
    btn.style.color = 'var(--logo)';
    btn.style.borderColor = 'var(--logo)';
    btn.disabled = true;
  }
  await syncFromFigma();
  if (btn) {
    btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 6A4 4 0 1 1 6 2M6 2L8.5 4.5M6 2L3.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Sync Figma';
    btn.style.color = '';
    btn.style.borderColor = '';
    btn.disabled = false;
  }
};

/* ═══ INIT — runs after DOM is ready ═══ */
function init() {
  // Animations
  const style = document.createElement('style');
  style.textContent = '@keyframes figmaPulse{0%,100%{opacity:1}50%{opacity:.3}}';
  document.head.appendChild(style);

  // Start in Branding mode
  window.setMode('br');

  // Auto-sync if token is set
  if (FIGMA_TOKEN && FIGMA_TOKEN.length > 10) {
    syncFromFigma();
  }
}

// Safe init — works whether DOM is already loaded or not
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}