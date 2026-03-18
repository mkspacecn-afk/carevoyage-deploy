'use client'

import { useI18n } from '../../i18n'

export default function ThreePersonTeam() {
  const { t } = useI18n()

  const team = [
    {
      icon: '👤',
      title: t('about.concierge'),
      desc: t('about.conciergeDesc'),
      features: [t('about.c1'), t('about.c2'), t('about.c3')]
    },
    {
      icon: '🏥',
      title: t('about.medical'),
      desc: t('about.medicalDesc'),
      features: [t('about.m1'), t('about.m2'), t('about.m3')]
    },
    {
      icon: '✈️',
      title: t('about.travel'),
      desc: t('about.travelDesc'),
      features: [t('about.t1'), t('about.t2'), t('about.t3')]
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ background: '#f8fafc' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: 'var(--cv-secondary)' }}
          >
            {t('about.teamTag')}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6"
            style={{ color: 'var(--cv-primary)' }}
          >
            {t('about.teamTitle')}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--cv-muted)' }}>
            {t('about.teamSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="text-5xl mb-4">{member.icon}</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--cv-primary)' }}>
                {member.title}
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--cv-muted)' }}>
                {member.desc}
              </p>
              <ul className="space-y-2">
                {member.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm"
                    style={{ color: 'var(--cv-text)' }}
                  >
                    <span style={{ color: 'var(--cv-secondary)' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
