import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CheckCircle, Loader2 } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error' | 'duplicate'

const ROLES = [
  { value: 'pi', label: 'Principal Investigator (PI)' },
  { value: 'lab_manager', label: 'Lab Manager' },
  { value: 'hiring_manager', label: 'Hiring Manager' },
  { value: 'research_admin', label: 'Research Administrator' },
  { value: 'institution', label: 'Institution or Department Head' },
  { value: 'other', label: 'Other' },
]

const SignupForm = () => {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!role) return
    setStatus('loading')
    const { error } = await supabase.from('signups').insert({ email, role })
    if (error?.code === '23505') {
      setStatus('duplicate')
    } else if (error) {
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center justify-center gap-3 text-electric-green font-medium"
      >
        <CheckCircle size={20} aria-hidden="true" />
        <span>You're on the list. We'll be in touch.</span>
      </div>
    )
  }

  if (status === 'duplicate') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center justify-center gap-3 text-electric-green font-medium"
      >
        <CheckCircle size={20} aria-hidden="true" />
        <span>This email is already registered. Thank you!</span>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 max-w-md mx-auto"
      aria-label="Express interest in LabBridge Baltimore"
      noValidate
    >
      {/* Visually hidden label satisfies accessibility; placeholder reinforces it visually */}
      <label htmlFor="signup-email" className="sr-only">
        Institutional email address
      </label>
      <Input
        id="signup-email"
        type="email"
        required
        placeholder="your@institution.edu"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/40 rounded-full h-12 px-5"
        aria-describedby={status === 'error' ? 'signup-error' : undefined}
      />
      <label htmlFor="signup-role" className="sr-only">
        Your role
      </label>
      <Select value={role} onValueChange={setRole} name="role">
        <SelectTrigger
          id="signup-role"
          className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground rounded-full h-12 px-5"
          aria-label="Select your role"
        >
          <SelectValue placeholder="I am a..." />
        </SelectTrigger>
        <SelectContent>
          {ROLES.map((r) => (
            <SelectItem key={r.value} value={r.value}>
              {r.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {status === 'error' && (
        <p
          id="signup-error"
          role="alert"
          aria-live="assertive"
          className="text-destructive text-sm text-center"
        >
          Something went wrong — please try again.
        </p>
      )}
      <Button
        type="submit"
        size="lg"
        disabled={status === 'loading' || !role}
        className="btn-glow text-primary-foreground rounded-full w-full h-12"
        aria-busy={status === 'loading'}
      >
        {status === 'loading' && (
          <Loader2 size={18} className="animate-spin mr-2" aria-hidden="true" />
        )}
        {status === 'loading' ? 'Submitting…' : 'Express Interest →'}
      </Button>
      <p className="text-secondary-foreground/40 text-xs text-center">
        We don't spam. We build bridges.
      </p>
    </form>
  )
}

export default SignupForm
