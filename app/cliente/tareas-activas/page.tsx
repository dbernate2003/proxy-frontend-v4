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
import { useMockData } from "@/lib/mock-data"
import { 
  Search,
  Filter,
  Eye,
  RefreshCw,
  Plus
} from "lucide-react"

export default function TareasActivasPage() {
  const { tasks } = useMockData()
  
  // Filter active tasks (not completed, not cancelled)
  const activeTasks = tasks.filter(t => 
    ["created", "pending", "assigning", "assigned", "active", "in-progress"].includes(t.status)
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Tareas Activas</h1>
          <p className="text-muted-foreground">
            {activeTasks.filter(t => t.status === "active" || t.status === "in-progress").length} tareas en progreso, {" "}
            {activeTasks.filter(t => t.status === "pending" || t.status === "created" || t.status === "assigning").length} pendientes de asignacion
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualizar
          </Button>
          <Button size="sm" asChild>
            <Link href="/cliente/nueva-tarea">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Tarea
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por ID, descripcion u operador..."
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
          {activeTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No hay tareas activas</h3>
              <p className="text-muted-foreground mb-4">Crea una nueva tarea para comenzar</p>
              <Button asChild>
                <Link href="/cliente/nueva-tarea">
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Tarea
                </Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Descripcion</TableHead>
                    <TableHead>Operador</TableHead>
                    <TableHead>Ubicacion</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Progreso</TableHead>
                    <TableHead>Costo</TableHead>
                    <TableHead>Creada</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-mono text-xs">{task.id}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{task.title}</TableCell>
                      <TableCell className={!task.operator ? "text-muted-foreground italic" : ""}>
                        {task.operator || "Sin asignar"}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{task.location}</TableCell>
                      <TableCell>
                        <StatusBadge status={task.status === "active" || task.status === "in-progress" ? "active" : "pending"}>
                          {task.status === "active" || task.status === "in-progress" ? "En progreso" : 
                           task.status === "created" ? "Creada" : 
                           task.status === "assigning" ? "Asignando" : "Pendiente"}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 min-w-[100px]">
                          <Progress value={task.progress} className="h-2 flex-1" />
                          <span className="text-xs text-muted-foreground w-8">{task.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        ${task.payout.toLocaleString("es-CO")}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(task.createdAt).toLocaleString("es-CO", { 
                          month: "short", 
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </TableCell>
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}
