import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { buildStructuredData, siteConfig } from './src/content/site'

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function landingMetaPlugin() {
  const structuredData = JSON.stringify(buildStructuredData(siteConfig))

  return {
    name: 'landing-meta-plugin',
    transformIndexHtml(html: string) {
      return html
        .replaceAll('__SEO_TITLE__', escapeHtml(siteConfig.seo.title))
        .replaceAll('__SEO_DESCRIPTION__', escapeHtml(siteConfig.seo.description))
        .replaceAll('__SEO_CANONICAL__', escapeHtml(siteConfig.seo.canonicalUrl))
        .replaceAll('__SEO_IMAGE__', escapeHtml(siteConfig.seo.image))
        .replaceAll('__SEO_LOCALE__', escapeHtml(siteConfig.seo.locale))
        .replaceAll('__SEO_SITE_NAME__', escapeHtml(siteConfig.seo.siteName))
        .replaceAll('__SEO_TWITTER_CARD__', escapeHtml(siteConfig.seo.twitterCard))
        .replaceAll('__STRUCTURED_DATA__', structuredData)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), landingMetaPlugin()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
