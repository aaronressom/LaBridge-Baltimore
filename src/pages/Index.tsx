import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Microscope, Users, Zap, Award, FlaskConical, TrendingUp, ShieldCheck, DollarSign, ArrowRight, Mail, CheckCircle } from "lucide-react";

import AnimatedSection from "@/components/AnimatedSection";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const stats = [
  { value: "60%", label: "Lower Turnover vs Staffing Agencies", icon: TrendingUp },
  { value: "$18K", label: "Avg Savings Per Hire", icon: DollarSign },
  { value: "12", label: "Weeks to Lab-Ready", icon: Zap },
  { value: "100%", label: "Vetted & Certified Graduates", icon: ShieldCheck },
];

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
      {/* Minimal top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container-max flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
          <span className="text-lg font-bold text-foreground">
            LabBridge <span className="text-primary">Baltimore</span>
          </span>
          <span className="text-xs font-semibold tracking-widest uppercase text-electric-green">Coming Soon</span>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-14 overflow-hidden bg-secondary">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-20 text-center">
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
              className="text-lg sm:text-xl text-secondary-foreground/80 max-w-xl mx-auto"
            >
              A 12-week accelerator turning Baltimore's untapped talent into lab-ready professionals — no 4-year degree required.
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
                <form onSubmit={(e) => handleSubmit(e, "hero")} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
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
                    className="bg-primary hover:bg-biotech-purple-light text-primary-foreground rounded-full px-8 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/30 shrink-0"
                  >
                    Sign Up <ArrowRight size={16} className="ml-1" />
                  </Button>
                </form>
              )}
              <p className="text-secondary-foreground/50 text-xs mt-3">
                Are you a lab PI or hiring manager? Sign up to express interest.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <section className="bg-secondary text-secondary-foreground px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="container-max">
          <AnimatedSection className="text-center mb-14">
            <span className="text-electric-green font-semibold text-sm tracking-widest uppercase">The Problem</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-4">
              The Biotech Wall
            </h2>
            <p className="text-secondary-foreground/70 max-w-2xl mx-auto text-lg">
              A paradox hiding in plain sight — world-class labs and untapped talent separated by a barrier that doesn't need to exist.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
            <AnimatedSection delay={0.15} className="bg-navy-light/40 rounded-2xl p-8 lg:p-10 border border-secondary-foreground/10">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <Microscope className="text-biotech-purple-light" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Inside the Lab</h3>
              <p className="text-secondary-foreground/70 leading-relaxed">
                Scientists struggle to find trained technicians for diagnostic work and genomic data analysis. Open positions go unfilled for months, slowing critical research and patient diagnostics.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3} className="bg-navy-light/40 rounded-2xl p-8 lg:p-10 border border-secondary-foreground/10">
              <div className="w-14 h-14 rounded-xl bg-electric-green/20 flex items-center justify-center mb-6">
                <Users className="text-electric-green" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Three Blocks Away</h3>
              <p className="text-secondary-foreground/70 leading-relaxed">
                Brilliant young Baltimoreans are stuck in minimum-wage cycles — not because they lack ability, but because they lack a 4-year degree. The wall isn't talent. It's access.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── BY THE NUMBERS ─── */}
      <section className="bg-background px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="container-max">
          <AnimatedSection className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">By The Numbers</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-4 text-foreground">
              Impact That Pays for Itself
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.1}>
                <div className="text-center bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-4">
                    <s.icon className="text-primary" size={24} />
                  </div>
                  <p className="text-4xl sm:text-5xl font-black text-foreground">{s.value}</p>
                  <p className="text-muted-foreground text-sm mt-2">{s.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE SOLUTION ─── */}
      <section className="bg-muted px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="container-max">
          <AnimatedSection className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">Our Solution</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-4 text-foreground">
              The LabBridge Accelerator
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Three pillars that transform motivated Baltimoreans into competitive lab professionals.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "12-Week Accelerator",
                desc: "Exclusively focused on high-demand technical skills — digital microscopy, specimen processing, quality control, and lab informatics.",
                color: "bg-primary/15 text-biotech-purple-light",
              },
              {
                icon: Award,
                title: "Micro-Credentialing",
                desc: "Lab-ready professionals in 3 months with credentials recognized by Johns Hopkins and Baltimore's anchor institutions. No 4-year degree required.",
                color: "bg-electric-green/15 text-electric-green",
              },
              {
                icon: FlaskConical,
                title: "The Social Lab",
                desc: "A contract service handling microscopy overflow for startups and labs. Students earn a living wage while training on real clinical equipment.",
                color: "bg-primary/15 text-biotech-purple-light",
              },
            ].map((c, i) => (
              <AnimatedSection key={c.title} delay={i * 0.15}>
                <div className="group h-full bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-xl ${c.color} flex items-center justify-center mb-6`}>
                    <c.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3">{c.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA / EMAIL SIGNUP ─── */}
      <section className="bg-secondary text-secondary-foreground px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="container-max text-center">
          <AnimatedSection>
            <Mail className="mx-auto mb-6 text-biotech-purple-light" size={40} />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
              Join the Movement
            </h2>
            <p className="text-secondary-foreground/70 max-w-xl mx-auto text-lg mb-8">
              Are you a principal investigator, lab director, or hiring manager? Sign up to express your support and be the first to access our pipeline of trained graduates.
            </p>

            {bottomSubmitted ? (
              <div className="flex items-center justify-center gap-3 text-electric-green font-medium text-lg">
                <CheckCircle size={22} />
                <span>You're on the list! We'll reach out soon.</span>
              </div>
            ) : (
              <form onSubmit={(e) => handleSubmit(e, "bottom")} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  required
                  placeholder="you@institution.edu"
                  value={bottomEmail}
                  onChange={(e) => setBottomEmail(e.target.value)}
                  className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/40 rounded-full h-12 px-5"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary hover:bg-biotech-purple-light text-primary-foreground rounded-full px-8 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/30 shrink-0"
                >
                  Express Interest
                </Button>
              </form>
            )}
            <p className="text-secondary-foreground/40 text-xs mt-4">
              Venture, not charity — we're building a sustainable pipeline.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-navy-dark text-secondary-foreground/50 px-4 sm:px-6 lg:px-8 py-8">
        <div className="container-max text-center text-sm">
          © {new Date().getFullYear()} LabBridge Baltimore. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
