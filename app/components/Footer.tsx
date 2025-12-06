import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full ">
      <div className="mx-auto max-w-5xl px-6 flex gap-20 mb-3">
        <div className="flex items-center">
          <Image
            src="/page-0/footer-1.svg"
            alt="Logo"
            width={100}
            height={40}
          />
        </div>
        <div className="flex items-center">
          <Link href="/parents" className="bg-[#508B58]/40 whitespace-nowrap text-black px-6 py-3 text-xs">
            מידע והצטרפות להורים
          </Link>
        </div>
        <div className="flex items-center">
          <Link href="/partners" className="bg-[#508B58]/40 text-xs whitespace-nowrap flex flex-col text-black px-6 py-1 ">
            <span> מסלול שותפים מקצועי</span>
            <span>משרדי עורכי דין ומגשרים </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
