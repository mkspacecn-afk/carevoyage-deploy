'use client'

import { useI18n } from '../i18n'

const products = [
  {
    key: 'products.screening',
    hospitals: [
      { name: 'West China Hospital', price: '$12,000', primary: true, exclusive: 'Exclusive' },
      { name: 'CQMU No.1', price: '$8,000', primary: false },
      { name: 'Sichuan TCM', price: '$6,000', primary: false },
    ]
  },
  {
    key: 'products.dental',
    hospitals: [
      { name: 'West China Dental', price: '$15,000', primary: true, exclusive: 'Exclusive Tech' },
      { name: 'CQMU No.2', price: '$8,000', primary: false },
    ]
  },
  {
    key: 'products.tcm',
    hospitals: [
      { name: 'Sichuan TCM', price: '$5,000', primary: true, exclusive: 'Master' },
    ]
  },
]

export default function Products() {
  const { t } = useI18n()

  return (
    <section 
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{ background: '#f8fafc' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p 
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--cv-secondary)' }}
          >
            {t('products.title')}
          </p>
          <h2 
            className="text-3xl sm:text-4xl font-semibold"
            style={{ color: 'var(--cv-primary)' }}
          >
            {t('products.heading')}
          </h2>
        </div>

        <div className="space-y-6">
          {products.map((product, index) => (
            <div
              key={index}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}
            >
              <div className="flex justify-between items-center mb-5">
                <div 
                  className="text-xl font-semibold"
                  style={{ color: 'var(--cv-primary)' }}
                >
                  {t(product.key)}
                </div>
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
                  {t('products.compare')}
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {product.hospitals.map((hospital, hIndex) => (
                  <div
                    key={hIndex}
                    className="flex items-center gap-2"
                    style={{
                      background: hospital.primary 
                        ? 'linear-gradient(135deg, var(--cv-primary) 0%, #1a365d 100%)' 
                        : '#f0f4f8',
                      color: hospital.primary ? 'white' : 'var(--cv-text)',
                      padding: '12px 20px',
                      borderRadius: '8px',
                      fontSize: '13px'
                    }}
                  >
                    <span>🏥 {hospital.name}</span>
                    <span 
                      className="font-semibold"
                      style={{ 
                        color: hospital.primary ? '#fbbf24' : 'var(--cv-secondary)'
                      }}
                    >
                      {hospital.price}
                    </span>
                    {hospital.exclusive && (
                      <span
                        style={{
                          background: 'var(--cv-secondary)',
                          color: 'white',
                          fontSize: '10px',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          marginLeft: '4px'
                        }}
                      >
                        {t('products.exclusive')}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
