"use client"

import { useState } from "react"
import Link from "next/link"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClipboardList, CheckCircle, Clock, XCircle, MapPin, DollarSign } from "lucide-react"

const activeTasks = [
  {
    id: "active-1",
    title: "Entrega en progreso",
    location: "Chapinero, Bogotá",
    status: "active",
    payout: 22000,
    progress: "En camino",
  },
]

const completedTasks = [
  {
    id: "comp-1",
    title: "Verificación de dirección",
    location: "Usaquén, Bogotá",
    status: "completed",
    payout: 25000,
    completedAt: "Hace 2 horas",
  },
  {
    id: "comp-2",
    title: "Entrega de documentos",
    location: "Zona T, Bogotá",
    status: "completed",
    payout: 18500,
    completedAt: "Ayer",
  },
  {
    id: "comp-3",
    title: "Fotografía de inventario",
    location: "Fontibón, Bogotá",
    status: "completed",
    payout: 45000,
    completedAt: "Hace 3 días",
  },
]

const pendingTasks = [
  {
    id: "pend-1",
    title: "Acompañamiento programado",
    location: "Cedritos, Bogotá",
    status: "pending",
    payout: 55000,
    scheduledFor: "Mañana 9:00 AM",
  },
]

export default function TareasPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <h1 className="text-xl font-bold">Mis Tareas</h1>
        <p className="text-sm text-muted-foreground">Gestiona tus tareas activas e historial</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="active" className="flex-1 flex flex-col">
        <div className="px-4">
          <TabsList className="w-full grid grid-cols-3 h-10">
            <TabsTrigger value="active" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              Activas
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-xs">
              <ClipboardList className="w-3 h-3 mr-1" />
              Pendientes
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs">
              <CheckCircle className="w-3 h-3 mr-1" />
              Completadas
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="active" className="flex-1 overflow-y-auto px-4 py-4 space-y-3 mt-0">
          {activeTasks.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No tienes tareas activas</p>
            </div>
          ) : (
            activeTasks.map((task) => (
              <Link key={task.id} href="/operador/tarea/1/ejecutar">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm">{task.title}</h3>
                      <StatusBadge status="active">{task.progress}</StatusBadge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {task.location}
                      </span>
                      <span className="flex items-center gap-1 text-primary font-medium">
                        <DollarSign className="w-3 h-3" />
                        {task.payout.toLocaleString("es-CO")} COP
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </TabsContent>

        <TabsContent value="pending" className="flex-1 overflow-y-auto px-4 py-4 space-y-3 mt-0">
          {pendingTasks.length === 0 ? (
            <div className="text-center py-8">
              <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No tienes tareas pendientes</p>
            </div>
          ) : (
            pendingTasks.map((task) => (
              <Card key={task.id} className="bg-amber-500/5 border-amber-500/20">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-sm">{task.title}</h3>
                    <StatusBadge status="pending">{task.scheduledFor}</StatusBadge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {task.location}
                    </span>
                    <span className="flex items-center gap-1 text-primary font-medium">
                      <DollarSign className="w-3 h-3" />
                      {task.payout.toLocaleString("es-CO")} COP
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="flex-1 overflow-y-auto px-4 py-4 space-y-3 mt-0">
          {completedTasks.map((task) => (
            <Card key={task.id} className="bg-card/50 border-border/50">
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-sm">{task.title}</h3>
                  <StatusBadge status="completed">{task.completedAt}</StatusBadge>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {task.location}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <DollarSign className="w-3 h-3" />
                    +{task.payout.toLocaleString("es-CO")} COP
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
