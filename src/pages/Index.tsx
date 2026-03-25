import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Microscope, Users, Zap, Award, FlaskConical,
  TrendingUp, ShieldCheck, DollarSign, ArrowRight, CheckCircle, Lock,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CountUp from "@/components/CountUp";

const Index = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [bottomEmail, setBottomEmail] = useState("");
  const [bottomSubmitted, setBottomSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent, which: "hero" | "bottom") => {
    e.preventDefault();
    if (which === "hero") { setSubmitted(true); setEmail(""); }
    else { setBottomSubmitted(true); setBottomEmail(""); }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/80 backdrop-blur-xl border-b border-border/10">
        <div className="container-max flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
          <span className="text-lg font-bold text-secondary-foreground">
            LabBridge <span className="text-primary">Baltimore</span>
          </span>
          <span className="text-xs font-semibold tracking-widest uppercase text-electric-green">
            Coming Soon
          </span>
        </div>
      </nav>

      {/* ════════════════════════════════════════════
          HERO — Deep navy with biotech orbs
      ════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-14 biotech-bg hex-grid bg-secondary">
        <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-electric-green font-semibold text-sm tracking-widest uppercase"
            >
              Pre-Launch — Social Venture
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[1.05] text-secondary-foreground"
            >
              Bridging the{" "}
              <span className="text-biotech-purple-light">Biotech Wall.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-xl text-secondary-foreground/70 max-w-xl mx-auto"
            >
              A 12-week accelerator turning Baltimore's untapped talent into
              lab-ready professionals — no 4-year degree required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {submitted ? (
                <div className="flex items-center justify-center gap-3 text-electric-green font-medium">
                  <CheckCircle size={20} />
                  <span>Thank you! We'll be in touch soon.</span>
                </div>
              ) : (
                <form
                  onSubmit={(e) => handleSubmit(e, "hero")}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <Input
                    type="email"
                    required
                    placeholder="Enter your institutional email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/40 rounded-full h-12 px-5"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="btn-glow text-primary-foreground rounded-full px-8 shrink-0"
                  >
                    Sign Up <ArrowRight size={16} className="ml-1" />
                  </Button>
                </form>
              )}
              <p className="text-secondary-foreground/40 text-xs mt-3">
                Are you a lab PI or hiring manager? Sign up to express interest.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          THE PROBLEM — Clean white background
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
              A paradox hiding in plain sight — world-class labs and untapped
              talent separated by a barrier that doesn't need to exist.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
            <AnimatedSection
              delay={0.15}
              className="bg-muted rounded-2xl p-8 lg:p-10 border border-border"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center mb-6">
                <Microscope className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Inside the Lab</h3>
              <p className="text-muted-foreground leading-relaxed">
                Scientists struggle to find trained technicians for diagnostic
                work and genomic data analysis. Open positions go unfilled for
                months, slowing critical research and patient diagnostics.
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
                Brilliant young Baltimoreans are stuck in minimum-wage cycles —
                not because they lack ability, but because they lack a 4-year
                degree. The wall isn't talent. It's access.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          THE SOLUTION — Light grey with glass cards
      ════════════════════════════════════════════ */}
      <section className="bg-muted px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="container-max">
          <AnimatedSection className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">
              Our Solution
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-4 text-foreground">
              The LabBridge Accelerator
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Three pillars that transform motivated Baltimoreans into
              competitive lab professionals.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "12-Week Accelerator",
                desc: "Exclusively focused on high-demand technical skills — digital microscopy, specimen processing, quality control, and lab informatics.",
                iconColor: "text-primary",
                iconBg: "bg-primary/15",
              },
              {
                icon: Award,
                title: "Micro-Credentialing",
                desc: "Lab-ready professionals in 3 months with credentials recognized by Johns Hopkins and Baltimore's anchor institutions. No 4-year degree required.",
                iconColor: "text-electric-green",
                iconBg: "bg-accent/15",
              },
              {
                icon: FlaskConical,
                title: "The Social Lab",
                desc: "A contract service handling microscopy overflow for startups and labs. Students earn a living wage while training on real clinical equipment.",
                iconColor: "text-primary",
                iconBg: "bg-primary/15",
              },
            ].map((c, i) => (
              <AnimatedSection key={c.title} delay={i * 0.15}>
                <div className="group h-full rounded-2xl p-8 bg-card/80 backdrop-blur-md border border-border/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-xl ${c.iconBg} flex items-center justify-center mb-6`}>
                    <c.icon className={c.iconColor} size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3">
                    {c.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          IMPACT — Deep navy, split layout, count-up
      ════════════════════════════════════════════ */}
      <section className="relative biotech-bg hex-grid bg-secondary px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="relative z-10 container-max">
          <AnimatedSection className="text-center mb-4">
            <span className="text-electric-green font-semibold text-sm tracking-widest uppercase">
              For Lab PIs & Hiring Managers
            </span>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Narrative — Left */}
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary-foreground mb-6 leading-tight">
                Impact That Pays{" "}
                <span className="bg-gradient-to-r from-biotech-purple-light to-electric-green bg-clip-text text-transparent">
                  for Itself.
                </span>
              </h2>
              <p className="text-secondary-foreground/70 text-lg leading-relaxed mb-6">
                Stop wasting grant money on high-turnover staffing agencies. Our
                B2B recruitment model allows anchor institutions to pay a single
                success fee for vetted, local, lab-ready graduates.
              </p>
              <p className="text-secondary-foreground/50 text-base leading-relaxed">
                It's not just charity — it's a{" "}
                <span className="text-electric-green font-semibold">
                  superior talent pipeline.
                </span>
              </p>
            </AnimatedSection>

            {/* Metrics — Right */}
            <AnimatedSection delay={0.2}>
              <div className="grid gap-6">
                {[
                  {
                    icon: TrendingUp,
                    value: "60%",
                    label: "Lower Turnover vs Staffing Agencies",
                  },
                  {
                    icon: DollarSign,
                    value: "$18K",
                    label: "Avg Savings Per Hire",
                  },
                  {
                    icon: Zap,
                    value: "12",
                    label: "Weeks to Lab-Ready (Rapid Credentialing)",
                  },
                  {
                    icon: ShieldCheck,
                    value: "100%",
                    label: "Vetted & Certified Graduates",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-6 rounded-2xl p-6 glass-card glow-border"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                      <s.icon className="text-biotech-purple-light" size={26} />
                    </div>
                    <div>
                      <CountUp
                        value={s.value}
                        className="text-3xl sm:text-4xl font-extrabold text-secondary-foreground"
                      />
                      <p className="text-secondary-foreground/60 text-sm mt-0.5">
                        {s.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          BOTTOM CTA — Exclusive & urgent
      ════════════════════════════════════════════ */}
      <section className="bg-background px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="container-max">
          <AnimatedSection className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-6">
              <Lock className="text-primary" size={30} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              Secure Your Talent Pipeline.
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Are you a Lab PI or hiring manager? Enter your institutional email
              to support our social venture and get early access to our first
              cohort of lab-ready professionals.
            </p>

            {bottomSubmitted ? (
              <div className="flex items-center justify-center gap-3 text-electric-green font-medium text-lg">
                <CheckCircle size={22} />
                <span>You're on the list! We'll reach out soon.</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => handleSubmit(e, "bottom")}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  required
                  placeholder="you@institution.edu"
                  value={bottomEmail}
                  onChange={(e) => setBottomEmail(e.target.value)}
                  className="bg-muted border-border text-foreground placeholder:text-muted-foreground rounded-full h-12 px-5"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="btn-glow text-primary-foreground rounded-full px-8 shrink-0"
                >
                  Express Interest
                </Button>
              </form>
            )}
            <p className="text-muted-foreground/60 text-xs mt-4">
              Venture, not charity — we're building a sustainable pipeline.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── FOOTER — dark gradient ─── */}
      <footer className="relative biotech-bg bg-navy-dark px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative z-10 container-max text-center text-sm text-secondary-foreground/40">
          © {new Date().getFullYear()} LabBridge Baltimore. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
