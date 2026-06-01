import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './env'
import { schemaTypes } from './schemas'

const singletonTypes = new Set(['siteSettings', 'contact'])

export const config = defineConfig({
  projectId,
  dataset,
  title: 'Monika Libera',
  basePath: '/studio',
  apiVersion,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('collection').title('Kolekcje'),
            S.documentTypeListItem('page').title('Strony'),
            S.divider(),
            S.listItem()
              .title('Ustawienia strony')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings'),
              ),
            S.listItem()
              .title('Kontakt')
              .id('contact')
              .child(
                S.document()
                  .schemaType('contact')
                  .documentId('contact'),
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
})
