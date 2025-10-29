import { useEffect } from 'react'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useThemeStore } from '../store/themeStore'
import ErrorBoundary from '../components/ErrorBoundary'

export default function HomePage() {
  const { isDark, setDark } = useThemeStore()

  useEffect(() => {
    document.body.classList.add('app-loaded')
    document.body.classList.remove('app-loading')

    const storedTheme = localStorage.getItem('theme-storage')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    let shouldBeDark = systemPrefersDark

    try {
      if (storedTheme) {
        const parsed = JSON.parse(storedTheme)
        shouldBeDark = parsed.state?.isDark ?? systemPrefersDark
      }
    } catch (e) {
      console.error('Error parsing stored theme:', e)
    }

    setDark(shouldBeDark)
    document.documentElement.classList.toggle('dark', shouldBeDark)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!storedTheme) {
        setDark(e.matches)
        document.documentElement.classList.toggle('dark', e.matches)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [setDark])

  return (
    <>
      <Head>
        <title>Connect with Trusted Military-Friendly Real Estate Professionals | MSAREN</title>
        <meta
          name="description"
          content="MSAREN connects academy graduates with top realtors, VA lenders, investors, property managers, and trusted real estate experts."
        />
      </Head>

      <div className={`min-h-screen transition-colors ${isDark ? 'dark bg-dark-300 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
        <ErrorBoundary>
          <Navbar />
          <main className="pt-16">
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: isDark ? '#1f1f1f' : '#fff',
                  color: isDark ? '#fff' : '#000',
                },
              }}
            />
            {/* Your home page content goes here */}
            <h1 className="text-3xl font-bold text-center mt-10">Welcome to MSAREN</h1>
            <p className="text-center mt-4 text-lg">Find military-friendly real estate professionals near you.</p>
          </main>
          <Footer />
        </ErrorBoundary>
      </div>
    </>
  )
}
