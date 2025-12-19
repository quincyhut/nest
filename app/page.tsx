import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity.client'
import { homepageQuery, navigationQuery } from '@/lib/sanity.queries'
import Header from './components/Header'
import Footer from './components/Footer'
import ClippedImage from './components/ClippedImage'
import BackgroundPatterns from './components/blocks/BackgroundPatterns'
import BlockRenderer from './components/blocks/BlockRenderer'

// Force dynamic rendering to get fresh content from Sanity
export const dynamic = 'force-dynamic'

// Generate metadata for homepage
export async function generateMetadata() {
  const page = await client.fetch(homepageQuery)

  if (!page) {
    return {
      title: 'NEST - ביטוח מזונות',
    }
  }

  return {
    title: page.seoTitle || 'NEST - ביטוח מזונות',
    description: page.seoDescription,
  }
}

export default async function HomePage() {
  const [page, navigation] = await Promise.all([
    client.fetch(homepageQuery),
    client.fetch(navigationQuery),
  ])

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

  return (
    <div className="flex min-h-screen flex-col font-sans mx-auto pt-3">
      <Header navigation={navigation} />

      <BackgroundPatterns patterns={page.backgroundPatterns} />

      <main className="w-full flex-1 pt-4 flex justify-center px-4 md:px-0">
        <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-8 max-w-[75rem] justify-end w-full">
          <div
            dir="rtl"
            className={`flex-1 inline justify-center items-center flex-col max-w-full ${
              heroBlock?.textContainerPadding || 'pt-6 md:pt-30'
            } ${heroBlock?.maxTextWidth || 'md:max-w-85'} text-center pb-6`}
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
      </main>

      <Footer />
    </div>
  )
}
