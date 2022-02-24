module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        foreground: 'var(--foreground)',
        gray: {
          100: 'var(--accents-1)',
          200: 'var(--accents-2)',
          300: 'var(--accents-3)',
          400: 'var(--accents-4)',
          500: 'var(--accents-5)',
          600: 'var(--accents-6)',
          700: 'var(--accents-7)',
          800: 'var(--accents-8)'
        },
        'gray-main': 'var(--gray)',
        'gray-base': 'var(--gray1)',
        secondary: 'var(--secondary-color)',
        sidebar: 'var(--sidebar)',
        brand: {
          100: 'var(--brand-lighter)',
          200: 'var(--brand-light)',
          300: 'var(--brand)',
          400: 'var(--brand-dark)'
        }
      },
      fontSize: {
        xxs: '10px',
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        md: 'var(--text-md)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)'
      },
      minWidth: {
        btn: '160px'
      }
    }
  },
  plugins: []
};
