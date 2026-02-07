import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Services from "@/components/Services"
import Portfolio from "@/components/Portfolio"
import Comparison from "@/components/Comparison"
import Process from "@/components/Process"
import Pricing from "@/components/Pricing"
import Testimonials from "@/components/Testimonials"
import FAQ from "@/components/FAQ"
import LeadMagnet from "@/components/LeadMagnet"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Comparison />
        <Process />
        <Pricing />
        <Testimonials />
        <FAQ />
        <LeadMagnet />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
