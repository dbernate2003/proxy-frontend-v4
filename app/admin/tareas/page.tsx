"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Search, 
  MoreHorizontal, 
  MapPin,
  Clock,
  Eye,
  CheckCircle,
  Package,
  Camera,
  FileText,
  Users,
  Microscope,
  DollarSign,
  Download
} from "lucide-react"
import { useMockData, type Task } from "@/lib/mock-data"

const taskTypeIcons: Record<Task["type"], React.ComponentType<{ className?: string }>> = {
  entrega: Package,
  verificacion: Eye,
  fotografia: Camera,
  documentos: FileText,
  acompanamiento: Users,
  investigacion: Microscope
}

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  created: { bg: "bg-blue-500/10", text: "text-blue-500", label: "Creada" },
  pending: { bg: "bg-amber-500/10", text: "text-amber-500", label: "Pendiente" },
  assigning: { bg: "bg-primary/10", text: "text-primary", label: "Asignando" },
  assigned: { bg: "bg-primary/10", text: "text-primary", label: "Asignada" },
  active: { bg: "bg-emerald-500/10", text: "text-emerald-500", label: "Activa" },
  "in-progress": { bg: "bg-emerald-500/10", text: "text-emerald-500", label: "En progreso" },
  completed: { bg: "bg-emerald-500/10", text: "text-emerald-500", label: "Completada" },
  cancelled: { bg: "bg-destructive/10", text: "text-destructive", label: "Cancelada" },
  failed: { bg: "bg-destructive/10", text: "text-destructive", label: "Fallida" },
}

export default function AdminTareasPage() {
  const { tasks, operators } = useMockData()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesType = typeFilter === "all" || task.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getOperatorName = (operatorId?: string) => {
    if (!operatorId) return "Sin asignar"
    const op = operators.find(o => o.id === operatorId)
    return op?.name || "Desconocido"
  }

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => ["active", "in-progress", "assigned"].includes(t.status)).length,
    pending: tasks.filter(t => ["created", "pending", "assigning"].includes(t.status)).length,
    completed: tasks.filter(t => t.status === "completed").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tareas</h1>
          <p className="text-sm text-muted-foreground">Monitorea todas las tareas de la plataforma</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Total tareas</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-emerald-500">{stats.active}</p>
            <p className="text-xs text-muted-foreground">En progreso</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-amber-500">{stats.pending}</p>
            <p className="text-xs text-muted-foreground">Pendientes</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-primary">{stats.completed}</p>
            <p className="text-xs text-muted-foreground">Completadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID, titulo o ubicacion..."
                className="pl-10 bg-secondary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40 bg-secondary/50">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activas</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="completed">Completadas</SelectItem>
                <SelectItem value="cancelled">Canceladas</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40 bg-secondary/50">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="entrega">Entregas</SelectItem>
                <SelectItem value="verificacion">Verificaciones</SelectItem>
                <SelectItem value="fotografia">Fotografia</SelectItem>
                <SelectItem value="documentos">Documentos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tarea</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Operador</TableHead>
                <TableHead>Ubicacion</TableHead>
                <TableHead>Progreso</TableHead>
                <TableHead>Pago</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => {
                const status = statusColors[task.status] || statusColors.pending
                const TaskIcon = taskTypeIcons[task.type] || Package
                return (
                  <TableRow key={task.id}>
                    <TableCell>
                      <span className="font-mono text-xs">{task.id}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <TaskIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{task.title}</p>
                          <p className="text-xs text-muted-foreground capitalize">{task.type}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${status.bg} ${status.text} border-0`}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{getOperatorName(task.operatorId)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        {task.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{task.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {task.payout.toLocaleString("es-CO")}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Clock className="w-4 h-4 mr-2" />
                            Ver historial
                          </DropdownMenuItem>
                          {task.status === "pending" && (
                            <DropdownMenuItem className="text-emerald-500">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Asignar operador
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
