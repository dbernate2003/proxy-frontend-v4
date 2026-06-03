"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Package, 
  Camera, 
  FileText, 
  Users, 
  Search,
  MapPin,
  CheckCircle,
  Clock,
  Zap,
  User,
  Brain,
  Route,
  Play,
  Image,
  Star,
  ArrowRight,
  Info
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Task {
  id: string
  title: string
  location: string
  status: "created" | "assigning" | "assigned" | "in-progress" | "completed"
  operator?: string
  operatorId?: string
  icon: typeof Package
  progress: number
  aiReasoning?: string
}

interface Operator {
  id: string
  name: string
  x: number
  y: number
  status: "idle" | "moving" | "working"
  targetX?: number
  targetY?: number
  rating: number
  distance?: number
}

interface TimelineEvent {
  id: string
  type: "task_created" | "ai_analyzing" | "operator_selected" | "operator_moving" | "task_started" | "evidence_uploaded" | "task_completed"
  taskId: string
  operatorId?: string
  title: string
  description: string
  aiExplanation?: string
  timestamp: Date
  icon: typeof Package
  color: string
}

interface LiveSimulationProps {
  className?: string
  autoStart?: boolean
  speed?: "slow" | "normal" | "fast"
}

const taskTypes = [
  { title: "Entrega de documentos", icon: FileText, location: "Usaquen" },
  { title: "Verificacion comercial", icon: Search, location: "Chapinero" },
  { title: "Fotografia de producto", icon: Camera, location: "Fontibon" },
  { title: "Entrega express", icon: Package, location: "Zona T" },
  { title: "Acompanamiento", icon: Users, location: "Cedritos" },
]

const operatorNames = [
  { name: "Carlos M.", rating: 4.8 },
  { name: "Maria L.", rating: 4.9 },
  { name: "Andres G.", rating: 4.5 },
  { name: "Laura R.", rating: 4.7 },
  { name: "Diego H.", rating: 4.6 },
]

export function LiveSimulation({ 
  className = "", 
  autoStart = true,
  speed = "normal" 
}: LiveSimulationProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [operators, setOperators] = useState<Operator[]>([])
  const [timeline, setTimeline] = useState<TimelineEvent[]>([])
  const [stats, setStats] = useState({ created: 0, completed: 0, active: 0 })
  const [isRunning, setIsRunning] = useState(autoStart)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [activeView, setActiveView] = useState<"map" | "timeline">("map")

  const speedMultiplier = { slow: 2, normal: 1, fast: 0.5 }[speed]

  // Initialize operators
  useEffect(() => {
    const initialOperators: Operator[] = operatorNames.slice(0, 5).map((op, i) => ({
      id: `op-${i}`,
      name: op.name,
      x: 60 + Math.random() * 30,
      y: 20 + (i * 15) + Math.random() * 10,
      status: "idle" as const,
      rating: op.rating,
    }))
    setOperators(initialOperators)
  }, [])

  // Add timeline event
  const addTimelineEvent = useCallback((event: Omit<TimelineEvent, "id" | "timestamp">) => {
    const newEvent: TimelineEvent = {
      ...event,
      id: `evt-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
    }
    setTimeline(prev => [newEvent, ...prev].slice(0, 15))
  }, [])

  // Create new task
  const createTask = useCallback(() => {
    const taskType = taskTypes[Math.floor(Math.random() * taskTypes.length)]
    const newTask: Task = {
      id: `task-${Date.now()}`,
      ...taskType,
      status: "created",
      progress: 0,
    }
    setTasks(prev => [...prev.slice(-8), newTask])
    setStats(prev => ({ ...prev, created: prev.created + 1 }))
    
    addTimelineEvent({
      type: "task_created",
      taskId: newTask.id,
      title: "Nueva tarea creada",
      description: `Cliente solicita: ${taskType.title} en ${taskType.location}`,
      icon: taskType.icon,
      color: "amber"
    })
    
    return newTask.id
  }, [addTimelineEvent])

  // AI Assignment logic with explanation
  const assignTask = useCallback((taskId: string) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, status: "assigning" } : t
    ))

    addTimelineEvent({
      type: "ai_analyzing",
      taskId,
      title: "IA analizando opciones",
      description: "Evaluando operadores disponibles cerca del destino...",
      aiExplanation: "Factores: distancia, rating, certificaciones, carga actual",
      icon: Brain,
      color: "primary"
    })

    setTimeout(() => {
      const availableOperators = operators.filter(o => o.status === "idle")
      if (availableOperators.length === 0) return
      
      // Simulate AI selection logic
      const task = tasks.find(t => t.id === taskId)
      const selectedOperator = availableOperators.reduce((best, current) => {
        const currentScore = current.rating * 10 + Math.random() * 20
        const bestScore = best.rating * 10 + Math.random() * 20
        return currentScore > bestScore ? current : best
      }, availableOperators[0])

      const distance = (Math.random() * 3 + 1).toFixed(1)
      const aiReasoning = `Seleccionado por: Rating ${selectedOperator.rating}/5, distancia ${distance}km, sin tareas activas`

      setTasks(prev => prev.map(t => 
        t.id === taskId 
          ? { ...t, status: "assigned", operator: selectedOperator.name, operatorId: selectedOperator.id, aiReasoning } 
          : t
      ))
      
      setOperators(prev => prev.map(o =>
        o.id === selectedOperator.id 
          ? { ...o, status: "moving", targetX: 20 + Math.random() * 20, targetY: 20 + Math.random() * 60, distance: parseFloat(distance) }
          : o
      ))
      
      setStats(prev => ({ ...prev, active: prev.active + 1 }))

      addTimelineEvent({
        type: "operator_selected",
        taskId,
        operatorId: selectedOperator.id,
        title: `Operador asignado: ${selectedOperator.name}`,
        description: `Razon: ${aiReasoning}`,
        aiExplanation: `La IA evaluo ${availableOperators.length} operadores y selecciono al mejor candidato`,
        icon: User,
        color: "primary"
      })

      setTimeout(() => {
        addTimelineEvent({
          type: "operator_moving",
          taskId,
          operatorId: selectedOperator.id,
          title: "Operador en camino",
          description: `${selectedOperator.name} se dirige al destino (${distance}km)`,
          icon: Route,
          color: "blue"
        })
      }, 500 * speedMultiplier)
    }, 1200 * speedMultiplier)
  }, [operators, tasks, speedMultiplier, addTimelineEvent])

  // Progress task
  const progressTask = useCallback((taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t
      if (t.status === "assigned") {
        addTimelineEvent({
          type: "task_started",
          taskId,
          operatorId: t.operatorId,
          title: "Tarea iniciada",
          description: `${t.operator} comenzo a ejecutar: ${t.title}`,
          icon: Play,
          color: "emerald"
        })
        return { ...t, status: "in-progress", progress: 25 }
      }
      if (t.status === "in-progress" && t.progress < 100) {
        const newProgress = Math.min(t.progress + 25, 100)
        
        if (newProgress === 50) {
          addTimelineEvent({
            type: "evidence_uploaded",
            taskId,
            operatorId: t.operatorId,
            title: "Evidencia recibida",
            description: `${t.operator} subio foto de evidencia`,
            icon: Image,
            color: "emerald"
          })
        }
        
        if (newProgress === 100) {
          setStats(s => ({ ...s, completed: s.completed + 1, active: Math.max(0, s.active - 1) }))
          setOperators(ops => ops.map(o =>
            o.name === t.operator
              ? { ...o, status: "idle", targetX: 60 + Math.random() * 30, targetY: o.y }
              : o
          ))
          addTimelineEvent({
            type: "task_completed",
            taskId,
            operatorId: t.operatorId,
            title: "Tarea completada",
            description: `${t.operator} completo exitosamente: ${t.title}`,
            aiExplanation: "Cliente notificado, pago procesado, operador calificado",
            icon: CheckCircle,
            color: "emerald"
          })
          return { ...t, status: "completed", progress: 100 }
        }
        return { ...t, progress: newProgress }
      }
      return t
    }))
  }, [addTimelineEvent])

  // Main simulation loop
  useEffect(() => {
    if (!isRunning) return

    const createInterval = setInterval(() => {
      if (tasks.filter(t => t.status !== "completed").length < 4) {
        createTask()
      }
    }, 3500 * speedMultiplier)

    const processInterval = setInterval(() => {
      setTasks(prev => {
        const unassigned = prev.find(t => t.status === "created")
        if (unassigned && operators.some(o => o.status === "idle")) {
          assignTask(unassigned.id)
        }

        const inProgress = prev.filter(t => t.status === "assigned" || t.status === "in-progress")
        inProgress.forEach(t => progressTask(t.id))

        return prev
      })
    }, 2000 * speedMultiplier)

    const moveInterval = setInterval(() => {
      setOperators(prev => prev.map(o => {
        if ((o.status === "idle" || o.status === "moving") && o.targetX) {
          const dx = (o.targetX - o.x) * 0.1
          const dy = (o.targetY! - o.y) * 0.1
          if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
            return { ...o, targetX: undefined, targetY: undefined, status: o.status === "moving" ? "working" : "idle" }
          }
          return { ...o, x: o.x + dx, y: o.y + dy }
        }
        return o
      }))
    }, 100)

    return () => {
      clearInterval(createInterval)
      clearInterval(processInterval)
      clearInterval(moveInterval)
    }
  }, [isRunning, tasks, operators, createTask, assignTask, progressTask, speedMultiplier])

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "created": return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "assigning": return "bg-primary/20 text-primary border-primary/30"
      case "assigned": return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "in-progress": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "completed": return "bg-muted text-muted-foreground border-border"
    }
  }

  const getStatusText = (status: Task["status"]) => {
    switch (status) {
      case "created": return "Nueva"
      case "assigning": return "IA asignando..."
      case "assigned": return "Asignada"
      case "in-progress": return "En progreso"
      case "completed": return "Completada"
    }
  }

  const getEventColor = (color: string) => {
    switch (color) {
      case "amber": return "bg-amber-500/20 border-amber-500/30 text-amber-400"
      case "primary": return "bg-primary/20 border-primary/30 text-primary"
      case "blue": return "bg-blue-500/20 border-blue-500/30 text-blue-400"
      case "emerald": return "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
      default: return "bg-muted border-border text-muted-foreground"
    }
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-background via-card/50 to-background border border-border/50 ${className}`}>
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-xs font-medium text-muted-foreground">
            Simulacion en vivo
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-muted-foreground">
            <span className="text-amber-400 font-semibold">{stats.created}</span> creadas
          </span>
          <span className="text-muted-foreground">
            <span className="text-primary font-semibold">{stats.active}</span> activas
          </span>
          <span className="text-muted-foreground">
            <span className="text-emerald-400 font-semibold">{stats.completed}</span> completadas
          </span>
        </div>
      </div>

      {/* View Toggle */}
      <div className="absolute top-12 left-4 z-10">
        <Tabs value={activeView} onValueChange={(v) => setActiveView(v as "map" | "timeline")}>
          <TabsList className="h-8">
            <TabsTrigger value="map" className="text-xs h-6 px-2">Mapa</TabsTrigger>
            <TabsTrigger value="timeline" className="text-xs h-6 px-2">Timeline</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main content */}
      <div className="h-full min-h-[500px] pt-20">
        {activeView === "map" ? (
          <div className="h-full relative">
            {/* Grid background */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="sim-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#sim-grid)" />
              </svg>
            </div>

            {/* AI Core */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <motion.div
                className="w-20 h-20 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 20px oklch(0.75 0.15 195 / 0.3)",
                    "0 0 40px oklch(0.75 0.15 195 / 0.5)",
                    "0 0 20px oklch(0.75 0.15 195 / 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Brain className="w-10 h-10 text-primary" />
              </motion.div>
              <p className="text-xs text-primary font-semibold text-center mt-2">PROXY AI</p>
              <p className="text-[10px] text-muted-foreground text-center">Coordinador</p>
            </motion.div>

            {/* Connection lines */}
            <svg className="absolute inset-0 pointer-events-none" style={{ overflow: "visible" }}>
              {operators.map((op) => (
                <motion.line
                  key={`line-${op.id}`}
                  x1="50%"
                  y1="50%"
                  x2={`${op.x}%`}
                  y2={`${op.y}%`}
                  stroke={op.status === "working" ? "oklch(0.7 0.18 145 / 0.5)" : "oklch(0.3 0.02 250)"}
                  strokeWidth={op.status === "working" ? 2 : 1}
                  strokeDasharray={op.status === "moving" ? "5,5" : "none"}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </svg>

            {/* Operators */}
            {operators.map((op) => (
              <motion.div
                key={op.id}
                className="absolute flex flex-col items-center cursor-pointer"
                style={{ left: `${op.x}%`, top: `${op.y}%` }}
                animate={{ x: "-50%", y: "-50%" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    op.status === "working" 
                      ? "bg-emerald-500/20 border-emerald-400" 
                      : op.status === "moving"
                      ? "bg-primary/20 border-primary"
                      : "bg-muted border-border"
                  }`}
                  animate={op.status === "working" ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <User className={`w-6 h-6 ${
                    op.status === "working" 
                      ? "text-emerald-400" 
                      : op.status === "moving"
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`} />
                </motion.div>
                <span className="text-[10px] text-muted-foreground mt-1 whitespace-nowrap font-medium">
                  {op.name}
                </span>
                <div className="flex items-center gap-0.5 mt-0.5">
                  <Star className="w-2 h-2 text-amber-400 fill-amber-400" />
                  <span className="text-[9px] text-muted-foreground">{op.rating}</span>
                </div>
              </motion.div>
            ))}

            {/* Task feed */}
            <div className="absolute left-4 top-20 bottom-4 w-60 overflow-hidden">
              <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                <Zap className="w-3 h-3 text-primary" />
                Tareas activas
              </div>
              <div className="space-y-2 overflow-y-auto max-h-[calc(100%-24px)]">
                <AnimatePresence mode="popLayout">
                  {tasks.slice(-6).reverse().map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedTask(selectedTask?.id === task.id ? null : task)}
                    >
                      <Card className={`bg-card/80 backdrop-blur-sm border-border/50 cursor-pointer transition-all ${
                        selectedTask?.id === task.id ? "ring-1 ring-primary/50" : index === 0 ? "ring-1 ring-primary/30" : ""
                      }`}>
                        <CardContent className="p-3">
                          <div className="flex items-start gap-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              task.status === "completed" ? "bg-muted" : "bg-primary/10"
                            }`}>
                              <task.icon className={`w-4 h-4 ${
                                task.status === "completed" ? "text-muted-foreground" : "text-primary"
                              }`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-medium truncate ${
                                task.status === "completed" ? "text-muted-foreground" : ""
                              }`}>
                                {task.title}
                              </p>
                              <div className="flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3 text-muted-foreground" />
                                <span className="text-[10px] text-muted-foreground">{task.location}</span>
                              </div>
                              <div className="flex items-center justify-between mt-1.5">
                                <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getStatusColor(task.status)}`}>
                                  {getStatusText(task.status)}
                                </Badge>
                                {task.operator && (
                                  <span className="text-[10px] text-muted-foreground">{task.operator}</span>
                                )}
                              </div>
                              {task.status === "in-progress" && (
                                <div className="mt-1.5">
                                  <Progress value={task.progress} className="h-1" />
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* AI Reasoning (expanded) */}
                          <AnimatePresence>
                            {selectedTask?.id === task.id && task.aiReasoning && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-2 pt-2 border-t border-border/50"
                              >
                                <div className="flex items-start gap-1.5">
                                  <Info className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                                  <p className="text-[10px] text-muted-foreground">
                                    <span className="text-primary font-medium">IA: </span>
                                    {task.aiReasoning}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 flex items-center gap-4 text-[10px] text-muted-foreground bg-card/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/50">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Cliente</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>IA</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Operador</span>
              </div>
            </div>
          </div>
        ) : (
          /* Timeline View */
          <div className="h-full px-4 pb-4 overflow-y-auto">
            <div className="space-y-3 pt-4">
              {timeline.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Los eventos de la simulacion apareceran aqui
                  </p>
                </div>
              ) : (
                timeline.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative pl-6"
                  >
                    {/* Timeline line */}
                    {index < timeline.length - 1 && (
                      <div className="absolute left-[9px] top-8 bottom-0 w-0.5 bg-border" />
                    )}
                    
                    {/* Event dot */}
                    <div className={`absolute left-0 top-1 w-5 h-5 rounded-full flex items-center justify-center ${getEventColor(event.color)}`}>
                      <event.icon className="w-3 h-3" />
                    </div>
                    
                    <Card className={`${getEventColor(event.color)} border`}>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium">{event.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {event.description}
                            </p>
                            {event.aiExplanation && (
                              <div className="flex items-start gap-1 mt-2 p-2 rounded bg-background/50">
                                <Brain className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                                <p className="text-[10px] text-muted-foreground">
                                  {event.aiExplanation}
                                </p>
                              </div>
                            )}
                          </div>
                          <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                            {event.timestamp.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* How it works overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <Card className="bg-card/90 backdrop-blur-sm border-border/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-6 text-[10px]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <span className="text-amber-400 font-bold">1</span>
                </div>
                <span className="text-muted-foreground">Cliente crea tarea</span>
              </div>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold">2</span>
                </div>
                <span className="text-muted-foreground">IA asigna operador</span>
              </div>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-emerald-400 font-bold">3</span>
                </div>
                <span className="text-muted-foreground">Operador ejecuta</span>
              </div>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-muted-foreground">Tarea completada</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
