"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { MapPlaceholder } from "@/components/map-placeholder"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  FadeIn, 
  StaggerContainer, 
  StaggerItem, 
  ScaleOnHover,
  AnimatedCounter,
  CardSkeleton,
  PageTransition,
  Pulse
} from "@/components/motion-primitives"
import { 
  Star, 
  Package, 
  Camera, 
  FileText, 
  Users, 
  Search, 
  MapPin, 
  Clock, 
  DollarSign,
  ChevronRight,
  Zap,
  Bell,
  CheckCircle,
  AlertCircle,
  Microscope
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useMockData, type Task } from "@/lib/mock-data"

const taskTypeIcons: Record<Task["type"], React.ComponentType<{ className?: string }>> = {
  entrega: Package,
  verificacion: Search,
  fotografia: Camera,
  documentos: FileText,
  acompanamiento: Users,
  investigacion: Microscope
}

const mapPins = [
  { x: 25, y: 30, active: true },
  { x: 45, y: 45, active: true },
  { x: 70, y: 25, active: false },
  { x: 60, y: 60, active: true },
  { x: 30, y: 70, active: false },
]

const mockNotifications = [
  {
    id: "1",
    type: "success",
    title: "Tarea completada",
    message: "TASK-008 completada exitosamente. +$25,000",
    time: "Hace 10 min",
    read: false
  },
  {
    id: "2",
    type: "info",
    title: "Nueva tarea urgente",
    message: "Tarea de entrega express disponible cerca de ti",
    time: "Hace 25 min",
    read: false
  },
  {
    id: "3",
    type: "warning",
    title: "Verificacion pendiente",
    message: "Completa tu verificacion para acceder a mas tareas",
    time: "Hace 2 horas",
    read: true
  }
]

export default function OperadorDashboard() {
  const { tasks, currentOperator } = useMockData()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [notifications, setNotifications] = useState(3)

  // Get available tasks (pending or created tasks that aren't assigned yet)
  const availableTasks = tasks.filter(t => 
    ["created", "pending", "assigning"].includes(t.status) && !t.operatorId
  ).map(task => {
    const IconComponent = taskTypeIcons[task.type] || Package
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      location: `${task.location}, Bogota`,
      distance: `${(Math.random() * 5 + 1).toFixed(1)} km`,
      payout: task.payout,
      urgency: task.priority === "urgente" ? "urgent" : "normal",
      icon: IconComponent,
      estimatedTime: task.estimatedTime,
    }
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col h-full p-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
            <div className="h-3 w-24 bg-muted rounded animate-pulse" />
          </div>
        </div>
        <div className="h-40 bg-muted rounded-xl animate-pulse" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <PageTransition className="flex flex-col h-full">
      {/* Header - Optimized for thumb reach */}
      <div className="px-4 pt-4 pb-3 space-y-3">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Avatar className="w-12 h-12 border-2 border-primary ring-2 ring-primary/20">
                <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                  CM
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div>
              <h1 className="font-semibold text-foreground">Carlos Martinez</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div
                      key={star}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: star * 0.1 }}
                    >
                      <Star
                        className={`w-3 h-3 ${star <= 4 ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`}
                      />
                    </motion.div>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">4.8</span>
              </div>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    {notifications > 0 && (
                      <motion.span
                        className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full text-[10px] font-bold flex items-center justify-center text-destructive-foreground"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        {notifications}
                      </motion.span>
                    )}
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notificaciones</span>
                  <span className="text-xs text-muted-foreground font-normal">{mockNotifications.filter(n => !n.read).length} sin leer</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {mockNotifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex gap-3 p-3 cursor-pointer">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      notification.type === "success" && "bg-emerald-500/10",
                      notification.type === "info" && "bg-primary/10",
                      notification.type === "warning" && "bg-amber-500/10"
                    )}>
                      {notification.type === "success" && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      {notification.type === "info" && <Clock className="w-4 h-4 text-primary" />}
                      {notification.type === "warning" && <AlertCircle className="w-4 h-4 text-amber-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm font-medium", !notification.read && "text-foreground")}>{notification.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{notification.message}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    )}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-primary text-sm cursor-pointer">
                  Ver todas
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <StatusBadge status="active">Nivel 3</StatusBadge>
          </div>
        </div>
        
        {/* Quick stats */}
        <motion.div 
          className="flex items-center justify-between bg-card/50 rounded-xl p-3 border border-border/50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center flex-1">
            <p className="text-lg font-bold text-primary">
              <AnimatedCounter value={127500} prefix="$" suffix="" />
            </p>
            <p className="text-[10px] text-muted-foreground">Hoy</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center flex-1">
            <p className="text-lg font-bold text-emerald-400">
              <AnimatedCounter value={8} />
            </p>
            <p className="text-[10px] text-muted-foreground">Completadas</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center flex-1">
            <p className="text-lg font-bold text-amber-400">4.8</p>
            <p className="text-[10px] text-muted-foreground">Rating</p>
          </div>
        </motion.div>
      </div>

      {/* Map - Larger touch target */}
      <FadeIn delay={0.1} className="px-4 pb-3">
        <div className="relative">
          <MapPlaceholder 
            className="h-44 rounded-xl" 
            pins={mapPins}
            showOperator
            operatorPosition={{ x: 50, y: 50 }}
          />
          {/* Map overlay button */}
          <motion.button
            className="absolute bottom-3 right-3 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border/50 text-xs font-medium flex items-center gap-1.5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MapPin className="w-3.5 h-3.5 text-primary" />
            Ver mapa completo
          </motion.button>
        </div>
      </FadeIn>

      {/* Tasks header */}
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <Zap className="w-4 h-4 text-primary" />
          </motion.div>
          <h2 className="font-semibold text-sm">Tareas disponibles</h2>
        </div>
        <motion.span 
          className="text-xs text-muted-foreground flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          {availableTasks.length} cerca de ti
        </motion.span>
      </div>

      {/* Tasks list - Optimized for mobile */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        <StaggerContainer staggerDelay={0.08}>
          {availableTasks.map((task) => (
            <StaggerItem key={task.id}>
              <Link href={`/operador/tarea/${task.id}`}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setSelectedTask(task.id)}
                  onHoverEnd={() => setSelectedTask(null)}
                >
                  <Card className={`bg-card/50 border-border/50 transition-all duration-300 overflow-hidden ${
                    selectedTask === task.id ? "border-primary/50 shadow-lg shadow-primary/10" : "hover:border-primary/30"
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {/* Icon - Larger touch target */}
                        <motion.div 
                          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            task.urgency === "urgent" 
                              ? "bg-amber-400/10 border border-amber-400/30" 
                              : "bg-primary/10"
                          }`}
                          whileHover={{ rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 0.3 }}
                        >
                          <task.icon className={`w-6 h-6 ${
                            task.urgency === "urgent" ? "text-amber-400" : "text-primary"
                          }`} />
                        </motion.div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-sm">{task.title}</h3>
                            {task.urgency === "urgent" && (
                              <Pulse color="oklch(0.8 0.16 85)">
                                <StatusBadge status="urgent">Urgente</StatusBadge>
                              </Pulse>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                            {task.description}
                          </p>
                          
                          {/* Info row - Better spacing for touch */}
                          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {task.distance}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {task.estimatedTime}
                            </span>
                          </div>
                          
                          {/* Payout - Prominent display */}
                          <div className="flex items-center justify-between mt-3">
                            <span className="flex items-center gap-1 text-primary font-bold text-base">
                              <DollarSign className="w-4 h-4" />
                              <AnimatedCounter 
                                value={task.payout} 
                                duration={0.8}
                              />
                              <span className="text-xs font-normal text-muted-foreground ml-0.5">COP</span>
                            </span>
                            <motion.div
                              className="flex items-center gap-1 text-xs text-muted-foreground"
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              Ver detalles
                              <ChevronRight className="w-4 h-4" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </PageTransition>
  )
}
