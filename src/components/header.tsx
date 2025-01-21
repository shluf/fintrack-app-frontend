'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/login');
  };

  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-bold">Finance Tracker</h1>
      <Button variant="ghost" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}