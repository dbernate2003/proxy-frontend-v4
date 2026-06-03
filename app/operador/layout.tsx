"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { PhoneFrame } from "@/components/phone-frame"
import { ProxyLogo } from "@/components/proxy-logo"
import { cn } from "@/lib/utils"
import { Home, ClipboardList, Wallet, MessageSquare, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/operador", icon: Home, label: "Inicio" },
  { href: "/operador/tareas", icon: ClipboardList, label: "Tareas" },
  { href: "/operador/billetera", icon: Wallet, label: "Billetera" },
  { href: "/operador/chat", icon: MessageSquare, label: "Chat" },
  { href: "/operador/perfil", icon: User, label: "Perfil" },
]

export default function OperadorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-6">
      {/* Desktop header */}
      <motion.div 
        className="w-full max-w-5xl mx-auto px-4 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <ProxyLogo size="small" />
          </Link>
          <span className="text-xs text-muted-foreground">App de Operadores</span>
          <Button variant="ghost" size="sm" className="text-xs" asChild>
            <Link href="/cliente">Panel de Clientes</Link>
          </Button>
        </div>
      </motion.div>

      {/* Phone frame container */}
      <motion.div 
        className="flex-1 flex items-start justify-center"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <PhoneFrame>
          <div className="flex flex-col h-full">
            {/* Screen content */}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>

            {/* Bottom navigation */}
            <nav className="flex-shrink-0 border-t border-border/50 bg-background/95 backdrop-blur-sm px-1 py-1.5">
              <div className="flex items-center justify-around">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== "/operador" && pathname.startsWith(item.href))
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors relative min-w-[52px]",
                        isActive 
                          ? "text-primary" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-primary/10 rounded-lg"
                          layoutId="navActiveBackground"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <div className="relative">
                        <item.icon className="w-4 h-4" />
                        {item.label === "Chat" && (
                          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-primary rounded-full" />
                        )}
                      </div>
                      <span className="text-[9px] font-medium relative">{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </nav>
          </div>
        </PhoneFrame>
      </motion.div>
    </div>
  )
}
