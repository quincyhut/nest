"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/team", label: "חברי הנהלה" },
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

  return (
    <header
      className={`w-full ml-0 md:ml-36 border-b-[0.2px] border-[#b1b1b1] max-w-none md:max-w-272 px-4 md:px-0 sticky top-0 z-50 md:static md:z-auto transition-colors ${isScrolled ? "bg-white" : "bg-transparent"} md:bg-transparent`}
    >
      <nav className="flex justify-between pt-4 md:pt-6 gap-4 md:gap-16 pb-2 items-center md:items-end">
        <Link
          href="/"
          prefetch={true}
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
        >
          <Image src="/logo.svg" alt="Logo" width={130} height={40} className="w-[100px] md:w-[130px]" />
        </Link>

        {/* Mobile hamburger - hidden on desktop */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop nav - hidden on mobile */}
        <div className="hidden md:flex gap-16 w-full pb-2 items-center">
          <Link
            href="/contact"
            prefetch={true}
            className="bg-[#508B58] text-white px-6 py-2 text-sm whitespace-nowrap"
          >
            צור קשר
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
        </div>
      </nav>

      {/* Mobile nav dropdown - hidden on desktop */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 py-4 border-t border-[#b1b1b1]">
          <Link
            href="/contact"
            prefetch={true}
            onClick={() => setIsMenuOpen(false)}
            className="bg-[#508B58] text-white px-6 py-3 text-sm text-center"
          >
            צור קשר
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              onClick={() => setIsMenuOpen(false)}
              className={`py-2 text-center ${
                pathname === item.href
                  ? "text-[#508b58]"
                  : "text-black"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
