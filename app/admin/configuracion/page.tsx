"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings,
  Bell,
  Shield,
  Palette,
  Globe,
  DollarSign,
  Users,
  Zap,
  Save
} from "lucide-react"

export default function AdminConfiguracionPage() {
  const [notifications, setNotifications] = useState({
    newOperator: true,
    taskCompleted: true,
    alerts: true,
    dailyReport: false,
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Configuracion</h1>
        <p className="text-sm text-muted-foreground">Administra la configuracion de la plataforma</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          <TabsTrigger value="tarifas">Tarifas</TabsTrigger>
          <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Configuracion General
              </CardTitle>
              <CardDescription>Ajustes basicos de la plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre de la plataforma</Label>
                  <Input defaultValue="PROXY" className="bg-secondary/50" />
                </div>
                <div className="space-y-2">
                  <Label>Email de soporte</Label>
                  <Input defaultValue="soporte@proxy.co" className="bg-secondary/50" />
                </div>
                <div className="space-y-2">
                  <Label>Telefono de soporte</Label>
                  <Input defaultValue="+57 1 234 5678" className="bg-secondary/50" />
                </div>
                <div className="space-y-2">
                  <Label>Zona horaria</Label>
                  <Input defaultValue="America/Bogota (GMT-5)" className="bg-secondary/50" disabled />
                </div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="space-y-0.5">
                  <Label>Modo mantenimiento</Label>
                  <p className="text-xs text-muted-foreground">Deshabilitar acceso publico temporalmente</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-4 h-4" />
                Ciudades Activas
              </CardTitle>
              <CardDescription>Ciudades donde opera la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Bogota", "Medellin", "Cali", "Barranquilla", "Cartagena", "Bucaramanga", "Pereira", "Manizales"].map((city) => (
                  <div key={city} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <span className="text-sm">{city}</span>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificaciones" className="space-y-6">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notificaciones
              </CardTitle>
              <CardDescription>Configura las alertas del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "newOperator", label: "Nuevo operador registrado", description: "Recibir notificacion cuando se registre un nuevo operador" },
                { key: "taskCompleted", label: "Tarea completada", description: "Notificar cuando una tarea sea completada" },
                { key: "alerts", label: "Alertas del sistema", description: "Errores y alertas criticas del sistema" },
                { key: "dailyReport", label: "Reporte diario", description: "Recibir resumen diario por email" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label>{item.label}</Label>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch 
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, [item.key]: checked }))}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tarifas" className="space-y-6">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Tarifas por Tipo de Tarea
              </CardTitle>
              <CardDescription>Configura las tarifas base para cada tipo de tarea</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { type: "Entrega", min: 15000, max: 50000 },
                { type: "Verificacion", min: 20000, max: 80000 },
                { type: "Fotografia", min: 25000, max: 100000 },
                { type: "Documentos", min: 15000, max: 45000 },
                { type: "Acompanamiento", min: 40000, max: 150000 },
              ].map((item) => (
                <div key={item.type} className="grid grid-cols-3 gap-4 items-center">
                  <Label>{item.type}</Label>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Minimo</Label>
                    <Input defaultValue={item.min.toLocaleString("es-CO")} className="bg-secondary/50" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Maximo</Label>
                    <Input defaultValue={item.max.toLocaleString("es-CO")} className="bg-secondary/50" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Comisiones
              </CardTitle>
              <CardDescription>Porcentaje de comision de la plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Comision estandar (%)</Label>
                  <Input defaultValue="15" type="number" className="bg-secondary/50" />
                </div>
                <div className="space-y-2">
                  <Label>Comision urgente (%)</Label>
                  <Input defaultValue="20" type="number" className="bg-secondary/50" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguridad" className="space-y-6">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Seguridad
              </CardTitle>
              <CardDescription>Configuracion de seguridad de la plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Autenticacion de dos factores", description: "Requerir 2FA para administradores", enabled: true },
                { label: "Verificacion de identidad", description: "Requerir verificacion para operadores", enabled: true },
                { label: "Logs de auditoria", description: "Registrar todas las acciones administrativas", enabled: true },
                { label: "Bloqueo automatico", description: "Bloquear cuentas despues de 5 intentos fallidos", enabled: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label>{item.label}</Label>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch defaultChecked={item.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Guardar cambios
        </Button>
      </div>
    </div>
  )
}
