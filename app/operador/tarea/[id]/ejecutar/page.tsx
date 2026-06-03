"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft, 
  Navigation, 
  MapPin, 
  Play, 
  CheckCircle,
  Camera,
  Video,
  PenTool,
  AlertTriangle,
  Upload,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { id: "camino", label: "En camino", icon: Navigation },
  { id: "llegue", label: "Llegué", icon: MapPin },
  { id: "ejecutando", label: "Ejecutando", icon: Play },
  { id: "completado", label: "Completado", icon: CheckCircle },
]

export default function TaskExecutionPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [photos, setPhotos] = useState<string[]>([])
  const [hasVideo, setHasVideo] = useState(false)
  const [hasSigned, setHasSigned] = useState(false)

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleAddPhoto = () => {
    // Simulate adding a photo
    setPhotos([...photos, `photo-${photos.length + 1}`])
  }

  const handleComplete = () => {
    router.push("/operador")
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-8 h-8"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-semibold text-sm">Ejecutando tarea</h1>
          <p className="text-xs text-muted-foreground">Entrega de documentos</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 pb-4">
        <Progress value={progress} className="h-2" />
      </div>

      {/* Steps */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  index < currentStep
                    ? "bg-emerald-500 text-white"
                    : index === currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              <span className={cn(
                "text-[10px] font-medium",
                index <= currentStep ? "text-foreground" : "text-muted-foreground"
              )}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {/* Current step content */}
        {currentStep === 0 && (
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4 text-center">
              <Navigation className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1">En camino al destino</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Dirígete a: Cra 7 #116-50, Local 203, Usaquén
              </p>
              <Button onClick={handleNextStep} className="w-full">
                Ya llegué
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === 1 && (
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4 text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Confirma tu llegada</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Verifica que estás en la ubicación correcta antes de continuar.
              </p>
              <Button onClick={handleNextStep} className="w-full">
                Iniciar tarea
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Evidencia requerida</h3>
                
                {/* Photo evidence */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fotos ({photos.length}/3)</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleAddPhoto}
                      disabled={photos.length >= 3}
                    >
                      <Camera className="w-4 h-4 mr-1" />
                      Agregar
                    </Button>
                  </div>
                  {photos.length > 0 && (
                    <div className="flex gap-2">
                      {photos.map((photo, index) => (
                        <div 
                          key={photo} 
                          className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center relative"
                        >
                          <Camera className="w-6 h-6 text-muted-foreground" />
                          <button 
                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-white flex items-center justify-center"
                            onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-border my-4" />

                {/* Video evidence */}
                <div className="flex items-center justify-between">
                  <span className="text-sm">Video (opcional)</span>
                  <Button 
                    variant={hasVideo ? "default" : "outline"}
                    size="sm"
                    onClick={() => setHasVideo(!hasVideo)}
                  >
                    <Video className="w-4 h-4 mr-1" />
                    {hasVideo ? "Grabado" : "Grabar"}
                  </Button>
                </div>

                <div className="border-t border-border my-4" />

                {/* Signature */}
                <div className="flex items-center justify-between">
                  <span className="text-sm">Firma digital</span>
                  <Button 
                    variant={hasSigned ? "default" : "outline"}
                    size="sm"
                    onClick={() => setHasSigned(!hasSigned)}
                  >
                    <PenTool className="w-4 h-4 mr-1" />
                    {hasSigned ? "Firmado" : "Firmar"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Signature pad placeholder */}
            {!hasSigned && (
              <Card className="bg-card/50 border-border/50 border-dashed">
                <CardContent className="p-4">
                  <div 
                    className="h-32 rounded-lg bg-secondary/50 flex flex-col items-center justify-center cursor-pointer hover:bg-secondary transition-colors"
                    onClick={() => setHasSigned(true)}
                  >
                    <PenTool className="w-8 h-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Toca para firmar</span>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button 
              onClick={handleNextStep} 
              className="w-full"
              disabled={photos.length === 0}
            >
              <Upload className="w-4 h-4 mr-2" />
              Completar Tarea
            </Button>
          </div>
        )}

        {currentStep === 3 && (
          <Card className="bg-emerald-500/10 border-emerald-500/20">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-1">Tarea Completada</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Has ganado
              </p>
              <p className="text-3xl font-bold text-emerald-500 mb-4">
                $18,500 COP
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                El pago será procesado en las próximas 24 horas.
              </p>
              <Button onClick={handleComplete} className="w-full">
                Volver al inicio
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Panic button */}
      <div className="px-4 py-3 border-t border-border">
        <Button 
          variant="destructive" 
          size="sm"
          className="w-full"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Emergencia / Reportar problema
        </Button>
      </div>
    </div>
  )
}
