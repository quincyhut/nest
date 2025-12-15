'use client'

import { PortableText as PortableTextComponent, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

interface PortableTextProps {
  value: PortableTextBlock[]
  className?: string
}

const components: PortableTextComponents = {
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    nestBrand: ({ children }) => (
      <span className="font-brand">{children}</span>
    ),
  },
  block: {
    normal: ({ children }) => <p className="mb-2">{children}</p>,
    bold: ({ children }) => <p className="mb-2 font-bold">{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-0.5">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
}

export default function PortableText({ value, className }: PortableTextProps) {
  if (!value) return null

  return (
    <div className={className}>
      <PortableTextComponent value={value} components={components} />
    </div>
  )
}
