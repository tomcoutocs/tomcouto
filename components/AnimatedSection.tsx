"use client";

import { useInView } from "@/hooks/useInView";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  const { ref, isInView } = useInView({ threshold: 0.05, rootMargin: "0px 0px -40px 0px" });

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-300 ${isInView ? "animate-fade-in-up opacity-100" : "opacity-0"} ${className}`}
      style={isInView && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
