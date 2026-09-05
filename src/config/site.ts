const env = import.meta.env

/**
 * ────────────────────────────────────────────────────────────────
 *  CENTRAL SITE CONFIGURATION — edit everything about Momento here.
 *  Replace the UPPERCASE placeholders with real values.
 *  Media values also accept any public Google Drive link or file-id.
 * ────────────────────────────────────────────────────────────────
 */
export const siteConfig = {
  name: 'MOMENTO',
  role: 'Video Creator & Editor',
  tagline: 'Moments, Made in Minutes.',

  hero: {
    videoUrl: env.VITE_HERO_VIDEO_URL || 'HERO_VIDEO_URL',
    posterUrl: env.VITE_HERO_POSTER_URL || 'HERO_POSTER_URL',
  },

  profileImageUrl: env.VITE_PROFILE_IMAGE_URL || 'PROFILE_IMAGE_URL',

  /** Intentionally public contact details */
  phone: '+91 94416 11828',
  whatsapp: '919441611828',
  email: 'support.momento@gmail.com',

  social: {
    instagram: 'INSTAGRAM_URL',
    youtube: 'YOUTUBE_URL',
    linkedin: 'LINKEDIN_URL',
  },

  /** Google Apps Script web-app URL that stores enquiries in Google Sheets */
  formsEndpoint: env.VITE_SHEETS_WEBAPP_URL || '',

  /** Where "View Portfolio" points until films are embedded on the site itself */
  portfolioUrl: 'https://drive.google.com/drive/folders/1O622910-J2v0i0f7qTEmsNwx-pUhTcp0',

  siteUrl: 'https://momento1.vercel.app',
}

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const
