
export type NavbarImageLink =
  {
    name: string
    href: `${string}`
    source: `/${string}`
    description: string
    SlideImages: {id: number, source: string}[]
  }
export const GrDesignLinks: NavbarImageLink[] = [
  {
    name: 'Menus',
    href: '/menus',
    source: "/frontend-used-images/Category-Images/Menus.png",
    description: 'Modifiable menu templates crafted for restaurants, bars an coffee shops of various styles',
    SlideImages: []

  },
  {
    name: 'Banners',
    href: '/banners',
    source: "/frontend-used-images/Category-Images/Banners.png",
    description: 'Social media restaurant banners alongside banners higher dimensions up to 4K',
    SlideImages: []
  },
  {
    name: 'Flyers',
    href: '/Flyers',
    source: "/frontend-used-images/Category-Images/Flyers.png",
    description: 'Unique flyer templates that can be modified',
    SlideImages: []
  },
  {
    name: 'Logos',
    href: '/Logos',
    source: "/frontend-used-images/Category-Images/Logos.png",
    description: 'Logos of various kinds based on foods, restaurant objects or more   crafted for restaurants',
    SlideImages: []
  },
  {
    name: 'Artworks',
    href: '/Artworks',
    source: "/frontend-used-images/Category-Images/Artworks.png",
    description: 'Unique styled artworks designed for restaurants. Meant to be used either decoratively or in marketing',
    SlideImages: []
  },
  {
    name: 'Stickers & Cliparts',
    href: '/cliparts',
    source: "/frontend-used-images/Category-Images/Food Cliparts.png",
    description : 'Small sized images and stickers that can be used almost anywhere',
    SlideImages: []
  },
  {
    name: 'Brochures',
    href: '/brochures',
    source: "/frontend-used-images/Category-Images/Brochures.png",
    description : 'Restaurant template brochures designed to stand out',
    SlideImages: []
  },
  {
    name: 'Other',
    href: '/other',
    source :"/frontend-used-images/Category-Images/RestaurantStockImages.png",
    description : 'Restaurant tables, bar stands, or just custom made characters having a drink. Marketing images that are not related to foods',
    SlideImages: []
  },
]