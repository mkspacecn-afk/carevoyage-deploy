'use client'

import { useI18n } from '../i18n'

export default function Features() {
  const { t } = useI18n()

  const features = [
    {
      icon: '⚡',
      title: t('features.speed'),
      description: t('features.speedDesc')
    },
    {
      icon: '🏥',
      title: t('features.hospitals'),
      description: t('features.hospitalsDesc')
    },
    {
      icon: '👤',
      title: t('features.team'),
      description: t('features.teamDesc')
    },
  ]

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
            {t('features.title')}
          </p>
          <h2 
            className="text-3xl sm:text-4xl font-semibold"
            style={{ color: 'var(--cv-primary)' }}
          >
            {t('features.heading')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center"
              style={{
                background: '#f8fafc',
                borderRadius: '16px',
                padding: '32px',
              }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--cv-primary)' }}
              >
                {feature.title}
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: 'var(--cv-muted)' }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
