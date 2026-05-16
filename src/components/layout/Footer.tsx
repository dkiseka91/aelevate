import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'

const FOOTER_LINKS = [
  {
    title: 'Services',
    links: [
      ['Training Academy', '/training'],
      ['Advisory Services', '/advisory'],
      ['Opportunity Portal', '/opportunities'],
      ["Entrepreneur's Toolbox", '/toolbox'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About Us', '/about'],
      ['Shop Impact', '/shop'],
      ['Knowledge Base', '/knowledge'],
      ['Contact', '/about#contact'],
    ],
  },
]

export function Footer() {
  return (
    <footer style={{ background: '#0D1832', paddingTop: '4rem', paddingBottom: '1.5rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', border: '2.5px solid #F5A623',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'Syne', fontWeight: 800, color: '#F5A623' }}>A</span>
              </div>
              <div>
                <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1rem', color: 'white' }}>AElevate</div>
                <div style={{ fontFamily: 'DM Sans', fontSize: '0.6rem', color: '#F5A623', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Business Innovations
                </div>
              </div>
            </div>
            <p style={{ fontFamily: 'DM Sans', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 20 }}>
              Uganda's Small Business Success Hub — empowering entrepreneurs to grow and thrive.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { icon: MapPin, text: 'Naalya, Uganda' },
                { icon: Phone, text: '+256 786 259854' },
                { icon: Mail, text: 'elevatebusinesssolutions96@gmail.com' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon size={13} color="rgba(255,255,255,0.35)" />
                  <span style={{ fontFamily: 'DM Sans', fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {FOOTER_LINKS.map(section => (
            <div key={section.title}>
              <h5 style={{
                fontFamily: 'Syne', fontWeight: 700, fontSize: '0.85rem',
                color: '#F5A623', marginBottom: 16, letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>
                {section.title}
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {section.links.map(([label, path]) => (
                  <li key={label} style={{ marginBottom: 10 }}>
                    <Link
                      to={path}
                      style={{
                        fontFamily: 'DM Sans', fontSize: '0.85rem',
                        color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#F5A623')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Subscribe CTA */}
          <div>
            <h5 style={{
              fontFamily: 'Syne', fontWeight: 700, fontSize: '0.85rem',
              color: '#F5A623', marginBottom: 16, letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              Stay Updated
            </h5>
            <p style={{ fontFamily: 'DM Sans', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 16 }}>
              Get alerts on new grants, scholarships, and opportunities for your business.
            </p>
            <Link
              to="/subscribe"
              style={{
                display: 'inline-block', background: '#F5A623', borderRadius: 8,
                padding: '0.6rem 1.25rem', fontFamily: 'Syne', fontWeight: 700,
                fontSize: '0.82rem', color: '#1A2744', textDecoration: 'none',
              }}
            >
              Subscribe Now
            </Link>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ fontFamily: 'DM Sans', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>
            © 2025 AElevate Business Innovations. All rights reserved.
          </div>
          <div style={{ fontFamily: 'DM Sans', fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>
            Built for Ugandan Entrepreneurs
          </div>
        </div>
      </div>
    </footer>
  )
}
