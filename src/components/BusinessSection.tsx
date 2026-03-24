import { TrendingUp, ShieldCheck, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";

const stats = [
  { icon: TrendingUp, label: "Lower Turnover", value: "60%" },
  { icon: DollarSign, label: "Avg Savings vs Staffing Agencies", value: "$18K" },
  { icon: ShieldCheck, label: "Vetted & Certified", value: "100%" },
];

const BusinessSection = () => (
  <section id="business" className="section-padding bg-muted">
    <div className="container-max">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <AnimatedSection>
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">For B2B Partners</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-6 text-foreground">
            Venture, Not Just Charity.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Our B2B Recruitment model lets anchor institutions pay a success fee for vetted, local graduates — reducing expensive staffing agency turnover while building community wealth. This is impact that pays for itself.
          </p>
          <Button size="lg" className="bg-primary hover:bg-biotech-purple-light text-primary-foreground rounded-full px-8 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/25">
            Partner With Us
          </Button>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="grid gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-6 bg-card rounded-2xl p-6 border border-border shadow-sm">
                <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                  <s.icon className="text-primary" size={26} />
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-foreground">{s.value}</p>
                  <p className="text-muted-foreground text-sm">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default BusinessSection;
