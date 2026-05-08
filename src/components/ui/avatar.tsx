import { cn } from "@/lib/utils";

const palette = [
  "linear-gradient(135deg, #563BFF, #8E6BFF)",
  "linear-gradient(135deg, #FF7049, #FFA785)",
  "linear-gradient(135deg, #20C997, #5AD7B0)",
  "linear-gradient(135deg, #1E1863, #563BFF)",
  "linear-gradient(135deg, #4B5A6E, #8B95A7)",
  "linear-gradient(135deg, #0066CC, #4DA3FF)",
];

export function Avatar({
  initials,
  size = "md",
  className,
}: {
  initials: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const idx = (initials.charCodeAt(0) + initials.charCodeAt(1 < initials.length ? 1 : 0)) % palette.length;
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-bold text-white",
        sizes[size],
        className
      )}
      style={{ background: palette[idx] }}
    >
      {initials.slice(0, 2).toUpperCase()}
    </span>
  );
}
