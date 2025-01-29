import {
  Plus,
  LayoutDashboard,
  ArrowUpDown,
  Target,
  CalendarDays,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileNavItem } from "./mobile-nav-item";
import { MonthDropdown } from "./month-dropdown";
import { useState } from "react";
import Link from "next/link";


interface MobileNavProps {
  className?: string;
  pathname: string;
}

export function MobileNav({
  className,
  pathname
}: MobileNavProps) {
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);

  const navItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: ArrowUpDown,
      label: "Transactions",
      href: "/transactions",
    },
    {
      icon: Target,
      label: "Budget",
      href: "/budget",
    },

    {
      icon: CalendarDays,
      label: "Month",
      onClick: () => setIsMonthDropdownOpen(!isMonthDropdownOpen),
    },
  ];

  return (
    <>
      <MonthDropdown
        isOpen={isMonthDropdownOpen}
        onClose={() => setIsMonthDropdownOpen(false)}
        className="md:hidden"
      />

      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 md:hidden z-50",
          className
        )}
      >
        <div className="mx-4 mb-2">
          <div className="grid grid-cols-5 items-center bg-green-bar/60 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-green-bar/5">
            {navItems.slice(0, 2).map((item) => (
              <MobileNavItem
                key={item.label}
                isActive={pathname === item.href}
                {...item}
              />
            ))}

            <div className=" flex items-center justify-center">
              <Link href="/transactions?action=add" passHref>
                <button
                  className="flex items-center justify-center w-14 h-14 bg-zinc-700 rounded-xl shadow-lg hover:bg-zinc-800 transition-colors"
                  aria-label="Add new"
                >
                  <Plus className="w-7 h-7 text-white" />
                </button>
              </Link>
            </div>

            {navItems.slice(2).map((item) => (
              <MobileNavItem
                key={item.label}
                isActive={
                  item.label === "Budget"
                    ? pathname === item.href
                    : isMonthDropdownOpen
                }
                {...item}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
