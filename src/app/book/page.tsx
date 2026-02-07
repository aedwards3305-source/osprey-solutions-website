import Header from "@/components/Header"
import BookCall from "@/components/BookCall"
import Footer from "@/components/Footer"

export default function BookPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <BookCall />
      </main>
      <Footer />
    </>
  )
}
