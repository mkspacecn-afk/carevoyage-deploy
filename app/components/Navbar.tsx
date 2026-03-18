'use client'

import { useI18n, cvLocales, type CVLocale } from '../i18n'

export default function Navbar() {
  const { t, locale, setLocale } = useI18n()

  const navLinks = [
    { key: 'nav.products', href: '#services' },
    { key: 'nav.hospitals', href: '#hospitals' },
    { key: 'nav.concierge', href: '#concierge' },
    { key: 'nav.about', href: '#about' },
  ]

  return (
    <nav 
      className="sticky top-0 z-50"
      style={{
        background: 'white',
        padding: '16px 40px',
        borderBottom: '1px solid var(--cv-border)'
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div 
          className="text-2xl font-bold tracking-tight"
          style={{ color: 'var(--cv-primary)' }}
        >
          CareVoyage
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-opacity-80"
              style={{ color: 'var(--cv-muted)' }}
            >
              {t(link.key)}
            </a>
          ))}
        </div>

        {/* Language Switcher + CTA */}
        <div className="flex items-center gap-4">
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as CVLocale)}
            className="text-sm border rounded-lg px-2 py-1"
            style={{ borderColor: 'var(--cv-border)', color: 'var(--cv-text)' }}
          >
            {cvLocales.map((lang) => (
              <option key={lang} value={lang}>
                {lang === 'zh-TW' ? '繁中' : lang === 'en' ? 'EN' : lang.toUpperCase()}
              </option>
            ))}
          </select>
          <button
            className="font-semibold transition-all hover:opacity-90"
            style={{
              background: 'var(--cv-primary)',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '24px',
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {t('nav.cta')}
          </button>
        </div>
      </div>
    </nav>
  )
}
