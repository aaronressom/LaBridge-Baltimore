# LabBridge Baltimore Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the LabBridge Baltimore landing page with a hero signup form wired to Supabase, audience-targeted benefit cards, and sharpened dark biotech UI.

**Architecture:** `Index.tsx` is the single landing page; it imports two new focused components (`SignupForm`, `ForYouSection`) and uses existing `AnimatedSection` and `CountUp` unchanged. The Supabase client lives in `src/lib/supabase.ts` and is imported only by `SignupForm`. All form state and submission logic is encapsulated in `SignupForm`.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui (Select, Button, Input), Framer Motion, @supabase/supabase-js, Vitest + @testing-library/react + @testing-library/user-event

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `.env` | Create | Supabase credentials (gitignored) |
| `.gitignore` | Modify | Add `.env` |
| `package.json` | Modify | Add `@supabase/supabase-js`, `@testing-library/user-event` |
| `src/lib/supabase.ts` | Create | Supabase client singleton |
| `src/components/SignupForm.tsx` | Create | Email + role form, all states, Supabase insert |
| `src/components/SignupForm.test.tsx` | Create | Tests for SignupForm |
| `src/components/ForYouSection.tsx` | Create | 3 audience benefit cards (PI, Hiring Manager, Institution) |
| `src/components/ForYouSection.test.tsx` | Create | Tests for ForYouSection |
| `src/pages/Index.tsx` | Rewrite | Full page structure: nav, hero (with SignupForm), problem, solution, ForYouSection, impact, footer |

**Unchanged:** `AnimatedSection.tsx`, `CountUp.tsx`, all `src/components/ui/*`

---

## Task 1: Install Dependencies & Create Supabase Client

**Files:**
- Modify: `package.json`
- Create: `.env`
- Modify: `.gitignore`
- Create: `src/lib/supabase.ts`

- [ ] **Step 1: Install packages**

```bash
cd /path/to/LaBridge-Baltimore
npm install @supabase/supabase-js
npm install --save-dev @testing-library/user-event
```

Expected: `package.json` updated with both packages, `node_modules` populated.

- [ ] **Step 2: Add `.env` to `.gitignore`**

Open `.gitignore` and add this line at the bottom:

```
.env
.env.local
```

- [ ] **Step 3: Create `.env` with Supabase credentials**

Create `.env` in the project root (this file is gitignored — never commit it):

```
VITE_SUPABASE_URL=https://imktmamaqrlzvilpdwzd.supabase.co
VITE_SUPABASE_ANON_KEY=<paste your anon public key here>
```

The anon public key is the `eyJhbG...` JWT from your Supabase project settings → API.

- [ ] **Step 4: Create `src/lib/supabase.ts`**

```ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

- [ ] **Step 5: Verify the client initializes without errors**

```bash
npm run dev
```

Open the browser console. There should be no errors about missing environment variables. Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add src/lib/supabase.ts .gitignore package.json package-lock.json
git commit -m "feat: add Supabase client and install dependencies"
```

---

## Task 2: Create Supabase `signups` Table

**This is a manual step in the Supabase dashboard — no code to write.**

- [ ] **Step 1: Open Supabase SQL Editor**

Go to https://supabase.com/dashboard, open your project (`imktmamaqrlzvilpdwzd`), click **SQL Editor** in the left sidebar.

- [ ] **Step 2: Run table creation SQL**

Paste and run:

```sql
create table signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null,
  created_at timestamptz not null default now()
);

-- Enable row-level security
alter table signups enable row level security;

-- Allow anonymous inserts only (no reads, updates, or deletes from browser)
create policy "Allow anon insert"
  on signups for insert
  to anon
  with check (true);
```

- [ ] **Step 3: Verify table exists**

In the Supabase dashboard, click **Table Editor** in the left sidebar. You should see a `signups` table with columns: `id`, `email`, `role`, `created_at`.

---

## Task 3: Create `SignupForm` Component

**Files:**
- Create: `src/components/SignupForm.tsx`
- Create: `src/components/SignupForm.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/SignupForm.test.tsx`:

```tsx
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

    // Open the role select and pick an option
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
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
npm test
```

Expected: tests fail with "Cannot find module '@/components/SignupForm'"

- [ ] **Step 3: Create `src/components/SignupForm.tsx`**

```tsx
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
      <div className="flex items-center justify-center gap-3 text-electric-green font-medium">
        <CheckCircle size={20} />
        <span>You're on the list. We'll be in touch.</span>
      </div>
    )
  }

  if (status === 'duplicate') {
    return (
      <div className="flex items-center justify-center gap-3 text-electric-green font-medium">
        <CheckCircle size={20} />
        <span>This email is already registered. Thank you!</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto">
      <Input
        type="email"
        required
        placeholder="your@institution.edu"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/40 rounded-full h-12 px-5"
      />
      <Select value={role} onValueChange={setRole}>
        <SelectTrigger className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground rounded-full h-12 px-5">
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
        <p className="text-destructive text-sm text-center">
          Something went wrong — please try again.
        </p>
      )}
      <Button
        type="submit"
        size="lg"
        disabled={status === 'loading' || !role}
        className="btn-glow text-primary-foreground rounded-full w-full h-12"
      >
        {status === 'loading' && <Loader2 size={18} className="animate-spin mr-2" />}
        Express Interest →
      </Button>
      <p className="text-secondary-foreground/40 text-xs text-center">
        We don't spam. We build bridges.
      </p>
    </form>
  )
}

export default SignupForm
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npm test
```

Expected: all 5 tests in `SignupForm.test.tsx` pass (1 from `example.test.ts` + 5 new).

- [ ] **Step 5: Commit**

```bash
git add src/components/SignupForm.tsx src/components/SignupForm.test.tsx
git commit -m "feat: add SignupForm component with Supabase integration"
```

---

## Task 4: Create `ForYouSection` Component

**Files:**
- Create: `src/components/ForYouSection.tsx`
- Create: `src/components/ForYouSection.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/ForYouSection.test.tsx`:

```tsx
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
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
npm test
```

Expected: 4 new tests fail with "Cannot find module '@/components/ForYouSection'"

- [ ] **Step 3: Create `src/components/ForYouSection.tsx`**

```tsx
import AnimatedSection from '@/components/AnimatedSection'

const cards = [
  {
    emoji: '👩‍🔬',
    audience: 'Principal Investigators',
    accentClass: 'text-biotech-purple-light',
    borderClass: 'border-biotech-purple/30',
    bgClass: 'bg-biotech-purple/5',
    body: 'Stop losing research time to understaffing. Get PI-vetted technicians trained on your exact equipment needs — ready to run protocols from week one.',
  },
  {
    emoji: '🏢',
    audience: 'Hiring Managers',
    accentClass: 'text-electric-green',
    borderClass: 'border-electric-green/30',
    bgClass: 'bg-electric-green/5',
    body: 'Cut turnover costs and eliminate staffing agency markups. Our B2B recruitment model places pre-screened, lab-ready local talent directly into your open roles.',
  },
  {
    emoji: '🏛️',
    audience: 'Institutions & Departments',
    accentClass: 'text-blue-400',
    borderClass: 'border-blue-400/30',
    bgClass: 'bg-blue-400/5',
    body: '$17.50 return for every $1 invested in worker training (EARN Maryland). Partner with Baltimore\'s highest-yield community training pipeline and strengthen your community impact narrative.',
  },
]

const ForYouSection = () => (
  <section className="bg-background px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
    <div className="container-max">
      <AnimatedSection className="text-center mb-14">
        <span className="text-primary font-semibold text-sm tracking-widest uppercase">
          Who It's For
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-4 text-foreground">
          Built for the People Who Keep Labs Running
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Whether you're running experiments, filling open reqs, or stewarding institutional investment — LabBridge was designed with your needs in mind.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <AnimatedSection key={card.audience} delay={i * 0.15}>
            <div
              className={`h-full rounded-2xl p-8 border ${card.borderClass} ${card.bgClass} backdrop-blur-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="text-4xl mb-4">{card.emoji}</div>
              <h3 className={`text-xl font-bold mb-3 ${card.accentClass}`}>
                {card.audience}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{card.body}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
)

export default ForYouSection
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
npm test
```

Expected: all 4 `ForYouSection` tests pass plus all prior tests still pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/ForYouSection.tsx src/components/ForYouSection.test.tsx
git commit -m "feat: add ForYouSection audience benefit cards"
```

---

## Task 5: Rewrite `Index.tsx`

**Files:**
- Rewrite: `src/pages/Index.tsx`

- [ ] **Step 1: Replace the entire contents of `src/pages/Index.tsx`**

```tsx
import { motion } from 'framer-motion'
import {
  Microscope, Users, Zap, Award, FlaskConical,
  TrendingUp, DollarSign, ShieldCheck, ChevronDown,
} from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import CountUp from '@/components/CountUp'
import SignupForm from '@/components/SignupForm'
import ForYouSection from '@/components/ForYouSection'

const Index = () => (
  <div className="min-h-screen bg-background">

    {/* ─── NAV ─── */}
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/80 backdrop-blur-xl border-b border-border/10">
      <div className="container-max flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
        <span className="text-lg font-bold text-secondary-foreground">
          LabBridge <span className="text-primary">Baltimore</span>
        </span>
        <div className="hidden sm:flex items-center gap-6 text-sm text-secondary-foreground/60">
          <a href="#mission" className="hover:text-secondary-foreground transition-colors">Mission</a>
          <a href="#for-labs" className="hover:text-secondary-foreground transition-colors">For Labs</a>
          <a href="#for-pis" className="hover:text-secondary-foreground transition-colors">For PIs</a>
        </div>
        <span className="text-xs font-semibold tracking-widest uppercase text-electric-green">
          Coming Soon
        </span>
      </div>
    </nav>

    {/* ════════════════════════════════════════════
        HERO — signup form embedded
    ════════════════════════════════════════════ */}
    <section
      id="mission"
      className="relative min-h-[92vh] flex items-center justify-center pt-14 biotech-bg hex-grid bg-secondary"
    >
      <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-electric-green font-semibold text-sm tracking-widest uppercase"
          >
            Baltimore · Biotech · Community
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] text-secondary-foreground"
          >
            Bridging Baltimore's{' '}
            <span className="text-biotech-purple-light">Biotech Talent Gap.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-secondary-foreground/70 max-w-xl mx-auto"
          >
            A 12-week vocational accelerator turning local Baltimoreans into
            lab-ready professionals — while giving research institutions the
            trained talent they desperately need.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-2xl p-6 max-w-md mx-auto"
          >
            <p className="text-secondary-foreground/50 text-xs mb-4 font-medium uppercase tracking-wider">
              Express your interest — takes 10 seconds
            </p>
            <SignupForm />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-secondary-foreground/30"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>

    {/* ════════════════════════════════════════════
        THE PROBLEM — "The Biotech Wall"
    ════════════════════════════════════════════ */}
    <section id="mission" className="bg-background px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="container-max">
        <AnimatedSection className="text-center mb-14">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-4 text-foreground">
            The Biotech Wall
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Baltimore sits at the center of a $800M biotech boom — with no pipeline to staff it.
          </p>
        </AnimatedSection>

        {/* Stat cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { value: '21%', label: 'Baltimore poverty rate', color: 'text-biotech-purple-light', border: 'border-biotech-purple/30', bg: 'bg-biotech-purple/5' },
            { value: '5–7%', label: 'BLS biological technician job growth through 2033', color: 'text-electric-green', border: 'border-electric-green/30', bg: 'bg-electric-green/5' },
            { value: '$800M', label: 'Regional life sciences investment', color: 'text-blue-400', border: 'border-blue-400/30', bg: 'bg-blue-400/5' },
          ].map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <div className={`rounded-2xl p-8 border ${stat.border} ${stat.bg} text-center`}>
                <div className={`text-4xl sm:text-5xl font-black mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Context cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-14 mb-12">
          <AnimatedSection
            delay={0.15}
            className="bg-muted rounded-2xl p-8 lg:p-10 border border-border"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center mb-6">
              <Microscope className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Inside the Lab</h3>
            <p className="text-muted-foreground leading-relaxed">
              Scientists struggle to find trained technicians for diagnostic work and genomic data
              analysis. Open positions go unfilled for months, slowing critical research.
            </p>
          </AnimatedSection>

          <AnimatedSection
            delay={0.3}
            className="bg-muted rounded-2xl p-8 lg:p-10 border border-border"
          >
            <div className="w-14 h-14 rounded-xl bg-accent/15 flex items-center justify-center mb-6">
              <Users className="text-electric-green" size={28} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Three Blocks Away</h3>
            <p className="text-muted-foreground leading-relaxed">
              Brilliant young Baltimoreans are stuck in minimum-wage cycles — not because they
              lack ability, but because they lack a 4-year degree. The wall isn't talent. It's access.
            </p>
          </AnimatedSection>
        </div>

        {/* Expert quote */}
        <AnimatedSection delay={0.2}>
          <blockquote className="border-l-4 border-primary pl-6 py-2 max-w-3xl mx-auto">
            <p className="text-foreground/80 text-lg italic leading-relaxed mb-3">
              "The bottleneck in modern research isn't a lack of ideas, but a lack of reliable,
              trained technicians to moderate and handle the massive influx of laboratory
              maintenance and data."
            </p>
            <cite className="text-muted-foreground text-sm not-italic">
              — Dr. Monica Mugnier, Principal Investigator, Johns Hopkins University
            </cite>
          </blockquote>
        </AnimatedSection>
      </div>
    </section>

    {/* ════════════════════════════════════════════
        THE SOLUTION — 3-Pillar Accelerator
    ════════════════════════════════════════════ */}
    <section className="bg-muted px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="container-max">
        <AnimatedSection className="text-center mb-14">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">
            Our Solution
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-4 text-foreground">
            The LabBridge Model
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Three pillars that transform motivated Baltimoreans into competitive lab professionals.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: '12-Week Accelerator',
              desc: 'Intensive micro-credentialing in digital microscopy, genomic data logistics, and lab management. No four-year degree required.',
              iconColor: 'text-primary',
              iconBg: 'bg-primary/15',
            },
            {
              icon: Award,
              title: 'Earn While You Learn',
              desc: 'Stipends remove the financial barrier. No choosing between training and eating. Students earn a living wage while building career-ready skills.',
              iconColor: 'text-electric-green',
              iconBg: 'bg-accent/15',
            },
            {
              icon: FlaskConical,
              title: 'B2B Placement',
              desc: 'Cost shifts to employers. Vetted graduates placed directly into open roles — no staffing agency markup, no guesswork.',
              iconColor: 'text-primary',
              iconBg: 'bg-primary/15',
            },
          ].map((c, i) => (
            <AnimatedSection key={c.title} delay={i * 0.15}>
              <div className="group h-full rounded-2xl p-8 bg-card/80 backdrop-blur-md border border-border/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl ${c.iconBg} flex items-center justify-center mb-6`}>
                  <c.icon className={c.iconColor} size={28} />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3">{c.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* ════════════════════════════════════════════
        FOR YOU — Audience Benefit Cards
    ════════════════════════════════════════════ */}
    <div id="for-pis">
      <ForYouSection />
    </div>

    {/* ════════════════════════════════════════════
        IMPACT — Animated stats
    ════════════════════════════════════════════ */}
    <section
      id="for-labs"
      className="relative biotech-bg hex-grid bg-secondary px-4 sm:px-6 lg:px-8 py-20 lg:py-28"
    >
      <div className="relative z-10 container-max">
        <AnimatedSection className="text-center mb-14">
          <span className="text-electric-green font-semibold text-sm tracking-widest uppercase">
            By the Numbers
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-4 text-secondary-foreground">
            Impact That Pays{' '}
            <span className="bg-gradient-to-r from-biotech-purple-light to-electric-green bg-clip-text text-transparent">
              for Itself.
            </span>
          </h2>
          <p className="text-secondary-foreground/60 max-w-xl mx-auto text-lg">
            Grounded in proven models. Built for Baltimore.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: TrendingUp, value: '67%', label: 'Graduate placement rate (BTI benchmark)' },
            { icon: DollarSign, value: '$17', label: 'ROI per $1 invested in training (EARN Maryland)' },
            { icon: ShieldCheck, value: '12', label: 'Weeks to career-ready — no degree required' },
          ].map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.15}>
              <div className="flex flex-col items-center text-center rounded-2xl p-8 glass-card glow-border gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                  <s.icon className="text-biotech-purple-light" size={26} />
                </div>
                <CountUp
                  value={s.value}
                  className="text-4xl sm:text-5xl font-extrabold text-secondary-foreground"
                />
                <p className="text-secondary-foreground/60 text-sm leading-relaxed">{s.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* ─── FOOTER ─── */}
    <footer className="relative biotech-bg bg-navy-dark px-4 sm:px-6 lg:px-8 py-10">
      <div className="relative z-10 container-max text-center space-y-2">
        <p className="text-sm text-secondary-foreground/40">
          © {new Date().getFullYear()} LabBridge Baltimore. All rights reserved.
        </p>
        <p className="text-xs text-secondary-foreground/25">
          Supporting UN Sustainable Development Goal 4 — Quality Education
        </p>
      </div>
    </footer>

  </div>
)

export default Index
```

- [ ] **Step 2: Run tests — verify all tests still pass**

```bash
npm test
```

Expected: all prior tests pass. No regressions.

- [ ] **Step 3: Verify visually in the browser**

```bash
npm run dev
```

Open http://localhost:8080. Check:
- Navbar shows Mission / For Labs / For PIs links + Coming Soon badge
- Hero shows headline, subtitle, and the signup form (email input + role dropdown + button)
- Problem section shows 3 stat cards + 2 context cards + Dr. Mugnier quote
- Solution section shows 3 pillar cards with updated copy
- "For You" section shows 3 audience cards (PI, Hiring Manager, Institutions)
- Impact section shows 3 CountUp stats (67%, $17, 12)
- Footer shows copyright + UN SDG 4 line

- [ ] **Step 4: Test the signup form end-to-end**

With the dev server running, fill in a real email + select a role + click "Express Interest →". Then open https://supabase.com/dashboard → your project → Table Editor → `signups` table and confirm the row was inserted with the correct email, role, and timestamp.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Index.tsx
git commit -m "feat: rewrite landing page with hero signup form, audience cards, and sharpened UI"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| Signup form in hero (email + role → Supabase) | Task 3 + Task 5 |
| Role options: PI, Lab Manager, Hiring Manager, Research Admin, Institution, Other | Task 3 |
| Form states: idle, loading, success, error, duplicate | Task 3 |
| Supabase table `signups` with RLS | Task 2 |
| `.env` gitignored | Task 1 |
| Navbar nav links: Mission, For Labs, For PIs | Task 5 |
| Problem section: 3 stat cards + expert quote | Task 5 |
| Solution section: 3-pillar cards with updated copy | Task 5 |
| For You section: 3 audience cards (PI, Hiring, Institution) | Task 4 + Task 5 |
| Impact section: 67%, 12, $17.50 stats | Task 5 |
| Footer: copyright + UN SDG 4 badge | Task 5 |
| Remove old bottom CTA form | Task 5 (not present in new Index.tsx) |
| Keep & sharpen dark biotech aesthetic | Task 5 (existing CSS classes, no new styles added) |

**Placeholder scan:** No TBDs, TODOs, or vague steps. All code blocks are complete. ✓

**Type consistency:**
- `SignupForm` imported as default in `Index.tsx` — matches `export default SignupForm` in Task 3. ✓
- `ForYouSection` imported as default in `Index.tsx` — matches `export default ForYouSection` in Task 4. ✓
- `supabase.from('signups').insert({ email, role })` — matches table schema from Task 2. ✓
- `CountUp` receives `value: string` — matches its interface (`value: string`). ✓
- `AnimatedSection` receives `delay?: number` and `className?: string` — matches its interface. ✓
