import { useEffect, useRef, useState } from "react";
import { X, Send, Sparkles, RotateCcw, FileText, ShieldCheck } from "lucide-react";
import { CHAT_STARTERS, CHAT_ANSWERS, CHAT_FALLBACK } from "../data/content";
import KhbLogoMark from "./KhbLogoMark";

interface ChatDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
  source?: string;
  sourceDetail?: string;
}

const GREETING =
  "Assalamu'alaikum! Saya Asisten Halal KHB. Silakan tanya seputar sertifikasi halal, self declare, dokumen, atau bahan kritis. Setiap jawaban saya lengkapi dengan sumber dokumennya.";

function findAnswer(query: string) {
  const q = query.toLowerCase();
  const match = CHAT_ANSWERS.find((item) => item.keywords.some((keyword) => q.includes(keyword)));
  return match ?? CHAT_FALLBACK;
}

export default function ChatDemo({ isOpen, onClose }: ChatDemoProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const idRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const nextId = () => {
    idRef.current += 1;
    return idRef.current;
  };

  // Reset conversation each time the modal opens
  useEffect(() => {
    if (!isOpen) return;
    idRef.current = 1;
    setMessages([{ id: 1, role: "bot", text: GREETING }]);
    setInput("");
    setIsTyping(false);
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 250);
    return () => clearTimeout(focusTimer);
  }, [isOpen]);

  // Lock body scroll + close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  // Clear pending answer when unmounted
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const sendMessage = (rawText: string) => {
    const text = rawText.trim();
    if (!text || isTyping) return;

    setMessages((prev) => [...prev, { id: nextId(), role: "user", text }]);
    setInput("");
    setIsTyping(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const found = findAnswer(text);
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "bot",
          text: found.answer,
          source: found.source,
          sourceDetail: found.sourceDetail,
        },
      ]);
      setIsTyping(false);
    }, 750);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendMessage(input);
  };

  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    idRef.current = 1;
    setMessages([{ id: 1, role: "bot", text: GREETING }]);
    setIsTyping(false);
    setInput("");
  };

  const showStarters = messages.length <= 1 && !isTyping;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[#06301f]/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-demo-title"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-[34rem] h-[92vh] sm:h-[min(84vh,40rem)] bg-white rounded-t-[1.5rem] sm:rounded-[1.5rem] shadow-[0_30px_80px_-20px_rgba(6,48,31,0.55)] border border-[rgba(22,163,74,0.15)] overflow-hidden flex flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="relative grad-signature text-white px-[1.1rem] py-[0.95rem] shrink-0 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 40% 120% at 100% 0%, rgba(253,230,138,0.28) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
                <KhbLogoMark size={24} />
              </div>
              <div className="min-w-0">
                <h3 id="chat-demo-title" className="text-[0.98rem] font-bold leading-tight truncate">
                  Asisten Halal KHB
                </h3>
                <div className="flex items-center gap-1.5 text-[0.72rem] text-white/80 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bbf7d0]" />
                  Online · menjawab dari 38 dokumen
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleReset}
                aria-label="Mulai ulang percakapan"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup percakapan"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-[#f6fbf7] px-[0.9rem] py-[1rem] space-y-[0.9rem]">
          {messages.map((message) =>
            message.role === "bot" ? (
              <div key={message.id} className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-[#eaf6ee] border border-[rgba(22,163,74,0.2)] text-[#0f7a3d] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="max-w-[85%]">
                  <div className="bg-white border border-[rgba(22,163,74,0.14)] rounded-[0.9rem] rounded-tl-xs px-[0.85rem] py-[0.65rem] shadow-sm">
                    <p className="text-[0.88rem] text-[#10231a] leading-relaxed">{message.text}</p>

                    {message.source && (
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#f6fbf7] border border-[rgba(22,163,74,0.18)] text-[0.7rem] font-medium text-[#0b5c30]">
                        <FileText className="w-3 h-3 text-[#0f7a3d] shrink-0" />
                        <span className="truncate">
                          {message.source}
                          {message.sourceDetail ? ` · ${message.sourceDetail}` : ""}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div key={message.id} className="flex justify-end">
                <div
                  className="max-w-[82%] rounded-[0.9rem] rounded-tr-xs px-[0.85rem] py-[0.65rem] text-white text-[0.88rem] leading-relaxed shadow-sm"
                  style={{ background: "linear-gradient(180deg, #16a34a 0%, #0f7a3d 100%)" }}
                >
                  {message.text}
                </div>
              </div>
            )
          )}

          {isTyping && (
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full bg-[#eaf6ee] border border-[rgba(22,163,74,0.2)] text-[#0f7a3d] flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="bg-white border border-[rgba(22,163,74,0.14)] rounded-[0.9rem] rounded-tl-xs px-3 py-2.5 shadow-sm flex items-center gap-1">
                <span className="dot-typing w-1.5 h-1.5 rounded-full bg-[#16a34a] inline-block" />
                <span className="dot-typing w-1.5 h-1.5 rounded-full bg-[#16a34a] inline-block" />
                <span className="dot-typing w-1.5 h-1.5 rounded-full bg-[#16a34a] inline-block" />
              </div>
            </div>
          )}

          {showStarters && (
            <div className="pl-9">
              <p className="text-[0.72rem] font-semibold uppercase tracking-wider text-[#10231a]/40 mb-2">
                Topik cepat
              </p>
              <div className="flex flex-wrap gap-1.5">
                {CHAT_STARTERS.map((starter) => (
                  <button
                    key={starter}
                    type="button"
                    onClick={() => sendMessage(starter)}
                    className="text-[0.75rem] font-medium px-2.5 py-1.5 rounded-full bg-white border border-[rgba(22,163,74,0.2)] text-[#0b5c30] hover:bg-[#eaf6ee] hover:border-[#16a34a] transition-colors"
                  >
                    {starter}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* Composer */}
        <div className="shrink-0 border-t border-[rgba(22,163,74,0.12)] bg-white px-[0.9rem] pt-[0.7rem] pb-[0.8rem]">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Tulis pertanyaan seputar halal..."
              aria-label="Pertanyaan untuk asisten halal"
              className="flex-1 h-[2.6rem] px-3.5 rounded-full border border-[rgba(22,163,74,0.2)] bg-[#f6fbf7] text-[0.88rem] text-[#10231a] placeholder:text-[#10231a]/35 focus:border-[#16a34a] focus:ring-2 focus:ring-[#bbf7d0] outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label="Kirim pertanyaan"
              className="w-[2.6rem] h-[2.6rem] rounded-full text-white flex items-center justify-center shrink-0 disabled:opacity-40 transition-opacity"
              style={{ background: "linear-gradient(180deg, #16a34a 0%, #0f7a3d 100%)" }}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-2 flex items-center justify-center gap-1.5 text-[0.68rem] text-[#10231a]/45">
            <ShieldCheck className="w-3 h-3 text-[#0f7a3d]" />
            Jawaban bersifat edukatif · bukan keputusan resmi BPJPH
          </p>
        </div>
      </div>
    </div>
  );
}
