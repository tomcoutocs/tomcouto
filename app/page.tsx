"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Code, Database, Cloud, Smartphone, Globe, Github, Linkedin, Send } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Code className="h-6 w-6" />
            <span className="text-xl font-bold">Tom Couto</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </a>
            <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors">
              Projects
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container px-4 py-24 md:py-32">
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
      </section>

      {/* Services Section */}
      <section id="services" className="container px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What I Provide</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive development and consulting services tailored to your needs
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          </div>
        </div>
      </section>

      <Separator />

      {/* Projects Section */}
      <section id="projects" className="container px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Past Projects</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A selection of projects I've worked on
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>E-Commerce Platform</CardTitle>
                <CardDescription>
                  Full-featured online store with payment integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Stripe</Badge>
                  <Badge variant="secondary">PostgreSQL</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Built a scalable e-commerce solution with real-time inventory management,
                  secure payment processing, and admin dashboard.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SaaS Dashboard</CardTitle>
                <CardDescription>
                  Analytics and management platform for businesses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                  <Badge variant="secondary">AWS</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Developed a comprehensive SaaS platform with user management,
                  analytics, reporting, and subscription billing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mobile App</CardTitle>
                <CardDescription>
                  Cross-platform mobile application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">React Native</Badge>
                  <Badge variant="secondary">Firebase</Badge>
                  <Badge variant="secondary">Redux</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Created a feature-rich mobile app with offline capabilities,
                  push notifications, and real-time synchronization.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Gateway</CardTitle>
                <CardDescription>
                  Microservices architecture with API gateway
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Express</Badge>
                  <Badge variant="secondary">Docker</Badge>
                  <Badge variant="secondary">Kubernetes</Badge>
                  <Badge variant="secondary">GraphQL</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Designed and implemented a microservices architecture with
                  API gateway, service discovery, and load balancing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Analytics Platform</CardTitle>
                <CardDescription>
                  Real-time data processing and visualization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">PostgreSQL</Badge>
                  <Badge variant="secondary">D3.js</Badge>
                  <Badge variant="secondary">Redis</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Built a data analytics platform with real-time processing,
                  interactive dashboards, and automated reporting.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Legacy System Migration</CardTitle>
                <CardDescription>
                  Modernizing legacy applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Migration</Badge>
                  <Badge variant="secondary">Refactoring</Badge>
                  <Badge variant="secondary">Modern Stack</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Successfully migrated legacy systems to modern technology stacks,
                  improving performance and maintainability.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* Contact Section */}
      <section id="contact" className="container px-4 py-24">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get In Touch</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Let's discuss your next project or how I can help your business
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Me</CardTitle>
              <CardDescription>
                Fill out the form below or reach out via email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="your.email@example.com" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="Project inquiry" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    className="min-h-[120px]"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
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
        <div className="container px-4">
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
