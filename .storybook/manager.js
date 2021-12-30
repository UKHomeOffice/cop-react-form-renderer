// Global imports
import { addons } from '@storybook/addons';
import React from 'react';

// Local imports
import GovUKTheme from './govuk-theme';

addons.setConfig({
  theme: GovUKTheme,
  sidebar: {
    showRoots: true
  },
  isToolshown: false,
  initialActive: 'docs'
});
