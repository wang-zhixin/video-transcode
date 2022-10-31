/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const { i18n } = require("./next-i18next.config")
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = withPWA({
  output: 'standalone',
  assetPrefix: isProd ? 'https://static.ahelpers.com' : undefined,
  i18n,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/", // change to appropriate path
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  }
})

module.exports = nextConfig;
