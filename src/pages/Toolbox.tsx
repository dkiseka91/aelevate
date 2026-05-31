import { useToolbox } from '@/hooks/useFirestore'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { Download, Eye, FileText, BookOpen, Wrench, CheckSquare, Package, CreditCard } from 'lucide-react'
import type React from 'react'

function formatUGX(n: number) {
  return n === 0 ? 'Free' : `UGX ${n.toLocaleString()}`
}

function TypeIcon({ type }: { type: string }) {
  const props = { size: 20, color: '#F5A623' }
  switch (type) {
    case 'template': return <FileText {...props} />
    case 'guide': return <BookOpen {...props} />
    case 'tool': return <Wrench {...props} />
    case 'checklist': return <CheckSquare {...props} />
    default: return <Package {...props} />
  }
}

const DOT_PATTERN: React.CSSProperties = {
  position: 'absolute', inset: 0, opacity: 0.04,
  backgroundImage: 'radial-gradient(circle, #F5A623 1px, transparent 1px)',
  backgroundSize: '40px 40px',
  pointerEvents: 'none',
}

export function Toolbox() {
  const { items, loading } = useToolbox()

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1A2744 0%, #243660 60%, #1A2744 100%)',
        padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={DOT_PATTERN} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', marginBottom: 16 }}>
            Entrepreneur's <span style={{ color: '#F5A623' }}>Toolbox</span>
          </h1>
          <p style={{ fontFamily: 'DM Sans', fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', maxWidth: 580, lineHeight: 1.7 }}>
            Templates, guides, checklists, and digital tools — built for Ugandan small businesses.
          </p>
        </div>
      </section>

      {/* Items */}
      <section style={{ background: '#f8f9fc', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {loading ? (
            <LoadingSpinner />
          ) : items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', fontFamily: 'DM Sans', color: '#9ca3af' }}>
              Tools and templates coming soon!
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {items.map(item => (
                <div
                  key={item.id}
                  style={{
                    background: 'white', borderRadius: 16, padding: '1.5rem',
                    boxShadow: '0 2px 12px rgba(26,39,68,0.06)', border: '1px solid rgba(26,39,68,0.06)',
                    display: 'flex', flexDirection: 'column',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.boxShadow = '0 8px 32px rgba(26,39,68,0.12)'
                    el.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.boxShadow = '0 2px 12px rgba(26,39,68,0.06)'
                    el.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: 'rgba(245,166,35,0.1)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <TypeIcon type={item.type} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'DM Sans', fontSize: '0.75rem', color: '#9ca3af', textTransform: 'capitalize', marginBottom: 4 }}>
                        {item.type}
                      </div>
                      <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1rem', color: '#1A2744' }}>
                        {item.title}
                      </h3>
                    </div>
                    <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '0.875rem', color: '#F5A623', flexShrink: 0 }}>
                      {formatUGX(item.price)}
                    </span>
                  </div>

                  <p style={{ fontFamily: 'DM Sans', fontSize: '0.875rem', color: '#6B7A8D', lineHeight: 1.6, flex: 1 }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', gap: 8, marginTop: '1rem' }}>
                    {item.previewUrl && (
                      <a
                        href={item.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                          border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '0.6rem',
                          fontFamily: 'DM Sans', fontSize: '0.85rem', color: '#374151', textDecoration: 'none',
                          transition: 'border-color 0.2s, color 0.2s',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = '#F5A623'
                          e.currentTarget.style.color = '#F5A623'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = '#e5e7eb'
                          e.currentTarget.style.color = '#374151'
                        }}
                      >
                        <Eye size={14} /> Preview
                      </a>
                    )}
                    {item.fileUrl && item.price === 0 ? (
                      <a
                        href={item.fileUrl}
                        download
                        style={{
                          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                          background: '#F5A623', borderRadius: 8, padding: '0.6rem',
                          fontFamily: 'Syne', fontWeight: 700, fontSize: '0.85rem', color: '#1A2744', textDecoration: 'none',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#e8951a')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#F5A623')}
                      >
                        <Download size={14} /> Download Free
                      </a>
                    ) : item.price > 0 ? (
                      <button
                        style={{
                          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                          background: '#F5A623', border: 'none', borderRadius: 8, padding: '0.6rem',
                          fontFamily: 'Syne', fontWeight: 700, fontSize: '0.85rem', color: '#1A2744', cursor: 'pointer',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#e8951a')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#F5A623')}
                      >
                        <CreditCard size={14} /> Buy — {formatUGX(item.price)}
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
