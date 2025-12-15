import { notFound } from 'next/navigation'
import { client, isSanityConfigured } from '@/lib/sanity.client'
import { pageBySlugQuery, allPageSlugsQuery } from '@/lib/sanity.queries'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ClippedImage from '../components/ClippedImage'
import BackgroundPatterns from '../components/blocks/BackgroundPatterns'
import BlockRenderer from '../components/blocks/BlockRenderer'

// Generate static paths for all pages
export async function generateStaticParams() {
  if (!isSanityConfigured) {
    return []
  }
  const pages = await client.fetch<{ slug: string }[]>(allPageSlugsQuery)
  return pages?.map((page) => ({ slug: page.slug })) || []
}

// Generate metadata for each page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await client.fetch(pageBySlugQuery, { slug })

  if (!page) {
    return {
      title: 'Page Not Found | NEST',
    }
  }

  return {
    title: page.seoTitle || `${page.title} | NEST`,
    description: page.seoDescription,
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const page = await client.fetch(pageBySlugQuery, { slug })

  if (!page) {
    notFound()
  }

  // Get page image (from pageImage field)
  const pageImage = page.pageImage
  const imageSrc = pageImage?.image || pageImage?.imagePath
  const imageAlt = pageImage?.alt || page.title
  const clipType = pageImage?.clipType || 'arch'
  const clipLeft = pageImage?.clipLeft || false
  const hideOnMobile = pageImage?.hideOnMobile || false

  // Find hero block for layout settings
  const heroBlock = page.contentBlocks?.find(
    (block: { _type: string }) => block._type === 'heroBlock'
  )

  // Check for privacy/legal layout
  const isPrivacyLayout = page.layout === 'privacy'
  const isTwoColumnLayout = page.layout === 'twoColumn'

  return (
    <div className="flex min-h-screen flex-col font-sans mx-auto pt-3">
      <Header />

      <BackgroundPatterns patterns={page.backgroundPatterns} />

      <main className="w-full flex-1 pt-4 flex justify-center px-4 md:px-0 relative overflow-x-clip">
        {isPrivacyLayout ? (
          // Privacy/Legal layout - full width content
          <div dir="rtl" className="max-w-4xl w-full text-right pb-12">
            <BlockRenderer blocks={page.contentBlocks} />
          </div>
        ) : isTwoColumnLayout ? (
          // Two column layout (like Partners page)
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 max-w-[60rem] justify-center w-full">
            <div
              dir="rtl"
              className="flex-1 flex flex-col items-center justify-center text-center md:text-right py-2 px-4 md:px-6 pb-6"
            >
              <BlockRenderer blocks={page.contentBlocks} />
            </div>
          </div>
        ) : (
          // Standard hero with image layout
          <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-8 max-w-[75rem] justify-end w-full">
            <div
              dir="rtl"
              className={`flex-1 inline justify-center items-center flex-col max-w-full ${
                heroBlock?.maxTextWidth || 'md:max-w-150'
              } text-center md:text-right pb-6`}
            >
              <BlockRenderer blocks={page.contentBlocks} />
            </div>

            {imageSrc && (
              <ClippedImage
                src={imageSrc}
                alt={imageAlt}
                clipType={clipType}
                clipLeft={clipLeft}
                className={`w-full max-w-72 md:max-w-none md:w-160 h-fit mx-auto md:mx-0 ${
                  hideOnMobile ? 'hidden md:block' : ''
                }`}
              />
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
