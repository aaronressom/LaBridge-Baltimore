import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "The Problem", href: "#problem" },
  { label: "The Accelerator", href: "#solution" },
  { label: "The Social Lab", href: "#business" },
  { label: "Partner With Us", href: "#business" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container-max flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <a href="#" className="text-xl font-bold text-secondary">
          LabBridge <span className="text-primary">Baltimore</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Button size="sm" className="bg-primary hover:bg-biotech-purple-light text-primary-foreground rounded-full px-6 transition-transform hover:scale-105 active:scale-95">
            Apply Now
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-muted-foreground hover:text-foreground py-2"
            >
              {l.label}
            </a>
          ))}
          <Button size="sm" className="w-full bg-primary text-primary-foreground rounded-full">
            Apply Now
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
