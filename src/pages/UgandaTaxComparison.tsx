import { useState } from 'react'

// ── Tax bracket data ──────────────────────────────────────────────────────────

const PREV_BRACKETS = [
  { from: 0,          to: 235_000,    rate: 0,   label: 'UGX 0 – 235,000' },
  { from: 235_000,    to: 335_000,    rate: 10,  label: 'UGX 235,001 – 335,000' },
  { from: 335_000,    to: 410_000,    rate: 20,  label: 'UGX 335,001 – 410,000' },
  { from: 410_000,    to: 10_000_000, rate: 30,  label: 'UGX 410,001 – 10,000,000' },
  { from: 10_000_000, to: Infinity,   rate: 40,  label: 'Above UGX 10,000,000' },
]

const PROP_BRACKETS = [
  { from: 0,          to: 335_000,    rate: 0,   label: 'UGX 0 – 335,000' },
  { from: 335_000,    to: 410_000,    rate: 10,  label: 'UGX 335,001 – 410,000' },
  { from: 410_000,    to: 10_000_000, rate: 30,  label: 'UGX 410,001 – 10,000,000' },
  { from: 10_000_000, to: Infinity,   rate: 40,  label: 'Above UGX 10,000,000' },
]

function calcTax(monthly: number, brackets: typeof PREV_BRACKETS): number {
  let tax = 0
  for (const b of brackets) {
    if (monthly <= b.from) break
    const taxable = Math.min(monthly, b.to) - b.from
    tax += taxable * (b.rate / 100)
  }
  return tax
}

function fmt(n: number) {
  return `UGX ${Math.round(n).toLocaleString()}`
}

function pct(n: number, base: number) {
  if (base === 0) return '0.0%'
  return `${((n / base) * 100).toFixed(1)}%`
}

// ── Regional comparison data ──────────────────────────────────────────────────

const REGION = [
  { country: 'Uganda (proposed)', topRate: 40, color: '#F5A623', isUganda: true },
  { country: 'Kenya',             topRate: 35, color: '#1A2744', isUganda: false },
  { country: 'Tanzania',          topRate: 30, color: '#1A2744', isUganda: false },
  { country: 'Rwanda',            topRate: 30, color: '#1A2744', isUganda: false },
  { country: 'Burundi',           topRate: 30, color: '#1A2744', isUganda: false },
]

// ── Preset salary examples ────────────────────────────────────────────────────

const PRESETS = [
  { label: 'Min. wage (~UGX 6,000/day)', value: 180_000 },
  { label: 'Entry-level (UGX 500K)', value: 500_000 },
  { label: 'Mid-level (UGX 1.5M)', value: 1_500_000 },
  { label: 'Senior (UGX 5M)', value: 5_000_000 },
  { label: 'Executive (UGX 15M)', value: 15_000_000 },
]

// ── Styles ────────────────────────────────────────────────────────────────────

const S = {
  navy: '#1A2744',
  gold: '#F5A623',
  bg: '#f8f9fc',
  card: { background: 'white', borderRadius: 16, padding: '1.5rem', boxShadow: '0 2px 12px rgba(26,39,68,0.07)', border: '1px solid rgba(26,39,68,0.06)' } as React.CSSProperties,
  label: { fontFamily: 'DM Sans', fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 4 },
  heading: { fontFamily: 'Syne', fontWeight: 800, color: '#1A2744' },
  body: { fontFamily: 'DM Sans', color: '#374151', lineHeight: 1.7 },
}

// ─────────────────────────────────────────────────────────────────────────────

export function UgandaTaxComparison() {
  const [salary, setSalary] = useState(1_500_000)
  const [rawInput, setRawInput] = useState('1500000')

  const prevTax  = calcTax(salary, PREV_BRACKETS)
  const propTax  = calcTax(salary, PROP_BRACKETS)
  const saving   = prevTax - propTax
  const annualSaving = saving * 12

  function handleInput(v: string) {
    setRawInput(v)
    const n = parseFloat(v.replace(/,/g, ''))
    if (!isNaN(n) && n >= 0) setSalary(n)
  }

  return (
    <div style={{ fontFamily: 'DM Sans' }}>

      {/* ── Hero ── */}
      <section style={{ background: 'linear-gradient(135deg,#1A2744,#243660)', padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: 'rgba(245,166,35,0.15)', border: '1px solid rgba(245,166,35,0.3)', borderRadius: 20, padding: '0.3rem 1rem', marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'DM Sans', fontSize: '0.8rem', color: '#F5A623', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Finance Bill 2025</span>
          </div>
          <h1 style={{ ...S.heading, fontSize: 'clamp(2rem,5vw,3rem)', color: 'white', marginBottom: 16, lineHeight: 1.2 }}>
            Uganda Tax Regime<br />
            <span style={{ color: '#F5A623' }}>Previous vs. Proposed</span>
          </h1>
          <p style={{ ...S.body, color: 'rgba(255,255,255,0.7)', maxWidth: 620, fontSize: '1.05rem' }}>
            The 2025 Finance Bill proposes the first PAYE revision since 2012 — prioritising social equity and providing targeted relief to lower- and middle-income earners.
          </p>
        </div>
      </section>

      <div style={{ background: S.bg, padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

          {/* ── Key changes summary ── */}
          <section>
            <h2 style={{ ...S.heading, fontSize: '1.4rem', marginBottom: '1.25rem' }}>Key Changes at a Glance</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
              {[
                { icon: '📈', title: 'Tax-Free Threshold', prev: 'UGX 235,000/mo', prop: 'UGX 335,000/mo', change: '+43%', good: true },
                { icon: '🔢', title: 'Number of Bands', prev: '5 bands', prop: '4 bands', change: '−1 band', good: true },
                { icon: '🔝', title: 'Top Marginal Rate', prev: '40%', prop: '40%', change: 'Unchanged', good: false },
                { icon: '📅', title: 'Last PAYE Revision', prev: '2012 (13 yrs ago)', prop: '2025 (proposed)', change: 'Overdue update', good: true },
              ].map(item => (
                <div key={item.title} style={S.card}>
                  <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ ...S.label }}>{item.title}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'DM Sans', fontSize: '0.8rem', color: '#6B7A8D' }}>Before</span>
                      <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '0.85rem', color: S.navy }}>{item.prev}</span>
                    </div>
                    <div style={{ height: 1, background: '#f3f4f6' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'DM Sans', fontSize: '0.8rem', color: '#6B7A8D' }}>Proposed</span>
                      <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '0.85rem', color: item.good ? '#16a34a' : S.navy }}>{item.prop}</span>
                    </div>
                    <div style={{ marginTop: 4, background: item.good ? 'rgba(22,163,74,0.08)' : 'rgba(26,39,68,0.05)', borderRadius: 6, padding: '0.25rem 0.5rem', textAlign: 'center' }}>
                      <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '0.75rem', color: item.good ? '#16a34a' : '#6B7A8D' }}>{item.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── PAYE Brackets comparison ── */}
          <section>
            <h2 style={{ ...S.heading, fontSize: '1.4rem', marginBottom: '1.25rem' }}>PAYE Brackets — Monthly Income</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

              {/* Previous */}
              <div style={S.card}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#dc2626', flexShrink: 0 }} />
                  <span style={{ ...S.heading, fontSize: '1rem' }}>Previous (2012–2024)</span>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ ...S.label, textAlign: 'left', paddingBottom: 8, display: 'table-cell' }}>Income Band</th>
                      <th style={{ ...S.label, textAlign: 'right', paddingBottom: 8, display: 'table-cell' }}>Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PREV_BRACKETS.map((b, i) => (
                      <tr key={i} style={{ borderTop: '1px solid #f3f4f6' }}>
                        <td style={{ fontFamily: 'DM Sans', fontSize: '0.82rem', color: '#374151', padding: '0.55rem 0' }}>{b.label}</td>
                        <td style={{ textAlign: 'right', padding: '0.55rem 0' }}>
                          <span style={{
                            fontFamily: 'Syne', fontWeight: 700, fontSize: '0.85rem',
                            color: b.rate === 0 ? '#16a34a' : b.rate === 40 ? '#dc2626' : S.navy,
                          }}>
                            {b.rate}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Proposed */}
              <div style={{ ...S.card, border: '2px solid rgba(245,166,35,0.4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#16a34a', flexShrink: 0 }} />
                  <span style={{ ...S.heading, fontSize: '1rem' }}>Proposed (Finance Bill 2025)</span>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ ...S.label, textAlign: 'left', paddingBottom: 8, display: 'table-cell' }}>Income Band</th>
                      <th style={{ ...S.label, textAlign: 'right', paddingBottom: 8, display: 'table-cell' }}>Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PROP_BRACKETS.map((b, i) => (
                      <tr key={i} style={{ borderTop: '1px solid #f3f4f6' }}>
                        <td style={{ fontFamily: 'DM Sans', fontSize: '0.82rem', color: '#374151', padding: '0.55rem 0' }}>
                          {b.label}
                          {i === 0 && <span style={{ marginLeft: 6, fontFamily: 'DM Sans', fontSize: '0.7rem', color: '#16a34a', fontWeight: 600 }}>▲ raised</span>}
                        </td>
                        <td style={{ textAlign: 'right', padding: '0.55rem 0' }}>
                          <span style={{
                            fontFamily: 'Syne', fontWeight: 700, fontSize: '0.85rem',
                            color: b.rate === 0 ? '#16a34a' : b.rate === 40 ? '#dc2626' : S.navy,
                          }}>
                            {b.rate}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ marginTop: '1rem', background: 'rgba(245,166,35,0.08)', borderRadius: 8, padding: '0.6rem 0.75rem' }}>
                  <p style={{ fontFamily: 'DM Sans', fontSize: '0.78rem', color: '#6B7A8D', margin: 0 }}>
                    Note: The 20% band is removed. Earners above UGX 410,000 move directly from 10% to 30%.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Tax Calculator ── */}
          <section>
            <h2 style={{ ...S.heading, fontSize: '1.4rem', marginBottom: '1.25rem' }}>Tax Calculator</h2>
            <div style={S.card}>

              {/* Salary input */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ ...S.label, display: 'block', marginBottom: 8 }}>Monthly Gross Salary (UGX)</label>
                <input
                  type="number"
                  value={rawInput}
                  onChange={e => handleInput(e.target.value)}
                  min={0}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    border: '2px solid #e5e7eb', borderRadius: 10, padding: '0.7rem 1rem',
                    fontFamily: 'Syne', fontWeight: 700, fontSize: '1.1rem', color: S.navy,
                    outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => { e.target.style.borderColor = S.gold }}
                  onBlur={e => { e.target.style.borderColor = '#e5e7eb' }}
                />

                {/* Quick presets */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                  {PRESETS.map(p => (
                    <button
                      key={p.value}
                      onClick={() => { setSalary(p.value); setRawInput(String(p.value)) }}
                      style={{
                        fontFamily: 'DM Sans', fontSize: '0.75rem', padding: '0.3rem 0.7rem',
                        borderRadius: 20, border: '1.5px solid',
                        borderColor: salary === p.value ? S.gold : '#e5e7eb',
                        background: salary === p.value ? 'rgba(245,166,35,0.1)' : 'white',
                        color: salary === p.value ? S.navy : '#6B7A8D',
                        cursor: 'pointer', fontWeight: salary === p.value ? 700 : 400,
                        transition: 'all 0.15s',
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 16 }}>
                {[
                  { label: 'Tax — Previous', value: fmt(prevTax), sub: `Effective: ${pct(prevTax, salary)}`, accent: '#dc2626' },
                  { label: 'Tax — Proposed', value: fmt(propTax), sub: `Effective: ${pct(propTax, salary)}`, accent: '#16a34a' },
                  { label: 'Monthly Saving', value: fmt(saving), sub: saving > 0 ? 'more in your pocket' : 'no change', accent: S.gold },
                  { label: 'Annual Saving', value: fmt(annualSaving), sub: 'over 12 months', accent: S.gold },
                ].map(r => (
                  <div key={r.label} style={{ background: '#f8f9fc', borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
                    <div style={{ ...S.label, marginBottom: 6 }}>{r.label}</div>
                    <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.05rem', color: r.accent }}>{r.value}</div>
                    <div style={{ fontFamily: 'DM Sans', fontSize: '0.75rem', color: '#9ca3af', marginTop: 4 }}>{r.sub}</div>
                  </div>
                ))}
              </div>

              {/* Visual bar */}
              {salary > 0 && (
                <div style={{ marginTop: '1.5rem' }}>
                  <div style={{ ...S.label, marginBottom: 8 }}>Tax Burden Comparison</div>
                  {[
                    { label: 'Previous', tax: prevTax, color: '#dc2626' },
                    { label: 'Proposed', tax: propTax, color: '#16a34a' },
                  ].map(r => {
                    const barPct = salary > 0 ? Math.min((r.tax / salary) * 100, 100) : 0
                    return (
                      <div key={r.label} style={{ marginBottom: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontFamily: 'DM Sans', fontSize: '0.82rem', color: '#374151' }}>{r.label}</span>
                          <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '0.82rem', color: r.color }}>{pct(r.tax, salary)}</span>
                        </div>
                        <div style={{ height: 10, background: '#f3f4f6', borderRadius: 99, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${barPct}%`, background: r.color, borderRadius: 99, transition: 'width 0.4s ease' }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </section>

          {/* ── Regional comparison ── */}
          <section>
            <h2 style={{ ...S.heading, fontSize: '1.4rem', marginBottom: '0.5rem' }}>Regional PAYE Comparison — Top Marginal Rate</h2>
            <p style={{ ...S.body, fontSize: '0.9rem', color: '#6B7A8D', marginBottom: '1.25rem' }}>
              Even after proposed changes, Uganda retains the highest top rate in the East African region.
            </p>
            <div style={S.card}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {REGION.map(r => {
                  const barW = `${(r.topRate / 45) * 100}%`
                  return (
                    <div key={r.country}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontFamily: r.isUganda ? 'Syne' : 'DM Sans', fontWeight: r.isUganda ? 700 : 400, fontSize: '0.9rem', color: r.isUganda ? S.navy : '#374151' }}>
                          {r.country}
                          {r.isUganda && <span style={{ marginLeft: 8, fontFamily: 'DM Sans', fontSize: '0.72rem', color: S.gold, background: 'rgba(245,166,35,0.12)', borderRadius: 10, padding: '0.1rem 0.5rem' }}>Highest in region</span>}
                        </span>
                        <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '0.95rem', color: r.isUganda ? '#dc2626' : S.navy }}>{r.topRate}%</span>
                      </div>
                      <div style={{ height: 12, background: '#f3f4f6', borderRadius: 99, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: barW, background: r.isUganda ? '#dc2626' : '#1A2744', borderRadius: 99, opacity: r.isUganda ? 1 : 0.45 }} />
                      </div>
                    </div>
                  )
                })}
              </div>
              <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: 'rgba(220,38,38,0.05)', borderRadius: 10, borderLeft: '3px solid #dc2626' }}>
                <p style={{ fontFamily: 'DM Sans', fontSize: '0.85rem', color: '#374151', margin: 0, lineHeight: 1.6 }}>
                  Uganda's 40% top PAYE rate — the highest in East Africa — remains unchanged under the proposed regime. By comparison, Kenya levies 35%, while Tanzania, Rwanda, and Burundi all cap at 30%, making Uganda's regime less competitive for attracting and retaining high-income talent.
                </p>
              </div>
            </div>
          </section>

          {/* ── Analysis ── */}
          <section>
            <h2 style={{ ...S.heading, fontSize: '1.4rem', marginBottom: '1.25rem' }}>Policy Analysis</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>

              <div style={S.card}>
                <div style={{ fontSize: '1.4rem', marginBottom: 10 }}>✅</div>
                <h3 style={{ ...S.heading, fontSize: '1rem', marginBottom: 8, color: '#16a34a' }}>What Works</h3>
                <ul style={{ ...S.body, fontSize: '0.875rem', paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li>Tax-free threshold raised by UGX 100,000 — the first increase since 2012.</li>
                  <li>Lower-income earners below UGX 335,000 now pay zero PAYE.</li>
                  <li>Timely relief given 13 years of inflation and rising cost of living.</li>
                  <li>Signals government responsiveness to public pressure on tax equity.</li>
                </ul>
              </div>

              <div style={S.card}>
                <div style={{ fontSize: '1.4rem', marginBottom: 10 }}>⚠️</div>
                <h3 style={{ ...S.heading, fontSize: '1rem', marginBottom: 8, color: '#d97706' }}>Remaining Concerns</h3>
                <ul style={{ ...S.body, fontSize: '0.875rem', paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li>Top marginal rate of 40% stays highest in East Africa.</li>
                  <li>Removing the 20% band means earners above UGX 410K jump straight to 30%.</li>
                  <li>No indexing mechanism — brackets will erode again over time without future revisions.</li>
                  <li>Revenue shortfall from relief must be offset elsewhere.</li>
                </ul>
              </div>

              <div style={S.card}>
                <div style={{ fontSize: '1.4rem', marginBottom: 10 }}>🔭</div>
                <h3 style={{ ...S.heading, fontSize: '1rem', marginBottom: 8 }}>The Bigger Picture</h3>
                <ul style={{ ...S.body, fontSize: '0.875rem', paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li>Social equity is prioritised over pure revenue mobilisation.</li>
                  <li>Uganda's PAYE competitiveness gap with peers remains wide.</li>
                  <li>Future reforms should consider annual bracket indexation to inflation.</li>
                  <li>Broadening the tax base (informal sector) matters more long-term.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ── Disclaimer ── */}
          <p style={{ fontFamily: 'DM Sans', fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center', lineHeight: 1.6 }}>
            Based on Finance Bill 2025 proposals and Uganda Revenue Authority schedules. Calculations are illustrative — verify with your tax advisor or URA.
          </p>

        </div>
      </div>
    </div>
  )
}
