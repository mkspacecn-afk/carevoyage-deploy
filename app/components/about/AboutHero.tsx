'use client'

import { useI18n } from '../../i18n'

export default function AboutHero() {
  const { t } = useI18n()

  return (
    <section 
      className="relative py-24 px-4 sm:px-6 lg:px-8 text-center"
      style={{
        background: 'linear-gradient(135deg, var(--cv-primary) 0%, #1a365d 100%)',
        color: 'white'
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          {t('about.title')}
        </h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          {t('about.subtitle')}
        </p>
      </div>
    </section>
  )
}
