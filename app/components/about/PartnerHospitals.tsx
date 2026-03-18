'use client'

import { useI18n } from '../../i18n'

export default function PartnerHospitals() {
  const { t } = useI18n()

  const hospitals = [
    { name: 'West China Hospital', badge: 'Top 3 China', desc: t('about.wchDesc') },
    { name: 'CQMU No.1 Hospital', badge: 'SW China Leader', desc: t('about.cqmu1Desc') },
    { name: 'CQMU No.2 Hospital', badge: 'Specialty Focus', desc: t('about.cqmu2Desc') },
    { name: 'Sichuan TCM Hospital', badge: 'National Master', desc: t('about.tcmDesc') },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: 'var(--cv-secondary)' }}
          >
            {t('about.partnersTag')}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6"
            style={{ color: 'var(--cv-primary)' }}
          >
            {t('about.partnersTitle')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {hospitals.map((h, index) => (
            <div key={index} className="flex items-start gap-4 p-6 rounded-xl"
              style={{ background: '#f8fafc' }}
            >
              <div className="text-3xl">🏥</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold" style={{ color: 'var(--cv-primary)' }}>
                    {h.name}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full text-white"
                    style={{ background: 'var(--cv-secondary)' }}
                  >
                    {h.badge}
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--cv-muted)' }}>{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
