import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ForYouSection from '@/components/ForYouSection'

describe('ForYouSection', () => {
  it('renders the section heading', () => {
    render(<ForYouSection />)
    expect(
      screen.getByText(/built for the people who keep labs running/i)
    ).toBeInTheDocument()
  })

  it('renders the Principal Investigators card', () => {
    render(<ForYouSection />)
    expect(screen.getByText(/principal investigators/i)).toBeInTheDocument()
    expect(screen.getByText(/stop losing research time/i)).toBeInTheDocument()
  })

  it('renders the Hiring Managers card', () => {
    render(<ForYouSection />)
    expect(screen.getByText(/hiring managers/i)).toBeInTheDocument()
    expect(screen.getByText(/cut turnover costs/i)).toBeInTheDocument()
  })

  it('renders the Institutions card', () => {
    render(<ForYouSection />)
    expect(screen.getByText(/institutions/i)).toBeInTheDocument()
    expect(screen.getByText(/\$17\.50 return/i)).toBeInTheDocument()
  })
})
