"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { 
  Users, 
  UserCog, 
  ClipboardList, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  MapPin,
  Star,
  ChevronRight,
  Zap
} from "lucide-react"
import { useMockData } from "@/lib/mock-data"

const stats = [
  {
    label: "Operadores Activos",
    value: "247",
    change: "+12%",
    trend: "up",
    icon: UserCog,
    color: "primary"
  },
  {
    label: "Clientes Totales",
    value: "1,843",
    change: "+8%",
    trend: "up",
    icon: Users,
    color: "emerald"
  },
  {
    label: "Tareas Hoy",
    value: "342",
    change: "+23%",
    trend: "up",
    icon: ClipboardList,
    color: "amber"
  },
  {
    label: "Ingresos Mes",
    value: "$45.2M",
    change: "+15%",
    trend: "up",
    icon: DollarSign,
    color: "blue"
  }
]

const recentActivities = [
  { type: "task_completed", message: "TASK-342 completada por Carlos Martinez", time: "Hace 2 min", icon: CheckCircle, color: "emerald" },
  { type: "new_operator", message: "Nuevo operador registrado: Maria Lopez", time: "Hace 15 min", icon: UserCog, color: "primary" },
  { type: "alert", message: "Tarea TASK-289 requiere atencion", time: "Hace 30 min", icon: AlertCircle, color: "amber" },
  { type: "task_created", message: "Nueva tarea urgente creada", time: "Hace 45 min", icon: Zap, color: "amber" },
  { type: "payout", message: "Pago procesado: $1,250,000 a operadores", time: "Hace 1 hora", icon: DollarSign, color: "blue" },
]

const topOperators = [
  { name: "Carlos Martinez", initials: "CM", rating: 4.9, tasks: 156, earnings: "$2.4M" },
  { name: "Maria Lopez", initials: "ML", rating: 4.8, tasks: 143, earnings: "$2.1M" },
  { name: "Juan Rodriguez", initials: "JR", rating: 4.8, tasks: 138, earnings: "$1.9M" },
  { name: "Ana Garcia", initials: "AG", rating: 4.7, tasks: 125, earnings: "$1.7M" },
]

export default function AdminDashboard() {
  const { tasks, operators } = useMockData()
  
  const activeTasks = tasks.filter(t => ["active", "in-progress", "assigned"].includes(t.status))
  const pendingTasks = tasks.filter(t => ["created", "pending", "assigning"].includes(t.status))
  const completedTasks = tasks.filter(t => t.status === "completed")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Bienvenido al panel de administracion</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
            <Activity className="w-3 h-3 mr-1" />
            Sistema activo
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-lg bg-${stat.color}/10 flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${
                    stat.trend === "up" ? "text-emerald-500" : "text-destructive"
                  }`}>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks Overview */}
        <Card className="lg:col-span-2 bg-card/50 border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Resumen de Tareas</CardTitle>
              <Link href="/admin/tareas">
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  Ver todas
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-primary/5 rounded-lg p-4 text-center border border-primary/10">
                <p className="text-3xl font-bold text-primary">{activeTasks.length}</p>
                <p className="text-xs text-muted-foreground">En progreso</p>
              </div>
              <div className="bg-amber-500/5 rounded-lg p-4 text-center border border-amber-500/10">
                <p className="text-3xl font-bold text-amber-500">{pendingTasks.length}</p>
                <p className="text-xs text-muted-foreground">Pendientes</p>
              </div>
              <div className="bg-emerald-500/5 rounded-lg p-4 text-center border border-emerald-500/10">
                <p className="text-3xl font-bold text-emerald-500">{completedTasks.length}</p>
                <p className="text-xs text-muted-foreground">Completadas</p>
              </div>
            </div>

            {/* Task distribution */}
            <div className="space-y-3">
              <p className="text-sm font-medium">Distribucion por tipo</p>
              {[
                { type: "Entregas", count: 45, percentage: 35, color: "primary" },
                { type: "Verificaciones", count: 32, percentage: 25, color: "emerald" },
                { type: "Fotografia", count: 28, percentage: 22, color: "amber" },
                { type: "Otros", count: 23, percentage: 18, color: "blue" },
              ].map((item) => (
                <div key={item.type} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{item.type}</span>
                    <span className="font-medium">{item.count} ({item.percentage}%)</span>
                  </div>
                  <Progress value={item.percentage} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-8 h-8 rounded-full bg-${activity.color}/10 flex items-center justify-center flex-shrink-0`}>
                    <activity.icon className={`w-4 h-4 text-${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Operators */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Top Operadores</CardTitle>
              <Link href="/admin/operadores">
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  Ver todos
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topOperators.map((operator, index) => (
                <div key={operator.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <span className="text-sm font-medium text-muted-foreground w-5">{index + 1}</span>
                  <Avatar className="w-9 h-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {operator.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{operator.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        {operator.rating}
                      </span>
                      <span>{operator.tasks} tareas</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-emerald-500">{operator.earnings}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Map / Coverage */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Cobertura por Ciudad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { city: "Bogota", operators: 124, tasks: 156, percentage: 45 },
                { city: "Medellin", operators: 67, tasks: 89, percentage: 26 },
                { city: "Cali", operators: 34, tasks: 45, percentage: 13 },
                { city: "Barranquilla", operators: 22, tasks: 32, percentage: 9 },
                { city: "Otras", operators: 15, tasks: 20, percentage: 7 },
              ].map((city) => (
                <div key={city.city} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{city.city}</span>
                      <span className="text-xs text-muted-foreground">{city.percentage}%</span>
                    </div>
                    <Progress value={city.percentage} className="h-1.5" />
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{city.operators} operadores</span>
                      <span>{city.tasks} tareas activas</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
