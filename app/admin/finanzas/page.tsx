"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  Download,
  CreditCard,
  Wallet,
  PiggyBank,
  Receipt
} from "lucide-react"

const monthlyData = [
  { month: "Ene", ingresos: 32000000, pagos: 24000000 },
  { month: "Feb", ingresos: 35000000, pagos: 26000000 },
  { month: "Mar", ingresos: 38000000, pagos: 28000000 },
  { month: "Abr", ingresos: 41000000, pagos: 31000000 },
  { month: "May", ingresos: 45000000, pagos: 34000000 },
  { month: "Jun", ingresos: 48000000, pagos: 36000000 },
]

const recentTransactions = [
  { id: "TXN-001", type: "ingreso", description: "Recarga Empresa Demo S.A.S", amount: 500000, date: "Hoy, 10:30 AM" },
  { id: "TXN-002", type: "pago", description: "Pago a Carlos Martinez", amount: -85000, date: "Hoy, 09:15 AM" },
  { id: "TXN-003", type: "pago", description: "Pago a Maria Lopez", amount: -72000, date: "Hoy, 08:45 AM" },
  { id: "TXN-004", type: "ingreso", description: "Recarga TechCorp Colombia", amount: 250000, date: "Ayer, 16:20 PM" },
  { id: "TXN-005", type: "pago", description: "Pago a Juan Rodriguez", amount: -95000, date: "Ayer, 14:30 PM" },
]

export default function AdminFinanzasPage() {
  const currentMonth = monthlyData[monthlyData.length - 1]
  const prevMonth = monthlyData[monthlyData.length - 2]
  const ingresosChange = ((currentMonth.ingresos - prevMonth.ingresos) / prevMonth.ingresos) * 100
  const pagosChange = ((currentMonth.pagos - prevMonth.pagos) / prevMonth.pagos) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Finanzas</h1>
          <p className="text-sm text-muted-foreground">Resumen financiero de la plataforma</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Exportar reporte
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-500">
                <ArrowUpRight className="w-3 h-3" />
                +{ingresosChange.toFixed(1)}%
              </div>
            </div>
            <p className="text-2xl font-bold">${(currentMonth.ingresos / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-muted-foreground">Ingresos este mes</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex items-center gap-1 text-xs text-blue-500">
                <ArrowUpRight className="w-3 h-3" />
                +{pagosChange.toFixed(1)}%
              </div>
            </div>
            <p className="text-2xl font-bold">${(currentMonth.pagos / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-muted-foreground">Pagos a operadores</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <PiggyBank className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-bold">${((currentMonth.ingresos - currentMonth.pagos) / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-muted-foreground">Margen este mes</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            <p className="text-2xl font-bold">$8.2M</p>
            <p className="text-xs text-muted-foreground">Saldo clientes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Chart */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Resumen Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.slice(-4).map((month) => (
                <div key={month.month} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{month.month}</span>
                    <span className="text-muted-foreground">
                      ${(month.ingresos / 1000000).toFixed(1)}M / ${(month.pagos / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex gap-1 h-2">
                    <div 
                      className="bg-emerald-500 rounded-l"
                      style={{ width: `${(month.ingresos / 50000000) * 100}%` }}
                    />
                    <div 
                      className="bg-blue-500 rounded-r"
                      style={{ width: `${(month.pagos / 50000000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-emerald-500" />
                  Ingresos
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-blue-500" />
                  Pagos
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Transacciones Recientes</CardTitle>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                Ver todas
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((txn) => (
                <div key={txn.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    txn.type === "ingreso" ? "bg-emerald-500/10" : "bg-blue-500/10"
                  }`}>
                    {txn.type === "ingreso" ? (
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Receipt className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{txn.description}</p>
                    <p className="text-xs text-muted-foreground">{txn.date}</p>
                  </div>
                  <span className={`text-sm font-medium ${
                    txn.amount > 0 ? "text-emerald-500" : "text-muted-foreground"
                  }`}>
                    {txn.amount > 0 ? "+" : ""}${Math.abs(txn.amount).toLocaleString("es-CO")}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Distribution */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Distribucion de Pagos por Ciudad</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { city: "Bogota", amount: 18500000, percentage: 45 },
              { city: "Medellin", amount: 8200000, percentage: 20 },
              { city: "Cali", amount: 6150000, percentage: 15 },
              { city: "Barranquilla", amount: 4100000, percentage: 10 },
              { city: "Otras", amount: 4100000, percentage: 10 },
            ].map((city) => (
              <div key={city.city} className="bg-secondary/30 rounded-lg p-4">
                <p className="font-medium text-sm mb-1">{city.city}</p>
                <p className="text-xl font-bold">${(city.amount / 1000000).toFixed(1)}M</p>
                <Progress value={city.percentage} className="h-1.5 mt-2" />
                <p className="text-xs text-muted-foreground mt-1">{city.percentage}% del total</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
