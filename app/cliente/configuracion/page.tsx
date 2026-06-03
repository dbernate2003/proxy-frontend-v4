"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Building2, 
  User, 
  Bell, 
  Shield,
  Globe,
  Mail,
  Phone,
  MapPin,
  Save
} from "lucide-react"

export default function ConfiguracionPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Configuración</h1>
        <p className="text-muted-foreground">Gestiona la configuración de tu cuenta y empresa</p>
      </div>

      {/* Company info */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Información de la empresa
          </CardTitle>
          <CardDescription>
            Datos básicos de tu organización
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-primary/20 text-primary text-xl font-bold">
                ED
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">Cambiar logo</Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Nombre de la empresa</Label>
              <Input 
                id="company" 
                defaultValue="Empresa Demo S.A.S"
                className="bg-secondary border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nit">NIT</Label>
              <Input 
                id="nit" 
                defaultValue="900.123.456-7"
                className="bg-secondary border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industria</Label>
              <Input 
                id="industry" 
                defaultValue="Tecnología"
                className="bg-secondary border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Tamaño</Label>
              <Input 
                id="size" 
                defaultValue="50-100 empleados"
                className="bg-secondary border-0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact info */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Información de contacto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Nombre del contacto</Label>
              <Input 
                id="contact-name" 
                defaultValue="Juan Pérez"
                className="bg-secondary border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Cargo</Label>
              <Input 
                id="role" 
                defaultValue="Director de Operaciones"
                className="bg-secondary border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input 
                id="email" 
                type="email"
                defaultValue="juan.perez@empresademo.com"
                className="bg-secondary border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Teléfono
              </Label>
              <Input 
                id="phone" 
                type="tel"
                defaultValue="+57 315 123 4567"
                className="bg-secondary border-0"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Dirección
              </Label>
              <Input 
                id="address" 
                defaultValue="Cra 7 #71-21, Torre A, Oficina 1502, Bogotá"
                className="bg-secondary border-0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Notificaciones
          </CardTitle>
          <CardDescription>
            Configura cómo quieres recibir alertas y actualizaciones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notificaciones por email</p>
              <p className="text-sm text-muted-foreground">
                Recibe actualizaciones sobre tus tareas por correo
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alertas de tarea completada</p>
              <p className="text-sm text-muted-foreground">
                Notificación inmediata cuando una tarea se completa
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alertas de problemas</p>
              <p className="text-sm text-muted-foreground">
                Notificación cuando hay un problema con una tarea
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Resumen semanal</p>
              <p className="text-sm text-muted-foreground">
                Reporte semanal de actividad por email
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Seguridad
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Autenticación de dos factores</p>
              <p className="text-sm text-muted-foreground">
                Agrega una capa adicional de seguridad a tu cuenta
              </p>
            </div>
            <Button variant="outline" size="sm">Configurar</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Cambiar contraseña</p>
              <p className="text-sm text-muted-foreground">
                Última actualización hace 45 días
              </p>
            </div>
            <Button variant="outline" size="sm">Cambiar</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sesiones activas</p>
              <p className="text-sm text-muted-foreground">
                2 dispositivos conectados
              </p>
            </div>
            <Button variant="outline" size="sm">Ver sesiones</Button>
          </div>
        </CardContent>
      </Card>

      {/* Save button */}
      <div className="flex justify-end">
        <Button size="lg">
          <Save className="w-4 h-4 mr-2" />
          Guardar cambios
        </Button>
      </div>
    </div>
  )
}
