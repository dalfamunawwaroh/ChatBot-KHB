import React from "react";

export type IconTileVariant = "light" | "dark" | "gold";

interface IconTileProps {
  icon: React.ReactNode;
  variant: IconTileVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function IconTile({ icon, variant, size = "md", className = "" }: IconTileProps) {
  const sizeClasses =
    size === "sm"
      ? "w-[2.28rem] h-[2.28rem] rounded-lg"
      : size === "lg"
      ? "w-[2.85rem] h-[2.85rem] rounded-xl"
      : "w-[2.57rem] h-[2.57rem] rounded-[0.85rem]";

  const style: React.CSSProperties =
    variant === "light"
      ? {
          background: "linear-gradient(135deg, #16a34a 0%, #0f8a4d 55%, #0f7a3d 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.30), 0 8px 18px rgba(11,92,48,0.22)",
        }
      : variant === "gold"
      ? {
          background: "linear-gradient(135deg, #e2b53a 0%, #d4a017 55%, #b8860b 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), 0 8px 18px rgba(180,134,11,0.22)",
        }
      : {
          background: "rgba(134,239,172,0.12)",
          border: "1px solid rgba(134,239,172,0.25)",
        };

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-0.5 ${sizeClasses} ${className}`}
      style={style}
    >
      {variant !== "dark" && (
        <div
          className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)",
          }}
        />
      )}
      <div className="relative z-10 flex items-center justify-center">{icon}</div>
    </div>
  );
}
