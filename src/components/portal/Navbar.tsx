"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Images } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface NavbarProps {
  variant?: "hero" | "solid"
}

const NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Informasi", href: "/informasi" },
  { label: "Kalender", href: "/kalender" },
  { label: "Layanan", href: "#layanan" },
]

export function Navbar({ variant = "solid" }: NavbarProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isHeroTop = variant === "hero" && !isScrolled

  return (
    <header
      className={cn(
        "z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pt-4 px-4 sm:px-6",
        variant === "hero" ? "fixed top-0 inset-x-0" : "sticky top-0 w-full",
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isHeroTop
            ? "max-w-7xl h-14 px-3 sm:px-5 bg-white/8 backdrop-blur-md border border-[#BE900B]/35"
            : "max-w-[1200px] h-15 px-4 sm:px-6 bg-[#803AB3]/85 backdrop-blur-xl border border-[#BE900B]/55 shadow-[0_12px_32px_-8px_rgba(23,9,38,0.45)]",
        )}
      >
        {/* Left: Brand */}
        <Link
          href="/"
          className="inline-flex items-center rounded-full px-3 py-2 shadow-xs transition-transform duration-300 hover:scale-[1.02] shrink-0"
        >
          <img
            src="/logo-uisb.png"
            alt="Universitas Islam Sumatera Barat (UISB)"
            className="h-10 sm:h-15 w-auto object-contain"
          />
        </Link>

        {/* Center: Nav Links (Desktop) */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-1 rounded-full px-1.5 py-1 bg-white/12 border border-white/15 text-white"
        >
          {NAV_ITEMS.map((item) => {
            const hasLayananOnPage =
              pathname === "/mahasiswa" || pathname === "/dosen"
            const resolvedHref =
              item.href === "#layanan" && !hasLayananOnPage
                ? "/mahasiswa#layanan"
                : item.href
            const isActive =
              item.href === "/"
                ? pathname === "/" || pathname === "/mahasiswa"
                : item.href !== "#layanan" && pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={resolvedHref}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                  isActive
                    ? "bg-[#BE900B] text-white shadow-2xs"
                    : "text-white/85 hover:text-white hover:bg-white/10",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Right: Single Aktivitas Action Pill */}
        <div className="hidden md:flex items-center shrink-0">
          <Link
            href="/aktivitas"
            className={cn(
              buttonVariants({ size: "sm" }),
              "rounded-full px-5 font-semibold inline-flex items-center gap-2 bg-[#BE900B] text-white hover:bg-[#a67d09] transition-all shadow-xs",
            )}
          >
            <Images className="w-4 h-4 text-white" />
            Aktivitas
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Buka menu navigasi"
                  className="rounded-full bg-white/15 text-white hover:bg-white/25 border border-white/20"
                />
              }
            >
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center text-left">
                  <img
                    src="/logo-uisb.png"
                    alt="Universitas Islam Sumatera Barat (UISB)"
                    className="h-8 w-auto object-contain"
                  />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-2">
                {NAV_ITEMS.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : item.href !== "/#layanan" &&
                        pathname.startsWith(item.href)

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted",
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
                <div className="my-3 border-t border-border" />
                <Link
                  href="/aktivitas"
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-between"
                >
                  Dokumentasi Aktivitas
                  <Images className="w-4 h-4" />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
