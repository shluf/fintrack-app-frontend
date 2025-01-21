'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/transactions', label: 'Transactions' },
  { href: '/budget', label: 'Budget' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r p-4 space-y-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'block px-4 py-2 rounded-lg',
            pathname === item.href
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          )}
        >
          {item.label}
        </Link>
      ))}
    </aside>
  );
}