'use client'

import { useI18n } from '../i18n'

export default function Timeline() {
  const { t } = useI18n()

  return (
    <section 
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{ background: 'white' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p 
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--cv-secondary)' }}
          >
            {t('timeline.title')}
          </p>
          <h2 
            className="text-3xl sm:text-4xl font-semibold"
            style={{ color: 'var(--cv-primary)' }}
          >
            {t('timeline.heading')}
          </h2>
        </div>

        <div 
          className="grid md:grid-cols-2 gap-10 max-w-3xl mx-auto"
        >
          {/* Standard */}
          <div
            className="text-center"
            style={{
              background: '#f8fafc',
              borderRadius: '16px',
              padding: '32px'
            }}
          >
            <h3 
              className="text-xl mb-4"
              style={{ color: 'var(--cv-primary)' }}
            >
              {t('timeline.standard')}
            </h3>
            <div 
              className="text-5xl font-bold mb-2"
              style={{ color: 'var(--cv-primary)' }}
            >
              {t('timeline.standardTime')}
            </div>
            <p 
              className="text-sm"
              style={{ color: 'var(--cv-muted)' }}
            >
              {t('timeline.standardDesc')}
            </p>
          </div>

          {/* Premium */}
          <div
            className="text-center text-white"
            style={{
              background: 'linear-gradient(135deg, var(--cv-primary) 0%, #1a365d 100%)',
              borderRadius: '16px',
              padding: '32px'
            }}
          >
            <h3 className="text-xl mb-4">
              {t('timeline.express')}
            </h3>
            <div className="text-5xl font-bold mb-2">
              {t('timeline.expressTime')}
            </div>
            <p className="text-sm text-white/80">
              {t('timeline.expressDesc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
