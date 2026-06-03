"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { StatusBadge } from "@/components/status-badge"
import { 
  ArrowLeft,
  Camera,
  FileText,
  CheckCircle,
  Upload,
  Loader2,
  Shield,
  CreditCard,
  Clock,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Zap
} from "lucide-react"
import { FadeIn, PageTransition, Pulse } from "@/components/motion-primitives"

// Verification status types
type VerificationStatus = "pending" | "in-review" | "verified" | "rejected"

const verificationSteps = [
  { 
    id: 1, 
    title: "Selfie biometrica", 
    description: "Toma una foto de tu rostro para verificar tu identidad",
    icon: Camera 
  },
  { 
    id: 2, 
    title: "Documento frontal", 
    description: "Sube una foto clara del frente de tu documento",
    icon: CreditCard 
  },
  { 
    id: 3, 
    title: "Documento reverso", 
    description: "Sube una foto clara del reverso de tu documento",
    icon: CreditCard 
  },
  { 
    id: 4, 
    title: "Comprobante de direccion", 
    description: "Sube un recibo de servicios publicos o extracto bancario",
    icon: FileText 
  },
  { 
    id: 5, 
    title: "Verificacion final", 
    description: "Nuestro equipo revisara tu informacion",
    icon: Shield 
  },
]

const statusInfo: Record<VerificationStatus, {
  icon: typeof CheckCircle
  color: string
  bgColor: string
  title: string
  description: string
}> = {
  pending: {
    icon: Clock,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10 border-amber-500/20",
    title: "Verificacion Pendiente",
    description: "Completa todos los pasos para verificar tu identidad y comenzar a recibir tareas."
  },
  "in-review": {
    icon: Loader2,
    color: "text-primary",
    bgColor: "bg-primary/10 border-primary/20",
    title: "En Revision",
    description: "Estamos verificando tu informacion. Este proceso puede tomar 24-48 horas. Te notificaremos cuando este listo."
  },
  verified: {
    icon: CheckCircle,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
    title: "Verificado",
    description: "Tu identidad ha sido verificada exitosamente. Ya puedes comenzar a aceptar tareas."
  },
  rejected: {
    icon: XCircle,
    color: "text-red-400",
    bgColor: "bg-red-500/10 border-red-500/20",
    title: "Verificacion Rechazada",
    description: "Tu verificacion fue rechazada. Por favor revisa los documentos e intenta nuevamente."
  }
}

export default function VerificacionPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("pending")
  const [showStatusExplainer, setShowStatusExplainer] = useState(false)

  // Simulated steps completion state
  useEffect(() => {
    // Simulate that first 3 steps are already completed
    setCompletedSteps([0, 1, 2])
    setCurrentStep(3)
  }, [])

  const progress = (completedSteps.length / verificationSteps.length) * 100
  const currentStepData = verificationSteps[currentStep]
  const StatusIcon = statusInfo[verificationStatus].icon

  const handleUpload = async () => {
    setIsUploading(true)
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsUploading(false)
    
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep])
    }
    
    if (currentStep < verificationSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // All steps completed, move to in-review
      setVerificationStatus("in-review")
    }
  }

  const handleStepClick = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex) || stepIndex === currentStep) {
      setCurrentStep(stepIndex)
    }
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
          <h1 className="font-semibold">Verificacion de identidad</h1>
          <p className="text-xs text-muted-foreground">
            {verificationStatus === "pending" 
              ? `Paso ${currentStep + 1} de ${verificationSteps.length}`
              : statusInfo[verificationStatus].title
            }
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8"
          onClick={() => setShowStatusExplainer(!showStatusExplainer)}
        >
          <HelpCircle className="w-5 h-5" />
        </Button>
      </div>

      {/* Status Banner */}
      <div className="px-4 pb-3">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className={statusInfo[verificationStatus].bgColor}>
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusInfo[verificationStatus].bgColor}`}>
                  {verificationStatus === "in-review" ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <StatusIcon className={`w-5 h-5 ${statusInfo[verificationStatus].color}`} />
                    </motion.div>
                  ) : (
                    <StatusIcon className={`w-5 h-5 ${statusInfo[verificationStatus].color}`} />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${statusInfo[verificationStatus].color}`}>
                    {statusInfo[verificationStatus].title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {statusInfo[verificationStatus].description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Status Explainer Modal */}
      <AnimatePresence>
        {showStatusExplainer && (
          <motion.div
            className="px-4 pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Estados de verificacion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(Object.entries(statusInfo) as [VerificationStatus, typeof statusInfo[VerificationStatus]][]).map(([status, info]) => (
                  <div 
                    key={status}
                    className={`flex items-start gap-3 p-2 rounded-lg ${
                      status === verificationStatus ? info.bgColor : ""
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${info.bgColor}`}>
                      <info.icon className={`w-3 h-3 ${info.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-medium">{info.title}</p>
                        {status === verificationStatus && (
                          <StatusBadge status="active">Actual</StatusBadge>
                        )}
                      </div>
                      <p className="text-[10px] text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress (only show when pending) */}
      {verificationStatus === "pending" && (
        <div className="px-4 pb-4">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {completedSteps.length} de {verificationSteps.length} pasos completados
          </p>
        </div>
      )}

      <PageTransition className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {/* Steps list */}
        {verificationSteps.map((step, index) => {
          const isCompleted = completedSteps.includes(index)
          const isCurrent = index === currentStep && verificationStatus === "pending"
          const isLocked = !isCompleted && index !== currentStep

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className={`cursor-pointer transition-all ${
                  isCompleted 
                    ? "bg-emerald-500/10 border-emerald-500/20" 
                    : isCurrent 
                      ? "bg-primary/10 border-primary/20"
                      : "bg-card/30 border-border/30 opacity-50"
                }`}
                onClick={() => handleStepClick(index)}
              >
                <CardContent className="p-3 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? "bg-emerald-500 text-white"
                      : isCurrent
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      isLocked ? "text-muted-foreground" : ""
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{step.description}</p>
                    {isCompleted && (
                      <p className="text-[10px] text-emerald-400 mt-1">Completado</p>
                    )}
                    {isCurrent && !isCompleted && (
                      <p className="text-[10px] text-primary mt-1">En progreso</p>
                    )}
                  </div>
                  {isCurrent && (
                    <Pulse color="oklch(0.75 0.15 195)">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </Pulse>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}

        {/* Current step action (only when pending) */}
        {verificationStatus === "pending" && currentStep < verificationSteps.length && !completedSteps.includes(currentStep) && (
          <FadeIn>
            <Card className="bg-card/50 border-border/50 mt-4">
              <CardContent className="p-4 text-center">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <currentStepData.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="font-semibold mb-2">{currentStepData.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {currentStepData.description}
                </p>
                
                {currentStep < 4 ? (
                  <div 
                    className="border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:border-primary/50 transition-colors mb-4"
                    onClick={handleUpload}
                  >
                    {isUploading ? (
                      <Loader2 className="w-8 h-8 text-primary mx-auto animate-spin" />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Toca para {currentStep === 0 ? "tomar foto" : "subir documento"}
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-primary py-4">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm">Verificando identidad...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </FadeIn>
        )}

        {/* Verification complete states */}
        {verificationStatus === "verified" && (
          <FadeIn>
            <Card className="bg-emerald-500/10 border-emerald-500/20 mt-4">
              <CardContent className="p-4 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-3" />
                </motion.div>
                <h3 className="font-semibold text-lg mb-1">Verificacion Completa</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Tu identidad ha sido verificada exitosamente. Ya puedes comenzar a aceptar tareas y ganar dinero.
                </p>
                <Button onClick={() => router.push("/operador")} className="w-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Comenzar a trabajar
                </Button>
              </CardContent>
            </Card>
          </FadeIn>
        )}

        {verificationStatus === "rejected" && (
          <FadeIn>
            <Card className="bg-red-500/10 border-red-500/20 mt-4">
              <CardContent className="p-4 text-center">
                <XCircle className="w-16 h-16 text-red-400 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-1">Verificacion Rechazada</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  No pudimos verificar tu identidad. Posibles razones:
                </p>
                <ul className="text-xs text-muted-foreground text-left space-y-1 mb-4">
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    Fotos borrosas o de mala calidad
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    Documento no coincide con la selfie
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    Comprobante de direccion no valido
                  </li>
                </ul>
                <Button 
                  onClick={() => {
                    setVerificationStatus("pending")
                    setCompletedSteps([])
                    setCurrentStep(0)
                  }}
                  className="w-full"
                >
                  Intentar de nuevo
                </Button>
              </CardContent>
            </Card>
          </FadeIn>
        )}

        {verificationStatus === "in-review" && (
          <FadeIn>
            <Card className="bg-primary/10 border-primary/20 mt-4">
              <CardContent className="p-4 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-3"
                >
                  <Loader2 className="w-16 h-16 text-primary" />
                </motion.div>
                <h3 className="font-semibold text-lg mb-1">En Revision</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Nuestro equipo esta revisando tu informacion. Te notificaremos por email y dentro de la app cuando tu verificacion este completa.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  Tiempo estimado: 24-48 horas
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => router.push("/operador")} 
                  className="w-full mt-4"
                >
                  Volver al inicio
                </Button>
              </CardContent>
            </Card>
          </FadeIn>
        )}
      </PageTransition>
    </div>
  )
}
