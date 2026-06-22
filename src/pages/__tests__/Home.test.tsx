import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';

describe('Home', () => {
  it('renders the name and portrait', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: /Tim Chaffin/i })).toBeInTheDocument();
    expect(screen.getByAltText(/Tim Chaffin/i)).toBeInTheDocument();
  });
});
