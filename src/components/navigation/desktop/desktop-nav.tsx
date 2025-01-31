import React from "react";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ArrowUpDown, Target } from "lucide-react";
import { NavItem } from "./desktop-nav-item";
import { MonthGrid } from "../month-grid";
import { useMonthContext } from "@/hooks/month-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authApi } from "@/lib/api";

interface DesktopNavProps {
  className?: string;
  pathname: string;
}

const DesktopNav = ({
  className,
  pathname,
}: DesktopNavProps) => {
  const { selectedMonth, setSelectedMonth } = useMonthContext();
  const user = authApi.getUserInfo();

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
        "hidden md:flex flex-col pt-3 w-[360px] bg-[#0F172A] rounded-2xl m-4",
        "border border-slate-800/50 shadow-2xl backdrop-blur-lg",
        className
      )}
    >
      <div className="p-4">
        <div className="flex items-center gap-3 rounded-xl bg-slate-900/50 p-3 border border-slate-800/50">
          <Avatar className="h-10 w-10 border-2 border-emerald-500/20">
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}`}
              alt="@user"
            />
            <AvatarFallback className="bg-slate-800 text-emerald-400">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'US'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-slate-200">{user?.name || '...'}</p>
            <p className="text-xs text-slate-400/80">{user?.email || '...'}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-6 space-y-2 px-3">
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
          setSelectedMonth({ ...selectedMonth, month });
        }}
        onSelectYear={(year) => {
          setSelectedMonth({ ...selectedMonth, year });
        }}
        className="py-6"
      />

      <div className="p-6 text-center border-t border-slate-800/50">
        <p className="text-xs bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
          Today is {new Date().toLocaleString("default", { weekday: "long" })},{" "}
          {new Date().toLocaleString("default", { month: "long" })}{" "}
          {new Date().getDate()}, {new Date().getFullYear()}.
        </p>
      </div>
    </aside>
  );
};

export default DesktopNav;
