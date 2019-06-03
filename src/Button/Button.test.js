import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Button from './Button';
import 'jest-dom/extend-expect';

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
          'data-testid': 'button'
        }}
      >
        Button
      </Button>
    );
    const button = await findByTestId('button');
    expect(button).toHaveClass('Button-success-39');
  });
});
