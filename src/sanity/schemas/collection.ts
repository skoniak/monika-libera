import { defineArrayMember, defineField, defineType } from 'sanity'

export const collection = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({
      name: 'title_pl',
      title: 'Tytuł (PL)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title_en',
      title: 'Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'description_pl',
      title: 'Opis (PL)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description_en',
      title: 'Description (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title_pl', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower number = displayed first',
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({ name: 'title_pl', title: 'Tytuł (PL)', type: 'string' }),
            defineField({ name: 'title_en', title: 'Title (EN)', type: 'string' }),
            defineField({ name: 'description_pl', title: 'Opis (PL)', type: 'text', rows: 2 }),
            defineField({ name: 'description_en', title: 'Description (EN)', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'title_pl', media: 'image' },
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title_pl', media: 'coverImage' },
  },
})
