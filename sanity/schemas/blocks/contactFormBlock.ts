import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactFormBlock',
  title: 'Contact Form',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'צרו קשר',
    }),
    defineField({
      name: 'introText',
      title: 'Introduction Text',
      type: 'richText',
    }),
    defineField({
      name: 'formFields',
      title: 'Form Field Labels',
      type: 'object',
      fields: [
        defineField({ name: 'fullName', title: 'Full Name Label', type: 'string', initialValue: 'שם מלא' }),
        defineField({ name: 'email', title: 'Email Label', type: 'string', initialValue: 'דוא"ל' }),
        defineField({ name: 'phone', title: 'Phone Label', type: 'string', initialValue: 'טלפון' }),
        defineField({ name: 'userType', title: 'User Type Label', type: 'string', initialValue: 'בחרו' }),
        defineField({ name: 'officeName', title: 'Office Name Label', type: 'string', initialValue: 'שם המשרד' }),
        defineField({ name: 'mainField', title: 'Main Field Label', type: 'string', initialValue: 'תחום עיסוק עיקרי' }),
        defineField({ name: 'mainArea', title: 'Main Area Label', type: 'string', initialValue: 'אזור פעילות עיקרי' }),
        defineField({ name: 'message', title: 'Message Label', type: 'string', initialValue: 'הודעה' }),
        defineField({ name: 'submit', title: 'Submit Button Text', type: 'string', initialValue: 'אישור ושליחה' }),
      ],
    }),
    defineField({
      name: 'mainFieldOptions',
      title: 'Main Field Options (for lawyers/mediators)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: {
            select: { title: 'label' },
          },
        },
      ],
    }),
    defineField({
      name: 'mainAreaOptions',
      title: 'Main Area Options (for lawyers/mediators)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: {
            select: { title: 'label' },
          },
        },
      ],
    }),
    defineField({
      name: 'userTypeOptions',
      title: 'User Type Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: {
            select: { title: 'label' },
          },
        },
      ],
    }),
    defineField({
      name: 'consentText',
      title: 'Consent Checkbox Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error Message',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Side Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Form',
        subtitle: 'Contact Form Block',
      }
    },
  },
})
