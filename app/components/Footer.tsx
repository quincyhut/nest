import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="mx-auto max-w-5xl px-4 md:px-6 flex items-center justify-between mb-3 py-4 md:py-0">
        <div className="flex items-center">
          <Image
            src="/page-0/footer-1.svg"
            alt="Logo"
            width={100}
            height={40}
          />
        </div>
        <div dir="rtl" className="text-right">
          <p className="text-base font-bold text-black">רוצים לדבר איתנו?</p>
          <p className="text-xs text-black">
            צוות <span className="font-brand font-bold text-black">NEST</span> זמין לשאלות, לייעוץ ולהצטרפות.
          </p>
          <a href="mailto:info@nestinsure.co.il" className="text-xs text-[#508b58]">
            info@nestinsure.co.il
          </a>
        </div>
      </div>
    </footer>
  );
}
