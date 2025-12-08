import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "ביטוח מזונות | NEST",
  description: "ביטוח מזונות. הורות ממשיכה גם אחרי פרידה.",
  metadataBase: new URL("https://nestinsure.co.il"),
  openGraph: {
    title: "ביטוח מזונות | NEST",
    description: "ביטוח מזונות. הורות ממשיכה גם אחרי פרידה.",
    url: "https://nestinsure.co.il",
    siteName: "NEST",
    images: [
      {
        url: "/page-0/boy.png",
        width: 1200,
        height: 630,
        alt: "ביטוח מזונות | NEST",
      },
    ],
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ביטוח מזונות | NEST",
    description: "ביטוח מזונות. הורות ממשיכה גם אחרי פרידה.",
    images: ["/page-0/boy.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${inter.variable} antialiased [direction:ltr]`}
        dir="rtl"
      >
        {children}
      </body>
    </html>
  );
}
