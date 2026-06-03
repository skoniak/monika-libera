import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './env'
import { schemaTypes } from './schemas'

const SINGLETON_TYPES = ['siteSettings', 'contact']

export const config = defineConfig({
  projectId,
  dataset,
  title: 'Monika Libera',
  basePath: '/studio',
  apiVersion,

  // Hide singletons from the "New document" button — but keep templates intact
  // so S.document().documentId() can create them when they don't exist yet.
  document: {
    newDocumentOptions: (prev) =>
      prev.filter((template) => !SINGLETON_TYPES.includes(template.templateId)),
  },

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
                  .documentId('siteSettings')
                  .views([S.view.form()]),
              ),
            S.listItem()
              .title('Kontakt')
              .id('contact')
              .child(
                S.document()
                  .schemaType('contact')
                  .documentId('contact')
                  .views([S.view.form()]),
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
    // No template filter here — filtering was moved to document.newDocumentOptions.
    // Keeping templates lets S.document().documentId() create the document on first open.
  },
})
