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
          { title: 'Light Green (#EDF2EC)', value: '#EDF2EC' },
          { title: 'Primary Green (#508B58)', value: '#508B58' },
        ],
      },
      initialValue: '#EDF2EC',
    }),
    defineField({
      name: 'opacity',
      title: 'Opacity (0-1)',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(1),
      initialValue: 1,
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
