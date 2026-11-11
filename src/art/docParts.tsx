import { cn } from '@/lib/utils'
import { useGame } from '@/game/store'
import { initials } from '@/series/profile'

// Pieces for drawing documents in HTML: printed sheets, phone screenshots,
// stamps and handwriting. Text stays real text so it is crisp at any size.

export function Sheet({ title, org, children, className }: { title: string; org?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('relative bg-[#fbf4e4] p-4 font-mono text-[11px] leading-relaxed text-[#2d1f18] shadow-[0_6px_16px_rgb(0_0_0/0.35)]', className)}>
      {org && <p className="text-center text-[10px] font-semibold uppercase tracking-wider opacity-70">{org}</p>}
      <p className="title mb-2 mt-1 text-center text-sm uppercase">{title}</p>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

export function Stamp({ text, className }: { text: string; className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute flex size-20 items-center justify-center rounded-full border-[3px] border-[#b23a2e] p-1 text-center text-[8px] font-bold uppercase leading-tight text-[#b23a2e] opacity-75',
        className,
      )}
      style={{ rotate: '-14deg' }}
    >
      {text}
    </div>
  )
}

/** The investigator's own signature, from the chosen character's name. */
export function PlayerSignature() {
  return <Signature name={initials(useGame((s) => s.data.player.name))} />
}

export function Signature({ name }: { name: string }) {
  return (
    <div className="mt-2 text-right">
      <p className="text-[9px] uppercase opacity-60">Ký tên</p>
      <p className="text-lg italic text-[#2f4258]" style={{ fontFamily: 'Bitter, serif', rotate: '-4deg' }}>
        {name}
      </p>
    </div>
  )
}

export function Phone({ header, children, dark = false }: { header: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="mx-auto w-60 rounded-[22px] bg-[#1c130f] p-2 shadow-[0_8px_20px_rgb(0_0_0/0.45)]">
      <div className={cn('overflow-hidden rounded-[16px] font-sans text-[11px]', dark ? 'bg-[#2b1e17] text-[#f3e4c4]' : 'bg-[#f6efe2] text-[#2d1f18]')}>
        <div className="flex justify-between px-3 pt-1.5 text-[9px] opacity-70">
          <span>22:15</span>
          <span>4G ▮▮▮</span>
        </div>
        <p className="border-b border-black/10 px-3 py-1.5 font-semibold">{header}</p>
        <div className="space-y-1.5 p-3">{children}</div>
      </div>
    </div>
  )
}

export function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="flex justify-between gap-3 border-b border-dotted border-black/20">
      <span className="opacity-70">{k}</span>
      <span className={cn('text-right', strong && 'font-bold')}>{v}</span>
    </div>
  )
}

/** A highlighter mark the investigator has drawn over an important detail. */
export function Mark({ children }: { children: React.ReactNode }) {
  return <span className="bg-[#f2a93b]/45 px-0.5">{children}</span>
}
