import { cn } from "@/lib/utils"
import { ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"

interface NavItemProps {
  icon: LucideIcon
  label: string
  href: string
  isActive?: boolean
  className?: string
}

export function NavItem({ icon: Icon, label, href, isActive, className }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 px-4 py-3 text-slate-400",
        "hover:bg-slate-800/30 hover:text-emerald-400 rounded-xl",
        "transition-all duration-300",
        isActive && "bg-gradient-to-r from-emerald-500/20 to-cyan-400/10 border-l-4 border-emerald-400 text-emerald-400",
        className,
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
      {isActive && <ChevronRight className="ml-auto h-4 w-4 text-emerald-400" />}
    </Link>
  )
}

