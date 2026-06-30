"use client"

import { ArrowRight, MapPin, Mail, Phone } from "lucide-react"
import Image from "next/image"
import { MagneticButton } from "@/components/fx"

const quickLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Portfolio" },
  { href: "/#process", label: "Process" },
  { href: "/showcase", label: "Showcase" },
  { href: "/estimate", label: "Get an Estimate" },
  { href: "/faq", label: "FAQ" },
  { href: "/book", label: "Schedule a Call" },
  { href: "/#contact", label: "Contact" },
]

const socialLinks = [
  { href: "#", label: "Facebook" },
  { href: "#", label: "Instagram" },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-brand-border/30 bg-brand-dark/50">
      {/* Faint brand watermark — real logo */}
      <Image
        src="/logo.png"
        alt=""
        width={280}
        height={280}
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 object-contain opacity-[0.05]"
      />
      <div className="section-container relative py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Osprey Solutions"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="text-lg font-bold tracking-tight text-brand-text">
                Osprey Solutions<span className="text-brand-emerald-glow">.</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-brand-muted">
              Apps, websites, and digital systems that win customers. Built for
              small businesses and growing teams.
            </p>
            <MagneticButton
              href="/#contact"
              className="btn-primary mt-6 text-sm"
            >
              Request a Quote <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-brand-text">Quick Links</h4>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-muted transition-colors hover:text-brand-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-brand-text">Connect</h4>
            <ul className="mt-4 space-y-2.5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-muted transition-colors hover:text-brand-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-semibold text-brand-text">Contact</h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-subtle" />
                <a
                  href="mailto:antonio@ospreysolutionsllc.com"
                  className="text-sm text-brand-muted transition-colors hover:text-brand-text"
                >
                  antonio@ospreysolutionsllc.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-subtle" />
                <a
                  href="tel:+12272209040"
                  className="text-sm text-brand-muted transition-colors hover:text-brand-text"
                >
                  (227) 220-9040
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-subtle" />
                <span className="text-sm text-brand-muted">
                  Remote + United States
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand-border/30 pt-8 sm:flex-row">
          <p className="text-sm text-brand-subtle">
            &copy; {new Date().getFullYear()} Osprey Solutions. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-brand-subtle transition-colors hover:text-brand-muted"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-brand-subtle transition-colors hover:text-brand-muted"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
