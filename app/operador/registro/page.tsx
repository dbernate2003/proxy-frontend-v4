"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  ArrowLeft,
  ArrowRight,
  User,
  MapPin,
  Phone,
  CreditCard,
  CheckCircle,
  Loader2,
  Shield,
  Zap
} from "lucide-react"
import { PageTransition, FadeIn } from "@/components/motion-primitives"

const cities = [
  "Bogota",
  "Medellin",
  "Cali",
  "Barranquilla",
  "Cartagena",
  "Bucaramanga",
  "Pereira",
  "Manizales",
  "Santa Marta",
  "Cucuta"
]

const documentTypes = [
  { value: "cc", label: "Cedula de Ciudadania" },
  { value: "ce", label: "Cedula de Extranjeria" },
  { value: "pasaporte", label: "Pasaporte" }
]

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  documentType: string
  documentNumber: string
  address: string
}

export default function RegistroPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    documentType: "",
    documentNumber: "",
    address: ""
  })

  const steps = [
    { id: "datos", title: "Datos basicos", icon: User },
    { id: "ubicacion", title: "Ubicacion", icon: MapPin },
    { id: "contacto", title: "Contacto", icon: Phone },
    { id: "documento", title: "Documento", icon: CreditCard },
    { id: "confirmar", title: "Confirmar", icon: CheckCircle }
  ]

  const progress = ((step + 1) / steps.length) * 100

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const canContinue = () => {
    switch (step) {
      case 0:
        return formData.firstName.trim() && formData.lastName.trim()
      case 1:
        return formData.city && formData.address.trim()
      case 2:
        return formData.email.includes("@") && formData.phone.length >= 10
      case 3:
        return formData.documentType && formData.documentNumber.length >= 6
      case 4:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    router.push("/operador/verificacion")
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-8 h-8"
          onClick={() => step === 0 ? router.push("/operador") : handleBack()}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-semibold">Ser Operador</h1>
          <p className="text-xs text-muted-foreground">Paso {step + 1} de {steps.length}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 pb-4">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.id}
              className="flex flex-col items-center"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: i <= step ? 1 : 0.5 }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                i < step 
                  ? "bg-emerald-500 text-white" 
                  : i === step 
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
              }`}>
                {i < step ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <s.icon className="w-4 h-4" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <PageTransition className="flex-1 overflow-y-auto px-4 pb-4">
        <AnimatePresence mode="wait">
          {/* Step 0: Basic Data */}
          {step === 0 && (
            <FadeIn key="datos" className="space-y-4">
              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Datos basicos
                  </CardTitle>
                  <CardDescription>
                    Ingresa tu nombre completo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre(s)</Label>
                    <Input
                      id="firstName"
                      placeholder="Ej: Carlos Alberto"
                      value={formData.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      className="bg-secondary border-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido(s)</Label>
                    <Input
                      id="lastName"
                      placeholder="Ej: Martinez Lopez"
                      value={formData.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      className="bg-secondary border-0"
                    />
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          )}

          {/* Step 1: Location */}
          {step === 1 && (
            <FadeIn key="ubicacion" className="space-y-4">
              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Ubicacion
                  </CardTitle>
                  <CardDescription>
                    Donde te encuentras para asignarte tareas cercanas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Select 
                      value={formData.city} 
                      onValueChange={(v) => updateField("city", v)}
                    >
                      <SelectTrigger className="bg-secondary border-0">
                        <SelectValue placeholder="Selecciona tu ciudad" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Direccion</Label>
                    <Input
                      id="address"
                      placeholder="Ej: Cra 7 #45-23, Barrio Centro"
                      value={formData.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      className="bg-secondary border-0"
                    />
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          )}

          {/* Step 2: Contact */}
          {step === 2 && (
            <FadeIn key="contacto" className="space-y-4">
              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    Contacto
                  </CardTitle>
                  <CardDescription>
                    Necesitamos tu telefono y email para comunicarnos contigo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefono celular</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+57 315 123 4567"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="bg-secondary border-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electronico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="bg-secondary border-0"
                    />
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          )}

          {/* Step 3: Document */}
          {step === 3 && (
            <FadeIn key="documento" className="space-y-4">
              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Documento de identidad
                  </CardTitle>
                  <CardDescription>
                    Ingresa tu documento para verificar tu identidad
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="documentType">Tipo de documento</Label>
                    <Select 
                      value={formData.documentType} 
                      onValueChange={(v) => updateField("documentType", v)}
                    >
                      <SelectTrigger className="bg-secondary border-0">
                        <SelectValue placeholder="Selecciona el tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map(doc => (
                          <SelectItem key={doc.value} value={doc.value}>
                            {doc.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="documentNumber">Numero de documento</Label>
                    <Input
                      id="documentNumber"
                      placeholder="Ej: 1234567890"
                      value={formData.documentNumber}
                      onChange={(e) => updateField("documentNumber", e.target.value)}
                      className="bg-secondary border-0"
                    />
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <FadeIn key="confirmar" className="space-y-4">
              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Confirmar datos
                  </CardTitle>
                  <CardDescription>
                    Revisa que tu informacion sea correcta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">Nombre</span>
                      <span className="text-sm font-medium">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">Ciudad</span>
                      <span className="text-sm font-medium">{formData.city}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">Direccion</span>
                      <span className="text-sm font-medium">{formData.address}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">Telefono</span>
                      <span className="text-sm font-medium">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-sm text-muted-foreground">Email</span>
                      <span className="text-sm font-medium">{formData.email}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-muted-foreground">Documento</span>
                      <span className="text-sm font-medium">
                        {documentTypes.find(d => d.value === formData.documentType)?.label} - {formData.documentNumber}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/10 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Siguiente paso: Verificacion</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Despues de enviar tus datos, deberas completar el proceso de verificacion
                        de identidad para comenzar a recibir tareas.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          )}
        </AnimatePresence>
      </PageTransition>

      {/* Footer buttons */}
      <div className="px-4 py-4 border-t border-border space-y-2">
        {step < steps.length - 1 ? (
          <Button 
            onClick={handleNext} 
            className="w-full h-12"
            disabled={!canContinue()}
          >
            Continuar
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit} 
            className="w-full h-12"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Enviar y continuar
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
