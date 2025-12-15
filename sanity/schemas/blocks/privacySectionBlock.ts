import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'privacySectionBlock',
  title: 'Privacy/Legal Section',
  type: 'object',
  description: 'For legal pages with numbered sections and detailed content',
  fields: [
    defineField({
      name: 'sectionNumber',
      title: 'Section Number',
      type: 'number',
    }),
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'NEST Brand', value: 'nestBrand' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'string', title: 'URL' },
                  { name: 'isExternal', type: 'boolean', title: 'Open in new tab', initialValue: true },
                ],
              },
            ],
          },
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'None (indented)', value: 'none' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      number: 'sectionNumber',
      title: 'heading',
    },
    prepare({ number, title }) {
      return {
        title: `${number}. ${title || 'Section'}`,
        subtitle: 'Privacy Section',
      }
    },
  },
})
