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
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-secondary/80 backdrop-blur-xl border-b border-border/10"
    >
      <div className="container-max flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
        <span className="text-lg font-bold text-secondary-foreground">
          LabBridge <span className="text-primary">Baltimore</span>
        </span>
        <div className="hidden sm:flex items-center gap-6 text-sm text-secondary-foreground/60">
          <a href="#mission" className="cursor-pointer hover:text-secondary-foreground transition-colors duration-200">Mission</a>
          <a href="#for-labs" className="cursor-pointer hover:text-secondary-foreground transition-colors duration-200">For Labs</a>
          <a href="#for-pis" className="cursor-pointer hover:text-secondary-foreground transition-colors duration-200">For PIs</a>
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

      {/* Scroll hint — animation disabled automatically via CSS prefers-reduced-motion */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-secondary-foreground/30"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>

    {/* ════════════════════════════════════════════
        THE PROBLEM — "The Biotech Wall"
    ════════════════════════════════════════════ */}
    <section className="bg-background px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
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
            {
              value: '21%',
              label: 'Baltimore poverty rate',
              color: 'text-biotech-purple-light',
              border: 'border-biotech-purple/30',
              bg: 'bg-biotech-purple/5',
            },
            {
              value: '5–7%',
              label: 'BLS biological technician job growth through 2033',
              color: 'text-electric-green',
              border: 'border-electric-green/30',
              bg: 'bg-electric-green/5',
            },
            {
              value: '$800M',
              label: 'Regional life sciences investment',
              color: 'text-blue-400',
              border: 'border-blue-400/30',
              bg: 'bg-blue-400/5',
            },
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
              Scientists struggle to find trained technicians for diagnostic work and genomic
              data analysis. Open positions go unfilled for months, slowing critical research.
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
            {
              icon: TrendingUp,
              value: '67%',
              label: 'Graduate placement rate (BTI benchmark)',
            },
            {
              icon: DollarSign,
              value: '$17',
              label: 'ROI per $1 invested in training (EARN Maryland)',
            },
            {
              icon: ShieldCheck,
              value: '12',
              label: 'Weeks to career-ready — no degree required',
            },
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
