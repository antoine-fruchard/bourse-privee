import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  as?: "div" | "article" | "section";
};

export function Card({ children, className, interactive = false, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn(
        "bg-white rounded-[var(--radius-lg)] border border-[var(--gris-3)] shadow-[var(--shadow-xs)]",
        interactive &&
          "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] hover:border-[var(--violet-200)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

export function CardHeader({
  children,
  className,
  title,
  subtitle,
  action,
}: {
  children?: ReactNode;
  className?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}) {
  if (children) {
    return <div className={cn("p-6 pb-0", className)}>{children}</div>;
  }
  return (
    <div className={cn("p-6 pb-0 flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        {title && <h3 className="text-xl font-bold tracking-tight">{title}</h3>}
        {subtitle && <p className="text-[var(--gris-1)] text-[15px] mt-1">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "px-6 py-4 border-t border-[var(--gris-3)] flex items-center justify-between gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}
