import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#f9fafb] border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Image
            src="/images/logos-must-wants/must-wants-logo-text-large.png"
            alt="MustWants Logo"
            width={180}
            height={40}
            className="mb-4"
          />
          <p className="text-sm leading-relaxed">
            Helping military families find their next home — together.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/find-a-home/home-search" className="hover:text-[#74E4B8]">Find a Home</Link></li>
            <li><Link href="/find-a-pro" className="hover:text-[#74E4B8]">Find a Pro</Link></li>
            <li><Link href="/resources" className="hover:text-[#74E4B8]">Resources</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-[#74E4B8]">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-[#74E4B8]">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-[#74E4B8]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Connect</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="https://www.linkedin.com/company/mustwants" target="_blank" rel="noreferrer" className="hover:text-[#74E4B8]">LinkedIn</a></li>
            <li><a href="https://www.facebook.com/mustwants" target="_blank" rel="noreferrer" className="hover:text-[#74E4B8]">Facebook</a></li>
            <li><a href="https://www.instagram.com/mustwants" target="_blank" rel="noreferrer" className="hover:text-[#74E4B8]">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-300 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} MustWants. All rights reserved.
      </div>
    </footer>
  )
}
