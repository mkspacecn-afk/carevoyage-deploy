'use client'

import { useI18n } from '../../i18n'

export default function OurStory() {
  const { t } = useI18n()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: 'var(--cv-secondary)' }}
            >
              {t('about.storyTag')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6"
              style={{ color: 'var(--cv-primary)' }}
            >
              {t('about.storyTitle')}
            </h2>
            <p className="text-lg mb-6" style={{ color: 'var(--cv-muted)' }}>
              {t('about.storyP1')}
            </p>
            <p className="text-lg" style={{ color: 'var(--cv-muted)' }}>
              {t('about.storyP2')}
            </p>
          </div>
          
          <div 
            className="rounded-2xl p-12 text-center text-white"
            style={{ background: 'linear-gradient(135deg, var(--cv-primary) 0%, #1a365d 100%)' }}
          >
            <div className="text-6xl mb-4">🛡️</div>
            <div className="text-5xl font-bold mb-2">3,400+</div>
            <div className="text-lg opacity-90">{t('about.patientsHelped')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
