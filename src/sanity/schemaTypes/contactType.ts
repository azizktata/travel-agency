import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const contactType = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'telephone',
      type: 'number',
    }),
    defineField({
      name: 'email',
      type: 'email',
     
    }),
    defineField({
      name: 'facebook',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      type: 'url',
    }),
  ],
})
