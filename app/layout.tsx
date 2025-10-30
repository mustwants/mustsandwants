import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

export const metadata = {
  title: 'MustWants | Military PCS Home Search',
  description:
    'Plan your next PCS move with MustWants. Discover military-friendly homes, compare neighborhoods, and match with trusted pros.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-black">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

