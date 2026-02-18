"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { getProjectImage } from "@/lib/projectImages";
import { Mail, Code, Database, Cloud, Smartphone, Globe, Github, Linkedin, Send, CheckCircle2, AlertCircle, ExternalLink, Loader2 } from "lucide-react";

function NavLink({ href, children, isActive }: { href: string; children: React.ReactNode; isActive?: boolean }) {
  return (
    <a
      href={href}
      className={`text-sm font-medium transition-colors ${
        isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
      }`}
    >
      {children}
    </a>
  );
}

function ProjectPreviewImage({ src, alt, url }: { src: string; alt: string; url: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="flex aspect-video w-full items-center justify-center bg-muted">
        <Github className="h-12 w-12 text-muted-foreground" />
      </a>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block relative aspect-video w-full bg-muted">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-opacity hover:opacity-90"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
        const apiUrl = typeof window !== "undefined" ? `${window.location.origin}/api/github` : "/api/github";
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setRepos(data);
        } else if (response.status === 404) {
          // Fallback: fetch directly from GitHub when API route isn't available (e.g. static export)
          const username = "tomcoutocs";
          const repoNames = ["zarcfit", "parrot", "PromptDaily"];
          const repoPromises = repoNames.map((name) =>
            fetch(`https://api.github.com/repos/${username}/${name}`, {
              headers: { Accept: "application/vnd.github.v3+json" },
            }).then((r) => (r.ok ? r.json() : null))
          );
          const results = await Promise.all(repoPromises);
          const formatted = results
            .filter(Boolean)
            .map((repo: { id: number; name: string; description: string | null; html_url: string; language: string | null; topics: string[] }) => ({
              id: repo.id,
              name: repo.name,
              description: repo.description || "No description available",
              url: repo.html_url,
              language: repo.language,
              topics: repo.topics || [],
            }));
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
        headers: {
          "Content-Type": "application/json",
        },
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
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Code className="h-6 w-6" />
            <span className="text-xl font-bold">Tom Couto</span>
          </div>
          <div className="flex items-center space-x-6">
            <NavLink href="#services" isActive={activeSection === "services"}>
              Services
            </NavLink>
            <NavLink href="#projects" isActive={activeSection === "projects"}>
              Projects
            </NavLink>
            <NavLink href="#contact" isActive={activeSection === "contact"}>
              Contact
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Fullstack Development
            <br />
            <span className="text-primary">& Software Consulting</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            Building modern, scalable applications and providing expert software consulting
            to help your business thrive in the digital world.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <a href="#contact">Get Started</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#projects">View Work</a>
            </Button>
          </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What I Provide</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Comprehensive development and consulting services tailored to your needs
              </p>
            </div>
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatedSection delay={100}>
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Fullstack Development</CardTitle>
                <CardDescription>
                  End-to-end web application development from frontend to backend
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• React, Next.js, TypeScript</li>
                  <li>• Node.js, Express, REST APIs</li>
                  <li>• Database design & optimization</li>
                </ul>
              </CardContent>
            </Card>
            </AnimatedSection>

            <AnimatedSection delay={150}>
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Cloud className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Cloud Solutions</CardTitle>
                <CardDescription>
                  Scalable cloud infrastructure and deployment strategies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• AWS, Azure, Vercel deployment</li>
                  <li>• CI/CD pipeline setup</li>
                  <li>• Infrastructure as Code</li>
                </ul>
              </CardContent>
            </Card>
            </AnimatedSection>

            <AnimatedSection delay={200}>
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Database Design</CardTitle>
                <CardDescription>
                  Efficient database architecture and optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• PostgreSQL, MongoDB, MySQL</li>
                  <li>• Query optimization</li>
                  <li>• Data modeling & migration</li>
                </ul>
              </CardContent>
            </Card>
            </AnimatedSection>

            <AnimatedSection delay={250}>
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Mobile Development</CardTitle>
                <CardDescription>
                  Cross-platform mobile applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• React Native</li>
                  <li>• Responsive web design</li>
                  <li>• Progressive Web Apps</li>
                </ul>
              </CardContent>
            </Card>
            </AnimatedSection>

            <AnimatedSection delay={300}>
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>API Development</CardTitle>
                <CardDescription>
                  Robust and secure API design and implementation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• RESTful & GraphQL APIs</li>
                  <li>• Authentication & authorization</li>
                  <li>• API documentation</li>
                </ul>
              </CardContent>
            </Card>
            </AnimatedSection>

            <AnimatedSection delay={350}>
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Software Consulting</CardTitle>
                <CardDescription>
                  Expert guidance on architecture and best practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Code reviews & refactoring</li>
                  <li>• Technical architecture</li>
                  <li>• Team mentoring</li>
                </ul>
              </CardContent>
            </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Separator />

      {/* Projects Section */}
      <section id="projects" className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A selection of my recent work and projects
              </p>
            </div>
          </AnimatedSection>
          {reposLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : reposError ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Unable to load projects. Please try again later.
              </p>
            </div>
          ) : repos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {repos.map((repo, index) => (
                <AnimatedSection key={repo.id} delay={index * 80}>
                <Card className="flex flex-col overflow-hidden">
                  {getProjectImage(repo.name) && (
                    <ProjectPreviewImage
                      src={getProjectImage(repo.name)!}
                      alt={`${repo.name} preview`}
                      url={repo.url}
                    />
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <Github className="h-5 w-5" />
                          {repo.name}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {repo.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.language && (
                        <Badge variant="secondary">{repo.language}</Badge>
                      )}
                      {repo.topics.slice(0, 3).map((topic: string) => (
                        <Badge key={topic} variant="secondary">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-auto pt-4">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-primary hover:underline"
                      >
                        View on GitHub
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      <Separator />

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-2xl">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get In Touch</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Let's discuss your next project or how I can help your business
              </p>
            </div>
          </AnimatedSection>
          <Card>
            <CardHeader>
              <CardTitle>Contact Me</CardTitle>
              <CardDescription>
                Fill out the form below or reach out via email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="Project inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    className="min-h-[120px]"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                {submitStatus && (
                  <div
                    className={`flex items-center space-x-2 p-4 rounded-lg ${
                      submitStatus === "success"
                        ? "bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100"
                        : "bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100"
                    }`}
                  >
                    {submitStatus === "success" ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                    <p className="text-sm font-medium">{submitMessage}</p>
                  </div>
                )}
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
              <div className="mt-8 pt-8 border-t">
                <div className="flex items-center justify-center space-x-6">
                  <a
                    href="mailto:tomcouto.cs@gmail.com"
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </a>
                  <a
                    href="https://github.com/tomcoutocs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/thomascouto/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Tom Couto. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="#services"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Services
              </a>
              <a
                href="#projects"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
