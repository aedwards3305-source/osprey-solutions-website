import type { Metadata } from "next"
import "./globals.css"
import {
  AuroraBackground,
  GrainOverlay,
  DotGrid,
  ScrollProgress,
  Spotlight,
} from "@/components/fx"
import GlassIntro from "@/components/GlassIntro"

export const metadata: Metadata = {
  metadataBase: new URL("https://ospreysolutionsllc.com"),
  title: "Osprey Solutions | Apps, Websites & AI-Powered Systems That Win Customers",
  description:
    "Osprey Solutions builds custom apps, websites, and AI-powered business systems for small businesses and growing teams. From AI chatbots to smart automation — faster than DIY, better than big agencies.",
  keywords: [
    "web development",
    "app development",
    "small business websites",
    "custom web apps",
    "mobile apps",
    "digital solutions",
    "business automation",
    "AI solutions",
    "AI automation",
    "AI-powered websites",
    "AI chatbots",
    "Osprey Solutions",
  ],
  authors: [{ name: "Osprey Solutions" }],
  creator: "Osprey Solutions",
  openGraph: {
    title: "Osprey Solutions | Apps, Websites & AI-Powered Systems",
    description:
      "Custom apps, websites, and AI-powered business systems for small businesses and growing teams. Faster than DIY, better than big agencies.",
    url: "https://ospreysolutionsllc.com",
    siteName: "Osprey Solutions",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Osprey Solutions - Apps, Websites & AI-Powered Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Osprey Solutions | AI-Powered Digital Solutions That Win Customers",
    description:
      "Custom apps, websites, and AI-powered systems. Faster than DIY, better than big agencies.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Osprey Solutions",
    description:
      "Custom apps, websites, and AI-powered business solutions for small businesses and growing teams.",
    url: "https://ospreysolutionsllc.com",
    email: "antonio@ospreysolutionsllc.com",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: [
      "Web Development",
      "App Development",
      "Mobile App Development",
      "AI Solutions",
      "Business Automation",
      "UX Design",
    ],
    priceRange: "$$-$$$",
    knowsAbout: [
      "Web Development",
      "Mobile Applications",
      "Artificial Intelligence",
      "AI Chatbots",
      "Business Automation",
      "UI/UX Design",
      "Digital Strategy",
    ],
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden">
        {/* Global cinematic shell — fixed behind all content */}
        <AuroraBackground />
        <DotGrid />
        <GrainOverlay />
        <Spotlight />
        <ScrollProgress />
        <GlassIntro />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
