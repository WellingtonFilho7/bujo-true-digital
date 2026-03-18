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

  it('renders the about section as a continuous first-person presentation', () => {
    render(<App />)

    const aboutSection = screen.getByRole('region', { name: 'Quem somos' })

    expect(within(aboutSection).getByText('Somos uma família cristã dedicada ao ensino das Escrituras, ao cuidado da igreja e à formação de famílias.')).toBeInTheDocument()
    expect(within(aboutSection).getByText(/Somos Wellington e Dyanna, casados e pais de cinco filhos\./)).toBeInTheDocument()
    expect(within(aboutSection).queryByText('Uma casa se abrindo pra igreja, pras crianças e pra mesa.')).not.toBeInTheDocument()
  })
})
