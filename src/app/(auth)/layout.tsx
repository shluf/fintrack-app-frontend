import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-b from-[#0F172A] to-[#1E293B] min-h-screen">
      <nav className="fixed w-full bg-[#0F172A]/90 backdrop-blur-md z-50">
        <div className="container flex justify-center mx-auto px-6 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              alt="logo"
              width={52}
              height={52}
              src="/assets/icon-192x192.png"
              className="[filter:invert(61%)_sepia(55%)_saturate(4724%)_hue-rotate(125deg)_brightness(97%)_contrast(87%);]"
            />
            <span className="text-2xl font-bold text-white">FinTrack</span>
          </Link>
        </div>
      </nav>
      <main className="min-h-screen flex items-center justify-center px-6">
        {children}
      </main>
    </div>
  );
}
