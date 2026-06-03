"use client"

import { useState } from "react"
import Link from "next/link"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClipboardList, CheckCircle, Clock, MapPin, DollarSign, Package } from "lucide-react"
import { useMockData } from "@/lib/mock-data"

export default function TareasPage() {
  const { tasks, currentOperator } = useMockData()
  
  // Filter tasks for the current operator
  const operatorId = currentOperator?.id || "op-1"
  
  const activeTasks = tasks.filter(t => 
    t.operatorId === operatorId && 
    ["active", "in-progress", "assigned"].includes(t.status)
  )
  
  const pendingTasks = tasks.filter(t => 
    ["created", "pending", "assigning"].includes(t.status) && !t.operatorId
  )
  
  const completedTasks = tasks.filter(t => 
    t.operatorId === operatorId && 
    ["completed"].includes(t.status)
  )

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
              Activas ({activeTasks.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-xs">
              <ClipboardList className="w-3 h-3 mr-1" />
              Disponibles ({pendingTasks.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs">
              <CheckCircle className="w-3 h-3 mr-1" />
              Completadas ({completedTasks.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="active" className="flex-1 overflow-y-auto px-4 py-4 space-y-3 mt-0">
          {activeTasks.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No tienes tareas activas</p>
              <p className="text-xs text-muted-foreground mt-1">Revisa las tareas disponibles</p>
            </div>
          ) : (
            activeTasks.map((task) => (
              <Link key={task.id} href={`/operador/tarea/${task.id}/ejecutar`}>
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-sm">{task.title}</h3>
                      <StatusBadge status="active">{task.progress}%</StatusBadge>
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
              <p className="text-sm text-muted-foreground">No hay tareas disponibles</p>
              <p className="text-xs text-muted-foreground mt-1">Las nuevas tareas aparecerán aquí</p>
            </div>
          ) : (
            pendingTasks.map((task) => (
              <Link key={task.id} href={`/operador/tarea/${task.id}`}>
                <Card className={`border-border/50 ${task.priority === "urgente" ? "bg-amber-500/5 border-amber-500/20" : "bg-card/50"}`}>
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <h3 className="font-medium text-sm">{task.title}</h3>
                      </div>
                      {task.priority === "urgente" && (
                        <StatusBadge status="urgent">Urgente</StatusBadge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{task.description}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {task.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.estimatedTime}
                      </span>
                      <span className="flex items-center gap-1 text-primary font-medium ml-auto">
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

        <TabsContent value="completed" className="flex-1 overflow-y-auto px-4 py-4 space-y-3 mt-0">
          {completedTasks.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No tienes tareas completadas</p>
            </div>
          ) : (
            completedTasks.map((task) => (
              <Card key={task.id} className="bg-card/50 border-border/50">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-sm">{task.title}</h3>
                    <StatusBadge status="completed">
                      {task.completedAt ? new Date(task.completedAt).toLocaleDateString("es-CO") : "Completada"}
                    </StatusBadge>
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
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
