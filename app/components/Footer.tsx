'use client'

import { useI18n } from '../i18n'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer 
      className="py-12 px-4 sm:px-6 lg:px-8"
      style={{ 
        background: 'var(--cv-primary)',
        color: 'white'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold mb-4">CareVoyage</div>
            <p className="text-sm text-white/70">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Services */}
          <div>
            <div className="font-semibold mb-4">{t('footer.services')}</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-white">{t('footer.screening')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.dental')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.tcm')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.surgery')}</a></li>
            </ul>
          </div>

          {/* Hospitals */}
          <div>
            <div className="font-semibold mb-4">{t('footer.hospitals')}</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-white">{t('footer.wch')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.cqmu1')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.sichuanTcm')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.westChinaDental')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="font-semibold mb-4">{t('footer.contact')}</div>
            <ul className="space-y-2 text-sm text-white/70">
              <li>📧 hello@carevoyageglobal.com</li>
              <li>📱 +86 1234 5678</li>
              <li>📍 {t('footer.address')}</li>
            </ul>
          </div>
        </div>

        <div 
          className="pt-8 text-center text-sm text-white/50"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          © 2026 CareVoyage. All rights reserved. Licensed in Hong Kong SAR.
        </div>
      </div>
    </footer>
  )
}
