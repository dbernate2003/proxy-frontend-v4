"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { StatusBadge } from "@/components/status-badge"
import { 
  User,
  Star,
  Calendar,
  CheckCircle,
  Award,
  Shield,
  Package,
  Camera,
  Search,
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react"

const certifications = [
  { id: "1", name: "Verificado", icon: Shield, active: true },
  { id: "2", name: "Logística", icon: Package, active: true },
  { id: "3", name: "Fotografía", icon: Camera, active: true },
  { id: "4", name: "Inspecciones", icon: Search, active: false },
]

const stats = [
  { label: "Tareas completadas", value: "247" },
  { label: "Tasa de éxito", value: "98.2%" },
  { label: "Tiempo promedio", value: "32 min" },
]

export default function PerfilPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-6 text-center">
        <Avatar className="w-20 h-20 mx-auto mb-3 border-4 border-primary">
          <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">
            CM
          </AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-bold">Carlos Martínez</h1>
        <div className="flex items-center justify-center gap-2 mt-1">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${star <= 4 ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">4.8 (156 reseñas)</span>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <StatusBadge status="active">Operador Nivel 3</StatusBadge>
        </div>
        <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
          <Calendar className="w-3 h-3" />
          Miembro desde Enero 2024
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {/* Level progress */}
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progreso al Nivel 4</span>
              <span className="text-sm text-primary">72%</span>
            </div>
            <Progress value={72} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Completa 28 tareas más para subir de nivel
            </p>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-card/50 border-border/50">
              <CardContent className="p-3 text-center">
                <p className="text-lg font-bold text-primary">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div>
          <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            Certificaciones
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {certifications.map((cert) => (
              <Card 
                key={cert.id} 
                className={`${
                  cert.active 
                    ? "bg-primary/10 border-primary/20" 
                    : "bg-card/30 border-border/30 opacity-50"
                }`}
              >
                <CardContent className="p-3 flex items-center gap-2">
                  <cert.icon className={`w-5 h-5 ${cert.active ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`text-xs font-medium ${cert.active ? "" : "text-muted-foreground"}`}>
                    {cert.name}
                  </span>
                  {cert.active && <CheckCircle className="w-3 h-3 text-emerald-400 ml-auto" />}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Menu items */}
        <div className="space-y-1">
          <Link href="/operador/verificacion">
            <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm">Verificacion de identidad</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status="completed">Completa</StatusBadge>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/operador/registro">
            <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" />
                  <span className="text-sm">Editar datos de registro</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
          <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">Configuración</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-border/50 hover:border-destructive/30 transition-colors cursor-pointer">
            <CardContent className="p-3 flex items-center gap-3">
              <LogOut className="w-5 h-5 text-destructive" />
              <span className="text-sm text-destructive">Cerrar sesión</span>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
