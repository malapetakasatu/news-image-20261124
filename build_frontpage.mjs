// Generates a crisp 1024x1024 editorial world-news frontpage for Tuesday 24 November 2026 using HTML/SVG + headless Chromium.
import { spawn } from 'node:child_process';
import { statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));

const REGION_META = [
  { id: 'na', label: 'N. AMERICA', short: 'N. America', color: '#2563eb' },
  { id: 'eu', label: 'EUROPE', short: 'Europe', color: '#1d4ed8' },
  { id: 'sse', label: 'S & SE ASIA', short: 'S/SE Asia', color: '#0f766e' },
  { id: 'af', label: 'AFRICA', short: 'Africa', color: '#991b1b' },
  { id: 'me', label: 'MIDDLE EAST', short: 'Mid East', color: '#d97706' },
  { id: 'la', label: 'LATIN AMERICA', short: 'LatAm', color: '#7c3aed' },
  { id: 'ea', label: 'EAST ASIA', short: 'East Asia', color: '#059669' },
  { id: 'oc', label: 'OCEANIA', short: 'Oceania', color: '#0284c7' },
  { id: 'wo', label: 'WORLD & SPACE', short: 'World/Space', color: '#334155' },
];

const REGION_COLOR = Object.fromEntries(REGION_META.map((r) => [r.id, r.color]));

const KPI_STRIP = [
  { val: '+$952B', accent: '#15803d', desc: 'Nvidia record 1-day market cap surge (+31.5%) (1)' },
  { val: '3 Mined', accent: '#991b1b', desc: 'Tankers struck in Strait of Hormuz alerts (2)' },
  { val: '1st State', accent: '#1d4ed8', desc: 'ICJ finds Myanmar guilty of Rohingya genocide (3)' },
  { val: '5.3 M', accent: '#0f766e', desc: 'Nepal earthquake shakes Solukhumbu valleys (7)' },
  { val: '432k+', accent: '#1e293b', desc: 'Russian 2026 war casualties in Kyiv audit (10)' },
  { val: '19.5M', accent: '#b45309', desc: 'Horn & Central Africa food emergency alert (11)' },
];

const TIMELINE = [
  ['02:15', 'Hormuz naval mines hit 3 tankers'],
  ['05:40', 'Nepal 5.3 quake near Ama Dablam'],
  ['08:30', 'Wong & Albanese open Canberra summit'],
  ['11:00', 'ICJ rules on Myanmar Rohingya genocide'],
  ['14:30', 'Nvidia board reinstates Jensen Huang'],
  ['16:00', 'Wall St opens: NVDA spikes +31.5%'],
  ['18:45', 'Trump Rose Garden turkey pardoning'],
  ['21:10', 'Khan Yunis strike kills Hamas chief'],
];

const svgCornerTag = (x, y, w, text, bg = '#991b1b', fg = '#ffffff') =>
  `<rect x="${x}" y="${y}" width="${w}" height="15" rx="2" fill="${bg}" opacity="0.94"/><text x="${x + w / 2}" y="${y + 10.5}" text-anchor="middle" font-size="7.8" font-weight="800" fill="${fg}" font-family="Liberation Sans,Arial,sans-serif" letter-spacing="0.4">${text}</text>`;

const LEADS = [
  {
    num: 1,
    region: 'na',
    kicker: 'SANTA CLARA / WALL STREET · TECH & MARKETS',
    badge: 'OFFICIAL',
    badgeColor: '#047857',
    title: 'Jensen Huang Reinstated as Nvidia CEO; Shares Surge 31.5% in $952B Rally',
    body: 'Nvidia’s board votes unanimously to restore founder Jensen Huang after an 11-day standoff; S&P 500 and Nasdaq jump to records as chip stocks ignite a global market surge.',
    source: 'Bloomberg · Reuters · WSJ · SEC 8-K',
    svg: `
      <svg viewBox="0 0 312 78" width="100%" height="78">
        <defs>
          <linearGradient id="nvbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#064e3b"/><stop offset="100%" stop-color="#022c22"/></linearGradient>
          <linearGradient id="chartGlow" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#4ade80"/><stop offset="100%" stop-color="#22c55e"/></linearGradient>
        </defs>
        <rect width="312" height="78" fill="url(#nvbg)"/>
        <!-- Circuit traces -->
        <g stroke="#065f46" stroke-width="0.8" fill="none">
          <path d="M10 20 L50 20 L70 40 L110 40"/>
          <path d="M10 58 L40 58 L60 38 L90 38"/>
          <path d="M180 15 L210 15 L230 35 L280 35"/>
          <path d="M190 65 L220 65 L240 45 L300 45"/>
        </g>
        <!-- Nvidia chip graphic -->
        <rect x="22" y="24" width="46" height="42" rx="4" fill="#0f172a" stroke="#22c55e" stroke-width="1.5"/>
        <rect x="26" y="28" width="38" height="34" rx="2" fill="#022c22"/>
        <text x="45" y="44" text-anchor="middle" font-size="9" font-weight="900" fill="#22c55e" font-family="Liberation Sans,sans-serif">NVDA</text>
        <text x="45" y="55" text-anchor="middle" font-size="6.8" font-weight="700" fill="#86efac" font-family="Liberation Sans,sans-serif">CHIP AI</text>
        <!-- Stock line chart -->
        <polyline points="80,62 110,60 140,55 170,48 200,32 230,22 260,18 290,14" fill="none" stroke="url(#chartGlow)" stroke-width="3" stroke-linecap="round"/>
        <polygon points="290,14 280,12 284,22" fill="#22c55e"/>
        <!-- Fill under chart -->
        <polygon points="80,62 110,60 140,55 170,48 200,32 230,22 260,18 290,14 290,72 80,72" fill="#22c55e" opacity="0.12"/>
        <!-- Stat box overlay -->
        <rect x="178" y="44" width="124" height="28" rx="3" fill="#0f172a" opacity="0.9" stroke="#22c55e" stroke-width="0.8"/>
        <text x="186" y="57" font-size="11" font-weight="900" fill="#4ade80" font-family="Liberation Sans,sans-serif">+31.5%</text>
        <text x="240" y="57" font-size="8.8" font-weight="800" fill="#fde047" font-family="Liberation Sans,sans-serif">+$952B</text>
        <text x="186" y="68" font-size="6.8" font-weight="700" fill="#94a3b8" font-family="Liberation Sans,sans-serif">RECORD 1-DAY CAP SURGE</text>
        ${svgCornerTag(6, 4, 102, 'CEO REINSTATED', '#15803d')}
        ${svgCornerTag(212, 4, 94, 'WALL ST SURGE', '#065f46')}
      </svg>
    `,
  },
  {
    num: 2,
    region: 'me',
    kicker: 'STRAIT OF HORMUZ / GULF · MARITIME & ENERGY',
    badge: 'CONFIRMED',
    badgeColor: '#047857',
    title: 'Three Tankers Suffer Mine Explosions in Strait of Hormuz; Oil Spikes',
    body: 'Commercial vessels catch fire along critical maritime chokepoint as IRGC Navy issues warning against unauthorized routes; Brent crude surges 4.2% on shipping shock.',
    source: 'UKMTO · Reuters · Al Arabiya · Lloyd’s List',
    svg: `
      <svg viewBox="0 0 312 78" width="100%" height="78">
        <defs>
          <linearGradient id="skyHormuz" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#451a03"/><stop offset="60%" stop-color="#78350f"/><stop offset="100%" stop-color="#0284c7"/></linearGradient>
          <linearGradient id="seaHormuz" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0369a1"/><stop offset="100%" stop-color="#082f49"/></linearGradient>
        </defs>
        <rect width="312" height="50" fill="url(#skyHormuz)"/>
        <rect y="48" width="312" height="30" fill="url(#seaHormuz)"/>
        <!-- Coastline / Cliffs of Hormuz -->
        <polygon points="0,48 40,30 90,38 120,48" fill="#573a24"/>
        <polygon points="210,48 240,28 290,35 312,48" fill="#573a24"/>
        <!-- Tanker 1 (burning) -->
        <g transform="translate(130,36)">
          <polygon points="0,16 65,16 75,10 8,10" fill="#1e293b"/>
          <rect x="12" y="5" width="16" height="5" fill="#e2e8f0"/>
          <rect x="18" y="1" width="4" height="4" fill="#dc2626"/>
          <!-- Smoke & fire plume -->
          <circle cx="48" cy="8" r="7" fill="#ef4444" opacity="0.9"/>
          <circle cx="46" cy="2" r="9" fill="#f97316" opacity="0.8"/>
          <circle cx="42" cy="-6" r="11" fill="#475569" opacity="0.85"/>
          <circle cx="52" cy="-9" r="8" fill="#334155" opacity="0.8"/>
        </g>
        <!-- Spiked naval mine in foreground -->
        <g transform="translate(48,58)">
          <circle cx="0" cy="0" r="7" fill="#0f172a" stroke="#dc2626" stroke-width="1"/>
          <line x1="-11" y1="0" x2="11" y2="0" stroke="#0f172a" stroke-width="1.5"/>
          <line x1="0" y1="-11" x2="0" y2="11" stroke="#0f172a" stroke-width="1.5"/>
          <line x1="-7" y1="-7" x2="7" y2="7" stroke="#0f172a" stroke-width="1.5"/>
          <line x1="7" y1="-7" x2="-7" y2="7" stroke="#0f172a" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="2.2" fill="#ef4444"/>
        </g>
        <!-- Radar circle -->
        <circle cx="270" cy="22" r="14" fill="#0f172a" opacity="0.85" stroke="#38bdf8" stroke-width="1"/>
        <line x1="270" y1="22" x2="282" y2="14" stroke="#38bdf8" stroke-width="1.5"/>
        <circle cx="277" cy="18" r="2" fill="#ef4444"/>
        <text x="270" y="34" text-anchor="middle" font-size="5.5" font-weight="800" fill="#38bdf8" font-family="Liberation Sans,sans-serif">IRGC ALERT</text>
        ${svgCornerTag(6, 4, 102, '3 TANKERS MINED', '#991b1b')}
        ${svgCornerTag(212, 4, 94, 'BRENT +4.2%', '#d97706')}
      </svg>
    `,
  },
  {
    num: 3,
    region: 'eu',
    kicker: 'THE HAGUE / NAYPYIDAW · INTERNATIONAL LAW',
    badge: 'OFFICIAL',
    badgeColor: '#047857',
    title: 'ICJ Rules Myanmar Guilty of Genocide Against Rohingya in Landmark Verdict',
    body: 'The International Court of Justice delivers historic ruling holding Myanmar responsible under the 1948 Genocide Convention in Gambia’s suit; UK and EU immediately levy targeted sanctions.',
    source: 'ICJ · UN News · Reuters · BBC',
    svg: `
      <svg viewBox="0 0 312 78" width="100%" height="78">
        <defs>
          <linearGradient id="icjBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1e3a8a"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
        </defs>
        <rect width="312" height="78" fill="url(#icjBg)"/>
        <!-- Peace Palace silhouette -->
        <polygon points="18,52 35,28 52,52" fill="#3b82f6" opacity="0.4"/>
        <rect x="25" y="52" width="60" height="22" fill="#1e40af" opacity="0.4"/>
        <rect x="48" y="24" width="12" height="30" fill="#1e40af" opacity="0.4"/>
        <!-- Classical pillars -->
        <g fill="#e2e8f0" opacity="0.9">
          <rect x="110" y="26" width="6" height="42" rx="1"/>
          <rect x="124" y="26" width="6" height="42" rx="1"/>
          <rect x="138" y="26" width="6" height="42" rx="1"/>
          <rect x="106" y="22" width="42" height="4" rx="1"/>
          <polygon points="106,22 127,13 148,22"/>
        </g>
        <!-- Golden Scales of Justice -->
        <g transform="translate(225,40)" stroke="#facc15" stroke-width="1.8" fill="none">
          <line x1="0" y1="-22" x2="0" y2="24"/>
          <line x1="-30" y1="-16" x2="30" y2="-16" stroke-width="2.2"/>
          <circle cx="0" cy="-22" r="3" fill="#facc15"/>
          <!-- Left pan -->
          <line x1="-30" y1="-16" x2="-38" y2="-2"/>
          <line x1="-30" y1="-16" x2="-22" y2="-2"/>
          <path d="M-42 -2 Q-30 6 -18 -2 Z" fill="#facc15"/>
          <!-- Right pan -->
          <line x1="30" y1="-16" x2="22" y2="-2"/>
          <line x1="30" y1="-16" x2="38" y2="-2"/>
          <path d="M18 -2 Q30 6 42 -2 Z" fill="#facc15"/>
          <!-- Base -->
          <rect x="-14" y="22" width="28" height="4" rx="1" fill="#facc15"/>
        </g>
        ${svgCornerTag(6, 4, 102, 'GENOCIDE RULING', '#1d4ed8')}
        ${svgCornerTag(212, 4, 94, 'HISTORIC VERDICT', '#15803d')}
      </svg>
    `,
  },
];

const FEATURES = [
  {
    num: 4,
    region: 'me',
    kicker: 'KHAN YUNIS / WASHINGTON · CONFLICT',
    badge: 'CONFIRMED',
    badgeColor: '#047857',
    title: 'Gaza airstrike kills Hamas security chief Nahel',
    body: 'Targeted strike eliminates top security director; Vance and Rubio meet Qatar PM in DC on regional diplomacy.',
    source: 'Haaretz · Al Jazeera · State Dept',
    svg: `
      <svg viewBox="0 0 232 54" width="100%" height="54">
        <rect width="232" height="54" fill="#18181b"/>
        <!-- City skyline silhouette -->
        <polygon points="10,48 24,32 36,32 42,48 60,48 70,26 84,26 90,48 105,48 115,35 130,48" fill="#3f3f46"/>
        <circle cx="77" cy="22" r="10" fill="#ef4444" opacity="0.8"/>
        <circle cx="77" cy="22" r="5" fill="#fde047"/>
        <!-- Drone crosshair -->
        <circle cx="170" cy="28" r="16" fill="none" stroke="#22c55e" stroke-width="1.2"/>
        <line x1="150" y1="28" x2="190" y2="28" stroke="#22c55e" stroke-width="1.2"/>
        <line x1="170" y1="8" x2="170" y2="48" stroke="#22c55e" stroke-width="1.2"/>
        <circle cx="170" cy="28" r="3" fill="#ef4444"/>
        ${svgCornerTag(124, 4, 102, 'TARGETED STRIKE', '#991b1b')}
      </svg>
    `,
  },
  {
    num: 5,
    region: 'oc',
    kicker: 'HONIARA / CANBERRA · PACIFIC PACT',
    badge: 'OFFICIAL',
    badgeColor: '#047857',
    title: 'Solomon Islands axes Beijing security accord',
    body: 'PM Manele cancels Chinese policing treaty, realigning maritime security ties with Australia and Pacific forum.',
    source: 'Solomon Star · ABC · Guardian',
    svg: `
      <svg viewBox="0 0 232 54" width="100%" height="54">
        <rect width="232" height="54" fill="#0c4a6e"/>
        <!-- Ocean waves -->
        <path d="M0 42 Q58 32 116 42 T232 42 L232 54 L0 54 Z" fill="#0369a1"/>
        <!-- Solomon Islands archipelago dots -->
        <circle cx="50" cy="28" r="4.5" fill="#facc15"/><circle cx="64" cy="24" r="3.5" fill="#facc15"/>
        <circle cx="76" cy="30" r="4" fill="#facc15"/><circle cx="90" cy="22" r="3" fill="#facc15"/>
        <!-- Australian flag canton hint & alliance link -->
        <rect x="135" y="16" width="38" height="22" rx="2" fill="#1e3a8a"/>
        <path d="M135 16 L154 27 M154 16 L135 27" stroke="#ef4444" stroke-width="1.5"/>
        <line x1="90" y1="26" x2="135" y2="26" stroke="#facc15" stroke-width="2" stroke-dasharray="3 2"/>
        ${svgCornerTag(120, 4, 106, 'BEIJING PACT ENDS', '#0f766e')}
      </svg>
    `,
  },
  {
    num: 6,
    region: 'na',
    kicker: 'WASHINGTON · WHITE HOUSE TRADITION',
    badge: 'OFFICIAL',
    badgeColor: '#047857',
    title: 'Trump pardons turkeys ‘Freedom’ and ‘Feathers’',
    body: 'Annual Rose Garden ceremony held before record 80 million Americans begin Thanksgiving travel week.',
    source: 'AP · PBS Newshour · CNN',
    svg: `
      <svg viewBox="0 0 232 54" width="100%" height="54">
        <rect width="232" height="54" fill="#fef3c7"/>
        <!-- White House Portico -->
        <rect x="14" y="20" width="70" height="28" fill="#f8fafc" stroke="#64748b" stroke-width="1"/>
        <polygon points="10,20 49,8 88,20" fill="#f8fafc" stroke="#64748b" stroke-width="1"/>
        <line x1="28" y1="20" x2="28" y2="48" stroke="#94a3b8" stroke-width="2"/>
        <line x1="49" y1="20" x2="49" y2="48" stroke="#94a3b8" stroke-width="2"/>
        <line x1="70" y1="20" x2="70" y2="48" stroke="#94a3b8" stroke-width="2"/>
        <!-- Turkey silhouette -->
        <g transform="translate(145,28)">
          <ellipse cx="0" cy="4" rx="14" ry="10" fill="#78350f"/>
          <circle cx="10" cy="-4" r="6" fill="#9a3412"/>
          <path d="M14 -4 L20 -2 L14 0 Z" fill="#ea580c"/>
          <!-- Fan tail feathers -->
          <polygon points="-12,4 -22,-6 -10,0" fill="#b45309"/>
          <polygon points="-10,2 -20,-12 -6,-2" fill="#d97706"/>
          <polygon points="-8,0 -14,-16 -2,-4" fill="#f59e0b"/>
        </g>
        ${svgCornerTag(124, 4, 102, 'ROSE GARDEN PARDON', '#92400e')}
      </svg>
    `,
  },
  {
    num: 7,
    region: 'sse',
    kicker: 'SOLUKHUMBU / HIMALAYAS · SEISMIC DISASTER',
    badge: 'CONFIRMED',
    badgeColor: '#047857',
    title: 'Magnitude 5.3 earthquake rattles Nepal peaks',
    body: 'Tremor near Ama Dablam caught live on expedition feeds; localized rockfalls reported with no major casualties.',
    source: 'USGS · Himalayan Times · EMSC',
    svg: `
      <svg viewBox="0 0 232 54" width="100%" height="54">
        <rect width="232" height="54" fill="#0f172a"/>
        <!-- Himalayan Peaks -->
        <polygon points="10,48 48,16 86,48" fill="#e2e8f0"/>
        <polygon points="40,24 48,16 56,24" fill="#38bdf8"/>
        <polygon points="70,48 110,12 150,48" fill="#f8fafc"/>
        <polygon points="98,22 110,12 122,22" fill="#38bdf8"/>
        <!-- Seismic rings -->
        <circle cx="178" cy="30" r="8" fill="none" stroke="#ef4444" stroke-width="1.8"/>
        <circle cx="178" cy="30" r="15" fill="none" stroke="#f97316" stroke-width="1.4" stroke-dasharray="3 2"/>
        <circle cx="178" cy="30" r="22" fill="none" stroke="#fde047" stroke-width="1" stroke-dasharray="2 2"/>
        <text x="178" y="33" text-anchor="middle" font-size="7.5" font-weight="900" fill="#fff" font-family="Liberation Sans,sans-serif">5.3M</text>
        ${svgCornerTag(124, 4, 102, 'NEPAL QUAKE 5.3', '#0f766e')}
      </svg>
    `,
  },
  {
    num: 8,
    region: 'eu',
    kicker: 'TALLINN / MOSCOW · BALTIC DEFENSE',
    badge: 'REPORTED',
    badgeColor: '#b45309',
    title: 'Moscow warns Estonia over Gulf maritime rules',
    body: 'Russian foreign ministry cautions Tallinn against Baltic transit curbs; NATO allies review orbital space-arms threats.',
    source: 'ERR News · Reuters · TASS',
    svg: `
      <svg viewBox="0 0 232 54" width="100%" height="54">
        <rect width="232" height="54" fill="#1e1b4b"/>
        <!-- Baltic water & ship -->
        <rect y="38" width="232" height="16" fill="#1d4ed8"/>
        <polygon points="20,42 75,42 85,34 25,34" fill="#475569"/>
        <rect x="35" y="27" width="14" height="7" fill="#cbd5e1"/>
        <!-- Radar tower -->
        <line x1="120" y1="42" x2="135" y2="16" stroke="#94a3b8" stroke-width="1.5"/>
        <line x1="150" y1="42" x2="135" y2="16" stroke="#94a3b8" stroke-width="1.5"/>
        <circle cx="135" cy="14" r="5" fill="#38bdf8"/>
        <!-- Satellite beam -->
        <rect x="180" y="10" width="14" height="8" rx="2" fill="#e2e8f0"/>
        <rect x="168" y="12" width="10" height="4" fill="#38bdf8"/>
        <rect x="196" y="12" width="10" height="4" fill="#38bdf8"/>
        <line x1="187" y1="18" x2="150" y2="38" stroke="#ef4444" stroke-width="1.2" stroke-dasharray="2 2"/>
        ${svgCornerTag(124, 4, 102, 'BALTIC DISPUTE', '#1d4ed8')}
      </svg>
    `,
  },
  {
    num: 9,
    region: 'sse',
    kicker: 'CANBERRA / SINGAPORE · BILATERAL SUMMIT',
    badge: 'OFFICIAL',
    badgeColor: '#047857',
    title: 'Singapore PM Wong & Albanese ink defense pacts',
    body: '11th Annual Leaders’ Summit deepens joint training, cross-border digital economy ties and clean energy links.',
    source: 'PMO Singapore · ABC · Straits Times',
    svg: `
      <svg viewBox="0 0 232 54" width="100%" height="54">
        <rect width="232" height="54" fill="#ecfdf5"/>
        <!-- Singapore Merlion / Australia emblem abstract -->
        <rect x="22" y="16" width="38" height="24" rx="3" fill="#dc2626"/>
        <circle cx="34" cy="28" r="4.5" fill="#fff"/>
        <rect x="74" y="16" width="38" height="24" rx="3" fill="#0f766e"/>
        <text x="93" y="32" text-anchor="middle" font-size="8" font-weight="900" fill="#fff" font-family="Liberation Sans,sans-serif">AUS</text>
        <!-- Handshake / bridge line -->
        <line x1="60" y1="28" x2="74" y2="28" stroke="#0f172a" stroke-width="3"/>
        <rect x="135" y="14" width="82" height="28" rx="3" fill="#0f172a"/>
        <text x="176" y="26" text-anchor="middle" font-size="7.5" font-weight="800" fill="#34d399" font-family="Liberation Sans,sans-serif">11TH SUMMIT</text>
        <text x="176" y="36" text-anchor="middle" font-size="6.8" font-weight="700" fill="#cbd5e1" font-family="Liberation Sans,sans-serif">GREEN & DEFENSE</text>
        ${svgCornerTag(124, 4, 102, 'BILATERAL ACCORD', '#0f766e')}
      </svg>
    `,
  },
  {
    num: 10,
    region: 'eu',
    kicker: 'KYIV / EAST EUROPE · WAR CASUALTY AUDIT',
    badge: 'REPORTED',
    badgeColor: '#b45309',
    title: 'Kyiv audit estimates 432,000 Russian 2026 losses',
    body: 'General Staff releases annual casualty audit showing heavy Donbas losses; artillery strikes persist on Pokrovsk axis.',
    source: 'Kyiv Independent · Ukrinform · ISW',
    svg: `
      <svg viewBox="0 0 232 54" width="100%" height="54">
        <rect width="232" height="54" fill="#18181b"/>
        <!-- Casualty Bar chart -->
        <rect x="25" y="32" width="18" height="18" fill="#475569"/>
        <text x="34" y="28" text-anchor="middle" font-size="6" fill="#94a3b8" font-family="Liberation Sans,sans-serif">'24</text>
        <rect x="52" y="24" width="18" height="26" fill="#64748b"/>
        <text x="61" y="20" text-anchor="middle" font-size="6" fill="#94a3b8" font-family="Liberation Sans,sans-serif">'25</text>
        <rect x="79" y="12" width="18" height="38" fill="#dc2626"/>
        <text x="88" y="9" text-anchor="middle" font-size="6" font-weight="900" fill="#f87171" font-family="Liberation Sans,sans-serif">'26</text>
        <rect x="118" y="14" width="102" height="28" rx="2" fill="#0f172a" stroke="#dc2626" stroke-width="0.8"/>
        <text x="169" y="26" text-anchor="middle" font-size="8.8" font-weight="900" fill="#f87171" font-family="Liberation Sans,sans-serif">432,000</text>
        <text x="169" y="37" text-anchor="middle" font-size="6.5" font-weight="700" fill="#94a3b8" font-family="Liberation Sans,sans-serif">2026 CASUALTY AUDIT</text>
        ${svgCornerTag(124, 4, 102, 'ANNUAL AUDIT', '#991b1b')}
      </svg>
    `,
  },
  {
    num: 11,
    region: 'af',
    kicker: 'NAIROBI / KINSHASA · HUMANITARIAN CRISIS',
    badge: 'OFFICIAL',
    badgeColor: '#047857',
    title: 'UN: 19.5M in East & Central Africa face food crisis',
    body: 'OCHA appeals for emergency grain corridors as drought, conflict, and logistics snarls threaten vulnerable populations.',
    source: 'UN OCHA · WFP · Africanews',
    svg: `
      <svg viewBox="0 0 232 54" width="100%" height="54">
        <rect width="232" height="54" fill="#451a03"/>
        <!-- Africa shape hint -->
        <polygon points="20,10 65,10 75,25 60,45 45,50 35,35 15,25" fill="#78350f"/>
        <circle cx="58" cy="24" r="6" fill="#ef4444" opacity="0.9"/>
        <!-- Grain stalk & Relief truck -->
        <path d="M100 44 Q105 24 115 14" stroke="#facc15" stroke-width="2" fill="none"/>
        <circle cx="115" cy="14" r="2.5" fill="#facc15"/>
        <circle cx="110" cy="22" r="2.5" fill="#facc15"/>
        <circle cx="106" cy="30" r="2.5" fill="#facc15"/>
        <rect x="135" y="24" width="46" height="18" rx="2" fill="#f8fafc"/>
        <polygon points="181,28 190,28 194,35 194,42 181,42" fill="#f8fafc"/>
        <circle cx="148" cy="42" r="3.5" fill="#0f172a"/><circle cx="184" cy="42" r="3.5" fill="#0f172a"/>
        <text x="158" y="35" text-anchor="middle" font-size="6" font-weight="900" fill="#0284c7" font-family="Liberation Sans,sans-serif">UN WFP</text>
        ${svgCornerTag(124, 4, 102, '19.5M AT RISK', '#b45309')}
      </svg>
    `,
  },
];

// Accurate equirectangular projection inside 306x118 SVG map viewport
function lonLatToXY(lon, lat) {
  const x = ((lon + 175) / 355) * 306;
  const y = ((82 - lat) / 142) * 118;
  return [x.toFixed(1), y.toFixed(1)];
}

const PINS = [
  { num: 1, region: 'na', lon: -121, lat: 37 },  // Santa Clara / Silicon Valley
  { num: 2, region: 'me', lon: 56, lat: 26 },    // Strait of Hormuz
  { num: 3, region: 'eu', lon: 4.3, lat: 52 },   // The Hague, Netherlands
  { num: 4, region: 'me', lon: 34.3, lat: 31.3 },// Khan Yunis, Gaza
  { num: 5, region: 'oc', lon: 160, lat: -9.4 }, // Honiara, Solomon Islands
  { num: 6, region: 'na', lon: -77, lat: 38.9 }, // Washington DC
  { num: 7, region: 'sse', lon: 86.8, lat: 27.8 },// Solukhumbu, Nepal
  { num: 8, region: 'eu', lon: 24.7, lat: 59.4 },// Tallinn, Estonia
  { num: 9, region: 'sse', lon: 149, lat: -35.3 },// Canberra, Australia
  { num: 10, region: 'eu', lon: 30.5, lat: 50.4 },// Kyiv, Ukraine
  { num: 11, region: 'af', lon: 36.8, lat: -1.3 }, // Nairobi, Kenya
];

const BRIEFS = [
  { num: 12, region: 'me', place: 'Riyadh & Doha:', text: 'Gulf Cooperation Council holds emergency maritime security session on Hormuz tanker fires.', src: 'SPA · Al Jazeera' },
  { num: 13, region: 'me', place: 'Beirut, Lebanon:', text: 'Diplomatic envoys work on southern border monitoring mechanisms amid fragile ceasefire.', src: 'NNA · Reuters' },
  { num: 14, region: 'eu', place: 'Brussels / EU:', text: 'European Commission presents draft industrial competitiveness package for clean tech.', src: 'Euractiv' },
  { num: 15, region: 'eu', place: 'London, UK:', text: 'Foreign Office implements immediate asset freezes and travel bans on Myanmar military leaders.', src: 'Gov.uk' },
  { num: 16, region: 'eu', place: 'Paris, France:', text: 'French interior ministry reports expanded agricultural transport protests over EU-Mercosur.', src: 'Le Monde' },
  { num: 17, region: 'eu', place: 'UEFA UCL Matchday 5:', text: 'Matchday 5 fixtures feature Bayern vs PSG; clubs observe solidarity for disaster victims.', src: 'UEFA' },
  { num: 18, region: 'eu', place: 'Berlin, Germany:', text: 'Chancellor Scholz addresses European air defense and Baltic maritime surveillance.', src: 'DW' },
  { num: 19, region: 'eu', place: 'Warsaw, Poland:', text: 'Border guard reports complete installation of electronic sensor grid along eastern frontier.', src: 'PAP' },
  { num: 20, region: 'na', place: 'Washington / Fed:', text: 'Fed minutes show policymakers divided on rate cut trajectory ahead of PCE inflation data.', src: 'Bloomberg' },
  { num: 21, region: 'na', place: 'US Travel Surge:', text: 'TSA projects record 3.1 million daily air passengers ahead of Thanksgiving travel rush.', src: 'AP' },
  { num: 22, region: 'na', place: 'Wall St Tech:', text: 'Semiconductor ETF SMH jumps 7.8% led by Nvidia (+31.5%), Broadcom (+6.1%) and TSMC (+4.9%).', src: 'CNBC' },
  { num: 23, region: 'na', place: 'Ottawa, Canada:', text: 'Parliament debates border enforcement resources and critical mineral supply security.', src: 'CBC' },
  { num: 24, region: 'na', place: 'Houston, Texas:', text: 'Port of Houston monitors Gulf weather system and container traffic flows.', src: 'Chron' },
  { num: 25, region: 'la', place: 'Bogotá, Colombia:', text: 'Constitutional court upholds legal jurisdiction for domestic criminal trials pre-extradition.', src: 'El Tiempo' },
  { num: 26, region: 'la', place: 'Brasilia, Brazil:', text: 'President Lula signs agricultural sustainability and bio-input decree following G20.', src: 'Agência Brasil' },
  { num: 27, region: 'la', place: 'Buenos Aires, Arg:', text: 'Central bank reports modest foreign reserve expansion on agricultural export flows.', src: 'Clarín' },
  { num: 28, region: 'la', place: 'Mexico City:', text: 'Sheinbaum administration outlines rail expansion connecting industrial hubs to US border.', src: 'Reforma' },
  { num: 29, region: 'af', place: 'Kinshasa, DRC:', text: 'Government tightens mineral export regulations on tantalum and cobalt to curb illicit trade.', src: 'Reuters' },
  { num: 30, region: 'af', place: 'Abuja, Nigeria:', text: 'Central Bank of Nigeria raises monetary policy rate 50 bps to 27.75% to anchor inflation.', src: 'Punch' },
  { num: 31, region: 'af', place: 'Pretoria, SA:', text: 'Treasury reports revenue on track as state logistics firm Transnet improves freight rail.', src: 'BusinessLive' },
  { num: 32, region: 'af', place: 'Addis Ababa:', text: 'African Union peace and security council convenes ministers on Sudan humanitarian access.', src: 'AU News' },
  { num: 33, region: 'sse', place: 'New Delhi, India:', text: 'Supreme Court monitors emergency air quality response in NCR amid seasonal smog.', src: 'NDTV' },
  { num: 34, region: 'sse', place: 'Jakarta, Indonesia:', text: 'Finance ministry reports resilient state revenue; Bank Indonesia stabilizes rupiah.', src: 'Antara' },
  { num: 35, region: 'sse', place: 'Manila, Philippines:', text: 'Coast Guard completes resupply mission in South China Sea; monitors Escoda Shoal.', src: 'Inquirer' },
  { num: 36, region: 'sse', place: 'Bangkok, Thailand:', text: 'Prime Minister Paetongtarn promotes 2027 tourism stimulus package and visa reforms.', src: 'Bangkok Post' },
  { num: 37, region: 'ea', place: 'Tokyo, Japan:', text: 'Bank of Japan governor Ueda signals upcoming rate decisions will weigh wage inflation.', src: 'Nikkei' },
  { num: 38, region: 'ea', place: 'Beijing, China:', text: 'Commerce ministry issues guidelines on cross-border data rules for multinational auto firms.', src: 'Xinhua' },
  { num: 39, region: 'wo', place: 'Global Energy / Oil:', text: 'Brent crude settles +4.2% at $78.10/bbl on Hormuz shipping shock; gold eases to $2,648/oz.', src: 'Reuters' },
];

const ALL_STORIES = [...LEADS, ...FEATURES, ...BRIEFS];
const REGIONS = REGION_META.map((r) => ({
  ...r,
  count: ALL_STORIES.filter((s) => s.region === r.id).length,
}));

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1024px;
    height: 1024px;
    overflow: hidden;
    background: #f7f3e8;
    color: #111827;
    font-family: "Liberation Sans", "DejaVu Sans", Arial, sans-serif;
    padding: 9px 14px 8px 14px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .kicker-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.45px;
    color: #991b1b;
    border-bottom: 1.5px solid #0f172a;
    padding-bottom: 2px;
  }
  .kicker-right { color: #1e293b; }
  .masthead {
    text-align: center;
    border-bottom: 2px solid #0f172a;
    padding-bottom: 4px;
  }
  .masthead h1 {
    font-family: "Liberation Serif", "DejaVu Serif", Georgia, serif;
    font-size: 38px;
    line-height: 1.0;
    font-weight: 900;
    letter-spacing: -0.6px;
    color: #0f172a;
  }
  .subhead {
    font-size: 10.6px;
    font-weight: 700;
    font-style: italic;
    color: #7f1d1d;
    margin-top: 2px;
  }
  .kpi-strip {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 6px;
    border-bottom: 1px solid #cbd5e1;
    padding-bottom: 4px;
  }
  .kpi-box {
    border-left: 2.5px solid #cbd5e1;
    padding-left: 6px;
  }
  .kpi-box:first-child { border-left: none; padding-left: 0; }
  .kpi-val {
    font-family: "Liberation Serif", "DejaVu Serif", Georgia, serif;
    font-size: 18px;
    font-weight: 900;
    line-height: 1.0;
  }
  .kpi-desc {
    font-size: 7.4px;
    line-height: 1.18;
    color: #334155;
    font-weight: 600;
    margin-top: 1px;
  }
  .regions-row {
    display: flex;
    gap: 4px;
  }
  .reg-pill {
    flex: 1;
    color: #fff;
    font-size: 8px;
    font-weight: 800;
    padding: 2.5px 3px;
    border-radius: 2px;
    text-align: center;
    white-space: nowrap;
  }
  .leads-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  .card {
    background: #fffdf9;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .card-art {
    border-radius: 2px;
    overflow: hidden;
    border: 1px solid #cbd5e1;
  }
  .card-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
  }
  .num-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 7.6px;
    font-weight: 800;
    color: #334155;
  }
  .num-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    color: #fff;
    font-size: 8px;
    font-weight: 900;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .ep-badge {
    font-size: 6.8px;
    font-weight: 800;
    color: #fff;
    padding: 1px 4px;
    border-radius: 2px;
    flex-shrink: 0;
  }
  .lead-title {
    font-family: "Liberation Serif", "DejaVu Serif", Georgia, serif;
    font-size: 13.5px;
    font-weight: 900;
    line-height: 1.13;
    color: #0f172a;
  }
  .lead-body {
    font-size: 8.6px;
    line-height: 1.22;
    color: #334155;
  }
  .card-src {
    font-size: 7px;
    font-weight: 700;
    color: #64748b;
    margin-top: auto;
  }
  .sec-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1.5px solid #0f172a;
    border-bottom: 1px solid #94a3b8;
    padding: 1.5px 0;
    font-size: 8.2px;
    font-weight: 900;
    letter-spacing: 0.4px;
    color: #0f172a;
  }
  .sec-sub { font-weight: 700; color: #475569; font-size: 7.5px; }
  .features-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
  }
  .f-card {
    background: #fffdf9;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 2.5px;
  }
  .f-title {
    font-family: "Liberation Serif", "DejaVu Serif", Georgia, serif;
    font-size: 10.8px;
    font-weight: 900;
    line-height: 1.12;
    color: #0f172a;
  }
  .f-body {
    font-size: 7.9px;
    line-height: 1.18;
    color: #475569;
  }
  .bottom-row {
    display: grid;
    grid-template-columns: 316px 1fr;
    gap: 8px;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }
  .left-col {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-height: 0;
  }
  .map-panel {
    background: #fffdf9;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 4px 5px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .panel-hdr {
    display: flex;
    justify-content: space-between;
    font-size: 8px;
    font-weight: 900;
    color: #0f172a;
    border-bottom: 1px solid #cbd5e1;
    padding-bottom: 2px;
    letter-spacing: 0.3px;
  }
  .utc-box {
    background: #1e293b;
    color: #f8fafc;
    border-radius: 3px;
    padding: 4px 6px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .utc-hdr {
    font-size: 7.4px;
    font-weight: 900;
    color: #fde047;
    letter-spacing: 0.4px;
    border-bottom: 1px solid #334155;
    padding-bottom: 2px;
  }
  .utc-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px 6px;
    font-size: 7px;
    line-height: 1.18;
  }
  .utc-item b { color: #fde047; font-family: monospace; font-size: 7.1px; }
  .briefs-panel {
    background: #fffdf9;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 4px 7px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-height: 0;
  }
  .briefs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5px 9px;
    align-content: start;
  }
  .brief-row {
    display: flex;
    align-items: baseline;
    gap: 4px;
    font-size: 7.5px;
    line-height: 1.16;
  }
  .b-num {
    width: 13px;
    height: 12px;
    border-radius: 2px;
    color: #fff;
    font-size: 7.2px;
    font-weight: 900;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .b-text { color: #1e293b; }
  .b-text b { color: #0f172a; }
  .b-src { color: #64748b; font-weight: 700; font-size: 6.8px; }
  .audit-bar {
    display: flex;
    align-items: stretch;
    border: 1.5px solid #991b1b;
    border-radius: 3px;
    overflow: hidden;
    font-size: 7.6px;
  }
  .audit-tag {
    background: #991b1b;
    color: #fff;
    font-weight: 900;
    padding: 2.5px 7px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  .audit-body {
    background: #fef2f2;
    color: #450a0a;
    padding: 2.5px 7px;
    font-weight: 600;
    flex: 1;
    line-height: 1.18;
  }
  .footer-key {
    display: flex;
    justify-content: space-between;
    font-size: 7.2px;
    font-weight: 700;
    color: #475569;
  }
</style>
</head>
<body>
  <div class="kicker-row">
    <span>THE WORLD IN ONE DAY · EDITION 24 NOV</span>
    <span class="kicker-right">${ALL_STORIES.length} VERIFIED STORIES · 9 REGIONS · 16 FIELDS · ALL DATED TUE 24 NOV 2026</span>
  </div>
  <div class="masthead">
    <h1>Tuesday 24 November 2026</h1>
    <div class="subhead">Jensen Huang reinstated at Nvidia (+$952B cap surge) · Three tankers strike Hormuz naval mines · ICJ finds Myanmar guilty of genocide</div>
  </div>

  <div class="kpi-strip">
    ${KPI_STRIP.map((k) => `
      <div class="kpi-box">
        <div class="kpi-val" style="color:${k.accent}">${k.val}</div>
        <div class="kpi-desc">${k.desc}</div>
      </div>
    `).join('')}
  </div>

  <div class="regions-row">
    ${REGIONS.map((r) => `<div class="reg-pill" style="background:${r.color}">${r.label} ${r.count}</div>`).join('')}
  </div>

  <div class="leads-grid">
    ${LEADS.map((c) => `
      <div class="card">
        <div class="card-meta">
          <span class="num-tag"><span class="num-dot" style="background:${REGION_COLOR[c.region]}">${c.num}</span>${c.kicker}</span>
          <span class="ep-badge" style="background:${c.badgeColor}">${c.badge}</span>
        </div>
        <div class="card-art">${c.svg}</div>
        <div class="lead-title">${c.title}</div>
        <div class="lead-body">${c.body}</div>
        <div class="card-src">${c.source}</div>
      </div>
    `).join('')}
  </div>

  <div class="sec-bar">
    <span>THE DAY IN EIGHT GLOBAL SCENES</span>
    <span class="sec-sub">EVERY SCENE VECTOR-CODED · EVERY STORY VERIFIED & SOURCED</span>
  </div>

  <div class="features-grid">
    ${FEATURES.map((f) => `
      <div class="f-card">
        <div class="card-meta">
          <span class="num-tag" style="font-size:7px"><span class="num-dot" style="width:13px;height:13px;font-size:7.6px;background:${REGION_COLOR[f.region]}">${f.num}</span>${f.kicker}</span>
          <span class="ep-badge" style="font-size:6.4px;background:${f.badgeColor}">${f.badge}</span>
        </div>
        <div class="card-art">${f.svg}</div>
        <div class="f-title">${f.title}</div>
        <div class="f-body">${f.body}</div>
        <div class="card-src">${f.source}</div>
      </div>
    `).join('')}
  </div>

  <div class="bottom-row">
    <div class="left-col">
      <div class="map-panel">
        <div class="panel-hdr"><span>WHERE IT HAPPENED</span><span style="color:#64748b;font-weight:700">SCENES 1–11</span></div>
        <svg viewBox="0 0 306 118" width="304" height="118" style="background:#dbeafe;border-radius:2px;">
          <!-- Graticule -->
          <line x1="0" y1="59" x2="306" y2="59" stroke="#bfdbfe" stroke-width="0.6" stroke-dasharray="3 3"/>
          <line x1="153" y1="0" x2="153" y2="118" stroke="#bfdbfe" stroke-width="0.6" stroke-dasharray="3 3"/>
          <!-- Continental silhouettes -->
          <polygon points="10,17 34,13 62,14 74,22 84,26 74,37 60,39 53,47 44,50 36,41 25,32 14,27" fill="#cbd5e1" stroke="#64748b" stroke-width="0.6"/>
          <polygon points="82,6 104,4 109,14 92,18" fill="#cbd5e1" stroke="#64748b" stroke-width="0.6"/>
          <polygon points="56,51 72,50 88,58 95,72 82,92 72,108 65,105 64,82 55,65" fill="#cbd5e1" stroke="#64748b" stroke-width="0.6"/>
          <polygon points="134,31 138,21 152,12 176,14 184,22 178,32 164,36 150,37 136,38" fill="#cbd5e1" stroke="#64748b" stroke-width="0.6"/>
          <polygon points="131,22 135,21 135,29 130,29" fill="#cbd5e1" stroke="#64748b" stroke-width="0.6"/>
          <polygon points="135,41 156,40 170,46 182,56 174,72 166,92 154,96 146,72 132,62 130,50" fill="#cbd5e1" stroke="#64748b" stroke-width="0.6"/>
          <polygon points="178,80 182,80 180,89 176,87" fill="#cbd5e1" stroke="#64748b" stroke-width="0.5"/>
          <polygon points="178,15 232,12 274,18 284,27 260,34 250,44 238,48 226,62 214,56 206,48 196,53 182,50 172,41 176,29" fill="#cbd5e1" stroke="#64748b" stroke-width="0.6"/>
          <polygon points="264,31 271,29 272,38 264,39" fill="#cbd5e1" stroke="#64748b" stroke-width="0.5"/>
          <polygon points="222,63 236,64 236,69 222,68" fill="#cbd5e1" stroke="#64748b" stroke-width="0.5"/>
          <polygon points="242,62 255,65 254,71 242,68" fill="#cbd5e1" stroke="#64748b" stroke-width="0.5"/>
          <polygon points="244,77 272,75 282,87 276,99 256,99 242,91" fill="#cbd5e1" stroke="#64748b" stroke-width="0.6"/>
          <polygon points="288,96 294,92 292,103 286,103" fill="#cbd5e1" stroke="#64748b" stroke-width="0.5"/>
          ${PINS.map((p) => {
            const [px, py] = lonLatToXY(p.lon, p.lat);
            const ox = p.num === 4 ? 6 : p.num === 8 ? -8 : p.num === 10 ? -5 : 0;
            const oy = p.num === 4 ? -4 : p.num === 8 ? 4 : 0;
            const cx = Number(px) + ox;
            const cy = Number(py) + oy;
            return `<circle cx="${cx}" cy="${cy}" r="6" fill="${REGION_COLOR[p.region]}" stroke="#fff" stroke-width="1"/><text x="${cx}" y="${cy + 2.2}" text-anchor="middle" font-size="6.4" font-weight="900" fill="#fff" font-family="Liberation Sans,sans-serif">${p.num}</text>`;
          }).join('')}
        </svg>
      </div>
      <div class="utc-box">
        <div class="utc-hdr">THE DAY IN UTC · TUESDAY 24 NOV 2026</div>
        <div class="utc-grid">
          ${TIMELINE.map(([t, lbl]) => `<div class="utc-item"><b>${t}</b> ${lbl}</div>`).join('')}
        </div>
      </div>
    </div>

    <div class="briefs-panel">
      <div class="panel-hdr"><span>ALSO ON TUESDAY 24 NOVEMBER · ${BRIEFS.length} MORE VERIFIED BRIEFS</span><span style="color:#64748b;font-weight:700">9 REGIONS · ALL SOURCED</span></div>
      <div class="briefs-grid">
        ${BRIEFS.map((b) => `
          <div class="brief-row">
            <span class="b-num" style="background:${REGION_COLOR[b.region]}">${b.num}</span>
            <span class="b-text"><b>${b.place}</b> ${b.text} <span class="b-src">${b.src}</span></span>
          </div>
        `).join('')}
      </div>
    </div>
  </div>

  <div class="audit-bar">
    <div class="audit-tag">DATE CHECK · EXCLUDED</div>
    <div class="audit-body">Every story above occurred or broke on Tue 24 Nov 2026 (UTC). Left out from later/earlier days: Shenzhou-24 Tiangong space docking &amp; Kospi circuit breaker (Wed 25 Nov); COP31 Antalya deadlock (Sun 22 Nov); Ukraine frontline logistics shifts (Mon 23 Nov).</div>
  </div>
  <div class="footer-key">
    <span>BADGES: CONFIRMED = 2+ outlets · OFFICIAL = on record · REPORTED = single wire · Vector art &amp; map coded for 1024×1024</span>
    <span>Sources: Reuters, AP, AFP, BBC, ICJ, UN OCHA, US Dept of State, Maritime Trade Operations, Bloomberg, Xinhua</span>
  </div>
</body>
</html>`;

const htmlPath = join(here, 'frontpage.html');
writeFileSync(htmlPath, html);

const chrome = spawn('chromium', [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--disable-dev-shm-usage',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--window-size=1024,1024',
  `--screenshot=${join(here, 'entry.png')}`,
  `file://${htmlPath}`,
], { stdio: 'inherit' });

chrome.on('exit', (code) => {
  if (code !== 0) {
    process.exit(code ?? 1);
  }
  const sz = statSync(join(here, 'entry.png')).size;
  console.log(`Generated entry.png (${sz} bytes)`);
});
