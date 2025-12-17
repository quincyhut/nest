import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "צרו קשר | NEST",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
