import React from 'react';
import { addons } from '@storybook/addons';

import GovUKTheme from './govuk-theme';

addons.setConfig({
  theme: GovUKTheme,
  sidebar: {
    showRoots: true
  },
  isToolshown: false,
  initialActive: 'docs'
});
