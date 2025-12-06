import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
    <header className="w-full ml-36 border-b-[0.2px] border-[#b1b1b1] max-w-272">
      <nav className="flex justify-between pt-6 gap-16  pb-2 items-end">
        <Link
          href="/"
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
        >
          <Image src="/logo.svg" alt="Logo" width={130} height={40} />
        </Link>
        <div className="flex gap-16 w-full pb-2">
          <a href="/contact" className=" hover:text-zinc-900 text-black">
            צור קשר
          </a>
          <a href="/team" className=" hover:text-zinc-900 text-black">
            חברי הנהלה
          </a>
          <a href="/faq" className=" hover:text-zinc-900 text-black">
            שאלות ותשובות
          </a>
          <a href="/insurance" className=" hover:text-zinc-900 text-black">
            פירוט ביטוחי
          </a>
          <a href="/about" className=" hover:text-zinc-900 text-black">
            אודות
          </a>
          <Link href="/" className=" hover:text-zinc-900 text-black">
            בית
          </Link>
        </div>
      </nav>
    </header>
  );
}
