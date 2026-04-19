"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { FEATURED_REPO_NAMES } from "@/lib/featuredRepos";
import { getProjectImage } from "@/lib/projectImages";
import { cn } from "@/lib/utils";
import {
  Mail,
  Code,
  Database,
  Cloud,
  Smartphone,
  Globe,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Loader2,
} from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1600&q=80";

function NavLink({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors",
        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </a>
  );
}

function ProjectPreviewImage({ src, alt, url }: { src: string; alt: string; url: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex aspect-video w-full items-center justify-center bg-[var(--surface-container-highest)]"
      >
        <Github className="h-12 w-12 text-[#a4bfaa]" />
      </a>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="relative block aspect-video w-full overflow-hidden bg-[#000]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 hover:scale-[1.03]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onError={() => setHasError(true)}
      />
    </a>
  );
}

export default function Home() {
  const activeSection = useScrollSpy();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const [repos, setRepos] = useState<any[]>([]);
  const [reposLoading, setReposLoading] = useState(true);
  const [reposError, setReposError] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const apiUrl =
          typeof window !== "undefined" ? `${window.location.origin}/api/github` : "/api/github";
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setRepos(data);
        } else if (response.status === 404) {
          const username = "tomcoutocs";
          const repoNames = [...FEATURED_REPO_NAMES];
          const repoPromises = repoNames.map((name) =>
            fetch(`https://api.github.com/repos/${username}/${name}`, {
              headers: { Accept: "application/vnd.github.v3+json" },
            }).then((r) => (r.ok ? r.json() : null))
          );
          const results = await Promise.all(repoPromises);
          const formatted = results
            .filter(Boolean)
            .map(
              (repo: {
                id: number;
                name: string;
                description: string | null;
                html_url: string;
                language: string | null;
                topics: string[];
              }) => ({
                id: repo.id,
                name: repo.name,
                description: repo.description || "No description available",
                url: repo.html_url,
                language: repo.language,
                topics: repo.topics || [],
              })
            );
          setRepos(formatted);
        } else {
          setReposError(true);
        }
      } catch (error) {
        console.error("Error fetching repos:", error);
        setReposError(true);
      } finally {
        setReposLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setSubmitMessage("Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data.error || "Failed to send message. Please try again.");
      }
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const services = [
    {
      icon: Code,
      title: "Fullstack Development",
      description: "End-to-end web application development from frontend to backend",
      bullets: ["React, Next.js, TypeScript", "Node.js, Express, REST APIs", "Database design & optimization"],
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment strategies",
      bullets: ["AWS, Azure, Vercel deployment", "CI/CD pipeline setup", "Infrastructure as Code"],
    },
    {
      icon: Database,
      title: "Database Design",
      description: "Efficient database architecture and optimization",
      bullets: ["PostgreSQL, MongoDB, MySQL", "Query optimization", "Data modeling & migration"],
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Cross-platform mobile applications",
      bullets: ["React Native", "Responsive web design", "Progressive Web Apps"],
    },
    {
      icon: Globe,
      title: "API Development",
      description: "Robust and secure API design and implementation",
      bullets: ["RESTful & GraphQL APIs", "Authentication & authorization", "API documentation"],
    },
    {
      icon: Code,
      title: "Software Consulting",
      description: "Expert guidance on architecture and best practices",
      bullets: ["Code reviews & refactoring", "Technical architecture", "Team mentoring"],
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--on-background)]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-[color-mix(in_oklab,var(--outline-variant)_12%,transparent)] bg-[color-mix(in_oklab,var(--surface)_85%,transparent)] backdrop-blur-xl supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--surface)_75%,transparent)]">
        <div className="mx-auto grid h-16 max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-8">
          <a href="#" className="flex items-center gap-2 justify-self-start">
            <Code className="h-5 w-5 text-[#a4bfaa]" />
            <span className="text-sm font-bold uppercase tracking-[0.18em]">Tom Couto</span>
          </a>
          <nav className="flex items-center justify-center gap-5 sm:gap-10">
            <NavLink href="#services" isActive={activeSection === "services"}>
              Services
            </NavLink>
            <NavLink href="#projects" isActive={activeSection === "projects"}>
              Projects
            </NavLink>
            <NavLink href="#contact" isActive={activeSection === "contact"}>
              Contact
            </NavLink>
          </nav>
          <div className="justify-self-end">
            <Button
              variant="outline"
              size="sm"
              className="rounded-md border-[color-mix(in_oklab,var(--outline-variant)_25%,transparent)] bg-transparent text-[10px] font-semibold uppercase tracking-[0.15em] hover:bg-[var(--surface-container-high)] hover:scale-[1.02]"
              asChild
            >
              <a href="#contact">Book a call</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-20 lg:pt-28">
        <AnimatedSection>
          <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-end lg:gap-16">
            <div>
              <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em]">
                Fullstack development
                <br />
                <span className="text-primary">& software consulting</span>
              </h1>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground lg:ml-auto lg:text-right lg:text-base">
              Building modern, scalable applications and providing expert software consulting to help
              your business thrive in the digital world.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              className="btn-primary-gradient h-12 rounded-md px-8 text-sm font-semibold uppercase tracking-wider text-[#2e4535] hover:opacity-95"
              asChild
            >
              <a href="#contact">Start consultation</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-md border-[color-mix(in_oklab,var(--outline-variant)_30%,transparent)] bg-[var(--secondary-container)] px-8 text-sm font-semibold uppercase tracking-wider text-[var(--on-secondary-container)] hover:bg-[#3a4a3f] hover:scale-[1.02]"
              asChild
            >
              <a href="#projects">Portfolio</a>
            </Button>
          </div>
          <div className="relative mt-14 aspect-[21/9] w-full overflow-hidden rounded-md">
            <Image
              src={HERO_IMAGE}
              alt="City at night — atmosphere"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--surface)]/80 via-transparent to-transparent"
              aria-hidden
            />
          </div>
        </AnimatedSection>
      </section>

      {/* Services */}
      <section id="services" className="bg-[var(--surface-container-low)] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <AnimatedSection>
            <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-xl">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  What I provide
                </p>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.5rem]">
                  Expertise in digital craftsmanship
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Comprehensive development and consulting services tailored to your needs.
                </p>
              </div>
              <a
                href="#services-grid"
                className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary transition-opacity hover:opacity-80"
              >
                Explore stack →
              </a>
            </div>
          </AnimatedSection>
          <div id="services-grid" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 60}>
                <article className="group flex h-full flex-col rounded-md bg-[var(--surface-container-high)] p-6 transition-colors hover:bg-[#212722]">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-[color-mix(in_oklab,var(--primary)_12%,transparent)]">
                    <s.icon className="h-5 w-5 text-[#a4bfaa]" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                  <ul className="mt-5 space-y-3 border-0 text-sm text-[var(--on-background)]/85">
                    {s.bullets.map((b) => (
                      <li key={b} className="pl-0 leading-snug">
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <AnimatedSection>
            <div className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <h2 className="text-2xl font-bold uppercase tracking-[0.12em] md:text-3xl">
                Featured projects
              </h2>
              <a
                href="#projects"
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary hover:underline"
              >
                View all work
              </a>
            </div>
          </AnimatedSection>

          {reposLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-[#a4bfaa]" />
            </div>
          ) : reposError ? (
            <p className="py-12 text-center text-muted-foreground">
              Unable to load projects. Please try again later.
            </p>
          ) : repos.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">No projects found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {repos.map((repo, index) => (
                <AnimatedSection key={repo.id} delay={index * 80}>
                  <article className="flex flex-col overflow-hidden rounded-md bg-[var(--surface-container-high)] shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
                    {getProjectImage(repo.name) && (
                      <ProjectPreviewImage
                        src={getProjectImage(repo.name)!}
                        alt={`${repo.name} preview`}
                        url={repo.url}
                      />
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start gap-2">
                        <Github className="mt-0.5 h-4 w-4 shrink-0 text-[#a4bfaa]" />
                        <h3 className="text-lg font-bold tracking-tight">{repo.name}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{repo.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {repo.language && (
                          <span className="rounded-md bg-[var(--tertiary-container)] px-2.5 py-1 text-xs font-medium text-[var(--on-tertiary-container)]">
                            {repo.language}
                          </span>
                        )}
                        {repo.topics.slice(0, 4).map((topic: string) => (
                          <span
                            key={topic}
                            className="rounded-md bg-[var(--tertiary-container)] px-2.5 py-1 text-xs font-medium text-[var(--on-tertiary-container)]"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center text-sm font-medium text-primary hover:underline"
                      >
                        View on GitHub
                        <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                      </a>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-[var(--surface-container-low)] py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-5 md:px-8">
          <AnimatedSection>
            <div className="rounded-md bg-[var(--surface-container-high)] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)] md:p-12">
              <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">
                Let&apos;s build something better
              </h2>
              <p className="mt-3 text-center text-sm text-muted-foreground">
                Let&apos;s discuss your next project or how I can help your business — I typically
                respond within 48 hours.
              </p>
              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      Name
                    </label>
                    <input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="input-nocturnal h-11 w-full px-3 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="input-nocturnal h-11 w-full px-3 text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Subject
                  </label>
                  <input
                    id="subject"
                    placeholder="Project inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="input-nocturnal h-11 w-full px-3 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Project vision
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    rows={5}
                    className="input-nocturnal min-h-[140px] w-full resize-y px-3 py-3 text-sm"
                  />
                </div>
                {submitStatus && (
                  <div
                    className={cn(
                      "flex items-center gap-2 rounded-md p-4 text-sm",
                      submitStatus === "success"
                        ? "bg-[color-mix(in_oklab,#344c3b_40%,transparent)] text-[#e1e7df]"
                        : "bg-[color-mix(in_oklab,#5c2b2b_35%,transparent)] text-[#e1e7df]"
                    )}
                  >
                    {submitStatus === "success" ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 shrink-0" />
                    )}
                    <p className="font-medium">{submitMessage}</p>
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary-gradient h-12 w-full rounded-md text-sm font-semibold uppercase tracking-wider text-[#2e4535]"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Sending…" : "Initiate connection"}
                </Button>
              </form>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-8 border-0 pt-8">
                <a
                  href="mailto:tomcouto.cs@gmail.com"
                  className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
                <a
                  href="https://github.com/tomcoutocs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/thomascouto/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <footer className="py-10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 px-5 text-center md:flex-row md:text-left md:px-8">
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-[#a4bfaa]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Tom Couto</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Tom Couto. Fullstack development & software consulting.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://www.linkedin.com/in/thomascouto/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground hover:text-primary"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/tomcoutocs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground hover:text-primary"
            >
              GitHub
            </a>
            <a
              href="mailto:tomcouto.cs@gmail.com?subject=Resume%20request"
              className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground hover:text-primary"
            >
              Resume
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
