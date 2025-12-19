import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'disclaimerBlock',
  title: 'Disclaimer',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Disclaimer Text',
      type: 'text',
      rows: 6,
    }),
  ],
  preview: {
    select: {
      text: 'text',
    },
    prepare({ text }) {
      return {
        title: 'Disclaimer',
        subtitle: text?.substring(0, 50) + '...',
      }
    },
  },
})
