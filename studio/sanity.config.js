// import {defineConfig} from 'sanity'
// import {structureTool} from 'sanity/structure'
// import {visionTool} from '@sanity/vision'
// import {schemaTypes} from './schemaTypes'

// export default defineConfig({
//   name: 'default',
//   title: 'Sanity Project',

//   projectId: '03lhip23',
//   dataset: 'production',

//   plugins: [structureTool(), visionTool()],

//   schema: {
//     types: schemaTypes,
//   },
// })

import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
// import Iframe from 'sanity-plugin-iframe-pane';
import { deskStructure } from './deskStructure';
import { muxInput } from 'sanity-plugin-mux-input';

import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// function getPreviewUrl(doc) {
//   const protocol = 'https://'; 
//   const host = 'www.alwaproduction.co.uk'; 
//   const path = doc?.slug?.current ? `/project/${doc.slug.current}` : '';

//   return doc?.slug?.current
//       ? `${protocol}${host}${path}?preview=true`
//       : `${protocol}${host}?preview=true`;
// }

// const defaultDocumentNode = (S, { schemaType }) => {
//   switch (schemaType) {
//     case 'home':
//       return S.document().views([
//         S.view.form(),
//         S.view
//           .component(Iframe)
//           .options({
//             url: (doc) => getPreviewUrl(doc),
//           })
//           .title('Preview'),
//       ]);
//       case 'project':
//         return S.document().views([
//           S.view.form(),
//           S.view
//             .component(Iframe)
//             .options({
//               url: (doc) => getPreviewUrl(doc),
//             })
//             .title('Preview'),
//         ]);
//     default:
//       return S.document().views([S.view.form()]);
//   }
// };

export default defineConfig({
  name: 'default',
  title: 'Scripted',
  projectId: '03lhip23',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), muxInput(),],
  schema: {
    types: schemaTypes,
  },

  api: {
    // Other API configurations

    // Add the webhook configuration here
    webhook: {
      path: './webhook', // Adjust the path based on your project structure
      methods: ['post'],
    },
  },
});
