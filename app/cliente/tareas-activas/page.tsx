"use client"

import Link from "next/link"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
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
  RefreshCw
} from "lucide-react"

const activeTasks = [
  {
    id: "TASK-001",
    description: "Entrega de documentos legales",
    operator: "Carlos Martínez",
    status: "active",
    progress: 65,
    elapsed: "18 min",
    location: "Usaquén, Bogotá",
    createdAt: "Hoy 10:30"
  },
  {
    id: "TASK-002",
    description: "Verificación de dirección comercial",
    operator: "María López",
    status: "active",
    progress: 30,
    elapsed: "8 min",
    location: "Chapinero, Bogotá",
    createdAt: "Hoy 10:45"
  },
  {
    id: "TASK-003",
    description: "Fotografía de inventario en bodega",
    operator: "Andrés García",
    status: "pending",
    progress: 0,
    elapsed: "Asignando...",
    location: "Fontibón, Bogotá",
    createdAt: "Hoy 11:00"
  },
  {
    id: "TASK-004",
    description: "Entrega express - Zona T",
    operator: "Laura Rodríguez",
    status: "active",
    progress: 85,
    elapsed: "22 min",
    location: "Zona T, Bogotá",
    createdAt: "Hoy 10:15"
  },
  {
    id: "TASK-005",
    description: "Acompañamiento a cita médica",
    operator: "Diego Hernández",
    status: "active",
    progress: 45,
    elapsed: "45 min",
    location: "Cedritos, Bogotá",
    createdAt: "Hoy 09:30"
  },
  {
    id: "TASK-006",
    description: "Verificación de existencia de local",
    operator: "Sandra Pérez",
    status: "active",
    progress: 15,
    elapsed: "5 min",
    location: "Suba, Bogotá",
    createdAt: "Hoy 11:10"
  },
  {
    id: "TASK-007",
    description: "Entrega de paquete programada",
    operator: "Sin asignar",
    status: "pending",
    progress: 0,
    elapsed: "Pendiente",
    location: "Kennedy, Bogotá",
    createdAt: "Hoy 11:15"
  },
]

export default function TareasActivasPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Tareas Activas</h1>
          <p className="text-muted-foreground">
            {activeTasks.filter(t => t.status === "active").length} tareas en progreso, {" "}
            {activeTasks.filter(t => t.status === "pending").length} pendientes de asignación
          </p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualizar
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
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
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
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Progreso</TableHead>
                  <TableHead>Tiempo</TableHead>
                  <TableHead>Creada</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-mono text-xs">{task.id}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{task.description}</TableCell>
                    <TableCell className={task.operator === "Sin asignar" ? "text-muted-foreground italic" : ""}>
                      {task.operator}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{task.location}</TableCell>
                    <TableCell>
                      <StatusBadge status={task.status as "active" | "pending"}>
                        {task.status === "active" ? "En progreso" : "Pendiente"}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <Progress value={task.progress} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground w-8">{task.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{task.elapsed}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{task.createdAt}</TableCell>
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
    </div>
  )
}
