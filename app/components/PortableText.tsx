'use client'

import { PortableText as PortableTextComponent, PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import React from 'react'

interface PortableTextProps {
  value: PortableTextBlock[]
  className?: string
  inline?: boolean
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

// Inline components - render without wrapping paragraphs, use <br /> between blocks
const inlineComponents: PortableTextComponents = {
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    nestBrand: ({ children }) => (
      <span className="font-brand">{children}</span>
    ),
  },
  block: {
    normal: ({ children }) => <>{children}</>,
    bold: ({ children }) => <span className="font-bold">{children}</span>,
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

export default function PortableText({ value, className, inline }: PortableTextProps) {
  if (!value) return null

  if (inline) {
    // For inline mode, render blocks with <br /> between them
    return (
      <>
        {value.map((block, index) => (
          <React.Fragment key={block._key || index}>
            <PortableTextComponent value={[block]} components={inlineComponents} />
            {index < value.length - 1 && <br />}
          </React.Fragment>
        ))}
      </>
    )
  }

  return (
    <div className={className}>
      <PortableTextComponent value={value} components={components} />
    </div>
  )
}
