"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Search, 
  MoreHorizontal, 
  Building2,
  Eye,
  Edit,
  DollarSign,
  Download,
  Mail,
  Phone,
  ClipboardList
} from "lucide-react"

const mockClients = [
  { id: "c-1", name: "Empresa Demo S.A.S", email: "demo@empresa.com", phone: "+57 315 123 4567", plan: "enterprise", balance: 2450000, tasks: 156, status: "active" },
  { id: "c-2", name: "TechCorp Colombia", email: "info@techcorp.co", phone: "+57 318 987 6543", plan: "profesional", balance: 850000, tasks: 89, status: "active" },
  { id: "c-3", name: "Logistica Express", email: "ops@logex.com", phone: "+57 320 456 7890", plan: "profesional", balance: 1200000, tasks: 234, status: "active" },
  { id: "c-4", name: "Verificados Colombia", email: "admin@verificados.co", phone: "+57 312 234 5678", plan: "basico", balance: 125000, tasks: 45, status: "active" },
  { id: "c-5", name: "Entregas Rapidas", email: "contact@rapidas.com", phone: "+57 316 789 0123", plan: "enterprise", balance: 3200000, tasks: 312, status: "active" },
]

const planColors = {
  enterprise: { bg: "bg-purple-500/10", text: "text-purple-500" },
  profesional: { bg: "bg-primary/10", text: "text-primary" },
  basico: { bg: "bg-muted", text: "text-muted-foreground" },
}

export default function AdminClientesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [planFilter, setPlanFilter] = useState("all")

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlan = planFilter === "all" || client.plan === planFilter
    return matchesSearch && matchesPlan
  })

  const stats = {
    total: mockClients.length,
    enterprise: mockClients.filter(c => c.plan === "enterprise").length,
    totalBalance: mockClients.reduce((sum, c) => sum + c.balance, 0),
    totalTasks: mockClients.reduce((sum, c) => sum + c.tasks, 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-sm text-muted-foreground">Gestiona todos los clientes de la plataforma</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Total clientes</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-purple-500">{stats.enterprise}</p>
            <p className="text-xs text-muted-foreground">Enterprise</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-emerald-500">${(stats.totalBalance / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-muted-foreground">Saldo total</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-primary">{stats.totalTasks}</p>
            <p className="text-xs text-muted-foreground">Tareas totales</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o email..."
                className="pl-10 bg-secondary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-full sm:w-40 bg-secondary/50">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
                <SelectItem value="profesional">Profesional</SelectItem>
                <SelectItem value="basico">Basico</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Saldo</TableHead>
                <TableHead>Tareas</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => {
                const plan = planColors[client.plan as keyof typeof planColors] || planColors.basico
                return (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-9 h-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {client.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{client.name}</p>
                          <p className="text-xs text-muted-foreground">{client.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${plan.bg} ${plan.text} border-0 capitalize`}>
                        {client.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Mail className="w-3 h-3 text-muted-foreground" />
                          {client.email}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          {client.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-emerald-500 flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {client.balance.toLocaleString("es-CO")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <ClipboardList className="w-3 h-3 text-muted-foreground" />
                        {client.tasks}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Ver perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ClipboardList className="w-4 h-4 mr-2" />
                            Ver tareas
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-emerald-500">
                            <DollarSign className="w-4 h-4 mr-2" />
                            Agregar creditos
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
