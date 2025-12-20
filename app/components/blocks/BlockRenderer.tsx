'use client'

import Link from 'next/link'
import PortableText from '../PortableText'
import IconGrid from './IconGrid'
import ContactForm from './ContactForm'
import type { PortableTextBlock } from '@portabletext/types'

// Type definitions for blocks
interface CTAButton {
  _type: 'ctaButton'
  text?: string
  link?: string
  style?: 'primary' | 'secondary'
}

interface HeroBlock {
  _type: 'heroBlock'
  _key: string
  heading?: PortableTextBlock[]
  subheading?: PortableTextBlock[]
  image?: string
  imageAlt?: string
  imagePosition?: 'right' | 'left'
  hideImageOnMobile?: boolean
  textAlignment?: 'center' | 'right'
  maxTextWidth?: string
  cta?: CTAButton
}

interface TextSectionBlock {
  _type: 'textSectionBlock'
  _key: string
  heading?: string
  headingSize?: 'large' | 'medium' | 'small'
  content?: PortableTextBlock[]
  textSize?: 'base' | 'small' | 'xsmall'
}

interface FAQItem {
  question: string
  answer: PortableTextBlock[]
}

interface FAQBlock {
  _type: 'faqBlock'
  _key: string
  heading?: string
  items?: FAQItem[]
}

interface IconItem {
  iconType: 'illness' | 'accident' | 'death' | 'custom'
  customIcon?: string
  label: string
}

interface IconGridBlock {
  _type: 'iconGridBlock'
  _key: string
  items?: IconItem[]
}

interface ProcessStep {
  stepNumber: number
  stepLabel?: string
  description: string
}

interface ProcessStepsBlock {
  _type: 'processStepsBlock'
  _key: string
  heading?: string
  steps?: ProcessStep[]
}

interface FeatureItem {
  text: string
  hasIcon?: boolean
  icon?: string
}

interface FeatureListBlock {
  _type: 'featureListBlock'
  _key: string
  heading?: string
  items?: FeatureItem[]
  listStyle?: 'bullet' | 'none'
}

interface HighlightBoxBlock {
  _type: 'highlightBoxBlock'
  _key: string
  heading?: string
  content?: PortableTextBlock[]
  backgroundColor?: string
  headingColor?: string
}

interface ColumnSection {
  sectionHeading?: string
  content?: PortableTextBlock[]
}

interface TwoColumnBlock {
  _type: 'twoColumnBlock'
  _key: string
  heading?: string
  rightColumn?: ColumnSection[]
  leftColumn?: ColumnSection[]
  cta?: CTAButton
}

interface DisclaimerBlock {
  _type: 'disclaimerBlock'
  _key: string
  text?: string
}

interface PrivacySectionBlock {
  _type: 'privacySectionBlock'
  _key: string
  sectionNumber?: number
  heading?: string
  content?: PortableTextBlock[]
}

interface ContactFormBlock {
  _type: 'contactFormBlock'
  _key: string
  heading?: string
  introText?: PortableTextBlock[]
  successMessage?: string
  errorMessage?: string
}

type ContentBlock =
  | HeroBlock
  | TextSectionBlock
  | FAQBlock
  | IconGridBlock
  | ProcessStepsBlock
  | FeatureListBlock
  | HighlightBoxBlock
  | TwoColumnBlock
  | DisclaimerBlock
  | PrivacySectionBlock
  | ContactFormBlock
  | (CTAButton & { _key: string })

interface BlockRendererProps {
  blocks?: ContentBlock[]
}

function CTAButtonComponent({ button }: { button?: CTAButton }) {
  if (!button?.text || !button?.link) return null

  const isPrimary = button.style !== 'secondary'

  return (
    <Link
      href={button.link}
      className={`mt-6 inline-block px-10 py-1.5 text-base transition-colors ${
        isPrimary
          ? 'bg-[#508B58] text-white hover:bg-[#3d6b43]'
          : 'border border-[#508B58] text-[#508B58] hover:bg-[#508B58] hover:text-white'
      }`}
    >
      {button.text}
    </Link>
  )
}

function RenderHeroBlock({ block }: { block: HeroBlock }) {
  return (
    <>
      {block.heading && (
        <h1 className="text-2xl font-bold text-[#508b58]">
          <PortableText value={block.heading} inline />
        </h1>
      )}
      {block.subheading && (
        <p className="mt-4 text-base text-black">
          <PortableText value={block.subheading} inline />
        </p>
      )}
      <CTAButtonComponent button={block.cta} />
    </>
  )
}

function RenderTextSection({ block }: { block: TextSectionBlock }) {
  const headingSizeClass = {
    large: 'text-2xl',
    medium: 'text-base',
    small: 'text-sm',
  }[block.headingSize || 'medium']

  const textSizeClass = {
    base: 'text-base',
    small: 'text-xs',
    xsmall: 'text-[10px]',
  }[block.textSize || 'base']

  return (
    <div className="space-y-2">
      {block.heading && (
        <h2 className={`font-bold text-[#508b58] ${headingSizeClass}`}>
          {block.heading}
        </h2>
      )}
      {block.content && (
        <div className={`text-black ${textSizeClass}`}>
          <PortableText value={block.content} />
        </div>
      )}
    </div>
  )
}

function RenderFAQBlock({ block }: { block: FAQBlock }) {
  return (
    <div className="space-y-4">
      {block.heading && (
        <h1 className="text-2xl font-bold text-[#508b58] pb-4">{block.heading}</h1>
      )}
      <div className="text-base leading-relaxed text-black space-y-6">
        {block.items?.map((item, index) => (
          <div key={index}>
            <p className="font-bold mb-2">שאלה: {item.question}</p>
            <p className="text-gray-700 text-base">
              תשובה: <PortableText value={item.answer} inline />
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function RenderProcessSteps({ block }: { block: ProcessStepsBlock }) {
  return (
    <div className="space-y-2">
      {block.heading && (
        <h2 className="text-base font-bold text-[#508b58]">{block.heading}</h2>
      )}
      <div className="text-xs text-black">
        {block.steps?.map((step, index) => (
          <p key={index}>
            {step.stepNumber}. {step.stepLabel ? `${step.stepLabel}: ` : ''}{step.description}
            {index < (block.steps?.length || 0) - 1 && <br />}
          </p>
        ))}
      </div>
    </div>
  )
}

function RenderFeatureList({ block }: { block: FeatureListBlock }) {
  const ListComponent = block.listStyle === 'bullet' ? 'ul' : 'div'
  const listClass = block.listStyle === 'bullet' ? 'list-disc list-inside' : ''

  return (
    <div className="space-y-2">
      {block.heading && (
        <h2 className="text-base font-bold text-[#508b58]">{block.heading}</h2>
      )}
      <ListComponent className={`text-xs text-black space-y-1 ${listClass}`}>
        {block.items?.map((item, index) => (
          block.listStyle === 'bullet' ? (
            <li key={index}>{item.text}</li>
          ) : (
            <p key={index}>{item.text}</p>
          )
        ))}
      </ListComponent>
    </div>
  )
}

function RenderHighlightBox({ block }: { block: HighlightBoxBlock }) {
  return (
    <div
      className="rounded-md px-4 py-3 max-w-100 text-center"
      style={{ backgroundColor: block.backgroundColor || '#f4f5f2' }}
    >
      {block.heading && (
        <h3
          className="font-bold text-xs mb-1"
          style={{ color: block.headingColor || '#7fa687' }}
        >
          {block.heading}
        </h3>
      )}
      {block.content && (
        <div className="text-xs text-gray-700 leading-relaxed">
          <PortableText value={block.content} />
        </div>
      )}
    </div>
  )
}

function RenderTwoColumn({ block }: { block: TwoColumnBlock }) {
  return (
    <div className="space-y-4">
      {block.heading && (
        <h1 className="text-2xl font-bold text-[#508b58] mb-6 w-full">
          {block.heading}
        </h1>
      )}
      <div className="grid md:grid-cols-2 gap-8 sm:gap-24 w-full">
        {/* Right column */}
        <div className="space-y-4">
          {block.rightColumn?.map((section, index) => (
            <div key={index}>
              {section.sectionHeading && (
                <h2 className="text-base font-bold text-[#508b58] mb-1">
                  {section.sectionHeading}
                </h2>
              )}
              {section.content && (
                <div className="text-base text-black leading-tight">
                  <PortableText value={section.content} />
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Left column */}
        <div className="space-y-4">
          {block.leftColumn?.map((section, index) => (
            <div key={index}>
              {section.sectionHeading && (
                <h2 className="text-base font-bold text-[#508b58] mb-1">
                  {section.sectionHeading}
                </h2>
              )}
              {section.content && (
                <div className="text-base text-black leading-tight">
                  <PortableText value={section.content} />
                </div>
              )}
            </div>
          ))}
          <CTAButtonComponent button={block.cta} />
        </div>
      </div>
    </div>
  )
}

function RenderDisclaimer({ block }: { block: DisclaimerBlock }) {
  if (!block.text) return null

  return (
    <div
      dir="rtl"
      className="w-full max-w-5xl mx-auto px-4 md:px-6 py-4 text-[10px] text-gray-500 text-right"
    >
      {block.text}
    </div>
  )
}

function RenderPrivacySection({ block }: { block: PrivacySectionBlock }) {
  return (
    <section className="mb-8">
      {block.heading && (
        <h2 className="text-lg font-bold text-[#508b58] mb-3">
          {block.sectionNumber}. {block.heading}
        </h2>
      )}
      {block.content && (
        <div className="pr-2">
          <PortableText value={block.content} />
        </div>
      )}
    </section>
  )
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block) => {
        const key = block._key

        switch (block._type) {
          case 'heroBlock':
            return <RenderHeroBlock key={key} block={block} />
          case 'textSectionBlock':
            return <RenderTextSection key={key} block={block} />
          case 'faqBlock':
            return <RenderFAQBlock key={key} block={block} />
          case 'iconGridBlock':
            return <IconGrid key={key} items={block.items} />
          case 'processStepsBlock':
            return <RenderProcessSteps key={key} block={block} />
          case 'featureListBlock':
            return <RenderFeatureList key={key} block={block} />
          case 'highlightBoxBlock':
            return <RenderHighlightBox key={key} block={block} />
          case 'twoColumnBlock':
            return <RenderTwoColumn key={key} block={block} />
          case 'disclaimerBlock':
            return <RenderDisclaimer key={key} block={block} />
          case 'privacySectionBlock':
            return <RenderPrivacySection key={key} block={block} />
          case 'contactFormBlock':
            return <ContactForm key={key} block={block} />
          case 'ctaButton':
            return <CTAButtonComponent key={key} button={block} />
          default:
            return null
        }
      })}
    </>
  )
}
