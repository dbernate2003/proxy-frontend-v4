"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  Camera, 
  Video, 
  PenTool, 
  MessageSquare,
  MapPin,
  Clock,
  CheckCircle,
  X,
  Plus,
  Play,
  Pause,
  Download,
  ZoomIn,
  Image as ImageIcon,
  FileText
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface EvidenceItem {
  id: string
  type: "photo" | "video" | "signature" | "comment" | "location"
  url?: string
  content?: string
  label?: string
  timestamp: string
  coordinates?: { lat: number; lng: number }
  verified?: boolean
}

interface EvidenceViewerProps {
  evidence: EvidenceItem[]
  onAddEvidence?: (type: EvidenceItem["type"]) => void
  readOnly?: boolean
  className?: string
}

const evidenceTypeConfig = {
  photo: {
    icon: Camera,
    label: "Fotografia",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10"
  },
  video: {
    icon: Video,
    label: "Video",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10"
  },
  signature: {
    icon: PenTool,
    label: "Firma Digital",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10"
  },
  comment: {
    icon: MessageSquare,
    label: "Comentario",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10"
  },
  location: {
    icon: MapPin,
    label: "Ubicacion",
    color: "text-red-400",
    bgColor: "bg-red-500/10"
  }
}

// Mock evidence data for demo purposes
export const mockEvidence: EvidenceItem[] = [
  {
    id: "ev-1",
    type: "photo",
    label: "Fachada del local",
    timestamp: "14:32",
    verified: true
  },
  {
    id: "ev-2",
    type: "photo",
    label: "Documento recibido",
    timestamp: "14:35",
    verified: true
  },
  {
    id: "ev-3",
    type: "signature",
    label: "Firma del receptor",
    timestamp: "14:36",
    verified: true
  },
  {
    id: "ev-4",
    type: "location",
    label: "Ubicacion confirmada",
    timestamp: "14:32",
    coordinates: { lat: 4.6782, lng: -74.0582 },
    verified: true
  },
  {
    id: "ev-5",
    type: "comment",
    content: "Entrega exitosa. El cliente recibio el sobre sellado sin problema.",
    timestamp: "14:37",
    verified: true
  }
]

export function EvidenceViewer({ evidence, onAddEvidence, readOnly = false, className }: EvidenceViewerProps) {
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null)
  const [activeFilter, setActiveFilter] = useState<EvidenceItem["type"] | "all">("all")

  const filteredEvidence = activeFilter === "all" 
    ? evidence 
    : evidence.filter(e => e.type === activeFilter)

  const evidenceTypes = Object.keys(evidenceTypeConfig) as EvidenceItem["type"][]
  const typeCounts = evidenceTypes.reduce((acc, type) => {
    acc[type] = evidence.filter(e => e.type === type).length
    return acc
  }, {} as Record<EvidenceItem["type"], number>)

  return (
    <div className={cn("space-y-4", className)}>
      {/* Filter tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Button
          variant={activeFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveFilter("all")}
          className="flex-shrink-0"
        >
          Todos ({evidence.length})
        </Button>
        {evidenceTypes.map(type => {
          const config = evidenceTypeConfig[type]
          const count = typeCounts[type]
          if (count === 0 && readOnly) return null
          return (
            <Button
              key={type}
              variant={activeFilter === type ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(type)}
              className="flex-shrink-0"
            >
              <config.icon className={`w-3 h-3 mr-1 ${activeFilter === type ? "" : config.color}`} />
              {config.label} ({count})
            </Button>
          )
        })}
      </div>

      {/* Evidence grid */}
      {filteredEvidence.length === 0 ? (
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-8 text-center">
            <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              {activeFilter === "all" 
                ? "No hay evidencia registrada todavia" 
                : `No hay ${evidenceTypeConfig[activeFilter].label.toLowerCase()} registrada`}
            </p>
            {!readOnly && onAddEvidence && (
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4"
                onClick={() => onAddEvidence(activeFilter === "all" ? "photo" : activeFilter)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar evidencia
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <AnimatePresence>
            {filteredEvidence.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <EvidenceCard 
                  evidence={item} 
                  onClick={() => setSelectedEvidence(item)}
                />
              </motion.div>
            ))}
            
            {/* Add new evidence card */}
            {!readOnly && onAddEvidence && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: filteredEvidence.length * 0.05 }}
              >
                <Card 
                  className="bg-card/30 border-dashed border-2 border-border/50 hover:border-primary/50 cursor-pointer transition-colors h-full min-h-[120px] flex items-center justify-center"
                  onClick={() => onAddEvidence(activeFilter === "all" ? "photo" : activeFilter)}
                >
                  <CardContent className="p-4 text-center">
                    <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Agregar</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Evidence detail modal */}
      <AnimatePresence>
        {selectedEvidence && (
          <EvidenceDetailModal 
            evidence={selectedEvidence}
            onClose={() => setSelectedEvidence(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function EvidenceCard({ evidence, onClick }: { evidence: EvidenceItem; onClick: () => void }) {
  const config = evidenceTypeConfig[evidence.type]
  const Icon = config.icon

  return (
    <Card 
      className="bg-card/50 border-border/50 hover:border-primary/30 cursor-pointer transition-all overflow-hidden group"
      onClick={onClick}
    >
      <CardContent className="p-0">
        {/* Preview area */}
        <div className={cn(
          "aspect-square relative flex items-center justify-center",
          config.bgColor
        )}>
          {evidence.type === "photo" && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <Camera className="w-8 h-8 text-muted-foreground" />
            </div>
          )}
          {evidence.type === "video" && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Play className="w-6 h-6 text-white ml-1" />
              </div>
            </div>
          )}
          {evidence.type === "signature" && (
            <div className="absolute inset-0 bg-white flex items-center justify-center">
              <svg viewBox="0 0 200 100" className="w-4/5 h-auto">
                <path
                  d="M20,80 Q40,20 80,60 T140,40 T180,70"
                  fill="none"
                  stroke="#333"
                  strokeWidth="2"
                  className="animate-draw"
                />
              </svg>
            </div>
          )}
          {evidence.type === "location" && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-blue-800/50 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-red-400" />
            </div>
          )}
          {evidence.type === "comment" && (
            <div className="absolute inset-0 p-3 flex items-start">
              <p className="text-xs text-muted-foreground line-clamp-4">
                {evidence.content}
              </p>
            </div>
          )}

          {/* Verified badge */}
          {evidence.verified && (
            <div className="absolute top-2 right-2">
              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
            </div>
          )}

          {/* Zoom indicator on hover */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <ZoomIn className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Info */}
        <div className="p-2">
          <div className="flex items-center gap-1.5">
            <Icon className={cn("w-3 h-3", config.color)} />
            <span className="text-[10px] font-medium truncate">
              {evidence.label || config.label}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Clock className="w-2.5 h-2.5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">{evidence.timestamp}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EvidenceDetailModal({ evidence, onClose }: { evidence: EvidenceItem; onClose: () => void }) {
  const config = evidenceTypeConfig[evidence.type]
  const Icon = config.icon

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-card rounded-xl border border-border max-w-lg w-full max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", config.bgColor)}>
              <Icon className={cn("w-4 h-4", config.color)} />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{evidence.label || config.label}</h3>
              <p className="text-xs text-muted-foreground">{evidence.timestamp}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {evidence.verified && (
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verificado
              </Badge>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {evidence.type === "photo" && (
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Imagen de evidencia</p>
                <p className="text-xs text-muted-foreground mt-1">(Simulacion - sin imagen real)</p>
              </div>
            </div>
          )}

          {evidence.type === "video" && (
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center relative">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2 cursor-pointer hover:bg-white/30 transition-colors">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <p className="text-sm text-muted-foreground">Video de evidencia</p>
                <p className="text-xs text-muted-foreground mt-1">0:32</p>
              </div>
            </div>
          )}

          {evidence.type === "signature" && (
            <div className="bg-white rounded-lg p-8">
              <svg viewBox="0 0 400 200" className="w-full h-auto">
                <path
                  d="M40,160 Q80,40 160,120 T280,80 T360,140"
                  fill="none"
                  stroke="#333"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <div className="border-t border-gray-300 mt-4 pt-2">
                <p className="text-xs text-gray-500 text-center">Firma del receptor</p>
              </div>
            </div>
          )}

          {evidence.type === "location" && (
            <div className="space-y-4">
              <div className="aspect-video bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Simulated map */}
                <div className="absolute inset-0 opacity-30">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-400" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#map-grid)" />
                  </svg>
                </div>
                <div className="relative">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <MapPin className="w-12 h-12 text-red-500" />
                  </motion.div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/30 rounded-full blur-sm" />
                </div>
              </div>
              {evidence.coordinates && (
                <div className="flex items-center justify-center gap-4 text-sm">
                  <span className="text-muted-foreground">
                    Lat: <span className="font-mono">{evidence.coordinates.lat.toFixed(4)}</span>
                  </span>
                  <span className="text-muted-foreground">
                    Lng: <span className="font-mono">{evidence.coordinates.lng.toFixed(4)}</span>
                  </span>
                </div>
              )}
            </div>
          )}

          {evidence.type === "comment" && (
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-sm">{evidence.content}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-border flex items-center justify-end gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Descargar
          </Button>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Evidence capture component for operators
interface EvidenceCaptureProps {
  onCapture: (evidence: Omit<EvidenceItem, "id" | "timestamp">) => void
  requiredTypes?: EvidenceItem["type"][]
  className?: string
}

export function EvidenceCapture({ onCapture, requiredTypes = ["photo"], className }: EvidenceCaptureProps) {
  const [comment, setComment] = useState("")
  const [capturedTypes, setCapturedTypes] = useState<EvidenceItem["type"][]>([])

  const handleCapture = (type: EvidenceItem["type"]) => {
    if (type === "comment") {
      if (!comment.trim()) return
      onCapture({ type, content: comment })
      setComment("")
    } else if (type === "location") {
      onCapture({ 
        type, 
        coordinates: { 
          lat: 4.6782 + (Math.random() - 0.5) * 0.01, 
          lng: -74.0582 + (Math.random() - 0.5) * 0.01 
        },
        label: "Ubicacion actual"
      })
    } else {
      onCapture({ type, label: evidenceTypeConfig[type].label })
    }
    setCapturedTypes([...capturedTypes, type])
  }

  return (
    <Card className={cn("bg-card/50 border-border/50", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Camera className="w-4 h-4 text-primary" />
          Capturar evidencia
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Capture buttons */}
        <div className="grid grid-cols-2 gap-2">
          {(["photo", "video", "signature", "location"] as EvidenceItem["type"][]).map(type => {
            const config = evidenceTypeConfig[type]
            const isRequired = requiredTypes.includes(type)
            const isCaptured = capturedTypes.includes(type)
            
            return (
              <Button
                key={type}
                variant={isCaptured ? "default" : "outline"}
                size="sm"
                onClick={() => handleCapture(type)}
                className={cn(
                  "h-auto py-3 flex-col gap-1",
                  isRequired && !isCaptured && "border-primary/50"
                )}
              >
                <config.icon className={cn(
                  "w-5 h-5",
                  isCaptured ? "" : config.color
                )} />
                <span className="text-xs">{config.label}</span>
                {isCaptured && (
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                )}
              </Button>
            )
          })}
        </div>

        {/* Comment input */}
        <div className="space-y-2">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Agregar comentario..."
            className="bg-secondary border-0 min-h-[80px]"
          />
          <Button 
            size="sm" 
            className="w-full"
            disabled={!comment.trim()}
            onClick={() => handleCapture("comment")}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Agregar comentario
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
