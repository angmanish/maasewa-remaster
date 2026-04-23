"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

const stats: Stat[] = [
  { value: 2000, suffix: "+", label: "Patients Served", prefix: "" },
  { value: 4.8, suffix: "★", label: "Average Rating", prefix: "" },
  { value: 15, suffix: "+", label: "Cities Covered", prefix: "" },
  { value: 98, suffix: "%", label: "Satisfaction Rate", prefix: "" },
];

function CountUp({ value, suffix, prefix = "" }: { value: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const started = useRef(false);

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true;
      const duration = 1800;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Number(current.toFixed(1)));
        }
      }, duration / steps);
    }
  }, [inView, value]);

  const display = Number.isInteger(value)
    ? Math.round(count).toLocaleString()
    : count.toFixed(1);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-primary-deeper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-extrabold text-white mb-3"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Trusted by Thousands Across India
          </h2>
          <p className="text-blue-200 text-lg">
            Real numbers. Real results. Real care.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm"
            >
              <p
                className="text-4xl md:text-5xl font-extrabold text-white mb-2"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                <CountUp value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </p>
              <p className="text-blue-200 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
