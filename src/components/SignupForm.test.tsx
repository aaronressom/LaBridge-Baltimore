import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SignupForm from '@/components/SignupForm'

// Mock the Supabase client
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
}))

import { supabase } from '@/lib/supabase'

const mockInsert = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
  ;(supabase.from as ReturnType<typeof vi.fn>).mockReturnValue({
    insert: mockInsert,
  })
})

describe('SignupForm', () => {
  it('renders email input, role trigger, and submit button', () => {
    render(<SignupForm />)
    expect(screen.getByPlaceholderText('your@institution.edu')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /express interest/i })).toBeInTheDocument()
  })

  it('submit button is disabled when role is not selected', () => {
    render(<SignupForm />)
    expect(screen.getByRole('button', { name: /express interest/i })).toBeDisabled()
  })

  it('shows success message after successful insert', async () => {
    mockInsert.mockResolvedValue({ error: null })
    render(<SignupForm />)

    await userEvent.type(screen.getByPlaceholderText('your@institution.edu'), 'pi@jhu.edu')
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(screen.getByRole('option', { name: 'Principal Investigator (PI)' }))
    await userEvent.click(screen.getByRole('button', { name: /express interest/i }))

    await waitFor(() => {
      expect(screen.getByText(/you're on the list/i)).toBeInTheDocument()
    })
  })

  it('shows duplicate message when supabase returns code 23505', async () => {
    mockInsert.mockResolvedValue({ error: { code: '23505', message: 'unique violation' } })
    render(<SignupForm />)

    await userEvent.type(screen.getByPlaceholderText('your@institution.edu'), 'existing@jhu.edu')
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(screen.getByRole('option', { name: 'Principal Investigator (PI)' }))
    await userEvent.click(screen.getByRole('button', { name: /express interest/i }))

    await waitFor(() => {
      expect(screen.getByText(/already registered/i)).toBeInTheDocument()
    })
  })

  it('shows error message when supabase returns a generic error', async () => {
    mockInsert.mockResolvedValue({ error: { code: 'PGRST000', message: 'server error' } })
    render(<SignupForm />)

    await userEvent.type(screen.getByPlaceholderText('your@institution.edu'), 'test@jhu.edu')
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(screen.getByRole('option', { name: 'Principal Investigator (PI)' }))
    await userEvent.click(screen.getByRole('button', { name: /express interest/i }))

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })
})
