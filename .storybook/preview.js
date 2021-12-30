// Global imports
import { DocsContainer, DocsPage } from '@storybook/addon-docs';
import { addDecorator, addParameters } from '@storybook/react';
import prettierBabel from 'prettier/parser-babel';
import prettier from 'prettier/standalone';

// Local imports
import globalDecorator from './decorators';
import GovUKTheme from './govuk-theme';

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
    theme: GovUKTheme,
    transformSource: input => prettier.format(input, {
      parser: 'babel',
      plugins: [prettierBabel],
    }),
  },
  previewTabs: { canvas: { hidden: true } },
  toolbar: {
    title: { hidden: true, },
    zoom: { hidden: true, },
    eject: { hidden: true, },
    copy: { hidden: true, },
    backgroundPreview: { hidden: true, },
    fullscreen: { hidden: true }
  },
  options: {
    isToolshown: false,
    initialActive: 'docs'
  },
  viewMode: 'docs',
  selectedPanel: undefined,
  enableShortcuts: false
});

// global decorators
addDecorator(globalDecorator);
