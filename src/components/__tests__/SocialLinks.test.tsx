import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SocialLinks from '../SocialLinks';
import { socials } from '../../data/socials';

describe('SocialLinks', () => {
  it('renders one link per configured social with the correct href', () => {
    render(<SocialLinks />);

    for (const s of socials) {
      const link = screen.getByTestId(`social-${s.id}`);
      expect(link).toHaveAttribute('href', s.href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('exposes accessible labels for screen readers', () => {
    render(<SocialLinks />);
    for (const s of socials) {
      expect(screen.getByLabelText(s.label)).toBeInTheDocument();
    }
  });
});
