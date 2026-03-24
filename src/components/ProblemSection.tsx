import { Microscope, Users } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const ProblemSection = () => (
  <section id="problem" className="bg-secondary text-secondary-foreground section-padding">
    <div className="container-max">
      <AnimatedSection>
        <span className="text-electric-green font-semibold text-sm tracking-widest uppercase">The Problem</span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-6">
          The Biotech Wall
        </h2>
        <p className="text-secondary-foreground/70 max-w-2xl text-lg mb-16">
          A paradox hiding in plain sight — world-class labs and untapped talent separated by a barrier that doesn't need to exist.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
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
);

export default ProblemSection;
