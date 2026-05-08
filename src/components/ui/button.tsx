import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 focus-visible:outline-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-[var(--shadow-violet)]",
  secondary:
    "bg-[var(--violet-50)] text-[var(--violet-700)] hover:bg-[var(--violet-100)]",
  ghost:
    "text-[var(--color-text)] hover:bg-[var(--gris-4)]",
  outline:
    "border border-[var(--gris-3)] text-[var(--color-text)] hover:border-[var(--violet-500)] hover:text-[var(--violet-500)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
};

type ButtonProps = CommonProps & ComponentPropsWithoutRef<"button">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, leadingIcon, trailingIcon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {leadingIcon}
        {children}
        {trailingIcon}
      </button>
    );
  }
);
Button.displayName = "Button";

type LinkButtonProps = CommonProps & {
  href: string;
  external?: boolean;
};

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  leadingIcon,
  trailingIcon,
  children,
  href,
  external,
}: LinkButtonProps) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer">
        {leadingIcon}
        {children}
        {trailingIcon}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {leadingIcon}
      {children}
      {trailingIcon}
    </Link>
  );
}
