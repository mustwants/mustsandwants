'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/images/logos-must-wants/must-wants-logo-text-large.png"
            alt="MustWants Logo"
            width={180}
            height={40}
            priority
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-8 text-gray-800 font-medium">
          <Link href="/find-a-home/home-search" className="hover:text-[#74E4B8]">
            Find a Home
          </Link>
          <Link href="/find-a-pro" className="hover:text-[#74E4B8]">
            Find a Pro
          </Link>
          <Link href="/resources" className="hover:text-[#74E4B8]">
            Resources
          </Link>
          <Link href="/about" className="hover:text-[#74E4B8]">
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}
