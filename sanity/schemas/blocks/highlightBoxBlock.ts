import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'highlightBoxBlock',
  title: 'Highlight Box',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richText',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Light Gray (#f4f5f2)', value: '#f4f5f2' },
          { title: 'Light Green (#EDF2EC)', value: '#EDF2EC' },
          { title: 'White', value: '#ffffff' },
        ],
      },
      initialValue: '#f4f5f2',
    }),
    defineField({
      name: 'headingColor',
      title: 'Heading Color',
      type: 'string',
      options: {
        list: [
          { title: 'Muted Green (#7fa687)', value: '#7fa687' },
          { title: 'Primary Green (#508b58)', value: '#508b58' },
          { title: 'Black', value: '#000000' },
        ],
      },
      initialValue: '#7fa687',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Highlight Box',
        subtitle: 'Highlight Box Block',
      }
    },
  },
})
