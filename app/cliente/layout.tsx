"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ProxyLogo } from "@/components/proxy-logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  PlusCircle, 
  ClipboardList, 
  History, 
  BarChart3, 
  CreditCard,
  Key,
  Settings,
  Bell,
  ChevronLeft,
  Menu
} from "lucide-react"

const sidebarItems = [
  { href: "/cliente", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/cliente/nueva-tarea", icon: PlusCircle, label: "Nueva Tarea" },
  { href: "/cliente/tareas-activas", icon: ClipboardList, label: "Tareas Activas" },
  { href: "/cliente/historial", icon: History, label: "Historial" },
  { href: "/cliente/reportes", icon: BarChart3, label: "Reportes" },
  { href: "/cliente/facturacion", icon: CreditCard, label: "Facturacion" },
  { href: "/cliente/api-keys", icon: Key, label: "API Keys" },
  { href: "/cliente/configuracion", icon: Settings, label: "Configuracion" },
]

export default function ClienteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notifications] = useState(3)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border",
          "hidden lg:flex"
        )}
        initial={false}
        animate={{ width: sidebarCollapsed ? 56 : 220 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Logo */}
        <div className={cn(
          "h-14 flex items-center border-b border-sidebar-border px-3",
          sidebarCollapsed ? "justify-center" : "justify-between"
        )}>
          <AnimatePresence mode="wait">
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <ProxyLogo size="small" />
              </motion.div>
            )}
          </AnimatePresence>
          <Button 
            variant="ghost" 
            size="icon"
            className="w-7 h-7"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <motion.div
              animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.div>
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/cliente" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors relative",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-primary" 
                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  sidebarCollapsed && "justify-center px-0"
                )}
              >
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary rounded-r-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <AnimatePresence mode="wait">
                  {!sidebarCollapsed && (
                    <motion.span 
                      className="text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            )
          })}
        </nav>

        {/* Back to landing */}
        <div className="p-3 border-t border-sidebar-border">
          <Link href="/">
            <Button 
              variant="ghost" 
              className={cn(
                "w-full text-xs",
                sidebarCollapsed && "px-0"
              )}
              size={sidebarCollapsed ? "icon" : "sm"}
            >
              {sidebarCollapsed ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                "Volver al inicio"
              )}
            </Button>
          </Link>
        </div>
      </motion.aside>

      {/* Main content */}
      <div 
        className={cn(
          "flex-1 flex flex-col transition-all duration-200",
          sidebarCollapsed ? "lg:ml-14" : "lg:ml-[220px]"
        )}
      >
        {/* Top bar */}
        <header className="h-14 border-b border-border/50 flex items-center justify-between px-4 bg-background/90 backdrop-blur-sm sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              className="lg:hidden w-8 h-8"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-4 h-4" />
            </Button>
            <div className="lg:hidden">
              <ProxyLogo size="small" />
            </div>
            <span className="hidden lg:block text-sm font-medium">Empresa Demo S.A.S</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-xs">
              <CreditCard className="w-3.5 h-3.5 text-primary" />
              <span className="font-medium text-primary">$2,450,000</span>
            </div>
            <Button variant="ghost" size="icon" className="relative w-8 h-8">
              <Bell className="w-4 h-4" />
              {notifications > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-destructive text-[9px] text-white flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
          </div>
        </header>

        {/* Mobile sidebar */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <motion.div 
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.aside 
                className="absolute inset-y-0 left-0 w-56 bg-sidebar border-r border-sidebar-border"
                initial={{ x: -224 }}
                animate={{ x: 0 }}
                exit={{ x: -224 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <div className="h-14 flex items-center justify-between border-b border-sidebar-border px-3">
                  <ProxyLogo size="small" />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="w-7 h-7"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                </div>
                <nav className="py-3 px-2 space-y-0.5">
                  {sidebarItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors",
                          isActive 
                            ? "bg-sidebar-accent text-sidebar-primary" 
                            : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50"
                        )}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    )
                  })}
                </nav>
              </motion.aside>
            </div>
          )}
        </AnimatePresence>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-5 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
