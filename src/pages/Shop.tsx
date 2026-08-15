import { useProducts } from '@/hooks/useFirestore'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import type { Product } from '@/types'
import type React from 'react'

function formatUGX(n: number) {
  return `UGX ${n.toLocaleString()}`
}

const DOT_PATTERN: React.CSSProperties = {
  position: 'absolute', inset: 0, opacity: 0.04,
  backgroundImage: 'radial-gradient(circle, #F5A623 1px, transparent 1px)',
  backgroundSize: '40px 40px',
  pointerEvents: 'none',
}

interface ShopProps {
  onAddToCart: (product: Product) => void
  onCartOpen: () => void
}

export function Shop({ onAddToCart, onCartOpen }: ShopProps) {
  const { products, loading } = useProducts()

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
            Social Enterprise <span style={{ color: '#F5A623' }}>Shop</span>
          </h1>
          <p style={{ fontFamily: 'DM Sans', fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', maxWidth: 580, lineHeight: 1.7 }}>
            Every purchase supports Ugandan artisans & youth trainees.
          </p>
        </div>
      </section>

      {/* Products */}
      <section style={{ background: '#f8f9fc', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {loading ? (
            <LoadingSpinner />
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', fontFamily: 'DM Sans', color: '#9ca3af' }}>
              Products coming soon. Check back shortly!
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
              {products.map(product => (
                <div
                  key={product.id}
                  style={{
                    background: 'white', borderRadius: 16, overflow: 'hidden',
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
                  <div style={{ height: 220, background: '#f3f4f6', position: 'relative', overflow: 'hidden' }}>
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#d1d5db', fontSize: '3rem' }}>🛍️</div>
                    )}
                    {!product.inStock && (
                      <div style={{
                        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'Syne', fontWeight: 700, color: 'white', fontSize: '1rem',
                      }}>
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontFamily: 'DM Sans', fontSize: '0.75rem', color: '#9ca3af', marginBottom: 4 }}>
                      {product.category}
                    </div>
                    <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1rem', color: '#1A2744', marginBottom: 8 }}>
                      {product.name}
                    </h3>
                    <p style={{ fontFamily: 'DM Sans', fontSize: '0.85rem', color: '#6B7A8D', lineHeight: 1.6, flex: 1 }}>
                      {product.description}
                    </p>
                    {product.impact && (
                      <div style={{
                        background: 'rgba(22,163,74,0.08)', borderRadius: 8,
                        padding: '0.5rem 0.75rem', margin: '0.75rem 0',
                        fontFamily: 'DM Sans', fontSize: '0.78rem', color: '#16a34a',
                      }}>
                        {product.impact}
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 12 }}>
                      <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1rem', color: '#1A2744' }}>
                        {formatUGX(product.price)}
                      </span>
                      <button
                        onClick={() => { onAddToCart(product); onCartOpen() }}
                        disabled={!product.inStock}
                        style={{
                          background: product.inStock ? '#F5A623' : '#e5e7eb',
                          border: 'none', borderRadius: 8, padding: '0.5rem 1rem',
                          fontFamily: 'Syne', fontWeight: 700, fontSize: '0.85rem',
                          color: product.inStock ? '#1A2744' : '#9ca3af',
                          cursor: product.inStock ? 'pointer' : 'not-allowed',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={e => { if (product.inStock) (e.currentTarget).style.background = '#e8951a' }}
                        onMouseLeave={e => { if (product.inStock) (e.currentTarget).style.background = '#F5A623' }}
                      >
                        Add to Cart
                      </button>
                    </div>
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
