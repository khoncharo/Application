import type { Preview } from '@storybook/react';
import '../src/index.css';
import { withRouter } from 'storybook-addon-remix-react-router';

const preview: Preview = {
  decorators: [withRouter],
  parameters: {
    backgrounds: {
      default: 'app',
      values: [
        { name: 'app', value: '#f5f7ff' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    controls: { matchers: { date: /Date$/i } },
  },
};

export default preview;
