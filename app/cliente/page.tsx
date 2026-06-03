"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { MapPlaceholder } from "@/components/map-placeholder"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  FadeIn, 
  StaggerContainer, 
  StaggerItem, 
  AnimatedCounter, 
  ScaleOnHover,
  CardSkeleton,
  TableSkeleton,
  EmptyState,
  PageTransition
} from "@/components/motion-primitives"
import { 
  ClipboardList, 
  CheckCircle, 
  TrendingUp, 
  Clock,
  Plus,
  Eye,
  MapPin,
  Zap,
  RefreshCw,
  Search
} from "lucide-react"

const kpiData = [
  { 
    title: "Tareas Activas", 
    value: 12, 
    change: "+3 hoy",
    icon: ClipboardList,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  { 
    title: "Completadas este mes", 
    value: 156, 
    change: "+23% vs mes anterior",
    icon: CheckCircle,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10"
  },
  { 
    title: "Tasa de exito", 
    value: 98.2, 
    change: "+0.5%",
    icon: TrendingUp,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    suffix: "%",
    decimals: 1
  },
  { 
    title: "Tiempo promedio", 
    value: 32, 
    change: "-5 min vs promedio",
    icon: Clock,
    color: "text-primary",
    bgColor: "bg-primary/10",
    suffix: " min"
  },
]

const activeTasks = [
  {
    id: "TASK-001",
    description: "Entrega de documentos legales",
    operator: "Carlos Martinez",
    status: "active",
    progress: 65,
    elapsed: "18 min",
    location: "Usaquen"
  },
  {
    id: "TASK-002",
    description: "Verificacion de direccion comercial",
    operator: "Maria Lopez",
    status: "active",
    progress: 30,
    elapsed: "8 min",
    location: "Chapinero"
  },
  {
    id: "TASK-003",
    description: "Fotografia de inventario",
    operator: "Andres Garcia",
    status: "pending",
    progress: 0,
    elapsed: "Asignando...",
    location: "Fontibon"
  },
  {
    id: "TASK-004",
    description: "Entrega express - Zona T",
    operator: "Laura Rodriguez",
    status: "active",
    progress: 85,
    elapsed: "22 min",
    location: "Zona T"
  },
  {
    id: "TASK-005",
    description: "Acompanamiento a cita medica",
    operator: "Diego Hernandez",
    status: "active",
    progress: 45,
    elapsed: "45 min",
    location: "Cedritos"
  },
]

const operatorPins = [
  { x: 20, y: 30, active: true, label: "Carlos" },
  { x: 45, y: 20, active: true, label: "Maria" },
  { x: 70, y: 50, active: true, label: "Laura" },
  { x: 35, y: 65, active: true, label: "Diego" },
  { x: 80, y: 35, active: false },
]

export default function ClienteDashboard() {
  const [animatedPins, setAnimatedPins] = useState(operatorPins)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Simulate real-time movement
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedPins(pins => pins.map(pin => ({
        ...pin,
        x: pin.active ? Math.max(10, Math.min(90, pin.x + (Math.random() - 0.5) * 3)) : pin.x,
        y: pin.active ? Math.max(10, Math.min(90, pin.y + (Math.random() - 0.5) * 3)) : pin.y,
      })))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  if (isLoading) {
    return (
      <PageTransition className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="h-8 w-32 bg-muted rounded animate-pulse" />
            <div className="h-4 w-48 bg-muted rounded mt-2 animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
        <CardSkeleton className="h-64" />
        <TableSkeleton rows={5} />
      </PageTransition>
    )
  }

  return (
    <PageTransition className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <FadeIn>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Dashboard
              <motion.div
                className="w-2 h-2 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </h1>
            <p className="text-muted-foreground">Resumen de operaciones en tiempo real</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <motion.div
                animate={refreshing ? { rotate: 360 } : {}}
                transition={{ duration: 1, repeat: refreshing ? Infinity : 0, ease: "linear" }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
              </motion.div>
              Actualizar
            </Button>
            <ScaleOnHover>
              <Button asChild>
                <Link href="/cliente/nueva-tarea">
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Tarea
                </Link>
              </Button>
            </ScaleOnHover>
          </div>
        </FadeIn>
      </div>

      {/* KPI Cards */}
      <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <StaggerItem key={kpi.title}>
            <ScaleOnHover>
              <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden group">
                <CardContent className="p-4 relative">
                  {/* Background glow on hover */}
                  <motion.div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${kpi.bgColor}`}
                    style={{ filter: "blur(40px)" }}
                  />
                  <div className="flex items-start justify-between relative">
                    <div>
                      <p className="text-sm text-muted-foreground">{kpi.title}</p>
                      <p className={`text-2xl font-bold mt-1 ${kpi.color}`}>
                        <AnimatedCounter 
                          value={kpi.value} 
                          suffix={kpi.suffix || ""} 
                          decimals={kpi.decimals || 0}
                        />
                      </p>
                      <motion.p 
                        className="text-xs text-muted-foreground mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {kpi.change}
                      </motion.p>
                    </div>
                    <motion.div 
                      className={`w-10 h-10 rounded-lg ${kpi.bgColor} flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </ScaleOnHover>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Map */}
      <FadeIn delay={0.3}>
        <Card className="bg-card/50 border-border/50 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MapPin className="w-5 h-5 text-primary" />
              </motion.div>
              Operadores en tiempo real
              <motion.span
                className="ml-2 text-xs font-normal text-muted-foreground flex items-center gap-1"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {animatedPins.filter(p => p.active).length} activos
              </motion.span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MapPlaceholder 
              className="h-64 lg:h-80" 
              pins={animatedPins}
              showOperator={false}
            />
          </CardContent>
        </Card>
      </FadeIn>

      {/* Active Tasks Table */}
      <FadeIn delay={0.4}>
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Tareas Activas
              </CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/cliente/tareas-activas">Ver todas</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {activeTasks.length === 0 ? (
              <EmptyState
                icon={<Search className="w-8 h-8 text-muted-foreground" />}
                title="No hay tareas activas"
                description="Crea tu primera tarea para comenzar a coordinar operadores."
                action={
                  <Button asChild>
                    <Link href="/cliente/nueva-tarea">
                      <Plus className="w-4 h-4 mr-2" />
                      Nueva Tarea
                    </Link>
                  </Button>
                }
              />
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Descripcion</TableHead>
                      <TableHead>Operador</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Progreso</TableHead>
                      <TableHead>Tiempo</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {activeTasks.map((task, index) => (
                        <motion.tr
                          key={task.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.05 }}
                          className="group hover:bg-muted/30 transition-colors"
                        >
                          <TableCell className="font-mono text-xs">{task.id}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{task.description}</TableCell>
                          <TableCell>{task.operator}</TableCell>
                          <TableCell>
                            <StatusBadge status={task.status as "active" | "pending"}>
                              {task.status === "active" ? "En progreso" : "Pendiente"}
                            </StatusBadge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 min-w-[100px]">
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-primary rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${task.progress}%` }}
                                  transition={{ duration: 0.5, delay: index * 0.1 }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground w-8">{task.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{task.elapsed}</TableCell>
                          <TableCell className="text-right">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <Button variant="ghost" size="icon" asChild>
                                <Link href={`/cliente/tarea/${task.id}`}>
                                  <Eye className="w-4 h-4" />
                                </Link>
                              </Button>
                            </motion.div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </FadeIn>
    </PageTransition>
  )
}
