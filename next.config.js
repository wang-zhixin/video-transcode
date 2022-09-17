/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config")
const nextConfig = {
  i18n,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/video", // change to appropriate path
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
};

module.exports = nextConfig;
