# Start development

```bash
npm start
```

# Build

```bash
npm run build
```

# Source Import Sample

## Jest 
<!-- import src/__tests__/*.{js,jsx,ts,tsx} --title-tag h3 -->

### src/\_\_tests\_\_/sample.ts


```ts
describe('Sample', () => {
  test('Test', () => {
    expect('text').toEqual('text');
  });
});

```

<!-- importend -->

<!-- import src/**/*.test.{js,jsx,ts,tsx} --title-tag h3 -->
<!-- importend -->

## Storybook
<!-- import src/**/*.stories.{js,jsx,ts,tsx} --title-tag h3 -->

### src/app/components/Title.stories.tsx


```tsx
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Title } from './Title';

storiesOf('Title', module)
  .add('text=Hello?', () => <Title text="Hello?" />)
  .add('text=World?', () => <Title text="World?" />);

```

<!-- importend -->