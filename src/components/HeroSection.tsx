import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-split.jpg";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
    {/* Background image with overlay */}
    <div className="absolute inset-0">
      <img src={heroImage} alt="Two worlds, one city — a biotech lab and Baltimore community connected by a DNA bridge" width={1920} height={960} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/70 to-navy-dark/40" />
    </div>

    <div className="relative container-max section-padding">
      <div className="max-w-2xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-electric-green font-semibold text-sm tracking-widest uppercase mb-4">
            12-Week Vocational Accelerator
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] text-secondary-foreground">
            Bridging the{" "}
            <span className="text-biotech-purple-light">Biotech Wall.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-secondary-foreground/80 max-w-lg"
        >
          Turning local Baltimore talent into lab-ready professionals in just 12 weeks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          <Button size="lg" className="bg-primary hover:bg-biotech-purple-light text-primary-foreground rounded-full px-8 text-base transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/30">
            Hire Our Graduates
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 text-base border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 transition-transform hover:scale-105 active:scale-95">
            Become a Fellow
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
