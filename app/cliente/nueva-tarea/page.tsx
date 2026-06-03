"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPlaceholder } from "@/components/map-placeholder"
import { 
  Package, 
  Search, 
  Camera, 
  FileText, 
  Users, 
  Microscope,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Send
} from "lucide-react"

const taskTypes = [
  { value: "entrega", label: "Entrega", icon: Package },
  { value: "verificacion", label: "Verificación", icon: Search },
  { value: "fotografia", label: "Fotografía", icon: Camera },
  { value: "documentos", label: "Documentos", icon: FileText },
  { value: "acompanamiento", label: "Acompañamiento", icon: Users },
  { value: "investigacion", label: "Investigación", icon: Microscope },
]

const evidenceOptions = [
  { id: "photos", label: "Fotografías" },
  { id: "video", label: "Video" },
  { id: "signature", label: "Firma digital" },
  { id: "form", label: "Formulario personalizado" },
]

export default function NuevaTareaPage() {
  const router = useRouter()
  const [taskType, setTaskType] = useState("")
  const [priority, setPriority] = useState("normal")
  const [selectedEvidence, setSelectedEvidence] = useState<string[]>(["photos"])
  const [estimatedCost, setEstimatedCost] = useState(25000)

  const handleEvidenceChange = (evidenceId: string, checked: boolean) => {
    if (checked) {
      setSelectedEvidence([...selectedEvidence, evidenceId])
    } else {
      setSelectedEvidence(selectedEvidence.filter(id => id !== evidenceId))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/cliente/tareas-activas")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Crear Nueva Tarea</h1>
        <p className="text-muted-foreground">Configura los detalles de la tarea que necesitas ejecutar</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left column - Task details */}
          <div className="space-y-6">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Detalles de la tarea</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título de la tarea</Label>
                  <Input 
                    id="title" 
                    placeholder="Ej: Entrega de documentos en Usaquén"
                    className="bg-secondary border-0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción detallada</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe qué necesitas que haga el operador, incluyendo instrucciones específicas..."
                    className="bg-secondary border-0 min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tipo de tarea</Label>
                  <Select value={taskType} onValueChange={setTaskType}>
                    <SelectTrigger className="bg-secondary border-0">
                      <SelectValue placeholder="Selecciona el tipo de tarea" />
                    </SelectTrigger>
                    <SelectContent>
                      {taskTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="w-4 h-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Prioridad</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger className="bg-secondary border-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="urgente">Urgente (+50%)</SelectItem>
                      <SelectItem value="programada">Programada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {priority === "programada" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Fecha</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="date" 
                          type="date"
                          className="bg-secondary border-0 pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Hora</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="time" 
                          type="time"
                          className="bg-secondary border-0 pl-10"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Evidence requirements */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Evidencia requerida</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {evidenceOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-3">
                      <Checkbox 
                        id={option.id}
                        checked={selectedEvidence.includes(option.id)}
                        onCheckedChange={(checked) => handleEvidenceChange(option.id, checked as boolean)}
                      />
                      <Label htmlFor={option.id} className="cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Location and cost */}
          <div className="space-y-6">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Ubicación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input 
                    id="address" 
                    placeholder="Cra 7 #116-50, Bogotá"
                    className="bg-secondary border-0"
                  />
                </div>
                <MapPlaceholder 
                  className="h-48" 
                  pins={[{ x: 50, y: 50, active: true }]}
                />
                <p className="text-xs text-muted-foreground">
                  Haz clic en el mapa para ajustar la ubicación exacta
                </p>
              </CardContent>
            </Card>

            {/* Cost preview */}
            <Card className="bg-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Costo estimado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tarifa base</span>
                    <span>$20,000 COP</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tipo de tarea</span>
                    <span>+$5,000 COP</span>
                  </div>
                  {priority === "urgente" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Prioridad urgente</span>
                      <span className="text-amber-400">+$12,500 COP</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Evidencia ({selectedEvidence.length} tipos)</span>
                    <span>+${(selectedEvidence.length * 2000).toLocaleString("es-CO")} COP</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ${(priority === "urgente" ? estimatedCost * 1.5 : estimatedCost + selectedEvidence.length * 2000).toLocaleString("es-CO")} COP
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full h-12 text-base">
              <Send className="w-5 h-5 mr-2" />
              Publicar Tarea
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
