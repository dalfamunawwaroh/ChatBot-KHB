interface NoiseOverlayProps {
  className?: string;
}

export default function NoiseOverlay({ className = "opacity-[0.06]" }: NoiseOverlayProps) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <filter id="khbNoiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#khbNoiseFilter)" />
    </svg>
  );
}
