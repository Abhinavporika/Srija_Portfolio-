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
    tagline: 'Full wedding film — rituals, glances, promises',
    category: 'Wedding',
  },
  {
    id: '02',
    title: 'Car Delivery',
    tagline: 'The big reveal — shot clean, graded rich',
    category: 'Commercial',
  },
  {
    id: '03',
    title: 'Wedding Teaser',
    tagline: 'Sixty seconds that carry the whole day',
    category: 'Wedding',
  },
  {
    id: '04',
    title: 'Event Highlights',
    tagline: 'Energy distilled — best moments, one flowing cut',
    category: 'Events',
  },
  {
    id: '05',
    title: 'Reels & Short Edits',
    tagline: 'Fast-paced vertical edits with rhythm & punch',
    category: 'Reels',
  },
  {
    id: '06',
    title: 'The Showreel',
    tagline: 'Everything Srija does — shoot, edit, colour, sound',
    category: 'Showreel',
  },
]