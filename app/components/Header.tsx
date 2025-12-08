"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/faq", label: "שאלות ותשובות" },
  { href: "/insurance", label: "פירוט ביטוחי" },
  { href: "/about", label: "אודות" },
  { href: "/", label: "בית" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`w-full ml-0 md:ml-36 border-b-[0.2px] border-[#b1b1b1] max-w-none md:max-w-272 px-4 md:px-0 sticky top-0 z-50 md:static md:z-auto transition-colors ${isScrolled ? "bg-white" : "bg-transparent"} md:bg-transparent`}
      >
        <nav className="flex justify-between pt-1 md:pt-6 gap-4 md:gap-16 pb-1 md:pb-2 items-center md:items-end">
          <Link
            href="/"
            prefetch={true}
            className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 -my-2"
          >
            <Image src="/logo.svg" alt="Logo" width={130} height={40} className="w-[90px] md:w-[130px]" />
          </Link>

          {/* Mobile hamburger - hidden on desktop */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop nav - hidden on mobile */}
          <div className="hidden md:flex gap-10 w-full pb-2 items-center">
            <Link
              href="/contact"
              prefetch={true}
              className="text-sm text-black hover:text-zinc-900 whitespace-nowrap"
            >
              צרו קשר
            </Link>
            <Link
              href="/parents"
              prefetch={true}
              className="text-sm text-black hover:text-zinc-900 whitespace-nowrap"
            >
              מידע והצטרפות להורים
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={
                  pathname === item.href
                    ? "text-[#508b58]"
                    : "text-black hover:text-zinc-900"
                }
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/partners"
              prefetch={true}
              className="bg-[#508B58]/40 px-4 py-2 text-xs text-center leading-tight whitespace-nowrap text-black"
            >
              <span className="block">מסלול שותפים מקצועי</span>
              <span className="block">משרדי עורכי דין ומגשרים</span>
            </Link>
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
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu items */}
            <div dir="rtl" className="flex flex-col gap-4 px-6 py-4 flex-1">
              <Link
                href="/partners"
                prefetch={true}
                onClick={() => setIsMenuOpen(false)}
                className="bg-[#508B58]/40 px-4 py-2 text-xs text-right leading-tight text-black"
              >
                <span className="block">מסלול שותפים מקצועי</span>
                <span className="block">משרדי עורכי דין ומגשרים</span>
              </Link>

              <Link
                href="/"
                prefetch={true}
                onClick={() => setIsMenuOpen(false)}
                className={`py-2 text-right text-sm ${
                  pathname === "/"
                    ? "text-[#508b58]"
                    : "text-black"
                }`}
              >
                בית
              </Link>

              <Link
                href="/about"
                prefetch={true}
                onClick={() => setIsMenuOpen(false)}
                className={`py-2 text-right text-sm ${
                  pathname === "/about"
                    ? "text-[#508b58]"
                    : "text-black"
                }`}
              >
                אודות
              </Link>

              <Link
                href="/insurance"
                prefetch={true}
                onClick={() => setIsMenuOpen(false)}
                className={`py-2 text-right text-sm ${
                  pathname === "/insurance"
                    ? "text-[#508b58]"
                    : "text-black"
                }`}
              >
                פירוט ביטוחי
              </Link>

              <Link
                href="/faq"
                prefetch={true}
                onClick={() => setIsMenuOpen(false)}
                className={`py-2 text-right text-sm ${
                  pathname === "/faq"
                    ? "text-[#508b58]"
                    : "text-black"
                }`}
              >
                שאלות ותשובות
              </Link>

              <Link
                href="/parents"
                prefetch={true}
                onClick={() => setIsMenuOpen(false)}
                className={`py-2 text-right text-sm ${
                  pathname === "/parents"
                    ? "text-[#508b58]"
                    : "text-black"
                }`}
              >
                מידע והצטרפות להורים
              </Link>

              <Link
                href="/contact"
                prefetch={true}
                onClick={() => setIsMenuOpen(false)}
                className={`py-2 text-right text-sm ${
                  pathname === "/contact"
                    ? "text-[#508b58]"
                    : "text-black"
                }`}
              >
                צרו קשר
              </Link>
            </div>

            {/* Contact section at bottom */}
            <div dir="rtl" className="px-6 py-4 border-t border-gray-200">
              <p className="text-sm font-bold text-black">רוצים לדבר איתנו?</p>
              <p className="text-xs text-black mt-1">
                צוות <span className="font-bold text-[#508b58]">NEST</span> זמין לשאלות, לייעוץ ולהצטרפות.
              </p>
              <a href="mailto:info@nestinsure.co.il" className="text-xs text-[#508b58] underline">
                info@nestinsure.co.il
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
