// To run these tests, you need to install vitest, jsdom, and testing-library.
// You can do this by running the following command in your terminal:
// npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Try from './try';

describe('Try component', () => {
  it('renders the initial state correctly', () => {
    render(<Try />);
    
    expect(screen.getByText('mebratu')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('kathmandu')).toBeInTheDocument();
  });

  it('updates the name when the button is clicked', () => {
    render(<Try />);
    
    const button = screen.getByText('hey mebre click it');
    fireEvent.click(button);
    
    expect(screen.getByText('baba')).toBeInTheDocument();
    expect(screen.queryByText('mebratu')).not.toBeInTheDocument();
  });
});
