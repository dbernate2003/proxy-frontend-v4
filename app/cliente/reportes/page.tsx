"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts"
import { 
  Calendar,
  Download,
  TrendingUp,
  BarChart3,
  PieChartIcon
} from "lucide-react"

const tasksOverTime = [
  { date: "1 Jun", completed: 12, cancelled: 1 },
  { date: "5 Jun", completed: 18, cancelled: 0 },
  { date: "10 Jun", completed: 25, cancelled: 2 },
  { date: "15 Jun", completed: 22, cancelled: 1 },
  { date: "20 Jun", completed: 30, cancelled: 0 },
  { date: "25 Jun", completed: 28, cancelled: 1 },
  { date: "30 Jun", completed: 35, cancelled: 0 },
]

const tasksByCategory = [
  { category: "Entrega", count: 85 },
  { category: "Verificación", count: 42 },
  { category: "Fotografía", count: 28 },
  { category: "Documentos", count: 35 },
  { category: "Acompañamiento", count: 12 },
  { category: "Investigación", count: 8 },
]

const statusDistribution = [
  { name: "Exitosas", value: 156, color: "#10b981" },
  { name: "Canceladas", value: 5, color: "#ef4444" },
  { name: "Fallidas", value: 3, color: "#f59e0b" },
]

const topTaskTypes = [
  { type: "Entrega express", count: 45, avgCost: 28000, avgTime: "25 min" },
  { type: "Verificación de dirección", count: 38, avgCost: 22000, avgTime: "18 min" },
  { type: "Entrega de documentos", count: 32, avgCost: 18500, avgTime: "32 min" },
  { type: "Fotografía de producto", count: 25, avgCost: 45000, avgTime: "45 min" },
  { type: "Acompañamiento", count: 12, avgCost: 55000, avgTime: "90 min" },
]

export default function ReportesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reportes y Analíticas</h1>
          <p className="text-muted-foreground">Análisis detallado de tus operaciones</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px] bg-secondary border-0">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Últimos 7 días</SelectItem>
              <SelectItem value="30days">Últimos 30 días</SelectItem>
              <SelectItem value="90days">Últimos 90 días</SelectItem>
              <SelectItem value="year">Este año</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Charts grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Tasks over time */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Tareas completadas por día
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tasksOverTime}>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#1a1f35', 
                      border: '1px solid #2a2f45',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    name="Completadas"
                    stroke="oklch(0.75 0.15 195)" 
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.75 0.15 195)" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cancelled" 
                    name="Canceladas"
                    stroke="#ef4444" 
                    strokeWidth={2}
                    dot={{ fill: "#ef4444" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tasks by category */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Tareas por categoría
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tasksByCategory} layout="vertical">
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} />
                  <YAxis 
                    dataKey="category" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 12 }}
                    width={100}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#1a1f35', 
                      border: '1px solid #2a2f45',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="oklch(0.75 0.15 195)" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status distribution */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-primary" />
              Distribución por resultado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      background: '#1a1f35', 
                      border: '1px solid #2a2f45',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {statusDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top task types table */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Top tipos de tarea</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Cantidad</TableHead>
                  <TableHead className="text-right">Costo promedio</TableHead>
                  <TableHead className="text-right">Tiempo promedio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topTaskTypes.map((item) => (
                  <TableRow key={item.type}>
                    <TableCell className="font-medium">{item.type}</TableCell>
                    <TableCell className="text-right">{item.count}</TableCell>
                    <TableCell className="text-right text-primary">
                      ${item.avgCost.toLocaleString("es-CO")}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {item.avgTime}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
