import type { PortableTextBlock } from '@portabletext/types'

export interface SiteSettings {
  siteName: string
  logo: string | null
  footerLogo: string | null
  primaryColor: string
  contactEmail: string
  copyrightYear: string
  footerTagline: string
  footerSubtext: string
}

export interface MenuItem {
  label: string
  href: string
  isHighlighted: boolean
  order: number
}

export interface Navigation {
  menuItems: MenuItem[]
  mobileContactTitle: string
  mobileContactSubtext: string
}

export interface HomePage {
  title: string
  heroHeading: string
  heroSubheading: string
  heroImage: string | null
  ctaButtonText: string
  ctaButtonLink: string
  secondaryCtaText: string | null
  secondaryCtaLink: string | null
}

export interface AboutPage {
  title: string
  heading: string
  content: PortableTextBlock[]
  image: string | null
  imageAlt: string
}

export interface CoverageItem {
  icon: string | null
  label: string
}

export interface ContentSection {
  heading: string
  content: string
}

export interface ProcessStep {
  stepNumber: number
  stepText: string
}

export interface InsurancePage {
  title: string
  heading: string
  introText: string
  coverageItems: CoverageItem[]
  sections: ContentSection[]
  processTitle: string
  processSteps: ProcessStep[]
  disclaimer: string
  image: string | null
  imageAlt: string
}

export interface FaqItem {
  question: string
  answer: PortableTextBlock[]
}

export interface FaqPage {
  title: string
  heading: string
  faqItems: FaqItem[]
  image: string | null
  imageAlt: string
}

export interface Feature {
  icon: string | null
  title: string
  description: string
}

export interface HighlightBox {
  heading: string
  content: string
}

export interface ParentsPage {
  title: string
  heading: string
  introText: string
  features: Feature[]
  highlightBox: HighlightBox
  ctaButtonText: string
  ctaButtonLink: string
  image: string | null
  imageAlt: string
}

export interface PartnerSection {
  heading: string
  content: PortableTextBlock[]
  isList: boolean
  column: 'right' | 'left'
}

export interface PartnersPage {
  title: string
  heading: string
  sections: PartnerSection[]
  ctaButtonText: string
  ctaButtonLink: string
}

export interface PrivacySection {
  heading: string
  content: PortableTextBlock[]
}

export interface PrivacyPage {
  title: string
  heading: string
  lastUpdated: string
  sections: PrivacySection[]
}

export interface FormLabels {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
  submit: string
}

export interface SubjectOption {
  value: string
  label: string
}

export interface ContactPage {
  title: string
  heading: string
  introText: string
  formLabels: FormLabels
  subjectOptions: SubjectOption[]
  successMessage: string
  image: string | null
  imageAlt: string
}
