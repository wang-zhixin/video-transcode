/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const nextConfig = withPWA({
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
    dest: 'public'
  }
})

module.exports = nextConfig;
