export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '')
}

export function telLink(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, '')}`
}

export function whatsappLink(number: string, message = ''): string {
  const digits = digitsOnly(number)
  const base = `https://wa.me/${digits || encodeURIComponent(number)}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}
