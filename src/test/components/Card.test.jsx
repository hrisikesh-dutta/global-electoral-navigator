import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../../components/Card';

describe('Card component', () => {
  it('renders children', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies glass-card base class', () => {
    const { container } = render(<Card>Test</Card>);
    expect(container.firstChild).toHaveClass('glass-card');
  });

  it('applies accent class when accent prop provided', () => {
    const { container } = render(<Card accent="amber">Test</Card>);
    expect(container.firstChild).toHaveClass('accent-amber');
  });

  it('applies card-hover class when hover prop is true', () => {
    const { container } = render(<Card hover>Test</Card>);
    expect(container.firstChild).toHaveClass('card-hover');
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="my-class">Test</Card>);
    expect(container.firstChild).toHaveClass('my-class');
  });
});
