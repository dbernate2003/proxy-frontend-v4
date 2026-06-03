"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  TrendingUp,
  CreditCard,
  Banknote
} from "lucide-react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  Tooltip
} from "recharts"

const monthlyEarnings = [
  { month: "Ene", earnings: 450000 },
  { month: "Feb", earnings: 620000 },
  { month: "Mar", earnings: 580000 },
  { month: "Abr", earnings: 750000 },
  { month: "May", earnings: 890000 },
  { month: "Jun", earnings: 1250000 },
]

const transactions = [
  {
    id: "1",
    type: "income",
    description: "Entrega de documentos",
    amount: 18500,
    date: "Hoy, 14:30",
    status: "completed",
  },
  {
    id: "2",
    type: "income",
    description: "Verificación de dirección",
    amount: 25000,
    date: "Hoy, 10:15",
    status: "completed",
  },
  {
    id: "3",
    type: "withdrawal",
    description: "Retiro a Bancolombia",
    amount: -200000,
    date: "Ayer",
    status: "completed",
  },
  {
    id: "4",
    type: "income",
    description: "Fotografía de inventario",
    amount: 45000,
    date: "Hace 2 días",
    status: "completed",
  },
  {
    id: "5",
    type: "income",
    description: "Acompañamiento",
    amount: 55000,
    date: "Hace 3 días",
    status: "pending",
  },
]

export default function BilleteraPage() {
  const availableBalance = 343500
  const pendingBalance = 55000

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <h1 className="text-xl font-bold">Mi Billetera</h1>
        <p className="text-sm text-muted-foreground">Gestiona tus ganancias</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {/* Balance cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <Wallet className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Disponible</span>
              </div>
              <p className="text-lg font-bold text-primary">
                ${availableBalance.toLocaleString("es-CO")}
              </p>
              <span className="text-[10px] text-muted-foreground">COP</span>
            </CardContent>
          </Card>
          <Card className="bg-amber-500/10 border-amber-500/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-muted-foreground">Pendiente</span>
              </div>
              <p className="text-lg font-bold text-amber-400">
                ${pendingBalance.toLocaleString("es-CO")}
              </p>
              <span className="text-[10px] text-muted-foreground">COP</span>
            </CardContent>
          </Card>
        </div>

        {/* Withdraw button */}
        <Button className="w-full">
          <Banknote className="w-4 h-4 mr-2" />
          Retirar fondos
        </Button>

        {/* Monthly chart */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-2 pt-3 px-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Ganancias mensuales
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyEarnings}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#666', fontSize: 10 }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#1a1f35', 
                      border: '1px solid #2a2f45',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString("es-CO")} COP`, "Ganancias"]}
                  />
                  <Bar 
                    dataKey="earnings" 
                    fill="oklch(0.75 0.15 195)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Transactions */}
        <div>
          <h3 className="font-medium text-sm mb-3">Transacciones recientes</h3>
          <div className="space-y-2">
            {transactions.map((tx) => (
              <Card key={tx.id} className="bg-card/50 border-border/50">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      tx.type === "income" 
                        ? "bg-emerald-500/10" 
                        : "bg-red-500/10"
                    }`}>
                      {tx.type === "income" ? (
                        <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{tx.description}</p>
                      <p className="text-[10px] text-muted-foreground">{tx.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        tx.type === "income" ? "text-emerald-400" : "text-red-400"
                      }`}>
                        {tx.type === "income" ? "+" : ""}${Math.abs(tx.amount).toLocaleString("es-CO")}
                      </p>
                      {tx.status === "pending" && (
                        <span className="text-[10px] text-amber-400">Pendiente</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
