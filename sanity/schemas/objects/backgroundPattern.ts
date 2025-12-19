import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'backgroundPattern',
  title: 'Background Pattern',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      options: {
        list: [
          { title: 'Top Left (Large)', value: 'topLeft' },
          { title: 'Top Right (Small)', value: 'topRight' },
          { title: 'Bottom Right', value: 'bottomRight' },
        ],
      },
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          { title: 'Light Grey-Green (#EDF2EC)', value: '#EDF2EC' },
          { title: 'Green 33% opacity (#508B58)', value: '#508B58' },
        ],
      },
      initialValue: '#EDF2EC',
      description: 'Light Grey-Green is solid. Green appears lighter due to 33% opacity.',
    }),
    defineField({
      name: 'opacity',
      title: 'Opacity (%)',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 100,
      description: 'Visibility: 100 = fully visible, 0 = invisible. Green circles typically use 33%.',
    }),
  ],
  preview: {
    select: {
      position: 'position',
      enabled: 'enabled',
    },
    prepare({ position, enabled }) {
      return {
        title: `Pattern: ${position || 'Unknown'}`,
        subtitle: enabled ? 'Enabled' : 'Disabled',
      }
    },
  },
})
