'use client'

import { Fragment, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type NavChild = {
  label: string
  href?: string
  type?: 'link' | 'heading'
}

type NavItem = {
  label: string
  href: string
  children?: NavChild[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Find a Home',
    href: '/find-a-home/home-search',
    children: [
      { label: 'Home Search', href: '/find-a-home/home-search' },
      { label: 'FSBO/FRBO Homes', href: '/find-a-home/fsbo-frbo-homes' },
    ],
  },
  {
    label: 'List a Home',
    href: '/list-a-home/for-sale-by-owner',
    children: [
      { label: 'Sale By Owner', href: '/list-a-home/for-sale-by-owner' },
      { label: 'Rent By Owner', href: '/list-a-home/for-rent-by-owner' },
    ],
  },
  {
    label: 'Find a Pro',
    href: '/find-a-pro',
  },
  {
    label: 'PCS Resources',
    href: '/pcs-resources',
    children: [
      { label: 'Visual Data Maps', href: '/pcs-resources/visual-data-analysis' },
      { label: 'Download the App', href: '/download-app' },
      { label: 'Checklists', href: '/checklists' },
      { label: 'Blogs', href: '/blogs' },
      { label: 'Podcast', href: '/pcs-resources/podcast' },
      { label: 'Partners & Affiliates', href: '/pcs-resources/partners-and-affiliates' },
    ],
  },
  {
    label: 'Help',
    href: '/contact-us',
    children: [
      { label: 'Contact Us', href: '/contact-us' },
      { label: 'FAQs', href: '/help/frequent-questions' },
      { label: 'Our Coverage Map', href: '/pcs-resources/visual-data-analysis/mw-coverage' },
      { label: 'Video Tutorials', href: '/help/video-tutorials' },
      { label: 'Send Feedback', href: '/help/send-feedback' },
    ],
  },
  {
    label: 'Real Estate Professionals',
    href: '/real-estate-professionals/realtor',
    children: [
      { type: 'heading', label: "I'm a..." },
      { label: 'Agent / Broker', href: '/real-estate-professionals/realtor' },
      { label: 'Attorney', href: '/real-estate-professionals/attorney' },
      { label: 'Business Owner', href: '/real-estate-professionals/business-partner' },
      { label: 'Home Inspector', href: '/real-estate-professionals/home-inspector' },
      { label: 'Insurance Agent', href: '/real-estate-professionals/home-insurance' },
      { label: 'Lender', href: '/real-estate-professionals/lender' },
      { label: 'Property Manager', href: '/real-estate-professionals/property-manager' },
      { label: 'Title Insurance Agent', href: '/real-estate-professionals/title-insurance' },
      { type: 'heading', label: 'Applications' },
      { label: 'Check Status', href: '/real-estate-professionals/applications' },
    ],
  },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null)

  const groupedNavItems = useMemo(() => NAV_ITEMS, [])

  function toggleMobileMenu() {
    setMobileOpen((prev) => !prev)
  }

  function handleMobileLinkClick() {
    setMobileOpen(false)
    setExpandedMobileItem(null)
  }

  function toggleMobileSection(label: string, hasChildren: boolean) {
    if (!hasChildren) {
      handleMobileLinkClick()
      return
    }
    setExpandedMobileItem((prev) => (prev === label ? null : label))
  }

  return (
    <header className="sticky top-0 z-50 bg-black text-white">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label="MustWants home">
          <Image
            src="/images/logos-must-wants/must-wants-logo-wtext.png"
            alt="MustWants logo"
            width={200}
            height={48}
            priority
            className="h-10 w-auto"
          />
        </Link>
        <nav className="hidden xl:flex items-center gap-10 text-sm font-semibold tracking-wide">
          {groupedNavItems.map((item) => {
            const hasChildren = Boolean(item.children && item.children.length > 0)
            return (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-2 py-3 transition-colors hover:text-mwAqua"
                >
                  <span>{item.label}</span>
                  {hasChildren && (
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      className="h-3 w-3 transition-transform group-hover:rotate-180"
                      viewBox="0 0 12 8"
                    >
                      <path
                        d="M1.41.59 6 5.17 10.59.59 12 2l-6 6-6-6L1.41.59Z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                </Link>
                {hasChildren && (
                  <div className="invisible absolute left-0 top-full mt-2 w-64 translate-y-3 rounded-md border border-white/10 bg-black/95 py-3 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex flex-col">
                      {item.children?.map((child) => (
                        <Fragment key={`${item.label}-${child.label}`}>
                          {child.type === 'heading' ? (
                            <span className="px-4 pt-3 pb-1 text-xs font-bold uppercase tracking-[0.08em] text-white/60">
                              {child.label}
                            </span>
                          ) : (
                            <Link
                              href={child.href ?? item.href}
                              className="px-4 py-2 text-sm font-medium text-white transition-colors hover:text-mwAqua"
                            >
                              {child.label}
                            </Link>
                          )}
                        </Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>
        <div className="hidden xl:flex items-center gap-3 border-l border-white/20 pl-4">
          <Link
            href="/signup"
            className="flex h-8 w-32 items-center justify-center rounded-full bg-mwAqua text-sm font-bold text-black transition-colors hover:bg-mwLime"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="flex h-8 w-32 items-center justify-center rounded-full border-2 border-mwAqua text-sm font-bold text-white transition-colors hover:border-mwLime hover:text-mwLime"
          >
            Log In
          </Link>
        </div>
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 xl:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileOpen ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>
      <div
        className={`xl:hidden ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        } fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto bg-black/95 px-4 pb-10 transition-opacity`}
      >
        <div className="mx-auto max-w-2xl divide-y divide-white/10">
          <div className="flex flex-col gap-1 py-6">
            {groupedNavItems.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0)
              const expanded = expandedMobileItem === item.label
              return (
                <div key={`mobile-${item.label}`} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => toggleMobileSection(item.label, hasChildren)}
                    className="flex items-center justify-between rounded-md px-3 py-3 text-left text-base font-semibold hover:bg-white/10"
                  >
                    <span>{item.label}</span>
                    {hasChildren ? (
                      <svg
                        className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
                        viewBox="0 0 12 8"
                        aria-hidden
                      >
                        <path d="M1.41.59 6 5.17 10.59.59 12 2l-6 6-6-6L1.41.59Z" fill="currentColor" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" viewBox="0 0 20 20" aria-hidden>
                        <path
                          d="m7.293 14.707 1.414-1.414L6.414 11h9.586V9H6.414l2.293-2.293L7.293 5.293 3.586 9l3.707 3.707Z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </button>
                  {hasChildren ? (
                    <div className={`${expanded ? 'max-h-96' : 'max-h-0'} overflow-hidden transition-[max-height] duration-300`}>
                      <div className="flex flex-col gap-1 px-3 pb-3">
                        {item.children?.map((child) =>
                          child.type === 'heading' ? (
                            <span
                              key={`mobile-${item.label}-${child.label}`}
                              className="pt-3 text-xs font-bold uppercase tracking-[0.12em] text-white/60"
                            >
                              {child.label}
                            </span>
                          ) : (
                            <Link
                              key={`mobile-${item.label}-${child.label}`}
                              href={child.href ?? item.href}
                              onClick={handleMobileLinkClick}
                              className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-white/10"
                            >
                              {child.label}
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={handleMobileLinkClick}
                      className="block px-3 pb-3 text-sm text-white/80"
                    >
                      Visit {item.label}
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
          <div className="flex flex-col gap-3 py-6">
            <Link
              href="/signup"
              onClick={handleMobileLinkClick}
              className="flex h-10 items-center justify-center rounded-full bg-mwAqua text-base font-bold text-black transition-colors hover:bg-mwLime"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              onClick={handleMobileLinkClick}
              className="flex h-10 items-center justify-center rounded-full border-2 border-mwAqua text-base font-bold text-white transition-colors hover:border-mwLime hover:text-mwLime"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
