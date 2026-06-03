"use client"

import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "active" | "completed" | "pending" | "cancelled" | "urgent"
  children: React.ReactNode
  className?: string
}

const statusStyles = {
  active: "bg-primary/20 text-primary border-primary/30",
  completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  urgent: "bg-red-500/20 text-red-400 border-red-500/30",
}

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        statusStyles[status],
        className
      )}
    >
      {children}
    </span>
  )
}
