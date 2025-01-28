import React from "react";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ArrowUpDown, Target } from "lucide-react";
import { NavItem } from "./desktop-nav-item";
import { MonthGrid } from "../month-grid";
import { useMonthContext } from "@/hooks/month-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DesktopNavProps {
  className?: string;
  pathname: string;
}

const DesktopNav = ({
  className,
  pathname,
}: DesktopNavProps) => {
  const { selectedMonth, setSelectedMonth } = useMonthContext();

  const menuItems = [
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
  ];

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col pt-3 w-[360px] bg-green-bar text-white rounded-2xl m-4",
        "border border-zinc-800/50 shadow-xl",
        className
      )}
    >
      <div className="p-4">
      <div className="flex items-center gap-2 rounded-lg bg-green-button shadow-inner p-2">
      <Avatar className="h-8 w-8">
        <AvatarImage
          src="https://ui-avatars.com/api/?name=Admin"
          alt="@user"
        />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <p className="text-sm font-medium leading-none text-green-bar">Admin</p>
        <p className="text-xs leading-none text-green-900">admin@admin.com</p>
      </div>
    </div>
      </div>

      <nav className="flex-1 py-6 space-y-1">
        {menuItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname === item.href}
          />
        ))}
      </nav>

      <MonthGrid
        selectedMonth={selectedMonth}
        onSelectMonth={(month) => {
          setSelectedMonth({ ...selectedMonth, month })
        }}
        onSelectYear={(year) => {
          setSelectedMonth({ ...selectedMonth, year })
        }}
        className="py-6"
      />

      <div className="p-6 text-center border-t border-zinc-800">
        <p className="text-xs text-gray-400 hover:text-white">
          Today is {new Date().toLocaleString("default", { weekday: "long" })},{" "}
          {new Date().toLocaleString("default", { month: "long" })}{" "}
          {new Date().getDate()}, {new Date().getFullYear()}.
        </p>
      </div>
    </aside>
  );
};

export default DesktopNav;
