import Image from 'next/image'

const footerLinks = [
  {
    title: 'Explore',
    items: [
      { label: 'Find a Pro', href: 'https://www.mustwants.com/find-a-pro' },
      { label: 'Visual Resources', href: 'https://www.mustwants.com/visual-resources' },
      { label: 'Home Search', href: 'https://www.mustwants.com/find-a-home/home-search' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: 'https://www.mustwants.com/about' },
      { label: 'Careers', href: 'https://www.mustwants.com/careers' },
      { label: 'Contact', href: 'https://www.mustwants.com/contact' },
    ],
  },
  {
    title: 'Connect',
    items: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/mustwants' },
      { label: 'Facebook', href: 'https://www.facebook.com/mustwants' },
      { label: 'Instagram', href: 'https://www.instagram.com/mustwants' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gradient-to-b from-white via-white to-mwAqua/10 text-gray-700">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-4">
          <div className="flex items-center gap-4">
            <Image
              src="/mwlogomustwants.png"
              alt="MustWants logo"
              width={60}
              height={60}
              className="drop-shadow-sm"
            />
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-900">MustWants</div>
          </div>
          <p className="text-sm leading-relaxed text-gray-600">
            Helping military families and busy movers turn their must-haves into reality with collaborative planning tools.
          </p>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-8 text-sm sm:grid-cols-2 md:grid-cols-3">
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">{section.title}</h4>
              <ul className="space-y-2 text-sm">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-mwAqua"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 py-6 text-center text-xs uppercase tracking-[0.3em] text-gray-500">
        © {new Date().getFullYear()} MustWants. All rights reserved.
      </div>
    </footer>
  )
}
