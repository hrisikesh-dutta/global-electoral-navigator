import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from '../../components/Badge';

describe('Badge component', () => {
  it('renders text correctly', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders with amber variant', () => {
    const { container } = render(<Badge variant="amber">Amber</Badge>);
    expect(container.firstChild).toBeDefined();
    expect(screen.getByText('Amber')).toBeInTheDocument();
  });

  it('renders with green variant', () => {
    render(<Badge variant="green">Green</Badge>);
    expect(screen.getByText('Green')).toBeInTheDocument();
  });

  it('renders with teal variant', () => {
    render(<Badge variant="teal">Teal</Badge>);
    expect(screen.getByText('Teal')).toBeInTheDocument();
  });
});
