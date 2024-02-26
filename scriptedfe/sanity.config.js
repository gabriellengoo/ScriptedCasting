

import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {muxInput} from 'sanity-plugin-mux-input'


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
