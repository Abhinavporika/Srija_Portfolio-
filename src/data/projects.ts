export interface Project {

  /** Two-digit index used across the UI, e.g. "01" */

  id: string

  title: string

  tagline: string

  category: 'Wedding' | 'Commercial' | 'Events' | 'Reels' | 'Showreel'

}

export const projects: Project[] = [

  {
    id: '01',
    title: 'The Wedding Story',
    tagline: 'The rituals, the smiles, the little moments in between',
    category: 'Wedding',
  },

  {
    id: '02',
    title: 'Car Delivery',
    tagline: 'The moment of the reveal, captured as it happened',
    category: 'Commercial',
  },

  {
    id: '03',
    title: 'Wedding Teaser',
    tagline: 'A little glimpse of a day worth remembering',
    category: 'Wedding',
  },

  {
    id: '04',
    title: 'Event Highlights',
    tagline: 'The best moments, all in one reel',
    category: 'Events',
  },

  {
    id: '05',
    title: 'Instant Reels',
    tagline: 'Shot on iPhone, edited in the moment',
    category: 'Reels',
  },

  {
    id: '06',
    title: 'The Reel Showcase',
    tagline: 'A look at the moments we create at MOMENTO',
    category: 'Showreel',
  },

]