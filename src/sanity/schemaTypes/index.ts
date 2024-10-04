import { type SchemaTypeDefinition } from 'sanity'

import {contactType} from './contactType'
import {postType} from './postType'
import { homeType } from './homeType'

export const schema: { types: SchemaTypeDefinition[] } = { 
  types: [contactType, postType, homeType],
}
