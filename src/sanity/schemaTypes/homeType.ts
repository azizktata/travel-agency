import { defineType } from "sanity";


export const homeType = defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
        {
        name: 'logoName',
        description: "Titre du logo",
        type: 'string',
        },
        {
        name: 'titre',
        description: "Titre de la page",
        type: 'string',
        },
        {
        name: 'image',
        description:"Image principal du page",
        type: 'image',
        },
        {
        name: 'description',
        description: "short consicese description for your travel website",
        type: 'text',
        },
        {
        name: 'about',
        description: "Introduire votre service et vos offres ",
        type: 'text',
        },
    ],
    preview: {
        select: {
        title: 'titre',
        subtitle: 'description',
        media: 'image',
        },
    },
})