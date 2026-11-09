import { useEffect, useRef, useState } from 'react';
import { api, SOURCE_LABEL, type ChatBoot } from '../services/api';
import { useToast } from '../components/Toast';
import { MarkdownText } from '../components/ui/MarkdownText';
import { MicButton } from '../components/MicButton';

interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  source?: 'rag' | 'general' | 'handoff' | 'none';
  citations?: string[];
  confidence?: number;
}

const SESSION_KEY = 'khb-chat-session-admin';

const BOT_AVATAR = (
  <svg viewBox="0 0 20 20" fill="none"><path d="M10 1.6a1 1 0 011 1v1.1a4 4 0 013.9 4v3.1l1.2 2a.8.8 0 01-.7 1.2H3.6a.8.8 0 01-.7-1.2l1.2-2V7.7A4 4 0 018.9 3.7V2.6a1 1 0 011-1zM8.2 8.6a.9.9 0 100 1.8.9.9 0 000-1.8zM11.8 8.6a.9.9 0 100 1.8.9.9 0 000-1.8zM8.4 12.2h3.2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 16a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
);

/* Ikon topik bergiliran supaya tiap kartu topik tidak tampak identik. */
const TOPIC_ICONS = [
  { tone: 'topic-green', icon: <><path d="M10 2l2.4 5.2 5.6.6-4.2 3.8 1.2 5.6L10 14.4 5 17.2l1.2-5.6L2 7.8l5.6-.6L10 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></> },
  { tone: 'topic-blue', icon: <><rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></> },
  { tone: 'topic-orange', icon: <><path d="M4 2h9l4 4v12H4V2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M13 2v4h4" stroke="currentColor" strokeWidth="1.4" /><path d="M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></> },
  { tone: 'topic-purple', icon: <><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4" /><path d="M10 7v3l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></> },
  { tone: 'topic-teal', icon: <><path d="M3 10l7-7 7 7v7a1 1 0 01-1 1H4a1 1 0 01-1-1v-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M8 18v-5h4v5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></> },
];

export default function ChatPage() {
  const notify = useToast();
  const [boot, setBoot] = useState<ChatBoot | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const sessionKey = useRef<string>(localStorage.getItem(SESSION_KEY) ?? '');
  const bottom = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const data = await api.chat.boot();
        setBoot(data);
        setMessages((prev) =>
          prev.length > 0 ? prev : [{ id: 'greeting', role: 'bot', text: data.assistant.greeting }],
        );
      } catch {
        notify('Backend belum siap — jalankan npm run dev');
      }
    })();
  }, [notify]);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  const send = async (text: string) => {
    const question = text.trim();
    if (question.length < 2 || sending) return;

    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', text: question }]);
    setDraft('');
    setSending(true);

    try {
      const answer = await api.chat.send({
        message: question,
        sessionKey: sessionKey.current || undefined,
      });
      sessionKey.current = answer.sessionKey;
      localStorage.setItem(SESSION_KEY, answer.sessionKey);
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          role: 'bot',
          text: answer.answer,
          source: answer.source,
          citations: answer.citations,
          confidence: answer.confidence,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: 'bot',
          text: error instanceof Error ? `Maaf, terjadi kendala: ${error.message}` : 'Maaf, terjadi kendala teknis.',
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const resetChat = () => {
    sessionKey.current = '';
    localStorage.removeItem(SESSION_KEY);
    setMessages(boot ? [{ id: 'greeting', role: 'bot', text: boot.assistant.greeting }] : []);
    setDraft('');
    notify('Percakapan baru dimulai');
  };

  const starters = boot?.starters ?? [
    'Bagaimana cara mengajukan sertifikasi halal untuk UMKM?',
    'Apa itu self declare?',
    'Dokumen apa saja yang perlu disiapkan?',
  ];

  return (
    <section className="view active" id="view-chat">
      <div className="page-title-row">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot"></span> ASISTEN CERDAS KHB</div>
          <h1>Chat Edukasi Halal</h1>
          <p className="subheading">Jawaban dari dokumen KHB; pertanyaan di luar itu dijawab dari pengetahuan umum.</p>
        </div>
        <div className="chat-head-actions">
          <span className="online-pill"><i></i> {sending ? 'Mengetik…' : 'Asisten online'}</span>
          <button className="btn btn-secondary btn-sm" onClick={resetChat} title="Mulai percakapan baru">
            <svg viewBox="0 0 20 20" fill="none"><path d="M4 10a6 6 0 106-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M10 1.5V5h3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Percakapan baru
          </button>
        </div>
      </div>

      <div className="chat-layout">
        <aside className="chat-topics panel" id="chat-topics">
          <div className="chat-topics-head">
            <h3>Topik populer</h3>
          </div>
          <p>Pilih topik untuk memulai percakapan</p>
          {starters.map((starter, index) => {
            const look = TOPIC_ICONS[index % TOPIC_ICONS.length];
            return (
              <button key={`${index}-${starter}`} className="topic-btn" onClick={() => void send(starter)}>
                <span className={`topic-icon ${look.tone}`}>
                  <svg viewBox="0 0 20 20" fill="none">{look.icon}</svg>
                </span>
                <span><strong>{starter}</strong><small>Kirim sebagai pertanyaan</small></span>
                <b>→</b>
              </button>
            );
          })}
          <div className="chat-disclaimer">
            ⓘ Jawaban AI bersifat edukatif. Untuk informasi resmi, rujuk BPJPH/SIHALAL.
          </div>
        </aside>

        <div className="chat-window panel">
          <div className="chat-window-head">
            <div className="bot-avatar">{BOT_AVATAR}</div>
            <div>
              <strong>{boot?.assistant.name ?? 'Asisten Halal KHB'}</strong>
              <small><i></i> {boot?.capabilities.rag ? 'RAG + pengetahuan umum' : 'Pengetahuan umum'}</small>
            </div>
          </div>

          <div className="messages" id="messages">
            <div className="day-divider"><span>Hari ini</span></div>
            {messages.map((message) =>
              message.role === 'bot' ? (
                <div className="message-row bot-row" key={message.id}>
                  <div className="message-avatar">{BOT_AVATAR}</div>
                  <div className="message-content">
                    <span className="sender-name">{boot?.assistant.name ?? 'Asisten Halal KHB'}</span>
                    <div className="message-bubble">
                      <MarkdownText text={message.text} />
                      {message.source && message.source !== 'none' ? (
                        <span className="message-time" style={{ display: 'block', marginTop: 6 }}>
                          {SOURCE_LABEL[message.source]}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="message-row user-row" key={message.id}>
                  <div className="message-content" style={{ marginLeft: 'auto' }}>
                    <div className="message-bubble"><MarkdownText text={message.text} /></div>
                  </div>
                </div>
              ),
            )}
            {sending ? (
              <div className="message-row bot-row">
                <div className="message-avatar">{BOT_AVATAR}</div>
                <div className="message-content">
                  <div className="message-bubble">Sedang mencari jawaban…</div>
                </div>
              </div>
            ) : null}
            <div ref={bottom}></div>
          </div>

          <div className="suggested-prompts">
            <span>Coba tanyakan:</span>
            {['Apa itu self declare?', 'Berapa biaya sertifikasi?', 'Apa beda halal dan thayyib?'].map((prompt) => (
              <button key={prompt} onClick={() => void send(prompt)}>{prompt}</button>
            ))}
          </div>

          <form
            className="chat-input-row"
            onSubmit={(event) => {
              event.preventDefault();
              void send(draft);
            }}
          >
            <textarea
              rows={1}
              placeholder="Tulis pertanyaan seputar halal..."
              aria-label="Tulis pesan"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  void send(draft);
                }
              }}
            />
            <MicButton
              onText={(text) => setDraft((prev) => (prev.trim().length > 0 ? `${prev.trim()} ${text}` : text))}
              onError={(message) => notify(message, 3600)}
            />
            <button className="send-button" type="submit" aria-label="Kirim pesan" disabled={sending}>
              <svg viewBox="0 0 20 20" fill="none"><path d="M4 10l12-6-6 12V10H4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
            </button>
          </form>
          <div className="input-footnote">
            AI dapat membuat kesalahan. Periksa kembali informasi penting. <span>Didukung Komunitas Halal Bandung</span>
          </div>
        </div>
      </div>
    </section>
  );
}
