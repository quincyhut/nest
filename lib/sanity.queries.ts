import { groq } from 'next-sanity'

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    "logo": logo.asset->url,
    "footerLogo": footerLogo.asset->url,
    primaryColor,
    contactEmail,
    copyrightYear,
    footerTagline,
    footerSubtext
  }
`

// Navigation
export const navigationQuery = groq`
  *[_type == "navigation"][0] {
    menuItems[] {
      label,
      href,
      isHighlighted,
      order
    } | order(order asc),
    mobileContactTitle,
    mobileContactSubtext
  }
`

// Get all page slugs for static generation
export const allPageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current) && !isHomepage] {
    "slug": slug.current
  }
`

// Get homepage
export const homepageQuery = groq`
  *[_type == "page" && isHomepage == true][0] {
    _id,
    title,
    seoTitle,
    seoDescription,
    layout,
    backgroundPatterns[] {
      enabled,
      position,
      color,
      opacity
    },
    pageImage {
      "image": image.asset->url,
      imagePath,
      alt,
      clipType,
      clipLeft,
      hideOnMobile
    },
    contentBlocks[] {
      _type,
      _key,
      ...,
      "image": image.asset->url,
      cta {
        text,
        link,
        style
      }
    }
  }
`

// Get page by slug
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    seoTitle,
    seoDescription,
    layout,
    backgroundPatterns[] {
      enabled,
      position,
      color,
      opacity
    },
    pageImage {
      "image": image.asset->url,
      imagePath,
      alt,
      clipType,
      clipLeft,
      hideOnMobile
    },
    contentBlocks[] {
      _type,
      _key,
      ...,
      "image": image.asset->url,
      cta {
        text,
        link,
        style
      },
      rightColumn[] {
        sectionHeading,
        content
      },
      leftColumn[] {
        sectionHeading,
        content
      },
      items[] {
        ...,
        answer,
        "icon": icon.asset->url
      },
      steps[] {
        stepNumber,
        stepLabel,
        description
      }
    }
  }
`

// Get all pages (for migration/admin)
export const allPagesQuery = groq`
  *[_type == "page"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    isHomepage,
    seoTitle
  }
`
