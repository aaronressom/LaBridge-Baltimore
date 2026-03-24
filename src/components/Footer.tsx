import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-secondary text-secondary-foreground section-padding pb-10">
      <div className="container-max">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              LabBridge <span className="text-biotech-purple-light">Baltimore</span>
            </h3>
            <p className="text-secondary-foreground/60 text-sm leading-relaxed">
              Bridging the gap between world-class labs and Baltimore's untapped talent through intensive vocational training.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm tracking-widest uppercase text-electric-green">Contact</h4>
            <div className="flex items-center gap-3 text-sm text-secondary-foreground/70">
              <Mail size={16} className="text-biotech-purple-light shrink-0" />
              <span>hello@labbridgebaltimore.org</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-secondary-foreground/70">
              <Phone size={16} className="text-biotech-purple-light shrink-0" />
              <span>(443) 555-0192</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-secondary-foreground/70">
              <MapPin size={16} className="text-biotech-purple-light shrink-0" />
              <span>Baltimore, MD</span>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-sm tracking-widest uppercase text-electric-green mb-4">Stay Updated</h4>
            <p className="text-secondary-foreground/60 text-sm mb-4">Get news on cohort openings and partnerships.</p>
            <form
              onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
              className="flex gap-2"
            >
              <Input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-navy-light/50 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/40 rounded-full"
              />
              <Button type="submit" size="sm" className="bg-primary hover:bg-biotech-purple-light text-primary-foreground rounded-full px-5 transition-transform hover:scale-105 active:scale-95">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 pt-8 text-center text-sm text-secondary-foreground/40">
          © {new Date().getFullYear()} LabBridge Baltimore. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
