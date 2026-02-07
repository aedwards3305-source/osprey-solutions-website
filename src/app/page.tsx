import Header from "@/components/Header"
import Hero from "@/components/Hero"
import ResultsTicker from "@/components/ResultsTicker"
import Services from "@/components/Services"
import Quiz from "@/components/Quiz"
import Portfolio from "@/components/Portfolio"
import BeforeAfter from "@/components/BeforeAfter"
import Comparison from "@/components/Comparison"
import StatsCounter from "@/components/StatsCounter"
import Process from "@/components/Process"
import Testimonials from "@/components/Testimonials"
import CostEstimator from "@/components/CostEstimator"
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
        <ResultsTicker />
        <Services />
        <Quiz />
        <Portfolio />
        <BeforeAfter />
        <Comparison />
        <StatsCounter />
        <Process />
        <Testimonials />
        <CostEstimator />
        <FAQ />
        <LeadMagnet />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
