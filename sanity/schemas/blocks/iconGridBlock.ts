import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'iconGridBlock',
  title: 'Icon Grid',
  type: 'object',
  description: 'Grid of icons with labels (like coverage icons on insurance page)',
  fields: [
    defineField({
      name: 'items',
      title: 'Icon Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'iconType',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Illness (מחלה קשה)', value: 'illness' },
                  { title: 'Accident (תאונה)', value: 'accident' },
                  { title: 'Death (פטירה)', value: 'death' },
                  { title: 'Custom SVG', value: 'custom' },
                ],
              },
            }),
            defineField({
              name: 'customIcon',
              title: 'Custom Icon (SVG code)',
              type: 'text',
              hidden: ({ parent }) => parent?.iconType !== 'custom',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              iconType: 'iconType',
            },
            prepare({ title, iconType }) {
              return {
                title: title || 'Icon',
                subtitle: iconType,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({ items }) {
      return {
        title: 'Icon Grid',
        subtitle: `${items?.length || 0} icons`,
      }
    },
  },
})
