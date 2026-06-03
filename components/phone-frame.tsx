"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PhoneFrameProps {
  children: React.ReactNode
  className?: string
}

export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <motion.div 
      className={cn(
        "relative mx-auto w-[375px] h-[812px] bg-background rounded-[3rem] border-4 border-secondary overflow-hidden",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        boxShadow: `
          0 0 0 1px oklch(0.25 0.02 250),
          0 25px 50px -12px oklch(0 0 0 / 0.5),
          0 0 60px oklch(0.75 0.15 195 / 0.15),
          inset 0 0 30px oklch(0 0 0 / 0.1)
        `
      }}
    >
      {/* Animated glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-[3.5rem] opacity-50 blur-xl pointer-events-none"
        style={{
          background: "linear-gradient(135deg, oklch(0.75 0.15 195 / 0.3) 0%, transparent 50%, oklch(0.7 0.18 145 / 0.2) 100%)"
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Notch with camera and speaker */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-secondary rounded-b-3xl z-50 flex items-center justify-center gap-2">
        {/* Camera */}
        <div className="w-3 h-3 rounded-full bg-background/30 border border-background/20" />
        {/* Speaker */}
        <div className="w-16 h-1.5 rounded-full bg-background/20" />
      </div>
      
      {/* Side buttons - Volume */}
      <div className="absolute left-[-4px] top-32 w-1 h-8 bg-secondary rounded-l" />
      <div className="absolute left-[-4px] top-44 w-1 h-12 bg-secondary rounded-l" />
      <div className="absolute left-[-4px] top-60 w-1 h-12 bg-secondary rounded-l" />
      
      {/* Side button - Power */}
      <div className="absolute right-[-4px] top-44 w-1 h-16 bg-secondary rounded-r" />
      
      {/* Screen content */}
      <div className="relative h-full pt-8 pb-4 overflow-hidden bg-background">
        {children}
      </div>

      {/* Home indicator */}
      <motion.div 
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-muted-foreground/30 rounded-full z-50"
        whileHover={{ scaleX: 1.1 }}
        transition={{ type: "spring", stiffness: 400 }}
      />
      
      {/* Screen reflection effect */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-[2.8rem]"
        style={{
          background: "linear-gradient(135deg, oklch(1 0 0 / 0.03) 0%, transparent 50%)"
        }}
      />
    </motion.div>
  )
}
