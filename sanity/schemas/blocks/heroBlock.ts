import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroBlock',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'richText',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading / Body Text',
      type: 'richText',
    }),
    defineField({
      name: 'image',
      title: 'Image (Sanity Asset)',
      type: 'image',
      description: 'Upload an image to Sanity. Takes priority over imagePath.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imagePath',
      title: 'Image Path (Local)',
      type: 'string',
      description: 'Path to local image in /public folder (e.g., /page-0/boy.png). Used if no Sanity image is uploaded.',
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Right (Image first on desktop)', value: 'right' },
          { title: 'Left (Text first on desktop)', value: 'left' },
        ],
      },
      initialValue: 'right',
    }),
    defineField({
      name: 'hideImageOnMobile',
      title: 'Hide Image on Mobile',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'clipType',
      title: 'Image Clip Type',
      type: 'string',
      description: 'Shape used to clip the image',
      options: {
        list: [
          { title: 'Arch (default)', value: 'arch' },
          { title: 'Circle', value: 'circle' },
        ],
      },
      initialValue: 'arch',
    }),
    defineField({
      name: 'clipLeft',
      title: 'Clip Left Half Only',
      type: 'boolean',
      description: 'Show only the left half of the clipped shape (used for edge-aligned images)',
      initialValue: false,
    }),
    defineField({
      name: 'textAlignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Center', value: 'center' },
          { title: 'Right (RTL default)', value: 'right' },
        ],
      },
      initialValue: 'right',
    }),
    defineField({
      name: 'maxTextWidth',
      title: 'Max Text Width (Tailwind class)',
      type: 'string',
      description: 'e.g., md:max-w-85, md:max-w-120, md:max-w-150',
      initialValue: 'md:max-w-85',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action Button',
      type: 'ctaButton',
    }),
  ],
  preview: {
    select: {
      media: 'image',
    },
    prepare({ media }) {
      return {
        title: 'Hero Section',
        media,
      }
    },
  },
})
