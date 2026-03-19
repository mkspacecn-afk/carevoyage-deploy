/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  i18n: {
    locales: ['zh-TW', 'en', 'ja', 'ko', 'fr', 'de', 'pt', 'es', 'th'],
    defaultLocale: 'zh-TW'
  }
}

module.exports = nextConfig
