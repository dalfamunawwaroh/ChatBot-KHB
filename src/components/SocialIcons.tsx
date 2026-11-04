type IconProps = {
  className?: string;
  strokeWidth?: number;
};

export function InstagramIcon({ className = "w-6 h-6", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon({ className = "w-6 h-6", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-6 h-6", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.7-4.8A8.5 8.5 0 1 1 21 11.5Z" />
      <path d="M8.8 8.2c.3-.6.7-.6 1-.6h.5c.2 0 .4 0 .6.5l.7 1.6c.1.3 0 .5-.1.7l-.4.5c-.1.2-.2.3 0 .6.3.5.8 1.1 1.3 1.5.5.4 1 .6 1.3.7.2.1.4 0 .5-.1l.5-.6c.2-.2.3-.2.6-.1l1.5.8c.3.1.4.2.4.4 0 .2 0 .9-.4 1.3-.4.4-1 .8-1.7.8-1.3 0-2.7-.8-3.9-2-1.2-1.2-2-2.6-2-3.9 0-.7.3-1.2.6-1.6Z" />
    </svg>
  );
}

export function TikTokIcon({ className = "w-6 h-6", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 3v9.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 5.5A4.5 4.5 0 0 0 18.5 10" />
    </svg>
  );
}
