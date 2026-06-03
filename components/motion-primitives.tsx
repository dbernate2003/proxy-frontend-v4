"use client"

import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion"
import { forwardRef, ReactNode, useEffect, useState } from "react"

// Fade in animation wrapper
interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  duration?: number
}

export const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(
  ({ children, delay = 0, direction = "up", duration = 0.5, className, ...props }, ref) => {
    const directions = {
      up: { y: 20, x: 0 },
      down: { y: -20, x: 0 },
      left: { x: 20, y: 0 },
      right: { x: -20, y: 0 },
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, ...directions[direction] }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{
          duration,
          delay,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
FadeIn.displayName = "FadeIn"

// Staggered container for list animations
interface StaggerContainerProps {
  children: ReactNode
  staggerDelay?: number
  className?: string
}

export function StaggerContainer({ children, staggerDelay = 0.1, className }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger item for list animations
interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Scale on hover wrapper
interface ScaleOnHoverProps {
  children: ReactNode
  scale?: number
  className?: string
}

export function ScaleOnHover({ children, scale = 1.02, className }: ScaleOnHoverProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Animated counter
interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  decimals?: number
}

export function AnimatedCounter({
  value,
  duration = 1.5,
  prefix = "",
  suffix = "",
  className,
  decimals = 0,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      // Easing function (ease out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(easeOut * value)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return (
    <span className={className}>
      {prefix}
      {displayValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {suffix}
    </span>
  )
}

// Pulse animation
interface PulseProps {
  children: ReactNode
  className?: string
  color?: string
}

export function Pulse({ children, className, color = "oklch(0.75 0.15 195)" }: PulseProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        boxShadow: [
          `0 0 0 0 ${color.replace(")", " / 0.4)")}`,
          `0 0 0 10px ${color.replace(")", " / 0)")}`,
          `0 0 0 0 ${color.replace(")", " / 0)")}`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

// Shimmer effect for loading states
interface ShimmerProps {
  className?: string
  width?: string | number
  height?: string | number
}

export function Shimmer({ className, width, height }: ShimmerProps) {
  return (
    <div
      className={`relative overflow-hidden bg-muted rounded-lg ${className}`}
      style={{ width, height }}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.3 0.02 250 / 0.3), transparent)",
        }}
        animate={{ translateX: ["100%", "-100%"] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  )
}

// Card skeleton
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={`bg-card/50 border border-border/50 rounded-xl p-4 space-y-3 ${className}`}>
      <div className="flex items-center gap-3">
        <Shimmer className="w-10 h-10 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Shimmer className="h-4 w-3/4" />
          <Shimmer className="h-3 w-1/2" />
        </div>
      </div>
      <Shimmer className="h-3 w-full" />
      <Shimmer className="h-3 w-2/3" />
    </div>
  )
}

// Table skeleton
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-4 p-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Shimmer key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 p-3">
          {[1, 2, 3, 4, 5].map((j) => (
            <Shimmer key={j} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

// Chart skeleton
export function ChartSkeleton({ className }: { className?: string }) {
  return (
    <div className={`bg-card/50 border border-border/50 rounded-xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <Shimmer className="h-5 w-32" />
        <Shimmer className="h-8 w-24 rounded-md" />
      </div>
      <div className="flex items-end gap-2 h-40">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-muted rounded-t"
            initial={{ height: 0 }}
            animate={{ height: `${30 + Math.random() * 70}%` }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          />
        ))}
      </div>
    </div>
  )
}

// Empty state component
interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {icon && (
        <motion.div
          className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
        >
          {icon}
        </motion.div>
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>
      {action}
    </motion.div>
  )
}

// Success animation
interface SuccessAnimationProps {
  show: boolean
  message?: string
  onComplete?: () => void
}

export function SuccessAnimation({ show, message = "Completado", onComplete }: SuccessAnimationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => {
            setTimeout(() => onComplete?.(), 1500)
          }}
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              <motion.svg
                className="w-10 h-10 text-emerald-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.div>
            <motion.p
              className="text-lg font-semibold text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {message}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Floating animation for subtle movement
interface FloatingProps {
  children: ReactNode
  className?: string
  amplitude?: number
  duration?: number
}

export function Floating({ children, className, amplitude = 10, duration = 3 }: FloatingProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude / 2, amplitude / 2, -amplitude / 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

// Page transition wrapper
interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

// Glow button effect
interface GlowButtonProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function GlowButton({ children, className, glowColor = "oklch(0.75 0.15 195)" }: GlowButtonProps) {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity"
        style={{ background: `${glowColor}` }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {children}
    </motion.div>
  )
}
