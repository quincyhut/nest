'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

interface MenuItem {
  label: string
  href: string
  isHighlighted?: boolean
  order?: number
}

interface NavigationData {
  menuItems?: MenuItem[]
  mobileContactTitle?: string
  mobileContactSubtext?: string
}

interface HeaderProps {
  navigation?: NavigationData
}

export default function Header({ navigation }: HeaderProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Filter out incomplete menu items (must have both label and href) and sort by order
  const menuItems = (navigation?.menuItems || [])
    .filter((item) => item.label && item.href)
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  // Separate highlighted (partners) item from regular items
  const highlightedItem = menuItems.find((item) => item.isHighlighted && item.label && item.href)
  const regularItems = menuItems.filter((item) => !item.isHighlighted)

  // For desktop: reverse order (RTL display)
  const desktopRegularItems = [...regularItems].reverse()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      <header
        className={`w-full mx-auto max-w-6xl px-4 md:px-6 sticky top-0 z-50 md:static md:z-auto transition-colors ${
          isScrolled ? 'bg-white' : 'bg-transparent'
        } md:bg-transparent`}
      >
        <nav className="flex border-b-[0.2px] border-[#b1b1b1] justify-between pt-1 md:pt-2 gap-4 md:gap-10 pb-1 md:pb-2 items-center md:items-end">
          <Link
            href="/"
            prefetch={true}
            className="text-lg min-w-32 font-semibold text-zinc-900 dark:text-zinc-100 mb-1 md:mb-2"
          >
            <Image
              src="/logo.svg"
              alt="Logo"
              width={130}
              height={40}
              className="w-[90px] md:w-[130px]"
            />
          </Link>

          {/* Mobile hamburger - hidden on desktop */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1"
            aria-label="פתח תפריט"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop nav - hidden on mobile */}
          <div className="hidden md:flex gap-10 w-full pb-2 md:justify-around items-center">
            {desktopRegularItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={`whitespace-nowrap text-base ${
                  pathname === item.href ? 'text-[#508b58]' : 'text-black hover:text-zinc-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {highlightedItem && (
              <Link
                href={highlightedItem.href}
                prefetch={true}
                className="bg-[#508B58]/40 px-6 py-1 text-center text-sm whitespace-nowrap text-black"
              >
                {highlightedItem.label}
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile slide-out menu - covers right half of screen */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="md:hidden fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu panel */}
          <div className="md:hidden fixed top-0 right-0 w-1/2 h-full bg-white z-50 shadow-lg flex flex-col">
            {/* Close button */}
            <div className="flex justify-start p-4">
              <button onClick={() => setIsMenuOpen(false)} className="p-1" aria-label="סגור תפריט">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu items */}
            <div dir="rtl" className="flex flex-col gap-4 px-6 py-4 flex-1">
              {/* Highlighted item first on mobile */}
              {highlightedItem && (
                <Link
                  href={highlightedItem.href}
                  prefetch={true}
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-[#508B58]/40 px-4 py-2 text-xs text-right text-black"
                >
                  {highlightedItem.label}
                </Link>
              )}

              {/* Regular items */}
              {regularItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-2 text-right text-base ${
                    pathname === item.href ? 'text-[#508b58]' : 'text-black'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Contact section at bottom */}
            <div dir="rtl" className="px-6 py-4 border-t border-gray-200">
              <p className="text-base font-bold text-black">
                {navigation?.mobileContactTitle || 'רוצים לדבר איתנו?'}
              </p>
              <p className="text-xs text-black mt-1">
                צוות <span lang="en" className="font-brand font-bold text-black">NEST</span>{' '}
                {navigation?.mobileContactSubtext?.replace('צוות NEST ', '') ||
                  'זמין לשאלות, לייעוץ ולהצטרפות.'}
              </p>
              <a href="mailto:info@nestinsure.co.il" className="text-xs text-[#508b58] underline">
                info@nestinsure.co.il
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}
