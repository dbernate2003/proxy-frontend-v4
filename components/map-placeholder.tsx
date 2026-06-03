"use client"

import { cn } from "@/lib/utils"
import { MapPin } from "lucide-react"

interface MapPlaceholderProps {
  className?: string
  pins?: { x: number; y: number; active?: boolean; label?: string }[]
  showOperator?: boolean
  operatorPosition?: { x: number; y: number }
}

export function MapPlaceholder({ 
  className, 
  pins = [], 
  showOperator = false,
  operatorPosition = { x: 50, y: 50 }
}: MapPlaceholderProps) {
  return (
    <div className={cn(
      "relative w-full h-full min-h-[200px] bg-secondary/50 rounded-lg overflow-hidden map-grid",
      className
    )}>
      {/* Simulated streets */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-muted-foreground/20" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-muted-foreground/20" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-muted-foreground/20" />
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-muted-foreground/20" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-muted-foreground/20" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-muted-foreground/20" />
      </div>

      {/* Map pins */}
      {pins.map((pin, index) => (
        <div
          key={index}
          className="absolute transform -translate-x-1/2 -translate-y-full"
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
        >
          <div className="relative">
            <MapPin 
              className={cn(
                "w-6 h-6",
                pin.active ? "text-primary" : "text-muted-foreground"
              )} 
              fill={pin.active ? "currentColor" : "none"}
            />
            {pin.active && (
              <div className="absolute inset-0 animate-ping-dot">
                <MapPin className="w-6 h-6 text-primary opacity-50" />
              </div>
            )}
          </div>
          {pin.label && (
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
              {pin.label}
            </span>
          )}
        </div>
      ))}

      {/* Animated operator dot */}
      {showOperator && (
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ 
            left: `${operatorPosition.x}%`, 
            top: `${operatorPosition.y}%`,
            transition: 'all 0.5s ease-in-out'
          }}
        >
          <div className="relative">
            <div className="w-4 h-4 bg-primary rounded-full border-2 border-background" />
            <div className="absolute inset-0 w-4 h-4 bg-primary rounded-full animate-ping-dot opacity-50" />
          </div>
        </div>
      )}

      {/* Location label */}
      <div className="absolute bottom-2 left-2 px-2 py-1 bg-background/80 rounded text-xs text-muted-foreground">
        Bogota, Colombia
      </div>
    </div>
  )
}
