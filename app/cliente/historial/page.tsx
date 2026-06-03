"use client"

import Link from "next/link"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Search,
  Filter,
  Eye,
  Calendar,
  Download
} from "lucide-react"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const historyTasks = [
  {
    id: "TASK-156",
    description: "Entrega de documentos legales",
    operator: "Carlos Martínez",
    status: "completed",
    duration: "28 min",
    cost: 18500,
    completedAt: "Jun 30, 2024 14:30"
  },
  {
    id: "TASK-155",
    description: "Verificación de dirección comercial",
    operator: "María López",
    status: "completed",
    duration: "22 min",
    cost: 25000,
    completedAt: "Jun 30, 2024 11:45"
  },
  {
    id: "TASK-154",
    description: "Entrega express - Centro comercial",
    operator: "Andrés García",
    status: "cancelled",
    duration: "-",
    cost: 0,
    completedAt: "Jun 29, 2024 16:20"
  },
  {
    id: "TASK-153",
    description: "Fotografía de inventario",
    operator: "Laura Rodríguez",
    status: "completed",
    duration: "52 min",
    cost: 45000,
    completedAt: "Jun 29, 2024 10:15"
  },
  {
    id: "TASK-152",
    description: "Acompañamiento a cita médica",
    operator: "Diego Hernández",
    status: "completed",
    duration: "95 min",
    cost: 55000,
    completedAt: "Jun 28, 2024 09:30"
  },
  {
    id: "TASK-151",
    description: "Verificación de existencia de local",
    operator: "Sandra Pérez",
    status: "completed",
    duration: "18 min",
    cost: 22000,
    completedAt: "Jun 28, 2024 15:45"
  },
  {
    id: "TASK-150",
    description: "Entrega de paquete programada",
    operator: "Carlos Martínez",
    status: "completed",
    duration: "35 min",
    cost: 32000,
    completedAt: "Jun 27, 2024 14:00"
  },
  {
    id: "TASK-149",
    description: "Investigación de mercado",
    operator: "María López",
    status: "failed",
    duration: "45 min",
    cost: 15000,
    completedAt: "Jun 27, 2024 11:30"
  },
]

export default function HistorialPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Historial de Tareas</h1>
          <p className="text-muted-foreground">Registro completo de todas las tareas ejecutadas</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por ID, descripción u operador..."
                className="bg-secondary border-0 pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px] bg-secondary border-0">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="completed">Completadas</SelectItem>
                <SelectItem value="cancelled">Canceladas</SelectItem>
                <SelectItem value="failed">Fallidas</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="30days">
              <SelectTrigger className="w-[150px] bg-secondary border-0">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Últimos 7 días</SelectItem>
                <SelectItem value="30days">Últimos 30 días</SelectItem>
                <SelectItem value="90days">Últimos 90 días</SelectItem>
                <SelectItem value="all">Todo el historial</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Más filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Table */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Operador</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Duración</TableHead>
                  <TableHead>Costo</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-mono text-xs">{task.id}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{task.description}</TableCell>
                    <TableCell>{task.operator}</TableCell>
                    <TableCell>
                      <StatusBadge status={
                        task.status === "completed" ? "completed" : 
                        task.status === "cancelled" ? "cancelled" : "cancelled"
                      }>
                        {task.status === "completed" ? "Completada" : 
                         task.status === "cancelled" ? "Cancelada" : "Fallida"}
                      </StatusBadge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{task.duration}</TableCell>
                    <TableCell className={task.cost > 0 ? "text-primary font-medium" : "text-muted-foreground"}>
                      {task.cost > 0 ? `$${task.cost.toLocaleString("es-CO")}` : "-"}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{task.completedAt}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/cliente/tarea/${task.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination placeholder */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando 1-8 de 156 tareas
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Anterior</Button>
          <Button variant="outline" size="sm">Siguiente</Button>
        </div>
      </div>
    </div>
  )
}
