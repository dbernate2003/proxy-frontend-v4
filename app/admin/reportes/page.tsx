"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  ClipboardList,
  DollarSign,
  Clock,
  Star,
  MapPin,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react"

export default function AdminReportesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reportes</h1>
          <p className="text-sm text-muted-foreground">Analisis y metricas de la plataforma</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Descargar reporte
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Tasa de completitud", value: "94.5%", change: "+2.3%", trend: "up", icon: ClipboardList },
          { label: "Tiempo promedio", value: "32 min", change: "-5 min", trend: "up", icon: Clock },
          { label: "Satisfaccion cliente", value: "4.8/5", change: "+0.2", trend: "up", icon: Star },
          { label: "Operadores activos", value: "89%", change: "+5%", trend: "up", icon: Users },
        ].map((kpi) => (
          <Card key={kpi.label} className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <kpi.icon className="w-4 h-4 text-primary" />
                </div>
                <span className={`text-xs ${kpi.trend === "up" ? "text-emerald-500" : "text-destructive"}`}>
                  {kpi.change}
                </span>
              </div>
              <p className="text-xl font-bold">{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Performance */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Rendimiento de Tareas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Completadas a tiempo", value: 87, color: "emerald" },
                { label: "Completadas con retraso", value: 8, color: "amber" },
                { label: "Canceladas", value: 3, color: "destructive" },
                { label: "En revision", value: 2, color: "primary" },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{item.label}</span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Task Types Distribution */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <PieChart className="w-4 h-4 text-primary" />
              Distribucion por Tipo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { type: "Entregas", count: 1250, percentage: 35, color: "bg-primary" },
                { type: "Verificaciones", count: 890, percentage: 25, color: "bg-emerald-500" },
                { type: "Fotografia", count: 712, percentage: 20, color: "bg-amber-500" },
                { type: "Documentos", count: 534, percentage: 15, color: "bg-blue-500" },
                { type: "Acompanamiento", count: 178, percentage: 5, color: "bg-purple-500" },
              ].map((item) => (
                <div key={item.type} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded ${item.color}`} />
                  <div>
                    <p className="text-sm font-medium">{item.type}</p>
                    <p className="text-xs text-muted-foreground">{item.count} ({item.percentage}%)</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Peak Hours */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Horas Pico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { hour: "8:00 - 10:00", tasks: 145, percentage: 85 },
                { hour: "10:00 - 12:00", tasks: 120, percentage: 70 },
                { hour: "12:00 - 14:00", tasks: 85, percentage: 50 },
                { hour: "14:00 - 16:00", tasks: 130, percentage: 76 },
                { hour: "16:00 - 18:00", tasks: 170, percentage: 100 },
              ].map((item) => (
                <div key={item.hour} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-24">{item.hour}</span>
                  <div className="flex-1">
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                  <span className="text-xs font-medium w-12 text-right">{item.tasks}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Performance */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Rendimiento por Ciudad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { city: "Bogota", rating: 4.8, completion: 95, tasks: 1560 },
                { city: "Medellin", rating: 4.7, completion: 93, tasks: 890 },
                { city: "Cali", rating: 4.6, completion: 91, tasks: 450 },
                { city: "Barranquilla", rating: 4.5, completion: 89, tasks: 320 },
              ].map((item) => (
                <div key={item.city} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-sm">{item.city}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      {item.rating}
                    </span>
                    <span className="text-emerald-500">{item.completion}%</span>
                    <span className="text-muted-foreground">{item.tasks}</span>
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
