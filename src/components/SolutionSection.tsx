import { Zap, Award, FlaskConical } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const cards = [
  {
    icon: Zap,
    title: "12-Week Accelerator",
    description:
      "We skip the fluff and focus exclusively on high-demand technical skills for clinical lab success — digital microscopy, specimen processing, quality control, and lab informatics.",
    color: "bg-primary/15 text-biotech-purple-light",
  },
  {
    icon: Award,
    title: "Micro-Credentialing",
    description:
      "Lab-ready professionals in 3 months with credentials recognized by Johns Hopkins and Baltimore's anchor institutions. No 4-year degree required.",
    color: "bg-electric-green/15 text-electric-green",
  },
  {
    icon: FlaskConical,
    title: "The Social Lab",
    description:
      "A contract service handling microscopy overflow for startups and labs. Students earn a living wage while training on real clinical equipment with real specimens.",
    color: "bg-primary/15 text-biotech-purple-light",
  },
];

const SolutionSection = () => (
  <section id="solution" className="section-padding bg-background">
    <div className="container-max">
      <AnimatedSection className="text-center mb-16">
        <span className="text-primary font-semibold text-sm tracking-widest uppercase">The Solution</span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-4 text-foreground">
          The Accelerator
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Three pillars that transform motivated Baltimoreans into competitive lab professionals.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((c, i) => (
          <AnimatedSection key={c.title} delay={i * 0.15}>
            <div className="group h-full bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className={`w-14 h-14 rounded-xl ${c.color} flex items-center justify-center mb-6`}>
                <c.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">{c.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{c.description}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionSection;
