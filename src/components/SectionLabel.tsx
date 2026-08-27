import { cn } from '../lib/utils'

interface SectionLabelProps {
  index: string
  title: string
  className?: string
}

/** Editorial section marker — brass index, hairline, tracked title. */
export function SectionLabel({ index, title, className }: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-5', className)}>
      <span className="label-xs tabular-nums text-brass">{index}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-[var(--color-line)]" />
      <span className="label-xs text-[var(--color-muted)]">{title}</span>
    </div>
  )
}
