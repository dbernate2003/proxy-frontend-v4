"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { MapPlaceholder } from "@/components/map-placeholder"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  CheckCircle,
  FileText,
  Camera,
  Package,
  Search,
  Users
} from "lucide-react"

const tasks: Record<string, {
  id: string
  title: string
  description: string
  fullDescription: string
  location: string
  address: string
  distance: string
  payout: number
  estimatedTime: string
  clientRating: number
  icon: typeof FileText
  steps: string[]
}> = {
  "1": {
    id: "1",
    title: "Entrega de documentos",
    description: "Recoger y entregar sobre en zona norte",
    fullDescription: "Debes recoger un sobre sellado en la dirección de origen y entregarlo en la dirección de destino. El sobre contiene documentos legales importantes, por favor manéjalo con cuidado.",
    location: "Usaquén, Bogotá",
    address: "Cra 7 #116-50, Local 203",
    distance: "2.3 km",
    payout: 18500,
    estimatedTime: "25-35 min",
    clientRating: 4.9,
    icon: FileText,
    steps: [
      "Dirigirse a la dirección de recogida",
      "Solicitar el sobre a nombre de 'Documentos Proxy'",
      "Verificar que el sobre esté sellado",
      "Entregar en destino y obtener firma",
      "Tomar foto del sobre entregado"
    ]
  },
  "2": {
    id: "2",
    title: "Verificación de dirección",
    description: "Confirmar existencia de local comercial",
    fullDescription: "Se requiere verificar que el local comercial existe y está operando. Debes tomar fotos del exterior, confirmar el nombre del negocio y horario de atención visible.",
    location: "Chapinero, Bogotá",
    address: "Calle 53 #13-27",
    distance: "1.8 km",
    payout: 25000,
    estimatedTime: "15-25 min",
    clientRating: 4.7,
    icon: Search,
    steps: [
      "Ir a la dirección indicada",
      "Verificar que el local existe",
      "Tomar foto de la fachada",
      "Confirmar nombre del negocio",
      "Registrar horario de atención"
    ]
  },
  "3": {
    id: "3",
    title: "Fotografía de producto",
    description: "Tomar fotos de inventario en bodega",
    fullDescription: "El cliente necesita documentación fotográfica de su inventario. Debes tomar fotos claras de todos los productos indicados en la lista.",
    location: "Fontibón, Bogotá",
    address: "Zona Franca, Bodega 15",
    distance: "5.2 km",
    payout: 45000,
    estimatedTime: "45-60 min",
    clientRating: 4.5,
    icon: Camera,
    steps: [
      "Presentarse en recepción de bodega",
      "Solicitar acceso con código PROXY-2024",
      "Fotografiar productos según lista",
      "Asegurar buena iluminación",
      "Subir todas las fotos al sistema"
    ]
  },
  "4": {
    id: "4",
    title: "Entrega express",
    description: "Llevar paquete pequeño urgente",
    fullDescription: "Entrega urgente de paquete pequeño (menos de 1kg). El tiempo es crítico, el cliente espera la entrega lo antes posible.",
    location: "Zona T, Bogotá",
    address: "Cra 12 #83-17, Apto 501",
    distance: "3.1 km",
    payout: 32000,
    estimatedTime: "20-30 min",
    clientRating: 4.8,
    icon: Package,
    steps: [
      "Recoger paquete en punto de origen",
      "Verificar contenido con lista",
      "Transportar con cuidado",
      "Entregar en mano al destinatario",
      "Obtener firma de recibido"
    ]
  },
  "5": {
    id: "5",
    title: "Acompañamiento",
    description: "Acompañar a persona mayor a cita médica",
    fullDescription: "Acompañar a adulto mayor desde su domicilio hasta la clínica para su cita médica y regresarlo a casa. Se requiere paciencia y buen trato.",
    location: "Cedritos, Bogotá",
    address: "Calle 140 #15-22",
    distance: "4.5 km",
    payout: 55000,
    estimatedTime: "90-120 min",
    clientRating: 5.0,
    icon: Users,
    steps: [
      "Llegar al domicilio del paciente",
      "Ayudar a salir de casa",
      "Acompañar hasta la clínica",
      "Esperar durante la cita",
      "Regresar al paciente a casa"
    ]
  }
}

export default function TaskDetailPage() {
  const params = useParams()
  const router = useRouter()
  const taskId = params.id as string
  const task = tasks[taskId] || tasks["1"]

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
        <h1 className="font-semibold">Detalle de Tarea</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {/* Task header */}
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <task.icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-lg">{task.title}</h2>
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>
        </div>

        {/* Client info */}
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-secondary text-muted-foreground">
                  CL
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">Cliente verificado</p>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-muted-foreground">{task.clientRating} rating</span>
                </div>
              </div>
              <StatusBadge status="completed">Premium</StatusBadge>
            </div>
          </CardContent>
        </Card>

        {/* Map */}
        <MapPlaceholder 
          className="h-32 rounded-xl" 
          pins={[{ x: 50, y: 50, active: true, label: task.location }]}
        />

        {/* Location details */}
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-3 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{task.address}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {task.estimatedTime}
              </span>
              <span>{task.distance} de distancia</span>
            </div>
          </CardContent>
        </Card>

        {/* Full description */}
        <div>
          <h3 className="font-medium text-sm mb-2">Descripción</h3>
          <p className="text-sm text-muted-foreground">{task.fullDescription}</p>
        </div>

        {/* Steps */}
        <div>
          <h3 className="font-medium text-sm mb-2">Instrucciones del coordinador IA</h3>
          <div className="space-y-2">
            {task.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary font-medium">{index + 1}</span>
                </div>
                <span className="text-muted-foreground">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payout */}
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Pago estimado</p>
                <p className="text-2xl font-bold text-primary">
                  ${task.payout.toLocaleString("es-CO")} <span className="text-sm font-normal">COP</span>
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Button */}
      <div className="px-4 py-4 border-t border-border">
        <Button className="w-full h-12 text-base font-semibold" asChild>
          <Link href={`/operador/tarea/${taskId}/ejecutar`}>
            <CheckCircle className="w-5 h-5 mr-2" />
            Aceptar Tarea
          </Link>
        </Button>
      </div>
    </div>
  )
}
