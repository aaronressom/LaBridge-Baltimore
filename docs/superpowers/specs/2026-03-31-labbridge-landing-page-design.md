# LabBridge Baltimore — Landing Page Redesign & Supabase Integration

**Date:** 2026-03-31
**Status:** Approved
**Goal:** Optimize the landing page UI for PIs, lab managers, hiring managers, and institutions; add role-tagged email signups stored in Supabase.

---

## Context

The existing landing page is built in React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion. It has two disconnected email forms that don't persist data anywhere. The redesign consolidates them into a single signup form in the hero, wires it to Supabase, and adds a new audience-targeted "For You" section.

---

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Layout | Narrative B (hero → problem → solution → for you → impact) | Story earns the signup |
| Hero CTA | Signup form in hero (not scroll anchors) | Visible immediately; no scroll required |
| Visual style | Keep & sharpen existing dark navy + purple + neon green | Consistent with current brand |
| Supabase | Direct client insert from browser | Simple for a gauge-interest page; no backend needed |

---

## Section Structure

### 1. Navbar (existing, minor updates)
- Fixed position, existing dark background
- Logo: "LabBridge Baltimore"
- Add nav links: Mission, For Labs, For PIs
- Keep "Coming Soon" badge

### 2. Hero
- Full-screen dark gradient background (existing `biotech-bg` class)
- Badge pill: "Baltimore · Biotech · Community"
- Headline: "Bridging Baltimore's Biotech Talent Gap" (gradient white→purple)
- Subtitle: "A 12-week vocational accelerator turning local Baltimoreans into lab-ready professionals — while giving research institutions the trained talent they desperately need."
- **Signup form** (see Form Design below)
- Scroll hint arrow at bottom (↓)

### 3. Problem — "The Biotech Wall"
- Section heading: "The Biotech Wall"
- Subtext: "Baltimore sits at the center of a $800M biotech boom — with no pipeline to staff it."
- 3 stat cards (glassmorphism style):
  - 21% — Baltimore poverty rate
  - 5–7% — BLS biological technician job growth through 2033
  - $800M — Regional life sciences investment
- Expert quote block: *"The bottleneck in modern research isn't a lack of ideas, but a lack of reliable, trained technicians to moderate and handle the massive influx of laboratory maintenance and data."* — Dr. Monica Mugnier, Principal Investigator, Johns Hopkins

### 4. Solution — 3-Pillar Accelerator
- Section heading: "The LabBridge Model"
- 3 cards:
  - ⚡ 12-Week Accelerator — Intensive micro-credentialing in digital microscopy, genomic data logistics, and lab management. No four-year degree required.
  - 💰 Earn While You Learn — Stipends remove the financial barrier. No choosing between training and eating.
  - 🤝 B2B Placement — Cost shifts to employers. Vetted graduates placed directly — no staffing agency markup.

### 5. For You — Audience Benefit Cards (NEW)
- Section heading: "Built for the People Who Keep Labs Running"
- 3 cards, each with distinct accent color:
  - 👩‍🔬 **Principal Investigators** (purple accent) — "Stop losing research time to understaffing. Get PI-vetted technicians trained on your exact equipment needs — ready to run protocols from week one."
  - 🏢 **Hiring Managers** (green accent) — "Cut turnover costs and eliminate staffing agency markups. Our B2B recruitment model places pre-screened, lab-ready local talent directly into your open roles."
  - 🏛️ **Institutions & Departments** (blue accent) — "$17.50 return for every $1 invested in worker training (EARN Maryland). Partner with Baltimore's highest-yield community training pipeline and strengthen your community impact narrative."

### 6. Impact — Animated Stats
- 3 CountUp numbers:
  - 67% — Graduate placement rate (BTI benchmark)
  - 12 — Weeks to career-ready
  - $17.50 — ROI per $1 trained (EARN Maryland)
- Supporting line: "Grounded in proven models. Built for Baltimore."

### 7. Footer (existing, minor updates)
- Copyright + UN SDG 4 Quality Education badge
- Remove any Lovable/external traces if present

---

## Signup Form Design

**Location:** Embedded in the Hero section. No second form elsewhere.

**Fields:**
1. Email input — placeholder: `your@institution.edu`, type `email`, required
2. Role select (shadcn `Select` component) — required, options:
   - `pi` → Principal Investigator (PI)
   - `lab_manager` → Lab Manager
   - `hiring_manager` → Hiring Manager
   - `research_admin` → Research Administrator
   - `institution` → Institution or Department Head
   - `other` → Other

**Button:** "Express Interest →" — uses existing `btn-glow` style

**States:**
- Default: form fields + button
- Loading: button shows spinner, disabled
- Success: green CheckCircle + "You're on the list. We'll be in touch." — no page reload, form hidden
- Error: inline red text below button — "Something went wrong — please try again."

**Duplicate email:** Supabase will return a unique constraint error on duplicate emails; surface this as: "This email is already registered. Thank you!"

---

## Supabase Integration

### Setup
- Install `@supabase/supabase-js`
- Create `.env` in project root (add to `.gitignore`):
  ```
  VITE_SUPABASE_URL=https://imktmamaqrlzvilpdwzd.supabase.co
  VITE_SUPABASE_ANON_KEY=<anon_key>
  ```
- Create `src/lib/supabase.ts`:
  ```ts
  import { createClient } from '@supabase/supabase-js'
  export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  )
  ```

### Database Table: `signups`

| Column | Type | Constraints |
|---|---|---|
| `id` | `uuid` | primary key, default `gen_random_uuid()` |
| `email` | `text` | not null, unique |
| `role` | `text` | not null |
| `created_at` | `timestamptz` | not null, default `now()` |

**SQL to run in Supabase dashboard:**
```sql
create table signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null,
  created_at timestamptz not null default now()
);

-- Row-level security
alter table signups enable row level security;

-- Allow anonymous inserts only
create policy "Allow anon insert"
  on signups for insert
  to anon
  with check (true);
```

### Form Submit Logic
```ts
const { error } = await supabase
  .from('signups')
  .insert({ email, role })

if (error?.code === '23505') {
  // unique constraint — already registered
} else if (error) {
  // generic error
} else {
  // success
}
```

---

## Files to Create / Modify

| File | Action |
|---|---|
| `.env` | Create — Supabase credentials (gitignored) |
| `.gitignore` | Update — ensure `.env` is listed |
| `src/lib/supabase.ts` | Create — Supabase client |
| `src/pages/Index.tsx` | Modify — restructure sections, add For You section, replace hero CTAs with signup form, remove bottom CTA form, wire to Supabase |
| `src/components/ForYouSection.tsx` | Create — new audience benefit cards component |
| `package.json` | Update — add `@supabase/supabase-js` |

### Components NOT changed
- `AnimatedSection.tsx` — reused as-is
- `CountUp.tsx` — reused as-is
- `Navbar.tsx` — minor text updates only
- `Footer.tsx` — minor cleanup only
- `ProblemSection.tsx`, `SolutionSection.tsx` — content updates, no structural changes
- All `src/components/ui/*` — untouched

---

## Out of Scope
- Authentication / user accounts
- Admin dashboard to view signups (use Supabase dashboard directly)
- Email sending / confirmation emails
- Multiple pages or routing changes
- Mobile-specific layout changes beyond what Tailwind responsive utilities handle
