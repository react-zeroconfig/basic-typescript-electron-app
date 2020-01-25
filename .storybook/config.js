import { configure } from '@storybook/react';

configure(() => {
  const req = require.context('../src', true, /\.stories\.(js|jsx|ts|tsx)$/);
  req.keys().forEach(req);
}, module);