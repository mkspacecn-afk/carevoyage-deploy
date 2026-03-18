'use client'

import { useState } from 'react'
import { useI18n } from '../i18n'

export default function Hero() {
  const { t } = useI18n()
  const [searchQuery, setSearchQuery] = useState('')

  const stats = [
    { number: '3,400+', label: t('stats.cases') },
    { number: '60%', label: t('stats.savings') },
    { number: '15min', label: t('stats.response') },
    { number: '98%', label: t('stats.satisfaction') },
  ]

  return (
    <section 
      className="relative py-20 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Main Headline */}
        <h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-light mb-4 tracking-tight"
          style={{ color: 'var(--cv-primary)' }}
        >
          {t('hero.title')}
          <br />
          <span className="font-bold">{t('hero.subtitle')}</span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-lg mb-10 max-w-2xl mx-auto"
          style={{ color: 'var(--cv-muted)' }}
        >
          {t('hero.description')}
        </p>

        {/* Search Box */}
        <div 
          className="max-w-2xl mx-auto mb-16 flex"
          style={{
            background: 'white',
            borderRadius: '50px',
            padding: '8px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('hero.placeholder')}
            className="flex-1 px-6 text-base outline-none bg-transparent"
            style={{ 
              padding: '16px 24px',
              color: '#1A1A1A',
            }}
          />
          <button 
            className="font-semibold transition-all hover:opacity-90"
            style={{
              background: 'var(--cv-secondary)',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '40px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            {t('hero.search')}
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-16 flex-wrap">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div 
                className="text-4xl font-bold mb-1"
                style={{ color: 'var(--cv-primary)' }}
              >
                {stat.number}
              </div>
              <div 
                className="text-sm"
                style={{ color: 'var(--cv-muted)' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
