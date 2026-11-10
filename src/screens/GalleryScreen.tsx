import { useState } from 'react'
import { Copy, Shuffle } from 'lucide-react'
import { useGame } from '@/game/store'
import { getSceneArt } from '@/game/caseLoader'
import { Portrait, type PortraitSpec } from '@/art/Portrait'
import { accent, clothColors, hairColors, ink } from '@/art/palette'
import { rng } from '@/art/primitives'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Developer screen: everything the art library can draw, plus a portrait
// builder whose output is pasted into a suspect's "portrait" field in case.json.

const options = {
  skin: [0, 1, 2, 3],
  hair: ['short', 'side-part', 'long', 'bun', 'bald', 'cap', 'buzz'],
  hairColor: Object.keys(hairColors),
  build: ['thin', 'normal', 'heavy'],
  outfit: ['shirt', 'polo', 'tank', 'uniform', 'blouse'],
  outfitColor: Object.keys(clothColors),
  age: ['young', 'mid', 'old'],
  backdrop: ['night', 'amber', 'teal', 'rust'],
} as const

const accessories = ['glasses', 'bandage', 'gold-chain', 'earrings', 'pen'] as const

const labels: Record<string, string> = {
  skin: 'Màu da',
  hair: 'Kiểu tóc',
  hairColor: 'Màu tóc',
  build: 'Dáng người',
  outfit: 'Trang phục',
  outfitColor: 'Màu áo',
  age: 'Tuổi',
  backdrop: 'Nền',
}

function randomSpec(seed: number): PortraitSpec {
  const r = rng(seed)
  const pick = <T,>(xs: readonly T[]) => xs[Math.floor(r() * xs.length)]
  return {
    skin: pick(options.skin) as PortraitSpec['skin'],
    hair: pick(options.hair),
    hairColor: pick(options.hairColor) as PortraitSpec['hairColor'],
    build: pick(options.build),
    outfit: pick(options.outfit),
    outfitColor: pick(options.outfitColor) as PortraitSpec['outfitColor'],
    age: pick(options.age),
    backdrop: pick(options.backdrop),
    accessory: accessories.filter(() => r() < 0.2),
  }
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="display border-b border-border pb-1 text-xl text-amber">{title}</h2>
      {children}
    </section>
  )
}

export default function GalleryScreen() {
  const { data } = useGame()
  const [spec, setSpec] = useState<PortraitSpec>(data.suspects[0].portrait ?? randomSpec(1))
  const [seed, setSeed] = useState(1)
  const [copied, setCopied] = useState(false)
  const json = JSON.stringify(spec)

  const set = (key: string, value: string) =>
    setSpec((s) => ({ ...s, [key]: key === 'skin' ? Number(value) : value }) as PortraitSpec)

  const toggleAcc = (a: (typeof accessories)[number]) =>
    setSpec((s) => {
      const cur = new Set(s.accessory ?? [])
      if (cur.has(a)) cur.delete(a)
      else cur.add(a)
      return { ...s, accessory: [...cur] }
    })

  const swatches = { ...ink, ...accent }

  return (
    <div className="h-full space-y-10 overflow-auto p-6">
      <Section title="Nhân vật trong vụ">
        <div className="flex flex-wrap gap-4">
          {[{ id: 'player', name: data.player.name, portrait: data.player.portrait }, ...data.suspects].map((s) => (
            <figure key={s.id} className="w-40">
              {s.portrait && <Portrait spec={s.portrait} size={160} />}
              <figcaption className="display mt-1 text-sm">{s.name}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section title="Tạo nhân vật">
        <div className="grid grid-cols-[240px_1fr] gap-6">
          <Portrait spec={spec} size={240} />
          <div className="min-w-0 space-y-3">
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(options).map(([key, vals]) => (
                <label key={key} className="flex flex-col gap-1 text-xs text-muted-foreground">
                  {labels[key]}
                  <select
                    id={`pick-${key}`}
                    value={String(spec[key as keyof PortraitSpec] ?? '')}
                    onChange={(e) => set(key, e.target.value)}
                    className="min-w-0 rounded-md border border-border bg-secondary px-2 py-1 text-sm text-foreground"
                  >
                    {vals.map((v) => (
                      <option key={String(v)} value={String(v)}>
                        {String(v)}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {accessories.map((a) => (
                <Button key={a} size="sm" variant={spec.accessory?.includes(a) ? 'secondary' : 'outline'} onClick={() => toggleAcc(a)}>
                  {a}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSeed(seed + 1)
                  setSpec(randomSpec(seed * 7919))
                }}
              >
                <Shuffle /> Ngẫu nhiên
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  navigator.clipboard?.writeText(`"portrait": ${json}`).then(
                    () => setCopied(true),
                    () => setCopied(false),
                  )
                }}
              >
                <Copy /> {copied ? 'Đã chép' : 'Chép JSON'}
              </Button>
            </div>
            <pre className="select-text whitespace-pre-wrap break-all rounded-md bg-secondary p-3 font-mono text-xs">"portrait": {json}</pre>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {Array.from({ length: 10 }, (_, i) => (
            <button key={i} onClick={() => setSpec(randomSpec(1000 + i * 31))} title="Dùng mẫu này">
              <Portrait spec={randomSpec(1000 + i * 31)} size={90} />
            </button>
          ))}
        </div>
      </Section>

      <Section title="Hiện trường">
        <div className="grid grid-cols-2 gap-4">
          {data.zones.map((z) => {
            const Art = getSceneArt(data.id, z.id)
            return (
              <figure key={z.id}>
                <div className="relative aspect-video overflow-hidden border border-border">{Art && <Art />}</div>
                <figcaption className="display mt-1 text-sm">{z.name}</figcaption>
              </figure>
            )
          })}
        </div>
      </Section>

      <Section title="Giấy tờ và giao diện">
        <div className="flex flex-wrap items-start gap-6">
          <div className="document w-56 p-3 shadow-md">
            <p className="text-[10px] font-semibold uppercase opacity-60">P7</p>
            <p className="text-sm font-semibold">Biên nhận Grab của Bảo</p>
            <p className="mt-1 text-xs">Đón 01:34 tại đầu hẻm cách kho 300 m.</p>
          </div>
          <div className="w-64 border border-border bg-card p-3">
            <p className="text-xs text-muted-foreground">Câu 3</p>
            <p className="display text-lg leading-tight">Lửa được châm lúc nào?</p>
            <div className="mt-2 h-1 bg-string" />
          </div>
          <div className="flex flex-col gap-2">
            <Button>Ký đề xuất</Button>
            <Button variant="outline">Hỏi chuyện (1 lượt)</Button>
            <Badge variant="outline">Ngày 1/3</Badge>
          </div>
        </div>
      </Section>

      <Section title="Bảng màu và chữ">
        <div className="flex flex-wrap gap-3">
          {Object.entries(swatches).map(([name, hex]) => (
            <div key={name} className="w-24 text-xs">
              <div className="h-12 border border-border" style={{ background: hex }} />
              <p className="mt-1">{name}</p>
              <p className="font-mono text-muted-foreground">{hex}</p>
            </div>
          ))}
        </div>
        <div className="space-y-1">
          <p className="display text-3xl">Barlow Condensed: tiêu đề, nhãn, nút</p>
          <p>Be Vietnam Pro: lời thoại, mô tả, nội dung đọc dài.</p>
          <p className="font-mono text-sm">IBM Plex Mono: giấy tờ, hóa đơn, sao kê 01:34</p>
        </div>
      </Section>
    </div>
  )
}
