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
    body: "$17.50 return for every $1 invested in worker training (EARN Maryland). Partner with Baltimore's highest-yield community training pipeline and strengthen your community impact narrative.",
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
          Whether you're running experiments, filling open reqs, or stewarding institutional
          investment — LabBridge was designed with your needs in mind.
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
