import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  Briefcase,
  FolderOpen,
  Gavel,
  Highlighter,
  KeyRound,
  Lightbulb,
  Network,
  Search,
  Volume2,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Page {
  id: string
  title: string
  icon: typeof Briefcase
  body: { lead: string; points: string[] }
}

// What the player needs to know, in the order a case is played.
const PAGES: Page[] = [
  {
    id: 'muc-tieu',
    title: 'Nhiệm vụ',
    icon: Briefcase,
    body: {
      lead: 'Bạn là chuyên viên thẩm định của bảo hiểm An Tín. Mỗi chương là một hồ sơ đòi bồi thường. Bạn có một số ngày để tìm sự thật rồi ký đề xuất: chi trả, chi một phần, hay từ chối.',
      points: [
        'Mỗi ngày khám được một khu hiện trường. Hỏi chuyện nghi phạm không giới hạn.',
        'Bấm "Kết thúc ngày" ở Bàn làm việc để sang ngày mới. Hết số ngày thì phải nộp đề xuất.',
        'Uy tín giảm mỗi lần bạn trả lời sai trên bàn suy luận.',
        'Độ khó của mỗi chương quyết định số ngày (Dễ 10, Vừa 9, Khó 8, Rất khó 7), số gợi ý cả vụ, uy tín ban đầu và số thẻ Liên quan cần cho mỗi câu. Nhãn màu trên bản đồ ghi rõ những con số này.',
      ],
    },
  },
  {
    id: 'hien-truong',
    title: 'Hiện trường và thẩm vấn',
    icon: Search,
    body: {
      lead: 'Ở Hiện trường, bấm vào từng điểm khả nghi để soi cận cảnh. Điểm nào là manh mối thì thẻ của nó tự lên bàn suy luận.',
      points: [
        'Không phải điểm nào cũng có ích. Một số chỉ là vật nhiễu.',
        'Khi thẩm vấn, bạn phải có thẻ bằng chứng phù hợp thì mới mở được câu vặn lại. Nghi phạm không khai dễ dàng, bạn phải bẻ được lời nói dối của họ.',
        'Ảnh trên điện thoại nghi phạm cho xem cũng là bằng chứng. Hãy soi kỹ giờ chụp và các chi tiết trong ảnh.',
      ],
    },
  },
  {
    id: 'ho-so',
    title: 'Hồ sơ và bút lông',
    icon: FolderOpen,
    body: {
      lead: 'Giấy tờ nằm trong các phong bì. Phong bì sau mở ra khi bạn giải được một câu trên bàn suy luận.',
      points: [
        'Kéo một tờ vào "Bàn đọc" để đọc kỹ. Kéo vào "Ghim lên bàn suy luận" để biến nó thành thẻ manh mối.',
        'Mỗi tờ có một mã, ví dụ 0714/P05: số hồ sơ, rồi loại giấy tờ (H là hiện trường, P là hồ sơ, X là lời khai hoặc vật nhiễu) và số thứ tự.',
        'Bút lông: bấm nút Bút lông (trên thanh trên cùng hoặc ở Bàn đọc) để cầm bút, con trỏ thành cây bút. Kéo chuột qua chữ trên giấy tờ, kể cả trong ảnh giấy tờ, thì chữ được tô vàng và tờ đó được ghim lên bàn suy luận kèm câu trích. Bấm nút lần nữa để cất bút. Bút không cho biết câu nào quan trọng, việc đó là của bạn.',
      ],
    },
  },
  {
    id: 'ghi-am',
    title: 'Ghi âm',
    icon: Volume2,
    body: {
      lead: 'Một số giấy tờ đi kèm đoạn ghi âm: cuộc gọi, tin nhắn thoại, lời khai.',
      points: [
        'Bấm nút tròn để nghe. Lời thoại luôn in ngay bên dưới, nên tắt tiếng vẫn chơi được.',
        'Hãy để ý tiếng nền. Một cuộc gọi kể chuyện trời mưa mà không nghe tiếng mưa là chuyện đáng ngờ.',
      ],
    },
  },
  {
    id: 'giai-ma',
    title: 'Câu đố giải mã',
    icon: KeyRound,
    body: {
      lead: 'Một số giấy tờ chỉ ghi số liệu thô hoặc ký hiệu viết tắt. Thẻ của chúng ghi "Chưa giải mã" và chưa được tính là bằng chứng cho tới khi bạn giải xong.',
      points: [
        'Mở tờ đó trên Bàn đọc, hoặc bấm vào dòng "Chưa giải mã" trên thẻ ở bàn suy luận.',
        'Có hai kiểu câu đố: gõ đáp án (một con số, một cái tên, một giờ), hoặc bấm đủ các điểm bất thường trên ảnh.',
        'Khi gõ đáp án, không cần lo dấu, chữ hoa hay khoảng trắng.',
      ],
    },
  },
  {
    id: 'suy-luan',
    title: 'Bàn suy luận',
    icon: Network,
    body: {
      lead: 'Mỗi câu hỏi cần một đáp án và đủ thẻ bằng chứng chính. Kéo dây từ chấm đỏ của thẻ sang câu hỏi để nối, chọn đáp án, rồi bấm "Kiểm tra".',
      points: [
        'Mỗi câu hỏi có điểm nối ở bên trái, bên phải và phía trên, nên bạn xếp thẻ quanh câu hỏi theo phía nào cũng được.',
        'Có hai loại thẻ. Thẻ "Khớp" là bằng chứng chính, liên quan trực tiếp tới câu hỏi: phải nối đủ hết. Thẻ "Liên quan" củng cố thêm cho câu trả lời: phải nối đủ số ô tròn ghi trên câu hỏi. Có đủ cả hai loại thì câu hỏi mới được giải và phần tiếp theo mới mở.',
        'Sau mỗi lần Kiểm tra, dây chuyển xanh và các ô đếm Khớp và Liên quan trên câu hỏi được tô dần theo số thẻ bạn đã chứng minh.',
        'Đáp án đúng mà thiếu thẻ thì không bị trừ uy tín. Ở mức Dễ và Vừa, game cho biết còn thiếu bao nhiêu thẻ mỗi loại; từ mức Khó chỉ báo là chưa đủ bằng chứng.',
        'Mức Dễ và Vừa cần 1 thẻ Liên quan cho mỗi câu, mức Khó và Rất khó cần 2. Ở mức Rất khó, câu hỏi không cho biết cần bao nhiêu thẻ.',
      ],
    },
  },
  {
    id: 'goi-y',
    title: 'Gợi ý',
    icon: Lightbulb,
    body: {
      lead: 'Gợi ý mở dần để bạn vẫn là người phá án.',
      points: [
        'Mỗi câu hỏi được một gợi ý đầu miễn phí. Gợi ý tiếp theo chỉ mở khi lần Kiểm tra mới có thêm một dây xanh.',
        'Với câu đố giải mã, gợi ý tiếp theo mở sau mỗi lần bạn thử thêm một đáp án mới.',
        'Mỗi mức độ khó có một quỹ gợi ý cho cả vụ, dùng chung cho câu hỏi và câu đố: Dễ không giới hạn, Vừa 10, Khó 7, Rất khó 4. Hết quỹ thì không mở thêm được gợi ý nào.',
        'Ô "Gợi ý" trên thanh trên cùng cho biết bạn mở được bao nhiêu gợi ý ngay lúc này, và cả vụ còn bao nhiêu gợi ý.',
      ],
    },
  },
  {
    id: 'ket-luan',
    title: 'Kết luận',
    icon: Gavel,
    body: {
      lead: 'Khi đã chắc chắn, vào Kết luận, trả lời các câu hỏi cuối và ký đề xuất.',
      points: [
        'Tiền bồi thường chỉ được trả cho đúng người có quyền nhận, không bao giờ trả cho kẻ gian lận.',
        'Ký xong, game dựng lại vụ án từng bước, cho xem số phận từng người và tóm tắt dòng thời gian thật.',
        'Mỗi ghim trên bản đồ có ghi độ khó và thời gian chơi ước tính.',
      ],
    },
  },
]

const SEEN_KEY = 'hs-guide-seen'

/** Whether the guide has been shown on this computer before. Storage may be off; then assume it was. */
export function guideSeen() {
  try {
    return localStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return true
  }
}

function markSeen() {
  try {
    localStorage.setItem(SEEN_KEY, '1')
  } catch {
    // Storage is blocked: the guide just shows again next time.
  }
}

/** The how-to-play guide: a case file of short pages, one per part of the game. */
export function Guide({ onClose, start }: { onClose: () => void; start?: string }) {
  const [page, setPage] = useState(Math.max(0, PAGES.findIndex((p) => p.id === start)))
  const close = () => {
    markSeen()
    onClose()
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') setPage((p) => Math.min(PAGES.length - 1, p + 1))
      if (e.key === 'ArrowLeft') setPage((p) => Math.max(0, p - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const p = PAGES[page]
  const last = page === PAGES.length - 1
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-8 backdrop-blur-sm" onClick={close} role="dialog" aria-modal="true" aria-label="Hướng dẫn chơi">
      <div className="relative flex h-[min(560px,86vh)] w-[min(920px,94vw)]" onClick={(e) => e.stopPropagation()}>
        {/* Index tabs down the left, like dividers in a binder */}
        <nav className="flex w-56 shrink-0 flex-col gap-1 py-6 pr-2">
          <p className="display mb-2 px-3 text-xs tracking-[0.3em] text-brass">HƯỚNG DẪN</p>
          {PAGES.map((x, i) => (
            <button
              key={x.id}
              onClick={() => setPage(i)}
              className={cn(
                'display flex items-center gap-2 rounded-l-md px-3 py-1.5 text-left text-sm transition',
                i === page ? 'bg-paper text-paper-ink' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground',
              )}
            >
              <x.icon className="size-4 shrink-0" />
              {x.title}
            </button>
          ))}
        </nav>
        <article key={p.id} className="document flex flex-1 flex-col overflow-auto p-8 [animation:fadeIn_.25s_ease]">
          <p className="display text-xs tracking-widest opacity-60">
            Trang {page + 1}/{PAGES.length}
          </p>
          <h2 className="title mt-1 flex items-center gap-2 text-3xl">
            <p.icon className="size-7 opacity-70" /> {p.title}
          </h2>
          <div className="my-3 h-px bg-paper-ink/30" />
          <p className="text-[15px] leading-relaxed">{p.body.lead}</p>
          <ul className="mt-4 space-y-2.5">
            {p.body.points.map((t, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed">
                {p.id === 'ho-so' && i === 2 ? (
                  <Highlighter className="mt-0.5 size-4 shrink-0 text-string" />
                ) : (
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-string" />
                )}
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-center justify-between pt-6">
            <button className="display text-sm opacity-70 hover:opacity-100 disabled:opacity-30" disabled={page === 0} onClick={() => setPage(page - 1)}>
              ← Trang trước
            </button>
            <button
              className="display rounded-sm border-2 border-string px-3 py-1 text-sm text-string transition-transform hover:-rotate-2"
              onClick={() => (last ? close() : setPage(page + 1))}
            >
              {last ? 'Bắt đầu điều tra' : 'Trang sau →'}
            </button>
          </div>
        </article>
        <button className="absolute -right-3 -top-10 rounded-full bg-background/90 p-1.5 text-foreground hover:text-amber" onClick={close} aria-label="Đóng">
          <X className="size-5" />
        </button>
      </div>
    </div>,
    document.body,
  )
}
