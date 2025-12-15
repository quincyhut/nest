import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'processStepsBlock',
  title: 'Process Steps',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'stepNumber',
              title: 'Step Number',
              type: 'number',
            }),
            defineField({
              name: 'stepLabel',
              title: 'Step Label (e.g., "שלב ראשון")',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: {
              number: 'stepNumber',
              description: 'description',
            },
            prepare({ number, description }) {
              return {
                title: `Step ${number}`,
                subtitle: description,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      steps: 'steps',
    },
    prepare({ title, steps }) {
      return {
        title: title || 'Process Steps',
        subtitle: `${steps?.length || 0} steps`,
      }
    },
  },
})
