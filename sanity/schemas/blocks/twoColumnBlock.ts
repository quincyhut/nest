import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'twoColumnBlock',
  title: 'Two Column Layout',
  type: 'object',
  description: 'Used for pages like Partners with two columns of content',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'rightColumn',
      title: 'Right Column (First in RTL)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'columnSection',
          fields: [
            defineField({
              name: 'sectionHeading',
              title: 'Section Heading',
              type: 'string',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'richText',
            }),
          ],
          preview: {
            select: {
              title: 'sectionHeading',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'leftColumn',
      title: 'Left Column (Second in RTL)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'columnSection',
          fields: [
            defineField({
              name: 'sectionHeading',
              title: 'Section Heading',
              type: 'string',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'richText',
            }),
          ],
          preview: {
            select: {
              title: 'sectionHeading',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action Button',
      type: 'ctaButton',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Two Column Layout',
        subtitle: 'Two Column Block',
      }
    },
  },
})
