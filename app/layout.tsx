import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { I18nProvider } from './i18n'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'CareVoyage - Premium Medical Tourism in China',
  description: 'Experience world-class Chinese medical care with personalized service. From precision health screening to specialized treatments.',
  keywords: 'medical tourism, china healthcare, west china hospital, health screening, dental implant, TCM',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
