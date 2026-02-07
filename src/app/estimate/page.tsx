import Header from "@/components/Header"
import Quiz from "@/components/Quiz"
import CostEstimator from "@/components/CostEstimator"
import Footer from "@/components/Footer"

export default function EstimatePage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Quiz />
        <CostEstimator />
      </main>
      <Footer />
    </>
  )
}
