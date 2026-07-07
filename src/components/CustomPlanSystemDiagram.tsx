import type { LangCode } from '../data/translations'
import { CPD } from '../data/customPlanContent'

const g = (key: string, lang: LangCode) => CPD[key][lang]

/* ─── Layout constants (viewBox 0 0 380 355) ─────────────────────────
 *
 *  Layer 1: 3 customer type boxes       y  14 → 56
 *  Arrows (diagonal)                    y  56 → 98
 *  Layer 2: Hub box                     y  98 → 142
 *  T-junction down + horizontal         y 142 → 162
 *  Drop arrows                          y 162 → 175
 *  Layer 3a: service row A              y 175 → 213
 *  Column connectors                    y 213 → 217
 *  Layer 3b: service row B              y 217 → 255
 *  Inverted T-junction + arrow          y 255 → 282
 *  Layer 4: Trust badge                 y 282 → 345
 * ──────────────────────────────────────────────────────────────────── */

const SVC_A = [
  { x:   8, cx:  63, key: 's1' },
  { x: 135, cx: 190, key: 's2' },
  { x: 262, cx: 317, key: 's3' },
] as const

const SVC_B = [
  { x:   8, cx:  63, key: 's4' },
  { x: 135, cx: 190, key: 's5' },
  { x: 262, cx: 317, key: 's6' },
] as const

export default function CustomPlanSystemDiagram({ lang }: { lang: LangCode }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <div style={{ padding: '8px 12px 12px' }}>
      <svg
        width="100%"
        viewBox="0 0 380 355"
        style={{ maxWidth: 480, display: 'block', margin: '0 auto', overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          <marker id="cpd-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <polygon points="0,0 8,4 0,8" fill="#94A3B8" />
          </marker>
        </defs>

        {/* ── Layer 1: 3 customer type boxes ── */}
        {[
          { x:   8, cx:  63, key: 'c1' },
          { x: 135, cx: 190, key: 'c2' },
          { x: 262, cx: 317, key: 'c3' },
        ].map(({ x, cx, key }) => (
          <g key={key}>
            <rect x={x} y="14" width="110" height="42" rx="7"
              fill="#EBF4FF" stroke="#3B82F6" strokeWidth="1.5" />
            <text x={cx} y="40" textAnchor="middle" fontSize="11"
              fontWeight="700" fill="#1E40AF" direction={dir}>
              {g(key, lang)}
            </text>
          </g>
        ))}

        {/* ── Arrows: customer boxes → hub (diagonal) ── */}
        <line x1="63"  y1="56" x2="127" y2="98" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#cpd-arr)" />
        <line x1="190" y1="56" x2="190" y2="98" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#cpd-arr)" />
        <line x1="317" y1="56" x2="253" y2="98" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#cpd-arr)" />

        {/* ── Layer 2: Coordination hub ── */}
        <rect x="60" y="98" width="260" height="44" rx="8"
          fill="#FF6B35" stroke="#E5611F" strokeWidth="1.5" />
        <text x="190" y="125" textAnchor="middle" fontSize="13"
          fontWeight="700" fill="white" direction={dir}>
          {g('hub', lang)}
        </text>

        {/* ── Hub → services: T-junction ── */}
        {/* trunk */}
        <line x1="190" y1="142" x2="190" y2="162" stroke="#94A3B8" strokeWidth="1.5" />
        {/* horizontal bar */}
        <line x1="63" y1="162" x2="317" y2="162" stroke="#94A3B8" strokeWidth="1.5" />
        {/* 3 drops with arrows */}
        <line x1="63"  y1="162" x2="63"  y2="175" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#cpd-arr)" />
        <line x1="190" y1="162" x2="190" y2="175" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#cpd-arr)" />
        <line x1="317" y1="162" x2="317" y2="175" stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#cpd-arr)" />

        {/* ── Layer 3a: Service row A ── */}
        {SVC_A.map(({ x, cx, key }) => (
          <g key={key}>
            <rect x={x} y="175" width="110" height="38" rx="6"
              fill="#F0FFF4" stroke="#38A169" strokeWidth="1.3" />
            <text x={cx} y="199" textAnchor="middle" fontSize="11"
              fontWeight="700" fill="#276749" direction={dir}>
              {g(key, lang)}
            </text>
          </g>
        ))}

        {/* column connectors: row A → row B */}
        <line x1="63"  y1="213" x2="63"  y2="217" stroke="#94A3B8" strokeWidth="1.3" />
        <line x1="190" y1="213" x2="190" y2="217" stroke="#94A3B8" strokeWidth="1.3" />
        <line x1="317" y1="213" x2="317" y2="217" stroke="#94A3B8" strokeWidth="1.3" />

        {/* ── Layer 3b: Service row B ── */}
        {SVC_B.map(({ x, cx, key }) => (
          <g key={key}>
            <rect x={x} y="217" width="110" height="38" rx="6"
              fill="#F0FFF4" stroke="#38A169" strokeWidth="1.3" />
            <text x={cx} y="241" textAnchor="middle" fontSize="11"
              fontWeight="700" fill="#276749" direction={dir}>
              {g(key, lang)}
            </text>
          </g>
        ))}

        {/* ── Services → trust badge: inverted T-junction ── */}
        {/* 3 rises */}
        <line x1="63"  y1="255" x2="63"  y2="269" stroke="#94A3B8" strokeWidth="1.3" />
        <line x1="190" y1="255" x2="190" y2="269" stroke="#94A3B8" strokeWidth="1.3" />
        <line x1="317" y1="255" x2="317" y2="269" stroke="#94A3B8" strokeWidth="1.3" />
        {/* horizontal merge */}
        <line x1="63" y1="269" x2="317" y2="269" stroke="#94A3B8" strokeWidth="1.3" />
        {/* arrow down */}
        <line x1="190" y1="269" x2="190" y2="282" stroke="#94A3B8" strokeWidth="1.3" markerEnd="url(#cpd-arr)" />

        {/* ── Layer 4: Trust badge ── */}
        <rect x="8" y="286" width="364" height="62" rx="9"
          fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />
        <text x="190" y="310" textAnchor="middle" fontSize="11"
          fontWeight="700" fill="#92400E" direction={dir}>
          ✓ {g('b1', lang)}
        </text>
        <text x="190" y="334" textAnchor="middle" fontSize="11"
          fontWeight="700" fill="#92400E" direction={dir}>
          ✓ {g('b2', lang)}
        </text>
      </svg>
    </div>
  )
}
