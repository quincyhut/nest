export const metadata = {
  title: 'NEST Content Studio',
  description: 'Content management for NEST website',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
