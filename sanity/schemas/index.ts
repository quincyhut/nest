// Documents
import page from './documents/page'
import siteSettings from './siteSettings'
import navigation from './navigation'

// Objects
import backgroundPattern from './objects/backgroundPattern'
import richText from './objects/richText'
import ctaButton from './objects/ctaButton'

// Blocks
import heroBlock from './blocks/heroBlock'
import textSectionBlock from './blocks/textSectionBlock'
import faqBlock from './blocks/faqBlock'
import iconGridBlock from './blocks/iconGridBlock'
import processStepsBlock from './blocks/processStepsBlock'
import featureListBlock from './blocks/featureListBlock'
import highlightBoxBlock from './blocks/highlightBoxBlock'
import twoColumnBlock from './blocks/twoColumnBlock'
import disclaimerBlock from './blocks/disclaimerBlock'
import privacySectionBlock from './blocks/privacySectionBlock'
import contactFormBlock from './blocks/contactFormBlock'

export const schemaTypes = [
  // Documents
  page,
  siteSettings,
  navigation,

  // Objects (reusable)
  backgroundPattern,
  richText,
  ctaButton,

  // Blocks (content modules)
  heroBlock,
  textSectionBlock,
  faqBlock,
  iconGridBlock,
  processStepsBlock,
  featureListBlock,
  highlightBoxBlock,
  twoColumnBlock,
  disclaimerBlock,
  privacySectionBlock,
  contactFormBlock,
]
