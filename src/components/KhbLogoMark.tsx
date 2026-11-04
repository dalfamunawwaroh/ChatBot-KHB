interface KhbLogoMarkProps {
  size?: number | string;
  className?: string;
}

export default function KhbLogoMark({ size = "1.5rem", className = "" }: KhbLogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`shrink-0 overflow-visible ${className}`}
    >
      <defs>
        <linearGradient id="khbLogoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="55%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#0f7a3d" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill="url(#khbLogoGrad)" />
      <path
        d="M24 9 37.5 14.2v9.6c0 8.1-5.6 13.1-13.5 16.2C16.1 36.9 10.5 31.9 10.5 23.8v-9.6L24 9Z"
        fill="#ffffff"
        fillOpacity="0.22"
      />
      <path
        d="m16.5 24 5.3 5.2L32 18.6"
        stroke="#ffffff"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
