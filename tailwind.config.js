/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;

module.exports = {
  theme: {
    fontFamily: {
      sans: ['"DM Sans"', ...defaultTheme.fontFamily.sans],
      serif: ['turnip', ...defaultTheme.fontFamily.sans],
      mono: defaultTheme.fontFamily.mono,
    },
    gradients: (theme) => ({
      empty: ['180deg', theme('colors.smudge'), theme('colors.transparent')],
    }),
    extend: {
      colors: {
        transparent: 'rgba(1, 1, 1, 0)',
        gesso: '#FFFFFF',
        drywall: '#F8F8F8',
        smudge: '#E8E9F1',
        concrete: '#9C9CA5',
        bruise: '#010024',
        tomato: '#FF3333',
        blackout: '#000000',
        highlight: '#0500FF',
      },
      padding: {
        'safe-left': 'env(safe-area-inset-left)',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-right': 'env(safe-area-inset-right)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      boxShadow: {
        elevated:
          '0px 0px 1px rgba(1, 0, 36, 0.04), 0px 2px 8px rgba(232, 233, 241, 0.12), 0px 2px 8px rgba(1, 0, 36, 0.04);',
      },
      fontSize: {
        subtext: '0.64rem',
        base: '1.00rem',
        h4: '1.125rem',
        h3: '1.563rem',
        h2: '2.441rem',
        h1: '3.815rem',
      },
      width: {
        80: '20rem',
        96: '24rem',
      },
      maxWidth: {
        48: '12rem',
        '10xl': '120rem',
      },
      letterSpacing: {
        button: '0.02em',
      },
      inset: {
        full: '100%',
      },
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    borderColor: ['responsive', 'hover', 'focus', 'group-hover'],
    backgroundColor: ['responsive', 'hover', 'focus', 'group-hover'],
    opacity: ['hover', 'focus', 'disabled'],
    cursor: ['disabled'],
  },
  plugins: [
    require('tailwindcss-plugins/gradients'),
    ({ addUtilities, theme, variants }) => {
      const colors = flattenColorPalette(theme('borderColor'));
      delete colors['default'];

      const colorMap = Object.keys(colors).map((color) => ({
        [`.border-t-${color}`]: { borderTopColor: colors[color] },
        [`.border-r-${color}`]: { borderRightColor: colors[color] },
        [`.border-b-${color}`]: { borderBottomColor: colors[color] },
        [`.border-l-${color}`]: { borderLeftColor: colors[color] },
      }));
      const utilities = Object.assign({}, ...colorMap);

      addUtilities(utilities, variants('borderColor'));
    },
  ],
  purge: ['./src/**/*.tsx'],
};
