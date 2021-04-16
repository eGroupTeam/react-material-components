import React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from '../test-utils';
import Button from './Button';

describe('Button', () => {
  afterEach(cleanup);

  it('should render loader', async () => {
    const { findByRole } = render(<Button loading>Button</Button>);
    const loader = await findByRole('progressbar');
    expect(loader).toBeDefined();
  });
});
