"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/team", label: "חברי הנהלה" },
  { href: "/faq", label: "שאלות ותשובות" },
  { href: "/insurance", label: "פירוט ביטוחי" },
  { href: "/about", label: "אודות" },
  { href: "/", label: "בית" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full ml-36 border-b-[0.2px] border-[#b1b1b1] max-w-272">
      <nav className="flex justify-between pt-6 gap-16 pb-2 items-end">
        <Link
          href="/"
          prefetch={true}
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
        >
          <Image src="/logo.svg" alt="Logo" width={130} height={40} />
        </Link>
        <div className="flex gap-16 w-full pb-2 items-center">
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
    </header>
  );
}
