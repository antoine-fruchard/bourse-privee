import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  action,
  align = "left",
  variant = "default",
  className,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  action?: ReactNode;
  align?: "left" | "center";
  variant?: "default" | "dark" | "soft";
  className?: string;
  children?: ReactNode;
}) {
  const variants = {
    default: "bg-white",
    dark: "bg-[var(--noir)] text-white",
    soft: "gradient-soft",
  };
  return (
    <section className={cn("relative", variants[variant], className)}>
      <div
        className={cn(
          "container-app py-12 lg:py-16",
          align === "center" && "text-center"
        )}
      >
        {breadcrumbs && (
          <nav
            className={cn(
              "flex items-center gap-1.5 text-sm mb-6 flex-wrap",
              variant === "dark" ? "text-white/70" : "text-[var(--gris-1)]",
              align === "center" && "justify-center"
            )}
            aria-label="Fil d'Ariane"
          >
            {breadcrumbs.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1.5">
                {c.href ? (
                  <Link
                    href={c.href}
                    className={cn(
                      "hover:text-[var(--violet-500)]",
                      variant === "dark" && "hover:text-white"
                    )}
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span
                    className={cn(
                      "font-semibold",
                      variant === "dark" ? "text-white" : "text-[var(--color-text)]"
                    )}
                  >
                    {c.label}
                  </span>
                )}
                {i < breadcrumbs.length - 1 && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
              </span>
            ))}
          </nav>
        )}
        <div
          className={cn(
            "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
            align === "center" && "lg:flex-col lg:items-center"
          )}
        >
          <div className="max-w-3xl">
            {eyebrow && (
              <span
                className={cn(
                  "inline-block px-3 py-1 mb-3 rounded-full text-xs font-bold uppercase tracking-widest",
                  variant === "dark"
                    ? "bg-white/10 text-white"
                    : "bg-[var(--violet-50)] text-[var(--violet-700)]"
                )}
              >
                {eyebrow}
              </span>
            )}
            <h1
              className={cn(
                "text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05]"
              )}
            >
              {title}
            </h1>
            {description && (
              <p
                className={cn(
                  "mt-4 text-lg leading-relaxed",
                  variant === "dark" ? "text-white/80" : "text-[var(--gris-1)]"
                )}
              >
                {description}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
