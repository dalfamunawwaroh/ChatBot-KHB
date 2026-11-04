import type { ReactNode } from 'react';

interface PageHeadProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export function PageHead({ eyebrow, title, subtitle, children }: PageHeadProps) {
  return (
    <div className="page-title-row">
      <div>
        {eyebrow ? (
          <div className="eyebrow">
            <span className="eyebrow-dot"></span> {eyebrow}
          </div>
        ) : null}
        <h1>{title}</h1>
        {subtitle ? <p className="subheading">{subtitle}</p> : null}
      </div>
      {children}
    </div>
  );
}

interface PanelProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function Panel({ title, subtitle, actions, children, className = '' }: PanelProps) {
  return (
    <section className={`panel ${className}`.trim()}>
      {title || actions ? (
        <div className="panel-heading">
          <div>
            {title ? <h2>{title}</h2> : null}
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
          {actions}
        </div>
      ) : null}
      {children}
    </section>
  );
}

interface FieldProps {
  label?: string;
  hint?: string;
  children: ReactNode;
}

export function Field({ label, hint, children }: FieldProps) {
  return (
    <label className="field">
      {label ? (
        <span
          style={{
            display: 'block',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '.4px',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: 6,
          }}
        >
          {label}
        </span>
      ) : null}
      {children}
      {hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  );
}

type BadgeTone = 'green' | 'amber' | 'red' | 'blue' | 'slate' | 'violet';

export function Badge({ tone = 'green', dot = false, children }: { tone?: BadgeTone; dot?: boolean; children: ReactNode }) {
  return (
    <span className={`badge-pill badge-${tone}`}>
      {dot ? <i></i> : null}
      {children}
    </span>
  );
}

export function Empty({ text = 'Belum ada data.' }: { text?: string }) {
  return <div className="empty-state">{text}</div>;
}

interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  desc?: string;
}

export function Toggle({ checked, onChange, label, desc }: ToggleProps) {
  return (
    <div className="switch-row">
      <div className="switch-copy">
        <strong>{label}</strong>
        {desc ? <span>{desc}</span> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`switch${checked ? ' on' : ''}`}
        onClick={() => onChange(!checked)}
      />
    </div>
  );
}

export const Icon = {
  plus: (
    <svg viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
  ),
  search: (
    <svg viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" /><path d="M15 15l-2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  download: (
    <svg viewBox="0 0 20 20" fill="none"><path d="M10 3v10M6 9l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 15h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  edit: (
    <svg viewBox="0 0 20 20" fill="none"><path d="M13 3l4 4-9 9H4v-4L13 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
  trash: (
    <svg viewBox="0 0 20 20" fill="none"><path d="M4 6h12M8 6V4h4v2M6 6l1 11h6l1-11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  check: (
    <svg viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" /><path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  doc: (
    <svg viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
  ),
  user: (
    <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  chat: (
    <svg viewBox="0 0 20 20" fill="none"><path d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H6l-4 3V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
  bolt: (
    <svg viewBox="0 0 20 20" fill="none"><path d="M11 2L4 11h5l-1 7 7-9h-5l1-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
  ),
  link: (
    <svg viewBox="0 0 20 20" fill="none"><path d="M7 8a4 4 0 015.7-.4l2 2a4 4 0 01-5.6 5.6l-1.1-1.1M9 12a4 4 0 01-5.7.4l-2-2a4 4 0 015.6-5.6l1.1 1.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  settings: (
    <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.5 4.5l1.5 1.5M14 14l1.5 1.5M4.5 15.5L6 14M14 6l1.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  ),
  arrow: (
    <svg viewBox="0 0 20 20" fill="none"><path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
};
