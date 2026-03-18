import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from '../App'
import { InitiativesSection } from './InitiativesSection'

describe('landing navigation and initiatives', () => {
  it('shows dedicated support and share actions in the header', () => {
    render(<App />)

    const banner = screen.getByRole('banner')
    expect(within(banner).getByRole('link', { name: 'Apoiar' })).toBeInTheDocument()
    expect(within(banner).getByRole('button', { name: 'Compartilhar' })).toBeInTheDocument()
  })

  it('does not render placeholder anchors for initiatives without a real URL', () => {
    render(<InitiativesSection />)

    expect(screen.getByText('iniciativaretornar.org').closest('a')).not.toHaveAttribute('href', '#')
    expect(screen.getByText('bemaeducation.com.br').closest('a')).not.toHaveAttribute('href', '#')
    expect(screen.getByText('institutolumine.org').closest('a')).not.toHaveAttribute('href', '#')
  })
})
