import Link from 'next/link'
import { cn } from "@/lib/utils"
import { type LucideIcon } from "lucide-react"

interface MobileNavItemProps {
  icon: LucideIcon
  label: string
  href?: string
  isActive?: boolean
  onClick?: () => void
  className?: string
}

export function MobileNavItem({
  icon: Icon,
  label,
  href,
  isActive,
  onClick,
  className,
}: MobileNavItemProps) {
  const content = (
    <div
      className={cn(
        "group flex flex-col items-center px-1 gap-1.5 transition-all",
        isActive ? "text-emerald-400" : "text-slate-400",
        className
      )}
    >
      <span
        className={`flex justify-center items-center w-12 h-12 rounded-xl 
        ${
          isActive ? "bg-emerald-500/20 shadow-inner" : "hover:bg-slate-800/50"
        } 
        transition-all`}
      >
        <Icon
          className={`h-6 w-6 ${
            isActive ? "text-emerald-400" : "group-hover:text-emerald-300"
          }`}
        />
      </span>
      <span
        className={`text-[10px] sm:text-xs font-medium ${
          isActive ? "text-emerald-400" : "text-slate-400"
        }`}
      >
        {label}
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="focus:outline-none">
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="focus:outline-none">
      {content}
    </button>
  );
}