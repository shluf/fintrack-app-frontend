'use client';

import { Button } from '@/components/ui/button';
import { authApi } from '@/lib/api';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();

  const handleLogout = () => {
    authApi.clearUserInfo();
    router.push('/login');
  };

  return (
    <header className="h-16 border-b border-green-button flex items-center justify-between mx-6">
      <a href="https://www.freepnglogos.com/images/f-letter-logo-png-1555.html">
      <Image alt='logo' width={52} height={52} src={"/assets/icon-192x192.png"} />
      </a>
      <Button className='border-l-4 border-green-button' size="icon" variant="ghost" onClick={handleLogout}>
        <LogOut />
      </Button>
    </header>
  );
}