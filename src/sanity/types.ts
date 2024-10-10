/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type TeamBuilding = {
  _id: string;
  _type: "teamBuilding";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  mainImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  activites?: Array<string>;
};

export type Hotel = {
  _id: string;
  _type: "hotel";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  nom?: string;
  slug?: Slug;
  adresse?: string;
  etoile?: number;
  prix?: number;
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  mainImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  chambres?: Array<{
    chambre?: string;
    prix?: number;
    _key: string;
  }>;
  services?: Array<{
    service?: string;
    prix?: number;
    _key: string;
  }>;
  listImage?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  }>;
};

export type PageVisa = {
  _id: string;
  _type: "pageVisa";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  type?: string;
  description?: string;
};

export type Visa = {
  _id: string;
  _type: "visa";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  nom?: string;
  prenom?: string;
  telephone?: string;
  email?: string;
  passport?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
};

export type Page = {
  _id: string;
  _type: "page";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  logoName?: string;
  titre?: string;
  contact?: {
    telephone?: number;
    email?: string;
    facebook?: string;
    instagram?: string;
    _type: "contact";
  };
  team?: {
    mainImage?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: "image";
    };
    activites?: Array<string>;
    _type: "teamBuilding";
  };
  about?: string;
  aboutImg?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  emplacement?: string;
};

export type Post = {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  titre?: string;
  description?: string;
  destination?: string;
  slug?: Slug;
  prix?: number;
  type?: "voyage-organise" | "voyage-carte";
  visa?: "visa-required" | "visa-non-required";
  duration?: string;
  periodes?: Array<{
    periode?: string;
    tarif?: number;
    _key: string;
  }>;
  serviceInclus?: Array<string>;
  serviceNonInclus?: Array<string>;
  mainImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  listImage?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  }>;
  activites?: Array<string>;
  sejours?: Array<{
    jour?: string;
    description?: string;
    _key: string;
  }>;
  hotels?: Array<{
    hotel?: string;
    prix?: number;
    _key: string;
  }>;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type Slug = {
  _type: "slug";
  current?: string;
  source?: string;
};

export type Contact = {
  _id: string;
  _type: "contact";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  telephone?: number;
  email?: string;
  facebook?: string;
  instagram?: string;
};

export type AllSanitySchemaTypes = SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | SanityFileAsset | Geopoint | TeamBuilding | Hotel | PageVisa | Visa | Page | Post | SanityImageCrop | SanityImageHotspot | SanityImageAsset | SanityAssetSourceData | SanityImageMetadata | Slug | Contact;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ../agence-voyage/src/app/layout.tsx
// Variable: PAGE_DEFAULT_QUERY
// Query: *[ _type=="page"][0]
export type PAGE_DEFAULT_QUERYResult = {
  _id: string;
  _type: "page";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  logoName?: string;
  titre?: string;
  contact?: {
    telephone?: number;
    email?: string;
    facebook?: string;
    instagram?: string;
    _type: "contact";
  };
  team?: {
    mainImage?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: "image";
    };
    activites?: Array<string>;
    _type: "teamBuilding";
  };
  about?: string;
  aboutImg?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  emplacement?: string;
} | null;

// Source: ../agence-voyage/src/app/page.tsx
// Variable: PAGE_QUERY
// Query: *[_type=="page"][0]{  titre,  description,  team,  about}
export type PAGE_QUERYResult = {
  titre: string | null;
  description: null;
  team: {
    mainImage?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: "image";
    };
    activites?: Array<string>;
    _type: "teamBuilding";
  } | null;
  about: string | null;
} | null;
// Variable: POST_QUERY
// Query: *[  _type == "post" && type == "voyage-organise"  ]
export type POST_QUERYResult = Array<{
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  titre?: string;
  description?: string;
  destination?: string;
  slug?: Slug;
  prix?: number;
  type?: "voyage-carte" | "voyage-organise";
  visa?: "visa-non-required" | "visa-required";
  duration?: string;
  periodes?: Array<{
    periode?: string;
    tarif?: number;
    _key: string;
  }>;
  serviceInclus?: Array<string>;
  serviceNonInclus?: Array<string>;
  mainImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  listImage?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  }>;
  activites?: Array<string>;
  sejours?: Array<{
    jour?: string;
    description?: string;
    _key: string;
  }>;
  hotels?: Array<{
    hotel?: string;
    prix?: number;
    _key: string;
  }>;
}>;
// Variable: POST_CART_QUERY
// Query: *[  _type == "post" && type == "voyage-carte"  ]
export type POST_CART_QUERYResult = Array<{
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  titre?: string;
  description?: string;
  destination?: string;
  slug?: Slug;
  prix?: number;
  type?: "voyage-carte" | "voyage-organise";
  visa?: "visa-non-required" | "visa-required";
  duration?: string;
  periodes?: Array<{
    periode?: string;
    tarif?: number;
    _key: string;
  }>;
  serviceInclus?: Array<string>;
  serviceNonInclus?: Array<string>;
  mainImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  listImage?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  }>;
  activites?: Array<string>;
  sejours?: Array<{
    jour?: string;
    description?: string;
    _key: string;
  }>;
  hotels?: Array<{
    hotel?: string;
    prix?: number;
    _key: string;
  }>;
}>;
// Variable: POST_3_QUERY
// Query: *[    _type == "post"  ] | order(_createdAt desc)[0...3]
export type POST_3_QUERYResult = Array<{
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  titre?: string;
  description?: string;
  destination?: string;
  slug?: Slug;
  prix?: number;
  type?: "voyage-carte" | "voyage-organise";
  visa?: "visa-non-required" | "visa-required";
  duration?: string;
  periodes?: Array<{
    periode?: string;
    tarif?: number;
    _key: string;
  }>;
  serviceInclus?: Array<string>;
  serviceNonInclus?: Array<string>;
  mainImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  listImage?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  }>;
  activites?: Array<string>;
  sejours?: Array<{
    jour?: string;
    description?: string;
    _key: string;
  }>;
  hotels?: Array<{
    hotel?: string;
    prix?: number;
    _key: string;
  }>;
}>;
// Variable: HOTEL_QUERY
// Query: *[  _type == "hotel"  ]
export type HOTEL_QUERYResult = Array<{
  _id: string;
  _type: "hotel";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  nom?: string;
  slug?: Slug;
  adresse?: string;
  etoile?: number;
  prix?: number;
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  mainImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  chambres?: Array<{
    chambre?: string;
    prix?: number;
    _key: string;
  }>;
  services?: Array<{
    service?: string;
    prix?: number;
    _key: string;
  }>;
  listImage?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  }>;
}>;

// Source: ../agence-voyage/src/app/hotels/page.tsx
// Variable: ADRS_QUERY
// Query: *[  _type == "hotel"  ]{adresse}
export type ADRS_QUERYResult = Array<{
  adresse: string | null;
}>;

// Source: ../agence-voyage/src/app/programmes/page.tsx
// Variable: DEST_QUERY
// Query: *[  _type == "post"  ]{destination}
export type DEST_QUERYResult = Array<{
  destination: string | null;
}>;

// Source: ../agence-voyage/src/app/visa/page.tsx
// Variable: VISAS_QUERY
// Query: *[    _type == "pageVisa"    ]
export type VISAS_QUERYResult = Array<{
  _id: string;
  _type: "pageVisa";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  type?: string;
  description?: string;
}>;

// Source: ../agence-voyage/src/app/hotels/[slug]/page.tsx
// Variable: HOTEL_SLUG_QUERY
// Query: *[    _type == "hotel" && slug.current == $slug    ][0]
export type HOTEL_SLUG_QUERYResult = {
  _id: string;
  _type: "hotel";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  nom?: string;
  slug?: Slug;
  adresse?: string;
  etoile?: number;
  prix?: number;
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  mainImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  chambres?: Array<{
    chambre?: string;
    prix?: number;
    _key: string;
  }>;
  services?: Array<{
    service?: string;
    prix?: number;
    _key: string;
  }>;
  listImage?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  }>;
} | null;

// Source: ../agence-voyage/src/app/programmes/[slug]/page.tsx
// Variable: POST_SLUG_QUERY
// Query: *[    _type == "post" && slug.current == $slug    ][0]
export type POST_SLUG_QUERYResult = {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  titre?: string;
  description?: string;
  destination?: string;
  slug?: Slug;
  prix?: number;
  type?: "voyage-carte" | "voyage-organise";
  visa?: "visa-non-required" | "visa-required";
  duration?: string;
  periodes?: Array<{
    periode?: string;
    tarif?: number;
    _key: string;
  }>;
  serviceInclus?: Array<string>;
  serviceNonInclus?: Array<string>;
  mainImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  listImage?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  }>;
  activites?: Array<string>;
  sejours?: Array<{
    jour?: string;
    description?: string;
    _key: string;
  }>;
  hotels?: Array<{
    hotel?: string;
    prix?: number;
    _key: string;
  }>;
} | null;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    "*[ _type==\"page\"][0]": PAGE_DEFAULT_QUERYResult;
    "*[\n_type==\"page\"][0]{\n  titre,\n  description,\n  team,\n  about\n}": PAGE_QUERYResult;
    "*[\n  _type == \"post\" && type == \"voyage-organise\"\n  ]": POST_QUERYResult;
    "*[\n  _type == \"post\" && type == \"voyage-carte\"\n  ]": POST_CART_QUERYResult;
    "*[\n    _type == \"post\"\n  ] | order(_createdAt desc)[0...3]": POST_3_QUERYResult;
    "*[\n  _type == \"hotel\"\n  ]": HOTEL_QUERYResult;
    "*[\n  _type == \"hotel\"\n  ]{adresse}": ADRS_QUERYResult;
    "*[\n  _type == \"post\"\n  ]{destination}": DEST_QUERYResult;
    "*[\n    _type == \"pageVisa\"\n    ]": VISAS_QUERYResult;
    "*[\n    _type == \"hotel\" && slug.current == $slug\n    ][0]": HOTEL_SLUG_QUERYResult;
    "*[\n    _type == \"post\" && slug.current == $slug\n    ][0]": POST_SLUG_QUERYResult;
  }
}
