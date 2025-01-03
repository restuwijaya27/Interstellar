"use client";

import { MenuSquare, BookOpen } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import NavbarMobile from "~/components/navbars/navbar-mobile";
import Link from "next/link";

interface Props {
  role: string | undefined;
}

export default function NavbarMain({ role }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-amber-500/20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-slate-900 to-black backdrop-blur-xl">
      <div className="mx-auto max-w-[2000px]">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left Section - Logo & Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link
              href="/"
              className="flex min-w-[80px] items-center gap-2 transition-transform hover:scale-105"
            >
              <BookOpen className="h-5 w-5 flex-shrink-0 text-amber-400" />
              <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-lg font-bold text-transparent">
                SIP
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center space-x-4 md:flex">
              <Link href="/">
                <span className="cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-300 transition-all duration-300 hover:bg-amber-500/10 hover:text-amber-300">
                  Beranda
                </span>
              </Link>

              <Link
                href={`/dashboard/${role === "admin" ? "admin" : "mahasiswa"}`}
              >
                <span className="cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-300 transition-all duration-300 hover:bg-amber-500/10 hover:text-amber-300">
                  Dashboard
                </span>
              </Link>

              {role !== "admin" && (
                <Link href="/dashboard/buku">
                  <span className="cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-300 transition-all duration-300 hover:bg-amber-500/10 hover:text-amber-300">
                    Buku
                  </span>
                </Link>
              )}
            </div>
          </div>

          {/* Right Section - User Menu & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Role Badge */}
            <span className="hidden rounded-full border border-amber-500/20 bg-black/40 px-4 py-1.5 text-sm font-medium text-amber-300 md:block">
              {role === "admin" ? "Administrator" : "Mahasiswa"}
            </span>

            {/* User Button */}
            <div className="flex items-center">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8 ring-1 ring-amber-500/20",
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {open && (
          <div className="border-t border-amber-500/20 bg-black/90 backdrop-blur-xl md:hidden">
            <NavbarMobile role={role} open={open} setOpen={setOpen} />
          </div>
        )}
      </div>
    </nav>
  );
}
