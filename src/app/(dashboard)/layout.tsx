import { Header } from '@/components/header';
import { NavBar } from '@/components/navigation-bar';
import { MonthProvider } from '@/hooks/month-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="flex h-screen">
        <MonthProvider>
          <NavBar />
          <div className="flex w-full flex-col">
            <Header />
            <main className="flex-1 p-8 max-h-[calc(100vh-64px)] overflow-y-scroll">
              {children}
            </main>
          </div>
        </MonthProvider>
      </div>
    </div>
  );
}