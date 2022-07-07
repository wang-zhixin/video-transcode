module.exports = {
  content: [
    // "./src/pages/**/*.{js,ts,jsx,tsx}",
    // "./src/components/**/*.{js,ts,jsx,tsx}",
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        card: '8px 8px 20px 0 rgba(55, 99, 170, 0.1), -8px -8px 20px 0 #fff',
        hover: '8px 8px 20px 0 rgba(55, 99, 170, 0.2), -8px -8px 20px 0 #fff'
      },
      colors: {
        primary: {
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
          DEFAULT: 'var(--primary)',
        }
      }
    },
  },
  plugins: [],
}
