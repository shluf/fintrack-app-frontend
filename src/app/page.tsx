"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowRight, BadgeCheck, BarChart, Clock, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white min-h-screen">
      <nav className="fixed w-full bg-[#0F172A]/90 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <a href="https://www.freepnglogos.com/images/f-letter-logo-png-1555.html">
              <Image
                alt="logo"
                width={52}
                height={52}
                src={"/assets/icon-192x192.png"}
                className="[filter:invert(61%)_sepia(55%)_saturate(4724%)_hue-rotate(125deg)_brightness(97%)_contrast(87%);]"
              />
            </a>
            <span className="text-2xl font-bold">FinTrack</span>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <Link
              href="#features"
              className="hover:text-emerald-500 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="hover:text-emerald-500 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="hover:text-emerald-500 transition-colors"
            >
              Testimonials
            </Link>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 ml-4"
              asChild
            >
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 container mx-auto px-6 h-screen flex items-center">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Take Control of Your
              <span className="text-emerald-500"> Financial Future</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Smart budgeting, expense tracking, and financial insights - all in
              one powerful platform.
            </p>
            <div className="flex space-x-4">
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 px-8 py-6 text-lg"
                asChild
              >
                <Link href="/dashboard">
                  Start for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
              <Image
                src={"/assets/preview.png"}
                alt="Dashboard Preview"
                width={700}
                height={400}
                className="relative z-10 rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-[#1E293B]">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Powerful Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#0F172A] rounded-xl hover:transform hover:-translate-y-2 transition-all">
              <BarChart className="h-12 w-12 text-emerald-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Real-time Analytics
              </h3>
              <p className="text-gray-400">
                Get instant insights into your spending patterns with
                interactive charts.
              </p>
            </div>

            <div className="p-6 bg-[#0F172A] rounded-xl hover:transform hover:-translate-y-2 transition-all">
              <Shield className="h-12 w-12 text-emerald-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Bank-level Security
              </h3>
              <p className="text-gray-400">
                Your financial data is protected with encryption.
              </p>
            </div>

            <div className="p-6 bg-[#0F172A] rounded-xl hover:transform hover:-translate-y-2 transition-all">
              <Clock className="h-12 w-12 text-emerald-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Easily manage transactions</h3>
              <p className="text-gray-400">
                Track and manage your financial transactions effortlessly with our intuitive interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>

          <div className="flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0">
            <div className="text-center md:w-1/3 px-6">
              <div className="mb-4 text-emerald-500 text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-3">Connect Accounts</h3>
              <p className="text-gray-400">
                Securely create your account.
              </p>
            </div>

            <div className="text-center md:w-1/3 px-6">
              <div className="mb-4 text-emerald-500 text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-3">Track & Categorize</h3>
              <p className="text-gray-400">
                Automatically categorize transactions and set budgets.
              </p>
            </div>

            <div className="text-center md:w-1/3 px-6">
              <div className="mb-4 text-emerald-500 text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-3">Optimize & Grow</h3>
              <p className="text-gray-400">
                Get personalized recommendations to improve your finances.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-[#1E293B]">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            What Users Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-[#0F172A] rounded-xl">
              <div className="flex items-center mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://ui-avatars.com/api/?name=Sarah+Jhonson"
                    alt="@user"
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-400">Financial Analyst</p>
                </div>
                <BadgeCheck className="text-emerald-500 ml-auto" />
              </div>
              <p className="text-gray-300">
              &quot;FinTrack completely transformed how I manage my finances. The
                insights helped me save 30% more monthly!&quot;
              </p>
            </div>

            <div className="p-8 bg-[#0F172A] rounded-xl">
              <div className="flex items-center mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://ui-avatars.com/api/?name=Mike+Chen"
                    alt="@user"
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h4 className="font-semibold">Mike Chen</h4>
                  <p className="text-sm text-gray-400">Entrepreneur</p>
                </div>
                <BadgeCheck className="text-emerald-500 ml-auto" />
              </div>
              <p className="text-gray-300">
              &quot;Finally a financial app that&pos;s both powerful and easy to use.
                The auto-sync feature is a game-changer!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#334155]">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <a href="https://www.freepnglogos.com/images/f-letter-logo-png-1555.html">
                  <Image
                    alt="logo"
                    width={42}
                    height={42}
                    src={"/assets/icon-192x192.png"}
                    className="[filter:invert(61%)_sepia(55%)_saturate(4724%)_hue-rotate(125deg)_brightness(97%)_contrast(87%);]"
                  />
                </a>
                <span className="text-xl font-bold">FinTrack</span>
              </div>
              <p className="text-gray-400">Empowering financial freedom</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#features" className="hover:text-emerald-500">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-emerald-500">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-emerald-500">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-emerald-500">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-emerald-500">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-emerald-500">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-emerald-500">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-emerald-500">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-emerald-500">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#334155] mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 FinTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}