import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'titre',
      description: 'Titre de votre programme',
      type: 'string',
    }),
    defineField({
      name: 'description',
      description: 'description brief de votre programme',
      type: 'string',
    }),
    defineField({
      name: 'destination',
     
      type: 'string',
    }),
    defineField({
      name: 'startDate',
      description: 'date debut de votre évenement',
      type: 'date',
      
    }),
    defineField({
      name: 'endDate',
      description: 'date fin de votre évenement',

      type: 'date',
      
    }),
    defineField({
      name: 'prix',
      type: 'number',
    }),
    defineField({
      name: 'duration',
      description: 'duration de votre évenement; par example: 10 jours ou 1 mois',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      description: 'main image de votre évenement ou bien image de votre destination',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }
      ]
    }),
    defineField({
      name: 'activites',
      description: 'saisir les differents activites de votre évenement',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
   
  ],
  preview: {
    select: {
      title: 'titre',
      subtitle: 'destination',
      dateDebut: 'startDate',
      dateFin: 'endDate',
      media: 'mainImage',
    },
    prepare(selection) {
      const {title, subtitle, dateDebut, dateFin, media} = selection
      const titleFormatted = title || 'Untitled'
      // const date = `${dateDebut} ${dateFin}`
      return {
        title: titleFormatted,
        subtitle: subtitle,
        date: dateDebut,
        media: media
      }
    },
  },
})
