import { defineField, defineType } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title_pl', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content_pl',
      title: 'Treść (PL)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'content_en',
      title: 'Content (EN)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: { title: 'title_pl', subtitle: 'slug.current' },
  },
})
