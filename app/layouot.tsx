import "./globals.css"
import Image from "next/image"
import logo from "../public/mustwantsnew.png"

export const metadata = {
  title: "MustWants",
  description: "The dating app for real estate",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body bg-mwWhite text-mwBlack">
        <header className="flex items-center justify-center py-6 bg-gradient-to-r from-mwAqua to-mwLime shadow">
          <Image src={logo} alt="MustWants Logo" height={50} priority />
          <h1 className="ml-3 text-2xl font-heading">
            <span className="text-mwAqua">Must</span>
            <span className="text-mwLime">Wants</span>
          </h1>
        </header>
        <main className="max-w-5xl mx-auto p-6">{children}</main>
        <footer className="text-center text-sm py-6 border-t border-gray-200 text-gray-500">
          © {new Date().getFullYear()} MustWants — the dating app for real estate
        </footer>
      </body>
    </html>
  )
}
