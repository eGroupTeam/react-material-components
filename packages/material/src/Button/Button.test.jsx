import React from 'react';
import { cleanup } from '@testing-library/react';
import { render } from '../test-utils';
import Button from './Button';
import '@testing-library/jest-dom/extend-expect';

describe('Button', () => {
  afterEach(cleanup);

  it('should render loader', async () => {
    const { findByRole } = render(<Button loading>Button</Button>);
    const loader = await findByRole('progressbar');
    expect(loader).toBeDefined();
  });

  it('should show success status', async () => {
    const { findByTestId } = render(
      <Button
        success
        MuiButtonProps={{
          'data-testid': 'button',
        }}
      >
        Button
      </Button>
    );
    const button = await findByTestId('button');
    expect(button).toHaveClass('EgButton-success');
  });
});
