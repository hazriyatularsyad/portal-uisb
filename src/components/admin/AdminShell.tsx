"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Calendar,
  ExternalLink,
  FileText,
  GraduationCap,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  RotateCcw,
  Settings,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAdmin } from "@/lib/admin-store"
import { cn } from "@/lib/utils"

const ADMIN_NAV = [
  { label: "Ringkasan", href: "/admin", icon: LayoutDashboard },
  { label: "Informasi", href: "/admin/konten", icon: FileText },
  { label: "Dosen", href: "/admin/dosen", icon: GraduationCap },
  { label: "Kalender", href: "/admin/kalender", icon: Calendar },
  { label: "Aktivitas", href: "/admin/aktivitas", icon: Images },
  { label: "Pengaturan", href: "/admin/pengaturan", icon: Settings },
]

export function AdminShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: React.ReactNode
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, logout, resetDemoData } = useAdmin()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/admin/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#e8ecf1] text-sm text-gray-500">
        Memeriksa sesi Super Admin...
      </div>
    )
  }

  const todayLabel = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date())

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between p-5 text-gray-900">
      <div className="space-y-8">
        <Link href="/admin" className="flex items-center gap-2.5 px-2">
          <img
            src="/logo-uisb.png"
            alt="UISB"
            className="h-17 w-auto object-contain"
          />
        </Link>

        <nav className="space-y-1.5">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium transition-all",
                  isActive
                    ? "bg-fuchsia-800 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Bottom Profile & Actions */}
      <div className="space-y-4 pt-4 border-t border-gray-100">
        <div className="flex flex-col items-center text-center gap-1.5 px-2">
          <div className="w-11 h-11 rounded-full bg-fuchsia-100 text-fuchsia-800 flex items-center justify-center relative">
            <ShieldCheck className="w-5 h-5" />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-amber-500 border-2 border-white" />
          </div>
          <p className="text-sm font-bold text-gray-900">Super Admin</p>
          <p className="text-[11px] text-gray-400">admin@uisb.ac.id</p>
        </div>

        <div className="space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-full text-xs font-medium text-gray-500 hover:text-[#803AB3] hover:bg-purple-50 transition-colors"
          >
            <span>Portal Publik</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetDemoData}
            className="w-full justify-start gap-2 rounded-full text-xs text-gray-500 hover:text-gray-900"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Data
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              logout()
              router.replace("/admin/login")
            }}
            className="w-full justify-start gap-2 rounded-full text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50"
          >
            <LogOut className="w-3.5 h-3.5" />
            Keluar
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F6F4FA] text-gray-900 p-3 sm:p-5 lg:p-6 flex gap-5">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,158,11,0.18),_transparent_50%)]"
      />
      {/* Floating Left Sidebar */}
      <aside className="relative z-10 hidden lg:block w-60 shrink-0 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/45 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)] sticky top-6 h-[calc(100vh-3rem)]">
        <SidebarContent />
      </aside>

      {/* Main Column */}
      <div className="relative z-10 flex-1 flex flex-col min-w-0 gap-5">
        {/* Floating Top Bar */}
        <header className="rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/45 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)] px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Menu admin"
                      className="rounded-full bg-gray-100 text-gray-800"
                    />
                  }
                >
                  <Menu className="w-4 h-4" />
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0 bg-white">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Navigasi Admin</SheetTitle>
                  </SheetHeader>
                  <SidebarContent />
                </SheetContent>
              </Sheet>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 truncate font-sans">
                {title}
              </h1>
              {description && (
                <p className="text-xs text-gray-500 truncate hidden sm:block">
                  {description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden md:inline-block text-xs font-medium text-gray-500 capitalize">
              {todayLabel}
            </span>
            {actions}
          </div>
        </header>

        {/* Main Workspace */}
        <main className="flex-1 space-y-5">{children}</main>
      </div>
    </div>
  )
}
