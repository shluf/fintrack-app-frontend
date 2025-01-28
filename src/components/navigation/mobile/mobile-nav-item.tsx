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
  className 
}: MobileNavItemProps) {
  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "group flex flex-col items-center px-1 gap-1.5 text-gray-300 transition-colors text-center",
          isActive && "text-zinc-800",
          className,
        )}
      >
        <span className={`flex justify-center items-center group-hover:bg-zinc-600 w-full rounded-full py-1 ${isActive && "bg-zinc-800"}`}>
          <Icon className={`h-6 w-6 group-hover:text-white ${isActive && "text-white"}`} />
        </span>
        <span className={`text-xs font-medium ${isActive && "text-white"}`}>{label}</span>
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex flex-col items-center px-1 gap-1.5 text-gray-300 transition-colors text-center",
        isActive && "text-zinc-800",
        className,
      )}
    >
      <span className={`flex justify-center items-center group-hover:bg-zinc-600 w-full rounded-full py-1 ${isActive && "bg-zinc-800"}`}>
        <Icon className={`h-6 w-6 group-hover:text-white ${isActive && "text-white"}`} />
      </span>
      <span className={`text-xs font-medium ${isActive && "text-white"}`}>{label}</span>
    </button>
  )
}