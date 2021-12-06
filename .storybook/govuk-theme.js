import { create } from '@storybook/theming';

const GovUKTheme = create({
  base: 'light',

  colorPrimary: '#0b0c0c',
  colorSecondary: '#1d70b8',

  // UI
  appBg: 'white',
  appContentBg: 'white',
  appBorderColor: '#b1b4b6',
  appBorderRadius: 0,

  // Typography
  fontBase: '"GDS Transport", arial, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#0b0c0c',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: '#1d70b8',
  barSelectedColor: '#0b0c0c',
  // barBg: 'white',

  brandTitle: 'COP React Form Renderer',
  brandUrl: 'https://design-system.service.gov.uk/',
  brandImage: './images/govuk-mask-icon.svg',
});

export default GovUKTheme;
