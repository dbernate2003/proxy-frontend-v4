"use client"

import { Shield, User } from "lucide-react"

export function ProxyLogo({ className = "", size = "default" }: { className?: string; size?: "small" | "default" | "large" }) {
  const sizes = {
    small: { icon: 16, text: "text-lg" },
    default: { icon: 24, text: "text-2xl" },
    large: { icon: 32, text: "text-4xl" },
  }

  const { icon, text } = sizes[size]

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <Shield className="text-primary" size={icon} strokeWidth={2} />
        <User 
          className="absolute text-primary" 
          size={icon * 0.5} 
          strokeWidth={2.5}
          style={{ 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)' 
          }}
        />
      </div>
      <span className={`font-bold tracking-tight ${text}`}>
        <span className="text-primary">PROXY</span>
      </span>
    </div>
  )
}
