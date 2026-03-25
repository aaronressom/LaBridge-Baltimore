import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CountUpProps {
  value: string; // e.g. "60%", "$18K", "12"
  className?: string;
}

const parseValue = (val: string) => {
  const prefix = val.match(/^[^0-9]*/)?.[0] || "";
  const suffix = val.match(/[^0-9]*$/)?.[0] || "";
  const num = parseInt(val.replace(/[^0-9]/g, ""), 10) || 0;
  return { prefix, suffix, num };
};

const CountUp = ({ value, className = "" }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState("0");
  const { prefix, suffix, num } = parseValue(value);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(`${prefix}${Math.round(num * eased)}${suffix}`);
      if (step >= steps) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, num, prefix, suffix]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {isInView ? display : `${prefix}0${suffix}`}
    </motion.span>
  );
};

export default CountUp;
