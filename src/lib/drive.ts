/**
 * Google Drive media helpers.
 *
 * Accepts any of the following and resolves it to a streamable /
 * embeddable URL. Returns `null` for unconfigured placeholders so the
 * UI can render an elegant "media pending" state instead of breaking.
 */

const PLACEHOLDER_RE = /^[A-Z][A-Z0-9_]*$/
const BARE_ID_RE = /^[a-zA-Z0-9_-]{25,}$/

export function isConfigured(value: string | undefined): value is string {
  return Boolean(value) && !PLACEHOLDER_RE.test((value ?? '').trim())
}

export function extractDriveId(raw: string): string | null {
  const value = raw.trim()
  if (BARE_ID_RE.test(value)) return value
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]{20,})/,
    /\/d\/([a-zA-Z0-9_-]{20,})/,
    /[?&]id=([a-zA-Z0-9_-]{20,})/,
  ]
  for (const re of patterns) {
    const m = value.match(re)
    if (m) return m[1]
  }
  return null
}

/** Direct download/stream endpoint — works as a <video> src for shared files */
export function driveStreamUrl(id: string): string {
  return `https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`
}

/** Server-generated thumbnail — works for images AND video files */
export function driveImageUrl(id: string, width = 1600): string {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`
}

/** Human-friendly page for a Drive file (used as a fallback link) */
export function driveFilePageUrl(id: string): string {
  return `https://drive.google.com/file/d/${id}/view`
}

/** Resolve a configured image source → URL, or null if unconfigured */
export function resolveImage(src: string | undefined, width = 1600): string | null {
  if (!isConfigured(src)) return null
  const id = extractDriveId(src)
  return id ? driveImageUrl(id, width) : (src as string)
}

/** Resolve a configured video source → URL, or null if unconfigured */
export function resolveVideo(src: string | undefined): string | null {
  if (!isConfigured(src)) return null
  const id = extractDriveId(src)
  return id ? driveStreamUrl(id) : (src as string)
}
