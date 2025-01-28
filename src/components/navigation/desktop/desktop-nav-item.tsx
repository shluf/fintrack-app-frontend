import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
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
        "flex items-center gap-3 px-6 py-2.5 text-gray-400 hover:text-white hover:bg-zinc-800/50 transition-colors rounded-lg mx-3",
        isActive && "text-white bg-zinc-800/50",
        className,
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </Link>
  )
}

