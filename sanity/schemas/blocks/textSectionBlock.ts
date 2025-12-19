import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'textSectionBlock',
  title: 'Text Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'headingSize',
      title: 'Heading Size',
      type: 'string',
      options: {
        list: [
          { title: 'Large (text-2xl)', value: 'large' },
          { title: 'Medium (text-base)', value: 'medium' },
          { title: 'Small (text-sm)', value: 'small' },
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richText',
    }),
    defineField({
      name: 'textSize',
      title: 'Text Size',
      type: 'string',
      options: {
        list: [
          { title: 'Base (text-base)', value: 'base' },
          { title: 'Small (text-xs)', value: 'small' },
          { title: 'Extra Small (text-[10px])', value: 'xsmall' },
        ],
      },
      initialValue: 'base',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Text Section',
        subtitle: 'Text Section Block',
      }
    },
  },
})
