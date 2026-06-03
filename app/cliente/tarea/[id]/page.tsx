"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPlaceholder } from "@/components/map-placeholder"
import { StatusBadge } from "@/components/status-badge"
import { EvidenceViewer, mockEvidence } from "@/components/evidence-viewer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Star,
  CheckCircle,
  Navigation,
  Play,
  Send,
  Image,
  XCircle,
  Bot,
  FileText,
  Package,
  Camera,
  Search,
  Users,
  Microscope,
  DollarSign
} from "lucide-react"
import { PageTransition, FadeIn } from "@/components/motion-primitives"

const taskSteps = [
  { id: "asignada", label: "Asignada", completed: true },
  { id: "en-camino", label: "En camino", completed: true },
  { id: "en-ubicacion", label: "En ubicacion", completed: true },
  { id: "ejecutando", label: "Ejecutando", completed: false },
  { id: "completada", label: "Completada", completed: false },
]

const chatMessages = [
  { role: "system", content: "Tarea asignada a Carlos Martinez", time: "10:30" },
  { role: "system", content: "Operador en camino al destino", time: "10:35" },
  { role: "assistant", content: "El operador esta a 5 minutos del destino. ETA: 10:42", time: "10:37" },
  { role: "system", content: "Operador llego a la ubicacion", time: "10:41" },
  { role: "assistant", content: "Carlos ha iniciado la ejecucion de la tarea. Te notificare cuando complete cada paso.", time: "10:43" },
]

const taskTypeIcons: Record<string, typeof Package> = {
  entrega: Package,
  verificacion: Search,
  fotografia: Camera,
  documentos: FileText,
  acompanamiento: Users,
  investigacion: Microscope,
}

// Mock task data
const mockTaskData: Record<string, {
  id: string
  title: string
  description: string
  type: string
  location: string
  address: string
  status: string
  operator: string
  operatorInitials: string
  operatorRating: number
  operatorTasks: number
  progress: number
  payout: number
  elapsedTime: string
  eta: string
}> = {
  "TASK-001": {
    id: "TASK-001",
    title: "Entrega de documentos legales",
    description: "Recoger sobre sellado en oficina y entregar en destino con firma de recibido",
    type: "documentos",
    location: "Usaquen, Bogota",
    address: "Cra 7 #116-50, Local 203",
    status: "active",
    operator: "Carlos Martinez",
    operatorInitials: "CM",
    operatorRating: 4.8,
    operatorTasks: 156,
    progress: 65,
    payout: 18500,
    elapsedTime: "18 min",
    eta: "5 min"
  },
  "TASK-002": {
    id: "TASK-002",
    title: "Verificacion de direccion comercial",
    description: "Confirmar existencia de local comercial y tomar fotos de la fachada",
    type: "verificacion",
    location: "Chapinero, Bogota",
    address: "Calle 53 #13-27",
    status: "active",
    operator: "Maria Lopez",
    operatorInitials: "ML",
    operatorRating: 4.9,
    operatorTasks: 98,
    progress: 30,
    payout: 25000,
    elapsedTime: "8 min",
    eta: "12 min"
  },
  "TASK-003": {
    id: "TASK-003",
    title: "Fotografia de inventario",
    description: "Tomar fotos de productos en bodega segun lista proporcionada",
    type: "fotografia",
    location: "Fontibon, Bogota",
    address: "Zona Franca, Bodega 15",
    status: "pending",
    operator: "Sin asignar",
    operatorInitials: "?",
    operatorRating: 0,
    operatorTasks: 0,
    progress: 0,
    payout: 45000,
    elapsedTime: "-",
    eta: "Asignando..."
  }
}

export default function TaskTrackingPage() {
  const router = useRouter()
  const params = useParams()
  const taskId = params.id as string
  const [operatorPosition, setOperatorPosition] = useState({ x: 60, y: 45 })
  const [chatInput, setChatInput] = useState("")
  const [activeTab, setActiveTab] = useState("seguimiento")

  // Get task data
  const task = mockTaskData[taskId] || mockTaskData["TASK-001"]
  const TaskIcon = taskTypeIcons[task.type] || FileText

  // Simulate operator movement
  useEffect(() => {
    const interval = setInterval(() => {
      setOperatorPosition(pos => ({
        x: Math.max(40, Math.min(70, pos.x + (Math.random() - 0.5) * 2)),
        y: Math.max(35, Math.min(55, pos.y + (Math.random() - 0.5) * 2)),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <PageTransition className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <TaskIcon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Seguimiento de Tarea</h1>
              <p className="text-sm text-muted-foreground">{task.id} - {task.title}</p>
            </div>
          </div>
        </div>
        {task.status === "active" && (
          <Button variant="destructive" size="sm">
            <XCircle className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="seguimiento">Seguimiento</TabsTrigger>
          <TabsTrigger value="evidencia">Evidencia</TabsTrigger>
          <TabsTrigger value="chat">Chat IA</TabsTrigger>
        </TabsList>

        {/* Tab: Seguimiento */}
        <TabsContent value="seguimiento" className="space-y-6 mt-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left column - Map and operator */}
            <div className="lg:col-span-2 space-y-6">
              {/* Real-time map */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <MapPin className="w-5 h-5 text-primary" />
                    </motion.div>
                    Ubicacion en tiempo real
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MapPlaceholder 
                    className="h-64" 
                    pins={[{ x: 50, y: 50, active: true, label: "Destino" }]}
                    showOperator
                    operatorPosition={operatorPosition}
                  />
                </CardContent>
              </Card>

              {/* Operator card */}
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-14 h-14 border-2 border-primary">
                      <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                        {task.operatorInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{task.operator}</h3>
                        {task.status === "active" && (
                          <StatusBadge status="active">Nivel 3</StatusBadge>
                        )}
                      </div>
                      {task.operatorRating > 0 && (
                        <div className="flex items-center gap-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${star <= Math.floor(task.operatorRating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">{task.operatorRating} ({task.operatorTasks} tareas)</span>
                        </div>
                      )}
                    </div>
                    {task.status === "active" && (
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-primary">
                          <Clock className="w-4 h-4" />
                          <span className="font-semibold">ETA: {task.eta}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Tiempo: {task.elapsedTime}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Progress timeline */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Progreso de la tarea</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    {taskSteps.map((step, index) => (
                      <div key={step.id} className="flex flex-col items-center flex-1">
                        <div className="relative w-full flex items-center justify-center">
                          {index > 0 && (
                            <div className={`absolute left-0 right-1/2 h-0.5 -translate-y-1/2 top-1/2 ${
                              step.completed ? "bg-emerald-500" : "bg-border"
                            }`} />
                          )}
                          {index < taskSteps.length - 1 && (
                            <div className={`absolute left-1/2 right-0 h-0.5 -translate-y-1/2 top-1/2 ${
                              taskSteps[index + 1]?.completed ? "bg-emerald-500" : "bg-border"
                            }`} />
                          )}
                          <motion.div 
                            className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                              step.completed 
                                ? "bg-emerald-500 text-white" 
                                : index === taskSteps.findIndex(s => !s.completed)
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary text-muted-foreground"
                            }`}
                            animate={index === taskSteps.findIndex(s => !s.completed) ? {
                              scale: [1, 1.1, 1]
                            } : {}}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            {step.completed ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : index === 1 ? (
                              <Navigation className="w-4 h-4" />
                            ) : index === 2 ? (
                              <MapPin className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </motion.div>
                        </div>
                        <span className={`text-xs mt-2 text-center ${
                          step.completed ? "text-emerald-400" : "text-muted-foreground"
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right column - Task info */}
            <div className="space-y-6">
              {/* Task details */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Detalles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Descripcion</p>
                    <p className="text-sm mt-1">{task.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm">{task.location}</p>
                      <p className="text-xs text-muted-foreground">{task.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-sm text-muted-foreground">Costo</span>
                    <span className="text-lg font-bold text-primary">
                      ${task.payout.toLocaleString("es-CO")} COP
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick evidence preview */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Image className="w-5 h-5 text-primary" />
                      Evidencia
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setActiveTab("evidencia")}
                    >
                      Ver todo
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    {mockEvidence.slice(0, 3).map((ev) => (
                      <div 
                        key={ev.id} 
                        className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center"
                      >
                        {ev.type === "photo" && <Camera className="w-6 h-6 text-muted-foreground" />}
                        {ev.type === "signature" && <FileText className="w-6 h-6 text-muted-foreground" />}
                        {ev.type === "location" && <MapPin className="w-6 h-6 text-muted-foreground" />}
                      </div>
                    ))}
                    <div 
                      className="w-16 h-16 rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => setActiveTab("evidencia")}
                    >
                      <span className="text-xs text-muted-foreground">+{mockEvidence.length - 3}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tab: Evidencia */}
        <TabsContent value="evidencia" className="mt-6">
          <FadeIn>
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Image className="w-5 h-5 text-primary" />
                  Evidencia Digital
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Fotografias, firmas, ubicacion y comentarios registrados por el operador durante la ejecucion de la tarea.
                </p>
              </CardHeader>
              <CardContent>
                <EvidenceViewer evidence={mockEvidence} readOnly />
              </CardContent>
            </Card>
          </FadeIn>
        </TabsContent>

        {/* Tab: Chat IA */}
        <TabsContent value="chat" className="mt-6">
          <FadeIn>
            <Card className="bg-card/50 border-border/50 h-[600px] flex flex-col">
              <CardHeader className="pb-2 border-b border-border">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bot className="w-5 h-5 text-primary" />
                  Chat con coordinador IA
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Pregunta sobre el estado de la tarea, tiempos estimados o cualquier otra consulta.
                </p>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`${msg.role === "system" ? "text-center" : ""}`}>
                    {msg.role === "system" ? (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground">
                        <CheckCircle className="w-3 h-3" />
                        {msg.content}
                        <span className="text-[10px]">{msg.time}</span>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-primary/20 text-primary text-[10px]">
                            <Bot className="w-3 h-3" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Card className="bg-secondary border-0">
                            <CardContent className="p-2">
                              <p className="text-sm">{msg.content}</p>
                            </CardContent>
                          </Card>
                          <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Pregunta al coordinador IA..."
                    className="bg-secondary border-0"
                  />
                  <Button size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </FadeIn>
        </TabsContent>
      </Tabs>
    </PageTransition>
  )
}
