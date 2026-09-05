export interface Project {

  /** Two-digit index used across the UI, e.g. "01" */

  id: string

  title: string

  tagline: string

  category: 'Weddings' | 'Commercial' | 'Events' | 'Showreel'| 'Celebrations' | 'Cafes & Restaurants' | 'Instant Reels' 

}

export const projects: Project[] = [

  {
    id: '01',
    title: 'Wedding Moments',
    tagline: 'The rituals, the smiles, and everything in between.',
    category: 'Weddings',
  },

  {
    id: '02',
    title: 'Event Highlights',
    tagline: 'The energy of the day, all in one reel.',
    category: 'Events',
  },

  {
    id: '03',
    title: 'The Good Times',
    tagline: 'The laughs, the people, the moments worth keeping.',
    category: 'Celebrations',
  },

  {
    id: '04',
    title: 'Food & Atmosphere',
    tagline: 'Good food, good spaces, captured as they feel.',
    category: 'Cafes & Restaurants',
  },

  {
    id: '05',
    title: 'Made in Minutes',
    tagline: 'Shot on iPhone, edited in the moment.',
    category: 'Instant Reels',
  },

  {
    id: '06',
    title: 'Car Delivery',
    tagline: 'The big reveal, captured as it happened.',
    category: 'Commercial',
  },

  {
    id: '07',
    title: 'The MOMENTO Reel',
    tagline: 'A little look at what we do.',
    category: 'Showreel'
  }

]